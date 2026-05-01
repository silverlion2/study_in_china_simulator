// Evaluates conditions and triggers story nodes

const CHARACTER_DIALOGUE_DEFAULTS = {
  "Professor Lin": {
    routeFlag: "route_academic",
    guanxi: { professors: 1 },
    choices: [
      {
        text: "Ask for the method behind his criticism.",
        reply: "Good. Do not collect comments like weather. Convert them into a method you can repeat.",
        stats: { academics: 2, energy: -1 },
        friendship: 2
      },
      {
        text: "Admit what you still do not understand.",
        reply: "That is the first useful sentence today. Now we can work with the real problem.",
        stats: { academics: 2 },
        friendship: 3
      },
      {
        text: "Keep the conversation practical and ask for the next step.",
        reply: "Practical is acceptable. Just make sure practical does not become another word for avoidance.",
        stats: { academics: 1, digitalProficiency: 1 },
        friendship: 1
      }
    ]
  },
  "Dr. Mei": {
    routeFlag: "route_academic",
    guanxi: { professors: 1 },
    choices: [
      {
        text: "Ask what the scene is hiding beneath the obvious explanation.",
        reply: "Better. The obvious explanation is often just the lobby. Research starts when you enter the rooms behind it.",
        stats: { academics: 2, culture: 1 },
        friendship: 2
      },
      {
        text: "Name the ethical discomfort instead of smoothing it away.",
        reply: "Keep that discomfort close. It may be the only thing stopping your analysis from becoming decorative.",
        stats: { academics: 1, culture: 2, energy: -1 },
        friendship: 3
      },
      {
        text: "Ask how to turn messy notes into a responsible question.",
        reply: "First, stop making the notes prettier. Then ask what they make impossible to ignore.",
        stats: { academics: 2, digitalProficiency: 1 },
        friendship: 1
      }
    ]
  },
  "Sophie": {
    routeFlag: "route_intl",
    guanxi: { intlStudents: 1 },
    choices: [
      {
        text: "Answer honestly instead of performing being okay.",
        reply: "Thank you. That is harder than it sounds. We can keep this human, not heroic.",
        stats: { energy: 3 },
        friendship: 3
      },
      {
        text: "Offer practical help, then admit you also need some.",
        reply: "That is my favorite kind of help: mutual, slightly messy, and actually useful.",
        stats: { energy: 2, digitalProficiency: 1 },
        friendship: 2
      },
      {
        text: "Make a careful joke to keep the mood breathable.",
        reply: "Acceptable emotional management. I will allow the joke, but not the disappearance.",
        stats: { energy: 2, culture: 1 },
        friendship: 1
      }
    ]
  },
  "Xiao Chen": {
    routeFlag: "route_city",
    guanxi: { localStudents: 1 },
    choices: [
      {
        text: "Push him to test the idea with real students first.",
        reply: "Annoying. Correct. Fine, we test before pretending the spreadsheet is reality.",
        stats: { digitalProficiency: 3, energy: -1 },
        friendship: 3
      },
      {
        text: "Point out the user problem he is moving too fast past.",
        reply: "You are becoming dangerously useful. Speed without trust is just a faster way to lose people.",
        stats: { digitalProficiency: 2, culture: 1 },
        friendship: 2
      },
      {
        text: "Match his energy and suggest one small prototype.",
        reply: "Good. Small enough to build tonight, real enough to embarrass us tomorrow.",
        stats: { digitalProficiency: 2, energy: -2, wealth: 40 },
        friendship: 1
      }
    ]
  },
  "Neighbor Li": {
    routeFlag: "route_local",
    guanxi: { localStudents: 1 },
    choices: [
      {
        text: "Ask Li to explain the rule everyone assumes you already know.",
        reply: "Good question. The dangerous rules are always the ones nobody writes down.",
        stats: { culture: 2, chinese: 1 },
        friendship: 3
      },
      {
        text: "Offer to help without taking over the situation.",
        reply: "That is the correct shape of help. Not loud, not absent, useful.",
        stats: { culture: 2, energy: -1 },
        friendship: 2
      },
      {
        text: "Admit you are afraid of making the hallway awkward.",
        reply: "Everyone makes it awkward once. The skill is repairing quickly.",
        stats: { chinese: 1, energy: 1 },
        friendship: 1
      }
    ]
  },
  "Manager Zhang": {
    routeFlag: "route_career",
    guanxi: { admin: 1 },
    choices: [
      {
        text: "Ask for the legal and professional boundary first.",
        reply: "Good. Ambition is useful only when it knows where the walls are.",
        stats: { culture: 2, digitalProficiency: 1 },
        friendship: 3
      },
      {
        text: "Ask how to show evidence instead of sounding impressive.",
        reply: "Exactly. Impressive is a costume. Evidence is harder to fake.",
        stats: { digitalProficiency: 2, academics: 1 },
        friendship: 2
      },
      {
        text: "Give him the direct version of your plan and invite correction.",
        reply: "Better. Direct plans can be improved. Vague plans can only be applauded politely.",
        stats: { digitalProficiency: 2, energy: -1 },
        friendship: 1
      }
    ]
  },
  "Uncle Wang": {
    routeFlag: "route_local",
    guanxi: { localStudents: 1 },
    choices: [
      {
        text: "Tell the truth plainly, even if your Chinese is imperfect.",
        reply: "Good. Honest Chinese with mistakes is better than perfect silence.",
        stats: { chinese: 2, culture: 1 },
        friendship: 3
      },
      {
        text: "Ask what students usually misunderstand about this place.",
        reply: "They think the city is testing them. Mostly, it is just busy. People help if you learn how to ask.",
        stats: { culture: 2, energy: 1, wealth: -10 },
        friendship: 2
      },
      {
        text: "Joke with him and let the conversation stay warm.",
        reply: "Good. You are learning. Food first, philosophy second, panic never.",
        stats: { energy: 2, chinese: 1, wealth: -10 },
        friendship: 1
      }
    ]
  }
};

