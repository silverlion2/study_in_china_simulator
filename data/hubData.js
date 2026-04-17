// The Core Weekly Hub and Event Pool Data

export const gameNodes = {
  // --- THE HUB ---
  "hub": {
    speaker: "Weekly Planner",
    bgImage: '/images/simulator/hub_bg.png',
    text: "It is the start of a new week. How will you allocate your time and energy?",
    choices: [
      {
        text: "📚 Intensive Study in Shanghai (Academics +, Sanity -)",
        condition: { location: "Shanghai" },
        action: "advance_turn",
        next: "hub",
        effects: { stats: { academics: 5, sanity: -15 } }
      },
      {
         text: "🗣️ Language Partner (Tonal Rhythm Game)",
         action: "advance_turn",
         next: "minigame_tones",
         effects: { stats: { sanity: 5, wealth: -20 }, guanxi: { localStudents: 2 } }
      },
      {
         text: "🥡 Order Waimai (Delivery Typer Game)",
         next: "minigame_delivery"
      },
      {
         text: "🏢 Bureaucratic Admin (Bike Scramble Game)",
         action: "advance_turn",
         next: "minigame_bike"
      },
      {
         text: "🎉 Entertainment & Culture (Sanity +, Culture +)",
         next: "submenu_entertainment"
      },
      {
         text: "🚄 Weekend Travel (Wealth ---, Culture ++)",
         next: "submenu_travel"
      },
      {
         text: "💼 Hustle & Side Gigs (Wealth ++, Sanity -, Risks)",
         next: "submenu_hustle"
      },
      {
         text: "🤝 Socialize & Network (Guanxi +, Specific Contacts)",
         next: "submenu_social"
      },
      {
         text: "📍 Explore Local Districts (City Specific)",
         next: "submenu_districts"
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
        text: "🍻 Department Banquet (Banquet Balance Game)",
        action: "advance_turn",
        next: "minigame_banquet"
      },
      {
        text: "🧧 Check WeChat Group (Hongbao Snatch Game)",
        action: "advance_turn",
        next: "minigame_hongbao"
      },
      {
        text: "💖 Swipe on Tantan (Chinese Tinder)",
        action: "advance_turn",
        next: "event_tantan_date",
        effects: { stats: { wealth: -150 } }
      },
      {
        text: "🗣️ Language Exchange Mixer (Culture ++)",
        action: "advance_turn",
        next: "event_language_exchange",
        effects: { stats: { sanity: -10 } }
      },
      {
        text: "Cancel (Go Back)",
        next: "hub"
      }
    ]
  },
  "submenu_social": {
    speaker: "Contacts App",
    text: "Who do you want to hit up this week?",
    choices: [
      {
        text: "Coffee with Tech Founder Xiao Chen (Shanghai, Wealth -50)",
        condition: { location: "Shanghai", stats: { wealth: { min: 50 }, chinese: { min: 20 } } },
        action: "advance_turn",
        next: "event_xiao_chen",
        effects: { stats: { wealth: -50 } }
      },
      {
         text: "🚀 Brainstorm Startup with Xiao Chen (Shanghai, Requires Friendship >= 20)",
         condition: { location: "Shanghai", relationships: { "Xiao Chen": { friendship: { min: 20 } } } },
         action: "advance_turn",
         next: "event_xiao_chen_business",
         effects: { stats: { sanity: -10 } }
      },
      {
        text: "Language Exchange with Sophie (Shanghai)",
        condition: { location: "Shanghai" },
        action: "advance_turn",
        next: "event_sophie"
      },
      {
         text: "💖 Go on a bar-hopping date with Sophie (Shanghai, Requires Romance >= 20, Wealth -200)",
         condition: { location: "Shanghai", stats: { wealth: { min: 200 } }, relationships: { "Sophie": { romance: { min: 20 } } } },
         action: "advance_turn",
         next: "event_sophie_date",
         effects: { stats: { wealth: -200 } }
      },
      {
        text: "Late night BBQ with Uncle Wang (Shanghai, Wealth -50)",
        condition: { location: "Shanghai", stats: { wealth: { min: 50 } } },
        action: "advance_turn",
        next: "event_uncle_wang",
        effects: { stats: { wealth: -50 } }
      },
      {
         text: "🍺 Drink Baijiu with Uncle Wang (Shanghai, Requires Friendship >= 30, Wealth -20)",
         condition: { location: "Shanghai", stats: { wealth: { min: 20 } }, relationships: { "Uncle Wang": { friendship: { min: 30 } } } },
         action: "advance_turn",
         next: "event_uncle_wang_baijiu",
         effects: { stats: { wealth: -20 } }
      },
      {
        text: "Attend Dr. Mei's Lecture (Shanghai)",
        condition: { location: "Shanghai" },
        action: "advance_turn",
        next: "event_dr_mei"
      },
      {
        text: "🔬 Co-author Paper with Dr. Mei (Shanghai, Requires Friendship >= 20)",
        condition: { location: "Shanghai", relationships: { "Dr. Mei": { friendship: { min: 20 } } } },
        action: "advance_turn",
        next: "event_dr_mei_lab"
      },
      {
        text: "Attend Manager Zhang's Recruiting Panel (Shanghai, Wealth -50)",
        condition: { location: "Shanghai", stats: { wealth: { min: 50 } } },
        action: "advance_turn",
        next: "event_manager_zhang",
        effects: { stats: { wealth: -50 } }
      },
      {
        text: "💼 Private Dinner with Manager Zhang (Shanghai, Requires Friendship >= 20, Wealth -300)",
        condition: { location: "Shanghai", stats: { wealth: { min: 300 } }, relationships: { "Manager Zhang": { friendship: { min: 20 } } } },
        action: "advance_turn",
        next: "event_manager_zhang_dinner",
        effects: { stats: { wealth: -300 } }
      },
      {
        text: "Cancel (Go Back)",
        next: "hub"
      }
    ]
  },
  "submenu_travel": {
    speaker: "12306 Booking App",
    text: "Where to? Booking a high-speed rail ticket will consume the weekend and 500 RMB.",
    choices: [
      {
        text: "Return to Base: Shanghai",
        action: "advance_turn",
        next: "event_travel_shanghai",
        effects: { location: "Shanghai", stats: { wealth: -500 } }
      },
      {
        text: "Travel to Beijing",
        action: "advance_turn",
        next: "event_travel_beijing",
        effects: { location: "Beijing", stats: { wealth: -500 } }
      },
      {
        text: "Travel to Guangzhou",
        action: "advance_turn",
        next: "event_travel_guangzhou",
        effects: { location: "Guangzhou", stats: { wealth: -500 } }
      },
      {
        text: "Travel to Chengdu",
        action: "advance_turn",
        next: "event_travel_chengdu",
        effects: { location: "Chengdu", stats: { wealth: -500 } }
      },
      {
        text: "Travel to Xi'an",
        action: "advance_turn",
        next: "event_travel_xian",
        effects: { location: "Xi'an", stats: { wealth: -500 } }
      },
      {
        text: "Travel to Hangzhou",
        action: "advance_turn",
        next: "event_travel_hangzhou",
        effects: { location: "Hangzhou", stats: { wealth: -500 } }
      },
      {
        text: "Travel to Sanya",
        action: "advance_turn",
        next: "event_travel_sanya",
        effects: { location: "Sanya", stats: { wealth: -500 } }
      },
      {
        text: "Cancel (Go Back)",
        next: "hub"
      }
    ]
  },
  
  "submenu_districts": {
    speaker: "Map",
    text: "You open your phone's map app. Which district do you want to explore?",
    choices: [
      { text: "Fuxing Park & INS (Shanghai)", condition: { location: "Shanghai" }, next: "district_shanghai_fuxing" },
      { text: "The Bund (Shanghai)", condition: { location: "Shanghai" }, next: "district_shanghai_bund" },
      { text: "Lujiazui Finance District (Shanghai)", condition: { location: "Shanghai" }, next: "district_shanghai_lujiazui" },
      { text: "Forbidden City (Beijing)", condition: { location: "Beijing" }, next: "district_beijing_forbidden" },
      { text: "Qianmen Street (Beijing)", condition: { location: "Beijing" }, next: "district_beijing_qianmen" },
      { text: "Old Hutongs (Beijing)", condition: { location: "Beijing" }, next: "district_beijing_hutong" },
      { text: "Canton Fair Complex (Guangzhou)", condition: { location: "Guangzhou" }, next: "district_gz_fair" },
      { text: "Baima Wholesale Market (Guangzhou)", condition: { location: "Guangzhou" }, next: "district_gz_market" },
      { text: "Panda Breeding Base (Chengdu)", condition: { location: "Chengdu" }, next: "district_chengdu_panda" },
      { text: "Kuanzhai Alley (Chengdu)", condition: { location: "Chengdu" }, next: "district_chengdu_kuanzhai" },
      { text: "People's Park (Chengdu)", condition: { location: "Chengdu" }, next: "district_chengdu_park" },
      { text: "Terracotta Museum (Xi'an)", condition: { location: "Xi'an" }, next: "district_xian_terra" },
      { text: "Muslim Quarter (Xi'an)", condition: { location: "Xi'an" }, next: "district_xian_muslim" },
      { text: "Ancient City Wall (Xi'an)", condition: { location: "Xi'an" }, next: "district_xian_wall" },
      { text: "Binjiang Tech District (Hangzhou)", condition: { location: "Hangzhou" }, next: "district_hz_tech" },
      { text: "West Lake (Hangzhou)", condition: { location: "Hangzhou" }, next: "district_hz_lake" },
      { text: "Houhai Surfer Bay (Sanya)", condition: { location: "Sanya" }, next: "district_sanya_houhai" },
      { text: "Yalong Bay Beach Club (Sanya)", condition: { location: "Sanya" }, next: "district_sanya_yalong" },
      { text: "Cancel (Go Back)", next: "hub" }
    ]
  },

  "district_shanghai_fuxing": { speaker: "Fuxing Park", text: "By day, elders practice Tai Chi. At night, the massive INS complex becomes the epicenter of Gen Z nightlife.", choices: [ { text: "Entertainment: Go clubbing at INS with friends (-300 RMB) [Requires Friendship >= 20 with any main cast]", condition: { stats: { wealth: { min: 300 } } }, next: "event_sh_ins_clubbing", action: "advance_turn", effects: { stats: { wealth: -300 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_shanghai_bund": { speaker: "The Bund", text: "The iconic waterfront promenade features historic colonial buildings facing the futuristic skyline.", choices: [ { text: "Social: Evening stroll", next: "event_sh_bund_walk", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_shanghai_lujiazui": { speaker: "Lujiazui", text: "The towering skyscrapers of China's financial capital pierce the clouds.", choices: [ { text: "Hustle: Attend Fintech Networking Mixer (-100 RMB)", condition: { stats: { wealth: { min: 100 } } }, next: "event_sh_lujiazui_mixer", action: "advance_turn", effects: { stats: { wealth: -100 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  
  "district_beijing_forbidden": { speaker: "Forbidden City", text: "The massive imperial palace complex is flooded with tourists.", choices: [ { text: "Hustle: Tour Guide (+300 RMB)", condition: { stats: { chinese: { min: 20 } } }, next: "event_beijing_tourguide", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_beijing_qianmen": { speaker: "Qianmen Street", text: "Historic commerce street just south of Tiananmen.", choices: [ { text: "Entertainment: Watch Peking Opera (-100 RMB)", condition: { stats: { wealth: { min: 100 } } }, next: "event_beijing_opera", action: "advance_turn", effects: { stats: { wealth: -100 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_beijing_hutong": { speaker: "Old Hutongs", text: "The maze of narrow alleyways holds the true heart of Beijing.", choices: [ { text: "Social: Chat with Taxi Driver Lao Li", next: "event_beijing_taxi", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },

  "district_gz_fair": { speaker: "Canton Fair Complex", text: "The largest trade fair in China is overwhelming.", choices: [ { text: "Hustle: Translate for buyers (+500 RMB)", condition: { stats: { chinese: { min: 30 } } }, next: "event_guangzhou_cantonfair", action: "advance_turn" }, { text: "Social: Dim Sum with Boss Wu (-150 RMB)", condition: { stats: { wealth: { min: 150 } } }, next: "event_guangzhou_boss", action: "advance_turn", effects: { stats: { wealth: -150 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_gz_market": { speaker: "Baima Market", text: "Stories upon stories of wholesale goods.", choices: [ { text: "Entertainment: Market Spree (-300 RMB)", condition: { stats: { wealth: { min: 300 } } }, next: "event_guangzhou_market", action: "advance_turn", effects: { stats: { wealth: -300 } } }, { text: "Go Back", next: "submenu_districts" } ] },

  "district_chengdu_panda": { speaker: "Panda Base", text: "Lush bamboo forests where giant pandas roam safely.", choices: [ { text: "Hustle: Volunteer (-50 RMB)", condition: { stats: { wealth: { min: 50 } } }, next: "event_chengdu_volunteer", action: "advance_turn", effects: { stats: { wealth: -50 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_chengdu_kuanzhai": { speaker: "Kuanzhai Alley", text: "Preserved historic alleys full of spicy street food aromas.", choices: [ { text: "Entertainment: Hotpot Challenge (-50 RMB)", condition: { stats: { wealth: { min: 50 } } }, next: "event_chengdu_hotpot", action: "advance_turn", effects: { stats: { wealth: -50 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_chengdu_park": { speaker: "People's Park", text: "Locals are playing mahjong and getting their ears cleaned.", choices: [ { text: "Social: Teahouse Auntie", next: "event_chengdu_tea", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },

  "district_xian_terra": { speaker: "Terracotta Museum", text: "Thousands of stone warriors stand guard in the massive pits.", choices: [ { text: "Social: Tour with Guide Jin (-100 RMB)", condition: { stats: { wealth: { min: 100 } } }, next: "event_xian_tour", action: "advance_turn", effects: { stats: { wealth: -100 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_xian_muslim": { speaker: "Muslim Quarter", text: "Bustling street with the smell of cumin lamb skewers.", choices: [ { text: "Hustle: Sell Souvenirs (+200 RMB)", next: "event_xian_souvenirs", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_xian_wall": { speaker: "Ancient City Wall", text: "One of the oldest and best preserved Chinese city walls.", choices: [ { text: "Entertainment: Cycle the wall (-40 RMB)", condition: { stats: { wealth: { min: 40 } } }, next: "event_xian_cycling", action: "advance_turn", effects: { stats: { wealth: -40 } } }, { text: "Go Back", next: "submenu_districts" } ] },

  "district_hz_tech": { speaker: "Binjiang District", text: "Glass office buildings housing massive tech conglomerates.", choices: [ { text: "Hustle: Alibaba Tech Interview", condition: { stats: { academics: { min: 30 } } }, next: "event_hangzhou_alibaba", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_hz_lake": { speaker: "West Lake", text: "A UNESCO heritage site famous for poetry and tea.", choices: [ { text: "Entertainment: Rent a Boat (-100 RMB)", condition: { stats: { wealth: { min: 100 } } }, next: "event_hangzhou_boat", action: "advance_turn", effects: { stats: { wealth: -100 } } }, { text: "Social: Zen Master Tea Ceremony", next: "event_hangzhou_tea", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },

  "district_sanya_houhai": { speaker: "Houhai Surfer Bay", text: "A laid-back fishing village turned surfer paradise.", choices: [ { text: "Social: Surf Lessons with Hao (-200 RMB)", condition: { stats: { wealth: { min: 200 } } }, next: "event_sanya_surf", action: "advance_turn", effects: { stats: { wealth: -200 } } }, { text: "Go Back", next: "submenu_districts" } ] },
  "district_sanya_yalong": { speaker: "Yalong Bay", text: "Luxury resorts and exclusive pristine beaches.", choices: [ { text: "Entertainment: Luxury Yacht Party (-500 RMB)", condition: { stats: { wealth: { min: 500 } } }, next: "event_sanya_yacht", action: "advance_turn", effects: { stats: { wealth: -500 } } }, { text: "Hustle: Beach Club Bartender (+300 RMB)", next: "event_sanya_bartender", action: "advance_turn" }, { text: "Go Back", next: "submenu_districts" } ] },



  // --- HUSTLE & SIDE GIGS ---
  "submenu_hustle": {
    speaker: "Opportunities Board",
    text: "The student WeChat groups are full of opportunities to make extra cash. What's your hustle?",
    choices: [
      {
        text: "Teach English off-campus (Wealth +800, Illegal Job Flag!)",
        action: "advance_turn",
        next: "event_tutor_gig"
      },
      {
        text: "Help Professor with Research (Wealth +100, Academics +, Guanxi +)",
        action: "advance_turn",
        next: "event_research_assistant"
      },
      {
        text: "Start a Daigou (Personal Shopper) Business (Shanghai, Wealth +500)",
        condition: { location: "Shanghai" },
        action: "advance_turn",
        next: "event_daigou"
      },
      {
        text: "Cancel (Go Back)",
        next: "hub"
      }
    ]
  },
  "event_tutor_gig": {
    speaker: "Tiger Mom",
    text: "'You just need to speak English with my son for 3 hours every Saturday.' It pays incredibly well, but working on a student visa is strictly forbidden.",
    choices: [
      {
        text: "Take the money and assume the risk.",
        next: "hub",
        effects: { stats: { wealth: 800, sanity: -15 }, flags: { "illegal_job": true } }
      }
    ]
  },
  "event_research_assistant": {
    speaker: "Professor Lin",
    text: "'Ah, thank you for helping me translate this paper into English. It will be published next month.'",
    choices: [
      {
        text: "You didn't get paid much, but the networking is invaluable.",
        next: "hub",
        effects: { stats: { wealth: 100, academics: 10 }, guanxi: { professors: 15 } }
      }
    ]
  },
  "event_daigou": {
    speaker: "WeChat Contacts",
    text: "Your friends back home want you to buy cheap Chinese electronics on Taobao and ship them over. You make a decent profit margin.",
    choices: [
      {
        text: "Box it all up and head to China Post.",
        next: "hub",
        effects: { stats: { wealth: 500, culture: 5, sanity: -10 } }
      }
    ]
  },

  // --- MINIGAME NODES ---
  "minigame_tones": {
    speaker: "Language Partner",
    text: "Let's practice the four tones! Hit the right tone when the marker hits the line.",
    minigame: "tones",
    onWin: "hub",
    onLose: "hub"
  },
  "minigame_delivery": {
    speaker: "Meituan Delivery",
    text: "Your food is arriving. The delivery driver is calling, select the right translation quickly!",
    minigame: "delivery",
    onWin: "hub",
    onLose: "hub"
  },
  "minigame_bike": {
    speaker: "Campus Street",
    text: "You are late for the admin office! Find the working shared bike fast!",
    minigame: "bike",
    onWin: "hub",
    onLose: "hub"
  },
  "minigame_banquet": {
    speaker: "Professor's Table",
    text: "The department head is proposing a toast. Try to survive the banquet by balancing Guanxi and Intoxication.",
    minigame: "banquet",
    onWin: "hub",
    onLose: "hub"
  },
  "minigame_hongbao": {
    speaker: "WeChat Group",
    text: "Someone just posted a red envelope in the class group! Grab it fast!",
    minigame: "hongbao",
    onWin: "hub",
    onLose: "hub"
  },
  "minigame_subway": {
    speaker: "Beijing Subway",
    text: "It's rush hour and you're carrying a suitcase. Squeeze into the car!",
    minigame: "subway",
    onWin: "event_travel_tier1",
    onLose: "hub"
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

  "event_tantan_date": {
    speaker: "Tantan Match",
    text: "You matched with someone and agreed to meet at a hip coffee shop. They instantly switch to practicing their English with you.",
    choices: [
      {
        text: "Insist on speaking Chinese. (Chinese +, Sanity -)",
        next: "hub",
        effects: { stats: { chinese: 10, sanity: -5 }, guanxi: { localStudents: 5 } }
      },
      {
        text: "Just let them practice English. (Sanity +, Guanxi +)",
        next: "hub",
        effects: { stats: { sanity: 10 }, guanxi: { localStudents: 15 } }
      }
    ]
  },
  "event_language_exchange": {
    speaker: "Mixer Organizer",
    text: "You're at a loud bar filled with hopeful language learners. You pair up with a local student who helps you navigate local slangs.",
    choices: [
      {
        text: "Swap WeChats and become study buddies.",
        next: "hub",
        effects: { stats: { chinese: 5, culture: 10 }, guanxi: { localStudents: 10 } }
      }
    ]
  },
  "event_xiao_chen": {
    speaker: "Xiao Chen",
    text: "You meet Xiao Chen at a trendy Wagas cafe. He talks endlessly about his new AI startup, Series A funding, and the Chinese tech ecosystem. It's intense but inspiring.",
    choices: [
      {
        text: "Pitch him an idea.",
        next: "hub",
        effects: { stats: { academics: +10, sanity: -5 }, guanxi: { localStudents: +10 }, relationships: { "Xiao Chen": { friendship: +10 } } }
      }
    ]
  },
  "event_xiao_chen_business": {
    speaker: "Xiao Chen",
    text: "Because you're close, Xiao Chen invites you to his private office. 'I need a foreign co-founder to help us expand into international markets.' This could be huge.",
    choices: [
      {
        text: "Shake on it.",
        next: "hub",
        effects: { stats: { academics: +25, sanity: -20 }, guanxi: { localStudents: +20, admin: +10 }, relationships: { "Xiao Chen": { friendship: +10 } }, flags: { xiao_chen_startup: true } }
      }
    ]
  },
  "event_sophie": {
    speaker: "Sophie",
    text: "Sophie invites you to a trendy hidden bar in the French Concession. You swap stories about language struggles and the massive culture shocks you've both faced.",
    choices: [
      {
        text: "Cheers to surviving abroad!",
        next: "hub",
        effects: { stats: { sanity: +25 }, guanxi: { intlStudents: +20 }, relationships: { "Sophie": { friendship: +10, romance: +5 } } }
      }
    ]
  },
  "event_sophie_date": {
    speaker: "Sophie",
    text: "You take Sophie to a high-end restaurant on the Bund, followed by cocktails at a rooftop bar overlooking the skyline. The view is incredible, but she is more captivated by you.",
    choices: [
      {
        text: "Kiss her under the neon lights.",
        next: "hub",
        effects: { stats: { sanity: +50, culture: +20 }, relationships: { "Sophie": { romance: +20, friendship: +10 } }, flags: { sophie_dated: true } }
      }
    ]
  },
  "event_uncle_wang": {
    speaker: "Uncle Wang",
    text: "You sit on tiny plastic stools at 2 AM eating spicy skewers. Uncle Wang jokes with you about your improving Chinese and gives you extra lamb.",
    choices: [
      {
        text: "Enjoy the authentic street culture.",
        next: "hub",
        effects: { stats: { sanity: +30, culture: +15, chinese: +5 }, relationships: { "Uncle Wang": { friendship: +10 } } }
      }
    ]
  },
  "event_uncle_wang_baijiu": {
    speaker: "Uncle Wang",
    text: "Uncle Wang brings out a dusty bottle of Erguotou Baijiu. 'For my best customer!' he declares. You spend the rest of the night drinking and singing old Chinese revolutionary songs.",
    choices: [
      {
        text: "Ganbei! (Bottoms up!)",
        next: "hub",
        effects: { stats: { sanity: -20, culture: +40, chinese: +15 }, relationships: { "Uncle Wang": { friendship: +20 } }, flags: { uncle_wang_drank: true } }
      }
    ]
  },
  "event_dr_mei": {
    speaker: "Dr. Mei",
    text: "You attend one of Dr. Mei's guest lectures. Her insights into Chinese market dynamics are incredibly theoretical but fascinating.",
    choices: [
      {
        text: "Ask a smart question.",
        next: "hub",
        effects: { stats: { academics: +10, sanity: -5 }, relationships: { "Dr. Mei": { friendship: +10 } } }
      }
    ]
  },
  "event_dr_mei_lab": {
    speaker: "Dr. Mei",
    text: "Because of your consistent engagement, Dr. Mei invites you into her inner circle to help co-author her latest academic paper targeting an international journal.",
    choices: [
      {
        text: "Take furious notes and format citations.",
        next: "hub",
        effects: { stats: { academics: +25, sanity: -15, chinese: +10 }, relationships: { "Dr. Mei": { friendship: +15 } }, flags: { dr_mei_paper: true } }
      }
    ]
  },
  "event_manager_zhang": {
    speaker: "Manager Zhang",
    text: "You attend a generic corporate recruiting panel led by Manager Zhang. He hands out hundreds of business cards and shakes many hands.",
    choices: [
      {
        text: "Briefly introduce yourself in Chinese.",
        next: "hub",
        effects: { stats: { culture: +5 }, guanxi: { admin: +10 }, relationships: { "Manager Zhang": { friendship: +10 } } }
      }
    ]
  },
  "event_manager_zhang_dinner": {
    speaker: "Manager Zhang",
    text: "As a trusted contact, Manager Zhang invites you to a private dinner. He grills you on your career plans in China over expensive Moutai baijiu. 'We need people who understand both markets,' he says.",
    choices: [
      {
        text: "Maintain composure and toast him respectfully.",
        next: "hub",
        effects: { stats: { culture: +15, academics: +15, sanity: -20 }, guanxi: { admin: +30 }, relationships: { "Manager Zhang": { friendship: +20 } }, flags: { manager_zhang_job: true } }
      }
    ]
  },

  // --- CITY TRAVEL EVENTS ---
  "event_travel_shanghai": {
    speaker: "System",
    text: "You arrive back in Shanghai, the beating heart of modern China. It's time to get back to the grind.",
    choices: [{ text: "Back to reality.", next: "hub", effects: { stats: { sanity: -5 } } }]
  },
  "event_travel_beijing": {
    speaker: "Beijing",
    text: "You step out into the crisp, dry air of Beijing. History is everywhere you look.",
    choices: [{ text: "Explore the capital.", next: "hub", effects: { stats: { culture: 15, sanity: 20 } } }]
  },
  "event_travel_guangzhou": {
    speaker: "Guangzhou",
    text: "The tropical humidity hits you. Guangzhou is bustling with traders, incredible smells, and non-stop business.",
    choices: [{ text: "Time for some Dim Sum.", next: "hub", effects: { stats: { culture: 10, sanity: 25 } } }]
  },
  "event_travel_chengdu": {
    speaker: "Chengdu",
    text: "You arrive in Chengdu. The pace of life here is incredibly slow and relaxed, filled with teahouses and mahjong.",
    choices: [{ text: "Adopt the slow life.", next: "hub", effects: { stats: { culture: 20, sanity: 40 } } }]
  },
  "event_travel_xian": {
    speaker: "Xi'an",
    text: "You arrive in Xi'an, the ancient capital. The massive city walls and ancient pagodas dominate the skyline.",
    choices: [{ text: "Step back into the past.", next: "hub", effects: { stats: { culture: 30, sanity: 15 } } }]
  },
  "event_travel_hangzhou": {
    speaker: "Hangzhou",
    text: "You step off the train in Hangzhou. The serene West Lake is surrounded by mist and willow trees.",
    choices: [{ text: "Find inner peace.", next: "hub", effects: { stats: { culture: 20, sanity: 50 } } }]
  },
  "event_travel_sanya": {
    speaker: "Sanya",
    text: "Welcome to Sanya, the 'Hawaii of China'. Palm trees, white sands, and endless ocean views.",
    choices: [{ text: "Hit the beach.", next: "hub", effects: { stats: { sanity: 80 } } }]
  },

  // --- CITY SOCIAL TARGETS ---
  "event_beijing_taxi": {
    speaker: "Taxi Driver Lao Li",
    text: "Lao Li talks your ear off about Chinese history and global politics in a thick Beijing accent. He keeps calling you 'Ge'er men' (bro).",
    choices: [{ text: "Nod and listen to the wisdom.", next: "hub", effects: { stats: { culture: +10, chinese: +5, sanity: -5 } } }]
  },
  "event_guangzhou_boss": {
    speaker: "Boss Wu",
    text: "You share Dim Sum with Boss Wu. He represents a massive manufacturing network and is always looking for export opportunities.",
    choices: [{ text: "Talk business and build network.", next: "hub", effects: { stats: { culture: +5, chinese: +10 }, guanxi: { admin: +10 } } }]
  },
  "event_chengdu_tea": {
    speaker: "Teahouse Auntie",
    text: "You sit in a bamboo chair sipping jasmine tea while Auntie gives you unprompted life advice and tries to set you up with her nephew.",
    choices: [{ text: "Smile and sip the tea.", next: "hub", effects: { stats: { culture: +15, sanity: +30 } } }]
  },
  "event_xian_tour": {
    speaker: "Guide Jin",
    text: "Jin is an expert on the Qin Dynasty. He gives you a private tour of the Terracotta Army, explaining the incredible logistics of the ancient empire.",
    choices: [{ text: "Absorb the ancient history.", next: "hub", effects: { stats: { culture: +30, academics: +10, sanity: -10 } } }]
  },
  "event_hangzhou_tea": {
    speaker: "Zen Master",
    text: "In a quiet pavilion near West Lake, a master brews Longjing green tea. You practice mindfulness, completely disconnecting from your phone.",
    choices: [{ text: "Breathe in, breathe out.", next: "hub", effects: { stats: { culture: +15, sanity: +60, digitalProficiency: -5 } } }]
  },
  "event_sanya_surf": {
    speaker: "Surfer Hao",
    text: "Hao teaches you how to catch the waves at Houhai Bay. It's exhausting physically, but incredibly freeing mentally.",
    choices: [{ text: "Ride the wave.", next: "hub", effects: { stats: { sanity: +50, wealth: -50 } } }]
  },

  "event_sh_ins_clubbing": {
    speaker: "INS Club Inside Fuxing Park",
    text: "The music is deafening. You rent a booth and order several bottles of champagne with your friends. Everyone is taking photos for Xiaohongshu.",
    choices: [{ text: "Dance until dawn.", next: "hub", effects: { stats: { sanity: +60, culture: +15, academics: -10 }, guanxi: { localStudents: +20 }, magnet: { name: "INS Disco", emoji: "🪩", image: "assets/magnets/shanghai_ins_disco.png" } } }]
  },
  "event_sh_bund_walk": {
    speaker: "The Bund",
    text: "You take a quiet walk along the Huangpu River. The glittering towers of Pudong stand as a testament to China's economic miracle.",
    choices: [{ text: "Reflect on your journey.", next: "hub", effects: { stats: { sanity: +30, culture: +10 }, magnet: { name: "Pearl Tower", emoji: "🗼", image: "assets/magnets/shanghai_pearl_tower.png" } } }]
  },
  "event_sh_lujiazui_mixer": {
    speaker: "Fintech Mixer",
    text: "You attend an exclusive mixer inside the Shanghai Tower. Expats and locals mingle, exchanging WeChat contacts and startup pitches.",
    choices: [{ text: "Hand out your digital business card.", next: "hub", effects: { stats: { wealth: -100, sanity: -15 }, guanxi: { admin: +15, intlStudents: +10 }, magnet: { name: "Fintech Coin", emoji: "🪙", image: "assets/magnets/shanghai_lujiazui_coin.png" } } }]
  },

  // --- CITY ENTERTAINMENT EVENTS ---
  "event_beijing_opera": {
    speaker: "Peking Opera Theater",
    text: "You watch a traditional Peking Opera. The piercing falsetto singing and acrobatic martial arts are fascinating, if a bit hard to understand.",
    choices: [{ text: "Appreciate the deep culture.", next: "hub", effects: { stats: { culture: +20, sanity: +10 }, magnet: { name: "Opera Mask", emoji: "🎭", image: "assets/magnets/peking_opera_mask.png" } } }]
  },
  "event_guangzhou_market": {
    speaker: "Wholesale Market",
    text: "You get lost in a massive, multi-story wholesale clothing market. You buy fake luxury brands and cheap electronics in bulk.",
    choices: [{ text: "Haul it back.", next: "hub", effects: { stats: { digitalProficiency: +5, sanity: +15, culture: +5 }, magnet: { name: "Baima Bag", emoji: "🛍️", image: "assets/magnets/baima_shopping_bag.png" } } }]
  },
  "event_chengdu_hotpot": {
    speaker: "Local Hotpot Restaurant",
    text: "The mala (numbing and spicy) sensation is overwhelming. You sweat profusely, but the atmosphere with the locals is amazing.",
    choices: [{ text: "One more quail egg!", next: "hub", effects: { stats: { sanity: +30, culture: +10 }, magnet: { name: "Chili Pepper", emoji: "🌶️", image: "assets/magnets/chengdu_chili.png" } } }]
  },
  "event_xian_cycling": {
    speaker: "Ancient Walls",
    text: "You rent a tandem bike and cycle along the perimeter of the 600-year-old city wall as the sun sets over the ancient pagodas.",
    choices: [{ text: "Feel the history.", next: "hub", effects: { stats: { sanity: +40, culture: +15 }, magnet: { name: "City Guard", emoji: "🗿", image: "assets/magnets/terracotta_warrior.png" } } }]
  },
  "event_hangzhou_boat": {
    speaker: "West Lake Boatman",
    text: "A boatman gently rows you across the West Lake. The scene looks like a classical Chinese watercolour painting.",
    choices: [{ text: "Write a poem in your head.", next: "hub", effects: { stats: { sanity: +50, culture: +20 }, magnet: { name: "West Lake Boat", emoji: "🛶", image: "assets/magnets/west_lake_boat.png" } } }]
  },
  "event_sanya_yacht": {
    speaker: "Yacht Party",
    text: "You somehow got invited (and paid for) a luxury yacht party with young 'fu er dai' (second-generation rich) elites.",
    choices: [{ text: "Pop the champagne.", next: "hub", effects: { stats: { sanity: +60 }, guanxi: { localStudents: +15 }, magnet: { name: "Yacht Wheel", emoji: "🛥️", image: "assets/magnets/sanya_yacht.png" } } }]
  },

  // --- CITY HUSTLE EVENTS ---
  "event_beijing_tourguide": {
    speaker: "Foreign Tourist Group",
    text: "You leverage your basic Chinese to help lost foreign tourists navigate the massive Forbidden City, making decent tips along the way.",
    choices: [{ text: "Pocket the cash.", next: "hub", effects: { stats: { wealth: +300, chinese: +5, sanity: -15 } } }]
  },
  "event_guangzhou_cantonfair": {
    speaker: "Foreign Buyer",
    text: "At the massive Canton Fair, an Italian buyer pays you handsomely to translate negotiations for bulk textile orders.",
    choices: [{ text: "Negotiate hard.", next: "hub", effects: { stats: { wealth: +500, chinese: +15, sanity: -20 } } }]
  },
  "event_chengdu_volunteer": {
    speaker: "Sanctuary Guide",
    text: "You spend the day shoveling bamboo and cleaning enclosures. It's hard labor, but you get to see baby pandas up close.",
    choices: [{ text: "Take a selfie with a panda.", next: "hub", effects: { stats: { sanity: +40, culture: +10 } } }]
  },
  "event_xian_souvenirs": {
    speaker: "Street Vendor Boss",
    text: "You help a local vendor pitch mini Terracotta Warrior statues to foreign tourists in the Muslim Quarter.",
    choices: [{ text: "Make the sale.", next: "hub", effects: { stats: { wealth: +200, culture: +5 } } }]
  },
  "event_hangzhou_alibaba": {
    speaker: "HR Representative",
    text: "You managed to score an interview at Alibaba's massive campus. The technical tests and corporate philosophy questions are intense.",
    choices: [{ text: "Fingers crossed for an offer.", next: "hub", effects: { stats: { academics: +15, digitalProficiency: +10, sanity: -25 } } }]
  },
  "event_sanya_bartender": {
    speaker: "Beach Club Manager",
    text: "The beach club was understaffed. As a foreigner, just standing behind the bar making basic mojitos draws a huge crowd.",
    choices: [{ text: "Collect those tips.", next: "hub", effects: { stats: { wealth: +300, sanity: -10 } } }]
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

  "random_vpn_down": {
    speaker: "System",
    text: "It's a sensitive time of year and the Great Firewall has clamped down. Your VPN connects and drops every 30 seconds. You can't access Google or YouTube.",
    choices: [
      {
        text: "Spend 2 hours frantically trying different server configurations.",
        next: "hub",
        effects: { stats: { digitalProficiency: 15, sanity: -20 } }
      },
      {
        text: "Accept fate. Use Baidu and Bilibili like the locals.",
        next: "hub",
        effects: { stats: { culture: 15, chinese: 10, sanity: +5 } }
      }
    ]
  },
  "random_dorm_inspection": {
    speaker: "Dorm Auntie",
    text: "Surprise dorm inspection! The Auntie (Ayí) is checking rooms for unauthorized appliances like hot plates and rice cookers.",
    choices: [
      {
        text: "Quickly hide your illegal microwave under the bed.",
        next: "hub",
        effects: { stats: { sanity: -15, culture: +5 } }
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
