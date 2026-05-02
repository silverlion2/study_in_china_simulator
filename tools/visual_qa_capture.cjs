const { app, BrowserWindow } = require('electron');
const fs = require('fs/promises');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'visual-qa-screenshots');

function baseState(overrides = {}) {
  const {
    stats = {},
    guanxi = {},
    flags = {},
    relationships = {},
    weeklyActions = {},
    routeCommitments = {},
    items = {},
    useDefaultRelationships = true,
    ...rootOverrides
  } = overrides;

  return {
    currentNodeId: 'hub',
    turn: 21,
    phase: 'In-China',
    location: 'Shanghai',
    stats: {
      academics: 45,
      chinese: 34,
      wealth: 23100,
      energy: 68,
      digitalProficiency: 46,
      culture: 38,
      ...stats
    },
    guanxi: {
      admin: 12,
      localStudents: 18,
      intlStudents: 16,
      professors: 10,
      ...guanxi
    },
    inventory: [],
    flags: {
      accepted_offer: true,
      got_visa: true,
      arrived_in_china: true,
      arrival_living_funds_unlocked: true,
      has_housing: true,
      decision_e2_housing: 'Minghai Dorm via SimPad Housing',
      housing_choice: 'Minghai Dorm',
      decision_e3_registration: 'Careful office registration',
      decision_e3_first_class: 'Front-row academic start',
      decision_e3_social_circle: 'International-student dinner',
      decision_e3_rhythm: 'Academic anchor',
      campus_rhythm_started: true,
      core_cast_introduced: true,
      met_sophie_on_campus: true,
      met_xiao_chen: true,
      met_neighbor_li: true,
      met_lin_yue: true,
      met_manager_zhang: true,
      met_dr_mei: true,
      met_uncle_wang: true,
      sophie_role_known: true,
      xiao_chen_role_known: true,
      neighbor_li_role_known: true,
      lin_yue_role_known: true,
      manager_zhang_role_known: true,
      dr_mei_role_known: true,
      uncle_wang_role_known: true,
      ...flags
    },
    relationships: {
      ...(useDefaultRelationships ? {
      Sophie: { friendship: 16, romance: 0 },
      'Lin Yue': { friendship: 18, romance: 0 },
      'Xiao Chen': { friendship: 12, romance: 0 },
      'Neighbor Li': { friendship: 11, romance: 0 },
      'Manager Zhang': { friendship: 8, romance: 0 },
      'Dr. Mei': { friendship: 8, romance: 0 },
      'Uncle Wang': { friendship: 8, romance: 0 },
      'Professor Lin': { friendship: 10, romance: 0 },
      } : {}),
      ...relationships
    },
    weeklyActions: { weekday: 3, weekend: 1, ...weeklyActions },
    routeCommitments: {
      academic: 2,
      career: 1,
      local: 1,
      intl: 1,
      city: 0,
      survival: 0,
      ...routeCommitments
    },
    lifeChecks: { last: null, history: [] },
    metaProgress: { completedRuns: 0, endingsSeen: {}, rememberedChecks: [] },
    jobs: { hasJob: false, jobId: null, weeklyIncome: 0, energyCost: 0 },
    transactions: [{ week: 1, amount: 5000, desc: 'Initial Funds', type: 'income' }],
    items: {
      ebike: false,
      headphones: false,
      beddingSet: false,
      deskLamp: false,
      phraseCards: false,
      cityDataPack: false,
      ...items
    },
    ...rootOverrides
  };
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const endingVisualCases = [
  {
    nodeId: 'ending_scholar',
    file: '13-ending-scholar',
    routeCommitments: { academic: 8 },
    stats: { academics: 96, chinese: 58, culture: 64, digitalProficiency: 62 },
    guanxi: { professors: 48 },
    flags: { lin_recommendation_ready: true, academic_portfolio_indexed: true },
    relationships: { 'Professor Lin': { friendship: 34, romance: 0 } }
  },
  {
    nodeId: 'ending_researcher',
    file: '14-ending-researcher',
    routeCommitments: { academic: 5 },
    stats: { academics: 88, chinese: 56, culture: 62, digitalProficiency: 64 },
    guanxi: { professors: 42 },
    flags: { dr_mei_project_commitment: true, dr_mei_project_trust: true },
    relationships: { 'Dr. Mei': { friendship: 34, romance: 0 } }
  },
  {
    nodeId: 'ending_diplomat',
    file: '15-ending-diplomat',
    routeCommitments: { career: 8 },
    stats: { academics: 72, chinese: 60, culture: 72, digitalProficiency: 68 },
    guanxi: { admin: 34, professors: 24 },
    flags: { manager_zhang_referral_ready: true, legal_internship_ready: true },
    relationships: { 'Manager Zhang': { friendship: 34, romance: 0 } }
  },
  {
    nodeId: 'ending_entrepreneur',
    file: '16-ending-entrepreneur',
    routeCommitments: { city: 8 },
    stats: { academics: 64, chinese: 50, culture: 68, digitalProficiency: 88 },
    guanxi: { localStudents: 35, admin: 22 },
    flags: { xiao_chen_demo_day: true, prototype_telemetry_board: true },
    relationships: { 'Xiao Chen': { friendship: 34, romance: 0 } }
  },
  {
    nodeId: 'ending_influencer',
    file: '17-ending-influencer',
    routeCommitments: { intl: 8 },
    stats: { academics: 66, chinese: 48, culture: 66, digitalProficiency: 70 },
    guanxi: { intlStudents: 48 },
    flags: { sophie_orientation_committee: true, support_guide_chapter_ready: true },
    relationships: { Sophie: { friendship: 34, romance: 0 } }
  },
  {
    nodeId: 'ending_local_insider',
    file: '18-ending-local-insider',
    routeCommitments: { local: 8 },
    stats: { academics: 62, chinese: 70, culture: 88, digitalProficiency: 52 },
    guanxi: { localStudents: 48 },
    flags: { neighbor_li_festival_invite: true, uncle_wang_regular: true, neighborhood_map_indexed: true },
    relationships: {
      'Neighbor Li': { friendship: 32, romance: 0 },
      'Uncle Wang': { friendship: 30, romance: 0 }
    }
  },
  {
    nodeId: 'ending_quiet_return',
    file: '19-ending-quiet-return',
    routeCommitments: { survival: 8 },
    stats: { academics: 52, chinese: 42, culture: 54, digitalProficiency: 48, wealth: 620 },
    guanxi: { intlStudents: 20, localStudents: 18, professors: 18 },
    flags: { budget_ledger_audited: true, cheap_housing_compromise: true },
    relationships: { Sophie: { friendship: 14, romance: 0 } }
  },
  {
    nodeId: 'ending_hsk_master',
    file: '20-ending-hsk-master',
    routeCommitments: { local: 4, academic: 3 },
    stats: { academics: 72, chinese: 92, culture: 76, digitalProficiency: 50 },
    guanxi: { localStudents: 36 },
    flags: { language_breakthrough: true },
    relationships: { 'Neighbor Li': { friendship: 24, romance: 0 } }
  },
  {
    nodeId: 'ending_compliance_scare',
    file: '21-ending-compliance-scare',
    routeCommitments: { survival: 5, career: 3 },
    stats: { academics: 58, chinese: 44, culture: 52, digitalProficiency: 56 },
    guanxi: { admin: 14 },
    flags: { unapproved_work_risk: true, career_shortcut_repaired: true },
    relationships: { 'Manager Zhang': { friendship: 18, romance: 0 } }
  },
  {
    nodeId: 'ending_career_shortcut',
    file: '22-ending-career-shortcut',
    routeCommitments: { career: 6 },
    stats: { academics: 60, chinese: 46, culture: 48, digitalProficiency: 66 },
    guanxi: { admin: 20 },
    flags: { career_shortcut_temptation: true, career_shortcut_repaired: false },
    relationships: { 'Manager Zhang': { friendship: 16, romance: 0 } }
  },
  {
    nodeId: 'ending_unreliable_builder',
    file: '23-ending-unreliable-builder',
    routeCommitments: { city: 6 },
    stats: { academics: 58, chinese: 44, culture: 58, digitalProficiency: 78 },
    guanxi: { localStudents: 28 },
    flags: { city_reliability_debt: true, city_reliability_repaired: false },
    relationships: { 'Xiao Chen': { friendship: 18, romance: 0 } }
  },
  {
    nodeId: 'ending_deportee',
    file: '24-ending-deportee',
    routeCommitments: { survival: 6 },
    stats: { academics: 40, chinese: 34, culture: 38, digitalProficiency: 52, wealth: 120 },
    guanxi: { admin: 4, professors: 8 },
    flags: { unapproved_work_risk: true },
    relationships: {}
  },
  {
    nodeId: 'ending_academic_probation',
    file: '25-ending-academic-probation',
    routeCommitments: { survival: 5 },
    stats: { academics: 20, chinese: 42, culture: 45, digitalProficiency: 46 },
    guanxi: { professors: 8 },
    flags: { academic_warning_seen: true },
    relationships: { 'Professor Lin': { friendship: 10, romance: 0 } }
  }
];

async function waitForButtonText(win, text, timeoutMs = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const exists = await win.webContents.executeJavaScript(`
      Array.from(document.querySelectorAll('button')).some((el) => el.textContent.includes(${JSON.stringify(text)}))
    `);
    if (exists) return true;
    await delay(150);
  }
  return false;
}