const CHARACTER_DIALOGUE_BY_NODE = {
  event_local_neighbor_li: [
    {
      text: "Ask which dorm rules matter before they become problems.",
      reply: "Laundry, deliveries, noise, aunties. Learn those four and the building becomes less mysterious.",
      effects: {
        stats: { culture: 2, chinese: 1 },
        guanxi: { localStudents: 1 },
        relationships: { "Neighbor Li": { friendship: 3 } },
        flags: { dialogue_neighbor_li_unwritten_rules: true, route_local: true }
      }
    },
    {
      text: "Admit you need the useful version, not the official version.",
      reply: "Good. Official information tells you where the office is. Useful information tells you when to go.",
      effects: {
        stats: { culture: 3, energy: 1 },
        relationships: { "Neighbor Li": { friendship: 2 } },
        flags: { dialogue_neighbor_li_useful_info: true, route_local: true }
      }
    }
  ],
  event_local_neighbor_li_trust: [
    {
      text: "Try the apology first, and let Li rescue the grammar only if needed.",
      reply: "That is brave enough. Repair is not about perfect Chinese. It is about not hiding.",
      effects: {
        stats: { chinese: 3, culture: 2, energy: -1 },
        guanxi: { localStudents: 1 },
        relationships: { "Neighbor Li": { friendship: 4 } },
        flags: { dialogue_neighbor_li_repair_first: true, route_local: true }
      }
    },
    {
      text: "Ask Li how to protect everyone's face while still being clear.",
      reply: "Say the problem small, the apology clear, and the future different. That is enough.",
      effects: {
        stats: { culture: 3, chinese: 1 },
        relationships: { "Neighbor Li": { friendship: 3 } },
        flags: { dialogue_neighbor_li_face_repair: true, route_local: true }
      }
    }
  ],
  event_local_neighbor_li_boundary: [
    {
      text: "Own the message instead of explaining why you meant well.",
      reply: "Good. Intentions are private. Repair is public.",
      effects: {
        stats: { culture: 3, energy: -1 },
        guanxi: { localStudents: 1 },
        relationships: { "Neighbor Li": { friendship: 3 } },
        flags: { dialogue_neighbor_li_own_repair: true, route_local: true }
      }
    },
    {
      text: "Ask what a better dorm-group reply would sound like.",
      reply: "Shorter. Softer. Less clever. The hallway does not need your essay.",
      effects: {
        stats: { chinese: 2, culture: 2 },
        relationships: { "Neighbor Li": { friendship: 2 } },
        flags: { dialogue_neighbor_li_group_chat_lesson: true, route_local: true }
      }
    }
  ],
  event_local_neighbor_li_festival: [
    {
      text: "Let people hand you boring tasks and do them well.",
      reply: "Exactly. Belonging is not announced. It is taped, carried, cleaned, and remembered.",
      effects: {
        stats: { culture: 4, energy: -1 },
        guanxi: { localStudents: 2 },
        relationships: { "Neighbor Li": { friendship: 4 } },
        flags: { dialogue_neighbor_li_boring_tasks: true, route_local: true }
      }
    },
    {
      text: "Ask Li to translate the aunties' instructions before you invent a disaster.",
      reply: "Smart. The aunties are not angry. They are just efficient in surround sound.",
      effects: {
        stats: { chinese: 3, culture: 2 },
        relationships: { "Neighbor Li": { friendship: 3 } },
        flags: { dialogue_neighbor_li_auntie_instructions: true, route_local: true }
      }
    }
  ],
  event_local_uncle_wang_story: [
    {
      text: "Ask what changed without asking him to make the past simple.",
      reply: "Good question. Cities do not become better or worse in one direction. They become more expensive in several directions.",
      effects: {
        stats: { culture: 3, chinese: 1 },
        relationships: { "Uncle Wang": { friendship: 3 } },
        flags: { dialogue_uncle_wang_city_change: true, route_local: true }
      }
    },
    {
      text: "Listen first, then ask why students still need places like this.",
      reply: "Because a campus teaches you courses. A table teaches you whether you can sit with people.",
      effects: {
        stats: { culture: 4, energy: 1, wealth: -10 },
        guanxi: { localStudents: 1 },
        relationships: { "Uncle Wang": { friendship: 4 } },
        flags: { dialogue_uncle_wang_table_meaning: true, route_local: true }
      }
    }
  ],
  event_local_uncle_wang_first: [
    {
      text: "Ask him to choose the safest order and teach you the words.",
      reply: "Good. First survive dinner. Then we discuss ambition.",
      effects: {
        stats: { chinese: 2, culture: 2, energy: 1 },
        relationships: { "Uncle Wang": { friendship: 3 } },
        flags: { dialogue_uncle_wang_safe_order: true, route_local: true }
      }
    },
    {
      text: "Joke that your spice tolerance is still waiting for a visa.",
      reply: "Then we give it temporary residence. Not permanent. Temporary.",
      effects: {
        stats: { energy: 2, culture: 1, wealth: -10 },
        relationships: { "Uncle Wang": { friendship: 2 } },
        flags: { dialogue_uncle_wang_spice_joke: true, route_local: true }
      }
    }
  ],
  event_local_uncle_wang_question: [
    {
      text: "Give the real answer, even if it is not ready for a brochure.",
      reply: "Good. Official reasons get you through forms. Real reasons get you through bad weeks.",
      effects: {
        stats: { culture: 3, energy: 2 },
        relationships: { "Uncle Wang": { friendship: 4 } },
        flags: { dialogue_uncle_wang_real_reason: true, route_local: true }
      }
    },
    {
      text: "Say you wanted a life big enough to make you nervous.",
      reply: "Then nervous is not the enemy. It is the receipt.",
      effects: {
        stats: { culture: 2, chinese: 2 },
        relationships: { "Uncle Wang": { friendship: 3 } },
        flags: { dialogue_uncle_wang_nervous_life: true, route_local: true }
      }
    }
  ],
  event_local_uncle_wang_regular: [
    {
      text: "Accept the saved seat without making a joke out of it.",
      reply: "Good. Some things are better when you do not scare them away with clever words.",
      effects: {
        stats: { culture: 3, energy: 2 },
        guanxi: { localStudents: 1 },
        relationships: { "Uncle Wang": { friendship: 4 } },
        flags: { dialogue_uncle_wang_saved_seat: true, route_local: true }
      }
    },
    {
      text: "Tell him this table became part of how you understand Shanghai.",
      reply: "Then remember it properly. Not as a postcard. As a place where people were eating.",
      effects: {
        stats: { culture: 4, chinese: 1 },
        relationships: { "Uncle Wang": { friendship: 4 } },
        flags: { dialogue_uncle_wang_shanghai_table: true, route_local: true }
      }
    }
  ],
  event_career_manager_panel: [
    {
      text: "Ask what trust looks like when a meeting gets confusing.",
      reply: "It looks like preparation, clear notes, and not pretending you understood what you did not.",
      effects: {
        stats: { culture: 2, digitalProficiency: 2 },
        guanxi: { admin: 1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_zhang_trust_in_meetings: true, route_career: true }
      }
    },
    {
      text: "Ask permission to send one specific follow-up question.",
      reply: "Good. One question means you have started thinking. Five usually means you want me to think for you.",
      effects: {
        stats: { digitalProficiency: 2, energy: -1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_zhang_specific_followup: true, route_career: true }
      }
    }
  ],
  event_career_manager_followup: [
    {
      text: "Rewrite the broad sentence into one measurable question.",
      reply: "Better. Specificity is not decoration. It is proof that you respect the reader.",
      effects: {
        stats: { digitalProficiency: 3, academics: 1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_zhang_measurable_question: true, route_career: true }
      }
    },
    {
      text: "Ask him which part of the legal path students underestimate.",
      reply: "Approval. Everyone likes the word opportunity. Fewer people respect the word approval.",
      effects: {
        stats: { culture: 2, digitalProficiency: 1 },
        guanxi: { admin: 1 },
        relationships: { "Manager Zhang": { friendship: 2 } },
        flags: { dialogue_zhang_approval_lesson: true, route_career: true }
      }
    }
  ],
  event_career_manager_zhang_trust: [
    {
      text: "Ask him to cut the resume until only useful evidence remains.",
      reply: "Good. A useful sentence survives contact with a busy person.",
      effects: {
        stats: { digitalProficiency: 3, culture: 1, energy: -1 },
        relationships: { "Manager Zhang": { friendship: 4 } },
        flags: { dialogue_zhang_resume_evidence: true, route_career: true }
      }
    },
    {
      text: "Admit you were trying to sound impressive because you felt behind.",
      reply: "Understandable. Still not useful. Feeling behind is not a strategy; evidence is.",
      effects: {
        stats: { academics: 1, culture: 2 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_zhang_impressive_fear: true, route_career: true }
      }
    }
  ],
  event_career_manager_zhang_boundaries: [
    {
      text: "Ask him to define the boundary before you chase the contact.",
      reply: "Correct order. A connection without a boundary is not a bridge. It is a liability.",
      effects: {
        stats: { culture: 3, digitalProficiency: 1 },
        guanxi: { admin: 1 },
        relationships: { "Manager Zhang": { friendship: 4 } },
        flags: { dialogue_zhang_boundary_first: true, route_career: true }
      }
    },
    {
      text: "Admit the shortcut sounded tempting because money is tight.",
      reply: "Then say money is tight. Do not disguise pressure as professionalism.",
      effects: {
        stats: { culture: 2, energy: 1 },
        relationships: { "Manager Zhang": { friendship: 2 } },
        flags: { dialogue_zhang_money_pressure_honesty: true, route_career: true, route_survival: true }
      }
    }
  ],
  event_career_manager_zhang_alumni_dinner: [
    {
      text: "Choose one useful conversation instead of collecting cards.",
      reply: "Good. A remembered question beats six forgotten handshakes.",
      effects: {
        stats: { culture: 3, digitalProficiency: 1 },
        guanxi: { admin: 2 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_zhang_one_conversation: true, route_career: true }
      }
    },
    {
      text: "Ask him how to leave the conversation cleanly after it works.",
      reply: "Excellent. Ending well is part of networking. Do not make people rescue themselves from you.",
      effects: {
        stats: { culture: 2, energy: 1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_zhang_exit_gracefully: true, route_career: true }
      }
    }
  ],
  event_career_manager_zhang_referral: [
    {
      text: "Promise to treat the referral as responsibility, not rescue.",
      reply: "Good. That sentence is the minimum price of the door.",
      effects: {
        stats: { culture: 3, digitalProficiency: 2 },
        guanxi: { admin: 2 },
        relationships: { "Manager Zhang": { friendship: 4 } },
        flags: { dialogue_zhang_referral_responsibility: true, route_career: true }
      }
    },
    {
      text: "Ask him what would make him regret opening the door.",
      reply: "Casualness. The fastest way to lose trust is to treat someone else's name as free.",
      effects: {
        stats: { culture: 4, energy: -1 },
        relationships: { "Manager Zhang": { friendship: 4 } },
        flags: { dialogue_zhang_referral_trust_cost: true, route_career: true }
      }
    }
  ],
  midterm_academic: [
    {
      text: "Ask Professor Lin to turn the panic into a method.",
      reply: "That is the right verb. Panic is weather. Method is architecture.",
      effects: {
        stats: { academics: 4, energy: -2 },
        guanxi: { professors: 1 },
        relationships: { "Professor Lin": { friendship: 3 } },
        flags: { dialogue_midterm_lin_method: true, route_academic: true }
      }
    },
    {
      text: "Admit that being foreign became an excuse to stop diagnosing the real gap.",
      reply: "Useful. Identity can explain pressure. It cannot replace work.",
      effects: {
        stats: { academics: 3, culture: 1 },
        relationships: { "Professor Lin": { friendship: 3 } },
        flags: { dialogue_midterm_lin_real_gap: true, route_academic: true }
      }
    }
  ],
  midterm_intl_support: [
    {
      text: "Tell Sophie you mean international-student okay, not actually okay.",
      reply: "Thank you for using the technical term correctly. Open the shared folder and eat a snack.",
      effects: {
        stats: { energy: 4 },
        guanxi: { intlStudents: 1 },
        relationships: { Sophie: { friendship: 4 } },
        flags: { dialogue_midterm_sophie_international_okay: true, route_intl: true }
      }
    },
    {
      text: "Offer to organize the notes so the next person panics less.",
      reply: "Practical kindness. My favorite kind, because it comes with headings.",
      effects: {
        stats: { digitalProficiency: 2, academics: 1 },
        relationships: { Sophie: { friendship: 3 } },
        flags: { dialogue_midterm_sophie_notes_kindness: true, route_intl: true }
      }
    }
  ],
  future_research: [
    {
      text: "Ask what boring data work teaches that prestige does not.",
      reply: "Patience, mostly. Also whether your curiosity survives boredom. That is an underrated test.",
      effects: {
        stats: { academics: 4, energy: -1 },
        guanxi: { professors: 1 },
        relationships: { "Professor Lin": { friendship: 3 } },
        flags: { dialogue_future_lin_boring_data: true, route_academic: true }
      }
    },
    {
      text: "Commit to returning next week even if the work is not glamorous.",
      reply: "Then we may have something. Research begins when glamour leaves and you stay.",
      effects: {
        stats: { academics: 3, culture: 1 },
        relationships: { "Professor Lin": { friendship: 4 } },
        flags: { dialogue_future_lin_return_next_week: true, route_academic: true }
      }
    }
  ],
  future_city_project: [
    {
      text: "Insist on ten real users before any big claim.",
      reply: "Fine. Ten users. One problem. No fantasy. You are terrible for my ego and good for the product.",
      effects: {
        stats: { digitalProficiency: 4, energy: -1 },
        relationships: { "Xiao Chen": { friendship: 4 } },
        flags: { dialogue_future_xiao_ten_users: true, route_city: true }
      }
    },
    {
      text: "Ask which part of the idea is legal, not just exciting.",
      reply: "Painful question. Necessary question. I hate that you are learning from Manager Zhang.",
      effects: {
        stats: { digitalProficiency: 2, culture: 2 },
        guanxi: { admin: 1 },
        relationships: { "Xiao Chen": { friendship: 3 } },
        flags: { dialogue_future_xiao_legal_excitement: true, route_city: true }
      }
    }
  ],
  future_intl_guide: [
    {
      text: "Add the mistakes you wish someone had normalized earlier.",
      reply: "Yes. A guide that only lists success is just another way to make people feel late.",
      effects: {
        stats: { culture: 2, digitalProficiency: 2 },
        guanxi: { intlStudents: 1 },
        relationships: { Sophie: { friendship: 4 } },
        flags: { dialogue_future_sophie_normalize_mistakes: true, route_intl: true }
      }
    },
    {
      text: "Make every section answer one real panic question.",
      reply: "Perfect. Panic questions are honest. They deserve better formatting.",
      effects: {
        stats: { digitalProficiency: 3, energy: 1 },
        relationships: { Sophie: { friendship: 3 } },
        flags: { dialogue_future_sophie_panic_questions: true, route_intl: true }
      }
    }
  ],
  event_research_assistant: [
    {
      text: "Ask Professor Lin what careful support work proves.",
      reply: "It proves whether you can be trusted with small things before asking for large ones.",
      effects: {
        stats: { academics: 3, energy: -1 },
        guanxi: { professors: 1 },
        relationships: { "Professor Lin": { friendship: 3 } },
        flags: { dialogue_legacy_lin_small_trust: true, route_academic: true }
      }
    },
    {
      text: "Accept that legal, boring work is still a real doorway.",
      reply: "Correct. Many useful doors are painted in administrative beige.",
      effects: {
        stats: { academics: 2, digitalProficiency: 1 },
        relationships: { "Professor Lin": { friendship: 2 } },
        flags: { dialogue_legacy_lin_admin_beige: true, route_academic: true }
      }
    }
  ],
  event_dr_mei: [
    {
      text: "Ask about the contradiction instead of the clean model.",
      reply: "Good. Contradiction is not a flaw in the scene. It is the scene refusing to be reduced.",
      effects: {
        stats: { academics: 3, culture: 1 },
        guanxi: { professors: 1 },
        relationships: { "Dr. Mei": { friendship: 3 } },
        flags: { dialogue_legacy_mei_contradiction: true, route_academic: true }
      }
    },
    {
      text: "Admit the messy model makes more sense than the exam answer.",
      reply: "Then protect that instinct. Exams reward clean lines; research asks why the lines wobble.",
      effects: {
        stats: { academics: 2, culture: 2 },
        relationships: { "Dr. Mei": { friendship: 2 } },
        flags: { dialogue_legacy_mei_messy_model: true, route_academic: true }
      }
    }
  ],
  event_dr_mei_lab: [
    {
      text: "Ask how to flag unclear translations responsibly.",
      reply: "Do not beautify uncertainty. Mark it clearly so the next reader knows where the ground is soft.",
      effects: {
        stats: { academics: 3, digitalProficiency: 1 },
        guanxi: { professors: 1 },
        relationships: { "Dr. Mei": { friendship: 3 } },
        flags: { dialogue_legacy_mei_translation_flags: true, route_academic: true }
      }
    },
    {
      text: "Say you can handle careful tasks before chasing breakthroughs.",
      reply: "Good. Breakthrough is often what people call careful work after it becomes visible.",
      effects: {
        stats: { academics: 2, energy: -1 },
        relationships: { "Dr. Mei": { friendship: 3 } },
        flags: { dialogue_legacy_mei_careful_tasks: true, route_academic: true }
      }
    }
  ],
  event_sophie: [
    {
      text: "Answer with the real version, not the performance version.",
      reply: "Thank you. That saves both of us twenty minutes of polite lying.",
      effects: {
        stats: { energy: 3 },
        guanxi: { intlStudents: 1 },
        relationships: { Sophie: { friendship: 3 } },
        flags: { dialogue_legacy_sophie_real_okay: true, route_intl: true }
      }
    },
    {
      text: "Ask her what she does when explaining takes too long.",
      reply: "Snacks, shared notes, and one friend who does not make me turn pain into a presentation.",
      effects: {
        stats: { energy: 2, culture: 1 },
        relationships: { Sophie: { friendship: 3 } },
        flags: { dialogue_legacy_sophie_no_presentation: true, route_intl: true }
      }
    }
  ],
  event_sophie_date: [
    {
      text: "Tell Sophie honest sounds better than dramatic tonight.",
      reply: "Good. Drama is cheap here. Honesty takes better timing.",
      effects: {
        stats: { energy: 3 },
        guanxi: { intlStudents: 1 },
        relationships: { Sophie: { friendship: 2, romance: 3 } },
        flags: { dialogue_legacy_sophie_honest_date: true, route_intl: true }
      }
    },
    {
      text: "Ask whether shared context can be enough for now.",
      reply: "For now is not small. For now is how most real things survive the week.",
      effects: {
        stats: { culture: 1, energy: 2 },
        relationships: { Sophie: { friendship: 3, romance: 2 } },
        flags: { dialogue_legacy_sophie_for_now: true, route_intl: true }
      }
    }
  ],
  event_xiao_chen: [
    {
      text: "Give him three complaints and ask which one is actually solvable.",
      reply: "Excellent. Complaints are infinite. Solvable complaints are the business model.",
      effects: {
        stats: { digitalProficiency: 3, culture: 1 },
        guanxi: { localStudents: 1 },
        relationships: { "Xiao Chen": { friendship: 3 } },
        flags: { dialogue_legacy_xiao_solvable_complaint: true, route_city: true }
      }
    },
    {
      text: "Warn him that international-student friction is not just a market.",
      reply: "Correct. It is a market only after it is a real person's bad afternoon.",
      effects: {
        stats: { digitalProficiency: 2, culture: 2 },
        relationships: { "Xiao Chen": { friendship: 3 } },
        flags: { dialogue_legacy_xiao_person_first: true, route_city: true }
      }
    }
  ],
  event_xiao_chen_business: [
    {
      text: "Define tiny as ten users and one honest failure report.",
      reply: "Harsh. Useful. I will put 'honest failure report' in the doc and pretend I invented it.",
      effects: {
        stats: { digitalProficiency: 3, energy: -1 },
        relationships: { "Xiao Chen": { friendship: 3 } },
        flags: { dialogue_legacy_xiao_tiny_pilot: true, route_city: true }
      }
    },
    {
      text: "Ask how the pilot protects users if the service breaks.",
      reply: "You are making this slower and better. I dislike both facts in different ways.",
      effects: {
        stats: { digitalProficiency: 2, culture: 1 },
        relationships: { "Xiao Chen": { friendship: 4 } },
        flags: { dialogue_legacy_xiao_user_protection: true, route_city: true }
      }
    }
  ],
  event_uncle_wang: [
    {
      text: "Ask Uncle Wang which mistakes are acceptable at the table.",
      reply: "Almost all. Refusing food politely is advanced. Pretending you are not hungry is foolish.",
      effects: {
        stats: { chinese: 2, culture: 2, energy: 1 },
        relationships: { "Uncle Wang": { friendship: 3 } },
        flags: { dialogue_legacy_wang_table_mistakes: true, route_local: true }
      }
    },
    {
      text: "Tell him eating makes your Chinese braver.",
      reply: "Then eat more. This is pedagogy.",
      effects: {
        stats: { chinese: 2, energy: 2, wealth: -10 },
        relationships: { "Uncle Wang": { friendship: 2 } },
        flags: { dialogue_legacy_wang_food_pedagogy: true, route_local: true }
      }
    }
  ],
  event_uncle_wang_baijiu: [
    {
      text: "Say thank you for not turning belonging into a test.",
      reply: "Good. Tests are for classrooms. Tables are for people.",
      effects: {
        stats: { culture: 3, energy: 2 },
        relationships: { "Uncle Wang": { friendship: 4 } },
        flags: { dialogue_legacy_wang_no_test: true, route_local: true }
      }
    },
    {
      text: "Choose tea and stay in the conversation.",
      reply: "Correct. Drinking less is not leaving. Leaving is leaving.",
      effects: {
        stats: { culture: 2, chinese: 1 },
        relationships: { "Uncle Wang": { friendship: 3 } },
        flags: { dialogue_legacy_wang_tea_boundary: true, route_local: true }
      }
    }
  ],
  event_manager_zhang: [
    {
      text: "Give the short, useful version of your Chinese introduction.",
      reply: "Better. You sound like a person, not a brochure that learned fear.",
      effects: {
        stats: { culture: 2, digitalProficiency: 2 },
        guanxi: { admin: 1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_legacy_zhang_short_intro: true, route_career: true }
      }
    },
    {
      text: "Ask how to be legally useful instead of merely impressive.",
      reply: "That is the question. Keep asking that and your resume may become less noisy.",
      effects: {
        stats: { digitalProficiency: 3, academics: 1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_legacy_zhang_legally_useful: true, route_career: true }
      }
    }
  ],
  event_manager_zhang_dinner: [
    {
      text: "Strip the plan of application language and say the real version.",
      reply: "Now we can work. Real plans have edges. Application language is fog.",
      effects: {
        stats: { culture: 3, digitalProficiency: 1 },
        guanxi: { admin: 1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_legacy_zhang_no_fog: true, route_career: true }
      }
    },
    {
      text: "Ask which requirement would quietly kill the internship path.",
      reply: "Documentation. It always sounds boring until it decides your future.",
      effects: {
        stats: { digitalProficiency: 3, energy: -1 },
        relationships: { "Manager Zhang": { friendship: 3 } },
        flags: { dialogue_legacy_zhang_documentation_risk: true, route_career: true }
      }
    }
  ],
  taobao_help: [
    {
      text: "Ask Li to explain what makes a seller trustworthy.",
      reply: "Reviews with photos, delivery dates, boring descriptions. Boring is beautiful when you need bedding tonight.",
      effects: {
        stats: { digitalProficiency: 2, culture: 1 },
        relationships: { "Neighbor Li": { friendship: 3 } },
        flags: { dialogue_taobao_li_seller_trust: true, route_local: true }
      }
    },
    {
      text: "Admit you almost bought the pillow with no neck rights.",
      reply: "Then today I save your neck. Later you save someone else's.",
      effects: {
        stats: { energy: 2, chinese: 1 },
        relationships: { "Neighbor Li": { friendship: 2 } },
        flags: { dialogue_taobao_li_neck_rights: true, route_local: true }
      }
    }
  ]
};

