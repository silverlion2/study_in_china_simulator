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
  stats: { ...INITIAL_STATS },
  guanxi: {
    admin: 0,
    localStudents: 0,
    intlStudents: 0,
    professors: 0
  },
  inventory: [],
  flags: {}, // For story tracking, e.g. { "got_vpn": true }
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

  // Advance time by 1 week
  advanceTurn() {
    this.state.turn += 1;
    
    // Apply weekly decay
    this.state.stats.sanity -= 2;
    this.state.stats.wealth -= 200; // Weekly cost of living
    
    if (this.state.stats.sanity < 0) this.state.stats.sanity = 0;
    if (this.state.stats.wealth < 0) this.state.stats.wealth = 0;
    
    // Auto-advance phase
    if (this.state.turn >= 8 && this.state.phase === "Application") {
      this.state.phase = "Pre-Departure";
    } else if (this.state.turn >= 16 && this.state.phase === "Pre-Departure") {
      this.state.phase = "In-China";
    }
    
    this.notify();
  }

  // Update multiple stats
  updateStats(statChanges) {
    for (const [key, value] of Object.entries(statChanges)) {
      if (this.state.stats[key] !== undefined) {
        this.state.stats[key] += value;
        // Hard bounds
        if (this.state.stats[key] < 0) this.state.stats[key] = 0;
        if (key === 'sanity' && this.state.stats[key] > 100) this.state.stats[key] = 100;
        if (key === 'digitalProficiency' && this.state.stats[key] > 100) this.state.stats[key] = 100;
      }
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
        this.notify();
        return true;
      }
    } catch(e) { console.error("Load failed", e); }
    return false;
  }
}

// Export a singleton instance for simplicity, though React Context can inject it too.
export const gameEngine = new EngineState();
