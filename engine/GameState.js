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
  ending_academic_probation: ['ending_academic_probation']
};

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
        stats: { energy: 8, digitalProficiency: 1 }
      },
      comfort: {
        cost: 88,
        label: "DiDi Ride: Cross-Town Shortcut",
        stats: { energy: 14, digitalProficiency: 2, culture: 1 }
      },
      airport: {
        cost: 160,
        label: "DiDi Ride: Airport Transfer Practice",
        stats: { energy: 20, digitalProficiency: 3, culture: 2 }
      }
    };

    const ride = rideOptions[rideId];
    if (!ride || this.state.phase !== "In-China") return false;
    if (this.state.flags.used_didi_this_week || this.state.stats.wealth < ride.cost) return false;

    this.addTransaction(-ride.cost, ride.label);
    this.applyStatDelta(ride.stats);
    this.state.flags.used_didi_this_week = true;
    this.notify();
    return true;
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
    this.notify();
    return { ok: true, message: order.message };
  }

  sendWeChatCheckIn(character) {
    if (!character || this.state.flags.sent_wechat_ping_this_week) return false;
    if (!this.state.relationships?.[character]) return false;

    this.state.relationships[character].friendship = Math.min(100, (this.state.relationships[character].friendship || 0) + 2);
    this.applyStatDelta({ energy: -2, chinese: 1 });
    this.state.flags.sent_wechat_ping_this_week = true;
    this.addTransaction(0, `WeChat check-in: ${character}`);
    this.notify();
    return true;
  }

  // Advance time by 1 week
  advanceTurn() {
    this.state.turn += 1;
    this.state.flags.has_worked_this_week = false;
    this.state.flags.used_didi_this_week = false;
    this.state.flags.sent_wechat_ping_this_week = false;
    this.state.flags.used_taobao_service_this_week = false;
    
    // Process weekly expenses
    this.addTransaction(-200, "Weekly Living Expenses");

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
    this.notify();
  }

  setCurrentNode(nodeId) {
    this.state.currentNodeId = nodeId;
    if (nodeId?.startsWith('ending_')) {
      this.state.flags[nodeId] = true;
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
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
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

        this.notify();
        return true;
      }
    } catch(e) { console.error("Load failed", e); }
    return false;
  }
}

// Export a singleton instance for simplicity, though React Context can inject it too.
export const gameEngine = new EngineState();