async function clickButtonByText(win, text) {
  await waitForButtonText(win, text);
  const clicked = await win.webContents.executeJavaScript(`
    (() => {
      const button = Array.from(document.querySelectorAll('button')).find((el) => el.textContent.includes(${JSON.stringify(text)}));
      if (!button) return false;
      button.click();
      return true;
    })()
  `);
  if (!clicked) {
    const buttons = await win.webContents.executeJavaScript(`
      Array.from(document.querySelectorAll('button')).map((el) => el.textContent.trim()).join(' | ')
    `);
    throw new Error(`Missing button "${text}". Available buttons: ${buttons}`);
  }
  await delay(500);
}

async function finishTypewriter(win) {
  await win.webContents.executeJavaScript(`
    (() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      }));
      document.dispatchEvent(new KeyboardEvent('keyup', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      }));
    })()
  `);
  await delay(250);
}

async function capture(win, name) {
  await delay(350);
  const image = await win.webContents.capturePage();
  const filePath = path.join(outputDir, `${name}.png`);
  await fs.writeFile(filePath, image.toPNG());
  return filePath;
}

async function loadGameState(win, state) {
  await win.loadFile(path.join(rootDir, 'index.html'));
  await delay(700);
  await win.webContents.executeJavaScript(`
    localStorage.setItem('sim_panda_save', ${JSON.stringify(JSON.stringify(state))});
    localStorage.setItem('sim_panda_audio_settings', JSON.stringify({ muted: true, volume: 0.7 }));
  `);
  await win.reload();
  await delay(900);
  await clickButtonByText(win, 'Start');
  await waitForButtonText(win, 'Continue Save', 6000);
  await clickButtonByText(win, 'Continue Save');
  await finishTypewriter(win);
}

