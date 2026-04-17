import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function validate() {
  const epoch1 = (await import('./data/epoch1.js')).epoch1Events;
  const epoch2 = (await import('./data/epoch2.js')).epoch2Events;
  const epoch3 = (await import('./data/epoch3.js')).epoch3Events;
  const hub = (await import('./data/hubData.js')).hubData;

  const allNodes = { ...epoch1, ...epoch2, ...epoch3, ...hub };
  const definedKeys = new Set(Object.keys(allNodes));

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

  console.log('--- VALIDATION RESULTS ---');
  if (errors.length > 0) {
      console.log(`Found ${errors.length} ERRORS:`);
      errors.forEach(e => console.log('❌ ' + e));
  } else {
      console.log('✅ No hard pointer errors found.');
  }
}

validate().catch(console.error);
