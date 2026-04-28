import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const JOBS_PATH = path.join(ROOT, "tools", "minimax_music_jobs.json");
const MANIFEST_PATH = path.join(ROOT, "data", "audioManifest.js");
const REGION = String(process.env.MINIMAX_REGION || "intl").toLowerCase();
const DEFAULT_API_URL = ["cn", "china", "mainland"].includes(REGION)
  ? "https://api.minimaxi.com/v1/music_generation"
  : "https://api.minimax.io/v1/music_generation";
const API_URL = process.env.MINIMAX_API_URL || DEFAULT_API_URL;
const RAW_API_KEY = process.env.MINIMAX_API_KEY;
const API_KEY = normalizeApiKey(RAW_API_KEY);
const MODEL = process.env.MINIMAX_MUSIC_MODEL || "music-2.6";
const OUTPUT_FORMAT = process.env.MINIMAX_OUTPUT_FORMAT || "hex";

const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const dryRun = args.has("--dry-run");
const all = args.has("--all");
const noManifest = args.has("--no-manifest");
const noBuild = args.has("--no-build");
const priorityArg = process.argv.find(arg => arg.startsWith("--priority="));
const onlyArg = process.argv.find(arg => arg.startsWith("--only="));
const retriesArg = process.argv.find(arg => arg.startsWith("--retries="));
const priority = priorityArg ? priorityArg.split("=")[1].toUpperCase() : "P0";
const onlyIds = onlyArg ? new Set(onlyArg.split("=")[1].split(",").map(item => item.trim()).filter(Boolean)) : null;
const maxRetries = Math.max(0, Number.parseInt(retriesArg?.split("=")[1] || "2", 10) || 0);

function printHelp() {
  console.log(`
MiniMax Music batch generator

Usage:
  export MINIMAX_API_KEY="your_key"
  node tools/generate_minimax_music.mjs

Options:
  --priority=P0     Generate only jobs with this priority. Default: P0
  --all             Generate all jobs in tools/minimax_music_jobs.json
  --only=id1,id2    Generate specific job ids
  --force           Regenerate even if output file already exists
  --dry-run         Print selected jobs without calling MiniMax
  --no-manifest     Do not update data/audioManifest.js after success
  --no-build        Do not rebuild index.html after success
  --retries=2       Retry transient network failures. Default: 2

Environment:
  MINIMAX_API_KEY       Required
  MINIMAX_REGION        Optional. intl or cn. Default: intl
  MINIMAX_API_URL       Optional. Overrides the endpoint URL
  MINIMAX_MUSIC_MODEL   Optional. Default: music-2.6
  MINIMAX_OUTPUT_FORMAT Optional. Default: hex
`);
}

if (args.has("--help") || args.has("-h")) {
  printHelp();
  process.exit(0);
}

if (!API_KEY && !dryRun) {
  console.error("Missing MINIMAX_API_KEY.");
  console.error('Run: export MINIMAX_API_KEY="your_key"');
  process.exit(1);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const execFileAsync = promisify(execFile);

function normalizeApiKey(value) {
  if (!value) return "";
  return String(value)
    .trim()
    .replace(/^["'“”‘’]+|["'“”‘’]+$/g, "")
    .replace(/^Bearer\s+/i, "")
    .trim();
}

function getSafeKeyHint(value) {
  if (!value) return "not set";
  if (value.length <= 8) return `length ${value.length}`;
  return `length ${value.length}, starts ${value.slice(0, 4)}..., ends ...${value.slice(-4)}`;
}

function isAuthError(error) {
  return /status_code"?\s*:\s*(1004|2049)|login fail|invalid api key|Authorization/i.test(String(error?.message || error));
}

function isTransientError(error) {
  return /fetch failed|ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENOTFOUND|network|timeout|socket/i.test(String(error?.message || error));
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function selectJobs(jobs) {
  if (onlyIds) return jobs.filter(job => onlyIds.has(job.id));
  if (all) return jobs;
  return jobs.filter(job => String(job.priority).toUpperCase() === priority);
}

function buildPayload(job) {
  return {
    model: MODEL,
    prompt: job.prompt,
    is_instrumental: true,
    output_format: OUTPUT_FORMAT,
    audio_setting: {
      sample_rate: 44100,
      bitrate: 256000,
      format: "mp3"
    }
  };
}

async function callMiniMax(job) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildPayload(job))
  });

  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`MiniMax returned non-JSON response (${response.status}): ${text.slice(0, 500)}`);
  }

  if (!response.ok || json.base_resp?.status_code !== 0) {
    throw new Error(`MiniMax error for ${job.id}: ${JSON.stringify(json, null, 2)}`);
  }

  return json;
}

