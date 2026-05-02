import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function validate() {
  const epoch1 = (await import('./data/epoch1.js')).epoch1Events;
  const epoch2 = (await import('./data/epoch2.js')).epoch2Events;
  const epoch3 = (await import('./data/epoch3.js')).epoch3Events;
  const hubModule = await import('./data/hubData.js');
  const hub = hubModule.gameNodes || hubModule.hubData;
  const { EventSystem } = await import('./engine/EventSystem.js');
  const { gameEngine } = await import('./engine/GameState.js');

  const allNodes = { ...epoch1, ...epoch2, ...epoch3, ...hub };
  const definedKeys = new Set(Object.keys(allNodes));
  const eventSystem = new EventSystem(gameEngine);
  eventSystem.loadEvents(allNodes);

  let errors = [];
  let warnings = [];

  // Special engine endpoints
  const engineEndpoints = new Set(['hub', 'random_sick', 'random_exam', 'random_subway', 'random_lecture', 'random_club_fair', 'random_vpn_down', 'random_dorm_inspection', 'minigame_subway', 'minigame_study', 'minigame_bargain', 'minigame_call', 'minigame_food', 'minigame_scramble', 'minigame_party', 'minigame_tones', 'ending_scholar', 'ending_burnout', 'ending_influencer', 'ending_deported', 'ending_researcher', 'ending_local_insider', 'ending_hsk_master', 'start']);
  
  // Actually check if the random events or minigames are defined in allNodes instead of just hardcoded strings
  // Some endpoints are hardcoded in EventSystem.js (e.g., 'hub' is special handled)

  for (const [nodeId, nodeData] of Object.entries(allNodes)) {
    if (!nodeData) {
      errors.push(`Node ${nodeId} is undefined.`);
      continue;
    }

    if (nodeData.choices) {
      if (!Array.isArray(nodeData.choices)) {
          errors.push(`Node '${nodeId}' has 'choices' but it is not an array.`);
      } else {
          nodeData.choices.forEach((choice, idx) => {
             const nextNode = choice.next || choice.action; // Some action might be reset_game or advance_turn but need next
             if (choice.action === "reset_game") return; // Handled specially
             
             if (!choice.next) {
                 errors.push(`Node '${nodeId}' choice [${idx}] ('${choice.text}') is missing highly expected 'next' pointer.`);
          } else {
                 if (!definedKeys.has(choice.next) && choice.next !== "hub" && !choice.next.startsWith('minigame_') && !choice.next.startsWith('random_')) {
                     // verify if it is an ending? Endings are typically nodes in epoch3 now, wait is ending_xyz defined?
                     errors.push(`Node '${nodeId}' choice [${idx}] points to undefined node '${choice.next}'.`);
                 }
             }

             const lifeCheck = choice.effects?.lifeCheck;
             if (lifeCheck) {
               if (!lifeCheck.id || typeof lifeCheck.id !== 'string') {
                 errors.push(`Node '${nodeId}' choice [${idx}] has a Life Check without a string id.`);
               }
               if (typeof lifeCheck.dc !== 'number' || Number.isNaN(lifeCheck.dc)) {
                 errors.push(`Node '${nodeId}' choice [${idx}] Life Check '${lifeCheck.id || 'unknown'}' is missing numeric dc.`);
               }
               for (const outcomeName of ['success', 'failure']) {
                 const outcome = lifeCheck[outcomeName];
                 if (!outcome) continue;
                 if (outcome.stats && typeof outcome.stats !== 'object') {
                   errors.push(`Node '${nodeId}' choice [${idx}] Life Check '${lifeCheck.id}' ${outcomeName}.stats must be an object.`);
                 }
                 if (outcome.flags && typeof outcome.flags !== 'object') {
                   errors.push(`Node '${nodeId}' choice [${idx}] Life Check '${lifeCheck.id}' ${outcomeName}.flags must be an object.`);
                 }
                 if (outcome.relationships && typeof outcome.relationships !== 'object') {
                   errors.push(`Node '${nodeId}' choice [${idx}] Life Check '${lifeCheck.id}' ${outcomeName}.relationships must be an object.`);
                 }
               }
             }
          });
      }
    } else {
       // if no choices, does it have a direct target like onWin / onLose for minigames?
       if (nodeData.minigame) {
          if (!nodeData.onWin || !definedKeys.has(nodeData.onWin)) errors.push(`Minigame Node '${nodeId}' missing or invalid 'onWin': ${nodeData.onWin}`);
          if (!nodeData.onLose || !definedKeys.has(nodeData.onLose)) errors.push(`Minigame Node '${nodeId}' missing or invalid 'onLose': ${nodeData.onLose}`);
       } else {
           // Terminal node with no choices?
           // If it's an ending, it usually has reset_game choices.
           errors.push(`Node '${nodeId}' has no choices and no minigame routing! It's a dead story end.`);
       }
    }
  }

  const coreCharacters = new Set([
    "Professor Lin",
    "Dr. Mei",
    "Sophie",
    "Lin Yue",
    "Xiao Chen",
    "Neighbor Li",
    "Manager Zhang",
    "Uncle Wang"
  ]);
  for (const [nodeId, nodeData] of Object.entries(allNodes)) {
    if (!coreCharacters.has(nodeData?.speaker)) continue;
    if (nodeData.suppressDialogueChoices) continue;
    const dialogueChoices = eventSystem.getAvailableDialogueChoices(nodeId);
    if (dialogueChoices.length < 2) {
      errors.push(`Core character node '${nodeId}' (${nodeData.speaker}) has fewer than two reply choices.`);
    }
  }

  const sourceFiles = [
    'page.js',
    'components/TabletInterface.jsx',
    'components/StoryPanel.jsx',
    'data/epoch1.js',
    'data/epoch2.js',
    'data/epoch3.js',
    'data/hubData.js'
  ];
  const assetRefs = new Set();
  for (const sourceFile of sourceFiles) {
    const sourcePath = path.join(__dirname, sourceFile);
    const source = fs.readFileSync(sourcePath, 'utf8');
    for (const match of source.matchAll(/['"](\/?(?:images\/simulator|assets\/magnets)[^'"]+)['"]/g)) {
      assetRefs.add(match[1]);
    }
    for (const match of source.matchAll(/url\(["'](\/?images\/simulator[^"']+)["']\)/g)) {
      assetRefs.add(match[1]);
    }
  }
  for (const assetRef of assetRefs) {
    const assetPath = path.join(__dirname, assetRef.replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) {
      errors.push(`Referenced asset is missing: '${assetRef}'.`);
    }
  }

  console.log('--- VALIDATION RESULTS ---');
  if (errors.length > 0) {
      console.log(`Found ${errors.length} ERRORS:`);
      errors.forEach(e => console.log('❌ ' + e));
  } else {
      console.log('✅ No hard pointer errors found.');
  }
}

validate().catch(console.error);
