// Pure vanilla JS State Manager. No dependencies. Portable everywhere.

const INITIAL_STATS = {
  academics: 10,
  chinese: 10,
  wealth: 5000, // RMB
  energy: 100, // Max 100
  digitalProficiency: 5,
  culture: 0, // Cultural Integration
};

const CAPPED_STATS = new Set([
  'academics',
  'chinese',
  'energy',
  'digitalProficiency',
  'culture'
]);

const clampStat = (key, value) => {
  if (value < 0) return 0;
  if (CAPPED_STATS.has(key) && value > 100) return 100;
  return value;
};

const INITIAL_STATE = {
  currentNodeId: "start",
  turn: 1, // 1 turn = 1 week
  phase: "Application", // "Application", "Pre-Departure", "In-China"
  location: "Home Country", // The city the player is currently in
  stats: { ...INITIAL_STATS },
  guanxi: {
    admin: 0,
    localStudents: 0,
    intlStudents: 0,
    professors: 0
  },
  inventory: [],
  flags: {}, // For story tracking, e.g. { "got_vpn": true }
  
  relationships: {},

  weeklyActions: {
    weekday: 3,
    weekend: 1
  },

  routeCommitments: {
    academic: 0,
    career: 0,
    local: 0,
    intl: 0,
    city: 0,
    survival: 0
  },

  lifeChecks: {
    last: null,
    history: []
  },

  metaProgress: {
    completedRuns: 0,
    endingsSeen: {},
    rememberedChecks: []
  },

  // New Economy System
  jobs: {
    hasJob: false,
    jobId: null,
    weeklyIncome: 0,
    energyCost: 0
  },
  transactions: [
    { week: 1, amount: 5000, desc: "Initial Funds", type: "income" }
  ],
  items: {
    ebike: false,
    headphones: false,
    beddingSet: false,
    deskLamp: false,
    phraseCards: false,
    cityDataPack: false
  }
};

const NODE_UNLOCK_FLAGS = {
  money_crisis: ['money_crisis_seen'],
  game_over_wealth: ['money_crisis_seen', 'ending_out_of_money'],
  ending_scholar: ['ending_scholar'],
  ending_researcher: ['ending_researcher'],
  ending_entrepreneur: ['ending_entrepreneur'],
  ending_diplomat: ['ending_diplomat', 'ending_return_offer'],
  ending_influencer: ['ending_influencer'],
  ending_local_insider: ['ending_local_insider'],
  ending_hsk_master: ['ending_hsk_master', 'language_breakthrough'],
  ending_quiet_return: ['ending_quiet_return'],
  ending_compliance_scare: ['ending_compliance_scare'],
  ending_career_shortcut: ['ending_career_shortcut'],
  ending_unreliable_builder: ['ending_unreliable_builder'],
  ending_deportee: ['ending_deportee'],
  ending_academic_probation: ['ending_academic_probation'],
  e3_w18_lin_yue_intro: ['met_lin_yue', 'lin_yue_role_known', 'wechat_lin_yue_added'],
  event_contact_lin_yue_talk_1: ['contact_lin_yue_talk_1'],
  event_request_lin_yue_presentation: ['request_lin_yue_presentation'],
  event_lin_yue_library_presentation: ['lin_yue_presentation_partner'],
  event_lin_yue_boundary_tension: ['lin_yue_midterm_tension_resolved'],
  event_lin_yue_family_pressure: ['lin_yue_family_pressure'],
  event_lin_yue_riverside_walk: ['lin_yue_riverside_walk']
};

