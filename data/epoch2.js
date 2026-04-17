export const epoch2Events = {
  "pre_departure_start": {
    speaker: "System",
    text: "Epoch 2: Pre-Departure. You've received your admission notice and JW202 form! Now you must navigate the complex visa process and get ready to fly.",
    choices: [
      {
        text: "Apply for the X1 Student Visa",
        next: "visa_application",
        effects: {
          stats: { sanity: -5, digitalProficiency: 5 }
        }
      }
    ]
  },
  "visa_application": {
    speaker: "Chinese Visa Application Service Center",
    text: "Welcome. Please ensure you have your passport, photos, Admission Letter, JW202 form, and Physical Examination record. Missing even one photocopy means instant rejection.",
    choices: [
      {
        text: "Meticulously prepare a binder with 3 copies of everything.",
        next: "visa_success",
        effects: {
          stats: { sanity: -20, academics: 5 },
          flags: { "got_visa": true, "decision_e2_visa": "Over-prepared Binders" }
        }
      },
      {
        text: "Just bring the originals and hope they have a printer.",
        next: "visa_fail",
        effects: {
          stats: { wealth: -100 },
          flags: { "decision_e2_visa": "Winged It (Originals)" }
        }
      }
    ]
  },
  "visa_success": {
    speaker: "System",
    text: "Success. They took your passport. It will be returned in 4 days with the shiny X1 Visa sticker.",
    choices: [
      {
        text: "Research Internet Access (VPNs)",
        action: "advance_turn",
        next: "vpn_setup",
        effects: { stats: { sanity: 15 } }
      }
    ]
  },
  "visa_fail": {
    speaker: "Clerk",
    text: "You didn't bring a photocopy of the back of the Admission Letter. You must go to the print shop next door charging 10 RMB per page, then join the back of the 2-hour queue.",
    choices: [
      {
        text: "Sigh and pay up.",
        next: "visa_success",
        effects: { stats: { sanity: -30 } }
      }
    ]
  },
  "vpn_setup": {
    speaker: "Tech Blog",
    text: "China's Great Firewall blocks Google, WhatsApp, Instagram, and more. You need a VPN, but many mainstream ones are targeted and blocked.",
    choices: [
      {
        text: "Buy a premium, obscure Shadowsocks/V2Ray routing service.",
        condition: { stats: { digitalProficiency: { min: 10 } } },
        next: "housing_booking",
        effects: { stats: { wealth: -300, digitalProficiency: 10 }, flags: { "decision_e2_vpn": "Pro Routing V2Ray", "has_vpn": true } }
      },
      {
        text: "Buy a heavily advertised western VPN for 1 year.",
        next: "housing_booking",
        effects: { stats: { wealth: -500 }, flags: { "decision_e2_vpn": "Mainstream VPN (Unstable)", "has_vpn": false } }
      },
      {
        text: "I plan to fully decouple from western media anyway.",
        next: "housing_booking",
        effects: { stats: { culture: 10 }, flags: { "decision_e2_vpn": "Full Digital Decoupling" } }
      }
    ]
  },
  "housing_booking": {
    speaker: "University Portal",
    text: "International Student Dormitories are opening for reservation today at precisely 8:00 AM.",
    choices: [
      {
        text: "Wake up at 7:55 AM and snipe a Single Room.",
        next: "flight_booking",
        effects: { stats: { sanity: 10, wealth: -2000 }, flags: { "decision_e2_housing": "Single Dorm", "housing_sorted": true } }
      },
      {
        text: "Book a cheap Double Room to save money.",
        next: "flight_booking",
        effects: { stats: { wealth: -800, culture: 5 }, guanxi: { intlStudents: 10 }, flags: { "decision_e2_housing": "Double Dorm (Roommate)", "housing_sorted": true } }
      },
      {
        text: "Wait and rent a local apartment off-campus via Lianjia.",
        next: "flight_booking",
        effects: { stats: { sanity: -15, chinese: 5 }, flags: { "decision_e2_housing": "Off-Campus Apartment" } }
      }
    ]
  },
  "flight_booking": {
    speaker: "Trip.com",
    text: "It's time to book your flight. Direct flights are 8,000 RMB. A flight with three layovers through the Middle East is 3,500 RMB.",
    choices: [
      {
        text: "Book the direct flight (Wealth -8000)",
        condition: { stats: { wealth: { min: 8000 } } },
        next: "flight_booked",
        effects: { stats: { wealth: -8000, sanity: 20 }, flags: { "direct_flight": true, "decision_e2_flight": "Comfort (Direct)" } }
      },
      {
        text: "Book the cheap multi-layover flight (Wealth -3500)",
        condition: { stats: { wealth: { min: 3500 } } },
        next: "flight_booked",
        effects: { stats: { wealth: -3500, sanity: -25 }, flags: { "decision_e2_flight": "Budget (3 Layovers)" } }
      }
    ]
  },
  "flight_booked": {
    speaker: "System",
    text: "Flights are booked. Next step: Digital Onboarding. In China, cash is rarely used. You must set up WeChat and Alipay before you arrive.",
    choices: [
      {
        text: "Attempt to register for WeChat.",
        action: "advance_turn",
        next: "digital_onboarding",
        effects: { stats: { sanity: -5 } }
      }
    ]
  },
  "digital_onboarding": {
    speaker: "Inner Voice",
    text: "You download WeChat, but it requires a 'Friend Verification' from an existing user to activate your account. You don't know anyone yet.",
    choices: [
      {
         text: "Ask the international student forum for a scan.",
         next: "digital_success",
         effects: { stats: { sanity: -10, digitalProficiency: 10 }, guanxi: { intlStudents: 5 }, flags: { "has_wechat": true, "decision_e2_wechat": "Digitally Prepped" } }
      },
      {
         text: "Ignore it and figure it out when you land.",
         next: "digital_failure",
         effects: { stats: { sanity: 10 }, flags: { "decision_e2_wechat": "Offline Start" } }
      }
    ]
  },
  "digital_success": {
    speaker: "System",
    text: "You are fully verified. You also link a foreign credit card to Alipay via the TourCard program. You're digitally ready for China.",
    choices: [
      {
        text: "Attend your going-away party.",
        action: "advance_turn",
        next: "farewell_party"
      }
    ]
  },
  "digital_failure": {
    speaker: "System",
    text: "You've decided physical cash will solve your problems. (Narrator: It won't.)",
    choices: [
      {
        text: "Attend your going-away party.",
        action: "advance_turn",
        next: "farewell_party"
      }
    ]
  },
  "farewell_party": {
    speaker: "Friends & Family",
    text: "Everyone is gathered to say goodbye. They ask what you are most excited about.",
    choices: [
      {
        text: "'I'm going to master the language and culture.'",
        next: "packing",
        effects: { stats: { sanity: 20, culture: 10, chinese: 5 }, flags: { "decision_e2_farewell": "Cultural Promise" } }
      },
      {
        text: "'The food, obviously.'",
        next: "packing",
        effects: { stats: { sanity: 30, wealth: -100 }, flags: { "decision_e2_farewell": "Food Motivations" } }
      },
      {
        text: "'Building a massive business network.'",
        next: "packing",
        effects: { stats: { sanity: 15, academics: 5 }, guanxi: { intlStudents: 5 }, flags: { "decision_e2_farewell": "Networking Focus" } }
      }
    ]
  },
  "packing": {
    speaker: "System",
    text: "It's the night before the flight. You have two 23kg suitcases. What do you prioritize?",
    choices: [
      {
        text: "Priority: Comfort (Medicines, Snacks, Deodorant)",
        next: "depart",
        effects: { stats: { sanity: 20 }, flags: { "decision_e2_pack": "Priority: Comfort" } }
      },
      {
        text: "Priority: Academics (Books, Notebooks, Stationery)",
        next: "depart",
        effects: { stats: { academics: 10, sanity: -10 }, flags: { "decision_e2_pack": "Priority: Academics" } }
      },
      {
        text: "Priority: Gifts for locals (Chocolate, Vitamins, Wine)",
        next: "depart",
        effects: { stats: { wealth: -300 }, guanxi: { localStudents: 15, professors: 15 }, flags: { "decision_e2_pack": "Priority: Expat Gifts" } }
      }
    ]
  },
  "depart": {
    speaker: "Airport Announcement",
    text: "Flight CA982 to Beijing Capital International Airport is now boarding. Please have your passport and boarding pass ready.",
    choices: [
      {
        text: "Board the plane (Progress to Epoch 3: In-China)",
        action: "advance_turn",
        next: "hub", 
        effects: { stats: { sanity: 50 }, flags: { "arrived_in_china": true } }
      }
    ]
  }
};
