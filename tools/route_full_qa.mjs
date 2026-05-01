import fs from 'node:fs/promises';
import { gameEngine } from '../engine/GameState.js';
import { EventSystem } from '../engine/EventSystem.js';
import { epoch1Events } from '../data/epoch1.js';
import { epoch2Events } from '../data/epoch2.js';
import { epoch3Events } from '../data/epoch3.js';
import { gameNodes } from '../data/hubData.js';

const allEvents = { ...epoch1Events, ...epoch2Events, ...epoch3Events, ...gameNodes };
const eventSystem = new EventSystem(gameEngine);
eventSystem.loadEvents(allEvents);

const routeProfiles = [
  {
    id: 'academic_scholar',
    label: 'Academic / Professor Lin',
    targetEnding: 'ending_scholar',
    finalChoice: /academic portfolio/i,
    stats: { academics: 90, chinese: 42, culture: 42, digitalProficiency: 48, energy: 68, wealth: 3600 },
    guanxi: { professors: 42 },
    relationships: { 'Professor Lin': { friendship: 31 } },
    flags: {
      route_academic: true,
      lin_academic_method: true,
      lin_recommendation_ready: true,
      academic_portfolio_indexed: true
    },
    routeCommitments: { academic: 7 }
  },
  {
    id: 'researcher',
    label: 'Research / Dr. Mei',
    targetEnding: 'ending_researcher',
    finalChoice: /academic portfolio/i,
    stats: { academics: 84, chinese: 46, culture: 50, digitalProficiency: 52, energy: 62, wealth: 3200 },
    guanxi: { professors: 38 },
    relationships: { 'Dr. Mei': { friendship: 32 }, 'Professor Lin': { friendship: 18 } },
    flags: {
      route_academic: true,
      dr_mei_project_trust: true,
      dr_mei_project_commitment: true,
      academic_portfolio_indexed: true
    },
    routeCommitments: { academic: 6 }
  },
  {
    id: 'career_bridge',
    label: 'Career / Manager Zhang',
    targetEnding: 'ending_diplomat',
    finalChoice: /city project reflection/i,
    stats: { academics: 64, chinese: 48, culture: 58, digitalProficiency: 62, energy: 64, wealth: 3900 },
    guanxi: { admin: 38, professors: 18 },
    relationships: { 'Manager Zhang': { friendship: 31 } },
    flags: {
      route_career: true,
      manager_zhang_career_trust: true,
      manager_zhang_referral_ready: true,
      internship_dossier_ready: true
    },
    routeCommitments: { career: 7 }
  },
  {
    id: 'shanghai_builder',
    label: 'Shanghai / Xiao Chen',
    targetEnding: 'ending_entrepreneur',
    finalChoice: /city project reflection/i,
    stats: { academics: 58, chinese: 42, culture: 52, digitalProficiency: 72, energy: 58, wealth: 4600 },
    guanxi: { localStudents: 24, admin: 18 },
    relationships: { 'Xiao Chen': { friendship: 31 } },
    flags: {
      route_city: true,
      xiao_chen_city_prototype: true,
      xiao_chen_demo_day: true,
      prototype_telemetry_board: true
    },
    routeCommitments: { city: 7 }
  },
  {
    id: 'international_builder',
    label: 'Social / Sophie',
    targetEnding: 'ending_influencer',
    finalChoice: /personal learning journal/i,
    stats: { academics: 55, chinese: 38, culture: 56, digitalProficiency: 58, energy: 76, wealth: 3400 },
    guanxi: { intlStudents: 45 },
    relationships: { Sophie: { friendship: 31 } },
    flags: {
      route_intl: true,
      sophie_support_circle: true,
      sophie_orientation_committee: true,
      support_guide_chapter_ready: true
    },
    routeCommitments: { intl: 7 }
  },
  {
    id: 'local_regular',
    label: 'Local Life / Neighbor Li + Uncle Wang',
    targetEnding: 'ending_local_insider',
    finalChoice: /personal learning journal/i,
    stats: { academics: 52, chinese: 55, culture: 72, digitalProficiency: 44, energy: 66, wealth: 3300 },
    guanxi: { localStudents: 42 },
    relationships: { 'Neighbor Li': { friendship: 28 }, 'Uncle Wang': { friendship: 28 } },
    flags: {
      route_local: true,
      neighbor_li_local_trust: true,
      neighbor_li_festival_invite: true,
      uncle_wang_neighborhood_story: true,
      uncle_wang_regular: true,
      neighborhood_map_indexed: true
    },
    routeCommitments: { local: 7 }
  },
  {
    id: 'survival_quiet_return',
    label: 'Survival / Budget Ledger',
    targetEnding: 'ending_quiet_return',
    finalChoice: /personal learning journal/i,
    stats: { academics: 48, chinese: 32, culture: 38, digitalProficiency: 46, energy: 54, wealth: 980 },
    guanxi: { admin: 12, localStudents: 12, intlStudents: 12, professors: 12 },
    relationships: {},
    flags: {
      route_survival: true,
      budget_ledger_audited: true,
      emergency_funding_used: true,
      money_recovery_buffer: true,
      housing_energy_scar: true
    },
    routeCommitments: { survival: 8 }
  }
];