async function callMiniMaxWithRetry(job) {
  let lastError = null;
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      if (attempt > 0) {
        const delayMs = 2000 * attempt;
        console.log(`Retrying ${job.id} after transient error (${attempt}/${maxRetries})...`);
        await sleep(delayMs);
      }
      return await callMiniMax(job);
    } catch (error) {
      lastError = error;
      if (isAuthError(error) || !isTransientError(error) || attempt >= maxRetries) {
        throw error;
      }
    }
  }
  throw lastError;
}

async function saveAudio(job, result) {
  const outputPath = path.join(ROOT, job.output);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const audio = result.data?.audio;
  if (!audio) {
    throw new Error(`MiniMax response for ${job.id} did not include data.audio`);
  }

  if (/^https?:\/\//i.test(audio)) {
    const download = await fetch(audio);
    if (!download.ok) {
      throw new Error(`Failed to download MiniMax audio URL for ${job.id}: HTTP ${download.status}`);
    }
    const arrayBuffer = await download.arrayBuffer();
    await fs.writeFile(outputPath, Buffer.from(arrayBuffer));
    return outputPath;
  }

  const normalizedHex = String(audio).replace(/^0x/i, "").replace(/\s/g, "");
  await fs.writeFile(outputPath, Buffer.from(normalizedHex, "hex"));
  return outputPath;
}

async function updateManifestReady(manifestKey) {
  if (!manifestKey || noManifest) return;
  let source = await fs.readFile(MANIFEST_PATH, "utf8");
  const escapedKey = manifestKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(${escapedKey}:\\s*\\{[\\s\\S]*?ready:\\s*)false`);

  if (!pattern.test(source)) {
    console.warn(`Manifest entry not found or already ready: ${manifestKey}`);
    return;
  }

  source = source.replace(pattern, "$1true");
  await fs.writeFile(MANIFEST_PATH, source);
}

async function main() {
  const jobsRaw = await fs.readFile(JOBS_PATH, "utf8");
  const jobs = selectJobs(JSON.parse(jobsRaw));

  if (jobs.length === 0) {
    console.error("No matching jobs found.");
    process.exit(1);
  }

  console.log(`Selected ${jobs.length} job(s). Model=${MODEL}, output_format=${OUTPUT_FORMAT}`);
  console.log(`Endpoint: ${API_URL}`);
  if (!dryRun) {
    console.log(`MiniMax API key detected (${getSafeKeyHint(API_KEY)}).`);
    if (RAW_API_KEY !== API_KEY) {
      console.log("Normalized MINIMAX_API_KEY by trimming quotes/whitespace/Bearer prefix.");
    }
  }
  for (const job of jobs) {
    console.log(`- ${job.id} -> ${job.output}`);
  }

  if (dryRun) {
    console.log("Dry run complete. No API calls made.");
    return;
  }

  const failures = [];

  for (let index = 0; index < jobs.length; index += 1) {
    const job = jobs[index];
    const outputPath = path.join(ROOT, job.output);

    if (!force && await fileExists(outputPath)) {
      console.log(`[${index + 1}/${jobs.length}] Skip existing: ${job.output}`);
      await updateManifestReady(job.manifestKey);
      continue;
    }

    try {
      console.log(`[${index + 1}/${jobs.length}] Generating ${job.id}...`);
      const result = await callMiniMaxWithRetry(job);
      const savedPath = await saveAudio(job, result);
      await updateManifestReady(job.manifestKey);
      const duration = result.extra_info?.music_duration ? `${result.extra_info.music_duration}ms` : "unknown duration";
      console.log(`Saved ${path.relative(ROOT, savedPath)} (${duration})`);
      await sleep(1200);
    } catch (error) {
      failures.push({ job, error });
      console.error(`Failed ${job.id}: ${error.message}`);
      if (isAuthError(error)) {
        console.error("\nAuthentication failed. Stopping early so the same bad key is not retried for every job.");
        console.error("Please re-check that MINIMAX_API_KEY is the API secret key from MiniMax API Keys, not a placeholder and not the full 'Bearer ...' header.");
        break;
      }
      await sleep(1200);
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} job(s) failed:`);
    failures.forEach(({ job, error }) => {
      console.error(`- ${job.id}: ${error.message}`);
    });
    process.exit(1);
  }

  if (!noBuild) {
    console.log("\nRebuilding index.html so Electron uses the updated audio manifest...");
    const { stdout, stderr } = await execFileAsync(process.execPath, ["build.js"], { cwd: ROOT });
    if (stdout.trim()) console.log(stdout.trim());
    if (stderr.trim()) console.warn(stderr.trim());
  }

  console.log("\nAll selected MiniMax music jobs completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
