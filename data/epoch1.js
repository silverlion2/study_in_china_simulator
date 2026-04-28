export const epoch1Events = {
  "start": {
    speaker: "Departure Eve",
    bgImage: '/images/simulator/backgrounds/bg_departure_eve_room.jpg',
    location: "Home Country",
    text: "The suitcase is open on the floor, half-packed and already accusing you of forgetting something. Your passport lies beside the admission letter from Minghai University, Shanghai. Tomorrow morning, you fly to China. Tonight, every object in your room seems to remember a different version of how you got here.",
    choices: [
      {
        text: "Check the admission folder first.",
        next: "pro_admission_folder"
      },
      {
        text: "Read the unread messages on your phone.",
        next: "pro_phone_messages"
      },
      {
        text: "Start with the suitcase. Practical problems first.",
        next: "pro_suitcase",
        effects: {
          stats: { energy: 5 },
          flags: { coping_practical_hint: true }
        }
      },
      {
        text: "Review how the simulator works before the memories take over.",
        next: "tutorial_stats"
      }
    ]
  },

  "tutorial_stats": {
    speaker: "Simulator Guide",
    text: "This is a study-abroad life sim about balance: academics, Chinese, money, energy, digital tools, culture, relationship networks, and individual bonds. Each choice pushes one part of that life forward and usually makes another part harder.",
    choices: [
      {
        text: "Show me how relationship networks and individual bonds differ.",
        next: "tutorial_guanxi"
      }
    ]
  },

  "tutorial_guanxi": {
    speaker: "Simulator Guide",
    text: "Individual bonds are your ties with specific people. Your relationship network is broader: administrators, professors, local students, and international students. In China, people may call this guanxi, but here it simply means the trust and context you build with a group over time.",
    choices: [
      {
        text: "And how does time pass?",
        next: "tutorial_time"
      }
    ]
  },

  "tutorial_time": {
    speaker: "Simulator Guide",
    text: "Major actions advance the calendar by one week. Weekly life costs money and energy, even when nothing dramatic happens. The goal is not to maximize one stat, but to keep your life coherent enough to reach the future you came for.",
    choices: [
      {
        text: "Got it. Back to departure eve.",
        next: "pro_admission_folder"
      }
    ]
  },

  "pro_admission_folder": {
    speaker: "Admission Letter",
    bgImage: '/images/simulator/cg/cg_admission_email.jpg',
    location: "Home Country",
    text: "The paper still feels unreal: Minghai University, Undergraduate Admission, School of... You pause at the major line. It looks so official now, as if the choice was always inevitable. But months ago, it was just one tab among thirty, opened at 2:00 AM while you wondered whether China was a plan, a gamble, or an escape route.",
    choices: [
      {
        text: "Remember why you applied to China.",
        next: "week1_motive"
      }
    ]
  },

  "pro_phone_messages": {
    speaker: "Phone",
    bgImage: '/images/simulator/backgrounds/bg_departure_eve_room.jpg',
    location: "Home Country",
    text: "Three messages wait on the lock screen. One from family, checking whether you packed medicine. One from a friend, asking if you are actually doing this. One from the Minghai international student group, already arguing about SIM cards, bedding, and whether the canteen accepts foreign cards.",
    choices: [
      {
        text: "Reply to family first.",
        next: "pro_family_reply",
        effects: {
          stats: { energy: -5 },
          flags: { family_thread_opened: true }
        }
      },
      {
        text: "Open the student group chat.",
        next: "pro_group_chat",
        effects: {
          guanxi: { intlStudents: 3 },
          flags: { intl_group_seen: true }
        }
      }
    ]
  },

  "pro_family_reply": {
    speaker: "Family Chat",
    location: "Home Country",
    text: "You type that everything is under control, then delete it because the suitcase behind you is openly disproving the statement. You settle for: I am packing now. I will call before I sleep. The typing bubble appears, disappears, then appears again.",
    choices: [
      {
        text: "Put the phone down and face the suitcase.",
        next: "pro_suitcase"
      }
    ]
  },

  "pro_group_chat": {
    speaker: "Minghai Intl Group",
    location: "Home Country",
    text: "The group chat is pure pre-departure chaos: screenshots of payment apps, warnings about hard mattresses, someone asking if rice cookers are allowed, and a senior student calmly saying, 'Bring patience. Everything else you can buy in Shanghai.'",
    choices: [
      {
        text: "Save the useful messages and return to packing.",
        next: "pro_suitcase",
        effects: {
          stats: { digitalProficiency: 2 }
        }
      }
    ]
  },

  "pro_suitcase": {
    speaker: "Suitcase",
    bgImage: '/images/simulator/backgrounds/bg_predeparture_suitcase.jpg',
    location: "Home Country",
    text: "Clothes are easy. Documents are harder. You have a folder for originals, a folder for copies, a folder for copies of copies, and one mysterious photo with a blue background because someone online insisted China loves blue-background photos.",
    choices: [
      {
        text: "Put the documents on top. Trust paper more than luck.",
        next: "pro_flight_confirm",
        effects: {
          stats: { digitalProficiency: 2 },
          flags: { document_careful: true }
        }
      },
      {
        text: "Pack comfort items first. Future-you can panic later.",
        next: "pro_flight_confirm",
        effects: {
          stats: { energy: 5 },
          flags: { comfort_packer: true }
        }
      }
    ]
  },

  "pro_flight_confirm": {
    speaker: "Flight App",
    bgImage: '/images/simulator/backgrounds/bg_airplane_window.jpg',
    location: "Home Country",
    text: "Departure: tomorrow, 08:40. Destination: Shanghai. The app displays the route as a clean line across the map, which feels unfair. Nothing about this has been a clean line.",
    choices: [
      {
        text: "Think back to the first night this became real.",
        next: "week1_motive"
      }
    ]
  },

  "week1_motive": {
    speaker: "Memory",
    location: "Home Country",
    text: "Months earlier, China was not yet a plane ticket. It was a search result, a scholarship page, a campus video, a conversation you did not know how to finish. Everyone asked what you wanted from it. The harder question was what you were willing to let it change.",
    choices: [
      {
        text: "A degree that can change the next ten years. [Academics +]",
        next: "w1_origin",
        effects: {
          stats: { academics: 10 },
          flags: { motive_degree: true, academic_seed: true, decision_e1_start: "Degree and future" }
        }
      },
      {
        text: "Curiosity: the real China, not the algorithm's version. [Culture +, Chinese +]",
        next: "w1_origin",
        effects: {
          stats: { culture: 10, chinese: 5 },
          flags: { motive_curiosity: true, local_seed: true, decision_e1_start: "Curiosity about China" }
        }
      },
      {
        text: "The scholarship made the impossible possible. [Wealth +, Energy -]",
        next: "w1_origin",
        effects: {
          stats: { wealth: 1000, energy: -5 },
          flags: { motive_scholarship: true, academic_seed: true, decision_e1_start: "Scholarship opportunity" }
        }
      },
      {
        text: "A clean start somewhere nobody knows your old version. [Energy +, Culture +]",
        next: "w1_origin",
        effects: {
          stats: { energy: 10, culture: 5 },
          flags: { motive_restart: true, intl_seed: true, decision_e1_start: "A clean start" }
        }
      }
    ]
  },

  "w1_origin": {
    speaker: "Starting Point",
    location: "Home Country",
    text: "Before the application could become a story, the simulator needed your starting point. This is not asking what kind of family you have. It is setting the practical distance between home and Shanghai: passport friction, money pressure, language familiarity, and the assumptions you may carry into every classroom and canteen line.",
    choices: [
      {
        text: "A neighboring Asian country: familiar enough to surprise you. [Culture +, Chinese +]",
        next: "w1_identity",
        effects: {
          stats: { culture: 15, chinese: 10 },
          flags: { origin_asian: true }
        }
      },
      {
        text: "A Western country: the distance feels huge, but so does the possibility. [Wealth +, Chinese -]",
        next: "w1_identity",
        effects: {
          stats: { wealth: 5000, chinese: -5 },
          flags: { origin_western: true }
        }
      },
      {
        text: "The Global South: this journey carries more than your own ambition. [Academics +, Wealth -]",
        next: "w1_identity",
        effects: {
          stats: { academics: 15, energy: 15, wealth: -1500 },
          flags: { origin_developing: true }
        }
      }
    ]
  },

  "w1_identity": {
    speaker: "Identity",
    location: "Home Country",
    text: "A simple question on a form still has a way of becoming real. Dorm assignments, social expectations, and the way strangers read you will all follow you into Shanghai. The form offers three boxes. Your life, inconveniently, is larger than a box.",
    choices: [
      {
        text: "Male",
        next: "w1_chinese_level",
        effects: {
          flags: { gender_male: true }
        }
      },
      {
        text: "Female",
        next: "w1_chinese_level",
        effects: {
          flags: { gender_female: true }
        }
      },
      {
        text: "Non-binary / another identity",
        next: "w1_chinese_level",
        effects: {
          flags: { gender_nonbinary: true }
        }
      }
    ]
  },

  "w1_chinese_level": {
    speaker: "Language",
    location: "Home Country",
    text: "Every China plan eventually becomes a language plan. You could open apps, memorize tones, watch dramas without subtitles, or pretend future-you would somehow become brave at airport counters.",
    choices: [
      {
        text: "Beginner: ni hao, xiexie, and the terror of tones. [Chinese -]",
        next: "w1_coping_style",
        effects: {
          stats: { chinese: -5, energy: 5 },
          flags: { chinese_beginner: true, decision_e1_hsk: "Beginner Chinese" }
        }
      },
      {
        text: "Classroom Chinese: your textbook self is braver than your real mouth. [Chinese +, Academics +]",
        next: "w1_coping_style",
        effects: {
          stats: { chinese: 10, academics: 5 },
          flags: { chinese_classroom: true, decision_e1_hsk: "Classroom Chinese" }
        }
      },
      {
        text: "Heritage or self-taught Chinese: you follow more than people expect. [Chinese +, Culture +]",
        next: "w1_coping_style",
        effects: {
          stats: { chinese: 20, culture: 5, energy: -5 },
          flags: { chinese_strong: true, decision_e1_hsk: "Strong Chinese foundation" }
        }
      }
    ]
  },

  "w1_coping_style": {
    speaker: "Inner Voice",
    location: "Home Country",
    text: "The application process does not ask what kind of person you are under pressure. It simply creates enough pressure for you to find out.",
    choices: [
      {
        text: "Plan first. Panic later, if scheduled. [Digital +, Energy +]",
        next: "end_week1",
        effects: {
          stats: { digitalProficiency: 5, energy: 5 },
          flags: { coping_planner: true }
        }
      },
      {
        text: "Ask people. Someone always knows someone. [Networks +]",
        next: "end_week1",
        effects: {
          guanxi: { localStudents: 5, intlStudents: 5 },
          flags: { coping_social: true }
        }
      },
      {
        text: "Figure it out alone with three browser tabs and one crisis. [Academics +, Digital +, Energy -]",
        next: "end_week1",
        effects: {
          stats: { academics: 5, digitalProficiency: 5, energy: -5 },
          flags: { coping_independent: true }
        }
      },
      {
        text: "Say yes first. Understand later. [Culture +, Wealth -]",
        next: "end_week1",
        effects: {
          stats: { culture: 10, energy: 5, wealth: -300 },
          flags: { coping_explorer: true }
        }
      }
    ]
  },

  "end_week1": {
    speaker: "System",
    location: "Home Country",
    text: "Week 1 ends with too many browser tabs and one strangely calm decision: you are really applying. China is no longer an abstract future. It has deadlines.",
    choices: [
      {
        text: "Continue to Week 2.",
        action: "advance_turn",
        next: "w2_school_major"
      }
    ]
  },

  "w2_school_major": {
    speaker: "Application Portal",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "Minghai University rises to the top of your list for reasons that feel both rational and impossible to explain: Shanghai, a strong international office, a campus close enough to the city to be dangerous, and three undergraduate tracks that each seem to promise a different version of you.",
    choices: [
      {
        text: "Business and Management: learn the market from inside the machine. [Digital +, Wealth +]",
        next: "w2_school_research",
        effects: {
          stats: { wealth: 500, digitalProficiency: 5 },
          flags: { major_business: true, career_seed: true }
        }
      },
      {
        text: "Engineering and Computing: if the workload scares you, maybe it matters. [Academics +, Digital +, Energy -]",
        next: "w2_school_research",
        effects: {
          stats: { academics: 10, digitalProficiency: 10, energy: -5 },
          flags: { major_stem: true, city_seed: true }
        }
      },
      {
        text: "Humanities and China Studies: understand the place beyond the skyline. [Chinese +, Culture +]",
        next: "w2_school_research",
        effects: {
          stats: { chinese: 10, culture: 10 },
          flags: { major_humanities: true, local_seed: true }
        }
      }
    ]
  },

  "w2_school_research": {
    speaker: "Browser Tabs",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "The official website is polished. The student forum is chaotic. A vlog shows sunshine, canteen noodles, and someone crying quietly during finals week. You realize research is not about finding the perfect university. It is about choosing which uncertainties you can live with.",
    choices: [
      {
        text: "Read official pages and application rules carefully. [Digital +, Admin network +]",
        next: "w2_minghai_picture",
        effects: {
          stats: { digitalProficiency: 5, energy: -5 },
          guanxi: { admin: 3 },
          flags: { researched_officially: true }
        }
      },
      {
        text: "Join an international student group and ask blunt questions. [Intl network +]",
        next: "w2_minghai_picture",
        effects: {
          stats: { energy: 5 },
          guanxi: { intlStudents: 8 },
          flags: { asked_student_group: true }
        }
      },
      {
        text: "Watch campus vlogs until Shanghai feels almost familiar. [Culture +, Energy +, Academics -]",
        next: "w2_minghai_picture",
        effects: {
          stats: { culture: 5, energy: 5, academics: -3 },
          flags: { campus_vlog_dreamer: true }
        }
      }
    ]
  },

  "w2_minghai_picture": {
    speaker: "Minghai University",
    bgImage: '/images/simulator/backgrounds/bg_minghai_gate.jpg',
    location: "Home Country",
    text: "The campus map makes Minghai look orderly: dormitory, canteen, library, Global Education Office, metro gate. The student comments make it sound alive: impossible printers, legendary breakfast scallion pancakes, group projects that begin polite and end at 3:00 AM.",
    choices: [
      {
        text: "Pin Minghai University to the top of your list.",
        next: "end_week2",
        effects: {
          flags: { target_minghai: true }
        }
      }
    ]
  },

  "end_week2": {
    speaker: "System",
    location: "Home Country",
    text: "Week 2 ends with Minghai University pinned to the top of your list. The choice feels exciting until you notice the next tab: Personal Statement.",
    choices: [
      {
        text: "Continue to Week 3.",
        action: "advance_turn",
        next: "w3_personal_statement"
      }
    ]
  },

  "w3_personal_statement": {
    speaker: "Personal Statement",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "The prompt asks why you want to study in China. You type three honest sentences, delete them, then open a new tab. A perfect answer is easy to generate. A true answer is harder to keep honest.",
    choices: [
      {
        text: "Use AI to build a clean draft, then promise you will edit it later. [Digital +, Energy +]",
        next: "w3_feedback",
        effects: {
          stats: { digitalProficiency: 10, academics: 3, energy: 5 },
          flags: { statement_ai_draft: true, decision_e1_plan: "AI-assisted draft" }
        }
      },
      {
        text: "Write it yourself, slowly and badly, until it sounds like you. [Academics +, Chinese +, Energy -]",
        next: "w3_feedback",
        effects: {
          stats: { academics: 10, chinese: 5, energy: -15 },
          flags: { statement_manual: true, decision_e1_plan: "Manual honest draft" }
        }
      },
      {
        text: "Ask a senior applicant to tear it apart before the university can. [Intl network +]",
        next: "w3_feedback",
        effects: {
          stats: { academics: 5, energy: -5 },
          guanxi: { intlStudents: 5 },
          flags: { statement_peer_review: true, decision_e1_plan: "Peer-reviewed draft" }
        }
      }
    ]
  },

  "w3_feedback": {
    speaker: "Professor Lin",
    location: "Email",
    text: "Professor Lin replies faster than you expected. 'The structure is fine,' the email begins, which you quickly learn is academic language for: the real criticism starts now. He marks three sentences and writes, 'This sounds impressive, but not specific. Why China? Why you?'",
    choices: [
      {
        text: "Revise for honesty, even if it looks less polished. [Academics +, Professor network +, Energy -]",
        next: "w3_statement_done",
        effects: {
          stats: { academics: 8, energy: -8 },
          guanxi: { professors: 10 },
          flags: { lin_values_honesty: true }
        }
      },
      {
        text: "Revise for impact. Admissions committees are not therapists. [Academics +, Digital +]",
        next: "w3_statement_done",
        effects: {
          stats: { academics: 5, digitalProficiency: 5 },
          guanxi: { professors: 3 },
          flags: { lin_values_strategy: true }
        }
      }
    ]
  },

  "w3_statement_done": {
    speaker: "Personal Statement",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "By midnight, the statement is not perfect. It still has one sentence that tries too hard and another that sounds like a brochure. But there is a pulse under it now. It belongs to you.",
    choices: [
      {
        text: "Save the final draft.",
        next: "end_week3",
        effects: {
          flags: { statement_finalized: true }
        }
      }
    ]
  },

  "end_week3": {
    speaker: "System",
    location: "Home Country",
    text: "Week 3 ends with a statement that is not perfect, but finally belongs to you.",
    choices: [
      {
        text: "Continue to Week 4.",
        action: "advance_turn",
        next: "w4_recommendation"
      }
    ]
  },

  "w4_recommendation": {
    speaker: "Email Draft",
    location: "Home Country",
    text: "The recommendation request sits unsent. You have written 'Dear Professor Lin' six times, each version somehow sounding either too desperate or too casual. Asking for help is its own kind of exam.",
    choices: [
      {
        text: "Send a clear, respectful request with your materials attached. [Professor network +, Energy -]",
        next: "w4_professor_reply",
        effects: {
          stats: { academics: 5, energy: -5 },
          guanxi: { professors: 10 },
          flags: { rec_request_professional: true }
        }
      },
      {
        text: "Send a heartfelt message explaining what this means to you. [Professor network +]",
        next: "w4_professor_reply",
        effects: {
          stats: { energy: 3 },
          guanxi: { professors: 6 },
          flags: { rec_request_personal: true }
        }
      },
      {
        text: "Delay it one more day because asking makes it real. [Energy +, Academics -]",
        next: "w4_professor_reply",
        effects: {
          stats: { energy: 5, academics: -5 },
          flags: { rec_request_delayed: true }
        }
      }
    ]
  },

  "w4_professor_reply": {
    speaker: "Professor Lin",
    location: "Email",
    text: "'I can write the letter,' Professor Lin replies. 'But remember, a recommendation is not a magic stamp. It is a promise that you will become the kind of student this application describes.' You stare at that sentence for longer than necessary.",
    choices: [
      {
        text: "Accept the responsibility, not just the signature.",
        next: "w4_family_call",
        effects: {
          stats: { academics: 5 },
          guanxi: { professors: 5 },
          flags: { recommendation_secured: true }
        }
      }
    ]
  },

  "w4_family_call": {
    speaker: "Family Call",
    location: "Home Country",
    text: "This is the application-period call, not the goodbye call. Your family asks practical questions first: documents, money, safety, food. Then comes the question under all the questions: are you sure? You hear love in it. You also hear fear. You are not sure which one feels heavier.",
    choices: [
      {
        text: "Reassure them with your plan, even the parts you are still inventing. [Digital +, Energy +]",
        next: "end_week4",
        effects: {
          stats: { energy: 5, digitalProficiency: 3 },
          flags: { family_reassured: true }
        }
      },
      {
        text: "Admit you are scared too. [Energy +]",
        next: "end_week4",
        effects: {
          stats: { energy: 10 },
          flags: { family_honest: true }
        }
      },
      {
        text: "Keep it light. If you joke enough, nobody has to panic. [Energy +]",
        next: "end_week4",
        effects: {
          stats: { energy: 5 },
          flags: { family_deflected: true }
        }
      }
    ]
  },

  "end_week4": {
    speaker: "System",
    location: "Home Country",
    text: "Week 4 ends with one recommendation request sent, one family call handled, and the uncomfortable realization that support can still feel heavy.",
    choices: [
      {
        text: "Continue to Week 5.",
        action: "advance_turn",
        next: "w5_finance_plan"
      }
    ]
  },

  "w5_finance_plan": {
    speaker: "Budget Spreadsheet",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "The spreadsheet does not care about courage. Tuition, dorm deposit, flights, visa fees, bedding, emergency money. The numbers line up neatly, which somehow makes them more terrifying.",
    choices: [
      {
        text: "Scholarship-funded: tuition is covered, but every grade feels watched. [Wealth +, Academics +]",
        next: "w5_budget_choice",
        effects: {
          stats: { wealth: 1000, academics: 10 },
          guanxi: { admin: 5 },
          flags: { finance_scholarship: true }
        }
      },
      {
        text: "Family support budget: a safety net, and the quiet pressure that comes with it. [Wealth +, Energy +, Academics -]",
        next: "w5_budget_choice",
        effects: {
          stats: { wealth: 20000, energy: 20, academics: -10 },
          flags: { finance_rich: true }
        }
      },
      {
        text: "Budget planner: every yuan has a job before you spend it. [Wealth -, Culture +]",
        next: "w5_budget_choice",
        effects: {
          stats: { wealth: -1000, energy: 10, culture: 10 },
          flags: { finance_working: true }
        }
      }
    ]
  },

  "w5_budget_choice": {
    speaker: "Budget Spreadsheet",
    location: "Home Country",
    text: "You create three versions of the budget: optimistic, realistic, and the one where nothing ever goes wrong, which you label 'do not trust.'",
    choices: [
      {
        text: "Build a strict budget and track every category. [Digital +, Energy -]",
        next: "end_week5",
        effects: {
          stats: { digitalProficiency: 5, energy: -5 },
          flags: { budget_strict: true }
        }
      },
      {
        text: "Leave room for mistakes. Future-you deserves oxygen. [Wealth -, Energy +]",
        condition: { stats: { wealth: { min: 300 } } },
        next: "end_week5",
        effects: {
          stats: { energy: 5, wealth: -300 },
          flags: { budget_flexible: true }
        }
      },
      {
        text: "Ask current students what things actually cost. [Intl network +, Culture +]",
        next: "end_week5",
        effects: {
          stats: { culture: 3 },
          guanxi: { intlStudents: 8 },
          flags: { budget_peer_advice: true }
        }
      }
    ]
  },

  "end_week5": {
    speaker: "System",
    location: "Home Country",
    text: "Week 5 ends with your future translated into numbers. It is not comforting, exactly, but it is real enough to plan around.",
    choices: [
      {
        text: "Continue to Week 6.",
        action: "advance_turn",
        next: "w6_medical_form"
      }
    ]
  },

  "w6_medical_form": {
    speaker: "Medical Form",
    bgImage: '/images/simulator/cg/cg_document_stack_jw202.jpg',
    location: "Home Country",
    text: "The Foreigner Physical Examination Form looks simple until you bring it to a clinic. Suddenly every box needs the correct stamp, every stamp needs the correct department, and every department seems to be on a different floor of reality.",
    choices: [
      {
        text: "Use the public clinic and work through the process. [Wealth -, Energy -, Culture +]",
        condition: { stats: { wealth: { min: 200 } } },
        next: "w6_documents",
        effects: {
          stats: { wealth: -200, energy: -15, culture: 5 },
          flags: { medical_public_clinic: true, decision_e1_med: "Public clinic" }
        }
      },
      {
        text: "Pay for an international clinic that knows the form. [Wealth -, Energy +]",
        condition: { stats: { wealth: { min: 900 } } },
        next: "w6_documents",
        effects: {
          stats: { wealth: -900, energy: 5 },
          flags: { medical_international_clinic: true, decision_e1_med: "International clinic" }
        }
      },
      {
        text: "Ask a senior student how they handled it. [Wealth -, Intl network +]",
        condition: { stats: { wealth: { min: 100 } } },
        next: "w6_documents",
        effects: {
          stats: { wealth: -100, energy: -5 },
          guanxi: { intlStudents: 6 },
          flags: { medical_peer_help: true, decision_e1_med: "Senior student advice" }
        }
      }
    ]
  },

  "w6_documents": {
    speaker: "Document Checklist",
    bgImage: '/images/simulator/cg/cg_document_stack_jw202.jpg',
    location: "Home Country",
    text: "Passport scan. Photo. Transcript. Recommendation letter. Study plan. Medical form. Each file has a different naming rule, and the portal rejects one PDF because it is somehow both too large and too small.",
    choices: [
      {
        text: "Rename everything carefully and build a backup folder. [Digital +, Energy -]",
        next: "end_week6",
        effects: {
          stats: { digitalProficiency: 8, energy: -5 },
          flags: { documents_organized: true }
        }
      },
      {
        text: "Email the international office before you make a fatal typo. [Admin network +]",
        next: "end_week6",
        effects: {
          stats: { energy: -3 },
          guanxi: { admin: 8 },
          flags: { asked_admin_early: true }
        }
      },
      {
        text: "Submit what you have and trust the portal warnings. [Energy +, Academics -]",
        next: "end_week6",
        effects: {
          stats: { energy: 5, academics: -3 },
          flags: { documents_rushed: true }
        }
      }
    ]
  },

  "end_week6": {
    speaker: "System",
    location: "Home Country",
    text: "Week 6 ends with your documents assembled into something that almost looks official. Almost.",
    choices: [
      {
        text: "Continue to Week 7.",
        action: "advance_turn",
        next: "w7_interview"
      }
    ]
  },

  "w7_interview": {
    speaker: "Online Interview",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "The interview window opens. A professor, an administrator, and someone whose camera is permanently off appear on screen. They ask why Minghai, why China, why this major. For a second, all your prepared answers sound like they belong to someone calmer.",
    choices: [
      {
        text: "Answer with your academic plan. [Academics +, Professor network +, Energy -]",
        next: "w7_submission",
        effects: {
          stats: { academics: 10, energy: -8 },
          guanxi: { professors: 5 },
          flags: { interview_academic: true }
        }
      },
      {
        text: "Answer with curiosity about living and learning in China. [Culture +, Chinese +]",
        next: "w7_submission",
        effects: {
          stats: { culture: 8, chinese: 5 },
          guanxi: { localStudents: 3 },
          flags: { interview_culture: true }
        }
      },
      {
        text: "Answer honestly: you are nervous because this matters. [Admin network +, Professor network +]",
        next: "w7_submission",
        effects: {
          stats: { energy: -3 },
          guanxi: { professors: 3, admin: 3 },
          flags: { interview_honest: true }
        }
      }
    ]
  },

  "w7_submission": {
    speaker: "Application Portal",
    bgImage: '/images/simulator/backgrounds/bg_application_laptop.jpg',
    location: "Home Country",
    text: "The submit button is blue, ordinary, and completely unreasonable. You hover over it long enough for the screen to dim. Months of wanting, explaining, scanning, translating, and pretending to be organized have become one click.",
    choices: [
      {
        text: "Submit after one final check. [Digital +, Energy -]",
        next: "end_week7",
        effects: {
          stats: { digitalProficiency: 5, energy: -5 },
          flags: { submitted_carefully: true, completed_application: true, decision_e1_submit: "Careful final submission" }
        }
      },
      {
        text: "Submit now before fear invents another problem. [Energy +]",
        next: "end_week7",
        effects: {
          stats: { energy: 5 },
          flags: { submitted_impulsively: true, completed_application: true, decision_e1_submit: "Submitted before overthinking" }
        }
      },
      {
        text: "Ask the international office to confirm one last detail. [Admin network +, Energy -]",
        next: "end_week7",
        effects: {
          stats: { energy: -5 },
          guanxi: { admin: 5 },
          flags: { submitted_with_admin_help: true, completed_application: true, decision_e1_submit: "Submitted with admin help" }
        }
      }
    ]
  },

  "end_week7": {
    speaker: "System",
    location: "Home Country",
    text: "Week 7 ends with your application submitted. For the first time in weeks, there is nothing obvious to fix. This is somehow worse.",
    choices: [
      {
        text: "Continue to Week 8.",
        next: "w8_result"
      }
    ]
  },

  "w8_result": {
    speaker: "Email Notification",
    bgImage: '/images/simulator/cg/cg_admission_email.jpg',
    location: "Home Country",
    text: "The email arrives while you are doing something completely ordinary. For a second, you only see the subject line: Minghai University Undergraduate Admission Result. Your hand goes cold before your brain catches up.",
    choices: [
      {
        text: "Open it immediately.",
        next: "w8_acceptance",
        effects: {
          stats: { energy: -5 },
          flags: { result_opened_immediately: true }
        }
      },
      {
        text: "Wait five minutes because your life deserves dramatic timing. [Energy +]",
        next: "w8_acceptance",
        effects: {
          stats: { energy: 3 },
          flags: { result_delayed_opening: true }
        }
      }
    ]
  },

  "w8_acceptance": {
    speaker: "Minghai University",
    bgImage: '/images/simulator/cg/cg_admission_email.jpg',
    location: "Home Country",
    text: "Accepted. The word is smaller than it should be. No fireworks, no music, just a line of text that rearranges your year. Shanghai is no longer a possibility. It is a date, a campus, a dormitory room, and a version of yourself waiting somewhere ahead.",
    choices: [
      {
        text: "Accept the offer and start the pre-departure checklist. [Admin network +, Energy +]",
        next: "w8_return_departure_eve",
        effects: {
          stats: { energy: 10 },
          guanxi: { admin: 5 },
          flags: { admitted_minghai: true, accepted_offer: true }
        }
      }
    ]
  },

  "w8_return_departure_eve": {
    speaker: "Departure Eve",
    bgImage: '/images/simulator/backgrounds/bg_departure_eve_room.jpg',
    location: "Home Country",
    text: "Back in your room, the admission letter is no longer just paper. It is proof that one part of the story already happened. Your suitcase is still open. Your phone buzzes again. The next memory waits in the pile of visa papers.",
    choices: [
      {
        text: "Continue to pre-departure memories.",
        action: "advance_turn",
        next: "pre_departure_start"
      }
    ]
  }
};
