// The Core Weekly Hub and Event Pool Data

export const gameNodes = {
  // --- THE HUB ---
  "hub": {
    speaker: "Weekly Planner",
    bgImage: '/images/simulator/hub_bg.jpg',
    text: "It is the start of a new week at Minghai. Your year is no longer one big question; it is becoming a pattern. Which part of your life in China do you build this week?",
    choices: [
      {
        text: "📚 Academic Track",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_academic_track"
      },
      {
        text: "🧭 Local Integration",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_local_integration"
      },
      {
        text: "🌏 International Student Circle",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_international_circle"
      },
      {
        text: "💼 Career Bridge",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_career_bridge"
      },
      {
        text: "🏙️ Shanghai Opportunity",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_shanghai_opportunity"
      },
      {
        text: "🧾 Life Admin & Recovery",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_life_admin"
      },
      {
        text: "🕹️ City, Travel & Arcade Extras",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_extras"
      },
      {
         text: "😴 Rest & Recharge [Energy +]",
         action: "advance_turn",
         next: "hub",
         effects: { stats: { energy: 25 }, flags: { weekly_focus: "Rest and recovery" } }
      }
    ]
  },

  // --- SUBMENUS ---
  "submenu_academic_track": {
    speaker: "Academic Track",
    text: "This week can move your degree forward: coursework, office hours, research habits, and the quiet relationship-building that happens when professors see you keep showing up.",
    choices: [
      {
        text: "Plan a sustainable library study block. [Academics +, Energy +]",
        next: "event_academic_library_grind"
      },
      {
        text: "Visit Professor Lin's office hours. [Professor network +]",
        next: "event_academic_prof_lin"
      },
      {
        text: "Attend Dr. Mei's first research talk. [First contact]",
        condition: { flags: { met_dr_mei: false } },
        next: "event_academic_dr_mei_talk"
      },
      {
        text: "Follow up with Dr. Mei after the research talk. [Relationship +]",
        condition: { flags: { met_dr_mei: true, dr_mei_followup_ready: false, dr_mei_research_question: false } },
        next: "event_academic_dr_mei_followup"
      },
      {
        text: "Join a research reading group. [Requires route_academic]",
        condition: { flags: { route_academic: true } },
        next: "event_academic_reading_group"
      },
      {
        text: "Attend an almost-empty Friday lecture. [Story beat]",
        condition: { flags: { route_academic: true, academic_empty_lecture: false } },
        next: "event_academic_empty_lecture"
      },
      {
        text: "Let Professor Lin help you rebuild your academic method. [Professor Lin Trust]",
        condition: { flags: { lin_academic_method: false }, relationships: { "Professor Lin": { friendship: { min: 10 } } } },
        next: "event_academic_lin_method"
      },
      {
        text: "Discuss a research question with Dr. Mei. [Dr. Mei Trust]",
        condition: { flags: { dr_mei_research_question: false }, relationships: { "Dr. Mei": { friendship: { min: 10 } } } },
        next: "event_academic_dr_mei_project"
      },
      {
        text: "Talk through Professor Lin's blunt draft feedback. [Week 21-27, Relationship Tension]",
        condition: { turn: { min: 21, max: 27 }, flags: { lin_midterm_tension_resolved: false }, relationships: { "Professor Lin": { friendship: { min: 8 } } } },
        next: "event_academic_lin_feedback_tension"
      },
      {
        text: "Ask Dr. Mei what counts as respectful research. [Week 21-27, Relationship Tension]",
        condition: { turn: { min: 21, max: 27 }, flags: { dr_mei_midterm_tension_resolved: false }, relationships: { "Dr. Mei": { friendship: { min: 8 } } } },
        next: "event_academic_dr_mei_ethics_tension"
      },
      {
        text: "Polish Dr. Mei's conference abstract. [Week 25+, Dr. Mei Trust]",
        condition: { turn: { min: 25 }, flags: { dr_mei_project_trust: true, dr_mei_conference_abstract: false }, relationships: { "Dr. Mei": { friendship: { min: 18 } } } },
        next: "event_academic_dr_mei_conference_abstract"
      },
      {
        text: "Ask Professor Lin about a recommendation path. [Week 29+, Professor Lin Trust]",
        condition: { turn: { min: 29 }, flags: { lin_academic_method: true, lin_recommendation_ready: false }, relationships: { "Professor Lin": { friendship: { min: 20 } } } },
        next: "event_academic_lin_recommendation"
      },
      {
        text: "Commit to Dr. Mei's research project. [Week 29+, Dr. Mei Trust]",
        condition: { turn: { min: 29 }, flags: { dr_mei_research_question: true, dr_mei_project_commitment: false }, relationships: { "Dr. Mei": { friendship: { min: 20 } } } },
        next: "event_academic_dr_mei_project_commitment"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  "submenu_local_integration": {
    speaker: "Local Integration",
    text: "Local life is not a single breakthrough. It is a hundred small moments: ordering without panic, understanding a joke, knowing which gate stays open late, and being invited again.",
    choices: [
      {
        text: "Join a local classmate study group. [Chinese +, Local network +]",
        next: "event_local_study_group"
      },
      {
        text: "Ask Neighbor Li to explain dorm and campus routines. [Culture +, Relationship +]",
        next: "event_local_neighbor_li"
      },
      {
        text: "Practice canteen Chinese during the lunch rush. [Chinese +, Energy -]",
        next: "event_local_canteen_practice"
      },
      {
        text: "Run a neighborhood errand without switching to English. [Requires route_local]",
        condition: { flags: { route_local: true } },
        next: "event_local_neighborhood_errand"
      },
      {
        text: "Help at the dorm gate during a rainstorm. [Story beat]",
        condition: { flags: { route_local: true, local_rain_gate: false } },
        next: "event_local_rain_gate"
      },
      {
        text: "Help Neighbor Li handle a dorm misunderstanding. [Neighbor Li Trust]",
        condition: { flags: { neighbor_li_local_trust: false }, relationships: { "Neighbor Li": { friendship: { min: 10 } } } },
        next: "event_local_neighbor_li_trust"
      },
      {
        text: "Find Uncle Wang's late-night skewer stall near the dorm. [First contact]",
        condition: { flags: { met_uncle_wang: false }, stats: { wealth: { min: 35 } } },
        next: "event_local_uncle_wang_first"
      },
      {
        text: "Have a late-night street-table talk with Uncle Wang. [Local Trust]",
        condition: { flags: { route_local: true, met_uncle_wang: true, uncle_wang_neighborhood_story: false }, relationships: { "Uncle Wang": { friendship: { min: 6 } } } },
        next: "event_local_uncle_wang_story"
      },
      {
        text: "Join local classmates for KTV without hiding behind your phone. [Wealth -, Culture +]",
        condition: { flags: { route_local: true, local_ktv_night: false }, stats: { wealth: { min: 180 } } },
        next: "event_local_ktv_night"
      },
      {
        text: "Repair a dorm boundary misunderstanding with Neighbor Li. [Week 21-27, Relationship Tension]",
        condition: { turn: { min: 21, max: 27 }, flags: { neighbor_li_midterm_tension_resolved: false }, relationships: { "Neighbor Li": { friendship: { min: 8 } } } },
        next: "event_local_neighbor_li_boundary"
      },
      {
        text: "Answer Uncle Wang's question about why you came here. [Week 21-27, Relationship Tension]",
        condition: { turn: { min: 21, max: 27 }, flags: { uncle_wang_midterm_tension_resolved: false }, relationships: { "Uncle Wang": { friendship: { min: 8 } } } },
        next: "event_local_uncle_wang_question"
      },
      {
        text: "Join Neighbor Li's neighborhood festival prep. [Week 25+, Neighbor Li Trust]",
        condition: { turn: { min: 25 }, flags: { neighbor_li_local_trust: true, neighbor_li_festival_invite: false }, relationships: { "Neighbor Li": { friendship: { min: 20 } } } },
        next: "event_local_neighbor_li_festival"
      },
      {
        text: "Become a regular at Uncle Wang's table. [Week 29+, Local Trust]",
        condition: { turn: { min: 29 }, flags: { uncle_wang_neighborhood_story: true, uncle_wang_regular: false }, relationships: { "Uncle Wang": { friendship: { min: 20 } } } },
        next: "event_local_uncle_wang_regular"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  "submenu_international_circle": {
    speaker: "International Student Circle",
    text: "The international circle can become a bubble, a safety net, or both. This week, you can decide whether it helps you hide from Minghai or helps you stay brave enough to meet it.",
    choices: [
      {
        text: "Host a practical check-in dinner with Sophie. [Energy +, Intl network +]",
        next: "event_intl_sophie_checkin"
      },
      {
        text: "Help a newer student decode campus admin. [Intl network +, Digital +]",
        next: "event_intl_new_student_help"
      },
      {
        text: "Share honest notes about homesickness. [Energy +, Relationship +]",
        next: "event_intl_homesick_night"
      },
      {
        text: "Update the incoming-student guide. [Requires route_intl]",
        condition: { flags: { route_intl: true } },
        next: "event_intl_guide_update"
      },
      {
        text: "Make a comfort meal in the common room. [Story beat]",
        condition: { flags: { route_intl: true, intl_common_room_meal: false }, stats: { wealth: { min: 60 } } },
        next: "event_intl_common_room_meal"
      },
      {
        text: "Ask Sophie what support should look like next semester. [Sophie Trust]",
        condition: { flags: { sophie_support_circle: false }, relationships: { Sophie: { friendship: { min: 12 } } } },
        next: "event_intl_sophie_support_circle"
      },
      {
        text: "Do a language-exchange night with Sophie. [Chinese +, Relationship +]",
        condition: { flags: { sophie_language_exchange: false }, relationships: { Sophie: { friendship: { min: 8 } } } },
        next: "event_intl_sophie_language_exchange"
      },
      {
        text: "Talk with Sophie about whether the group is becoming a bubble. [Week 21-27, Relationship Tension]",
        condition: { turn: { min: 21, max: 27 }, flags: { sophie_midterm_tension_resolved: false }, relationships: { Sophie: { friendship: { min: 8 } } } },
        next: "event_intl_sophie_bubble_tension"
      },
      {
        text: "Help Sophie pitch an orientation committee. [Week 25+, Sophie Trust]",
        condition: { turn: { min: 25 }, flags: { sophie_support_circle: true, sophie_orientation_committee: false }, relationships: { Sophie: { friendship: { min: 20 } } } },
        next: "event_intl_sophie_orientation_committee"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  "submenu_career_bridge": {
    speaker: "Career Bridge",
    text: "Career work in China is a second curriculum: documents, timing, approval, soft introductions, and learning which shortcuts are actually traps.",
    choices: [
      {
        text: "Meet the career office about legal internship steps. [Admin network +, Digital +]",
        next: "event_career_office"
      },
      {
        text: "Localize your resume for China-facing opportunities. [Digital +, Academics +]",
        next: "event_career_resume"
      },
      {
        text: "Attend Manager Zhang's first recruiting panel. [First contact]",
        condition: { flags: { met_manager_zhang: false } },
        next: "event_career_manager_panel"
      },
      {
        text: "Send Manager Zhang a careful post-panel follow-up. [Relationship +]",
        condition: { flags: { met_manager_zhang: true, manager_zhang_followup_ready: false, manager_zhang_career_trust: false } },
        next: "event_career_manager_followup"
      },
      {
        text: "Prepare an internship application package. [Requires route_career]",
        condition: { flags: { route_career: true } },
        next: "event_career_application_package"
      },
      {
        text: "Sit through a brutally useful mock interview. [Story beat]",
        condition: { flags: { route_career: true, career_mock_interview: false } },
        next: "event_career_mock_interview"
      },
      {
        text: "Repair the shortcut impression before it follows you. [Risk repair]",
        condition: { flags: { career_shortcut_temptation: true, career_shortcut_repaired: false } },
        next: "event_career_shortcut_repair"
      },
      {
        text: "Ask Manager Zhang for candid career feedback. [Manager Zhang Trust]",
        condition: { flags: { manager_zhang_career_trust: false }, relationships: { "Manager Zhang": { friendship: { min: 10 } } } },
        next: "event_career_manager_zhang_trust"
      },
      {
        text: "Clarify boundaries after Manager Zhang warns you about shortcuts. [Week 21-27, Relationship Tension]",
        condition: { turn: { min: 21, max: 27 }, flags: { manager_zhang_midterm_tension_resolved: false }, relationships: { "Manager Zhang": { friendship: { min: 8 } } } },
        next: "event_career_manager_zhang_boundaries"
      },
      {
        text: "Attend an alumni dinner with Manager Zhang. [Week 25+, Wealth -, Career +]",
        condition: { turn: { min: 25 }, flags: { manager_zhang_career_trust: true, manager_zhang_alumni_dinner: false }, stats: { wealth: { min: 180 } }, relationships: { "Manager Zhang": { friendship: { min: 18 } } } },
        next: "event_career_manager_zhang_alumni_dinner"
      },
      {
        text: "Ask Manager Zhang about a real referral path. [Week 29+, Manager Zhang Trust]",
        condition: { turn: { min: 29 }, flags: { manager_zhang_career_trust: true, manager_zhang_referral_ready: false }, relationships: { "Manager Zhang": { friendship: { min: 20 } } } },
        next: "event_career_manager_zhang_referral"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  "submenu_shanghai_opportunity": {
    speaker: "Shanghai Opportunity",
    text: "Shanghai keeps offering ideas before you know whether they are good ones. The trick is to test small, learn fast, and not mistake motion for direction.",
    choices: [
      {
        text: "Map small campus needs with Xiao Chen. [Digital +, Relationship +]",
        next: "event_city_xiao_chen_survey"
      },
      {
        text: "Test a tiny cross-border product idea. [Wealth +, Energy -]",
        next: "event_city_micro_store"
      },
      {
        text: "Spend an afternoon observing Lujiazui's work rhythm. [Culture +, Career +]",
        next: "event_city_lujiazui_observation"
      },
      {
        text: "Prototype a student-service mini project. [Requires route_city]",
        condition: { flags: { route_city: true } },
        next: "event_city_student_service"
      },
      {
        text: "Read user complaints after a broken QR night. [Story beat]",
        condition: { flags: { route_city: true, city_qr_complaint_night: false } },
        next: "event_city_qr_complaint_night"
      },
      {
        text: "Repair the prototype reliability debt. [Risk repair]",
        condition: { flags: { city_reliability_debt: true, city_reliability_repaired: false }, stats: { wealth: { min: 120 } } },
        next: "event_city_reliability_repair"
      },
      {
        text: "Build the next prototype with Xiao Chen. [Xiao Chen Trust]",
        condition: { flags: { xiao_chen_city_prototype: false }, relationships: { "Xiao Chen": { friendship: { min: 12 } } } },
        next: "event_city_xiao_chen_prototype"
      },
      {
        text: "Argue with Xiao Chen about speed versus responsibility. [Week 21-27, Relationship Tension]",
        condition: { turn: { min: 21, max: 27 }, flags: { xiao_chen_midterm_tension_resolved: false }, relationships: { "Xiao Chen": { friendship: { min: 8 } } } },
        next: "event_city_xiao_chen_speed_tension"
      },
      {
        text: "Draft an international-user memo with Xiao Chen. [Week 25+, Xiao Chen Trust]",
        condition: { turn: { min: 25 }, flags: { xiao_chen_project_trust: true, xiao_chen_global_angle: false }, relationships: { "Xiao Chen": { friendship: { min: 18 } } } },
        next: "event_city_xiao_chen_global_angle"
      },
      {
        text: "Prepare a demo day with Xiao Chen. [Week 29+, Xiao Chen Trust]",
        condition: { turn: { min: 29 }, flags: { xiao_chen_city_prototype: true, xiao_chen_demo_day: false }, relationships: { "Xiao Chen": { friendship: { min: 20 } } } },
        next: "event_city_xiao_chen_demo_day"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  "submenu_life_admin": {
    speaker: "Life Admin & Recovery",
    text: "Not every meaningful week looks impressive. Some weeks are won by laundry, budget spreadsheets, residence-permit reminders, and sleeping before your body starts negotiating with you.",
    choices: [
      {
        text: "Rest properly and protect next week. [Energy +]",
        action: "advance_turn",
        next: "hub",
        effects: { stats: { energy: 30 }, flags: { weekly_focus: "Proper rest" } }
      },
      {
        text: "Review your budget and reduce avoidable spending. [Wealth +, Digital +]",
        next: "event_admin_budget_review"
      },
      {
        text: "Study practical Chinese at home. [Chinese +, Academics +, Energy -]",
        next: "event_admin_chinese_selfstudy"
      },
      {
        text: "Handle campus office tasks before they become urgent. [Admin network +]",
        next: "event_admin_campus_tasks"
      },
      {
        text: "Check whether your Shanghai housing choice is actually working. [Housing follow-up]",
        condition: { flags: { has_housing: true, housing_followup_done: false } },
        next: "event_admin_housing_followup"
      },
      {
        text: "Repair the housing friction before it becomes your whole semester. [Housing risk]",
        condition: { flags: { housing_friction_debt: true, housing_friction_repaired: false } },
        next: "event_admin_housing_repair"
      },
      {
        text: "Clean up an unapproved work risk before it becomes a case. [Risk repair]",
        condition: { flags: { unapproved_work_risk: true, compliance_cleanup_done: false } },
        next: "event_admin_compliance_cleanup"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  "submenu_extras": {
    speaker: "City, Travel & Arcade Extras",
    text: "These are optional side activities: useful, fun, sometimes expensive, and not always aligned with your main direction.",
    choices: [
      {
        text: "🎉 Entertainment & Culture",
        next: "submenu_entertainment"
      },
      {
        text: "🚄 Weekend Travel",
        next: "submenu_travel"
      },
      {
        text: "💼 Money & Compliance",
        next: "submenu_hustle"
      },
      {
        text: "🤝 Socialize & Network",
        next: "submenu_social"
      },
      {
        text: "📍 Explore Local Districts",
        next: "submenu_districts"
      },
      {
        text: "🗣️ Language Partner (Tonal Rhythm Game)",
        action: "advance_turn",
        next: "minigame_tones",
        effects: { stats: { energy: 5, wealth: -20 }, guanxi: { localStudents: 2 } }
      },
      {
        text: "🥡 Order Waimai (Delivery Typer Game)",
        action: "advance_turn",
        next: "minigame_delivery"
      },
      {
        text: "🏢 Campus Admin Rush (Bike Scramble Game)",
        action: "advance_turn",
        next: "minigame_bike"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  // --- ROUTE EVENTS: ACADEMIC TRACK ---
  "event_academic_library_grind": {
    speaker: "Minghai Library",
    text: "You claim a desk near the window, choose the week's key material, and stop before your brain turns to static. It feels less heroic than grinding all night. It also works better.",
    choices: [
      {
        text: "Leave with notes that finally make sense and energy for tomorrow.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 5, energy: 2 },
          guanxi: { professors: 2 },
          flags: { weekly_focus: "Sustainable library study", route_academic: true }
        }
      }
    ]
  },

  "event_academic_prof_lin": {
    speaker: "Professor Lin",
    text: "Professor Lin does not solve the assignment for you. He does something more useful and more annoying: he asks the exact question your draft has been avoiding.",
    choices: [
      {
        text: "Revise the work instead of defending it.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 7, energy: -2 },
          guanxi: { professors: 8 },
          relationships: { "Professor Lin": { friendship: 6 } },
          flags: { weekly_focus: "Professor Lin office hours", route_academic: true }
        }
      }
    ]
  },

  "event_academic_dr_mei_talk": {
    speaker: "Dr. Mei",
    text: "Dr. Mei's talk begins with theory and ends with a Shanghai case study that makes the theory feel suddenly dangerous. Afterward, you wait by the lectern while other students ask polished questions. When your turn comes, she does not smile much, but she listens like your question may actually matter.",
    choices: [
      {
        text: "Ask one specific question and save her contact channel.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 6, culture: 3, energy: -2 },
          relationships: { "Dr. Mei": { friendship: 7 } },
          flags: { weekly_focus: "Dr. Mei first research talk", route_academic: true, met_dr_mei: true, wechat_dr_mei_added: true }
        }
      }
    ]
  },

  "event_academic_dr_mei_followup": {
    speaker: "Dr. Mei",
    text: "Your follow-up message is shorter than your nervous draft. Dr. Mei replies with a reading list, one warning about vague claims, and a line that feels like an invitation: 'If this still bothers you after reading, come discuss it.'",
    choices: [
      {
        text: "Read enough to deserve the next conversation.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 6, culture: 2, energy: -3 },
          guanxi: { professors: 4 },
          relationships: { "Dr. Mei": { friendship: 5 } },
          flags: { weekly_focus: "Dr. Mei follow-up reading", route_academic: true, dr_mei_followup_ready: true }
        }
      }
    ]
  },

  "event_academic_reading_group": {
    speaker: "Research Reading Group",
    text: "The reading group is small, serious, and allergic to vague opinions. For two hours, you watch students disagree with precision. It is intimidating until you realize precision can be learned.",
    choices: [
      {
        text: "Bring one clear argument to the table.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 12, chinese: 3, energy: -5 },
          guanxi: { professors: 6, localStudents: 3 },
          flags: { weekly_focus: "Research reading group", route_academic: true, academic_route_deepened: true }
        }
      }
    ]
  },

  "event_academic_empty_lecture": {
    speaker: "Friday Lecture Hall",
    text: "The lecture hall is almost empty because the topic sounds boring and the rain outside gives everyone an excuse. The professor still speaks like the room is full. Halfway through, a small concept clicks into place so quietly that nobody applauds, but you write it down like a secret.",
    choices: [
      {
        text: "Stay until the end and ask one careful question.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 4, energy: -2 },
          guanxi: { professors: 3 },
          flags: { weekly_focus: "Almost-empty Friday lecture", route_academic: true, academic_empty_lecture: true }
        }
      }
    ]
  },

  "event_academic_lin_method": {
    speaker: "Professor Lin",
    text: "Professor Lin looks over your notes and circles the same weakness three times: you collect information faster than you turn it into an argument. 'This is common,' he says. 'Now make it less common in your work.'",
    choices: [
      {
        text: "Build the revision method into your weekly routine.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 10, energy: -4 },
          guanxi: { professors: 8 },
          relationships: { "Professor Lin": { friendship: 10 } },
          flags: { weekly_focus: "Professor Lin academic method", route_academic: true, lin_academic_method: true }
        }
      }
    ]
  },

  "event_academic_dr_mei_project": {
    speaker: "Dr. Mei",
    text: "Dr. Mei does not hand you a topic. She hands you a problem: a messy Shanghai case where theory explains half the picture and lived reality explains the rest. 'If you can stay with the contradiction,' she says, 'there may be a project here.'",
    choices: [
      {
        text: "Turn the contradiction into a research question.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 12, culture: 5, energy: -5 },
          guanxi: { professors: 6 },
          relationships: { "Dr. Mei": { friendship: 10 } },
          flags: { weekly_focus: "Dr. Mei research question", route_academic: true, dr_mei_research_question: true, dr_mei_project_trust: true }
        }
      }
    ]
  },

  "event_academic_lin_feedback_tension": {
    speaker: "Professor Lin",
    text: "Professor Lin returns your draft with comments that are useful, precise, and personally devastating. The first sentence says your argument is not wrong. The second sentence says it is not yet an argument.",
    choices: [
      {
        text: "Ask what he is trying to teach, not whether he is disappointed.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 6, energy: -5 },
          guanxi: { professors: 6 },
          relationships: { "Professor Lin": { friendship: 6 } },
          flags: { weekly_focus: "Professor Lin feedback repair", route_academic: true, lin_feedback_repaired: true, lin_midterm_tension_resolved: true }
        }
      },
      {
        text: "Retreat and fix the draft alone before facing him again.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 4, energy: -2 },
          guanxi: { professors: 1 },
          relationships: { "Professor Lin": { friendship: -2 } },
          flags: { weekly_focus: "Private draft recovery", route_academic: true, lin_feedback_avoided: true, lin_midterm_tension_resolved: true }
        }
      }
    ]
  },

  "event_academic_dr_mei_ethics_tension": {
    speaker: "Dr. Mei",
    text: "Dr. Mei listens to your project idea, then asks who becomes invisible when you turn people into data points. The room stays polite. The question does not.",
    choices: [
      {
        text: "Rewrite the question around people, not just data.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 6, culture: 6, energy: -5 },
          guanxi: { professors: 5 },
          relationships: { "Dr. Mei": { friendship: 6 } },
          flags: { weekly_focus: "Dr. Mei research ethics repair", route_academic: true, dr_mei_ethics_reframed: true, dr_mei_midterm_tension_resolved: true }
        }
      },
      {
        text: "Keep the question efficient and narrow for now.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 8, digitalProficiency: 3, energy: -3 },
          relationships: { "Dr. Mei": { friendship: 1 } },
          flags: { weekly_focus: "Efficient research scope", route_academic: true, dr_mei_efficiency_choice: true, dr_mei_midterm_tension_resolved: true }
        }
      }
    ]
  },

  "event_academic_dr_mei_conference_abstract": {
    speaker: "Dr. Mei",
    text: "Dr. Mei sends you a draft abstract with one sentence highlighted: 'This part sounds like it was written for a committee, not a reader.' The conference deadline is close enough to make every word feel expensive.",
    choices: [
      {
        text: "Tighten the argument and help make the abstract travel.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 9, chinese: 3, energy: -7 },
          guanxi: { professors: 6 },
          relationships: { "Dr. Mei": { friendship: 7 } },
          flags: { weekly_focus: "Dr. Mei conference abstract", route_academic: true, dr_mei_conference_abstract: true }
        }
      }
    ]
  },

  "event_academic_lin_recommendation": {
    speaker: "Professor Lin",
    bgImage: '/images/simulator/cg/cg_professor_lin_office_hours.jpg',
    text: "Professor Lin does not promise anything quickly. He asks for your best draft, your weakest transcript line, and the reason you want the next step. A recommendation, he explains, is not a favor. It is his name attached to your habits.",
    choices: [
      {
        text: "Show him the work behind the ambition.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 8, culture: 2, energy: -6 },
          guanxi: { professors: 10 },
          relationships: { "Professor Lin": { friendship: 12 } },
          flags: { weekly_focus: "Professor Lin recommendation path", route_academic: true, lin_recommendation_ready: true, academic_route_commitment: true }
        }
      }
    ]
  },

  "event_academic_dr_mei_project_commitment": {
    speaker: "Dr. Mei",
    bgImage: '/images/simulator/cg/cg_dr_mei_project_meeting.jpg',
    text: "Dr. Mei opens a folder of interview notes, messy charts, and unanswered questions. 'If you join this,' she says, 'you will not just collect material about China. You will have to decide what you are responsible for understanding.'",
    choices: [
      {
        text: "Commit to the project and accept the harder question.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 14, culture: 4, digitalProficiency: 4, energy: -8 },
          guanxi: { professors: 8 },
          relationships: { "Dr. Mei": { friendship: 12 } },
          flags: { weekly_focus: "Dr. Mei project commitment", route_academic: true, dr_mei_project_trust: true, dr_mei_project_commitment: true, academic_route_commitment: true }
        }
      }
    ]
  },

  // --- ROUTE EVENTS: LOCAL INTEGRATION ---
  "event_local_study_group": {
    speaker: "Local Study Group",
    bgImage: '/images/simulator/cg/cg_local_study_group_night.jpg',
    text: "The group works fast, teases gently, and explains only when you ask a specific question. By the end, you have learned the homework and three campus phrases nobody teaches in class.",
    choices: [
      {
        text: "Stay through the awkward parts.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 7, culture: 5, energy: -4 },
          guanxi: { localStudents: 8 },
          flags: { weekly_focus: "Local study group", route_local: true, local_study_group_night: true }
        }
      }
    ]
  },

  "event_local_neighbor_li": {
    speaker: "Neighbor Li",
    text: "Neighbor Li explains which washing machines steal socks, which canteen window stays open late, and why the dorm auntie respects people who greet her before needing help.",
    choices: [
      {
        text: "Write down the unwritten rules.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 8, energy: 4 },
          guanxi: { localStudents: 5 },
          relationships: { "Neighbor Li": { friendship: 8 } },
          flags: { weekly_focus: "Dorm wisdom with Neighbor Li", route_local: true, met_neighbor_li: true }
        }
      }
    ]
  },

  "event_local_canteen_practice": {
    speaker: "Canteen Line",
    bgImage: '/images/simulator/cg/cg_canteen_auntie_kind_portion.jpg',
    text: "You choose the busy window on purpose. The auntie asks a follow-up question you do not expect, but this time you do not freeze. You ask her to repeat it and keep the line moving.",
    choices: [
      {
        text: "Order clearly and accept the tiny victory.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 8, culture: 3, energy: -3, wealth: -25 },
          guanxi: { localStudents: 3 },
          flags: { weekly_focus: "Canteen Chinese practice", route_local: true, canteen_auntie_kindness: true }
        }
      }
    ]
  },

  "event_local_neighborhood_errand": {
    speaker: "Dorm Parcel Shelf",
    bgImage: '/images/simulator/cg/cg_dorm_auntie_parcel_help.jpg',
    text: "A package pickup becomes a language exam written by daily life. The dorm auntie speaks quickly, the app shows three codes, and somehow you leave with the right box and one more unwritten rule understood.",
    choices: [
      {
        text: "Let the errand count as language practice.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 10, culture: 8, energy: -5 },
          guanxi: { localStudents: 5 },
          flags: { weekly_focus: "Dorm parcel errand", route_local: true, local_route_deepened: true, dorm_auntie_parcel_help: true }
        }
      }
    ]
  },

  "event_local_rain_gate": {
    speaker: "Dorm Gate",
    text: "Rain turns the campus gate into a choreography of umbrellas, delivery scooters, security guards, and students pretending their shoes are waterproof. Neighbor Li waves you over to help translate a delivery problem before the soup gets cold.",
    choices: [
      {
        text: "Hold the umbrella, translate badly, and keep everyone moving.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 4, culture: 4, energy: -2 },
          guanxi: { localStudents: 4 },
          relationships: { "Neighbor Li": { friendship: 3 } },
          flags: { weekly_focus: "Rainy dorm gate help", route_local: true, local_rain_gate: true }
        }
      }
    ]
  },

  "event_local_neighbor_li_trust": {
    speaker: "Neighbor Li",
    text: "A dorm misunderstanding starts with a washing machine queue and somehow becomes a small negotiation about space, noise, and saving face. Neighbor Li lets you try first, then quietly helps when your Chinese runs out of bridge.",
    choices: [
      {
        text: "Apologize clearly and keep everyone's dignity intact.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 8, culture: 8, energy: -3 },
          guanxi: { localStudents: 8 },
          relationships: { "Neighbor Li": { friendship: 10 } },
          flags: { weekly_focus: "Dorm misunderstanding with Neighbor Li", route_local: true, neighbor_li_local_trust: true }
        }
      }
    ]
  },

  "event_local_uncle_wang_story": {
    speaker: "Uncle Wang",
    text: "Uncle Wang wipes down the street table, refills your tea without asking, and tells you how the neighborhood changed before the metro station opened. It is not a lecture. It is a city giving you context.",
    choices: [
      {
        text: "Listen more than you speak.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 10, chinese: 6, energy: 3, wealth: -35 },
          guanxi: { localStudents: 6 },
          relationships: { "Uncle Wang": { friendship: 12 } },
          flags: { weekly_focus: "Uncle Wang neighborhood story", route_local: true, uncle_wang_neighborhood_story: true }
        }
      }
    ]
  },

  "event_local_uncle_wang_first": {
    speaker: "Uncle Wang",
    bgImage: '/images/simulator/backgrounds/bg_uncle_wang_bbq.jpg',
    text: "The skewer stall near the dorm is not on any official campus map. You find it by following smoke, laughter, and a queue of students pretending they are not hungry. Uncle Wang calls you 'new Minghai student' before you introduce yourself, then points at the safest spice level like he has seen this exact face before.",
    choices: [
      {
        text: "Order carefully, save the stall location, and learn his name. [Culture +, Chinese +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 7, chinese: 4, energy: 5, wealth: -35 },
          guanxi: { localStudents: 4 },
          relationships: { "Uncle Wang": { friendship: 6 } },
          flags: { weekly_focus: "First skewer stall visit", route_local: true, met_uncle_wang: true, wechat_uncle_wang_added: true }
        }
      }
    ]
  },

  "event_local_neighbor_li_boundary": {
    speaker: "Neighbor Li",
    text: "Neighbor Li knocks once, then tells you the dorm group chat is annoyed about noise, shoes, and a message you thought was harmless. The problem is small. The embarrassment is not.",
    choices: [
      {
        text: "Own the misunderstanding and ask how to repair it.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 6, culture: 8, energy: -4 },
          guanxi: { localStudents: 6 },
          relationships: { "Neighbor Li": { friendship: 6 } },
          flags: { weekly_focus: "Neighbor Li boundary repair", route_local: true, neighbor_li_boundary_repaired: true, neighbor_li_midterm_tension_resolved: true }
        }
      },
      {
        text: "Avoid the topic and become extra polite instead.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 3, energy: 2 },
          relationships: { "Neighbor Li": { friendship: -2 } },
          flags: { weekly_focus: "Dorm boundary avoidance", route_local: true, neighbor_li_boundary_avoided: true, neighbor_li_midterm_tension_resolved: true }
        }
      }
    ]
  },

  "event_local_uncle_wang_question": {
    speaker: "Uncle Wang",
    text: "Uncle Wang asks why you really came to China. Not the application answer. Not the scholarship answer. The street is loud enough to save you from being too sincere, but he waits anyway.",
    choices: [
      {
        text: "Answer honestly, even if the answer sounds unfinished.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 8, chinese: 5, energy: 4, wealth: -30 },
          guanxi: { localStudents: 5 },
          relationships: { "Uncle Wang": { friendship: 6 } },
          flags: { weekly_focus: "Uncle Wang honest answer", route_local: true, uncle_wang_honest_answer: true, uncle_wang_midterm_tension_resolved: true }
        }
      },
      {
        text: "Give the safe answer people usually expect.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 2, chinese: 2, energy: 2, wealth: -30 },
          relationships: { "Uncle Wang": { friendship: 1 } },
          flags: { weekly_focus: "Uncle Wang polite answer", route_local: true, uncle_wang_polite_answer: true, uncle_wang_midterm_tension_resolved: true }
        }
      }
    ]
  },

  "event_local_ktv_night": {
    speaker: "Local Classmates",
    text: "The KTV room is too bright, the playlist is too long, and someone hands you a microphone before you can pretend to be busy choosing fruit. This is not a language test. It is worse: everyone is having fun.",
    choices: [
      {
        text: "Sing one chorus badly and laugh through the applause.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: -180, chinese: 5, culture: 8, energy: -6 },
          guanxi: { localStudents: 10 },
          flags: { weekly_focus: "Local KTV night", route_local: true, local_ktv_night: true }
        }
      },
      {
        text: "Become the unofficial subtitle translator for the room.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: -180, chinese: 8, culture: 5, energy: -4 },
          guanxi: { localStudents: 8 },
          flags: { weekly_focus: "KTV subtitle translator", route_local: true, local_ktv_night: true }
        }
      }
    ]
  },

  "event_local_neighbor_li_festival": {
    speaker: "Neighbor Li",
    bgImage: '/images/simulator/cg/cg_neighbor_li_festival_prep.jpg',
    text: "Neighbor Li invites you into neighborhood festival prep, which turns out to mean carrying boxes, misunderstanding three aunties at once, and being trusted with tasks before you feel ready. Nobody announces belonging. They just hand you tape.",
    choices: [
      {
        text: "Do the unglamorous tasks without disappearing.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 8, culture: 12, energy: -6, wealth: -60 },
          guanxi: { localStudents: 12 },
          relationships: { "Neighbor Li": { friendship: 12 } },
          flags: { weekly_focus: "Neighborhood festival prep", route_local: true, neighbor_li_festival_invite: true, local_route_commitment: true }
        }
      }
    ]
  },

  "event_local_uncle_wang_regular": {
    speaker: "Uncle Wang",
    bgImage: '/images/simulator/cg/cg_uncle_wang_regular_table.jpg',
    text: "At Uncle Wang's table, you no longer feel like a guest performing politeness. You know who sits where, which stories are repeated, and when silence means comfort instead of awkwardness.",
    choices: [
      {
        text: "Let the routine become a real part of the week.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 10, chinese: 6, energy: 3, wealth: -55 },
          guanxi: { localStudents: 8 },
          relationships: { "Uncle Wang": { friendship: 12 } },
          flags: { weekly_focus: "Uncle Wang regular table", route_local: true, uncle_wang_regular: true, local_route_commitment: true }
        }
      }
    ]
  },

  // --- ROUTE EVENTS: INTERNATIONAL STUDENT CIRCLE ---
  "event_intl_sophie_checkin": {
    speaker: "Sophie",
    bgImage: '/images/simulator/backgrounds/bg_campus_cafe.jpg',
    text: "Sophie books a cheap noodle place and calls it a check-in dinner, which is a polite way to say everyone looks tired. By the second bowl, people are laughing about the things that almost broke them this week.",
    choices: [
      {
        text: "Tell the truth and listen back.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 8, culture: 2, wealth: -40 },
          guanxi: { intlStudents: 10 },
          relationships: { Sophie: { friendship: 8 } },
          flags: { weekly_focus: "Sophie check-in dinner", route_intl: true }
        }
      }
    ]
  },

  "event_intl_new_student_help": {
    speaker: "New Student",
    text: "A newer student posts a panicked message about registration screenshots. You recognize the panic immediately. Helping them takes less time than being alone with your own confusion used to take.",
    choices: [
      {
        text: "Send a clear step-by-step guide.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 6, energy: -1 },
          guanxi: { intlStudents: 8 },
          flags: { weekly_focus: "Helped a new international student", route_intl: true }
        }
      }
    ]
  },

  "event_intl_homesick_night": {
    speaker: "Dorm Common Room",
    bgImage: '/images/simulator/backgrounds/bg_dorm_common_room.jpg',
    text: "Someone misses home out loud, and the room goes quiet in recognition rather than embarrassment. The conversation does not fix distance, but it makes distance less private.",
    choices: [
      {
        text: "Stay for the whole conversation.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 8 },
          guanxi: { intlStudents: 6 },
          relationships: { Sophie: { friendship: 4 } },
          flags: { weekly_focus: "Homesick night support", route_intl: true }
        }
      }
    ]
  },

  "event_intl_guide_update": {
    speaker: "Shared Document",
    text: "The guide gets longer: bedding sizes, office hours, payment tips, where to buy fruit, what to do when the app says your passport name is invalid. Practical kindness becomes searchable.",
    choices: [
      {
        text: "Publish the update to the group.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 4, energy: -2 },
          guanxi: { intlStudents: 12, admin: 3 },
          relationships: { Sophie: { friendship: 6 } },
          flags: { weekly_focus: "International student guide update", route_intl: true, intl_route_deepened: true }
        }
      }
    ]
  },

  "event_intl_common_room_meal": {
    speaker: "Dorm Common Room",
    bgImage: '/images/simulator/backgrounds/bg_dorm_common_room.jpg',
    text: "Someone finds a dented pot, someone else finds instant noodles from home, and Sophie declares the common room temporarily international territory. The meal is not authentic to anywhere. That is why it works.",
    choices: [
      {
        text: "Buy fruit, wash bowls, and let everyone add one memory.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: -60, energy: 4, culture: 2 },
          guanxi: { intlStudents: 5 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { weekly_focus: "Common room comfort meal", route_intl: true, intl_common_room_meal: true }
        }
      }
    ]
  },

  "event_intl_sophie_support_circle": {
    speaker: "Sophie",
    bgImage: '/images/simulator/cg/cg_sophie_support_circle.jpg',
    text: "Sophie admits the support dinners cannot just be emergency rooms. 'What if we made something people could join before they fall apart?' she asks. The question changes the group from reaction to care.",
    choices: [
      {
        text: "Design a monthly support circle with practical themes.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: -3, digitalProficiency: 5 },
          guanxi: { intlStudents: 12, admin: 4 },
          relationships: { Sophie: { friendship: 12 } },
          flags: { weekly_focus: "Sophie support circle", route_intl: true, sophie_support_circle: true, sophie_guide_published: true }
        }
      }
    ]
  },

  "event_intl_sophie_bubble_tension": {
    speaker: "Sophie",
    bgImage: '/images/simulator/backgrounds/bg_dorm_common_room.jpg',
    text: "Sophie says the group chat is starting to feel like a country nobody else can enter. It is safe, yes. It is also getting smaller. The question is whether comfort is helping you live here or helping you avoid here.",
    choices: [
      {
        text: "Build one bridge activity with local students.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 4, culture: 6, energy: -5 },
          guanxi: { intlStudents: 6, localStudents: 4 },
          relationships: { Sophie: { friendship: 6 } },
          flags: { weekly_focus: "Sophie bridge plan", route_intl: true, sophie_bridge_plan: true, sophie_midterm_tension_resolved: true }
        }
      },
      {
        text: "Protect the group as a safe bubble for now.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 8, culture: -2 },
          guanxi: { intlStudents: 8 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { weekly_focus: "Protected international safe bubble", route_intl: true, sophie_safe_bubble_choice: true, sophie_midterm_tension_resolved: true }
        }
      }
    ]
  },

  "event_intl_sophie_language_exchange": {
    speaker: "Sophie",
    bgImage: '/images/simulator/backgrounds/bg_campus_cafe.jpg',
    text: "Sophie brings flashcards, voice notes, and the terrible confidence of someone who thinks tones are a team sport. Half the night becomes language practice. The other half becomes admitting which parts of China still make both of you feel twelve years old.",
    choices: [
      {
        text: "Keep it study-focused and trade useful phrases.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 7, culture: 3, energy: 2 },
          guanxi: { intlStudents: 5 },
          relationships: { Sophie: { friendship: 6 } },
          flags: { weekly_focus: "Sophie language exchange", route_intl: true, sophie_language_exchange: true }
        }
      },
      {
        text: "Admit the city feels easier when she is around.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 4, energy: 4 },
          guanxi: { intlStudents: 4 },
          relationships: { Sophie: { friendship: 4, romance: 4 } },
          flags: { weekly_focus: "Sophie language exchange", route_intl: true, sophie_language_exchange: true, sophie_soft_romance_hint: true }
        }
      }
    ]
  },

  "event_intl_sophie_orientation_committee": {
    speaker: "Sophie",
    text: "Sophie arrives with a messy slide deck, three admin email threads, and a terrifyingly hopeful plan: make next semester's orientation less like a document dump and more like a map people can actually use.",
    choices: [
      {
        text: "Help turn the support circle into orientation infrastructure.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 4, energy: -4 },
          guanxi: { intlStudents: 14, admin: 6 },
          relationships: { Sophie: { friendship: 12 } },
          flags: { weekly_focus: "International orientation committee", route_intl: true, sophie_orientation_committee: true, intl_route_commitment: true }
        }
      }
    ]
  },

  // --- ROUTE EVENTS: CAREER BRIDGE ---
  "event_career_office": {
    speaker: "Career Office",
    text: "The advisor explains that opportunities in China often start with paperwork before they start with ambition. It is not inspiring, exactly, but it is useful.",
    choices: [
      {
        text: "Ask about legal internship pathways.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 7, energy: -3 },
          guanxi: { admin: 8 },
          flags: { weekly_focus: "Career office pathways", route_career: true, legal_workflow_known: true }
        }
      }
    ]
  },

  "event_career_resume": {
    speaker: "Resume Draft",
    text: "You rewrite your resume for a China-facing reader: less vague leadership, more specific projects, clearer bilingual context, and no sentence that sounds like it was inflated by fear.",
    choices: [
      {
        text: "Save the localized version.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, academics: 4, energy: -4 },
          flags: { weekly_focus: "Localized resume", route_career: true, china_resume_ready: true }
        }
      }
    ]
  },

  "event_career_manager_panel": {
    speaker: "Manager Zhang",
    text: "Manager Zhang's panel is polished, corporate, and unexpectedly blunt. 'Cross-cultural ability is not a slogan,' he says. 'It is whether people still trust you when the meeting gets confusing.' After the applause, students form a careful line around him, each holding a resume like a small shield.",
    choices: [
      {
        text: "Introduce yourself and ask for permission to follow up.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 5, digitalProficiency: 4, wealth: -30 },
          guanxi: { admin: 5 },
          relationships: { "Manager Zhang": { friendship: 8 } },
          flags: { weekly_focus: "Manager Zhang first panel", route_career: true, met_manager_zhang: true, wechat_manager_zhang_added: true, manager_zhang_business_card_saved: true }
        }
      }
    ]
  },

  "event_career_manager_followup": {
    speaker: "Manager Zhang",
    text: "You send a concise follow-up: who you are, what you heard, and one practical question about legal internships. Manager Zhang replies the next morning with two links, one correction, and a sentence that feels both encouraging and strict: 'Specificity is respect for other people's time.'",
    choices: [
      {
        text: "Turn the reply into a concrete career checklist.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 5, culture: 3, energy: -2 },
          guanxi: { admin: 4 },
          relationships: { "Manager Zhang": { friendship: 5 } },
          flags: { weekly_focus: "Manager Zhang post-panel follow-up", route_career: true, legal_workflow_known: true, manager_zhang_followup_ready: true }
        }
      }
    ]
  },

  "event_career_application_package": {
    speaker: "Application Folder",
    text: "The internship package is not glamorous: transcript, resume, supervisor email, approval form. But each document makes the path less imaginary.",
    choices: [
      {
        text: "Submit the package through the proper channel.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 10, academics: 5, energy: -6 },
          guanxi: { admin: 8 },
          flags: { weekly_focus: "Legal internship application package", route_career: true, career_route_deepened: true }
        }
      }
    ]
  },

  "event_career_mock_interview": {
    speaker: "Mock Interview Room",
    text: "The mock interviewer stops you after the second answer. 'This is fluent,' she says, 'but it is not specific.' It is the kind of feedback that makes you want to disappear and immediately rewrite everything.",
    choices: [
      {
        text: "Rewrite the answers around evidence instead of confidence.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 4, culture: 3, energy: -4 },
          guanxi: { admin: 3 },
          flags: { weekly_focus: "Brutally useful mock interview", route_career: true, career_mock_interview: true }
        }
      }
    ]
  },

  "event_career_manager_zhang_trust": {
    speaker: "Manager Zhang",
    text: "Manager Zhang reads your resume, pauses, and says the kind thing in the least comfortable way: 'You are trying to look impressive instead of useful.' Then he shows you how to make your China experience legible to an employer.",
    choices: [
      {
        text: "Rewrite for usefulness, not decoration.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 6, academics: 4, energy: -4 },
          guanxi: { admin: 8 },
          relationships: { "Manager Zhang": { friendship: 12 } },
          flags: { weekly_focus: "Manager Zhang candid feedback", route_career: true, manager_zhang_career_trust: true, legal_internship_ready: true }
        }
      }
    ]
  },

  "event_career_manager_zhang_boundaries": {
    speaker: "Manager Zhang",
    text: "Manager Zhang hears you mention a shortcut and goes quiet in the way professionals do when they are deciding whether to correct you. 'In China,' he says, 'relationships matter. So do boundaries. Confusing the two is how people get hurt.'",
    choices: [
      {
        text: "Ask for the legal version of the path.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 6, culture: 5, energy: -4 },
          guanxi: { admin: 8 },
          relationships: { "Manager Zhang": { friendship: 6 } },
          flags: { weekly_focus: "Manager Zhang boundary lesson", route_career: true, legal_workflow_known: true, manager_zhang_boundaries_accepted: true, manager_zhang_midterm_tension_resolved: true }
        }
      },
      {
        text: "Focus on who can introduce you faster.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 5, culture: -2, energy: -3 },
          guanxi: { admin: 2 },
          relationships: { "Manager Zhang": { friendship: -2 } },
          flags: { weekly_focus: "Career shortcut temptation", route_career: true, career_shortcut_temptation: true, manager_zhang_midterm_tension_resolved: true }
        }
      }
    ]
  },

  "event_career_shortcut_repair": {
    speaker: "Career Office",
    text: "You bring the shortcut story to the career office before it turns into a reputation. The advisor does not scold you. Somehow that is worse. She walks you through the legal path, the emails you should send, and the sentence you need to stop implying.",
    choices: [
      {
        text: "Send the clarifying message and choose the slower path.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 3, culture: 4, energy: -5 },
          guanxi: { admin: 6 },
          relationships: { "Manager Zhang": { friendship: 3 } },
          flags: { weekly_focus: "Career shortcut repair", route_career: true, career_shortcut_temptation: false, career_shortcut_repaired: true, legal_workflow_known: true }
        }
      }
    ]
  },

  "event_career_manager_zhang_alumni_dinner": {
    speaker: "Manager Zhang",
    bgImage: '/images/simulator/backgrounds/bg_alumni_dinner.jpg',
    text: "The alumni dinner is not a party. It is a room full of people speaking in introductions, titles, pauses, and tiny tests of whether you understand the room before trying to impress it.",
    choices: [
      {
        text: "Ask one precise question and remember three names.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: -180, culture: 7, digitalProficiency: 4, energy: -6 },
          guanxi: { admin: 8 },
          relationships: { "Manager Zhang": { friendship: 7 } },
          flags: { weekly_focus: "Manager Zhang alumni dinner", route_career: true, manager_zhang_alumni_dinner: true }
        }
      }
    ]
  },

  "event_career_manager_zhang_referral": {
    speaker: "Manager Zhang",
    bgImage: '/images/simulator/cg/cg_manager_zhang_office_badge.jpg',
    text: "Manager Zhang finally names a concrete opening, then spends more time explaining boundaries than opportunity. 'A referral is not a magic door,' he says. 'It is a responsibility to arrive prepared and legal.'",
    choices: [
      {
        text: "Prepare the referral package the careful way.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 8, academics: 4, energy: -6 },
          guanxi: { admin: 12 },
          relationships: { "Manager Zhang": { friendship: 12 } },
          flags: { weekly_focus: "Manager Zhang referral path", route_career: true, manager_zhang_referral_ready: true, legal_internship_ready: true, career_route_commitment: true }
        }
      }
    ]
  },

  // --- ROUTE EVENTS: SHANGHAI OPPORTUNITY ---
  "event_city_xiao_chen_survey": {
    speaker: "Xiao Chen",
    text: "Xiao Chen does not begin with a pitch. He begins with a question: what do students actually need badly enough to pay for? You spend the afternoon turning complaints into categories.",
    choices: [
      {
        text: "Turn the complaints into a small survey.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 4, energy: -4 },
          relationships: { "Xiao Chen": { friendship: 8 } },
          flags: { weekly_focus: "Xiao Chen campus needs survey", route_city: true, met_xiao_chen: true }
        }
      }
    ]
  },

  "event_city_micro_store": {
    speaker: "Mini Store Test",
    text: "You test a tiny product idea with three posts, one spreadsheet, and expectations low enough to be healthy. A few orders come in. Not a business empire. A signal.",
    choices: [
      {
        text: "Fulfill the small batch carefully.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: 180, digitalProficiency: 7, energy: -8 },
          flags: { weekly_focus: "Tiny cross-border product test", route_city: true }
        }
      }
    ]
  },

  "event_city_lujiazui_observation": {
    speaker: "Lujiazui Footbridge",
    text: "You watch office workers cross under the towers with coffees, tote bags, and faces that suggest ambition has a commute. Shanghai feels less like a postcard and more like a system.",
    choices: [
      {
        text: "Write down what the city seems to reward.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 7, digitalProficiency: 4, energy: -3, wealth: -30 },
          flags: { weekly_focus: "Lujiazui work-rhythm observation", route_city: true, route_career: true }
        }
      }
    ]
  },

  "event_city_student_service": {
    speaker: "Student Service Prototype",
    text: "The prototype is embarrassingly small: a shared sheet, a QR code, a promise to help students find reliable campus essentials. But people use it. Small usefulness is still usefulness.",
    choices: [
      {
        text: "Keep the prototype small and reliable.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 12, wealth: 260, culture: 5, energy: -10 },
          relationships: { "Xiao Chen": { friendship: 6 } },
          flags: { weekly_focus: "Student service prototype", route_city: true, city_route_deepened: true }
        }
      }
    ]
  },

  "event_city_qr_complaint_night": {
    speaker: "Dorm Group Chat",
    text: "At 11:43 PM, the QR code breaks. The group chat fills with screenshots, question marks, and one brutally accurate sticker. Xiao Chen wants to defend the idea. You both have to read the complaints instead.",
    choices: [
      {
        text: "Sort the complaints into bugs, expectations, and actual needs.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 5, culture: 3, energy: -4 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { weekly_focus: "Broken QR complaint night", route_city: true, city_qr_complaint_night: true }
        }
      }
    ]
  },

  "event_city_xiao_chen_prototype": {
    speaker: "Xiao Chen",
    text: "Xiao Chen wants to scale immediately. You push back with numbers from the tiny test. For once, the exciting thing is not the idea itself, but the fact that both of you are learning how to argue about it honestly.",
    choices: [
      {
        text: "Choose a smaller, cleaner next test.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 12, wealth: 220, culture: 4, energy: -7 },
          relationships: { "Xiao Chen": { friendship: 12 } },
          flags: { weekly_focus: "Xiao Chen prototype trust", route_city: true, xiao_chen_project_trust: true, xiao_chen_city_prototype: true }
        }
      }
    ]
  },

  "event_city_xiao_chen_speed_tension": {
    speaker: "Xiao Chen",
    text: "Xiao Chen wants to launch before the prototype is stable. You want one more week of testing. The argument is not really about software. It is about whether Shanghai rewards speed so much that responsibility starts to look naive.",
    choices: [
      {
        text: "Slow the plan until the service is actually reliable.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 6, culture: 5, wealth: 100, energy: -5 },
          relationships: { "Xiao Chen": { friendship: 6 } },
          flags: { weekly_focus: "Xiao Chen responsible pace", route_city: true, xiao_chen_responsible_pace: true, xiao_chen_midterm_tension_resolved: true }
        }
      },
      {
        text: "Push speed and learn from the mess later.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: 250, digitalProficiency: 5, culture: -3, energy: -9 },
          relationships: { "Xiao Chen": { friendship: 1 } },
          flags: { weekly_focus: "Shanghai speed over care", route_city: true, city_speed_over_care: true, city_reliability_debt: true, xiao_chen_midterm_tension_resolved: true }
        }
      }
    ]
  },

  "event_city_reliability_repair": {
    speaker: "Xiao Chen",
    text: "The fastest version of the project left tiny cracks everywhere: wrong pickup times, confused payment notes, a QR code nobody trusted after midnight. Repairing it is boring. That is the point. Useful things last because someone does the boring repair.",
    choices: [
      {
        text: "Spend the week fixing trust before chasing growth.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: -120, digitalProficiency: 5, culture: 4, energy: -6 },
          relationships: { "Xiao Chen": { friendship: 6 } },
          flags: { weekly_focus: "Prototype reliability repair", route_city: true, city_reliability_debt: false, city_reliability_repaired: true, xiao_chen_responsible_pace: true }
        }
      }
    ]
  },

  "event_city_xiao_chen_global_angle": {
    speaker: "Xiao Chen",
    text: "Xiao Chen asks what international students would actually pay for, not what investors would like to hear. You spend the afternoon turning homesick complaints, payment friction, and campus confusion into a launch memo.",
    choices: [
      {
        text: "Write the international-user memo with real constraints.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 4, wealth: 120, energy: -6 },
          guanxi: { intlStudents: 4 },
          relationships: { "Xiao Chen": { friendship: 7 } },
          flags: { weekly_focus: "Xiao Chen international-user memo", route_city: true, xiao_chen_global_angle: true }
        }
      }
    ]
  },

  "event_city_xiao_chen_demo_day": {
    speaker: "Xiao Chen",
    bgImage: '/images/simulator/cg/cg_xiao_chen_demo_day.jpg',
    text: "Demo day is less glamorous than the posters promised: half the room is distracted, the Wi-Fi argues with everyone, and the best question comes from someone who almost skipped your booth. Xiao Chen grins anyway. Real feedback is better than fantasy applause.",
    choices: [
      {
        text: "Use the feedback to choose the next small market test.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 14, culture: 6, wealth: 220, energy: -10 },
          relationships: { "Xiao Chen": { friendship: 12 } },
          flags: { weekly_focus: "Xiao Chen demo day", route_city: true, xiao_chen_demo_day: true, city_route_commitment: true }
        }
      }
    ]
  },

  // --- ROUTE EVENTS: LIFE ADMIN ---
  "event_admin_budget_review": {
    speaker: "Budget Spreadsheet",
    text: "You compare your actual spending with the version of yourself who made the original budget. That person was optimistic, adorable, and wrong. The correction helps immediately.",
    choices: [
      {
        text: "Cut avoidable spending for the next month.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: 180, digitalProficiency: 4, energy: 3 },
          flags: { weekly_focus: "Budget review", budget_reviewed: true }
        }
      }
    ]
  },

  "event_admin_chinese_selfstudy": {
    speaker: "Language Partner",
    bgImage: '/images/simulator/cg/cg_language_partner_cafe.jpg',
    text: "No dramatic breakthrough arrives. Your language partner helps you review phrases for office visits, delivery calls, and group messages. It is ordinary study, which is exactly why it works.",
    choices: [
      {
        text: "Practice until the useful phrases stick.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 7, academics: 3, energy: -4 },
          flags: { weekly_focus: "Practical Chinese with a language partner", language_partner_cafe: true }
        }
      }
    ]
  },

  "event_admin_campus_tasks": {
    speaker: "Campus Office",
    text: "You handle the small tasks before they become emergencies: a stamp, a payment confirmation, a residence-permit reminder, a form nobody mentioned twice.",
    choices: [
      {
        text: "Leave with fewer future problems.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 5, energy: -2 },
          guanxi: { admin: 6 },
          flags: { weekly_focus: "Campus admin tasks", admin_tasks_current: true }
        }
      }
    ]
  },

  "event_admin_housing_followup": {
    speaker: "Shanghai Address",
    text: "The address you chose stops being a line on a form and starts becoming a routine: commute time, kitchen rules, elevator waits, water bills, quiet hours, and whether you can actually rest after class. Housing is not background. It is the shape of every week.",
    choices: [
      {
        text: "Adjust your routine around the place you picked.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 6, digitalProficiency: 2, culture: 2 },
          flags: { weekly_focus: "Housing routine", housing_followup_done: true }
        }
      },
      {
        text: "Ignore the small frictions and hope they stay small.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: -5, culture: 1 },
          flags: { weekly_focus: "Housing friction ignored", housing_followup_done: true, housing_friction_debt: true }
        }
      }
    ]
  },

  "event_admin_housing_repair": {
    speaker: "Housing Repair",
    text: "The small frictions did not stay small. One bad commute becomes three late arrivals. One unresolved roommate issue becomes a week of sleeping badly. You finally treat housing like a system, not a mood.",
    choices: [
      {
        text: "Set boundaries, fix the commute plan, and pay for the missing basics.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: -260, energy: 10, culture: 3 },
          guanxi: { localStudents: 2 },
          flags: { weekly_focus: "Housing repair", housing_friction_debt: false, housing_friction_repaired: true }
        }
      },
      {
        text: "Move through it cheaply and accept the energy cost.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: -8, wealth: 120 },
          flags: { weekly_focus: "Cheap housing workaround", housing_friction_debt: false, housing_friction_repaired: true, housing_energy_scar: true }
        }
      }
    ]
  },

  "event_admin_compliance_cleanup": {
    speaker: "International Student Office",
    text: "You explain the tutoring situation before anyone else explains it for you. The officer's face does not change, which is terrifying. Then she gives you a controlled path out: stop the work, document the dates, and do not turn a money problem into a visa problem.",
    choices: [
      {
        text: "End the arrangement, document the mistake, and accept the lost income.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: -200, energy: -6, digitalProficiency: 3 },
          guanxi: { admin: 8 },
          flags: { weekly_focus: "Compliance cleanup", unapproved_work_risk: false, illegal_job: false, compliance_cleanup_done: true, legal_workflow_known: true }
        }
      }
    ]
  },

  "submenu_entertainment": {
    speaker: "Evening Options",
    text: "You have a free evening. These optional activities can make Shanghai feel vivid, but they still cost time, money, and tomorrow morning's focus.",
    choices: [
      {
        text: "🎤 Join a campus KTV room (-180 RMB)",
        condition: { stats: { wealth: { min: 180 } } },
        action: "advance_turn",
        next: "event_ktv",
        effects: { stats: { wealth: -180 } }
      },
      {
        text: "🔪 Try a Chinese script-murder night (-160 RMB)",
        condition: { stats: { chinese: { min: 35 }, wealth: { min: 160 } } },
        action: "advance_turn",
        next: "event_jubensha",
        effects: { stats: { wealth: -160 } }
      },
      {
        text: "🍻 Attend a department banquet etiquette challenge",
        action: "advance_turn",
        next: "minigame_banquet"
      },
      {
        text: "🧧 Check the class WeChat group red packet",
        action: "advance_turn",
        next: "minigame_hongbao"
      },
      {
        text: "☕ Accept a low-stakes campus coffee meetup (-60 RMB)",
        action: "advance_turn",
        next: "event_tantan_date",
        effects: { stats: { wealth: -60 } }
      },
      {
        text: "🗣️ Language exchange mixer",
        action: "advance_turn",
        next: "event_language_exchange",
        effects: { stats: { energy: -6 } }
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },
  "submenu_social": {
    speaker: "Contacts App",
    text: "Your old contacts list has been reorganized into the new route system. Character hangouts now live where they matter: academic mentors under Academic Track, Sophie under International Student Circle, local life under Local Integration, career contacts under Career Bridge, and Xiao Chen under Shanghai Opportunity.",
    choices: [
      {
        text: "Open Academic Track contacts",
        next: "submenu_academic_track"
      },
      {
        text: "Open Local Integration contacts",
        next: "submenu_local_integration"
      },
      {
        text: "Open International Student Circle contacts",
        next: "submenu_international_circle"
      },
      {
        text: "Open Career Bridge contacts",
        next: "submenu_career_bridge"
      },
      {
        text: "Open Shanghai Opportunity contacts",
        next: "submenu_shanghai_opportunity"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },
  "submenu_travel": {
    speaker: "12306 Weekend Booking",
    text: "A weekend trip can widen your picture of China, but it is not free exploration. Tickets, hostels, transfers, and a tired Monday all count.",
    choices: [
      {
        text: "Return to base: Shanghai",
        condition: { stats: { wealth: { min: 120 } } },
        action: "advance_turn",
        next: "event_travel_shanghai",
        effects: { location: "Shanghai", stats: { wealth: -120, energy: -2 } }
      },
      {
        text: "Travel to Beijing",
        condition: { stats: { wealth: { min: 500 } } },
        action: "advance_turn",
        next: "event_travel_beijing",
        effects: { location: "Beijing", stats: { wealth: -500, energy: -8 } }
      },
      {
        text: "Travel to Guangzhou",
        condition: { stats: { wealth: { min: 500 } } },
        action: "advance_turn",
        next: "event_travel_guangzhou",
        effects: { location: "Guangzhou", stats: { wealth: -500, energy: -8 } }
      },
      {
        text: "Travel to Chengdu",
        condition: { stats: { wealth: { min: 500 } } },
        action: "advance_turn",
        next: "event_travel_chengdu",
        effects: { location: "Chengdu", stats: { wealth: -500, energy: -8 } }
      },
      {
        text: "Travel to Xi'an",
        condition: { stats: { wealth: { min: 500 } } },
        action: "advance_turn",
        next: "event_travel_xian",
        effects: { location: "Xi'an", stats: { wealth: -500, energy: -8 } }
      },
      {
        text: "Travel to Hangzhou",
        condition: { stats: { wealth: { min: 500 } } },
        action: "advance_turn",
        next: "event_travel_hangzhou",
        effects: { location: "Hangzhou", stats: { wealth: -500, energy: -8 } }
      },
      {
        text: "Travel to Sanya",
        condition: { stats: { wealth: { min: 500 } } },
        action: "advance_turn",
        next: "event_travel_sanya",
        effects: { location: "Sanya", stats: { wealth: -500, energy: -8 } }
      },
      {
        text: "Back to weekly planner",
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
      { text: "Back to weekly planner", next: "hub" }
    ]
  },

  "district_shanghai_fuxing": { speaker: "Fuxing Park", text: "By day, elders practice tai chi and parents push strollers. At night, the nearby blocks turn into one of Shanghai's loudest youth-culture zones.", choices: [ { text: "Observe the nightlife economy with classmates (-180 RMB)", condition: { stats: { wealth: { min: 180 } } }, next: "event_sh_ins_clubbing", action: "advance_turn", effects: { stats: { wealth: -180 } } }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_shanghai_bund": { speaker: "The Bund", text: "The waterfront compresses a lot into one walk: treaty-port stone, tourist cameras, school groups, wedding shoots, and Pudong's skyline performing across the river.", choices: [ { text: "Take an evening reflection walk", next: "event_sh_bund_walk", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_shanghai_lujiazui": { speaker: "Lujiazui", text: "The towers are impressive, but the more useful lesson is watching how people move through work, money, time, and ambition here.", choices: [ { text: "Attend a student-friendly fintech talk (-60 RMB)", condition: { stats: { wealth: { min: 60 } } }, next: "event_sh_lujiazui_mixer", action: "advance_turn", effects: { stats: { wealth: -60 } } }, { text: "Back to district map", next: "submenu_districts" } ] },

  "district_beijing_forbidden": { speaker: "Forbidden City", text: "The palace is beautiful, crowded, and stricter than your travel fantasy expected. History here arrives with security lines and audio-guide batteries.", choices: [ { text: "Practice translating signs for your own notes", condition: { stats: { chinese: { min: 20 } } }, next: "event_beijing_tourguide", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_beijing_qianmen": { speaker: "Qianmen Street", text: "Old storefronts, new brands, tour groups, snacks, and souvenir shops all argue over what 'traditional' should look like.", choices: [ { text: "Watch Peking Opera excerpts (-100 RMB)", condition: { stats: { wealth: { min: 100 } } }, next: "event_beijing_opera", action: "advance_turn", effects: { stats: { wealth: -100 } } }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_beijing_hutong": { speaker: "Old Hutongs", text: "The lanes are not a postcard. They are homes, deliveries, repairs, tourists, and people trying to live inside a famous place.", choices: [ { text: "Chat carefully with a taxi driver", next: "event_beijing_taxi", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },

  "district_gz_fair": { speaker: "Canton Fair Complex", text: "The trade fair is less a building than a temporary planet: badges, samples, interpreters, factories, buyers, and exhausted coffee stands.", choices: [ { text: "Shadow translation work and take market notes", condition: { stats: { chinese: { min: 30 } } }, next: "event_guangzhou_cantonfair", action: "advance_turn" }, { text: "Dim sum with a local contact (-120 RMB)", condition: { stats: { wealth: { min: 120 } } }, next: "event_guangzhou_boss", action: "advance_turn", effects: { stats: { wealth: -120 } } }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_gz_market": { speaker: "Baima Market", text: "Floor after floor of samples, negotiation, bags, labels, livestream sellers, and people who understand supply chains in their bones.", choices: [ { text: "Compare prices and consumer habits (-120 RMB)", condition: { stats: { wealth: { min: 120 } } }, next: "event_guangzhou_market", action: "advance_turn", effects: { stats: { wealth: -120 } } }, { text: "Back to district map", next: "submenu_districts" } ] },

  "district_chengdu_panda": { speaker: "Panda Base", text: "Lush bamboo forests where conservation work, tourism, and logistics all have to share space.", choices: [ { text: "Join the visitor education route (-50 RMB)", condition: { stats: { wealth: { min: 50 } } }, next: "event_chengdu_volunteer", action: "advance_turn", effects: { stats: { wealth: -50 } } }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_chengdu_kuanzhai": { speaker: "Kuanzhai Alley", text: "Preserved historic alleys full of spicy street food aromas.", choices: [ { text: "Try a hotpot table with locals (-50 RMB)", condition: { stats: { wealth: { min: 50 } } }, next: "event_chengdu_hotpot", action: "advance_turn", effects: { stats: { wealth: -50 } } }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_chengdu_park": { speaker: "People's Park", text: "Locals are playing mahjong, drinking tea, and treating the park like a second living room.", choices: [ { text: "Listen to teahouse advice", next: "event_chengdu_tea", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },

  "district_xian_terra": { speaker: "Terracotta Museum", text: "Thousands of stone warriors stand guard in the massive pits.", choices: [ { text: "Tour the museum with Guide Jin (-100 RMB)", condition: { stats: { wealth: { min: 100 } } }, next: "event_xian_tour", action: "advance_turn", effects: { stats: { wealth: -100 } } }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_xian_muslim": { speaker: "Muslim Quarter", text: "Cumin smoke, old shop signs, tourist waves, and neighborhood routines overlap until you stop trying to separate them neatly.", choices: [ { text: "Talk with a souvenir vendor about tourist rhythms", next: "event_xian_souvenirs", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_xian_wall": { speaker: "Ancient City Wall", text: "One of the oldest and best preserved Chinese city walls.", choices: [ { text: "Cycle the wall at sunset (-40 RMB)", condition: { stats: { wealth: { min: 40 } } }, next: "event_xian_cycling", action: "advance_turn", effects: { stats: { wealth: -40 } } }, { text: "Back to district map", next: "submenu_districts" } ] },

  "district_hz_tech": { speaker: "Binjiang District", text: "Glass offices, bike lanes, delivery riders, and campus recruiters make Hangzhou's tech scene feel less mythical and more procedural.", choices: [ { text: "Attend a public tech-career info session", condition: { stats: { academics: { min: 30 } } }, next: "event_hangzhou_alibaba", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_hz_lake": { speaker: "West Lake", text: "A UNESCO heritage site famous for poetry and tea.", choices: [ { text: "Rent a quiet boat (-100 RMB)", condition: { stats: { wealth: { min: 100 } } }, next: "event_hangzhou_boat", action: "advance_turn", effects: { stats: { wealth: -100 } } }, { text: "Join a Longjing tea session", next: "event_hangzhou_tea", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },

  "district_sanya_houhai": { speaker: "Houhai Surf Village", text: "A fishing village, surf schools, guesthouses, and influencer cafes share the same beach. It is relaxing and visibly commercial at the same time.", choices: [ { text: "Take a beginner surf lesson (-180 RMB)", condition: { stats: { wealth: { min: 180 } } }, next: "event_sanya_surf", action: "advance_turn", effects: { stats: { wealth: -180 } } }, { text: "Back to district map", next: "submenu_districts" } ] },
  "district_sanya_yalong": { speaker: "Yalong Bay", text: "The resort strip is beautiful, expensive, and a little unreal after campus life. You can enjoy it without pretending it is the whole country.", choices: [ { text: "Observe resort tourism from the public beach (-160 RMB)", condition: { stats: { wealth: { min: 160 } } }, next: "event_sanya_yacht", action: "advance_turn", effects: { stats: { wealth: -160 } } }, { text: "Ask staff how seasonal tourism work feels", next: "event_sanya_bartender", action: "advance_turn" }, { text: "Back to district map", next: "submenu_districts" } ] },



  // --- MONEY & COMPLIANCE ---
  "submenu_hustle": {
    speaker: "Opportunities Board",
    text: "Student WeChat groups are full of paid opportunities. Some are useful, some are gray, and some are simply not worth risking your visa over.",
    choices: [
      {
        text: "Accept unapproved off-campus English tutoring (+600 RMB, visa risk)",
        action: "advance_turn",
        next: "event_tutor_gig"
      },
      {
        text: "Help Professor Lin with approved research support",
        action: "advance_turn",
        next: "event_research_assistant"
      },
      {
        text: "Test a tiny personal-shopping order for friends back home",
        condition: { location: "Shanghai" },
        action: "advance_turn",
        next: "event_daigou"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },
  "event_tutor_gig": {
    speaker: "Tiger Mom",
    text: "'You just need to speak English with my son for three hours every Saturday.' The pay is tempting. The problem is not the child, or the mother, or the lesson. The problem is that unapproved off-campus work leaves a paper trail.",
    choices: [
      {
        text: "Take the money and accept the compliance risk.",
        next: "hub",
        effects: { stats: { wealth: 600, energy: -18 }, flags: { "illegal_job": true, unapproved_work_risk: true } }
      }
    ]
  },
  "event_research_assistant": {
    speaker: "Professor Lin",
    text: "Professor Lin needs help formatting references, checking English phrasing, and organizing notes from a bilingual source pack. It is approved, unglamorous, and actually useful.",
    choices: [
      {
        text: "Do the careful support work.",
        next: "hub",
        effects: { stats: { wealth: 100, academics: 6, energy: -5 }, guanxi: { professors: 8 } }
      }
    ]
  },
  "event_daigou": {
    speaker: "WeChat Contacts",
    text: "Friends back home ask whether you can help buy small China-only items online. It starts as a favor, then becomes a spreadsheet of shipping fees, customs questions, and promises you should not overmake.",
    choices: [
      {
        text: "Keep it tiny, transparent, and manageable.",
        next: "hub",
        effects: { stats: { wealth: 180, digitalProficiency: 4, culture: 3, energy: -8 }, flags: { small_daigou_test: true } }
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
    text: "The department head is proposing a toast. Try to navigate the banquet by balancing table trust, politeness, and your limits.",
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
    speaker: "Shanghai Metro",
    text: "It is rush hour and you are carrying too much. Find the right door, move with the crowd, and do not block the auntie with the vegetable bag.",
    minigame: "subway",
    onWin: "event_travel_tier1",
    onLose: "hub"
  },

  // --- EVENTS ---
  "event_ktv": {
    speaker: "Local Friends",
    bgImage: '/images/simulator/ktv_bg.jpg',
    text: "The KTV room is too bright, the fruit platter is too serious, and everyone knows exactly which chorus arrives next. You know almost none of the songs, which somehow makes the invitation feel more generous.",
    choices: [
      {
        text: "Sing one chorus and laugh at your own pronunciation.",
        condition: { stats: { culture: { min: 10 } } },
        next: "hub",
        effects: { stats: { chinese: 3, culture: 5, energy: -3 }, guanxi: { localStudents: 6 } }
      },
      {
        text: "Stay mostly quiet, but stop treating the room like a test.",
        next: "hub",
        effects: { stats: { energy: 3, culture: 2 }, guanxi: { localStudents: 2 } }
      }
    ]
  },
  "event_jubensha": {
    speaker: "Game Master (DM)",
    text: "The script is dense, dramatic, and full of words nobody taught you in HSK class. Half the challenge is solving the mystery. The other half is realizing how much social play lives inside language.",
    choices: [
      {
        text: "Defend your character with notes, guesses, and brave Chinese.",
        next: "hub",
        effects: { stats: { energy: -6, chinese: 5, culture: 7 }, guanxi: { localStudents: 6 } }
      }
    ]
  },
  "event_travel_tier1": {
    speaker: "Shanghai",
    bgImage: '/images/simulator/shanghai_bg.jpg',
    text: "You arrive at Hongqiao Railway Station and remember that travel in China is both incredibly efficient and physically enormous. The station is a city made of gates, noodles, suitcases, and people who know exactly where to stand.",
    choices: [
      {
        text: "Practice reading the station flow without panicking.",
        next: "hub",
        effects: { stats: { digitalProficiency: 3, culture: 4, energy: -4 } }
      },
      {
        text: "Buy a simple meal and get back to campus.",
        next: "hub",
        effects: { stats: { energy: 4, wealth: -35 } }
      }
    ]
  },
  "event_travel_tier3": {
    speaker: "Dali, Yunnan",
    bgImage: '/images/simulator/dali_bg.jpg',
    text: "The air is beautiful, the mountains are stunning. Nobody speaks English here.",
    choices: [
      {
        text: "Embrace the slow life and practice speaking with locals.",
        next: "hub",
        effects: { stats: { energy: +50, culture: +20, chinese: +5 } }
      }
    ]
  },

  "event_tantan_date": {
    speaker: "Campus Coffee Meetup",
    text: "A student from a campus group suggests coffee after a language-exchange thread. It is not a grand love-interest route. It is two people trying to be less awkward in a city that keeps giving them new contexts.",
    choices: [
      {
        text: "Keep the conversation bilingual and low-pressure.",
        next: "hub",
        effects: { stats: { chinese: 5, culture: 2, energy: -3 }, guanxi: { localStudents: 3 } }
      },
      {
        text: "Let it be a friendly one-off and go home early.",
        next: "hub",
        effects: { stats: { energy: 3 }, guanxi: { localStudents: 2 } }
      }
    ]
  },
  "event_language_exchange": {
    speaker: "Mixer Organizer",
    text: "The mixer is loud enough to make everyone forgive mistakes. You trade campus phrases, delivery-call scripts, and the kind of slang that never appears in textbooks.",
    choices: [
      {
        text: "Swap WeChats and become study buddies.",
        next: "hub",
        effects: { stats: { chinese: 5, culture: 5 }, guanxi: { localStudents: 5 } }
      }
    ]
  },
  "event_xiao_chen": {
    speaker: "Xiao Chen",
    text: "You meet Xiao Chen at a campus-adjacent cafe where he is mapping student problems onto a messy spreadsheet. He talks fast, but the useful part is not startup glamour. It is how quickly he notices friction other people accept as normal.",
    choices: [
      {
        text: "Turn one campus complaint into a testable idea.",
        next: "hub",
        effects: { stats: { digitalProficiency: 6, culture: 3, energy: -5 }, guanxi: { localStudents: 4 }, relationships: { "Xiao Chen": { friendship: 6 } } }
      }
    ]
  },
  "event_xiao_chen_business": {
    speaker: "Xiao Chen",
    text: "Because you have been useful and honest, Xiao Chen asks whether you can help test the idea with international students. It is not a co-founder fantasy. It is a small experiment with real users and very little sleep.",
    choices: [
      {
        text: "Agree to a tiny, measurable pilot.",
        next: "hub",
        effects: { stats: { digitalProficiency: 8, culture: 4, energy: -10 }, guanxi: { localStudents: 6, intlStudents: 4 }, relationships: { "Xiao Chen": { friendship: 8 } }, flags: { xiao_chen_startup: true, xiao_chen_city_prototype: true } }
      }
    ]
  },
  "event_sophie": {
    speaker: "Sophie",
    text: "Sophie invites you to a quiet corner table after another long week. You swap practical stories: payment failures, homesickness, and the weird relief of being understood without explaining every detail first.",
    choices: [
      {
        text: "Trade coping notes and promise to check in again.",
        next: "hub",
        effects: { stats: { energy: 8 }, guanxi: { intlStudents: 8 }, relationships: { "Sophie": { friendship: 8 } } }
      }
    ]
  },
  "event_sophie_date": {
    speaker: "Sophie",
    text: "You and Sophie choose a simple riverside walk instead of making the evening perform for anyone else. If there is affection here, it grows out of shared context, not fireworks.",
    choices: [
      {
        text: "Let the moment stay gentle and honest.",
        next: "hub",
        effects: { stats: { energy: 6, culture: 3 }, relationships: { "Sophie": { romance: 6, friendship: 6 } }, flags: { sophie_dated: true } }
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
        effects: { stats: { energy: +30, culture: +15, chinese: +5 }, relationships: { "Uncle Wang": { friendship: +10 } } }
      }
    ]
  },
  "event_uncle_wang_baijiu": {
    speaker: "Uncle Wang",
    text: "Uncle Wang jokes about baijiu and then, seeing your face, pours tea instead. The real ritual is not drinking. It is being included without being pushed past your limits.",
    choices: [
      {
        text: "Accept the tea, the joke, and the belonging.",
        next: "hub",
        effects: { stats: { energy: 4, culture: 8, chinese: 4 }, relationships: { "Uncle Wang": { friendship: 8 } }, flags: { uncle_wang_drank: true } }
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
        effects: { stats: { academics: +10, energy: -5 }, relationships: { "Dr. Mei": { friendship: +10 } } }
      }
    ]
  },
  "event_dr_mei_lab": {
    speaker: "Dr. Mei",
    text: "Because of your consistent engagement, Dr. Mei lets you help clean notes and prepare a small research appendix. It is not instant co-authorship. It is trust measured in careful tasks.",
    choices: [
      {
        text: "Take furious notes and format citations.",
        next: "hub",
        effects: { stats: { academics: 8, energy: -8, chinese: 4 }, relationships: { "Dr. Mei": { friendship: 8 } }, flags: { dr_mei_paper: true, dr_mei_project_trust: true } }
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
    text: "As a trusted contact, Manager Zhang invites you to a small alumni dinner. He asks direct questions about your career plans, then explains which parts sound real and which parts sound like application language.",
    choices: [
      {
        text: "Answer carefully and ask what a legal path would require.",
        next: "hub",
        effects: { stats: { culture: 8, digitalProficiency: 5, energy: -8 }, guanxi: { admin: 8 }, relationships: { "Manager Zhang": { friendship: 8 } }, flags: { manager_zhang_job: true, legal_internship_ready: true } }
      }
    ]
  },

  // --- CITY TRAVEL EVENTS ---
  "event_travel_shanghai": {
    speaker: "Shanghai",
    text: "You arrive back in Shanghai with a bag that feels heavier than when you left and a campus schedule that did not pause out of respect for your weekend.",
    choices: [{ text: "Return to Minghai with new perspective.", next: "hub", effects: { stats: { culture: 2, energy: -2 } } }]
  },
  "event_travel_beijing": {
    speaker: "Beijing",
    text: "You step into Beijing's dry air and realize the capital is not just monuments. It is queues, security checks, accents, museums, policy language, and people living around all of it.",
    choices: [{ text: "Write down what the capital teaches differently.", next: "hub", effects: { stats: { culture: 10, chinese: 2, energy: -3 } } }]
  },
  "event_travel_guangzhou": {
    speaker: "Guangzhou",
    text: "The humidity arrives first. Then the food, the trade language, the Cantonese you do not understand, and a city that makes commerce feel older than any app.",
    choices: [{ text: "Let the city widen your idea of China.", next: "hub", effects: { stats: { culture: 9, chinese: 2, energy: -2 } } }]
  },
  "event_travel_chengdu": {
    speaker: "Chengdu",
    text: "Chengdu slows the tempo without becoming simple. Teahouses, scooters, hotpot steam, and casual jokes make you wonder whether productivity is not the only way to measure a day.",
    choices: [{ text: "Take the slower rhythm seriously.", next: "hub", effects: { stats: { culture: 10, energy: 4 } } }]
  },
  "event_travel_xian": {
    speaker: "Xi'an",
    text: "Xi'an does not feel like a museum. The walls and pagodas are real, but so are traffic lights, noodle shops, students, and people taking selfies with history behind them.",
    choices: [{ text: "Let old and new sit in the same notebook.", next: "hub", effects: { stats: { culture: 12, academics: 2, energy: -3 } } }]
  },
  "event_travel_hangzhou": {
    speaker: "Hangzhou",
    text: "Hangzhou gives you West Lake postcards and tech-campus conversations in the same weekend. Beauty and platform capitalism apparently share a metro line.",
    choices: [{ text: "Compare the lake and the office parks.", next: "hub", effects: { stats: { culture: 8, digitalProficiency: 3, energy: -2 } } }]
  },
  "event_travel_sanya": {
    speaker: "Sanya",
    text: "Sanya is warm, photogenic, expensive in strange places, and more complicated than a beach filter. You rest, but you also notice who gets to relax and who keeps working.",
    choices: [{ text: "Rest without turning the trip into fantasy.", next: "hub", effects: { stats: { energy: 10, culture: 3 } } }]
  },

  // --- CITY SOCIAL TARGETS ---
  "event_beijing_taxi": {
    speaker: "Taxi Driver Lao Li",
    text: "Lao Li talks quickly, jokes faster, and checks whether you understand by asking another question before you have finished processing the first one.",
    choices: [{ text: "Catch what you can and ask one real follow-up.", next: "hub", effects: { stats: { culture: 6, chinese: 5, energy: -5 } } }]
  },
  "event_guangzhou_boss": {
    speaker: "Boss Wu",
    text: "Over dim sum, Boss Wu explains business through examples instead of slogans: supplier trust, shipping delays, price pressure, and why nobody believes a perfect timeline.",
    choices: [{ text: "Listen for how business actually sounds.", next: "hub", effects: { stats: { culture: 5, chinese: 6, digitalProficiency: 2 }, guanxi: { admin: 4 } } }]
  },
  "event_chengdu_tea": {
    speaker: "Teahouse Auntie",
    text: "You sit in a bamboo chair while an auntie explains the tea, the neighborhood, and your life choices with equal confidence.",
    choices: [{ text: "Smile, listen, and let the afternoon slow down.", next: "hub", effects: { stats: { culture: 8, energy: 6 } } }]
  },
  "event_xian_tour": {
    speaker: "Guide Jin",
    bgImage: '/images/simulator/backgrounds/bg_terracotta_museum.jpg',
    text: "Jin is an expert on the Qin Dynasty. He gives you a private tour of the Terracotta Army, explaining the incredible logistics of the ancient empire.",
    choices: [{ text: "Absorb the ancient history.", next: "hub", effects: { stats: { culture: +30, academics: +10, energy: -10 } } }]
  },
  "event_hangzhou_tea": {
    speaker: "Tea Pavilion",
    text: "Near West Lake, the tea is not mystical. It is precise: water temperature, leaf shape, timing, patience. You realize calm can also be a technique.",
    choices: [{ text: "Let the ritual reset your attention.", next: "hub", effects: { stats: { culture: 8, energy: 8, digitalProficiency: -2 } } }]
  },
  "event_sanya_surf": {
    speaker: "Surfer Hao",
    text: "Hao teaches you to stop fighting the board for at least three seconds at a time. You fall constantly. It is hard to worry about your transcript underwater.",
    choices: [{ text: "Stand once, briefly, and count it.", next: "hub", effects: { stats: { energy: 8, culture: 3 } } }]
  },

  "event_sh_ins_clubbing": {
    speaker: "Fuxing Park Night Blocks",
    bgImage: '/images/simulator/backgrounds/bg_fuxing_park_night.jpg',
    text: "The music is loud, but the more interesting part is the ecosystem around it: taxis waiting, groups taking photos, staff managing lines, and students deciding how much night they can afford.",
    choices: [{ text: "Leave before the night eats tomorrow.", next: "hub", effects: { stats: { energy: -8, culture: 6, academics: -2 }, guanxi: { localStudents: 5 }, magnet: { name: "INS Disco", emoji: "🪩", image: "assets/magnets/shanghai_ins_disco.png" } } }]
  },
  "event_sh_bund_walk": {
    speaker: "The Bund",
    bgImage: '/images/simulator/backgrounds/bg_shanghai_bund_evening.jpg',
    text: "You walk along the Huangpu River and let the city perform its favorite contrast: stone buildings on one side, neon towers on the other, ordinary people moving between both.",
    choices: [{ text: "Reflect without turning the skyline into a slogan.", next: "hub", effects: { stats: { energy: 5, culture: 6 }, magnet: { name: "Pearl Tower", emoji: "🗼", image: "assets/magnets/shanghai_pearl_tower.png" } } }]
  },
  "event_sh_lujiazui_mixer": {
    speaker: "Student Fintech Talk",
    bgImage: '/images/simulator/backgrounds/bg_lujiazui_fintech_talk.jpg',
    text: "The talk is less glamorous than the towers outside, which makes it more useful. People discuss compliance, payment rails, user trust, and why finance hates vague enthusiasm.",
    choices: [{ text: "Ask one practical question after the talk.", next: "hub", effects: { stats: { digitalProficiency: 5, energy: -5 }, guanxi: { admin: 4 }, magnet: { name: "Fintech Coin", emoji: "🪙", image: "assets/magnets/shanghai_lujiazui_coin.png" } } }]
  },

  // --- CITY ENTERTAINMENT EVENTS ---
  "event_beijing_opera": {
    speaker: "Peking Opera Theater",
    bgImage: '/images/simulator/backgrounds/bg_beijing_opera.jpg',
    text: "You watch a traditional Peking Opera. The piercing falsetto singing and acrobatic martial arts are fascinating, if a bit hard to understand.",
    choices: [{ text: "Appreciate the deep culture.", next: "hub", effects: { stats: { culture: +20, energy: +10 }, magnet: { name: "Opera Mask", emoji: "🎭", image: "assets/magnets/peking_opera_mask.png" } } }]
  },
  "event_guangzhou_market": {
    speaker: "Wholesale Market",
    text: "You get lost in a multi-story wholesale market and start noticing how price, volume, quality, and livestream aesthetics all negotiate with each other.",
    choices: [{ text: "Leave with notes instead of too many bags.", next: "hub", effects: { stats: { digitalProficiency: 5, energy: -4, culture: 5 }, magnet: { name: "Baima Bag", emoji: "🛍️", image: "assets/magnets/baima_shopping_bag.png" } } }]
  },
  "event_chengdu_hotpot": {
    speaker: "Local Hotpot Restaurant",
    bgImage: '/images/simulator/backgrounds/bg_chengdu_hotpot.jpg',
    text: "The mala heat builds slowly and then all at once. The table teaches you pacing, sharing, dipping sauce opinions, and humility.",
    choices: [{ text: "Handle the heat with dignity and extra sesame oil.", next: "hub", effects: { stats: { energy: 4, culture: 8 }, magnet: { name: "Chili Pepper", emoji: "🌶️", image: "assets/magnets/chengdu_chili.png" } } }]
  },
  "event_xian_cycling": {
    speaker: "Ancient Walls",
    text: "You cycle along the city wall as traffic moves below and tourists stop for photos. History feels less like the past when your legs are tired.",
    choices: [{ text: "Keep pedaling until the city makes sense sideways.", next: "hub", effects: { stats: { energy: -2, culture: 10 }, magnet: { name: "City Guard", emoji: "🗿", image: "assets/magnets/terracotta_warrior.png" } } }]
  },
  "event_hangzhou_boat": {
    speaker: "West Lake Boatman",
    text: "A boat crosses West Lake slowly enough that your phone finally feels rude. The view is famous, yes, but the pause is what you needed.",
    choices: [{ text: "Let the quiet do some work.", next: "hub", effects: { stats: { energy: 8, culture: 8 }, magnet: { name: "West Lake Boat", emoji: "🛶", image: "assets/magnets/west_lake_boat.png" } } }]
  },
  "event_sanya_yacht": {
    speaker: "Yalong Bay Public Beach",
    text: "From the public beach, resort tourism looks like a machine made of towels, wristbands, photo angles, service labor, and money moving quietly in the background.",
    choices: [{ text: "Enjoy the water and notice the system around it.", next: "hub", effects: { stats: { energy: 6, culture: 4 }, magnet: { name: "Yacht Wheel", emoji: "🛥️", image: "assets/magnets/sanya_yacht.png" } } }]
  },

  // --- CITY OBSERVATION EVENTS ---
  "event_beijing_tourguide": {
    speaker: "Palace Signage",
    text: "You try translating signs for your own notes and quickly learn that history vocabulary has teeth. Still, each phrase you understand makes the place less silent.",
    choices: [{ text: "Save the useful words for later.", next: "hub", effects: { stats: { chinese: 5, academics: 2, energy: -6 } } }]
  },
  "event_guangzhou_cantonfair": {
    speaker: "Trade Fair Floor",
    bgImage: '/images/simulator/backgrounds/bg_canton_fair.jpg',
    text: "You shadow a bilingual exchange long enough to see how much work happens between literal translation and real agreement.",
    choices: [{ text: "Record market vocabulary and stay out of the deal.", next: "hub", effects: { stats: { chinese: 8, digitalProficiency: 4, energy: -8 } } }]
  },
  "event_chengdu_volunteer": {
    speaker: "Sanctuary Guide",
    bgImage: '/images/simulator/backgrounds/bg_chengdu_panda_base.jpg',
    text: "The guide explains conservation work with the patience of someone who has answered the same panda questions all morning. Cute animals do not make the logistics cute.",
    choices: [{ text: "Take notes and respect the distance.", next: "hub", effects: { stats: { energy: -5, culture: 8, academics: 2 } } }]
  },
  "event_xian_souvenirs": {
    speaker: "Street Vendor Boss",
    text: "A vendor explains which souvenirs sell to whom and why. You expected bargaining tricks. You get a tiny lecture on tourism psychology.",
    choices: [{ text: "Ask about the difference between price and value.", next: "hub", effects: { stats: { culture: 6, chinese: 3 } } }]
  },
  "event_hangzhou_alibaba": {
    speaker: "Tech Info Session",
    text: "The info session is polished but specific: product sense, compliance, language ability, internships, and the difference between admiring a company and being ready to work in one.",
    choices: [{ text: "Turn the notes into a realistic skills list.", next: "hub", effects: { stats: { academics: 5, digitalProficiency: 7, energy: -8 } } }]
  },
  "event_sanya_bartender": {
    speaker: "Beach Club Staff",
    text: "A staff member explains seasonal work between orders: good months, exhausting weeks, tourists who forget workers are people, and why service smiles are still labor.",
    choices: [{ text: "Listen without turning someone else's job into your adventure.", next: "hub", effects: { stats: { culture: 6, energy: -3 } } }]
  },

  // --- RANDOM INTERRUPT EVENTS ---
  "random_subway": {
    speaker: "Shanghai Metro",
    text: "You transfer at People's Square during rush hour and briefly understand why maps are not the same as lived experience. The signs are clear. The crowd is clearer.",
    choices: [
      {
        text: "Ask a station guard for help in practical Chinese.",
        next: "hub",
        effects: { stats: { energy: -10, chinese: 5, culture: 5 } }
      },
      {
        text: "Exit, call a DiDi, and protect the rest of your day.",
        next: "hub",
        effects: { stats: { wealth: -60, energy: 5 } }
      }
    ]
  },
  "random_lecture": {
    speaker: "Lecture Hall",
    text: "A guest lecture switches into fast Chinese for the example everyone apparently understands. The slide is clear. Your brain is not. You have about thirty seconds to choose a strategy.",
    choices: [
      {
        text: "Try to record the lecture to translate later.",
        next: "hub",
        effects: { stats: { digitalProficiency: 10, energy: -5, academics: 5 } }
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
    bgImage: '/images/simulator/backgrounds/bg_campus_square_club_fair.jpg',
    text: "It is the massive Hundred-Regiment club fair: thousands of student societies shouting, recruiting, and handing out flyers at once.",
    choices: [
      {
        text: "Join the Hanfu (Traditional Clothing) Society.",
        next: "hub",
        effects: { stats: { culture: 20, energy: -5 }, guanxi: { localStudents: 10 } }
      },
      {
        text: "Join the International Student Union.",
        next: "hub",
        effects: { guanxi: { intlStudents: 20 }, stats: { energy: 10, chinese: -5 } }
      }
    ]
  },
  "random_sick": {
    speaker: "Body",
    bgImage: '/images/simulator/backgrounds/bg_campus_clinic.jpg',
    text: "Your body files a formal complaint about sleep, spice, stress, or possibly all three. The responsible thing is boring and correct: recover before this becomes a bigger problem.",
    choices: [
      {
        text: "Take the week lightly and recover properly.",
        action: "advance_turn",
        next: "hub",
        effects: { stats: { energy: -12, culture: +3 } }
      }
    ]
  },
  "random_exam": {
    speaker: "Professor",
    text: "A short in-class quiz appears without drama, which somehow makes it worse. It is not designed to destroy you; it is designed to show whether you have been keeping up.",
    choices: [
      {
        text: "Do your best and note what needs repair.",
        next: "hub",
        effects: { stats: { energy: -8, academics: -3 } }
      }
    ]
  },

  "random_vpn_down": {
    speaker: "Phone Screen",
    bgImage: '/images/simulator/backgrounds/bg_phone_network_problem.jpg',
    text: "Your usual outside-web access keeps dropping while you are trying to check sources for class. Annoying, yes. Catastrophic, only if you let it eat the whole day.",
    choices: [
      {
        text: "Troubleshoot calmly and document what works.",
        next: "hub",
        effects: { stats: { digitalProficiency: 10, energy: -8 } }
      },
      {
        text: "Switch to Chinese platforms and compare sources.",
        next: "hub",
        effects: { stats: { culture: 10, chinese: 8, energy: 3 } }
      }
    ]
  },
  "random_dorm_inspection": {
    speaker: "Dorm Auntie",
    bgImage: '/images/simulator/backgrounds/bg_dorm_inspection.jpg',
    text: "Surprise dorm inspection! The Auntie (Ayí) is checking rooms for unauthorized appliances like hot plates and rice cookers.",
    choices: [
      {
        text: "Quickly hide your illegal microwave under the bed.",
        next: "hub",
        effects: { stats: { energy: -15, culture: +5 } }
      }
    ]
  },

  // --- ENDINGS / GAME OVERS ---
  "game_over_energy": {
    speaker: "Campus Clinic",
    bgImage: '/images/simulator/backgrounds/bg_campus_clinic.jpg',
    text: "Legacy recovery route. In the current design, running out of energy no longer ends the game. It forces a recovery week with real opportunity costs.",
    choices: [
      { text: "Enter recovery week", next: "forced_recovery_week" }
    ]
  },
  "game_over_wealth": {
    speaker: "System",
    bgImage: '/images/simulator/cg/cg_money_crisis.jpg',
    text: "ENDING: Out of Money. The emergency rescue already happened once. This time, the numbers do not bend: dorm balance, meal card, metro fare, document fee, every small cost turning into a locked gate. Minghai gives you the kindest version of a hard answer, and your China year ends before the story is ready. The lesson is brutal but useful: dreams need paperwork, and paperwork needs money.",
    choices: [
      { text: "Start Over", action: "reset_game", next: "start" }
    ]
  }

};
