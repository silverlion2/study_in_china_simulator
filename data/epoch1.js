export const epoch1Events = {
  "start": {
    speaker: "Simulator Tutorial",
    text: "Welcome to Sim Panda! Before your journey begins, let's briefly go over the systems you'll be managing on the left panel.",
    choices: [
      {
        text: "Okay, show me the basics.",
        next: "tutorial_stats"
      },
      {
        text: "I already know how to play. Skip Tutorial.",
        next: "char_creation_origin"
      }
    ]
  },
  "tutorial_stats": {
    speaker: "Simulator Tutorial",
    text: "First: Your Primary Stats. 'Sanity' and 'Wealth' are your lifelines. If either drops to 0, it's Game Over! Academics, Chinese, Digital Proficiency, and Culture will unlock specific events and choices.",
    choices: [
      {
        text: "Got it. What's the Guanxi Network?",
        next: "tutorial_guanxi"
      }
    ]
  },
  "tutorial_guanxi": {
    speaker: "Simulator Tutorial",
    text: "Guanxi (Relationships/Network) is crucial in China. Building strong ties with Professors, Administrators, and Students will open secret opportunities and paths.",
    choices: [
      {
        text: "Makes sense. How does time pass?",
        next: "tutorial_time"
      }
    ]
  },
  "tutorial_time": {
    speaker: "Simulator Tutorial",
    text: "Almost every major action advances the 'Turn' (Week). Every week, you'll naturally lose Sanity from stress and Wealth from living costs. You must balance grinding with resting!",
    choices: [
      {
        text: "I understand the risks.",
        next: "tutorial_choices"
      }
    ]
  },
  "tutorial_choices": {
    speaker: "Simulator Tutorial",
    text: "Finally, every decision you make—from your background to how you study—leaves a permanent mark. These choices will shape the characters you meet, the opportunities that arise, and the endings you unlock. Choose wisely!",
    choices: [
      {
        text: "I'm ready. Let's create my character!",
        next: "char_creation_origin"
      }
    ]
  },
  "char_creation_origin": {
    speaker: "Character Creation",
    text: "First, where are you from? This will affect your starting language base and cultural shock.",
    choices: [
      {
        text: "Neighboring Country (Southeast Asia / East Asia) [Culture ++, Chinese +]",
        next: "char_creation_gender",
        effects: { stats: { culture: 15, chinese: 10 }, flags: { "origin_asian": true } }
      },
      {
        text: "Western World (Europe / North America / Oceania) [Wealth ++, Chinese -]",
        next: "char_creation_gender",
        effects: { stats: { wealth: 5000, chinese: -5 }, flags: { "origin_western": true } }
      },
      {
        text: "Developing Nation (Africa / South America / etc) [Academics ++, Sanity ++, Wealth -]",
        next: "char_creation_gender",
        effects: { stats: { academics: 15, sanity: 20, wealth: -2000 }, flags: { "origin_developing": true } }
      }
    ]
  },
  "char_creation_gender": {
    speaker: "Character Creation",
    text: "What is your gender? This might occasionally affect dorm assignments and certain social dynamics.",
    choices: [
      {
        text: "Male",
        next: "char_creation_economy",
        effects: { flags: { "gender_male": true } }
      },
      {
        text: "Female",
        next: "char_creation_economy",
        effects: { flags: { "gender_female": true } }
      },
      {
        text: "Non-binary / Other",
        next: "char_creation_economy",
        effects: { flags: { "gender_nonbinary": true } }
      }
    ]
  },
  "char_creation_economy": {
    speaker: "Character Creation",
    text: "Finally, what is your financial background? This dictates how stressful your journey might be.",
    choices: [
      {
        text: "Government Funded / Full Scholarship (Secure, but needs high grades) [Wealth +, Academics +]",
        next: "epoch1_start",
        effects: { stats: { wealth: 1000, academics: 10 }, guanxi: { admin: 5 }, flags: { "finance_scholarship": true } }
      },
      {
        text: "Wealthy Family / Self-Funded (Rich but distracted) [Wealth +++, Academics -]",
        next: "epoch1_start",
        effects: { stats: { wealth: 20000, sanity: 20, academics: -10 }, flags: { "finance_rich": true } }
      },
      {
        text: "Working Student / Budget Hustler (Low budget, High resilience) [Wealth -, Culture +]",
        next: "epoch1_start",
        effects: { stats: { wealth: -2000, sanity: 15, culture: 10 }, flags: { "finance_working": true } }
      }
    ]
  },
  "epoch1_start": {
    speaker: "System",
    text: "Welcome to Year 1, Week 1. You've decided to apply to a Chinese university. The deadline is looming, and you need to get your documents in order.",
    choices: [
      {
        text: "Log into the CSC Scholarship Portal and start grinding.",
        next: "csc_portal_1",
        effects: {
          stats: { sanity: -10, digitalProficiency: +5 },
          flags: { "started_csc": true, "decision_e1_start": "Grinded CSC Portal" }
        }
      },
      {
        text: "Browse Xiaohongshu for campus vlogs instead.",
        next: "procrastinate_1",
        effects: {
          stats: { sanity: +10, chinese: +2 },
          flags: { "decision_e1_start": "Procrastinated on Xiaohongshu" }
        }
      }
    ]
  },
  "csc_portal_1": {
    speaker: "Inner Voice",
    text: "The portal requires a 800-word study plan in Chinese or English. And two recommendation letters. You only have one.",
    choices: [
      {
        text: "Draft the plan immediately using DeepSeek.",
        next: "study_plan_ai",
        effects: {
          stats: { academics: +5, digitalProficiency: +5 },
          flags: { "decision_e1_plan": "AI Perfection" }
        }
      },
      {
        text: "Draft it manually to practice.",
        next: "study_plan_manual",
        effects: {
          stats: { chinese: +10, sanity: -15, academics: +10 },
          flags: { "decision_e1_plan": "Authentic Manually Written" }
        }
      }
    ]
  },
  "procrastinate_1": {
    speaker: "Inner Voice",
    text: "You spent 4 hours watching videos of Peking University canteens. You feel motivated, but time is ticking.",
    choices: [
      {
        text: "Okay, back to work.",
        next: "csc_portal_1",
        effects: {
           stats: { sanity: -5 }
        }
      }
    ]
  },
  "study_plan_ai": {
    speaker: "Professor Lin (Email)",
    text: "I read your draft. It's suspiciously perfect but lacks your true voice. I will sign my recommendation letter, but you must revise it.",
    choices: [
      {
        text: "Thank you, Professor.",
        next: "end_week_1",
        effects: {
          guanxi: { professors: +5 }
        }
      }
    ]
  },
  "study_plan_manual": {
    speaker: "Professor Lin (Email)",
    text: "Your Chinese phrasing is awkward, but I appreciate the obvious effort. I've signed your recommendation letter.",
    choices: [
      {
        text: "Thank you, Professor.",
        next: "end_week_1",
        effects: {
          guanxi: { professors: +15 }
        }
      }
    ]
  },
  "end_week_1": {
    speaker: "System",
    text: "That took up the entire week. You're exhausted but making progress.",
    choices: [
      {
        text: "End Turn (Advance to Week 2)",
        action: "advance_turn",
        next: "week_2_start",
        effects: {
           stats: { sanity: +20 } // Resting
        }
      }
    ]
  },
  "week_2_start": {
    speaker: "System",
    text: "Week 2. You need to prepare your Foreigner Physical Examination Form. This is notoriously tricky since local doctors rarely see this specific bilingual form.",
    choices: [
      {
         text: "Go to a local public hospital and try to explain the form to them.",
         next: "med_hospital_local",
         effects: {
            stats: { sanity: -15, wealth: -2 },
            flags: { "decision_e1_med": "Local Public Hospital" }
         }
      },
      {
         text: "Find an expensive international travel clinic that knows the procedure.",
         next: "med_hospital_intl",
         effects: {
            stats: { sanity: +5, wealth: -20 },
            flags: { "decision_e1_med": "Premium International Clinic" }
         }
      }
    ]
  },
  "med_hospital_local": {
    speaker: "Doctor Wang",
    text: "What is this paper? We don't use this stamp. You need to go to four different departments for blood, ECG, X-Ray, and vision. It will take all day.",
    choices: [
      {
         text: "Run around the hospital all day to get it done.",
         next: "med_check_done",
         effects: {
            stats: { sanity: -20, chinese: +5, academics: +2 }
         }
      }
    ]
  },
  "med_hospital_intl": {
    speaker: "Receptionist",
    text: "Ah yes, the China study visa medical check. We have a package for that. It will be done in 45 minutes, but it costs $300.",
    choices: [
      {
         text: "Pay the premium and enjoy the free coffee.",
         next: "med_check_done",
         effects: {
            stats: { sanity: +10 }
         }
      }
    ]
  },
  "med_check_done": {
    speaker: "System",
    text: "You've successfully got the doctor's signature and the official hospital stamp. Week 2 is over.",
    choices: [
      {
         text: "End Turn (Advance to Week 3)",
         action: "advance_turn",
         next: "week_3_start",
         effects: {
            stats: { sanity: +15 }
         }
      }
    ]
  },
  "week_3_start": {
    speaker: "System",
    text: "Week 3. The university requires an HSK (Chinese Proficiency Test) certificate or an equivalent language pledge. You have a mock test this week.",
    choices: [
      {
         text: "Lock yourself in your room and grind Anki flashcards for 10 hours a day.",
         next: "hsk_study_hard",
         effects: {
            stats: { sanity: -30, chinese: +25 },
            flags: { "decision_e1_hsk": "Hardcore Memorization" }
         }
      },
      {
         text: "Watch Chinese dramas with subtitles and call it 'immersion'.",
         next: "hsk_study_lazy",
         effects: {
            stats: { sanity: +15, chinese: +5 },
            flags: { "decision_e1_hsk": "Dramas Immersion" }
         }
      }
    ]
  },
  "hsk_study_hard": {
    speaker: "Inner Voice",
    text: "You are dreaming in Chinese characters. You aced the mock test, but you feel completely burned out.",
    choices: [
      {
         text: "End Turn (Advance to Week 4)",
         action: "advance_turn",
         next: "week_4_start",
         effects: {
            stats: { sanity: +10 }
         }
      }
    ]
  },
  "hsk_study_lazy": {
    speaker: "Inner Voice",
    text: "You barely passed the mock test, but you know a lot of dramatic historical vocabulary now. You say 'Your Majesty' to your cat.",
    choices: [
      {
         text: "End Turn (Advance to Week 4)",
         action: "advance_turn",
         next: "week_4_start",
         effects: {
            stats: { sanity: +20 }
         }
      }
    ]
  },
  "week_4_start": {
    speaker: "System",
    text: "Week 4. It's deadline week. You have all your documents: Study Plan, Medical Form, Recommendation Letters, and Transcripts.",
    choices: [
      {
         text: "Log into the CSC Portal and submit everything meticulously.",
         next: "csc_portal_final",
         effects: {
             stats: { sanity: -10, digitalProficiency: +5 }
         }
      }
    ]
  },
  "csc_portal_final": {
    speaker: "System",
    text: "The website is crashing because thousands of students are applying exactly on the deadline day. The server is timing out.",
    choices: [
      {
         text: "Keep refreshing frantically for 3 hours (lose sanity).",
         next: "application_result",
         effects: {
            stats: { sanity: -25 },
            flags: { "decision_e1_submit": "Brute Force Refresher" }
         }
      },
      {
         text: "Wait until 3:00 AM China Standard Time and try when the servers are quiet.",
         next: "application_result",
         effects: {
            stats: { sanity: -5, digitalProficiency: +15 },
            flags: { "decision_e1_submit": "Strategic 3AM Submission" }
         }
      }
    ]
  },
  "application_result": {
    speaker: "System",
    text: "The portal finally stops spinning...",
    choices: [
      {
         text: "Check Application Status...",
         next: "epoch_1_eval"
      }
    ]
  },
  "epoch_1_eval": {
    speaker: "System",
    text: "Let's see what happened.",
    choices: [
      {
         text: "Success! Status: 'In Progress'. Now, the waiting game begins.",
         condition: { stats: { sanity: { min: 1 }, digitalProficiency: { min: 5 } } },
         action: "advance_turn",
         next: "hub",
         effects: {
            flags: { "completed_application": true }
         }
      },
      {
         text: "Error 502: Bad Gateway. You didn't understand how to bypass the CDN cache. Deadline Missed.",
         condition: { stats: { digitalProficiency: { max: 4 } } },
         next: "ending_1_bureaucratic_void"
      },
      {
         text: "You passed out at your keyboard from stress. You woke up and the portal was closed. Deadline Missed.",
         condition: { stats: { sanity: { max: 0 } } },
         next: "ending_1_bureaucratic_void"
      }
    ]
  },
  "ending_1_bureaucratic_void": {
    speaker: "System",
    text: "ENDING 1/10: The Bureaucratic Void. Your application was never submitted. Try to better manage your sanity and technical skills next time.",
    choices: [
      {
         text: "End Epoch (Progress to Pre-Departure Phase)",
         action: "advance_turn",
         next: "hub",
         effects: {
            stats: { sanity: +50 },
            flags: { "completed_application": true }
         }
      }
    ]
  }
};
