// Evaluates conditions and triggers story nodes

export class EventSystem {
  constructor(engine) {
    this.engine = engine; // Reference to GameState
    this.events = {}; // Map of all event configurations
  }

  // Load event dictionary into the generic pool
  loadEvents(newEvents) {
    this.events = { ...this.events, ...newEvents };
  }

  // Check if a node's condition passing
  checkCondition(conditionObj) {
    if (!conditionObj) return true; // No condition = always pass
    const state = this.engine.getState();

    // Check location
    if (conditionObj.location) {
      if (state.location !== conditionObj.location) return false;
    }

    // Check week/turn gates (e.g., { turn: { min: 25 } })
    if (conditionObj.turn) {
      const val = state.turn || 0;
      if (conditionObj.turn.min !== undefined && val < conditionObj.turn.min) return false;
      if (conditionObj.turn.max !== undefined && val > conditionObj.turn.max) return false;
    }

    // Check stats (e.g., { stats: { academics: { min: 20 } } })
    if (conditionObj.stats) {
      for (const [stat, req] of Object.entries(conditionObj.stats)) {
        const val = state.stats[stat] || 0;
        if (req.min !== undefined && val < req.min) return false;
        if (req.max !== undefined && val > req.max) return false;
      }
    }
    
    // Check flags
    if (conditionObj.flags) {
      for (const [flag, value] of Object.entries(conditionObj.flags)) {
        if (!!state.flags[flag] !== value) return false;
      }
    }
    
    // Check guanxi
    if (conditionObj.guanxi) {
      for (const [faction, req] of Object.entries(conditionObj.guanxi)) {
        const val = state.guanxi[faction] || 0;
        if (req.min !== undefined && val < req.min) return false;
        if (req.max !== undefined && val > req.max) return false;
      }
    }

    // Check relationships
    if (conditionObj.relationships) {
      for (const [character, states] of Object.entries(conditionObj.relationships)) {
        for (const [key, req] of Object.entries(states)) {
          const val = (state.relationships && state.relationships[character]) ? state.relationships[character][key] || 0 : 0;
          if (req.min !== undefined && val < req.min) return false;
          if (req.max !== undefined && val > req.max) return false;
        }
      }
    }

    return true;
  }

  // Get available choices for a given node
  getAvailableChoices(nodeId) {
    const node = this.events[nodeId];
    if (!node || !node.choices) return [];
    
    return node.choices.filter(choice => this.checkCondition(choice.condition));
  }

  // Execute a choice's consequences
  executeChoice(choice) {
    // 1. Apply stat changes
    if (choice.effects && choice.effects.stats) {
      this.engine.updateStats(choice.effects.stats);
    }
    
    // 2. Apply guanxi changes
    if (choice.effects && choice.effects.guanxi) {
      for (const [faction, amount] of Object.entries(choice.effects.guanxi)) {
         this.engine.updateGuanxi(faction, amount);
      }
    }
    
    // 3. Set flags
    if (choice.effects && choice.effects.flags) {
       for (const [flag, value] of Object.entries(choice.effects.flags)) {
         this.engine.setFlag(flag, value);
       }
    }
    
    // 4. Update relationships
    if (choice.effects && choice.effects.relationships) {
       for (const [character, changes] of Object.entries(choice.effects.relationships)) {
         this.engine.updateRelationship(character, changes);
       }
    }
    
    // 5. Apply location changes
    if (choice.effects && choice.effects.location) {
       this.engine.setLocation(choice.effects.location);
    }
    
    // 6. Obtain Magnets
    if (choice.effects && choice.effects.magnet) {
       this.engine.addMagnet(choice.effects.magnet);
    }

    // Intercept: If returning to hub, roll for random events
    let nextNode = choice.next;
    if (nextNode === "hub") {
      const roll = Math.random();
      if (roll < 0.05) {
         nextNode = "random_sick";
      } else if (roll < 0.1) {
         nextNode = "random_exam";
      } else if (roll < 0.15) {
         nextNode = "random_subway";
      } else if (roll < 0.2) {
         nextNode = "random_lecture";
      } else if (roll < 0.25) {
         nextNode = "random_club_fair";
      } else if (roll < 0.3) {
         nextNode = "random_vpn_down";
      } else if (roll < 0.35) {
         nextNode = "random_dorm_inspection";
      }
    }

    // Return the next Node ID
    return nextNode;
  }
}