const LIFE_CHECK_PREP_CARDS = [
  {
    id: 'calendar_focus',
    title: 'Pinned Calendar',
    tags: ['admin', 'academic', 'career', 'arrival'],
    bonus: 2,
    isActive: (state) => Boolean(state.flags?.calendar_focus)
  },
  {
    id: 'calendar_admin_prepped',
    title: 'Admin Checklist',
    tags: ['admin', 'visa', 'registration'],
    bonus: 3,
    isActive: (state) => Boolean(state.flags?.calendar_admin_prepped || state.flags?.calendar_application_prepped)
  },
  {
    id: 'professor_notes',
    title: 'Professor Notes',
    tags: ['academic', 'explanation'],
    bonus: 3,
    isActive: (state) => Boolean(state.flags?.contact_professor_lin_talk_1 || state.flags?.lin_academic_method)
  },
  {
    id: 'field_note_care',
    title: 'Field-Note Care',
    tags: ['academic', 'research'],
    bonus: 3,
    isActive: (state) => Boolean(state.flags?.dr_mei_field_note_care || state.flags?.contact_dr_mei_talk_1)
  },
  {
    id: 'sophie_arrival_guide',
    title: 'Arrival Guide Draft',
    tags: ['arrival', 'social', 'intl'],
    bonus: 3,
    isActive: (state) => Boolean(state.flags?.sophie_arrival_helper || state.flags?.sophie_orientation_committee)
  },
  {
    id: 'manager_feedback',
    title: 'Evidence Feedback',
    tags: ['career', 'interview'],
    bonus: 3,
    isActive: (state) => Boolean(state.flags?.manager_zhang_evidence_answer || state.flags?.manager_zhang_usefulness_frame)
  },
  {
    id: 'neighbor_rules',
    title: 'Unwritten Dorm Rules',
    tags: ['local', 'delivery', 'housing'],
    bonus: 3,
    isActive: (state) => Boolean(state.flags?.neighbor_li_parcel_mediator || state.flags?.contact_neighbor_li_talk_1)
  },
  {
    id: 'uncle_wang_bridge',
    title: 'Order Bridge',
    tags: ['local', 'language', 'social'],
    bonus: 3,
    isActive: (state) => Boolean(state.flags?.uncle_wang_order_bridge || state.flags?.contact_uncle_wang_talk_1)
  },
  {
    id: 'phrase_cards',
    title: 'Phrase Cards',
    tags: ['language', 'arrival', 'local'],
    bonus: 2,
    isActive: (state) => Boolean(state.items?.phraseCards)
  },
  {
    id: 'city_data_pack',
    title: 'City Data Pack',
    tags: ['digital', 'arrival', 'delivery'],
    bonus: 2,
    isActive: (state) => Boolean(state.items?.cityDataPack)
  },
  {
    id: 'wechat_repair',
    title: 'WeChat Repair Habit',
    tags: ['social', 'career', 'local', 'academic'],
    bonus: 1,
    isActive: (state) => Boolean(state.flags?.wechat_repair_messages_sent || state.flags?.sent_wechat_ping_this_week)
  },
  {
    id: 'second_run_memory',
    title: 'Previous Run Memory',
    tags: ['admin', 'visa', 'registration', 'academic', 'career', 'local', 'social', 'intl', 'survival'],
    bonus: 1,
    isActive: (state) => Boolean(state.flags?.second_run_memory)
  }
];

