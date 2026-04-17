// The Core Weekly Hub and Event Pool Data

export const gameNodes = {
  // --- THE HUB ---
  "hub": {
    speaker: "Weekly Planner",
    bgImage: '/images/simulator/hub_bg.png',
    text: "It is the start of a new week. How will you allocate your time and energy?",
    choices: [
      {
        text: "📚 Intensive Study (Academics +, Sanity -)",
        action: "advance_turn",
        next: "hub",
        effects: { stats: { academics: 5, sanity: -15 } }
      },
      {
         text: "🗣️ Language Partner (Chinese +, Wealth -)",
         action: "advance_turn",
         next: "hub",
         effects: { stats: { chinese: 5, sanity: 5, wealth: -50 }, guanxi: { localStudents: 2 } }
      },
      {
         text: "🏢 Bureaucratic Admin (Sanity -)",
         action: "advance_turn",
         next: "hub",
         effects: { stats: { sanity: -20, digitalProficiency: 2 } }
      },
      {
         text: "🎉 Entertainment & Culture (Sanity +, Culture +)",
         next: "submenu_entertainment"
      },
      {
         text: "🚄 Weekend Travel (Wealth ---, Culture ++)",
         next: "submenu_travel"
      }
    ]
  },

  // --- SUBMENUS ---
  "submenu_entertainment": {
    speaker: "Nightlife",
    text: "You have a free evening. What's the plan?",
    choices: [
      {
        text: "🎤 KTV Marathon (Requires 500 RMB)",
        condition: { stats: { wealth: { min: 500 } } },
        action: "advance_turn",
        next: "event_ktv",
        effects: { stats: { wealth: -500 } }
      },
      {
        text: "🔪 Jubensha / Script Murder Mystery",
        condition: { stats: { chinese: { min: 40 }, wealth: { min: 200 } } },
        action: "advance_turn",
        next: "event_jubensha",
        effects: { stats: { wealth: -200 } }
      },
      {
        text: "📱 Mindless Xiaohongshu Scrolling",
        action: "advance_turn",
        next: "hub",
        effects: { stats: { sanity: 15, culture: 2, digitalProficiency: 1 } }
      },
      {
        text: "Cancel (Go Back)",
        next: "hub"
      }
    ]
  },
  "submenu_travel": {
    speaker: "12306 Booking App",
    text: "Where to?",
    choices: [
      {
        text: "Tier 1: Shanghai (Wealth -2000, English job ops)",
        condition: { stats: { wealth: { min: 2000 } } },
        action: "advance_turn",
        next: "event_travel_tier1",
        effects: { stats: { wealth: -2000 } }
      },
      {
        text: "Tier 3: Dali, Yunnan (Wealth -800, Massive Sanity/Culture)",
        condition: { stats: { wealth: { min: 800 } } },
        action: "advance_turn",
        next: "event_travel_tier3",
        effects: { stats: { wealth: -800 } }
      },
      {
        text: "Cancel (Go Back)",
        next: "hub"
      }
    ]
  },

  // --- EVENTS ---
  "event_ktv": {
    speaker: "Local Friends",
    bgImage: '/images/simulator/ktv_bg.png',
    text: "You get dragged to a MASSIVE KTV room. 20 people you barely know. Someone shoves dice in your hand to play 'Chui Niu' (Liar's Dice).",
    choices: [
      {
        text: "Confidently play. (Culture check)",
        condition: { stats: { culture: { min: 10 } } },
        next: "hub",
        effects: { stats: { sanity: +30, culture: +5 }, guanxi: { localStudents: +10 } }
      },
      {
        text: "Hide in the corner and just eat the fruit platter.",
        next: "hub",
        effects: { stats: { sanity: +10, culture: +1 } }
      }
    ]
  },
  "event_jubensha": {
    speaker: "Game Master (DM)",
    text: "You're playing a 4-hour immersive murder mystery in full Qing Dynasty costumes. You are accused of poisoning the emperor.",
    choices: [
      {
        text: "Defend yourself eloquently in Chinese!",
        next: "hub",
        effects: { stats: { sanity: +20, chinese: +5, culture: +10 }, guanxi: { localStudents: +15 } }
      }
    ]
  },
  "event_travel_tier1": {
    speaker: "Shanghai",
    bgImage: '/images/simulator/shanghai_bg.png',
    text: "You arrive at Hongqiao Railway Station. It's massive, expensive, but full of opportunities.",
    choices: [
      {
        text: "Hustle for English Tutoring side gigs.",
        next: "hub",
        effects: { stats: { wealth: +1500, sanity: -10 } }
      },
      {
        text: "Enjoy the Bund and foreign imported foods.",
        next: "hub",
        effects: { stats: { sanity: +40, wealth: -500 } }
      }
    ]
  },
  "event_travel_tier3": {
    speaker: "Dali, Yunnan",
    bgImage: '/images/simulator/dali_bg.png',
    text: "The air is beautiful, the mountains are stunning. Nobody speaks English here.",
    choices: [
      {
        text: "Embrace the slow life and practice speaking with locals.",
        next: "hub",
        effects: { stats: { sanity: +50, culture: +20, chinese: +5 } }
      }
    ]
  },

  // --- RANDOM INTERRUPT EVENTS ---
  "random_subway": {
    speaker: "Beijing Subway",
    text: "You tried to transfer at Xizhimen station, locally known as the 'Xizhimen Maze'. You are completely lost and going in the wrong direction.",
    choices: [
      {
        text: "Try to ask a station guard for help in broken Chinese.",
        next: "hub",
        effects: { stats: { sanity: -10, chinese: 5, culture: 5 } }
      },
      {
        text: "Just get out, take a DiDi, and accept defeat.",
        next: "hub",
        effects: { stats: { wealth: -60, sanity: 5 } }
      }
    ]
  },
  "random_lecture": {
    speaker: "Lecture Hall",
    text: "You walk into your first major lecture. The professor speaks rapidly with a thick regional accent. The PowerPoint slides are entirely in Chinese characters.",
    choices: [
      {
        text: "Try to record the lecture to translate later.",
        next: "hub",
        effects: { stats: { digitalProficiency: 10, sanity: -5, academics: 5 } }
      },
      {
        text: "Smile, nod, and make friends with the local student next to you.",
        next: "hub",
        effects: { guanxi: { localStudents: 15 }, stats: { chinese: 5, academics: -5 } }
      }
    ]
  },
  "random_club_fair": {
    speaker: "Campus Square",
    text: "It is the 'Hundred Regiment Offensive' (百团大战) — the massive student club fair. Thousands of students are shouting and handing out flyers.",
    choices: [
      {
        text: "Join the Hanfu (Traditional Clothing) Society.",
        next: "hub",
        effects: { stats: { culture: 20, sanity: -5 }, guanxi: { localStudents: 10 } }
      },
      {
        text: "Join the International Student Union.",
        next: "hub",
        effects: { guanxi: { intlStudents: 20 }, stats: { sanity: 10, chinese: -5 } }
      }
    ]
  },
  "random_sick": {
    speaker: "Body",
    text: "You ate street BBQ that was a little *too* authentic. You are stuck in bed.",
    choices: [
      {
        text: "Lose a week recovering.",
        action: "advance_turn",
        next: "hub",
        effects: { stats: { sanity: -30, culture: +5 } }
      }
    ]
  },
  "random_exam": {
    speaker: "Professor",
    text: "Surprise midterm exam! Your Academic baseline will be tested.",
    choices: [
      {
        text: "Take the test.",
        next: "hub",
        effects: { stats: { sanity: -20, academics: -5 } }
      }
    ]
  },

  // --- ENDINGS / GAME OVERS ---
  "game_over_sanity": {
    speaker: "System",
    text: "ENDING: Burnout. You have completely burned out. The pressure was too much, and you've decided to abandon your plan to protect your mental health.",
    choices: [
      { text: "Restart Simulation", action: "reset_game", next: "start" }
    ]
  },
  "game_over_wealth": {
    speaker: "System",
    text: "ENDING: Broke. You have run out of money. You can no longer afford the application fees, visa costs, or flights. Your journey ends here.",
    choices: [
      { text: "Restart Simulation", action: "reset_game", next: "start" }
    ]
  }

};
