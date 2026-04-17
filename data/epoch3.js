export const epoch3Events = {
  "in_china_start": {
    speaker: "System",
    location: "Beijing Capital Intl Airport",
    text: "Epoch 3: In-China! You step off the plane in Beijing. The air is slightly hazy but buzzing with energy. Everything is in Chinese, and you need to get to campus.",
    choices: [
      {
        text: "Try to negotiate with a black taxi driver.",
        next: "taxi_negotiation",
        effects: {
          stats: { sanity: -10 },
          flags: { "decision_e3_transport": "Haggle King" }
        }
      },
      {
        text: "Use the DiDi app you set up earlier.",
        condition: { flags: { "has_wechat": true } },
        next: "didi_success",
        effects: {
          stats: { wealth: -150, sanity: 10 },
          flags: { "decision_e3_transport": "App Reliance (DiDi)" }
        }
      }
    ]
  },
  "taxi_negotiation": {
    speaker: "Taxi Driver",
    location: "Airport Taxi Stand",
    text: "Nihao! University? 500 RMB. No meter. Traffic is very bad.",
    minigame: "bargain",
    onWin: "campus_arrival",
    onLose: "campus_arrival"
  },
  "didi_success": {
    speaker: "System",
    location: "Highway to Campus",
    text: "The DiDi arrives exactly at the pickup zone. You scan the license plate, get in, and the route is fully tracked in English. The ride costs 150 RMB automatically deducted from Alipay.",
    choices: [
      {
        text: "Enjoy the ride to campus.",
        next: "campus_arrival",
        effects: {}
      }
    ]
  },
  "campus_arrival": {
    speaker: "University Gate",
    location: "Campus Main Entrance",
    text: "You've finally dropped your luggage off at the International Student Dormitory. You are exhausted, jetlagged, and starving. The campus is massive.",
    choices: [
      {
        text: "Head immediately to the campus canteen to find food.",
        next: "canteen_adventure"
      }
    ]
  },
  "canteen_adventure": {
    speaker: "Campus Canteen",
    location: "Student Canteen 1",
    text: "You walk into a 4-story canteen. The noise is deafening, and there are roughly 50 different windows serving everything from hand-pulled noodles to spicy crayfish. Everyone is paying by scanning QR codes with their phones.",
    choices: [
      {
        text: "Point at something safe-looking (rice, eggs, and tomatoes) and scan your Alipay.",
        next: "canteen_safe",
        effects: {
          stats: { sanity: 15, culture: 5 },
          flags: { "decision_e3_food": "Safe Eater (Tomato Egg)" }
        }
      },
      {
        text: "Be brave! Get in the longest line and point at the spicy red Sichuan Mapo Tofu.",
        next: "canteen_spicy",
        effects: {
          stats: { culture: 15, sanity: -5 },
          flags: { "decision_e3_food": "Spice Challenger" }
        }
      }
    ]
  },
  "canteen_safe": {
    speaker: "Inner Voice",
    location: "Canteen Dinner Table",
    text: "It's exactly as you hoped. Comforting, cheap (only 12 RMB!), and fills you up. You feel ready to tackle the rest of the day.",
    choices: [
      {
        text: "Go back to the dorm to set up.",
        next: "taobao_setup"
      }
    ]
  },
  "canteen_spicy": {
    speaker: "Inner Voice",
    location: "Canteen Dinner Table",
    text: "You take one bite and immediately start sweating. It is deliciously spicy, but your stomach is definitely not used to this yet. You chug a bottle of Vitasoy milk.",
    choices: [
      {
        text: "Go back to the dorm entirely red in the face.",
        next: "taobao_setup"
      }
    ]
  },
  "taobao_setup": {
    speaker: "Dorm Room",
    location: "Intl Student Dorms",
    text: "Your dorm room is empty except for a bed frame, a desk, and a chair. You need bedding, a desk lamp, and a power strip. It is time to brave Taobao.",
    choices: [
      {
        text: "Rely on screenshot-translators to navigate the entirely Chinese app.",
        next: "taobao_solo",
        effects: {
          stats: { digitalProficiency: 15, sanity: -15, chinese: 5 },
          flags: { "decision_e3_taobao": "Independent Translating" }
        }
      },
      {
        text: "Knock on your neighbor's door (a local student) and ask for help.",
        next: "taobao_help",
        effects: {
          guanxi: { localStudents: 15 },
          stats: { sanity: 5 },
          flags: { "decision_e3_taobao": "Guanxi Building" }
        }
      }
    ]
  },
  "taobao_solo": {
    speaker: "System",
    location: "Intl Student Dorms",
    text: "You spent 3 hours translating product descriptions and accidentally ordered a miniature desk lamp for a dollhouse. But hey, you figured out the interface!",
    choices: [
      {
        text: "Prepare for your first night's sleep.",
        next: "first_night"
      }
    ]
  },
  "taobao_help": {
    speaker: "Neighbor Li",
    location: "Dorm Hallway",
    text: "'Oh, you are new? No problem, I have a VIP account, I can get you next-day delivery on all this.' You make a friend and get everything sorted in 10 minutes.",
    choices: [
      {
        text: "Prepare for your first night's sleep.",
        next: "first_night"
      }
    ]
  },
  "first_night": {
    speaker: "Bed",
    location: "Intl Student Dorms",
    text: "You lie down on the university-provided mattress. It is as hard as a wooden board—a very traditional style of Chinese bedding.",
    choices: [
      {
        text: "Tough it out. It's supposed to be good for your back.",
        next: "hub",
        action: "advance_turn",
        effects: {
          stats: { sanity: -10, culture: 10 }
        }
      },
      {
        text: "Order a massive memory foam mattress topper immediately.",
        next: "hub",
        action: "advance_turn",
        effects: {
          stats: { wealth: -200, sanity: 20 }
        }
      }
    ]
  },
  "epoch3_midterm": {
    speaker: "System",
    location: "Campus Main Square",
    text: "Week 24: Midterm Exams. The library is completely packed by 7:00 AM. In the meantime, the International Student Union is hosting a massive KTV night to network.",
    choices: [
      {
        text: "Join the KTV night. Networking is more important than studying.",
        next: "ktv_night",
        effects: {
          stats: { academics: -15, culture: +15, sanity: +20, wealth: -150 },
          flags: { "decision_e3_midterm": "Social Netweaver (KTV)" }
        }
      },
      {
        text: "Camp out in the library and 'Juan' (卷 - grind) for midterms.",
        next: "library_grind",
        effects: {
          stats: { academics: +20, sanity: -20 },
          flags: { "decision_e3_midterm": "Straight-A Grinder" }
        }
      }
    ]
  },
  "ktv_night": {
    speaker: "KTV Lounge",
    location: "Wudaokou KTV",
    text: "You spent 5 hours singing Jay Chou songs terribly and drinking lukewarm beer. But you made some amazing contacts, including a connection at ByteDance.",
    choices: [
      {
        text: "Back to the grind.",
        next: "hub",
        action: "advance_turn",
        effects: { guanxi: { intlStudents: +10, localStudents: +10 } }
      }
    ]
  },
  "library_grind": {
    speaker: "Inner Voice",
    location: "Library 4th Floor",
    text: "You memorized 400 pages of Chinese Politics and successfully passed the midterm array. You feel like a scholar, but you are socially dead.",
    choices: [
      {
        text: "Sleep.",
        next: "hub",
        action: "advance_turn",
        effects: { guanxi: { professors: +15 } }
      }
    ]
  },
  "epoch3_internship": {
    speaker: "System",
    text: "Week 28: Career Choices. An agency offers you a lucrative part-time modeling/teaching job. It pays well in cash, but working on a student visa is technically illegal without university approval.",
    choices: [
      {
        text: "Take the 'black' job for the cash. They rarely check.",
        next: "internship_illegal",
        effects: {
          stats: { wealth: +1500, sanity: -10 },
          flags: { "decision_e3_internship": "Risk Taker (Illegal Job)", "illegal_job": true }
        }
      },
      {
        text: "Decline and formally apply for an unpaid university assistantship.",
        next: "internship_legal",
        effects: {
          stats: { academics: +10, wealth: -100 },
          guanxi: { professors: +10 },
          flags: { "decision_e3_internship": "Rule Follower (Legal)" }
        }
      }
    ]
  },
  "internship_illegal": {
    speaker: "Inner Voice",
    text: "You made quick cash, but you are constantly looking over your shoulder. You hope the visa office doesn't find out.",
    choices: [
      { text: "Keep a low profile.", next: "hub", action: "advance_turn" }
    ]
  },
  "internship_legal": {
    speaker: "Professor Lin",
    text: "I appreciate your hard work in my lab. By following the proper channels, I can write you a strong recommendation letter for future legal work.",
    choices: [
      { text: "Thank the professor.", next: "hub", action: "advance_turn" }
    ]
  },
  "epoch3_final": {
    speaker: "System",
    location: "Admin Building",
    text: "Week 32: The End of the Year. The seasons have changed, and it's time to evaluate everything you've achieved during your time studying in China.",
    choices: [
      {
        text: "Submit final portfolio and wait for evaluation...",
        next: "ending_evaluation"
      }
    ]
  },
  "ending_evaluation": {
    speaker: "System",
    text: "The sorting system evaluates your ultimate legacy in China based on your choices and final stats...",
    choices: [
      {
        text: "Check Results",
        next: "ending_scholar",
        condition: { stats: { academics: { min: 80 } }, guanxi: { professors: { min: 30 } } }
      },
      {
        text: "Check Results",
        next: "ending_entrepreneur",
        condition: { stats: { wealth: { min: 4000 }, digitalProficiency: { min: 50 }, academics: { max: 79 } } }
      },
      {
        text: "Check Results",
        next: "ending_diplomat",
        condition: { stats: { culture: { min: 60 }, chinese: { min: 60 }, academics: { max: 79 }, digitalProficiency: { max: 49 } } }
      },
      {
        text: "Check Results",
        next: "ending_influencer",
        condition: { stats: { digitalProficiency: { min: 30 } }, guanxi: { intlStudents: { min: 20 }, localStudents: { min: 20 } }, academics: { max: 79 } }
      },
      {
        text: "Check Results",
        next: "ending_deportee",
        condition: { flags: { "illegal_job": true }, stats: { guanxi: { professors: { max: 10 } } } }
      },
      {
        text: "Check Results",
        next: "ending_hsk_master",
        condition: { stats: { chinese: { min: 80 } } }
      },
      {
        text: "Check Results",
        next: "ending_local_insider",
        condition: { stats: { culture: { min: 80 }, chinese: { min: 40 } }, guanxi: { localStudents: { min: 30 } } }
      },
      {
        text: "Check Results",
        next: "ending_researcher",
        condition: { stats: { academics: { min: 60 } }, guanxi: { professors: { min: 50 } } }
      },
      {
        text: "Check Results",
        next: "ending_survivor"
      }
    ]
  },
  "ending_scholar": {
    speaker: "System",
    text: "ENDING 2/10: The Scholar. You aced all your exams. Professor Lin personally advocated for you to receive a fully-funded PhD scholarship at Tsinghua University. Your academic journey in China has only just begun.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_entrepreneur": {
    speaker: "System",
    text: "ENDING 3/10: The Tech Entrepreneur. Your academics were mediocre, but you mastered the digital ecosystem. You launched an e-commerce brand bridging local supply chains with Western markets and achieved ¥1M ARR.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_diplomat": {
    speaker: "System",
    text: "ENDING 4/10: The Cultural Ambassador. You fluently navigate both the language and the cultural nuances. A top-tier multinational corporation hired you to manage their government relations in Beijing.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_influencer": {
    speaker: "System",
    text: "ENDING 5/10: The Influencer. You spent more time vlogging on Xiaohongshu than studying. However, you went viral as the 'Foreigner who loves Malatang' and now have 500k followers.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_survivor": {
    speaker: "System",
    text: "ENDING 6/10: The Survivor. You didn't excel in any particular area, but you survived the culture shock, the exams, and the language barrier. You return home with incredible stories and a wider perspective.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_researcher": {
    speaker: "System",
    text: "ENDING 7/10: The Lab Rat. You basically lived in the research lab. Your professor depends on you to translate papers into English for international journals. You didn't see much of China outside the lab, but you have 3 published papers.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_local_insider": {
    speaker: "System",
    text: "ENDING 8/10: The Local Insider. You integrated so deeply into Chinese society that your foreign friends joke you're basically a native. You play Mahjong, dominate KTV, and eat incredibly spicy food without breaking a sweat.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_hsk_master": {
    speaker: "System",
    text: "ENDING 9/10: The HSK6 Master. Your obsession with flashcards paid off. You scored perfectly on the HSK6 exam and were invited to participate in the 'Chinese Bridge' television competition.",
    choices: [{ text: "Play Again", action: "reset_game", next: "start" }]
  },
  "ending_deportee": {
    speaker: "System",
    text: "ENDING 10/10: The Deportee. You took a lucrative but illegal part-time job, and the Entry-Exit Bureau found out. Since you didn't have strong faculty support to advocate for you, your visa was cancelled and you were sent home in disgrace.",
    choices: [{ text: "Try Again", action: "reset_game", next: "start" }]
  },
  "game_over_sanity": {
    speaker: "System",
    text: "FAILURE ENDING: The Burnout. Your sanity hit 0. You experienced a severe panic attack, packed your bags in the middle of the night, and booked the next flight home. It was too much to handle.",
    choices: [{ text: "Try Again", action: "reset_game", next: "start" }]
  },
  "game_over_wealth": {
    speaker: "System",
    text: "FAILURE ENDING: The Broke Student. Your wealth hit ¥0. You maxed out your credit cards and couldn't pay your rent. The university eventually revoked your visa. You had to go home.",
    choices: [{ text: "Try Again", action: "reset_game", next: "start" }]
  }
};