export class EngineState {
  constructor() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.listeners = [];
  }

  // Subscribe to state changes (React will use this)
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify listeners
  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // Get current state
  getState() {
    return this.state;
  }

  addMagnet(magnet) {
    if (!this.state.inventory) this.state.inventory = [];
    const exists = this.state.inventory.find(m => m.name === magnet.name);
    if (!exists) {
      this.state.inventory.push(magnet);
      this.notify();
    }
  }

  addTransaction(amount, desc) {
    this.state.transactions.push({
      week: this.state.turn,
      amount: amount,
      desc: desc,
      type: amount >= 0 ? "income" : "expense"
    });
    this.state.stats.wealth += amount;
    if (this.state.stats.wealth < 0) this.state.stats.wealth = 0;
  }

  applyStatDelta(statChanges = {}) {
    for (const [key, value] of Object.entries(statChanges)) {
      const statKey = key === 'sanity' ? 'energy' : key;
      if (statKey === 'wealth') {
        this.addTransaction(value, value > 0 ? "Misc Income" : "Misc Expense");
      } else if (this.state.stats[statKey] !== undefined) {
        this.state.stats[statKey] = clampStat(statKey, this.state.stats[statKey] + value);
      }
    }
  }

  setJob(jobId, income, energyCost) {
    if (jobId === null) {
      this.state.jobs = { hasJob: false, jobId: null, weeklyIncome: 0, energyCost: 0 };
    } else {
      this.state.jobs = { hasJob: true, jobId, weeklyIncome: income, energyCost };
    }
    this.notify();
  }

  purchaseItem(itemId, cost, label = null, effects = {}) {
    if (this.state.stats.wealth >= cost && !this.state.items[itemId]) {
      this.addTransaction(-cost, label || `Purchased ${itemId}`);
      this.state.items[itemId] = true;
      this.state.flags.first_taobao_used = true;
      this.state.flags[`taobao_item_${itemId}`] = true;
      if (effects.stats) this.applyStatDelta(effects.stats);
      if (effects.flags) {
        for (const [flag, value] of Object.entries(effects.flags)) {
          this.state.flags[flag] = value;
        }
      }
      this.notify();
      return true;
    }
    return false;
  }

  useDidiRide(rideId) {
    const rideOptions = {
      standard: {
        cost: 45,
        label: "DiDi Ride: Campus Errand",
        stats: { energy: 8, digitalProficiency: 1 },
        message: "The short ride buys back enough energy to make the next task feel possible."
      },
      comfort: {
        cost: 88,
        label: "DiDi Ride: Cross-Town Shortcut",
        stats: { energy: 14, digitalProficiency: 2, culture: 1 },
        message: "The shortcut is expensive, but Shanghai feels smaller for one afternoon."
      },
      airport: {
        cost: 160,
        label: "DiDi Ride: Airport Transfer Practice",
        stats: { energy: 20, digitalProficiency: 3, culture: 2 },
        message: "You rehearse the pickup-zone logic before a real travel day can punish you for improvising."
      }
    };

    const ride = rideOptions[rideId];
    if (!ride || this.state.phase !== "In-China") {
      return { ok: false, message: "DiDi becomes active after arrival in Shanghai." };
    }
    if (this.state.flags.used_didi_this_week) {
      return { ok: false, message: "You already used DiDi this week." };
    }
    const airportGateActive = Boolean(this.state.flags.airport_didi_required && rideId === "airport");
    if (this.state.stats.wealth < ride.cost && !airportGateActive) {
      return { ok: false, message: "Not enough RMB for this ride." };
    }

    this.addTransaction(-ride.cost, ride.label);
    const stats = { ...ride.stats };
    if (airportGateActive && this.state.flags.didi_airport_mode === "pressure") {
      stats.energy = (stats.energy || 0) - 12;
      stats.digitalProficiency = (stats.digitalProficiency || 0) + 3;
    }
    if (!this.state.items.cityDataPack && !this.state.flags.didi_pickup_zone_lesson) {
      stats.energy = Math.max(0, (stats.energy || 0) - 4);
      this.state.flags.didi_pickup_friction = true;
      this.state.flags.didi_pickup_friction_ready = true;
    }
    this.applyStatDelta(stats);
    this.state.flags.used_didi_this_week = true;
    this.state.flags.first_didi_used = true;
    this.state.flags[`didi_${rideId}_used`] = true;
    if (airportGateActive) {
      this.state.flags.airport_didi_required = false;
      this.state.flags.airport_didi_confirmed = true;
      this.state.flags.didi_pickup_zone_lesson = true;
      this.state.flags.route_shared_to_minghai_chat = true;
      this.state.flags.decision_e3_transport = this.state.flags.didi_airport_mode === "pressure"
        ? "Airport DiDi setup in SimPad"
        : "Prepared DiDi from Pudong via SimPad";
      this.state.currentNodeId = "didi_pickup_lesson";
    }
    this.notify();
    const friction = this.state.flags.didi_pickup_friction_ready ? " The pickup point costs extra focus because your city app setup is still thin." : "";
    const storyProgress = airportGateActive ? " Story advanced to the pickup-zone lesson." : "";
    return { ok: true, message: `${ride.message}${friction}${storyProgress}` };
  }

  useTaobaoServiceOrder(orderId) {
    const orderOptions = {
      dormFix: {
        cost: 65,
        label: "Taobao: Same-Day Dorm Fix",
        stats: { energy: 4, digitalProficiency: 1 },
        message: "The courier finds your dorm after two location pins and one awkward phone call. Your room is slightly more livable tonight."
      },
      wrongAddress: {
        cost: 35,
        label: "Taobao: Wrong-Address Recovery",
        stats: { digitalProficiency: 3, culture: 1, energy: -1 },
        message: "You untangle a delivery problem through screenshots, polite voice notes, and one very patient courier."
      },
      mealPrep: {
        cost: 120,
        label: "Taobao: Meal Prep Box",
        stats: { energy: 6, digitalProficiency: 1 },
        message: "Not glamorous, but future-you is grateful when dinner does not require another decision."
      }
    };

    const order = orderOptions[orderId];
    if (!order || this.state.phase !== "In-China") {
      return { ok: false, message: "Taobao service orders unlock after arrival in China." };
    }
    if (this.state.flags.used_taobao_service_this_week) {
      return { ok: false, message: "You already handled one service order this week." };
    }
    if (this.state.stats.wealth < order.cost) {
      return { ok: false, message: "Not enough RMB for this order." };
    }

    this.addTransaction(-order.cost, order.label);
    this.applyStatDelta(order.stats);
    this.state.flags.used_taobao_service_this_week = true;
    this.state.flags.first_taobao_used = true;
    this.state.flags[`taobao_service_${orderId}`] = true;
    if (orderId === "wrongAddress") this.state.flags.taobao_wrong_address_recovery_used = true;
    if (orderId === "mealPrep") this.state.flags.taobao_meal_prep_buffer = true;
    if (orderId === "dormFix") this.state.flags.taobao_dorm_fix_used = true;
    this.notify();
    return { ok: true, message: order.message };
  }

  sendWeChatCheckIn(character) {
    if (!character) return false;
    if (this.state.flags.sent_wechat_ping_this_week && !this.state.flags.wechat_simpad_required) return false;
    if (!this.state.relationships?.[character]) return false;

    this.state.relationships[character].friendship = Math.min(100, (this.state.relationships[character].friendship || 0) + 2);
    this.applyStatDelta({ energy: -2, chinese: 1 });
    this.state.flags.sent_wechat_ping_this_week = true;
    this.state.flags.wechat_silence_weeks = 0;
    this.state.flags[`wechat_ping_${character.replace(/\s+/g, '_').toLowerCase()}`] = true;
    this.addTransaction(0, `WeChat check-in: ${character}`);
    this.notify();
    return true;
  }

  pinCalendarFocus(title) {
    if (!title) return { ok: false, message: "No calendar item selected." };
    this.state.flags.calendar_focus = title;
    this.state.flags.calendar_focus_pinned_week = this.state.turn;
    this.state.flags.calendar_focus_used_this_week = true;
    this.addTransaction(0, `Calendar pinned: ${title}`);
    this.notify();
    return { ok: true, message: `Pinned: ${title}. The next weekly transition will respect this focus.` };
  }

  applyCalendarFocusOutcome() {
    const focus = this.state.flags.calendar_focus || "";
    if (!focus || this.state.flags.calendar_focus_last_applied_week === this.state.turn) return;

    const lower = focus.toLowerCase();
    let stats = null;
    let flag = null;
    let message = null;

    if (lower.includes("application")) {
      stats = { academics: 3, energy: -1 };
      flag = "calendar_application_prepped";
      message = "Calendar prep converts application panic into a cleaner checklist.";
    } else if (lower.includes("statement")) {
      stats = { academics: 3, digitalProficiency: 1, energy: -1 };
      flag = "calendar_statement_prepped";
      message = "Pinned statement time makes the draft less foggy.";
    } else if (lower.includes("funding")) {
      stats = { digitalProficiency: 2, energy: -1 };
      flag = "calendar_funding_prepped";
      message = "Budget prep catches one future expense before it bites.";
    } else if (lower.includes("visa") || lower.includes("registration")) {
      stats = { digitalProficiency: 2, culture: 1 };
      flag = "calendar_admin_prepped";
      message = "Admin prep turns one office visit from panic into sequence.";
    } else if (lower.includes("digital")) {
      stats = { digitalProficiency: 3 };
      flag = "calendar_digital_prepped";
      message = "Digital prep makes the phone feel more like a tool and less like a trap.";
    } else if (lower.includes("midterm")) {
      stats = { academics: 4, energy: -2 };
      flag = "calendar_midterm_prepped";
      message = "Midterm prep pays off before the library becomes a battlefield.";
    } else if (lower.includes("future")) {
      stats = { digitalProficiency: 2, culture: 1 };
      flag = "calendar_future_prepped";
      message = "Future-direction prep makes the next opportunity easier to judge.";
    } else if (lower.includes("year-end") || lower.includes("review")) {
      stats = { academics: 2, culture: 2 };
      flag = "calendar_final_prepped";
      message = "Year-end prep helps the ending remember more than raw stats.";
    }

    if (!stats) return;
    this.applyStatDelta(stats);
    this.state.flags[flag] = true;
    this.state.flags.calendar_focus_last_applied_week = this.state.turn;
    this.state.flags.calendar_focus_last_message = message;
    this.addTransaction(0, `Calendar focus payoff: ${focus}`);
  }

  applyPhoneLayerConsequences() {
    if (this.state.phase !== "In-China") return;

    if (this.state.flags.taobao_meal_prep_buffer) {
      this.applyStatDelta({ energy: 3 });
      this.state.flags.taobao_meal_prep_buffer = false;
      this.state.flags.taobao_meal_prep_paid_off = true;
      this.addTransaction(0, "Meal prep saved an evening");
    }

    const relationshipEntries = Object.entries(this.state.relationships || {})
      .filter(([, rel]) => (rel.friendship || 0) >= 12);
    if (relationshipEntries.length > 0) {
      if (this.state.flags.sent_wechat_ping_this_week) {
        this.state.flags.wechat_silence_weeks = 0;
      } else {
        this.state.flags.wechat_silence_weeks = (this.state.flags.wechat_silence_weeks || 0) + 1;
        if (this.state.flags.wechat_silence_weeks >= 2) {
          for (const [name, rel] of relationshipEntries.slice(0, 3)) {
            rel.friendship = Math.max(0, (rel.friendship || 0) - 1);
            this.state.flags[`wechat_drift_${name.replace(/\s+/g, '_').toLowerCase()}`] = true;
          }
          this.state.flags.wechat_silence_consequence_ready = true;
          this.addTransaction(0, "Missed WeChat check-ins created distance");
        }
      }
    }
  }

  spendWeeklyAction(slot = 'auto') {
    if (!this.state.weeklyActions) {
      this.state.weeklyActions = { weekday: 3, weekend: 1 };
    }

    const actions = this.state.weeklyActions;
    let spentSlot = null;

    if (slot === 'weekday' && actions.weekday > 0) {
      actions.weekday -= 1;
      spentSlot = 'weekday';
    } else if (slot === 'weekend' && actions.weekend > 0) {
      actions.weekend -= 1;
      spentSlot = 'weekend';
    } else if (actions.weekday > 0) {
      actions.weekday -= 1;
      spentSlot = 'weekday';
    } else if (actions.weekend > 0) {
      actions.weekend -= 1;
      spentSlot = 'weekend';
    }

    if (!spentSlot) return { spent: false, weekComplete: true, slot: null };

    this.state.flags.last_action_slot = spentSlot;
    this.notify();
    return {
      spent: true,
      weekComplete: (actions.weekday + actions.weekend) <= 0,
      slot: spentSlot
    };
  }

  getWeeklyActionsRemaining() {
    const actions = this.state.weeklyActions || { weekday: 0, weekend: 0 };
    return (actions.weekday || 0) + (actions.weekend || 0);
  }

  getActivePrepCards(tags = []) {
    const wantedTags = new Set(tags);
    return LIFE_CHECK_PREP_CARDS
      .filter(card => card.isActive(this.state))
      .map(card => ({
        ...card,
        matched: card.tags.filter(tag => wantedTags.has(tag))
      }))
      .filter(card => card.matched.length > 0);
  }

  getLifeCheckScore(config = {}) {
    const stats = this.state.stats || {};
    const guanxi = this.state.guanxi || {};
    const relationships = this.state.relationships || {};
    const routeCommitments = this.state.routeCommitments || {};
    const tags = config.tags || [];
    const statWeights = config.stats || {};
    const guanxiWeights = config.guanxi || {};
    const routeWeights = config.routes || {};
    const prepCards = this.getActivePrepCards(tags);

    let score = Number(config.base || 0);
    const parts = [];

    for (const [stat, weight] of Object.entries(statWeights)) {
      const statKey = stat === 'sanity' ? 'energy' : stat;
      const value = Number(stats[statKey] || 0);
      const contribution = Math.floor(value * Number(weight || 0));
      if (contribution) {
        score += contribution;
        parts.push({ label: statKey, value: contribution });
      }
    }

    for (const [faction, weight] of Object.entries(guanxiWeights)) {
      const value = Number(guanxi[faction] || 0);
      const contribution = Math.floor(value * Number(weight || 0));
      if (contribution) {
        score += contribution;
        parts.push({ label: `${faction} guanxi`, value: contribution });
      }
    }

    if (config.character) {
      const friendship = Number(relationships[config.character]?.friendship || 0);
      const relationshipContribution = Math.floor(friendship * Number(config.relationshipWeight ?? 0.35));
      if (relationshipContribution) {
        score += relationshipContribution;
        parts.push({ label: `${config.character} trust`, value: relationshipContribution });
      }
    }

    for (const [route, weight] of Object.entries(routeWeights)) {
      const value = Number(routeCommitments[route] || 0);
      const contribution = Math.floor(value * Number(weight || 0));
      if (contribution) {
        score += contribution;
        parts.push({ label: `${route} route`, value: contribution });
      }
    }

    const prepBonus = prepCards.reduce((total, card) => total + Number(card.bonus || 0), 0);
    if (prepBonus) {
      score += prepBonus;
      parts.push({ label: 'prep cards', value: prepBonus });
    }

    return {
      score,
      dc: Number(config.dc || 0),
      prepCards: prepCards.map(card => ({ id: card.id, title: card.title, bonus: card.bonus })),
      parts
    };
  }

  runLifeCheck(config = {}) {
    if (!config.id) return null;

    const check = this.getLifeCheckScore(config);
    const success = check.score >= check.dc;
    const outcome = success ? (config.success || {}) : (config.failure || {});
    const result = {
      id: config.id,
      label: config.label || config.id,
      route: config.route || null,
      score: check.score,
      dc: check.dc,
      success,
      margin: check.score - check.dc,
      prepCards: check.prepCards,
      parts: check.parts,
      message: outcome.message || (success ? 'Preparation carries the moment.' : 'The missing preparation shows up at the worst time.'),
      week: this.state.turn
    };

    if (!this.state.lifeChecks) this.state.lifeChecks = { last: null, history: [] };
    this.state.lifeChecks.last = result;
    this.state.lifeChecks.history = [...(this.state.lifeChecks.history || []), result].slice(-12);
    this.state.flags[`life_check_${config.id}_${success ? 'success' : 'failure'}`] = true;
    this.state.flags.last_life_check_id = config.id;
    this.state.flags.last_life_check_success = success;
    this.state.flags.last_life_check_label = result.label;

    if (outcome.stats) this.applyStatDelta(outcome.stats);
    if (outcome.guanxi) {
      for (const [faction, amount] of Object.entries(outcome.guanxi)) {
        if (this.state.guanxi[faction] !== undefined) {
          this.state.guanxi[faction] += amount;
        }
      }
    }
    if (outcome.relationships) {
      for (const [character, changes] of Object.entries(outcome.relationships)) {
        if (!this.state.relationships[character]) this.state.relationships[character] = { friendship: 0, romance: 0 };
        for (const [key, value] of Object.entries(changes)) {
          this.state.relationships[character][key] = Math.max(0, Math.min(100, (this.state.relationships[character][key] || 0) + value));
        }
      }
    }
    if (outcome.flags) {
      for (const [flag, value] of Object.entries(outcome.flags)) {
        this.state.flags[flag] = value;
      }
    }
    this.addTransaction(0, `Life Check: ${result.label} ${success ? 'passed' : 'strained'}`);
    this.notify();
    return result;
  }

  // Advance time by 1 week
  advanceTurn() {
    this.applyCalendarFocusOutcome();
    this.applyPhoneLayerConsequences();

    this.state.turn += 1;
    this.state.weeklyActions = { weekday: 3, weekend: 1 };
    this.state.flags.has_worked_this_week = false;
    this.state.flags.used_didi_this_week = false;
    this.state.flags.sent_wechat_ping_this_week = false;
    this.state.flags.used_taobao_service_this_week = false;
    
    // Process weekly expenses
    this.addTransaction(-200, "Weekly Living Expenses");
    const housingRent = Number(this.state.flags.housing_rent_weekly || 0);
    if (housingRent > 0) {
      this.addTransaction(-housingRent, `Weekly Housing Rent: ${this.state.flags.housing_choice || "Shanghai Housing"}`);
      const commute = this.state.flags.housing_commute || "";
      if (/35|long/i.test(commute)) {
        this.state.stats.energy = Math.max(0, this.state.stats.energy - 3);
      } else if (/25|moderate/i.test(commute)) {
        this.state.stats.energy = Math.max(0, this.state.stats.energy - 1);
      }
    }

    // Process job
    if (this.state.jobs.hasJob) {
      this.addTransaction(this.state.jobs.weeklyIncome, "Part-Time Job Income");
      this.state.stats.energy -= this.state.jobs.energyCost;
      if (!this.state.items.headphones) {
         // Slightly hurts academics to work without good studying equipment
         this.state.stats.academics = Math.max(0, this.state.stats.academics - 1);
      }
    }
    
    // Apply weekly decay
    let baseDrain = 2;
    if (this.state.items.ebike) baseDrain -= 1; // Ebike helps!
    this.state.stats.energy -= baseDrain;
    
    if (this.state.stats.energy < 0) this.state.stats.energy = 0;
    
    // Auto-advance phase
    if (this.state.turn >= 8 && this.state.phase === "Application") {
      this.state.phase = "Pre-Departure";
    } else if (this.state.turn >= 16 && this.state.phase === "Pre-Departure") {
      this.state.phase = "In-China";
    }
    
    this.notify();
  }

  // Update multiple stats // DEPRECATED for wealth: try to use addTransaction, but keep for compatibility
  updateStats(statChanges) {
    for (const [key, value] of Object.entries(statChanges)) {
      const statKey = key === 'sanity' ? 'energy' : key;
      if (this.state.stats[statKey] !== undefined) {
        if (statKey === 'wealth') {
            this.addTransaction(value, value > 0 ? "Misc Income" : "Misc Expense");
        } else {
            this.state.stats[statKey] += value;
        }
        // Hard bounds for ability-style stats. Wealth is handled separately as RMB.
        this.state.stats[statKey] = clampStat(statKey, this.state.stats[statKey]);
      }
    }
    this.notify();
  }

  updateRouteCommitment(route, amount = 1) {
    if (!this.state.routeCommitments) {
      this.state.routeCommitments = { ...INITIAL_STATE.routeCommitments };
    }
    if (this.state.routeCommitments[route] === undefined) return;
    this.state.routeCommitments[route] = Math.max(0, this.state.routeCommitments[route] + amount);

    const labels = {
      academic: "Academic / Research route",
      career: "Career / Internship route",
      local: "Local Life route",
      intl: "Social / International route",
      city: "Shanghai Opportunity route",
      survival: "Survival / Budget route"
    };
    const strongest = Object.entries(this.state.routeCommitments)
      .sort((a, b) => b[1] - a[1])[0];
    if (strongest && strongest[1] >= 4) {
      this.state.flags.route_commitment = strongest[0];
      this.state.flags.route_commitment_label = labels[strongest[0]];
    }
  }

  // Update specific deep relationships (friendship and romance)
  updateRelationship(character, changes) {
    if (!this.state.relationships) this.state.relationships = {};
    if (!this.state.relationships[character]) {
        this.state.relationships[character] = { friendship: 0, romance: 0 };
    }
    for (const [key, value] of Object.entries(changes)) {
        this.state.relationships[character][key] += value;
        if (this.state.relationships[character][key] < 0) this.state.relationships[character][key] = 0;
        if (this.state.relationships[character][key] > 100) this.state.relationships[character][key] = 100;
    }
    this.notify();
  }

  // Update specific Guanxi faction
  updateGuanxi(faction, amount) {
    if (this.state.guanxi[faction] !== undefined) {
      this.state.guanxi[faction] += amount;
      this.notify();
    }
  }

  // Set a story flag
  setFlag(flagName, value = true) {
    this.state.flags[flagName] = value;
    if (value === true) {
      const routeFlagMap = {
        route_academic: "academic",
        academic_seed: "academic",
        route_career: "career",
        career_seed: "career",
        route_local: "local",
        local_seed: "local",
        route_intl: "intl",
        intl_seed: "intl",
        route_city: "city",
        city_seed: "city",
        route_survival: "survival",
        finance_working: "survival",
        background_working_budget: "survival",
        emergency_funding_used: "survival",
        budget_reviewed: "survival",
        housing_energy_scar: "survival"
      };
      if (routeFlagMap[flagName]) {
        this.updateRouteCommitment(routeFlagMap[flagName], 1);
      }
    }
    this.notify();
  }

  setCurrentNode(nodeId) {
    this.state.currentNodeId = nodeId;
    if (nodeId?.startsWith('ending_')) {
      this.state.flags[nodeId] = true;
      if (!this.state.metaProgress) this.state.metaProgress = { completedRuns: 0, endingsSeen: {}, rememberedChecks: [] };
      if (!this.state.metaProgress.endingsSeen[nodeId]) {
        this.state.metaProgress.completedRuns += 1;
        this.state.metaProgress.endingsSeen[nodeId] = true;
      }
      const rememberedChecks = (this.state.lifeChecks?.history || [])
        .filter(check => check.id)
        .slice(-8)
        .map(check => ({
          id: check.id,
          label: check.label,
          success: check.success,
          route: check.route || null
        }));
      this.state.metaProgress.rememberedChecks = rememberedChecks;
    }
    for (const flag of NODE_UNLOCK_FLAGS[nodeId] || []) {
      this.state.flags[flag] = true;
    }
    this.notify();
  }

  setLocation(city) {
    this.state.location = city;
    this.notify();
  }

  // Reset Game
  reset() {
    const metaProgress = this.state.metaProgress || { completedRuns: 0, endingsSeen: {}, rememberedChecks: [] };
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.state.metaProgress = {
      completedRuns: metaProgress.completedRuns || 0,
      endingsSeen: { ...(metaProgress.endingsSeen || {}) },
      rememberedChecks: Array.isArray(metaProgress.rememberedChecks) ? metaProgress.rememberedChecks.slice(-8) : []
    };
    if (this.state.metaProgress.completedRuns > 0) {
      this.state.flags.second_run_memory = true;
      this.state.flags.second_run_memory_count = this.state.metaProgress.completedRuns;
      this.state.stats.digitalProficiency = clampStat('digitalProficiency', this.state.stats.digitalProficiency + 2);
      this.state.stats.energy = clampStat('energy', this.state.stats.energy + 3);
      this.state.transactions.push({
        week: 1,
        amount: 0,
        desc: "Second-run memory: you remember a few traps before they happen",
        type: "income"
      });
    }
    this.notify();
  }

  // Persistence
  save() {
    try {
      localStorage.setItem('sim_panda_save', JSON.stringify(this.state));
    } catch(e) { console.error("Save failed", e); }
  }

  load() {
    try {
      const data = localStorage.getItem('sim_panda_save');
      if (data) {
        const parsed = JSON.parse(data);
        this.state = { ...this.state, ...parsed }; // Merge to preserve structure
        // Migrate older saves from the former "sanity" stat to "energy".
        const loadedStats = this.state.stats || {};
        const migratedEnergy = loadedStats.energy !== undefined ? loadedStats.energy : loadedStats.sanity;
        this.state.stats = {
          ...INITIAL_STATS,
          ...loadedStats,
          energy: migratedEnergy !== undefined ? migratedEnergy : INITIAL_STATS.energy
        };
        for (const [statKey, value] of Object.entries(this.state.stats)) {
          this.state.stats[statKey] = clampStat(statKey, value);
        }
        delete this.state.stats.sanity;
        
        // Handle migration for older saves without economy
        if (!this.state.location) this.state.location = this.state.phase === "In-China" ? "Shanghai" : "Home Country";
        if (!this.state.jobs) this.state.jobs = { hasJob: false, jobId: null, weeklyIncome: 0, energyCost: 0 };
        if (this.state.jobs.energyCost === undefined && this.state.jobs.sanityCost !== undefined) {
          this.state.jobs.energyCost = this.state.jobs.sanityCost;
        }
        delete this.state.jobs.sanityCost;
        if (!this.state.transactions) this.state.transactions = [{ week: 1, amount: this.state.stats.wealth, desc: "Initial Funds", type: "income" }];
        if (!this.state.items) this.state.items = { ...INITIAL_STATE.items };
        else this.state.items = { ...INITIAL_STATE.items, ...this.state.items };
        if (!this.state.relationships) this.state.relationships = {};
        if (!this.state.weeklyActions) this.state.weeklyActions = { weekday: 3, weekend: 1 };
        else this.state.weeklyActions = {
          weekday: Math.max(this.state.weeklyActions.weekday ?? 3, 3),
          weekend: this.state.weeklyActions.weekend ?? 1
        };
        if (!this.state.routeCommitments) this.state.routeCommitments = { ...INITIAL_STATE.routeCommitments };
        else this.state.routeCommitments = { ...INITIAL_STATE.routeCommitments, ...this.state.routeCommitments };
        if (!this.state.lifeChecks) this.state.lifeChecks = { last: null, history: [] };
        else this.state.lifeChecks = {
          last: this.state.lifeChecks.last || null,
          history: Array.isArray(this.state.lifeChecks.history) ? this.state.lifeChecks.history.slice(-12) : []
        };
        if (!this.state.metaProgress) this.state.metaProgress = { completedRuns: 0, endingsSeen: {}, rememberedChecks: [] };
        else this.state.metaProgress = {
          completedRuns: this.state.metaProgress.completedRuns || 0,
          endingsSeen: { ...(this.state.metaProgress.endingsSeen || {}) },
          rememberedChecks: Array.isArray(this.state.metaProgress.rememberedChecks) ? this.state.metaProgress.rememberedChecks.slice(-8) : []
        };

        this.notify();
        return true;
      }
    } catch(e) { console.error("Load failed", e); }
    return false;
  }
}

// Export a singleton instance for simplicity, though React Context can inject it too.
export const gameEngine = new EngineState();
