export const epoch2Events = {
  "pre_departure_start": {
    speaker: "Departure Eve",
    bgImage: '/images/simulator/backgrounds/bg_departure_eve_room.jpg',
    location: "Home Country",
    text: "The memory shifts from the acceptance email to the weeks after it. Minghai's admission package arrived with an official letter, a study visa form everyone in the group chat called \"JW202\", and instructions that somehow sounded calm while changing your entire summer.",
    choices: [
      {
        text: "Open the admission package again.",
        next: "e2_w9_package"
      }
    ]
  },

  "e2_w9_package": {
    speaker: "Admission Package",
    bgImage: '/images/simulator/cg/cg_document_stack_jw202.jpg',
    location: "Home Country",
    text: "The package contains your Admission Letter, the Visa Application for Study in China form, health-check instructions, dorm notices, and a page of official English that keeps using the word 'promptly' like a threat. This is not the application anymore. This is the part where the future starts asking for receipts.",
    choices: [
      {
        text: "Build a careful document system. [Digital +, Energy -]",
        next: "e2_w9_checklist",
        effects: {
          stats: { digitalProficiency: 5, energy: -5 },
          flags: { decision_e2_package: "Careful document system", jw202_understood: true, document_binder_ready: true }
        }
      },
      {
        text: "Ask the Minghai international group what actually matters. [Intl network +]",
        next: "e2_w9_checklist",
        effects: {
          stats: { digitalProficiency: 2 },
          guanxi: { intlStudents: 5 },
          flags: { decision_e2_package: "Student-group guidance", jw202_understood: true, intl_group_active: true }
        }
      },
      {
        text: "Email the Global Education Office before guessing. [Admin network +, Energy -]",
        next: "e2_w9_checklist",
        effects: {
          stats: { energy: -3 },
          guanxi: { admin: 6 },
          flags: { decision_e2_package: "Admin-confirmed documents", jw202_understood: true, admin_contacted_predeparture: true }
        }
      }
    ]
  },

  "e2_w9_checklist": {
    speaker: "Checklist",
    bgImage: '/images/simulator/cg/cg_document_stack_jw202.jpg',
    location: "Home Country",
    text: "By midnight, your desk has become a small embassy: passport, admission letter, visa form, physical exam record, copies, photos, copies of photos, and one sticky note that says DO NOT LOSE THIS in handwriting that looks personally betrayed.",
    choices: [
      {
        text: "Continue to Week 10: the X1 visa appointment.",
        action: "advance_turn",
        next: "e2_w10_visa_queue",
        effects: {
          stats: { energy: -1 },
          flags: { admission_package_ready: true }
        }
      }
    ]
  },

  "e2_w10_visa_queue": {
    speaker: "Chinese Visa Application Service Center",
    bgImage: '/images/simulator/backgrounds/bg_visa_center.jpg',
    location: "Home Country",
    text: "The visa center does not care that your future depends on this appointment. It cares about passports, copies, photos, the admission letter, the study visa form, and whether the person at the window can find everything before lunch.",
    minigame: "visa",
    onWin: "e2_w10_visa_clean",
    onLose: "e2_w10_visa_problem"
  },

  "e2_w10_visa_clean": {
    speaker: "Visa Center Clerk",
    bgImage: '/images/simulator/backgrounds/bg_visa_center.jpg',
    location: "Home Country",
    text: "The clerk flips through your documents, stamps one page, and takes your passport. 'Come back in four working days.' It is the least emotional sentence anyone has ever said while approving the next year of your life.",
    choices: [
      {
        text: "Pick up the X1 visa and keep moving. [Digital +, Energy -]",
        action: "advance_turn",
        next: "e2_w11_digital_access",
        effects: {
          stats: { digitalProficiency: 5, energy: -3 },
          flags: { got_visa: true, visa_ready: true, decision_e2_visa: "Approved on first appointment" },
          lifeCheck: {
            id: "visa_document_stack",
            label: "X1 Visa Document Stack",
            route: "Admin",
            tags: ["admin", "visa"],
            stats: { digitalProficiency: 0.55, energy: 0.08 },
            dc: 9,
            success: {
              message: "The copies, screenshots, and document order make the appointment feel bureaucratic instead of catastrophic.",
              stats: { energy: 2, digitalProficiency: 1 },
              flags: { visa_document_stack_clean: true }
            },
            failure: {
              message: "You still get through, but one missing detail teaches you that paperwork has its own memory.",
              stats: { energy: -3 },
              flags: { visa_document_stack_strained: true }
            }
          }
        }
      }
    ]
  },

  "e2_w10_visa_problem": {
    speaker: "Visa Center Clerk",
    bgImage: '/images/simulator/backgrounds/bg_visa_center.jpg',
    location: "Home Country",
    text: "The clerk pauses at one page. Your stomach knows before your brain does. One copy is missing, and the print shop next door has a line of people wearing the same expression: almost done, apparently not done at all.",
    choices: [
      {
        text: "Fix the copy problem, pay the fee, and return to the window. [Wealth -, Energy -]",
        action: "advance_turn",
        next: "e2_w11_digital_access",
        effects: {
          stats: { wealth: -120, energy: -15, digitalProficiency: 3 },
          flags: { got_visa: true, visa_ready: true, decision_e2_visa: "Approved after document correction", visa_copy_lesson: true },
          lifeCheck: {
            id: "visa_document_recovery",
            label: "Visa Document Recovery",
            route: "Admin",
            tags: ["admin", "visa"],
            stats: { digitalProficiency: 0.5, energy: 0.05 },
            dc: 10,
            success: {
              message: "The correction is annoying, not disastrous. Your document system absorbs the hit.",
              stats: { digitalProficiency: 2 },
              flags: { visa_recovery_composed: true }
            },
            failure: {
              message: "The correction costs more energy than money. You get the visa, but the lesson follows you to Shanghai.",
              stats: { energy: -4 },
              flags: { visa_recovery_scar: true }
            }
          }
        }
      }
    ]
  },

  "e2_w11_digital_access": {
    speaker: "Laptop Glow",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "The student group chat splits into three arguments at once: which VPN still works, whether foreign cards connect to Alipay, and whether WeChat verification is a myth designed to test the sincerity of international students.",
    choices: [
      {
        text: "Research a reliable access setup instead of buying the loudest ad. [Digital +, Wealth -, Energy -]",
        next: "e2_w11_phone_payment",
        effects: {
          stats: { digitalProficiency: 10, wealth: -180, energy: -3 },
          flags: { has_vpn: true, decision_e2_vpn: "Reliable access setup" }
        }
      },
      {
        text: "Ask senior students what actually works this month. [Intl network +, Digital +]",
        next: "e2_w11_phone_payment",
        effects: {
          stats: { digitalProficiency: 5, wealth: -80 },
          guanxi: { intlStudents: 8 },
          relationships: { Sophie: { friendship: 4 } },
          flags: { has_vpn: true, decision_e2_vpn: "Senior-tested access setup", met_sophie_online: true }
        }
      },
      {
        text: "Prepare to live mostly inside China's app ecosystem. [Culture +, Energy +]",
        next: "e2_w11_phone_payment",
        effects: {
          stats: { culture: 8, digitalProficiency: 2, energy: 5 },
          flags: { has_vpn: false, decision_e2_vpn: "China-first app routine" }
        }
      }
    ]
  },

  "e2_w11_phone_payment": {
    speaker: "Phone Screen",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "This week is not about choosing your airport ride yet. It is about whether your phone can become a key before the door is in front of you: WeChat, Alipay, maps, airport Wi-Fi, translation, campus QR codes, and the ride-hailing app everyone keeps mentioning like a spell.",
    choices: [
      {
        text: "Link a foreign card to Alipay and verify WeChat now. [Digital +, Energy -, Wealth -]",
        next: "e2_w11_digital_done",
        effects: {
          stats: { digitalProficiency: 8, energy: -3, wealth: -30 },
          flags: { has_wechat: true, has_alipay: true, has_didi: true, decision_e2_wechat: "Linked before arrival" }
        }
      },
      {
        text: "Ask a senior to walk you through screenshots step by step. [Intl network +]",
        next: "e2_w11_digital_done",
        effects: {
          stats: { digitalProficiency: 5, energy: -2 },
          guanxi: { intlStudents: 6 },
          relationships: { Sophie: { friendship: 5 } },
          flags: { has_wechat: true, has_alipay: true, has_didi: true, decision_e2_wechat: "Senior-assisted setup", met_sophie_online: true }
        }
      },
      {
        text: "Save the instructions and plan to finish setup after dorm check-in. [Energy +]",
        next: "e2_w11_digital_done",
        effects: {
          stats: { energy: 5 },
          flags: { has_wechat: false, has_alipay: false, has_didi: false, decision_e2_wechat: "Post-arrival setup planned" }
        }
      }
    ]
  },

  "e2_w11_digital_done": {
    speaker: "System",
    location: "Home Country",
    text: "Week 11 ends with your phone full of new icons, half-translated instructions, and one folder named China Arrival. Nothing has been used yet. That is the point: you are trying to turn future panic into saved screenshots.",
    choices: [
      {
        text: "Continue to Week 12: housing.",
        action: "advance_turn",
        next: "e2_w12_housing"
      }
    ]
  },

  "e2_w12_housing": {
    speaker: "Minghai Housing Portal",
    bgImage: '/images/simulator/backgrounds/bg_dorm_room.jpg',
    location: "Home Country",
    text: "The housing portal opens at 08:00 sharp, but this time it is not a normal story choice.\n\nTask: open SimPad, enter the Housing app, compare the options, and submit one address plan there. The story will continue after the housing choice is confirmed.",
    choices: [
      {
        text: "Open SimPad > Housing and choose where you will live. [Required phone action]",
        next: "e2_w12_housing",
        effects: {
          flags: { housing_simpad_required: true, housing_portal_seen: true }
        }
      },
      {
        text: "Ask Minghai to auto-assign campus housing for now. [Fallback, Energy -]",
        next: "e2_w12_roommate_intro",
        effects: {
          stats: { energy: -8 },
          guanxi: { admin: 4 },
          flags: { decision_e2_housing: "Campus allocation pending", housing_sorted: false, dorm_pending: true, housing_simpad_required: false }
        }
      }
    ]
  },

  "e2_w12_roommate_intro": {
    speaker: "Minghai Intl Group",
    location: "Home Country",
    text: "A student named Sophie posts a spreadsheet of bedding sizes, extension-plug warnings, and which dorm floors have decent water pressure. Someone replies, 'You are saving lives.' Sophie answers, 'No, only backs.'",
    choices: [
      {
        text: "Introduce yourself honestly in the group. [Intl network +, Relationship +]",
        next: "e2_w12_housing_done",
        effects: {
          stats: { energy: -2 },
          guanxi: { intlStudents: 4 },
          relationships: { Sophie: { friendship: 5 } },
          flags: { introduced_to_group: true, met_sophie_online: true }
        }
      },
      {
        text: "Quietly save every useful message. [Digital +, Energy +]",
        next: "e2_w12_housing_done",
        effects: {
          stats: { digitalProficiency: 3, energy: 3 },
          flags: { predeparture_lurker: true }
        }
      },
      {
        text: "Ask practical questions about check-in day. [Digital +, Intl network +]",
        next: "e2_w12_housing_done",
        effects: {
          stats: { digitalProficiency: 2 },
          guanxi: { intlStudents: 6 },
          flags: { asked_checkin_questions: true }
        }
      }
    ]
  },

  "e2_w12_housing_done": {
    speaker: "System",
    location: "Home Country",
    text: "Week 12 ends with a roof, or at least a promise of one. The next problem has wings.",
    choices: [
      {
        text: "Continue to Week 13: flights to Shanghai.",
        action: "advance_turn",
        next: "e2_w13_flight_budget"
      }
    ]
  },

  "e2_w13_flight_budget": {
    speaker: "Flight Search",
    bgImage: '/images/simulator/backgrounds/bg_airplane_window.jpg',
    location: "Home Country",
    text: "Every route to Shanghai looks like a personality test. The direct flight costs more than you want to admit. The cheap route saves money by borrowing hours from your future body. The middle option looks reasonable, which somehow makes it suspicious.",
    choices: [
      {
        text: "Book the direct flight to Shanghai Pudong. [Requires 5200 RMB, Energy +]",
        condition: { stats: { wealth: { min: 5200 } } },
        next: "e2_w13_arrival_plan",
        effects: {
          stats: { wealth: -5200, energy: 10 },
          flags: { direct_flight: true, decision_e2_flight: "Direct to Shanghai Pudong" }
        }
      },
      {
        text: "Book a one-layover student fare. [Wealth -, Digital +]",
        condition: { stats: { wealth: { min: 3000 } } },
        next: "e2_w13_arrival_plan",
        effects: {
          stats: { wealth: -2800, energy: -4, digitalProficiency: 3 },
          flags: { decision_e2_flight: "One-layover student fare" }
        }
      },
      {
        text: "Book the cheapest overnight route and protect the budget. [Wealth -, Energy -]",
        next: "e2_w13_arrival_plan",
        effects: {
          stats: { wealth: -1200, energy: -8, digitalProficiency: 5 },
          flags: { decision_e2_flight: "Cheapest overnight route", budget_flight: true }
        }
      }
    ]
  },

  "e2_w13_arrival_plan": {
    speaker: "Arrival Notes",
    bgImage: '/images/simulator/backgrounds/bg_pudong_arrivals.jpg',
    location: "Home Country",
    text: "Shanghai Pudong International Airport becomes a map you keep zooming into. This is not the phone setup anymore; this is the first-hour plan. Terminal. Baggage. Customs. Taxi stand. Metro. Pickup zone. If the landing goes badly, which decision will carry you to Minghai?",
    choices: [
      {
        text: "Confirm the DiDi pickup screenshots you already prepared. [Digital +, Energy +, Wealth -]",
        condition: { flags: { has_didi: true } },
        next: "e2_w13_flight_done",
        effects: {
          stats: { digitalProficiency: 3, energy: 3, wealth: -60 },
          flags: { airport_transfer_plan: "Pre-set DiDi pickup" }
        }
      },
      {
        text: "Plan for the official taxi queue and practice the address in Chinese. [Chinese +, Energy -]",
        next: "e2_w13_flight_done",
        effects: {
          stats: { chinese: 5, energy: -3 },
          flags: { airport_transfer_plan: "Official taxi queue" }
        }
      },
      {
        text: "Ask whether Minghai has a student pickup buddy. [Admin network +, Local network +]",
        next: "e2_w13_flight_done",
        effects: {
          guanxi: { admin: 3, localStudents: 4 },
          relationships: { "Xiao Chen": { friendship: 4 } },
          flags: { airport_transfer_plan: "Minghai buddy pickup", met_xiao_chen_online: true }
        }
      }
    ]
  },

  "e2_w13_flight_done": {
    speaker: "System",
    location: "Home Country",
    text: "Week 13 ends with a flight confirmation in your inbox. The route line is clean. The feeling is not.",
    choices: [
      {
        text: "Continue to Week 14: first-semester setup.",
        action: "advance_turn",
        next: "e2_w14_semester_setup"
      }
    ]
  },

  "e2_w14_semester_setup": {
    speaker: "Minghai Pre-Arrival Portal",
    location: "Home Country",
    text: "Minghai sends a pre-arrival portal link: course preview, registration guide, campus map, emergency contacts, and a polite reminder that orientation is mandatory. It is the first time the university feels less like a dream and more like a schedule.",
    choices: [
      {
        text: "Review your major materials before the semester starts. [Academics +, Energy -]",
        next: "e2_w14_major_reflection",
        effects: {
          stats: { academics: 8, energy: -5 },
          flags: { semester_plan: "Academic prep" }
        }
      },
      {
        text: "Practice Chinese for campus situations: canteen, dorm, taxi, office. [Chinese +, Culture +]",
        next: "e2_w14_major_reflection",
        effects: {
          stats: { chinese: 8, culture: 5 },
          flags: { semester_plan: "Campus Chinese prep" }
        }
      },
      {
        text: "Save Shanghai maps, campus addresses, and registration screenshots. [Digital +, Admin network +]",
        next: "e2_w14_major_reflection",
        effects: {
          stats: { digitalProficiency: 8 },
          guanxi: { admin: 3 },
          flags: { semester_plan: "Logistics prep" }
        }
      }
    ]
  },

  "e2_w14_major_reflection": {
    speaker: "Inner Voice",
    location: "Home Country",
    text: "Your major line on the admission letter looks different now. It is not just what you will study. It is the hallway you will walk into, the classmates you will disappoint and impress, the version of China you will meet first.",
    choices: [
      {
        text: "You came for the degree. The work deserves respect. [Academics +]",
        condition: { flags: { motive_degree: true } },
        next: "e2_w14_setup_done",
        effects: {
          stats: { academics: 5 },
          flags: { predeparture_resolve: "Degree focus" }
        }
      },
      {
        text: "You came for curiosity. Leave space for surprise. [Culture +]",
        condition: { flags: { motive_curiosity: true } },
        next: "e2_w14_setup_done",
        effects: {
          stats: { culture: 5 },
          flags: { predeparture_resolve: "Curiosity focus" }
        }
      },
      {
        text: "You came because this chance was rare. Protect it carefully. [Energy +]",
        condition: { flags: { motive_scholarship: true } },
        next: "e2_w14_setup_done",
        effects: {
          stats: { energy: 5 },
          flags: { predeparture_resolve: "Scholarship focus" }
        }
      },
      {
        text: "You came for a clean start. Try not to pack the old fear too neatly. [Energy +]",
        condition: { flags: { motive_restart: true } },
        next: "e2_w14_setup_done",
        effects: {
          stats: { energy: 5 },
          flags: { predeparture_resolve: "Fresh-start focus" }
        }
      },
      {
        text: "Whatever brought you here, prepare for the first week honestly.",
        next: "e2_w14_setup_done",
        effects: {
          stats: { energy: 2 },
          flags: { predeparture_resolve: "Open focus" }
        }
      }
    ]
  },

  "e2_w14_setup_done": {
    speaker: "System",
    location: "Home Country",
    text: "Week 14 ends with your first semester beginning to take shape: not enough to remove fear, but enough to give fear a timetable.",
    choices: [
      {
        text: "Continue to Week 15: packing and goodbyes.",
        action: "advance_turn",
        next: "e2_w15_packing"
      }
    ]
  },

  "e2_w15_packing": {
    speaker: "Suitcase",
    bgImage: '/images/simulator/backgrounds/bg_predeparture_suitcase.jpg',
    location: "Home Country",
    text: "The suitcase from departure eve waits open again. Two 23kg bags are not enough for a life, so the real question is not what you can bring. It is what you are willing to be without for a while.",
    choices: [
      {
        text: "Pack comfort and health first: medicine, snacks, weather layers. [Energy +, Wealth -]",
        next: "e2_w15_farewell",
        effects: {
          stats: { energy: 12, wealth: -120 },
          flags: { decision_e2_pack: "Comfort and health" }
        }
      },
      {
        text: "Pack documents, adapters, and study gear with military seriousness. [Digital +, Academics +]",
        next: "e2_w15_farewell",
        effects: {
          stats: { digitalProficiency: 5, academics: 3 },
          flags: { decision_e2_pack: "Documents and study gear" }
        }
      },
      {
        text: "Pack small gifts for future classmates and advisors. [Wealth -, Networks +, Culture +]",
        next: "e2_w15_farewell",
        effects: {
          stats: { wealth: -220, culture: 5 },
          guanxi: { localStudents: 8, professors: 8 },
          flags: { decision_e2_pack: "Small gifts for Minghai" }
        }
      }
    ]
  },

  "e2_w15_farewell": {
    speaker: "Last Night At Home",
    bgImage: '/images/simulator/cg/cg_family_farewell_keepsake.jpg',
    location: "Home Country",
    text: "Nobody is debating whether China is a good idea anymore. The application call, the budget talk, the visa stress: all of that already happened. Tonight is stranger because it is simpler. People keep asking if you are excited, and the answer is yes, but not only yes.",
    choices: [
      {
        text: "Make the final home call and say the things you avoided before. [Energy +, Relationship +]",
        next: "e2_w15_done",
        effects: {
          stats: { energy: 10 },
          relationships: { Family: { friendship: 8 } },
          flags: { decision_e2_farewell: "Family promise" }
        }
      },
      {
        text: "See friends one last time and let the night run late. [Energy +, Wealth -]",
        next: "e2_w15_done",
        effects: {
          stats: { energy: 5, wealth: -100 },
          guanxi: { intlStudents: 3 },
          flags: { decision_e2_farewell: "Friends farewell" }
        }
      },
      {
        text: "Take a private walk and say goodbye in your own head. [Energy +, Culture +]",
        next: "e2_w15_done",
        effects: {
          stats: { energy: 15, culture: 3 },
          flags: { decision_e2_farewell: "Quiet private goodbye" }
        }
      }
    ]
  },

  "e2_w15_done": {
    speaker: "System",
    location: "Home Country",
    text: "Week 15 ends at the edge of sleep. The flight is no longer a plan. It is tomorrow.",
    choices: [
      {
        text: "Return to departure eve.",
        action: "advance_turn",
        next: "e2_w16_departure_eve_return"
      }
    ]
  },

  "e2_w16_departure_eve_return": {
    speaker: "Departure Eve",
    bgImage: '/images/simulator/backgrounds/bg_predeparture_suitcase.jpg',
    location: "Home Country",
    text: "Back in your room, everything has caught up with itself: the admission letter, the visa, the flight, the group chat, the unopened fear. The suitcase is still open, but now it feels less like a question and more like an answer waiting to be zipped shut.",
    choices: [
      {
        text: "Do one final document check. [Digital +, Energy -]",
        next: "e2_w16_airport",
        effects: {
          stats: { digitalProficiency: 3, energy: -4 },
          flags: { final_document_check: true }
        }
      },
      {
        text: "Sleep early. Future-you deserves one mercy. [Energy +]",
        next: "e2_w16_airport",
        effects: {
          stats: { energy: 10 },
          flags: { slept_before_flight: true }
        }
      },
      {
        text: "Send one message to the Minghai group: 'See you in Shanghai.' [Intl network +]",
        next: "e2_w16_airport",
        effects: {
          guanxi: { intlStudents: 3 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { group_message_before_flight: true }
        }
      }
    ]
  },

  "e2_w16_airport": {
    speaker: "Airport Announcement",
    bgImage: '/images/simulator/backgrounds/bg_airplane_window.jpg',
    location: "Home Country Airport",
    text: "Flight to Shanghai Pudong International Airport is now boarding. The gate opens, and the line begins to move. For months, China was a document, a tab, a plan, a maybe. Now it is a boarding pass in your hand.",
    choices: [
      {
        text: "Board the flight to Shanghai.",
        action: "advance_turn",
        next: "in_china_start",
        effects: {
          stats: { energy: 8 },
          flags: { departed_for_shanghai: true, decision_e2_departure: "Boarded for Shanghai" }
        }
      }
    ]
  }
};