const routeProjectEvents = [
  ['event_project_academic_portfolio_index', 'academic_portfolio_indexed', 'academic_portfolio_index'],
  ['event_project_internship_dossier', 'internship_dossier_ready', 'internship_dossier'],
  ['event_project_neighborhood_map', 'neighborhood_map_indexed', 'neighborhood_map'],
  ['event_project_support_guide_chapter', 'support_guide_chapter_ready', 'support_guide_chapter'],
  ['event_project_prototype_telemetry', 'prototype_telemetry_board', 'prototype_telemetry_board'],
  ['event_project_budget_ledger', 'budget_ledger_audited', 'budget_ledger_audit']
];

const crisisRecoveryEvents = [
  ['event_recovery_forced_followup', 'recovery_followup_done', 'forced_recovery_followup'],
  ['event_recovery_academic_followup', 'academic_recovery_followup_done', 'academic_recovery_followup'],
  ['event_recovery_money_followup', 'money_recovery_followup_done', 'money_recovery_followup']
];

const requiredMilestones = [
  'start',
  'pre_departure_start',
  'in_china_start',
  'epoch3_midterm',
  'epoch3_internship',
  'epoch3_final',
  'ending_evaluation'
];

const routeResults = [];
const projectResults = [];
const recoveryResults = [];
const failures = [];

function mergeStats(base = {}) {
  return {
    academics: 55,
    chinese: 45,
    culture: 45,
    digitalProficiency: 45,
    energy: 70,
    wealth: 3500,
    ...base
  };
}

function seedBaseState(profile = {}) {
  gameEngine.reset();
  const state = gameEngine.getState();
  state.currentNodeId = 'epoch3_final';
  state.turn = 32;
  state.phase = 'In-China';
  state.location = 'Shanghai';
  state.stats = mergeStats(profile.stats);
  state.guanxi = {
    admin: 0,
    localStudents: 0,
    intlStudents: 0,
    professors: 0,
    ...(profile.guanxi || {})
  };
  state.relationships = {};
  for (const [name, rel] of Object.entries(profile.relationships || {})) {
    state.relationships[name] = { friendship: 0, romance: 0, ...rel };
  }
  state.flags = {
    arrived_in_china: true,
    campus_rhythm_started: true,
    accepted_offer: true,
    got_visa: true,
    decision_e3_registration: 'Completed',
    decision_e3_first_class: 'Completed',
    decision_e3_social_circle: 'Completed',
    decision_e3_rhythm: 'Completed',
    ...(profile.flags || {})
  };
  state.routeCommitments = {
    academic: 0,
    career: 0,
    local: 0,
    intl: 0,
    city: 0,
    survival: 0,
    ...(profile.routeCommitments || {})
  };
  return state;
}

function assertNode(nodeId) {
  const node = allEvents[nodeId];
  if (!node) throw new Error(`Missing node: ${nodeId}`);
  if (!Array.isArray(node.choices) || node.choices.length === 0) {
    throw new Error(`Node has no playable choices: ${nodeId}`);
  }
  return node;
}

function runRouteProfile(profile) {
  seedBaseState(profile);
  const finalNode = assertNode('epoch3_final');
  const finalChoice = finalNode.choices.find(choice => profile.finalChoice.test(choice.text));
  if (!finalChoice) throw new Error(`${profile.id}: final submission choice not found`);
  eventSystem.applyChoiceEffects(finalChoice);

  const availableEndingChoices = eventSystem.getAvailableChoices('ending_evaluation');
  const targetChoice = availableEndingChoices.find(choice => choice.next === profile.targetEnding);
  if (!targetChoice) {
    const available = availableEndingChoices.map(choice => choice.next).join(', ');
    throw new Error(`${profile.id}: target ${profile.targetEnding} not available. Available: ${available}`);
  }

  const endingNode = assertNode(profile.targetEnding);
  const resetChoice = endingNode.choices.find(choice => choice.action === 'reset_game');
  if (!resetChoice) throw new Error(`${profile.id}: ending has no reset choice`);

  routeResults.push({
    id: profile.id,
    label: profile.label,
    targetEnding: profile.targetEnding,
    availableEndingCount: availableEndingChoices.length
  });
}