const buildDialogueResolvedFlag = (nodeId) => `dialogue_resolved_${nodeId}`;

const buildDialogueFlag = (nodeId, index) => `dialogue_choice_${nodeId}_${index + 1}`;

const buildDefaultDialogueChoices = (nodeId, node) => {
  const defaults = CHARACTER_DIALOGUE_DEFAULTS[node?.speaker];
  if (!defaults) return [];

  return defaults.choices.map((choice, index) => ({
    text: choice.text,
    reply: choice.reply,
    effects: {
      stats: choice.stats,
      guanxi: defaults.guanxi,
      relationships: { [node.speaker]: { friendship: choice.friendship } },
      flags: {
        [defaults.routeFlag]: true,
        [buildDialogueFlag(nodeId, index)]: true
      }
    }
  }));
};

const withDialogueResolvedFlag = (nodeId, choice) => ({
  ...choice,
  effects: {
    ...(choice.effects || {}),
    flags: {
      ...((choice.effects && choice.effects.flags) || {}),
      [buildDialogueResolvedFlag(nodeId)]: true
    }
  }
});

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

  getAvailableDialogueChoices(nodeId) {
    const node = this.events[nodeId];
    if (!node) return [];
    const state = this.engine.getState();
    if (state.flags?.[buildDialogueResolvedFlag(nodeId)]) return [];

    const dialogueChoices = node.dialogueChoices || CHARACTER_DIALOGUE_BY_NODE[nodeId] || buildDefaultDialogueChoices(nodeId, node);
    return dialogueChoices
      .filter(choice => this.checkCondition(choice.condition))
      .map(choice => withDialogueResolvedFlag(nodeId, choice));
  }

  // Apply a choice's consequences without moving to another node.
  applyChoiceEffects(choice) {
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

    // 7. Run a deterministic Life Check after the choice has shaped the moment.
    if (choice.effects && choice.effects.lifeCheck) {
       this.engine.runLifeCheck(choice.effects.lifeCheck);
    }
  }

  // Execute a choice's consequences
  executeChoice(choice) {
    this.applyChoiceEffects(choice);

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
