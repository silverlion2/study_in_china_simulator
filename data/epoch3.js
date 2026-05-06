export const epoch3Events = {
  "in_china_start": {
    speaker: "System",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Shanghai Pudong International Airport",
    text: "Epoch 3: In China. You step off the plane at Shanghai Pudong International Airport with a passport, two tired arms, and a brain that keeps translating signs half a second too late.\n\nThis is a forced SimPad tutorial. Before taxi queues, metro experiments, or campus shortcuts unlock, you must use SimPad > DiDi to request the airport pickup and learn the pickup-zone logic.",
    choices: [
      {
        text: "Open SimPad > DiDi and request Airport Transfer Practice. [Required phone action]",
        next: "airport_didi_simpad_gate",
        effects: {
          location: "Shanghai",
          flags: { has_didi: true, decision_e3_transport: "Required SimPad DiDi tutorial pending", first_didi_opened: true, airport_didi_required: true, didi_airport_mode: "prepared" }
        }
      }
    ]
  },

  "airport_didi_simpad_gate": {
    speaker: "SimPad Task",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Shanghai Pudong International Airport",
    text: "The pickup decision has moved into your phone.\n\nTask: open SimPad, tap DiDi, and select Airport Transfer Practice. After the ride is confirmed, the story will continue to the pickup-zone lesson. There is no taxi or metro fallback in this tutorial.",
    choices: [
      {
        text: "Open SimPad > DiDi and complete the required airport ride. [Required phone action]",
        next: "airport_didi_simpad_gate",
        effects: {
          flags: { airport_didi_required: true, has_didi: true }
        }
      }
    ]
  },

  "official_taxi_queue": {
    speaker: "Taxi Driver",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Shanghai Elevated Road",
    text: "The taxi pulls away from Pudong. Towers appear, disappear, and reappear behind highway curves. The driver asks where you are from, then tells you Minghai has a good canteen. This counts as your first local review.",
    choices: [
      {
        text: "Watch Shanghai slide past the window.",
        next: "campus_arrival"
      }
    ]
  },

  "didi_success": {
    speaker: "Phone Screen",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Pudong Airport Pickup Zone",
    text: "The DiDi arrives at the pickup zone after one wrong escalator and three nervous license-plate checks. The route is tracked, the price is clear, and for the first time today a pre-departure choice pays off immediately.",
    choices: [
      {
        text: "Follow the route toward Minghai.",
        next: "campus_arrival"
      }
    ]
  },

  "didi_airport_setup": {
    speaker: "Phone Screen",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Pudong Airport Pickup Zone",
    text: "Airport Wi-Fi blinks, the verification code arrives late, and the pickup zone map looks like it was designed by someone who has never carried two suitcases. You can still make it work, but now you understand why the seniors kept saying: set up the apps before landing.",
    choices: [
      {
        text: "Finish the setup and request the ride.",
        next: "didi_pickup_lesson"
      }
    ]
  },

  "didi_pickup_lesson": {
    speaker: "DiDi App",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Pudong Airport Pickup Zone",
    text: "The app asks for three decisions that suddenly feel important: exact pickup point, car plate, and whether to share the route. This is your first real China app lesson: the button is easy; the context around the button is the hard part.",
    choices: [
      {
        text: "Check the plate, confirm the pickup zone, and share the route to your Minghai chat. [Digital +]",
        next: "didi_success",
        effects: {
          stats: { digitalProficiency: 2 },
          flags: { first_didi_used: true, didi_pickup_zone_lesson: true, route_shared_to_minghai_chat: true }
        }
      }
    ]
  },

  "metro_to_campus": {
    speaker: "Shanghai Metro",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Line 2 Platform",
    text: "The metro is cheap, efficient, and absolutely not designed around your emotional bond with two oversized suitcases. By the time you transfer, you have learned three things: stand on the right, move fast, and never underestimate wheels on luggage.",
    choices: [
      {
        text: "Surface near Minghai and find the campus gate.",
        next: "campus_arrival"
      }
    ]
  },

  "campus_arrival": {
    speaker: "Minghai University Gate",
    bgImage: '/images/simulator/backgrounds/bg_minghai_gate.jpg',
    location: "Minghai University Main Entrance",
    text: "Minghai's gate is less cinematic than the photos and more real because of it: security booth, delivery bikes, students dragging suitcases, banners welcoming new international students. You have arrived too early to understand everything and too late to pretend this is still theoretical.",
    choices: [
      {
        text: "Check in at the dorm, then find the canteen.",
        next: "canteen_adventure"
      }
    ]
  },

  "canteen_adventure": {
    speaker: "Minghai Canteen",
    bgImage: '/images/simulator/backgrounds/bg_canteen_counter.jpg',
    location: "Student Canteen 1",
    text: "The canteen is four floors of steam, metal trays, QR codes, and students who all seem to know where they are going. You do not. Hunger gives you courage, or at least momentum.",
    choices: [
      {
        text: "Point at tomato eggs over rice and scan Alipay. [Energy +, Culture +]",
        condition: { flags: { has_alipay: true } },
        next: "canteen_safe",
        effects: {
          stats: { energy: 15, culture: 5 },
          flags: { decision_e3_food: "Tomato eggs and Alipay", first_alipay_used: true, alipay_canteen_lesson: true }
        }
      },
      {
        text: "Ask whether cash is okay, then order the safest-looking set meal. [Chinese +, Energy +]",
        next: "canteen_cash",
        effects: {
          stats: { chinese: 5, energy: 8 },
          flags: { decision_e3_food: "Cash and careful Chinese" }
        }
      },
      {
        text: "Get in the longest line and point at the spicy red mapo tofu. [Culture +, Energy -]",
        next: "canteen_spicy",
        effects: {
          stats: { culture: 15, energy: -5 },
          flags: { decision_e3_food: "Spice challenger" }
        }
      }
    ]
  },

  "canteen_safe": {
    speaker: "Inner Voice",
    bgImage: '/images/simulator/backgrounds/bg_canteen_counter.jpg',
    location: "Canteen Dinner Table",
    text: "It is exactly what you needed: cheap, hot, soft around the edges. You eat too fast and only realize afterward that your first meal in China cost less than the airport coffee you refused to buy.",
    choices: [
      {
        text: "Go back to the dorm to set up.",
        next: "taobao_setup"
      }
    ]
  },

  "canteen_cash": {
    speaker: "Canteen Auntie",
    bgImage: '/images/simulator/backgrounds/bg_canteen_counter.jpg',
    location: "Canteen Dinner Table",
    text: "The cashier looks surprised by the cash, then waves you through with the practical mercy of someone who has seen many confused first-years. Your Chinese handles its first real food-counter test.",
    choices: [
      {
        text: "Go back to the dorm to set up.",
        next: "taobao_setup"
      }
    ]
  },

  "canteen_spicy": {
    speaker: "Inner Voice",
    bgImage: '/images/simulator/backgrounds/bg_canteen_counter.jpg',
    location: "Canteen Dinner Table",
    text: "The first bite is delicious. The second bite becomes a weather event. You buy soy milk, pretend this was the plan, and make a private treaty with your stomach.",
    choices: [
      {
        text: "Go back to the dorm red in the face but proud.",
        next: "taobao_setup"
      }
    ]
  },

  "taobao_setup": {
    speaker: "Dorm Room",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Minghai International Student Dorm",
    text: "Your dorm room is clean, plain, and aggressively unfurnished: bed frame, desk, chair, mattress, fluorescent light. You need bedding, a desk lamp, a power strip, and probably advice from someone who has done this before.\n\nThis is a required SimPad tutorial. Open SimPad > Taobao and buy one basic dorm item so the game can teach address fields, seller ratings, delivery timing, and courier friction before Taobao becomes a normal weekly utility.",
    choices: [
      {
        text: "Open SimPad > Taobao and buy a basic dorm item. [Required phone action]",
        next: "taobao_setup",
        effects: {
          flags: { taobao_simpad_required: true, taobao_tutorial_started: true }
        }
      }
    ]
  },

  "taobao_simpad_lesson_done": {
    storyBeat: true,
    speaker: "Taobao Search",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Minghai International Student Dorm",
    text: "The order confirmation page looks simple only after it is done. Before that, Taobao made you read seller ratings, delivery estimates, mattress sizes, address fields, and courier notes like they were part of a secret entrance exam.\n\nThe cheapest option was loud. The reliable option was boring. Tonight, boring looks beautiful.\n\nYour first Taobao lesson is practical: shopping is only half the app. The other half is making sure the thing can actually find you.",
    choices: [
      {
        text: "Continue",
        next: "first_night",
        effects: {
          stats: { digitalProficiency: 5, energy: 3, chinese: 2 },
          flags: { decision_e3_taobao: "Required SimPad Taobao dorm order", first_taobao_used: true, taobao_address_saved: true, taobao_careful_first_order: true, taobao_simpad_required: false, taobao_tutorial_completed: true }
        }
      }
    ]
  },

  "taobao_search_lesson": {
    speaker: "Taobao Search",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Minghai International Student Dorm",
    text: "Taobao does not feel like shopping at first. It feels like a language exam with pictures: seller ratings, delivery dates, mattress sizes, campus address fields, and courier notes. The cheapest option is loud. The reliable option is boring. Boring suddenly looks beautiful.",
    choices: [
      {
        text: "Compare ratings, delivery dates, and the dorm address before paying. [Digital +, Energy -]",
        next: "taobao_solo",
        effects: {
          stats: { digitalProficiency: 5, energy: -3, chinese: 2 },
          flags: { first_taobao_used: true, taobao_address_saved: true, taobao_careful_first_order: true }
        }
      },
      {
        text: "Choose the cheapest bundle and learn what a size chart can hide. [Digital +, Energy -]",
        next: "taobao_solo_risky",
        effects: {
          stats: { energy: -8, digitalProficiency: 2 },
          flags: { first_taobao_used: true, taobao_wrong_size_lesson: true }
        }
      }
    ]
  },

  "taobao_solo": {
    speaker: "Dorm Room",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Minghai International Student Dorm",
    text: "It takes two hours, one accidental search for dollhouse lamps, and an intense debate over mattress dimensions, but the orders go through. You have not mastered China. You have bought bedding. Tonight, that is enough.",
    choices: [
      {
        text: "Prepare for the first night in the dorm.",
        next: "first_night"
      }
    ]
  },

  "taobao_solo_risky": {
    speaker: "Dorm Room",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Minghai International Student Dorm",
    text: "The order goes through, but one review photo makes you realize the pillow may be the size of a napkin. Your first Taobao lesson is already clear: price is information, but not all information is friendly.",
    choices: [
      {
        text: "Prepare for the first night and hope the courier is merciful.",
        next: "first_night"
      }
    ]
  },

  "taobao_help": {
    speaker: "Neighbor Li",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Dorm Hallway",
    text: "Neighbor Li leans into your phone screen. 'New student? No problem. First lesson: cheap is not always saving money.'\n\nYou: 'I thought this pillow was a good deal.'\n\nNeighbor Li: 'This pillow is for someone with no neck.' He rejects two sellers, circles a shipping estimate, and teaches you bu tai hua suan: not very worth it.\n\nBy the time the order goes through, it feels less like shopping and more like someone quietly making room for you in the building.",
    choices: [
      {
        text: "Thank Li and prepare for the first night.",
        next: "first_night"
      }
    ]
  },

  "first_night": {
    speaker: "Bed",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Minghai International Student Dorm",
    text: "The mattress is firmer than your confidence. Outside the window, scooters hum through campus paths, someone laughs in a language you almost understand, and Shanghai keeps existing whether you are ready or not.",
    choices: [
      {
        text: "Accept the hard mattress and call it cultural learning. [Culture +, Energy -]",
        next: "e3_w17_registration",
        action: "advance_turn",
        effects: {
          location: "Shanghai",
          stats: { wealth: 3000, energy: -6, culture: 8 },
          flags: { arrived_in_china: true, arrival_living_funds_unlocked: true, adaptation_novelty: true, first_night_choice: "Accepted the hard mattress" }
        }
      },
      {
        text: "Order a mattress topper before your back becomes a case study. [Wealth -, Energy +]",
        next: "e3_w17_registration",
        action: "advance_turn",
        effects: {
          location: "Shanghai",
          stats: { wealth: 2880, energy: 12 },
          flags: { arrived_in_china: true, arrival_living_funds_unlocked: true, adaptation_novelty: true, first_night_choice: "Ordered a mattress topper" }
        }
      }
    ]
  },

  "e3_w17_registration": {
    speaker: "Global Education Office",
    bgImage: '/images/simulator/backgrounds/bg_registration_office.jpg',
    location: "Minghai Administration Building",
    text: "Registration day is a slow river of stamps, student numbers, passport checks, WeChat groups, and people saying 'next window' with absolute confidence. The office is not hostile. It is simply a machine with its own rhythm.",
    choices: [
      {
        text: "Bring every document and ask politely when confused. [Admin network +, Digital +]",
        next: "e3_w17_residence_permit",
        effects: {
          stats: { digitalProficiency: 5, energy: -2 },
          guanxi: { admin: 8 },
          flags: { decision_e3_registration: "Careful office registration", student_card_ready: true },
          lifeCheck: {
            id: "registration_office_rhythm",
            label: "Registration Office Rhythm",
            route: "Admin",
            tags: ["admin", "registration", "arrival"],
            stats: { digitalProficiency: 0.45, culture: 0.25, energy: 0.05 },
            guanxi: { admin: 0.25 },
            dc: 11,
            success: {
              message: "The office still moves slowly, but your screenshots and politeness keep the machine from eating the whole day.",
              stats: { energy: 2, culture: 1 },
              flags: { registration_rhythm_clean: true }
            },
            failure: {
              message: "You finish registration, but each window takes a little more energy because the sequence never fully clicks.",
              stats: { energy: -3 },
              flags: { registration_rhythm_strained: true }
            }
          }
        }
      },
      {
        text: "Follow Sophie's senior-student checklist. [Intl network +, Relationship +]",
        condition: { flags: { met_sophie_online: true } },
        next: "e3_w17_residence_permit",
        effects: {
          stats: { energy: 4 },
          guanxi: { intlStudents: 8 },
          relationships: { Sophie: { friendship: 6 } },
          flags: { decision_e3_registration: "Senior checklist registration", student_card_ready: true, met_sophie_on_campus: true },
          lifeCheck: {
            id: "registration_senior_checklist",
            label: "Senior Checklist Registration",
            route: "International",
            tags: ["admin", "registration", "arrival", "intl"],
            stats: { digitalProficiency: 0.35, culture: 0.2, energy: 0.08 },
            guanxi: { intlStudents: 0.25 },
            character: "Sophie",
            relationshipWeight: 0.3,
            dc: 11,
            success: {
              message: "Sophie's checklist turns registration into a sequence you can follow and later explain to someone else.",
              stats: { digitalProficiency: 1, energy: 2 },
              flags: { registration_checklist_reusable: true }
            },
            failure: {
              message: "The checklist helps, but you realize following instructions is not the same as understanding the system.",
              stats: { energy: -2 },
              flags: { registration_checklist_dependency: true }
            }
          }
        }
      },
      {
        text: "Improvise at each window and learn by being corrected. [Chinese +, Energy -]",
        next: "e3_w17_residence_permit",
        effects: {
          stats: { chinese: 6, energy: -5 },
          guanxi: { admin: 3 },
          flags: { decision_e3_registration: "Improvised registration", student_card_ready: true },
          lifeCheck: {
            id: "registration_improv",
            label: "Improvised Registration",
            route: "Admin",
            tags: ["admin", "registration", "language"],
            stats: { chinese: 0.45, culture: 0.2, energy: 0.04 },
            guanxi: { admin: 0.2 },
            dc: 10,
            success: {
              message: "Improvising works because your Chinese is just strong enough to repair mistakes in real time.",
              stats: { culture: 2 },
              flags: { registration_improv_repaired: true }
            },
            failure: {
              message: "You make it through, but being corrected at every window leaves a bruise on your confidence.",
              stats: { energy: -4 },
              flags: { registration_improv_bruise: true }
            }
          }
        }
      }
    ]
  },

  "e3_w17_residence_permit": {
    speaker: "Admin Reminder",
    bgImage: '/images/simulator/backgrounds/bg_registration_office.jpg',
    location: "Minghai Administration Building",
    text: "A staff member circles one deadline twice: residence permit conversion. Your X1 visa got you into China; it does not finish the paperwork. The realization lands softly, then heavily.\n\nThis is the moment Calendar stops being decorative. Deadlines in China do not become kinder because they are confusing.",
    choices: [
      {
        text: "Open SimPad > Calendar and pin the registration deadline. [Required phone action]",
        next: "e3_w17_calendar_gate",
        effects: {
          stats: { digitalProficiency: 5 },
          flags: { residence_permit_deadline_saved: true, campus_system_ready: true, calendar_simpad_required: true, calendar_tutorial_started: true }
        }
      },
      {
        text: "Ask the office to confirm the process, then pin it in Calendar. [Required phone action]",
        next: "e3_w17_calendar_gate",
        effects: {
          guanxi: { admin: 5 },
          flags: { residence_permit_admin_confirmed: true, campus_system_ready: true, calendar_simpad_required: true, calendar_tutorial_started: true }
        }
      }
    ]
  },

  "e3_w17_calendar_gate": {
    speaker: "SimPad Task",
    bgImage: '/images/simulator/cg/cg_calendar_midterm_warning.png',
    location: "SimPad Calendar",
    text: "Task: open SimPad, tap Calendar, and pin one deadline. The pinned item will show up during weekly transitions and can create a delayed payoff later.\n\nThis is not a choice about personality. This is the game teaching you that studying abroad runs on deadlines you cannot hold in your head forever.",
    choices: [
      {
        text: "Open SimPad > Calendar and pin a deadline. [Required phone action]",
        next: "e3_w17_calendar_gate",
        effects: {
          flags: { calendar_simpad_required: true }
        }
      }
    ]
  },

  "e3_w17_wechat_contacts": {
    speaker: "Orientation QR Wall",
    bgImage: '/images/simulator/backgrounds/bg_registration_office.jpg',
    location: "Minghai Administration Building",
    text: "Outside the registration office, every wall seems to have a QR code: class group, dorm group, international student group, emergency contact, campus card help. WeChat stops being an app icon and becomes the hallway where Minghai actually talks.\n\nSome names are familiar now. Sophie from the pre-departure group. Xiao Chen from the arrival warnings. Neighbor Li from the dorm thread. Week 17 is not the first time you hear these names; it is the moment online contacts become campus contacts.",
    choices: [
      {
        text: "Scan the QR wall and add your first Minghai contacts. [WeChat unlocked]",
        next: "e3_w17_contact_focus",
        effects: {
          stats: { digitalProficiency: 3 },
          guanxi: { intlStudents: 4, localStudents: 4, admin: 2 },
          relationships: { Sophie: { friendship: 4 }, "Xiao Chen": { friendship: 3 }, "Neighbor Li": { friendship: 2 } },
          flags: {
            first_wechat_contact_added: true,
            wechat_sophie_added: true,
            wechat_xiao_chen_added: true,
            wechat_neighbor_li_added: true,
            met_sophie_on_campus: true,
            met_xiao_chen: true,
            met_neighbor_li: true
          }
        }
      }
    ]
  },

  "e3_w17_contact_focus": {
    storyBeat: true,
    speaker: "SimPad Contacts",
    bgImage: '/images/simulator/backgrounds/bg_registration_office.jpg',
    location: "Minghai Administration Building",
    text: "SimPad turns the early online names into confirmed campus contact cards.\n\nSophie: the senior international student from the pre-departure group, practical and dry, who knows which panic can wait.\n\nXiao Chen: the local student volunteer from the arrival chat, fast-moving and obsessed with practical shortcuts.\n\nNeighbor Li: the dorm-floor student whose notes already made housing less abstract.\n\nYou are still not choosing a favorite. You are confirming the people you already met at a distance, so later route choices feel earned.",
    choices: [
      {
        text: "Continue",
        next: "e3_w17_wechat_gate",
        effects: {
          stats: { digitalProficiency: 4, culture: 2 },
          guanxi: { intlStudents: 5, localStudents: 5, admin: 2 },
          relationships: { Sophie: { friendship: 4 }, "Xiao Chen": { friendship: 4 }, "Neighbor Li": { friendship: 4 } },
          flags: {
            decision_e3_wechat_intro: "Required contact-card review",
            contact_cards_reviewed: true,
            sophie_role_known: true,
            xiao_chen_role_known: true,
            neighbor_li_role_known: true,
            met_sophie_on_campus: true,
            met_xiao_chen: true,
            met_neighbor_li: true,
            wechat_sophie_added: true,
            wechat_xiao_chen_added: true,
            wechat_neighbor_li_added: true
          }
        }
      }
    ]
  },

  "e3_w17_wechat_gate": {
    speaker: "SimPad Task",
    bgImage: '/images/simulator/backgrounds/bg_registration_office.jpg',
    location: "SimPad WeChat",
    text: "Task: open SimPad, tap WeChat, and send one short check-in to a contact you just confirmed.\n\nWeChat is not only a contact list. It is where relationships stay warm, drift, or quietly become practical support. The game will not ask you to master every thread now. It only asks you to send one real message so the system becomes visible.",
    choices: [
      {
        text: "Open SimPad > WeChat and send one check-in. [Required phone action]",
        next: "e3_w17_wechat_gate",
        effects: {
          flags: { wechat_simpad_required: true, wechat_tutorial_started: true }
        }
      }
    ]
  },

  "e3_w17_manager_zhang_intro": {
    storyBeat: true,
    speaker: "Manager Zhang",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/cg/cg_office_badge.jpg',
    location: "Minghai Career Center",
    text: "The last QR code on the orientation wall is not social at all: Career Center: Legal Work, Internships, and Reality Checks.\n\nYou follow the crowd into a short briefing where Manager Zhang is already cutting through nervous questions with precise answers.\n\nManager Zhang: 'Useful, legal, consistent. Start there. Impressive can come later.'\n\nSomeone asks about quick introductions. His expression changes by one millimeter.\n\nManager Zhang: 'Relationships matter. So do boundaries. If you confuse the two, the opportunity is not the only thing at risk.'\n\nThis is your first introduction to him: career in China is not just ambition. It is timing, paperwork, trust, and knowing which shortcuts are traps.",
    choices: [
      {
        text: "Continue",
        next: "e3_w17_done",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          guanxi: { admin: 4 },
          relationships: { "Manager Zhang": { friendship: 5 } },
          flags: { met_manager_zhang: true, manager_zhang_role_known: true, wechat_manager_zhang_added: true, manager_zhang_business_card_saved: true, legal_workflow_known: true }
        }
      }
    ]
  },

  "e3_w17_done": {
    speaker: "System",
    bgImage: '/images/simulator/backgrounds/bg_registration_office.jpg',
    location: "Minghai Campus",
    text: "Week 17 ends with a student card, a campus account, a working wallet, and a WeChat list that proves Minghai is no longer just buildings. It has names.",
    choices: [
      {
        text: "Continue to Week 18: first class.",
        action: "advance_turn",
        next: "e3_w18_first_class",
        effects: {
          flags: { registration_week_completed: true }
        }
      }
    ]
  },

  "e3_w18_first_class": {
    speaker: "First Class",
    bgImage: '/images/simulator/backgrounds/bg_first_classroom.jpg',
    location: "Minghai Teaching Building",
    text: "The classroom smells like marker ink and air conditioning. Professor Lin, the same mentor who once marked your application statement, is now a real person at the front of a real Minghai classroom.\n\nHe begins with course expectations, group projects, attendance rules, and a speed of English that suggests everyone here has already agreed to be serious. This is your forced campus introduction to him: the email voice has become a professor you can actually disappoint, learn from, and later seek out.",
    choices: [
      {
        text: "Sit in the front and commit academically. [Academics +, Professor network +]",
        next: "e3_w18_lin_yue_intro",
        effects: {
          stats: { academics: 10, energy: -3 },
          guanxi: { professors: 6 },
          relationships: { "Professor Lin": { friendship: 4 } },
          flags: { decision_e3_first_class: "Front-row academic start", route_academic: true, met_professor_lin_on_campus: true, professor_lin_role_known: true }
        }
      },
      {
        text: "Watch how local classmates read the room. [Culture +, Chinese +]",
        next: "e3_w18_lin_yue_intro",
        effects: {
          stats: { culture: 8, chinese: 5 },
          guanxi: { localStudents: 3 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { decision_e3_first_class: "Classroom culture observer", route_local: true, met_professor_lin_on_campus: true, professor_lin_role_known: true }
        }
      },
      {
        text: "Find classmates who can explain the unwritten rules. [Networks +]",
        next: "e3_w18_lin_yue_intro",
        effects: {
          stats: { energy: 3 },
          guanxi: { localStudents: 4, intlStudents: 4 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { decision_e3_first_class: "Classmate rule-finder", route_intl: true, met_professor_lin_on_campus: true, professor_lin_role_known: true }
        }
      }
    ]
  },

  "e3_w18_lin_yue_intro": {
    storyBeat: true,
    speaker: "Lin Yue",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/cg/cg_lin_yue_classroom_intro.png',
    location: "Minghai Teaching Building",
    text: "After class, a local student stops beside your desk with a group-project signup sheet and the calm expression of someone who has already noticed you pretending to understand the room.\n\nLin Yue: 'You are new, right? Professor Lin's assignments look simple until the group chat starts.'\n\nYou: 'Is that a warning?'\n\nLin Yue smiles, then points to the sheet.\n\nLin Yue: 'More like a map. If you wait for people to invite you, the good groups disappear. If you rush, people think you only want a translator. Try one clear sentence about what you can actually do.'\n\nThis is your first real introduction to Lin Yue: a Chinese classmate who understands the academic room, the local room, and the awkward space between them.",
    choices: [
      {
        text: "Continue",
        next: "e3_w18_major_lens",
        effects: {
          stats: { culture: 4, chinese: 2, academics: 2 },
          guanxi: { localStudents: 5 },
          relationships: { "Lin Yue": { friendship: 6 } },
          flags: {
            met_lin_yue: true,
            lin_yue_role_known: true,
            wechat_lin_yue_added: true,
            contact_lin_yue_intro: true,
            lin_yue_classroom_intro: true
          }
        }
      }
    ]
  },

  "e3_w18_major_lens": {
    speaker: "Inner Voice",
    bgImage: '/images/simulator/backgrounds/bg_first_classroom.jpg',
    location: "Minghai Teaching Building",
    text: "Your major stops being a line on a letter and becomes a room full of people who already seem to know what kind of future this degree is supposed to unlock.",
    choices: [
      {
        text: "Business and Management: listen for how people talk about markets and networks. [Career +]",
        condition: { flags: { major_business: true } },
        next: "e3_w18_done",
        effects: {
          stats: { digitalProficiency: 4, wealth: 200 },
          flags: { major_identity_confirmed: "Business and Management", route_career: true }
        }
      },
      {
        text: "Engineering and Computing: accept that the workload is the language now. [Academics +, Digital +]",
        condition: { flags: { major_stem: true } },
        next: "e3_w18_done",
        effects: {
          stats: { academics: 6, digitalProficiency: 5, energy: -2 },
          flags: { major_identity_confirmed: "Engineering and Computing", route_city: true }
        }
      },
      {
        text: "Humanities and China Studies: notice how theory changes when the street outside is Shanghai. [Culture +, Chinese +]",
        condition: { flags: { major_humanities: true } },
        next: "e3_w18_done",
        effects: {
          stats: { culture: 8, chinese: 4 },
          flags: { major_identity_confirmed: "Humanities and China Studies", route_local: true }
        }
      },
      {
        text: "Whatever the major, decide to learn how Minghai really works. [Academics +]",
        next: "e3_w18_done",
        effects: {
          stats: { academics: 3 },
          flags: { major_identity_confirmed: "Minghai undergraduate path" }
        }
      }
    ]
  },

  "e3_w18_done": {
    storyBeat: true,
    speaker: "System",
    bgImage: '/images/simulator/backgrounds/bg_first_classroom.jpg',
    location: "Minghai Campus",
    text: "Week 18 closes with a syllabus full of deadlines and a new fear: group projects are universal. As students file out, a small research flyer catches in the classroom door.",
    choices: [
      {
        text: "Continue",
        next: "e3_w18_dr_mei_intro"
      }
    ]
  },

  "e3_w18_dr_mei_intro": {
    storyBeat: true,
    speaker: "Dr. Mei",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Research Talk Room",
    text: "A flyer outside the classroom advertises a twenty-minute research talk. You almost walk past it, then hear Professor Lin tell another student, 'Dr. Mei is worth listening to early.'\n\nDr. Mei leaves one clean model on the slide and one messy field note on the document camera.\n\nDr. Mei: 'The clean model is for exams. The messy note is where research begins.'\n\nThis is your first introduction to her: not a generic professor, but the person who will later test whether curiosity can become careful work.",
    choices: [
      {
        text: "Continue",
        action: "advance_turn",
        next: "e3_w19_social_circle",
        effects: {
          stats: { academics: 4, energy: -2 },
          guanxi: { professors: 4 },
          relationships: { "Dr. Mei": { friendship: 5 } },
          flags: { met_dr_mei: true, dr_mei_role_known: true, wechat_dr_mei_added: true }
        }
      }
    ]
  },

  "e3_w19_social_circle": {
    speaker: "Campus Evening",
    location: "Minghai Dorm District",
    text: "Your first social circle does not arrive as a dramatic invitation. It arrives through the contact cards you saved during orientation and the classroom faces that now have voices: Sophie the international-student senior, Xiao Chen the local volunteer, Neighbor Li from your dorm floor, and Lin Yue from your first class.\n\nThis choice is not about guessing names. It is about deciding what kind of support you want first.",
    choices: [
      {
        text: "Join Sophie, the international-student senior, for a low-pressure dinner. [Intl network +, Energy +]",
        next: "e3_w19_done",
        effects: {
          stats: { energy: 8, culture: 3 },
          guanxi: { intlStudents: 10 },
          relationships: { Sophie: { friendship: 8 } },
          flags: { decision_e3_social_circle: "International-student dinner", met_sophie_on_campus: true, route_intl: true }
        }
      },
      {
        text: "Let Xiao Chen, the local volunteer, show you campus shortcuts and cheap food. [Local network +, Relationship +]",
        next: "e3_w19_done",
        effects: {
          stats: { chinese: 4, culture: 5 },
          guanxi: { localStudents: 10 },
          relationships: { "Xiao Chen": { friendship: 8 } },
          flags: { decision_e3_social_circle: "Campus shortcuts with Xiao Chen", met_xiao_chen: true, route_local: true }
        }
      },
      {
        text: "Ask Lin Yue to help you join the class study group without looking lost. [Local classmates +, Academics +]",
        condition: { flags: { met_lin_yue: true } },
        next: "e3_w19_done",
        effects: {
          stats: { academics: 6, chinese: 3, culture: 5, energy: -2 },
          guanxi: { localStudents: 10 },
          relationships: { "Lin Yue": { friendship: 8 } },
          flags: { decision_e3_social_circle: "Class study group with Lin Yue", route_local: true, route_academic: true }
        }
      },
      {
        text: "Ask Neighbor Li, your dorm-floor neighbor, how dorm life really works. [Culture +, Local network +]",
        condition: { flags: { met_neighbor_li: true } },
        next: "e3_w19_done",
        effects: {
          stats: { culture: 7, energy: 4 },
          guanxi: { localStudents: 6 },
          relationships: { "Neighbor Li": { friendship: 8 } },
          flags: { decision_e3_social_circle: "Dorm advice from Neighbor Li", route_local: true }
        }
      }
    ]
  },

  "e3_w19_done": {
    storyBeat: true,
    speaker: "System",
    location: "Minghai Campus",
    text: "Week 19 closes with names in your phone that are no longer just contacts. They are possible versions of belonging. Outside the dorm gate, the dinner crowd begins moving like it knows a secret.",
    choices: [
      {
        text: "Continue",
        next: "e3_w19_uncle_wang_intro"
      }
    ]
  },

  "e3_w19_uncle_wang_intro": {
    storyBeat: true,
    speaker: "Uncle Wang",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/backgrounds/bg_uncle_wang_bbq.jpg',
    location: "Street Stall Near Minghai",
    text: "The student crowd does not explain where it is going. It just drifts through the dorm gate and stops at a skewer stall bright with smoke, plastic stools, and handwritten prices.\n\nUncle Wang points at the safest spice level before you embarrass yourself too badly.\n\nUncle Wang: 'New Minghai student. Start here. Ambition can wait until your stomach signs the contract.'\n\nThis is your first introduction to him: local life is not an abstract culture stat. Sometimes it is a seat someone starts saving before you know how to ask.",
    choices: [
      {
        text: "Continue",
        action: "advance_turn",
        next: "e3_w20_rhythm",
        effects: {
          stats: { culture: 4, chinese: 2, wealth: -35, energy: 5 },
          guanxi: { localStudents: 4 },
          relationships: { "Uncle Wang": { friendship: 5 } },
          flags: { met_uncle_wang: true, uncle_wang_role_known: true, wechat_uncle_wang_added: true }
        }
      }
    ]
  },

  "e3_w20_manager_zhang_intro": {
    storyBeat: true,
    speaker: "Manager Zhang",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/cg/cg_office_badge.jpg',
    location: "Minghai Career Center",
    text: "Week 20 begins with a reminder email from Manager Zhang: Career Center: Legal Work, Internships, and Reality Checks.\n\nYou have already heard the warning once, but it lands differently now that campus no longer feels theoretical.\n\nManager Zhang: 'Useful, legal, consistent. Start there. Impressive can come later.'\n\nThis catch-up beat exists for older saves. In the normal route, Manager Zhang has already been introduced before your first rhythm choice.",
    choices: [
      {
        text: "Continue",
        next: "e3_w20_rhythm",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          guanxi: { admin: 4 },
          relationships: { "Manager Zhang": { friendship: 5 } },
          flags: { met_manager_zhang: true, manager_zhang_role_known: true, wechat_manager_zhang_added: true, manager_zhang_business_card_saved: true }
        }
      }
    ]
  },

  "e3_w20_rhythm": {
    speaker: "Weekly Planner",
    location: "Minghai Campus",
    text: "By Week 20, the question is no longer whether you can arrive. You are here. Dr. Mei, Uncle Wang, and Manager Zhang have given the route names human faces. Now the question is what kind of student you are becoming when no one is forcing the answer.",
    choices: [
      {
        text: "Anchor yourself in grades, office hours, and long library nights. [Academics +]",
        next: "e3_w20_done",
        effects: {
          stats: { academics: 10, energy: -4 },
          guanxi: { professors: 4 },
          flags: { decision_e3_rhythm: "Academic anchor", route_academic: true }
        }
      },
      {
        text: "Say yes to local routines: canteen, clubs, errands, campus slang. [Culture +, Chinese +]",
        next: "e3_w20_done",
        effects: {
          stats: { culture: 10, chinese: 5 },
          guanxi: { localStudents: 5 },
          flags: { decision_e3_rhythm: "Local routine", route_local: true }
        }
      },
      {
        text: "Build a support circle with other international students. [Energy +, Intl network +]",
        next: "e3_w20_done",
        effects: {
          stats: { energy: 10 },
          guanxi: { intlStudents: 8 },
          flags: { decision_e3_rhythm: "International support circle", route_intl: true }
        }
      },
      {
        text: "Look for career signals early: talks, mentors, internships, alumni. [Digital +, Career +]",
        next: "e3_w20_done",
        effects: {
          stats: { digitalProficiency: 8, academics: 3, energy: -3 },
          guanxi: { admin: 4 },
          flags: { decision_e3_rhythm: "Career scouting", route_career: true }
        }
      },
      {
        text: "Treat Shanghai like a lab for small ideas and city opportunities. [Digital +, Culture +]",
        next: "e3_w20_done",
        effects: {
          stats: { digitalProficiency: 6, culture: 6, energy: -3 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { decision_e3_rhythm: "Shanghai opportunity scouting", route_city: true }
        }
      }
    ]
  },

  "e3_w20_done": {
    speaker: "System",
    location: "Minghai Campus",
    text: "Week 20 ends with your first rhythm forming. It is not final, but it is no longer random. The semester begins to answer back.",
    choices: [
      {
        text: "Enter the weekly campus rhythm. [Energy +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 12 },
          flags: { campus_rhythm_started: true, core_cast_introduced: true }
        }
      }
    ]
  },

  "e3_w21_required_people_intro": {
    storyBeat: true,
    speaker: "Minghai Orientation Follow-up",
    bgImage: '/images/simulator/backgrounds/bg_minghai_gate.jpg',
    location: "Minghai Campus",
    text: "Before the weekly planner opens, Minghai checks that you have met the route contacts: Dr. Mei for research, Manager Zhang for career, and Uncle Wang for local life. If an older save missed them, this catches you up before free planning opens.",
    choices: [
      {
        text: "Continue",
        next: "e3_w21_intro_dr_mei",
        effects: {
          stats: { academics: 4, energy: -2 },
          guanxi: { professors: 4 },
          relationships: { "Dr. Mei": { friendship: 5 } },
          flags: { met_dr_mei: true, dr_mei_role_known: true, wechat_dr_mei_added: true }
        }
      }
    ]
  },

  "e3_w21_intro_dr_mei": {
    storyBeat: true,
    speaker: "Dr. Mei",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Research Talk Room",
    text: "Dr. Mei leaves one clean model on the slide and one messy field note on the document camera.\n\nDr. Mei: 'The clean model is for exams. The messy note is where research begins.'\n\nThis catch-up introduction makes sure the research route has a person attached to it before you can choose that path freely.",
    choices: [
      {
        text: "Continue",
        next: "e3_w21_intro_manager_zhang",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          guanxi: { admin: 4 },
          relationships: { "Manager Zhang": { friendship: 5 } },
          flags: { met_manager_zhang: true, manager_zhang_role_known: true, wechat_manager_zhang_added: true, manager_zhang_business_card_saved: true }
        }
      }
    ]
  },

  "e3_w21_intro_manager_zhang": {
    storyBeat: true,
    speaker: "Manager Zhang",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/cg/cg_office_badge.jpg',
    location: "Minghai Career Center",
    text: "Manager Zhang ends the briefing with the calm of someone who has watched many students confuse ambition with shortcuts.\n\nManager Zhang: 'Useful, legal, consistent. Start there. Impressive can come later.'\n\nThis catch-up introduction makes sure the career route has a person attached to it before you can choose that path freely.",
    choices: [
      {
        text: "Continue",
        next: "e3_w21_intro_uncle_wang",
        effects: {
          stats: { culture: 4, chinese: 2, wealth: -35, energy: 5 },
          guanxi: { localStudents: 4 },
          relationships: { "Uncle Wang": { friendship: 5 } },
          flags: { met_uncle_wang: true, uncle_wang_role_known: true, wechat_uncle_wang_added: true }
        }
      }
    ]
  },

  "e3_w21_intro_uncle_wang": {
    storyBeat: true,
    speaker: "Uncle Wang",
    suppressDialogueChoices: true,
    bgImage: '/images/simulator/backgrounds/bg_uncle_wang_bbq.jpg',
    location: "Street Stall Near Minghai",
    text: "Uncle Wang points at the plastic stool like he is assigning you a position.\n\nUncle Wang: 'Sit. Your Chinese is better when you are eating.'\n\nYou: 'That may be because my mouth is full.'\n\nUncle Wang laughs and adds one extra skewer. This catch-up introduction makes sure local life has a person attached to it before you can choose that path freely.",
    choices: [
      {
        text: "Continue",
        next: "hub",
        effects: {
          flags: { core_cast_introduced: true }
        }
      }
    ]
  },

  "epoch3_midterm": {
    speaker: "Midterm Week",
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Minghai Library",
    text: "Week 24 arrives with the personality of an unpaid debt. The library fills before breakfast, group chats become emergency rooms, and every choice you made since arrival suddenly wants to be counted.",
    choices: [
      {
        text: "Go to Professor Lin's office hours and rebuild your study plan. [Academics +, Professor network +]",
        next: "midterm_academic",
        effects: {
          stats: { academics: 16, energy: -3 },
          guanxi: { professors: 10 },
          relationships: { "Professor Lin": { friendship: 6 } },
          flags: { decision_e3_midterm: "Office hours with Professor Lin", route_academic: true }
        }
      },
      {
        text: "Join a local classmate study group and keep up in Chinese. [Chinese +, Local network +]",
        next: "midterm_local_group",
        effects: {
          stats: { chinese: 10, culture: 8, energy: -6 },
          guanxi: { localStudents: 10 },
          flags: { decision_e3_midterm: "Local study group", route_local: true }
        }
      },
      {
        text: "Organize a calm international-student review night. [Energy +, Intl network +]",
        next: "midterm_intl_support",
        effects: {
          stats: { energy: 12, academics: 4 },
          guanxi: { intlStudents: 12 },
          relationships: { Sophie: { friendship: 6 } },
          flags: { decision_e3_midterm: "International review night", route_intl: true }
        }
      },
      {
        text: "Balance coursework with a campus opportunity fair. [Digital +, Career +, Energy -]",
        next: "midterm_opportunity",
        effects: {
          stats: { digitalProficiency: 10, academics: 5, energy: -8 },
          guanxi: { admin: 6 },
          flags: { decision_e3_midterm: "Opportunity fair balance", route_career: true, route_city: true }
        }
      }
    ]
  },

  "midterm_academic": {
    speaker: "Professor Lin",
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Faculty Office",
    text: "Professor Lin turns your marked-up notes sideways, then looks at you over his glasses.\n\nProfessor Lin: 'You are not behind because you are foreign. You are behind because the semester is difficult. That problem has methods.'\n\nYou: 'So I am not uniquely failing?'\n\nProfessor Lin: 'No. But you are uniquely responsible for what you do next.'\n\nHe draws a weekly schedule so strict it almost looks like a second personality.",
    choices: [
      {
        text: "Follow the method and return to the weekly rhythm.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "midterm_local_group": {
    speaker: "Study Group",
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Library Discussion Room",
    text: "The local classmates move quickly, argue over examples, and switch between Chinese and English without warning. You miss some jokes and catch more structure than expected. The room does not become easy. It becomes reachable.",
    choices: [
      {
        text: "Keep studying with them.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "midterm_intl_support": {
    speaker: "Sophie",
    bgImage: '/images/simulator/backgrounds/bg_international_common_room.jpg',
    location: "Dorm Common Room",
    text: "Sophie drops a bag of snacks onto the common-room table like emergency supplies.\n\nSophie: 'Before anyone says they are fine, we are defining fine. Do you mean actually fine, or international-student fine?'\n\nYou: 'The second one.'\n\nSophie: 'Thought so. Open your laptop. I made a shared notes folder.'\n\nThe review night becomes part study session, part proof that nobody is failing alone.",
    choices: [
      {
        text: "Return to the semester with backup.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "midterm_opportunity": {
    speaker: "Campus Opportunity Fair",
    bgImage: '/images/simulator/backgrounds/bg_incubator_room.jpg',
    location: "Student Center",
    text: "Between revision sessions, you collect brochures from labs, companies, student projects, and a startup booth that looks held together by caffeine. Shanghai keeps offering doors. The hard part is choosing which ones are real.",
    choices: [
      {
        text: "Carry the leads back into the weekly rhythm.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "epoch3_internship": {
    speaker: "Future Direction",
    bgImage: '/images/simulator/backgrounds/bg_minghai_gate.jpg',
    location: "Minghai Student Center",
    text: "Week 28 is not a final decision, but it feels like the first draft of one. A professor mentions research assistance. The career office posts legal internship steps. Xiao Chen has a city project idea. Sophie wants help building a guide for new students. Shanghai, unhelpfully, makes all of them sound possible.",
    choices: [
      {
        text: "Apply for a research assistant role with proper approval. [Academics +, Professor network +]",
        next: "future_research",
        effects: {
          stats: { academics: 14, energy: -8, wealth: -100 },
          guanxi: { professors: 12 },
          relationships: { "Professor Lin": { friendship: 8 } },
          flags: { decision_e3_internship: "Approved research assistant path", route_academic: true }
        }
      },
      {
        text: "Work with the career office on a legal internship application. [Digital +, Admin network +]",
        next: "future_career",
        effects: {
          stats: { digitalProficiency: 12, academics: 5, energy: -5 },
          guanxi: { admin: 10 },
          flags: { decision_e3_internship: "Legal internship application", route_career: true }
        }
      },
      {
        text: "Join Xiao Chen's small city-commerce project. [Digital +, Wealth +, Energy -]",
        next: "future_city_project",
        effects: {
          stats: { digitalProficiency: 10, wealth: 800, culture: 5, energy: -12 },
          relationships: { "Xiao Chen": { friendship: 10 } },
          flags: { decision_e3_internship: "Xiao Chen city project", route_city: true }
        }
      },
      {
        text: "Help Sophie build a practical guide for incoming students. [Intl network +, Energy +]",
        next: "future_intl_guide",
        effects: {
          stats: { energy: 10, culture: 5, digitalProficiency: 5 },
          guanxi: { intlStudents: 12 },
          relationships: { Sophie: { friendship: 10 } },
          flags: { decision_e3_internship: "International student guide", route_intl: true }
        }
      },
      {
        text: "Commit to language immersion through a local community project. [Chinese +, Local network +]",
        next: "future_local_project",
        effects: {
          stats: { chinese: 14, culture: 10, energy: -5 },
          guanxi: { localStudents: 12 },
          flags: { decision_e3_internship: "Local community immersion", route_local: true }
        }
      },
      {
        text: "Take unapproved cash work and hope no one asks questions. [Wealth +, Visa risk]",
        next: "future_unapproved_work",
        effects: {
          stats: { wealth: 1500, energy: -12 },
          flags: { decision_e3_internship: "Unapproved cash work", unapproved_work_risk: true, illegal_job: true }
        }
      }
    ]
  },

  "future_research": {
    speaker: "Professor Lin",
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Faculty Office",
    text: "Professor Lin hands you a folder with three pages of instructions and zero romance.\n\nProfessor Lin: 'Research is not glamorous at first. It is showing up when the data is boring.'\n\nYou: 'That sounds like a warning.'\n\nProfessor Lin: 'It is also an invitation. The difference is whether you come back next week.'\n\nFor the first time, the academic route feels less like prestige and more like a discipline you can choose.",
    choices: [
      {
        text: "Accept the slow work and return to campus life.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "future_career": {
    speaker: "Career Office",
    bgImage: '/images/simulator/cg/cg_office_badge.jpg',
    location: "Minghai Career Center",
    text: "The career advisor explains the legal steps twice: permission, documents, university approval, employer confirmation. It is not fast, but it is a path that stays solid in daylight.",
    choices: [
      {
        text: "Keep the application official.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "future_city_project": {
    speaker: "Xiao Chen",
    bgImage: '/images/simulator/backgrounds/bg_incubator_room.jpg',
    location: "Coffee Shop Near Campus",
    text: "Xiao Chen rotates his laptop toward you. The spreadsheet has supplier links, survey notes, and revenue guesses that are either ambitious or legally a weather forecast.\n\nXiao Chen: 'Small test first. Ten users. One problem. No fantasy.'\n\nYou: 'This is your version of being cautious?'\n\nXiao Chen: 'My cautious is still faster than most people's brave.'\n\nFor once, the city feels less like a maze and more like a prototype.",
    choices: [
      {
        text: "Test the idea without betting your whole semester.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "future_intl_guide": {
    speaker: "Sophie",
    bgImage: '/images/simulator/cg/cg_orientation_guide.jpg',
    location: "Dorm Common Room",
    text: "Sophie opens a blank document titled THINGS WE WISH SOMEONE TOLD US.\n\nSophie: 'No inspirational quotes. Only survival-grade information.'\n\nYou: 'Bedding links, office windows, phone plans, how to ask for help before the panic stage?'\n\nSophie: 'Exactly. Practical kindness. With headings.'\n\nThe guide starts as a checklist and turns into something warmer: proof that your confusion can become someone else's shortcut.",
    choices: [
      {
        text: "Publish the guide in the student group.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "future_local_project": {
    speaker: "Community Center",
    bgImage: '/images/simulator/backgrounds/bg_uncle_wang_bbq.jpg',
    location: "Shanghai Neighborhood Center",
    text: "The volunteer coordinator speaks quickly, then slower when she sees your face. Children run between tables, aunties debate schedules, and your Chinese has to become useful instead of impressive.",
    choices: [
      {
        text: "Stay with the project and keep learning.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "future_unapproved_work": {
    speaker: "Inner Voice",
    bgImage: '/images/simulator/backgrounds/bg_shanghai_metro.jpg',
    location: "Shanghai Metro",
    text: "The cash helps immediately. The uncertainty follows you longer. Every message from the university makes your stomach check whether this was bravery, desperation, or just a bad calculation.",
    choices: [
      {
        text: "Keep a low profile and return to campus.",
        action: "advance_turn",
        next: "hub"
      }
    ]
  },

  "epoch3_final": {
    speaker: "Year-End Review",
    bgImage: '/images/simulator/cg/cg_quiet_return.jpg',
    location: "Minghai Campus",
    text: "Week 32. The campus trees have changed color, the canteen workers recognize your face, and your first screenshots from Pudong already look like evidence from another life. Minghai asks for final submissions. Shanghai asks a quieter question: what did you actually become here?",
    choices: [
      {
        text: "Submit the academic portfolio. [Academics +]",
        next: "ending_evaluation",
        effects: {
          stats: { academics: 5 },
          flags: { decision_e3_final: "Academic portfolio" }
        }
      },
      {
        text: "Submit the city project reflection. [Digital +, Culture +]",
        next: "ending_evaluation",
        effects: {
          stats: { digitalProficiency: 5, culture: 5 },
          flags: { decision_e3_final: "City project reflection" }
        }
      },
      {
        text: "Submit the personal learning journal. [Energy +, Culture +]",
        next: "ending_evaluation",
        effects: {
          stats: { energy: 8, culture: 3 },
          flags: { decision_e3_final: "Personal learning journal" }
        }
      }
    ]
  },

  "ending_evaluation": {
    speaker: "System",
    text: "The year does not reduce cleanly to a score. Still, patterns appear: what you protected, what you risked, who helped you, and which version of China you learned to meet.",
    choices: [
      {
        text: "Reveal the visa-risk path.",
        next: "ending_deportee",
        condition: { flags: { unapproved_work_risk: true }, guanxi: { admin: { max: 10 }, professors: { max: 15 } } }
      },
      {
        text: "Reveal the compliance-scare path.",
        next: "ending_compliance_scare",
        condition: { flags: { unapproved_work_risk: true } }
      },
      {
        text: "Reveal the academic probation path.",
        next: "ending_academic_probation",
        condition: { stats: { academics: { max: 25 } }, guanxi: { professors: { max: 15 } } }
      },
      {
        text: "Reveal the shortcut-tax path.",
        next: "ending_career_shortcut",
        condition: { flags: { career_shortcut_temptation: true, career_shortcut_repaired: false }, stats: { digitalProficiency: { min: 45 } } }
      },
      {
        text: "Reveal the unreliable-launch path.",
        next: "ending_unreliable_builder",
        condition: { flags: { city_reliability_debt: true, city_reliability_repaired: false }, stats: { digitalProficiency: { min: 55 } } }
      },
      {
        text: "Reveal the recommendation path.",
        next: "ending_scholar",
        condition: { flags: { lin_recommendation_ready: true }, guanxi: { professors: { min: 35 } }, relationships: { "Professor Lin": { friendship: { min: 25 } } } }
      },
      {
        text: "Reveal the committed research path.",
        next: "ending_researcher",
        condition: { flags: { dr_mei_project_commitment: true }, relationships: { "Dr. Mei": { friendship: { min: 25 } } } }
      },
      {
        text: "Reveal the demo-day path.",
        next: "ending_entrepreneur",
        condition: { flags: { xiao_chen_demo_day: true }, stats: { digitalProficiency: { min: 65 } }, relationships: { "Xiao Chen": { friendship: { min: 25 } } } }
      },
      {
        text: "Reveal the referral path.",
        next: "ending_diplomat",
        condition: { flags: { manager_zhang_referral_ready: true }, stats: { culture: { min: 50 }, digitalProficiency: { min: 50 } }, relationships: { "Manager Zhang": { friendship: { min: 25 } } } }
      },
      {
        text: "Reveal the orientation-builder path.",
        next: "ending_influencer",
        condition: { flags: { sophie_orientation_committee: true }, guanxi: { intlStudents: { min: 35 } }, relationships: { Sophie: { friendship: { min: 25 } } } }
      },
      {
        text: "Reveal the neighborhood festival path.",
        next: "ending_local_insider",
        condition: { flags: { neighbor_li_festival_invite: true }, stats: { culture: { min: 60 }, chinese: { min: 40 } }, relationships: { "Neighbor Li": { friendship: { min: 25 } } } }
      },
      {
        text: "Reveal the neighborhood regular path.",
        next: "ending_local_insider",
        condition: { flags: { uncle_wang_regular: true }, stats: { culture: { min: 60 }, chinese: { min: 40 } }, relationships: { "Uncle Wang": { friendship: { min: 25 } } } }
      },
      {
        text: "Reveal the academic path.",
        next: "ending_scholar",
        condition: { stats: { academics: { min: 85 } }, guanxi: { professors: { min: 25 } }, relationships: { "Professor Lin": { friendship: { min: 12 } } } }
      },
      {
        text: "Reveal the research path through Professor Lin.",
        next: "ending_researcher",
        condition: { flags: { lin_academic_method: true }, guanxi: { professors: { min: 35 } } }
      },
      {
        text: "Reveal the research path through Dr. Mei.",
        next: "ending_researcher",
        condition: { flags: { dr_mei_project_trust: true }, relationships: { "Dr. Mei": { friendship: { min: 18 } } } }
      },
      {
        text: "Reveal the Shanghai opportunity path.",
        next: "ending_entrepreneur",
        condition: { flags: { xiao_chen_city_prototype: true }, stats: { digitalProficiency: { min: 55 } }, relationships: { "Xiao Chen": { friendship: { min: 18 } } } }
      },
      {
        text: "Reveal the career bridge path.",
        next: "ending_diplomat",
        condition: { flags: { manager_zhang_career_trust: true }, stats: { culture: { min: 45 }, digitalProficiency: { min: 45 } }, relationships: { "Manager Zhang": { friendship: { min: 18 } } } }
      },
      {
        text: "Reveal the international-student mirror path.",
        next: "ending_influencer",
        condition: { flags: { sophie_support_circle: true }, guanxi: { intlStudents: { min: 25 } }, relationships: { Sophie: { friendship: { min: 18 } } } }
      },
      {
        text: "Reveal the language breakthrough path.",
        next: "ending_hsk_master",
        condition: { stats: { chinese: { min: 75 } } }
      },
      {
        text: "Reveal the local belonging path through Neighbor Li.",
        next: "ending_local_insider",
        condition: { flags: { neighbor_li_local_trust: true }, stats: { culture: { min: 55 }, chinese: { min: 35 } }, guanxi: { localStudents: { min: 25 } }, relationships: { "Neighbor Li": { friendship: { min: 18 } } } }
      },
      {
        text: "Reveal the local belonging path through Uncle Wang.",
        next: "ending_local_insider",
        condition: { flags: { uncle_wang_neighborhood_story: true }, stats: { culture: { min: 55 }, chinese: { min: 35 } }, relationships: { "Uncle Wang": { friendship: { min: 18 } } } }
      },
      {
        text: "Reveal the broad academic path.",
        next: "ending_scholar",
        condition: { stats: { academics: { min: 90 } }, guanxi: { professors: { min: 45 } } }
      },
      {
        text: "Reveal the broad city opportunity path.",
        next: "ending_entrepreneur",
        condition: { flags: { route_city: true }, stats: { digitalProficiency: { min: 70 }, wealth: { min: 800 } } }
      },
      {
        text: "Reveal the broad career bridge path.",
        next: "ending_diplomat",
        condition: { flags: { route_career: true }, stats: { culture: { min: 55 }, digitalProficiency: { min: 55 } } }
      },
      {
        text: "Reveal the broad student voice path.",
        next: "ending_influencer",
        condition: { flags: { route_intl: true }, guanxi: { intlStudents: { min: 40 } } }
      },
      {
        text: "Reveal the broad local belonging path.",
        next: "ending_local_insider",
        condition: { flags: { route_local: true }, stats: { culture: { min: 70 }, chinese: { min: 45 } }, guanxi: { localStudents: { min: 35 } } }
      },
      {
        text: "Reveal the ordinary but complete path.",
        next: "ending_quiet_return"
      }
    ]
  },

  "ending_scholar": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_scholar.png',
    text: "ENDING: The Minghai Scholar.\n\nProfessor Lin does not smile when he hands you the sealed recommendation. That would make it too easy.\n\nProfessor Lin: 'You still overwrite your first paragraph.'\n\nYou: 'That is the feedback?'\n\nProfessor Lin: 'No. The feedback is that I sent your portfolio to the summer research committee.'\n\nFor a second the office loses sound: traffic outside, paper under your hand, your own breath arriving late.\n\nProfessor Lin: 'You learned how to think under pressure. Do not waste that by only looking for approval.'\n\nYour final portfolio is passed from one professor to another until your name appears on the department's honors shortlist. The year ends with a red-stamped form, a new academic path, and the strange realization that China was not a detour. It was the door.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_entrepreneur": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_entrepreneur.png',
    text: "ENDING: The Shanghai Builder.\n\nXiao Chen refreshes the dashboard so many times the browser starts looking tired.\n\nXiao Chen: 'Three hundred users. Not installs. Users.'\n\nYou: 'The refund button still looks terrifying.'\n\nXiao Chen: 'Good. Fear means we are alive.'\n\nAt demo day, he talks too fast until you touch the laptop and slow the room down with the numbers users actually care about: late fees avoided, dorm errands solved, support tickets answered.\n\nXiao Chen: 'Say the part about trust.'\n\nYou do. The room changes.\n\nOne angel investor does not offer a fantasy empire; she offers something better: the first check, a three-month runway, and a reason to stay in Shanghai long enough to find out what this can become.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_diplomat": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_diplomat.png',
    text: "ENDING: The Career Bridge.\n\nManager Zhang checks your badge, then your shoes, then the timestamp on the approval email.\n\nManager Zhang: 'Good. Legal first. Ambition second.'\n\nYou: 'That sounds like a warning.'\n\nManager Zhang: 'It is a compliment. You listened before you moved.'\n\nThe first meeting is bilingual and too fast. He lets you answer one practical question, then another. Nobody applauds. The spreadsheet simply keeps moving because your answer worked.\n\nManager Zhang: 'Useful beats impressive.'\n\nMonths later, the internship ends with a full-time return offer, a manager who trusts you in complicated rooms, and the strange thrill of realizing your China year has become a career bridge people can actually cross.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_influencer": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_influencer.png',
    text: "ENDING: The Student Voice.\n\nSophie sends you a screenshot from orientation. Your guide is on the projector. Your typo is also on the projector.\n\nSophie: 'Congratulations. You are now institutional knowledge with bad punctuation.'\n\nYou: 'Please tell me they fixed the typo.'\n\nSophie: 'No. It makes you approachable.'\n\nNew students laugh before they panic. Someone asks the exact question you were once ashamed to ask, and Sophie points them to the section you wrote at 2 a.m. after getting lost near the wrong gate.\n\nSophie: 'See? International-student okay became actually okay.'\n\nYou never became a flawless model student; you became something more useful, the person who turned confusion into a map.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_quiet_return": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_quiet_return.png',
    text: "ENDING: The Quiet Transformation.\n\nAt the airport, your family asks the impossible question too soon.\n\nFamily: 'So. How was China?'\n\nYou look at the suitcase: receipts, metro cards, saved screenshots, half-understood jokes, and one tiny packet of snacks you forgot to eat.\n\nYou: 'I do not know how to make it short yet.'\n\nFamily: 'Then do not make it short.'\n\nNo trophy waits at the gate. No dramatic headline explains what happened to you. But the version of yourself that leaves Minghai is not the one who arrived. When people ask again, you realize the answer is no longer a story. It is an archive.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_researcher": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_researcher.png',
    text: "ENDING: The Research Apprentice.\n\nDr. Mei adjusts one sticky note on the poster, then steps back like the whole year depends on three centimeters.\n\nDr. Mei: 'What is the weakest part of your argument?'\n\nYou: 'You ask that five minutes before the forum?'\n\nDr. Mei: 'Especially five minutes before the forum.'\n\nYou answer honestly. She nods, not because the answer is perfect, but because you finally stop hiding uncertainty like a stain.\n\nDr. Mei: 'Good. Now you sound like someone doing research.'\n\nYour name appears in the acknowledgements of a project you once barely understood. The applause is brief. The aftershock is not. A professor trusts you with work that matters, and you are no longer just studying China from the outside.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_local_insider": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_local_insider.png',
    text: "ENDING: The Local Regular.\n\nUncle Wang starts your order before you reach the plastic stool.\n\nYou: 'I did not say anything yet.'\n\nUncle Wang: 'You were going to say the same thing.'\n\nNeighbor Li drops a festival-cleanup list onto the table and taps your name already written near the top.\n\nNeighbor Li: 'Do not look so honored. You are carrying boxes.'\n\nYou are not 'basically local,' and the game refuses that easy lie. But someone in the group chat calls you when a foreign student needs help finding the right gate. Shanghai is no longer a backdrop. It is a set of people who notice when you are missing.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_hsk_master": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_hsk_master.png',
    text: "ENDING: The Language Breakthrough.\n\nThe score report arrives first, clean and official. Neighbor Li cares less about the number than your next sentence.\n\nNeighbor Li: 'Say the joke again. Slower.'\n\nYou try. The timing lands this time. People laugh in the right place, not because they are being kind, but because the joke actually works.\n\nYou: 'That counted?'\n\nNeighbor Li: 'That counted more than the certificate.'\n\nFor the first time, Chinese is not a wall you climb with flashcards. It is a room you enter, rearrange, and somehow make your own.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_compliance_scare": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_compliance_scare.png',
    text: "ENDING: The Compliance Scare.\n\nManager Zhang reads the notice twice before speaking.\n\nManager Zhang: 'This is fixable because you stopped early. Do you understand the difference?'\n\nYou: 'Fixable is not the same as fine.'\n\nManager Zhang: 'Good. Write that feeling into the explanation letter.'\n\nThe meeting with the international office is quiet, which somehow makes it worse. Nobody destroys your year. They hand you forms, deadlines, and one very serious reminder.\n\nManager Zhang: 'In China, paperwork is not background noise.'\n\nYou stay at Minghai because someone helped you correct course in time. The victory is quieter than a trophy: you learn that the road has rules even when nobody is shouting.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_career_shortcut": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_career_shortcut.png',
    text: "ENDING: The Shortcut Tax.\n\nManager Zhang does not scold you. He opens the email thread and lets the silence do most of the work.\n\nManager Zhang: 'What did you ask for?'\n\nYou: 'An introduction.'\n\nManager Zhang: 'No. You asked for trust before showing judgment.'\n\nThe fastest introductions leave fingerprints. One promising conversation becomes a polite noncommittal email. Your resume still improves, but the room cools around you.\n\nManager Zhang: 'Networks are not elevators. Stop pressing buttons.'\n\nBy the end, you have a sharper resume and a harder lesson: relationship networks can open doors, but if people suspect you are only looking for doors, they stop inviting you into rooms.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_unreliable_builder": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_unreliable_builder.png',
    text: "ENDING: The Unstable Launch.\n\nXiao Chen scrolls through the complaint screenshots without making jokes.\n\nXiao Chen: 'They are using it enough to hate it.'\n\nYou: 'That is not a pitch deck.'\n\nXiao Chen: 'No. It is better. It is evidence.'\n\nMinghai's incubator still invites you to talk, partly because the idea is useful and partly because the failure is educational. You do not get the clean angel-check moment this time.\n\nXiao Chen: 'Next version, slower.'\n\nYou get something less glamorous and more valuable: users who tell you exactly why trust is harder to build than traffic.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_deportee": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_deportee.png',
    text: "ENDING: The Visa Line You Crossed.\n\nSophie waits outside the office because she has already guessed too much from your messages.\n\nSophie: 'How bad?'\n\nYou: 'Flight-home bad.'\n\nShe does not offer a speech. That would make the hallway feel fake.\n\nSophie: 'Do you need help packing, or do you need someone to sit here first?'\n\nThe money solved one problem and created a larger one: screenshots, transfers, a job that was never properly approved. Your flight home is not cinematic. That is what makes it brutal. Every shortcut becomes paperwork eventually.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "ending_academic_probation": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_ending_academic_probation.png',
    text: "ENDING: Academic Probation.\n\nProfessor Lin places the warning letter beside your draft instead of on top of it.\n\nProfessor Lin: 'This is not the end. It is also not a metaphor.'\n\nYou: 'What is it?'\n\nProfessor Lin: 'A schedule. Retakes, attendance checks, advising. You will hate how practical recovery is.'\n\nThe warning arrives with polite language and a very sharp consequence: scholarship review, mandatory advising, and a transcript that no longer lets you pretend the semester was only 'difficult.' Minghai gives you one narrow path to continue, paved with the uncomfortable knowledge that opportunity can be lost quietly.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  },

  "forced_recovery_week": {
    speaker: "Campus Clinic",
    bgImage: '/images/simulator/backgrounds/bg_campus_clinic.jpg',
    location: "Minghai Campus",
    text: "Your energy hits zero, and the week is taken out of your hands. The campus clinic tells you to rest. Your advisor tells you to email your professors. Your phone keeps glowing with things you are missing. This is not the end of your China year, but it is a forced pause, and the world does not pause with you.",
    choices: [
      {
        text: "Take the recovery week and rebuild slowly. [Energy restored, Academics -, Networks -]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 70, academics: -8, wealth: -200 },
          guanxi: { professors: -4, localStudents: -3, intlStudents: -3 },
          flags: { forced_recovery_used: true, weekly_focus: "Forced recovery week" },
          lifeCheck: {
            id: "forced_recovery_rebuild",
            label: "Forced Recovery Rebuild",
            route: "Survival",
            tags: ["survival", "social", "academic"],
            stats: { energy: 0.18, culture: 0.12, digitalProficiency: 0.08 },
            guanxi: { professors: 0.15, intlStudents: 0.12, localStudents: 0.12 },
            routes: { survival: 1.2 },
            dc: 12,
            success: {
              message: "The forced pause costs you a week, but your support systems keep it from becoming a collapse.",
              stats: { energy: 5 },
              flags: { recovery_week_stabilized: true }
            },
            failure: {
              message: "You recover physically, but the missed messages and delayed work leave a bruise the semester will remember.",
              stats: { academics: -3 },
              flags: { recovery_week_scar: true }
            }
          }
        }
      }
    ]
  },

  "academic_crisis": {
    speaker: "Academic Advisor",
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Minghai Advising Office",
    text: "The warning is not a dramatic failure screen. It is an appointment. Your grades are low enough that the advisor stops using comforting language and starts using verbs: attend, document, repair, ask. The semester is not over, but it is no longer pretending you can drift through it.",
    choices: [
      {
        text: "Ask Professor Lin for a recovery plan. [Academics +, Professor bond +, Energy -]",
        next: "hub",
        effects: {
          stats: { academics: 18, energy: -10 },
          guanxi: { professors: 8 },
          relationships: { "Professor Lin": { friendship: 8 } },
          flags: { academic_crisis_used: true, academic_recovery_plan: true, route_academic: true, weekly_focus: "Academic recovery plan" },
          lifeCheck: {
            id: "academic_recovery_plan",
            label: "Academic Recovery Plan",
            route: "Academic",
            tags: ["academic", "recovery"],
            stats: { academics: 0.28, energy: 0.08 },
            guanxi: { professors: 0.3 },
            routes: { academic: 1.2 },
            character: "Professor Lin",
            relationshipWeight: 0.25,
            dc: 13,
            success: {
              message: "Professor Lin's recovery plan gives the crisis a shape: attendance, drafts, and one repairable week at a time.",
              stats: { academics: 4 },
              flags: { academic_recovery_check_passed: true }
            },
            failure: {
              message: "The plan exists, but your margin is thin. One more bad week could turn repair into probation.",
              stats: { energy: -3 },
              flags: { academic_recovery_check_strained: true }
            }
          }
        }
      },
      {
        text: "Cut social plans and rebuild through retakes. [Academics +, Networks -]",
        next: "hub",
        effects: {
          stats: { academics: 16, energy: -4 },
          guanxi: { intlStudents: -5, localStudents: -5 },
          flags: { academic_crisis_used: true, retake_grind: true, weekly_focus: "Retake grind" },
          lifeCheck: {
            id: "retake_grind",
            label: "Retake Grind",
            route: "Academic",
            tags: ["academic", "survival"],
            stats: { academics: 0.32, energy: 0.05 },
            routes: { academic: 1, survival: 0.8 },
            dc: 12,
            success: {
              message: "The grind is lonely, but it stops the transcript from becoming the whole story.",
              stats: { academics: 3 },
              flags: { retake_grind_stabilized: true }
            },
            failure: {
              message: "You gain points and lose texture. The grade recovers faster than your life does.",
              stats: { energy: -4 },
              flags: { retake_grind_social_scar: true }
            }
          }
        }
      }
    ]
  },

  "delayed_phone_payment_friction": {
    speaker: "Phone Counter",
    bgImage: '/images/simulator/backgrounds/bg_phone_network_problem.jpg',
    location: "Campus Mobile Shop",
    text: "The choice to leave phone setup for later comes back with fluorescent lighting. The clerk needs one verification, then another. The translation app stalls. A line forms behind you. This is not a catastrophe; it is the exact kind of small friction that turns arrival into exhaustion.",
    choices: [
      {
        text: "Finish WeChat, Alipay, and DiDi setup the hard way. [Digital +, Energy -]",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 9, energy: -10, wealth: -60 },
          flags: { has_wechat: true, has_alipay: true, has_didi: true, delayed_phone_payment_friction_seen: true, first_delayed_consequence_seen: true, adaptation_information_overload: true, weekly_focus: "Phone setup friction" }
        }
      }
    ]
  },

  "delayed_language_anxiety": {
    speaker: "Canteen Window",
    bgImage: '/images/simulator/backgrounds/bg_canteen_counter.jpg',
    location: "Minghai Canteen",
    text: "The auntie asks a simple follow-up question. You know it is simple because everyone behind you understands it. That makes it worse. For three seconds, language is not vocabulary. It is heat in your face, people waiting, and the ugly wish to disappear.",
    choices: [
      {
        text: "Ask her to repeat it and survive the embarrassment. [Chinese +, Culture +]",
        next: "hub",
        effects: {
          stats: { chinese: 12, culture: 6, energy: -5 },
          flags: { delayed_language_anxiety_seen: true, adaptation_language_anxiety: true, adaptation_first_independent_solution: true, weekly_focus: "Language anxiety breakthrough" }
        }
      },
      {
        text: "Switch to pointing and promise to study later. [Energy +, Chinese -]",
        next: "hub",
        effects: {
          stats: { energy: 4, chinese: -3 },
          flags: { delayed_language_anxiety_seen: true, adaptation_language_anxiety: true, language_avoidance_debt: true, weekly_focus: "Language avoidance debt" }
        }
      }
    ]
  },

  "delayed_housing_compromise": {
    speaker: "Housing Reality",
    bgImage: '/images/simulator/cg/cg_housing_shared_flat_first_night.png',
    location: "Minghai Dorm District",
    text: "The cheap or unfinished housing choice stops being a line item and becomes mornings: bad sleep, a longer walk, roommate noise, one missing thing you should have bought sooner. Housing is not background. It is the machine that prints your energy every week.",
    choices: [
      {
        text: "Pay for the missing basics and protect the semester. [Wealth -, Energy +]",
        next: "hub",
        effects: {
          stats: { wealth: -360, energy: 14, culture: 2 },
          flags: { delayed_housing_compromise_seen: true, housing_friction_repaired: true, weekly_focus: "Housing compromise repaired" }
        }
      },
      {
        text: "Accept the compromise and build a cheaper routine. [Survival route]",
        next: "hub",
        effects: {
          stats: { wealth: 160, energy: -4, digitalProficiency: 3 },
          flags: { delayed_housing_compromise_seen: true, housing_energy_scar: true, weekly_focus: "Cheap housing compromise" }
        }
      }
    ]
  },

  "delayed_dorm_auntie_help": {
    speaker: "Dorm Auntie",
    bgImage: '/images/simulator/cg/cg_dorm_auntie_parcel_help.jpg',
    location: "Dorm Parcel Shelf",
    text: "A document packet arrives while you are trapped across campus. You expect trouble. Instead, the dorm auntie remembers you from the parcel errand, waves away the panic, and keeps it safe behind the desk. One small kindness from weeks ago returns with a stamp on it.",
    choices: [
      {
        text: "Thank her properly and stop treating errands as background. [Culture +, Admin safety +]",
        next: "hub",
        effects: {
          stats: { culture: 6, energy: 5 },
          guanxi: { localStudents: 5, admin: 3 },
          flags: { delayed_dorm_auntie_help_seen: true, adaptation_life_rhythm: true, weekly_focus: "Dorm auntie helped with parcel" }
        }
      }
    ]
  },

  "delayed_calendar_focus_payoff": {
    speaker: "Calendar Reminder",
    bgImage: '/images/simulator/cg/cg_calendar_midterm_warning.png',
    location: "SimPad Calendar",
    text: "The pinned reminder returns at exactly the right moment. Not dramatically. Usefully. A deadline that would have arrived as a slap now arrives as a checklist: documents already grouped, reading already started, next office window already saved. Future-you is briefly, sincerely grateful.",
    choices: [
      {
        text: "Let planning become part of the weekly rhythm. [Academics +, Energy +]",
        next: "hub",
        effects: {
          stats: { academics: 6, energy: 4, digitalProficiency: 2 },
          flags: { delayed_calendar_focus_seen: true, adaptation_life_rhythm: true, weekly_focus: "Calendar focus paid off" }
        }
      }
    ]
  },

  "delayed_wechat_silence": {
    speaker: "WeChat",
    bgImage: '/images/simulator/backgrounds/bg_phone_network_problem.jpg',
    location: "Dorm Room",
    text: "Two quiet weeks do not break a friendship. They change its temperature. A message thread you meant to answer slides lower. Someone stops assuming you are available. The phone does not punish you with a warning label. It simply shows how relationships become easier to lose when they live behind tiny red dots.",
    choices: [
      {
        text: "Send honest catch-up messages instead of pretending nothing happened. [Relationships repaired, Energy -]",
        next: "hub",
        effects: {
          stats: { energy: -3, chinese: 2 },
          relationships: { Sophie: { friendship: 2 }, "Neighbor Li": { friendship: 2 }, "Xiao Chen": { friendship: 2 } },
          flags: { delayed_wechat_silence_seen: true, wechat_silence_consequence_ready: false, wechat_repair_messages_sent: true, weekly_focus: "WeChat relationship repair" }
        }
      }
    ]
  },

  "delayed_didi_pickup_confusion": {
    speaker: "DiDi App",
    bgImage: '/images/simulator/cg/cg_didi_pickup_zone_confusion.png',
    location: "Campus East Gate",
    text: "The ride is called. The car is close. You are not. Shanghai offers three gates, two identical convenience stores, one driver speaking quickly, and a map pin that insists it is correct while your feet disagree. The fare is not the lesson. The pickup zone is.",
    choices: [
      {
        text: "Save the correct pickup points and stop trusting the pin alone. [Digital +, Energy -]",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 7, energy: -3, culture: 2 },
          flags: { delayed_didi_pickup_confusion_seen: true, didi_pickup_friction_ready: false, didi_pickup_points_saved: true, weekly_focus: "DiDi pickup-zone lesson" }
        }
      }
    ]
  },

  "delayed_taobao_wrong_address": {
    speaker: "Courier Call",
    bgImage: '/images/simulator/cg/cg_taobao_wrong_address.png',
    location: "Dorm Parcel Shelf",
    text: "The courier calls while you are between classes. You understand only half the sentence, but the half you understand is enough: wrong gate, wrong shelf, wrong assumption. The order is small. The lesson is not. Taobao is not only buying things; it is maintaining an address in motion.",
    choices: [
      {
        text: "Fix the address template and write a better courier note. [Digital +, Chinese +]",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 6, chinese: 3, energy: -2 },
          guanxi: { localStudents: 2 },
          flags: { delayed_taobao_wrong_address_seen: true, taobao_address_template_fixed: true, weekly_focus: "Taobao address repair" }
        }
      }
    ]
  },

  "money_crisis": {
    speaker: "Minghai Finance Office",
    bgImage: '/images/simulator/cg/cg_money_crisis.jpg',
    location: "Minghai Campus",
    text: "Your balance hits zero at the worst possible time: rent reminder, meal card warning, metro fare, document fee. For one awful morning, Shanghai turns into a city of locked gates. Then three messages arrive almost at once: a family transfer offer, a Minghai emergency bursary appointment, and Sophie forwarding a student mutual-aid spreadsheet titled DO NOT PANIC FUND.",
    choices: [
      {
        text: "Accept the family emergency transfer. [Wealth +, Family bond +, One-time rescue]",
        next: "hub",
        effects: {
          stats: { wealth: 3200, energy: 8 },
          relationships: { Family: { friendship: 8 } },
          flags: { emergency_funding_used: true, emergency_funding_source: "Family transfer", weekly_focus: "Financial rescue: family transfer" },
          lifeCheck: {
            id: "family_transfer_recovery",
            label: "Family Transfer Recovery",
            route: "Survival",
            tags: ["survival", "social"],
            stats: { energy: 0.12, digitalProficiency: 0.08 },
            routes: { survival: 1.2 },
            dc: 10,
            success: {
              message: "The money arrives with guilt attached, but it gives the year enough oxygen to continue.",
              stats: { energy: 2 },
              flags: { money_recovery_stabilized: true }
            },
            failure: {
              message: "The transfer saves the week and tightens something at home. The rescue is real; so is the pressure.",
              stats: { energy: -2 },
              flags: { family_transfer_pressure: true }
            }
          }
        }
      },
      {
        text: "Apply for Minghai's hardship bursary. [Wealth +, Admin network +, Energy -]",
        next: "hub",
        effects: {
          stats: { wealth: 2600, digitalProficiency: 4, energy: -6 },
          guanxi: { admin: 10 },
          flags: { emergency_funding_used: true, emergency_funding_source: "Minghai hardship bursary", weekly_focus: "Financial rescue: hardship bursary" },
          lifeCheck: {
            id: "hardship_bursary_recovery",
            label: "Hardship Bursary Recovery",
            route: "Survival",
            tags: ["survival", "admin"],
            stats: { digitalProficiency: 0.3, culture: 0.12, energy: 0.05 },
            guanxi: { admin: 0.35 },
            routes: { survival: 1.2 },
            dc: 12,
            success: {
              message: "Your paperwork turns vulnerability into an approved process instead of a private disaster.",
              stats: { digitalProficiency: 2 },
              flags: { bursary_recovery_stabilized: true, money_recovery_stabilized: true }
            },
            failure: {
              message: "The bursary helps, but the appointment leaves you aware of how thin the margin still is.",
              stats: { energy: -3 },
              flags: { bursary_recovery_scar: true }
            }
          }
        }
      },
      {
        text: "Let the international student network catch you. [Wealth +, Intl network +]",
        condition: { guanxi: { intlStudents: { min: 15 } } },
        next: "hub",
        effects: {
          stats: { wealth: 2200, energy: 6 },
          guanxi: { intlStudents: 10 },
          relationships: { Sophie: { friendship: 6 } },
          flags: { emergency_funding_used: true, emergency_funding_source: "International student mutual aid", weekly_focus: "Financial rescue: mutual aid" },
          lifeCheck: {
            id: "mutual_aid_recovery",
            label: "Mutual-Aid Recovery",
            route: "International",
            tags: ["survival", "social", "intl"],
            stats: { culture: 0.16, energy: 0.08 },
            guanxi: { intlStudents: 0.35 },
            routes: { intl: 1, survival: 0.8 },
            character: "Sophie",
            relationshipWeight: 0.25,
            dc: 12,
            success: {
              message: "Letting people help you becomes part of the support circle instead of a private humiliation.",
              stats: { energy: 3 },
              flags: { mutual_aid_recovery_stabilized: true, money_recovery_stabilized: true }
            },
            failure: {
              message: "The network catches you, but needing it costs more pride than you expected.",
              stats: { energy: -2 },
              flags: { mutual_aid_recovery_scar: true }
            }
          }
        }
      }
    ]
  },

  "game_over_wealth": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_money_crisis.jpg',
    text: "ENDING: Out of Money. The emergency rescue already happened once. This time, the numbers do not bend: dorm balance, meal card, metro fare, document fee, every small cost turning into a locked gate. Minghai gives you the kindest version of a hard answer, and your China year ends before the story is ready. The lesson is brutal but useful: dreams need paperwork, and paperwork needs money.",
    choices: [{ text: "Start Over", action: "reset_game", next: "start" }]
  }
};