function runEventEffectCheck([eventId, expectedFlag, expectedLifeCheck]) {
  seedBaseState({
    stats: { academics: 64, chinese: 58, culture: 58, digitalProficiency: 62, energy: 74, wealth: 4200 },
    guanxi: { admin: 25, professors: 25, localStudents: 25, intlStudents: 25 },
    relationships: {
      Sophie: { friendship: 26 },
      'Xiao Chen': { friendship: 26 },
      'Professor Lin': { friendship: 26 }
    },
    routeCommitments: { academic: 5, career: 5, local: 5, intl: 5, city: 5, survival: 5 },
    flags: {
      calendar_focus: 'Midterm essay',
      calendar_admin_prepped: true,
      budget_reviewed: true,
      compliance_cleanup_done: true
    }
  });
  const node = assertNode(eventId);
  const choice = node.choices[0];
  eventSystem.applyChoiceEffects(choice);
  const state = gameEngine.getState();
  if (state.flags[expectedFlag] !== true) throw new Error(`${eventId}: expected flag ${expectedFlag}`);
  if (expectedLifeCheck && state.lifeChecks.last?.id !== expectedLifeCheck) {
    throw new Error(`${eventId}: expected life check ${expectedLifeCheck}`);
  }
  return {
    eventId,
    expectedFlag,
    lifeCheck: state.lifeChecks.last?.id || null,
    lifeCheckPassed: state.lifeChecks.last?.success ?? null
  };
}

function runWeeklyActionEconomyCheck() {
  seedBaseState();
  const state = gameEngine.getState();
  state.weeklyActions = { weekday: 2, weekend: 1 };
  const first = gameEngine.spendWeeklyAction('weekday');
  const second = gameEngine.spendWeeklyAction('weekday');
  const third = gameEngine.spendWeeklyAction('weekend');
  const fourth = gameEngine.spendWeeklyAction('weekday');
  if (!first.spent || !second.spent || !third.spent) throw new Error('Weekly action spend should allow 2 weekday + 1 weekend actions');
  if (fourth.spent) throw new Error('Weekly action spend should block the fourth action');
  if (!third.weekComplete) throw new Error('Weekly action economy should mark the week complete after all action slots are spent');
  return { weekday: state.weeklyActions.weekday, weekend: state.weeklyActions.weekend };
}

for (const nodeId of requiredMilestones) {
  try {
    assertNode(nodeId);
  } catch (error) {
    failures.push(error.message);
  }
}

for (const profile of routeProfiles) {
  try {
    runRouteProfile(profile);
  } catch (error) {
    failures.push(error.message);
  }
}

for (const eventCheck of routeProjectEvents) {
  try {
    projectResults.push(runEventEffectCheck(eventCheck));
  } catch (error) {
    failures.push(error.message);
  }
}

for (const eventCheck of crisisRecoveryEvents) {
  try {
    recoveryResults.push(runEventEffectCheck(eventCheck));
  } catch (error) {
    failures.push(error.message);
  }
}

let weeklyActionResult = null;
try {
  weeklyActionResult = runWeeklyActionEconomyCheck();
} catch (error) {
  failures.push(error.message);
}

const generatedAt = new Date().toISOString();
const report = [
  '# Full Route QA Report',
  '',
  `Generated: ${generatedAt}`,
  '',
  '## Result',
  '',
  failures.length === 0 ? 'PASS: all route profiles, project checks, crisis recovery checks, and weekly action economy checks passed.' : `FAIL: ${failures.length} issue(s) found.`,
  '',
  '## Route Profiles',
  '',
  ...routeResults.map(result => `- ${result.label}: ${result.targetEnding} available from ending evaluation (${result.availableEndingCount} ending choices visible).`),
  '',
  '## Route Project Actions',
  '',
  ...projectResults.map(result => `- ${result.eventId}: sets ${result.expectedFlag}, life check ${result.lifeCheck} (${result.lifeCheckPassed ? 'passed' : 'strained'}).`),
  '',
  '## Crisis Recovery Chains',
  '',
  ...recoveryResults.map(result => `- ${result.eventId}: sets ${result.expectedFlag}, life check ${result.lifeCheck} (${result.lifeCheckPassed ? 'passed' : 'strained'}).`),
  '',
  '## Weekly Action Economy',
  '',
  weeklyActionResult
    ? `- 2 weekday + 1 weekend action allowed; the fourth action is blocked. Remaining slots: weekday ${weeklyActionResult.weekday}, weekend ${weeklyActionResult.weekend}.`
    : '- Weekly action economy check did not complete.',
  '',
  failures.length ? '## Failures' : '## Notes',
  '',
  ...(failures.length ? failures.map(failure => `- ${failure}`) : ['- This is automated route QA for route feasibility and event wiring. It complements, but does not replace, a human read-through for prose pacing.']),
  ''
].join('\n');

await fs.writeFile('FULL_ROUTE_QA_REPORT.md', report);

if (failures.length) {
  console.error(report);
  process.exit(1);
}

console.log(`Full route QA passed: ${routeResults.length} route profiles, ${projectResults.length} route projects, ${recoveryResults.length} recovery chains.`);
console.log('Report written to FULL_ROUTE_QA_REPORT.md');
