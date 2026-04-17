// Pure vanilla JS State Manager. No dependencies. Portable everywhere.

const INITIAL_STATS = {
  academics: 10,
  chinese: 10,
  wealth: 5000, // RMB
  sanity: 100, // Max 100
  digitalProficiency: 5,
  culture: 0, // Cultural Integration
};

const INITIAL_STATE = {
  currentNodeId: "start",
  turn: 1, // 1 turn = 1 week
  phase: "Application", // "Application", "Pre-Departure", "In-China"
  location: "Shanghai", // The city the player is currently in
  stats: { ...INITIAL_STATS },
  guanxi: {
    admin: 0,
    localStudents: 0,
    intlStudents: 0,
    professors: 0
  },
  inventory: [],
  flags: {}, // For story tracking, e.g. { "got_vpn": true }
  
  // New Engine Systems
  location: "Shanghai",
  relationships: {},

  // New Economy System
  jobs: {
    hasJob: false,
    jobId: null,
    weeklyIncome: 0,
    sanityCost: 0
  },
  transactions: [
    { week: 1, amount: 5000, desc: "Initial Funds", type: "income" }
  ],
  items: {
    ebike: false,
    headphones: false
  }
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

  setJob(jobId, income, sanityCost) {
    if (jobId === null) {
      this.state.jobs = { hasJob: false, jobId: null, weeklyIncome: 0, sanityCost: 0 };
    } else {
      this.state.jobs = { hasJob: true, jobId, weeklyIncome: income, sanityCost };
    }
    this.notify();
  }

  purchaseItem(itemId, cost) {
    if (this.state.stats.wealth >= cost && !this.state.items[itemId]) {
      this.addTransaction(-cost, `Purchased ${itemId}`);
      this.state.items[itemId] = true;
      this.notify();
      return true;
    }
    return false;
  }

  // Advance time by 1 week
  advanceTurn() {
    this.state.turn += 1;
    this.state.flags.has_worked_this_week = false;
    
    // Process weekly expenses
    this.addTransaction(-200, "Weekly Living Expenses");

    // Process job
    if (this.state.jobs.hasJob) {
      this.addTransaction(this.state.jobs.weeklyIncome, "Part-Time Job Income");
      this.state.stats.sanity -= this.state.jobs.sanityCost;
      if (!this.state.items.headphones) {
         // Slightly hurts academics to work without good studying equipment
         this.state.stats.academics = Math.max(0, this.state.stats.academics - 1);
      }
    }
    
    // Apply weekly decay
    let baseDrain = 2;
    if (this.state.items.ebike) baseDrain -= 1; // Ebike helps!
    this.state.stats.sanity -= baseDrain;
    
    if (this.state.stats.sanity < 0) this.state.stats.sanity = 0;
    
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
      if (this.state.stats[key] !== undefined) {
        if (key === 'wealth') {
            this.addTransaction(value, value > 0 ? "Misc Income" : "Misc Expense");
        } else {
            this.state.stats[key] += value;
        }
        // Hard bounds
        if (this.state.stats[key] < 0) this.state.stats[key] = 0;
        if (key === 'sanity' && this.state.stats[key] > 100) this.state.stats[key] = 100;
        if (key === 'academics' && this.state.stats[key] > 100) this.state.stats[key] = 100;
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
        
        // Handle migration for older saves without economy
        if (!this.state.location) this.state.location = "Shanghai";
        if (!this.state.jobs) this.state.jobs = { hasJob: false, jobId: null, weeklyIncome: 0, sanityCost: 0 };
        if (!this.state.transactions) this.state.transactions = [{ week: 1, amount: this.state.stats.wealth, desc: "Initial Funds", type: "income" }];
        if (!this.state.items) this.state.items = { ebike: false, headphones: false };
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