function endingStateFor(testCase) {
  return baseState({
    currentNodeId: testCase.nodeId,
    turn: 32,
    stats: testCase.stats,
    guanxi: testCase.guanxi,
    flags: {
      calendar_tutorial_completed: true,
      wechat_tutorial_completed: true,
      taobao_tutorial_completed: true,
      decision_e3_final: 'QA ending capture',
      ...testCase.flags
    },
    relationships: testCase.relationships,
    routeCommitments: testCase.routeCommitments,
    useDefaultRelationships: false
  });
}

async function run() {
  await fs.mkdir(outputDir, { recursive: true });

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    backgroundColor: '#020617',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  await win.loadFile(path.join(rootDir, 'index.html'));
  await delay(900);
  await capture(win, '01-cover');
  await clickButtonByText(win, 'Start');
  await capture(win, '02-title-menu');

  await loadGameState(win, baseState({
    currentNodeId: 'taobao_setup',
    turn: 16,
    flags: {
      arrived_in_china: false,
      taobao_simpad_required: true,
      taobao_tutorial_started: true,
      first_taobao_used: false
    },
    relationships: {}
  }));
  await capture(win, '03-taobao-story-gate');
  await clickButtonByText(win, 'SimPad');
  await capture(win, '04-taobao-simpad-required');

  await loadGameState(win, baseState({
    currentNodeId: 'e3_w17_calendar_gate',
    turn: 17,
    flags: {
      calendar_simpad_required: true,
      calendar_tutorial_started: true,
      residence_permit_deadline_saved: true,
      core_cast_introduced: false
    }
  }));
  await capture(win, '05-calendar-story-gate');
  await clickButtonByText(win, 'SimPad');
  await capture(win, '06-calendar-simpad-required');

  await loadGameState(win, baseState({
    currentNodeId: 'e3_w17_wechat_gate',
    turn: 17,
    flags: {
      contact_cards_reviewed: true,
      wechat_simpad_required: true,
      wechat_tutorial_started: true,
      core_cast_introduced: false
    }
  }));
  await capture(win, '07-wechat-story-gate');
  await clickButtonByText(win, 'SimPad');
  await capture(win, '08-wechat-simpad-required');

  await loadGameState(win, baseState({
    currentNodeId: 'hub',
    turn: 21,
    weeklyActions: { weekday: 3, weekend: 1 }
  }));
  await capture(win, '09-weekly-planner');

  await loadGameState(win, baseState({
    currentNodeId: 'e3_w18_lin_yue_intro',
    turn: 18,
    flags: {
      core_cast_introduced: false,
      met_lin_yue: false,
      lin_yue_role_known: false
    },
    relationships: {
      'Lin Yue': { friendship: 0, romance: 0 }
    }
  }));
  await capture(win, '09b-lin-yue-forced-intro');

  await loadGameState(win, baseState({
    currentNodeId: 'event_contact_professor_lin_talk_1',
    turn: 22,
    relationships: {
      'Professor Lin': { friendship: 14, romance: 0 }
    }
  }));
  await capture(win, '09c-professor-lin-dialogue-layout');

  await loadGameState(win, baseState({
    currentNodeId: 'event_request_sophie_new_student',
    turn: 23,
    flags: {
      sophie_arrival_rescue: true
    },
    relationships: {
      Sophie: { friendship: 20, romance: 0 }
    }
  }));
  await capture(win, '09d-sophie-dialogue-layout');

  await loadGameState(win, baseState({
    currentNodeId: 'event_request_manager_zhang_answer',
    turn: 25,
    flags: {
      manager_zhang_mock_interview: true
    },
    relationships: {
      'Manager Zhang': { friendship: 20, romance: 0 }
    }
  }));
  await capture(win, '09e-manager-zhang-dialogue-layout');

  await loadGameState(win, baseState({
    currentNodeId: 'event_contact_xiao_chen_talk_1',
    turn: 22,
    relationships: {
      'Xiao Chen': { friendship: 16, romance: 0 }
    }
  }));
  await capture(win, '09f-xiao-chen-dialogue-layout');

  await loadGameState(win, baseState({
    currentNodeId: 'event_lin_yue_riverside_walk',
    turn: 28,
    flags: {
      lin_yue_presentation_partner: true,
      lin_yue_midterm_tension_resolved: true,
      lin_yue_boundary_repaired: true,
      lin_yue_family_pressure: true
    },
    relationships: {
      'Lin Yue': { friendship: 32, romance: 4 }
    }
  }));
  await capture(win, '09c-lin-yue-riverside-romance');

  await loadGameState(win, baseState({
    currentNodeId: 'epoch3_midterm',
    turn: 24,
    flags: {
      calendar_tutorial_completed: true,
      wechat_tutorial_completed: true,
      taobao_tutorial_completed: true
    }
  }));
  await capture(win, '10-midterm-choice-screen');

  await loadGameState(win, baseState({
    currentNodeId: 'epoch3_final',
    turn: 32,
    stats: {
      academics: 95,
      chinese: 58,
      culture: 64,
      digitalProficiency: 62
    },
    guanxi: {
      professors: 48,
      intlStudents: 32,
      localStudents: 30,
      admin: 22
    },
    flags: {
      route_academic: true,
      lin_recommendation_ready: true,
      academic_portfolio_indexed: true,
      calendar_tutorial_completed: true,
      wechat_tutorial_completed: true,
      taobao_tutorial_completed: true
    },
    relationships: {
      'Professor Lin': { friendship: 32, romance: 0 }
    }
  }));
  await capture(win, '11-week32-final-submission');
  await clickButtonByText(win, 'Submit the academic portfolio');
  await finishTypewriter(win);
  await capture(win, '12-ending-evaluation');
  await clickButtonByText(win, 'Reveal the recommendation path');
  await finishTypewriter(win);
  await capture(win, '13-ending-scholar');
  await clickButtonByText(win, 'Show Scene');
  await capture(win, '13b-ending-scholar-scene-view');

  for (const testCase of endingVisualCases.slice(1)) {
    await loadGameState(win, endingStateFor(testCase));
    await capture(win, testCase.file);
  }

  win.close();
}

app.whenReady().then(run).then(() => app.quit()).catch((error) => {
  console.error(error);
  app.quit();
  process.exitCode = 1;
});
