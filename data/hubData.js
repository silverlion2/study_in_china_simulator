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
        text: "💬 Character Contacts",
        condition: { flags: { "arrived_in_china": true } },
        next: "submenu_character_contacts"
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
        text: "Build the academic portfolio index. [Portfolio project]",
        condition: { flags: { academic_portfolio_indexed: false } },
        next: "event_project_academic_portfolio_index"
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
        text: "Update your neighborhood map. [Route project]",
        condition: { flags: { neighborhood_map_indexed: false } },
        next: "event_project_neighborhood_map"
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
        text: "Turn support notes into a guide chapter. [Route project]",
        condition: { flags: { support_guide_chapter_ready: false } },
        next: "event_project_support_guide_chapter"
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
        text: "Assemble the internship dossier. [Route project]",
        condition: { flags: { internship_dossier_ready: false } },
        next: "event_project_internship_dossier"
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
        text: "Clean the prototype telemetry board. [Route project]",
        condition: { flags: { prototype_telemetry_board: false } },
        next: "event_project_prototype_telemetry"
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
        text: "Follow up after forced recovery. [Recovery chain]",
        condition: { flags: { recovery_week_scar: true, recovery_followup_done: false } },
        next: "event_recovery_forced_followup"
      },
      {
        text: "Repair the academic recovery scar. [Recovery chain]",
        condition: { flags: { academic_recovery_check_strained: true, academic_recovery_followup_done: false } },
        next: "event_recovery_academic_followup"
      },
      {
        text: "Stabilize after the money rescue. [Recovery chain]",
        condition: { flags: { emergency_funding_used: true, money_recovery_followup_done: false } },
        next: "event_recovery_money_followup"
      },
      {
        text: "Audit the budget ledger before it bites. [Route project]",
        condition: { flags: { budget_ledger_audited: false } },
        next: "event_project_budget_ledger"
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

  "submenu_character_contacts": {
    speaker: "Character Contacts",
    bgImage: '/images/simulator/backgrounds/bg_campus_cafe.jpg',
    text: "A relationship is not only a number in your SimPad. This week, you can choose someone specific, make time for them, and let the conversation change the shape of your life at Minghai.",
    choices: [
      {
        text: "Ask Professor Lin for a real office-hour conversation. [Talk]",
        condition: { flags: { contact_professor_lin_talk_1: false }, relationships: { "Professor Lin": { friendship: { min: 4 } } } },
        next: "event_contact_professor_lin_talk_1"
      },
      {
        text: "Help Professor Lin with a confused class question. [Request]",
        condition: { flags: { contact_professor_lin_talk_1: true, request_professor_lin_class_question: false }, relationships: { "Professor Lin": { friendship: { min: 8 } } } },
        next: "event_request_professor_lin_class_question"
      },
      {
        text: "Invite Dr. Mei to unpack the research problem over coffee. [Invite]",
        condition: { flags: { met_dr_mei: true, contact_dr_mei_talk_1: false } },
        next: "event_contact_dr_mei_talk_1"
      },
      {
        text: "Answer Dr. Mei's request for careful field notes. [Request]",
        condition: { flags: { contact_dr_mei_talk_1: true, request_dr_mei_field_notes: false } },
        next: "event_request_dr_mei_field_notes"
      },
      {
        text: "Meet Sophie in the common room before the group arrives. [Talk]",
        condition: { flags: { contact_sophie_talk_1: false }, relationships: { Sophie: { friendship: { min: 4 } } } },
        next: "event_contact_sophie_talk_1"
      },
      {
        text: "Help Sophie calm a new student's arrival spiral. [Request]",
        condition: { flags: { contact_sophie_talk_1: true, request_sophie_new_student: false }, relationships: { Sophie: { friendship: { min: 8 } } } },
        next: "event_request_sophie_new_student"
      },
      {
        text: "Walk the campus market with Xiao Chen. [Invite]",
        condition: { flags: { met_xiao_chen: true, contact_xiao_chen_talk_1: false } },
        next: "event_contact_xiao_chen_talk_1"
      },
      {
        text: "Test Xiao Chen's onboarding copy before he launches it. [Request]",
        condition: { flags: { contact_xiao_chen_talk_1: true, request_xiao_chen_onboarding: false } },
        next: "event_request_xiao_chen_onboarding"
      },
      {
        text: "Ask Neighbor Li to show you the dorm's unwritten map. [Request]",
        condition: { flags: { met_neighbor_li: true, contact_neighbor_li_talk_1: false } },
        next: "event_contact_neighbor_li_talk_1"
      },
      {
        text: "Help Neighbor Li mediate a hallway parcel problem. [Request]",
        condition: { flags: { contact_neighbor_li_talk_1: true, request_neighbor_li_parcel: false } },
        next: "event_request_neighbor_li_parcel"
      },
      {
        text: "Book a short career chat with Manager Zhang. [Talk]",
        condition: { flags: { met_manager_zhang: true, contact_manager_zhang_talk_1: false } },
        next: "event_contact_manager_zhang_talk_1"
      },
      {
        text: "Send Manager Zhang the polished interview answer he requested. [Request]",
        condition: { flags: { contact_manager_zhang_talk_1: true, request_manager_zhang_answer: false } },
        next: "event_request_manager_zhang_answer"
      },
      {
        text: "Return to Uncle Wang's stall when it is not too crowded. [Invite]",
        condition: { flags: { met_uncle_wang: true, contact_uncle_wang_talk_1: false }, stats: { wealth: { min: 35 } } },
        next: "event_contact_uncle_wang_talk_1"
      },
      {
        text: "Help Uncle Wang translate a student's confusing order. [Request]",
        condition: { flags: { contact_uncle_wang_talk_1: true, request_uncle_wang_order_help: false }, stats: { wealth: { min: 25 } } },
        next: "event_request_uncle_wang_order_help"
      },
      {
        text: "Back to weekly planner",
        next: "hub"
      }
    ]
  },

  // --- CHARACTER CONTACT EVENTS ---
  "event_contact_professor_lin_talk_1": {
    speaker: "Professor Lin",
    bgImage: '/images/simulator/cg/cg_professor_lin_office_hours.jpg',
    text: "Professor Lin closes your draft and sets his pen beside it, exactly parallel to the desk edge.\n\nProfessor Lin: 'You booked twenty minutes. Good. Twenty honest minutes are better than two hours of performance.'\n\nYou: 'I thought we were talking about the assignment.'\n\nProfessor Lin: 'We are.' He taps the margin where your argument collapses into description. 'But the assignment is not the only thing avoiding clarity.'\n\nYou look at the red comments. None of them are cruel. Somehow that makes them harder to survive.\n\nProfessor Lin: 'Tell me which part of studying here has made you feel least competent. Not the polite answer. The useful one.'",
    dialogueChoices: [
      {
        text: "I keep doing tasks so I do not have to admit I am confused.",
        reply: "That is honest. Confusion is not the failure. Building a routine that hides it is the failure.",
        effects: {
          stats: { academics: 2, energy: -1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_professor_lin_admitted_confusion: true, route_academic: true }
        }
      },
      {
        text: "I understand pieces, but I cannot make them become an argument.",
        reply: "Good. Then we work on structure, not panic. Panic is rarely a useful bibliography.",
        effects: {
          stats: { academics: 3 },
          relationships: { "Professor Lin": { friendship: 1 } },
          flags: { dialogue_professor_lin_argument_gap: true, route_academic: true }
        }
      },
      {
        text: "I am afraid if I say the real answer, you will think I do not belong here.",
        reply: "Belonging is not proven by pretending. It is proven by staying teachable when pretending would be easier.",
        effects: {
          stats: { academics: 1, culture: 2, energy: 2 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { dialogue_professor_lin_belonging_fear: true, route_academic: true }
        }
      }
    ],
    choices: [
      {
        text: "Admit you keep confusing busyness with progress.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 7, culture: 2, energy: -3 },
          guanxi: { professors: 5 },
          relationships: { "Professor Lin": { friendship: 7 } },
          flags: { weekly_focus: "Professor Lin honest office hour", route_academic: true, contact_professor_lin_talk_1: true }
        }
      },
      {
        text: "Keep the conversation on technique and protect your pride.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 5, energy: -1 },
          guanxi: { professors: 2 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { weekly_focus: "Professor Lin technique check", route_academic: true, contact_professor_lin_talk_1: true }
        }
      }
    ]
  },

  "event_contact_dr_mei_talk_1": {
    speaker: "Dr. Mei",
    bgImage: '/images/simulator/backgrounds/bg_campus_cafe.jpg',
    text: "Dr. Mei arrives with coffee, a notebook, and no patience for vague fascination.\n\nDr. Mei: 'You said Shanghai feels complicated.'\n\nYou: 'It does.'\n\nDr. Mei opens the notebook but does not write yet.\n\nDr. Mei: 'Complicated how? If the answer can fit on a postcard, it is probably not research.'\n\nThe cafe machine hisses behind you. A student at the next table laughs into a voice message.\n\nYou: 'I am not sure I know how to say it without sounding naive.'\n\nDr. Mei: 'Good. Naive can be a starting point. Vague cannot.'",
    dialogueChoices: [
      {
        text: "People say everything is convenient, but I keep seeing who has to make it convenient.",
        reply: "That is an observation. Do not polish it yet. Follow who pays the hidden cost.",
        effects: {
          stats: { academics: 2, culture: 2 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_hidden_costs: true, route_academic: true }
        }
      },
      {
        text: "I worry I am turning China into material instead of understanding people.",
        reply: "Good worry. Keep it. Ethical discomfort can become method if you do not run from it.",
        effects: {
          stats: { academics: 1, culture: 3, energy: -1 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_ethics_worry: true, route_academic: true }
        }
      },
      {
        text: "I do not know what is important yet. Everything feels loud.",
        reply: "Then your first task is not analysis. It is attention. Write down what keeps returning.",
        effects: {
          stats: { academics: 2, energy: 1 },
          relationships: { "Dr. Mei": { friendship: 1 } },
          flags: { dialogue_dr_mei_attention_first: true, route_academic: true }
        }
      }
    ],
    choices: [
      {
        text: "Name one contradiction you have actually observed.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 6, culture: 6, energy: -3, wealth: -28 },
          guanxi: { professors: 4 },
          relationships: { "Dr. Mei": { friendship: 7 } },
          flags: { weekly_focus: "Dr. Mei research coffee", route_academic: true, contact_dr_mei_talk_1: true, dr_mei_observation_notebook: true }
        }
      },
      {
        text: "Ask her how to avoid turning people into examples.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 4, culture: 8, energy: -4, wealth: -28 },
          guanxi: { professors: 5 },
          relationships: { "Dr. Mei": { friendship: 8 } },
          flags: { weekly_focus: "Dr. Mei ethics coffee", route_academic: true, contact_dr_mei_talk_1: true, dr_mei_ethics_seed: true }
        }
      }
    ]
  },

  "event_contact_sophie_talk_1": {
    speaker: "Sophie",
    bgImage: '/images/simulator/backgrounds/bg_dorm_common_room.jpg',
    text: "The dorm common room is quiet except for the kettle clicking itself off.\n\nSophie sits cross-legged on the sofa, phone face-down for once.\n\nSophie: 'Before everyone arrives, can I ask you something without doing the group-chat version of caring?'\n\nYou: 'That sounds dangerous.'\n\nSophie: 'It is only medium dangerous.' She tries to smile, then lets it go. 'Are you okay, or are you doing international-student okay?'\n\nYou look at the empty cups on the table, the half-translated campus notice, the city outside the window refusing to become simple.\n\nSophie: 'You do not have to make it inspiring. I am tired of everyone making survival sound like a brochure.'",
    dialogueChoices: [
      {
        text: "International-student okay. Functional in public, weirdly fragile after midnight.",
        reply: "That is the most accurate definition anyone has given me. Come sit here. No fixing for five minutes.",
        effects: {
          stats: { energy: 4 },
          guanxi: { intlStudents: 1 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_midnight_fragile: true, route_intl: true }
        }
      },
      {
        text: "I am scared if I start talking, I will become the needy one.",
        reply: "You are allowed to need things before you become an emergency. That is literally the point of friendship.",
        effects: {
          stats: { energy: 5, culture: 1 },
          relationships: { Sophie: { friendship: 4 } },
          flags: { dialogue_sophie_need_fear: true, route_intl: true }
        }
      },
      {
        text: "Can we talk while doing something practical? Feelings are easier with tasks.",
        reply: "Absolutely. We weaponize snacks, spreadsheets, and emotional avoidance for good.",
        effects: {
          stats: { energy: 2, digitalProficiency: 2 },
          guanxi: { intlStudents: 2 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { dialogue_sophie_practical_care: true, route_intl: true }
        }
      }
    ],
    choices: [
      {
        text: "Tell her the version you usually edit out.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 8, culture: 2 },
          guanxi: { intlStudents: 5 },
          relationships: { Sophie: { friendship: 8 } },
          flags: { weekly_focus: "Honest common-room talk with Sophie", route_intl: true, contact_sophie_talk_1: true }
        }
      },
      {
        text: "Make a joke, then help her set up the support dinner.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 5, digitalProficiency: 3 },
          guanxi: { intlStudents: 7 },
          relationships: { Sophie: { friendship: 5 } },
          flags: { weekly_focus: "Sophie support dinner setup", route_intl: true, contact_sophie_talk_1: true }
        }
      }
    ]
  },

  "event_contact_xiao_chen_talk_1": {
    speaker: "Xiao Chen",
    bgImage: '/images/simulator/backgrounds/bg_campus_square_club_fair.jpg',
    text: "Xiao Chen walks the campus market like every complaint is a possible product.\n\nXiao Chen: 'Do not look at the posters. Look at the line.'\n\nYou: 'The payment QR line?'\n\nXiao Chen points with his drink straw. Three students are refreshing the same frozen screen while pretending not to be annoyed.\n\nXiao Chen: 'Exactly. People tell you what they need when something wastes their time.'\n\nYou: 'That sounds like a very Shanghai way to make friends.'\n\nXiao Chen grins.\n\nXiao Chen: 'No, this is a very Shanghai way to find users before calling them users.'",
    dialogueChoices: [
      {
        text: "So your friendship language is user research?",
        reply: "Only for people I respect. For everyone else I pretend to make normal small talk.",
        effects: {
          stats: { digitalProficiency: 2, energy: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_research_joke: true, route_city: true }
        }
      },
      {
        text: "Before we build anything, can we ask people what actually hurts?",
        reply: "Yes. Pain before product. You may be annoying in a useful way.",
        effects: {
          stats: { digitalProficiency: 3, culture: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_pain_before_product: true, route_city: true }
        }
      },
      {
        text: "I can help with international students, but not if this becomes exploitative.",
        reply: "Fair. If the idea only works when users are confused, the idea is bad.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2, energy: -1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_user_dignity: true, route_city: true }
        }
      }
    ],
    choices: [
      {
        text: "Interview three students before proposing a solution.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 7, culture: 4, energy: -4 },
          guanxi: { localStudents: 3 },
          relationships: { "Xiao Chen": { friendship: 7 } },
          flags: { weekly_focus: "Campus market walk with Xiao Chen", route_city: true, contact_xiao_chen_talk_1: true, xiao_chen_user_interviews: true }
        }
      },
      {
        text: "Pitch a quick idea and let him challenge it hard.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, wealth: 80, energy: -6 },
          relationships: { "Xiao Chen": { friendship: 4 } },
          flags: { weekly_focus: "Xiao Chen fast prototype debate", route_city: true, contact_xiao_chen_talk_1: true, xiao_chen_fast_pitch_seed: true }
        }
      }
    ]
  },

  "event_contact_neighbor_li_talk_1": {
    speaker: "Neighbor Li",
    bgImage: '/images/simulator/backgrounds/bg_dorm_common_room.jpg',
    text: "Neighbor Li flips over a delivery receipt and starts drawing the dorm like it is a small city.\n\nNeighbor Li: 'This floor borrows tools. That floor borrows everything and returns nothing. Do not ask in the big group chat before checking the pinned message.'\n\nYou: 'There is a pinned message?'\n\nNeighbor Li looks at you with sincere concern.\n\nNeighbor Li: 'There are always pinned messages.'\n\nYou lean closer as Li marks the laundry room, the parcel shelf, and the auntie who notices whether people greet her before needing help.\n\nNeighbor Li: 'These are not official rules. Official rules are on the wall. These are the rules that keep you from becoming a screenshot in the group chat.'",
    dialogueChoices: [
      {
        text: "Please teach me the unofficial rules before I become a screenshot.",
        reply: "Good. Fear of screenshots is the beginning of dorm wisdom.",
        effects: {
          stats: { culture: 3, chinese: 1 },
          guanxi: { localStudents: 1 },
          relationships: { "Neighbor Li": { friendship: 3 } },
          flags: { dialogue_neighbor_li_unofficial_rules: true, route_local: true }
        }
      },
      {
        text: "I want to help, but I do not want to be the loud foreigner in every problem.",
        reply: "Then learn when to translate and when to stand slightly behind someone else. Both are skills.",
        effects: {
          stats: { culture: 3, energy: -1 },
          relationships: { "Neighbor Li": { friendship: 3 } },
          flags: { dialogue_neighbor_li_not_loud: true, route_local: true }
        }
      },
      {
        text: "Can I ask what people are too polite to say directly?",
        reply: "Yes. But first you learn to hear it when they do not say it.",
        effects: {
          stats: { chinese: 2, culture: 2 },
          guanxi: { localStudents: 1 },
          relationships: { "Neighbor Li": { friendship: 2 } },
          flags: { dialogue_neighbor_li_indirect_signals: true, route_local: true }
        }
      }
    ],
    choices: [
      {
        text: "Ask about the rules people do not say out loud.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 7, chinese: 4, energy: -2 },
          guanxi: { localStudents: 6 },
          relationships: { "Neighbor Li": { friendship: 7 } },
          flags: { weekly_focus: "Neighbor Li dorm map", route_local: true, contact_neighbor_li_talk_1: true, neighbor_li_dorm_map: true }
        }
      },
      {
        text: "Offer to help with the next hallway errand.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 5, chinese: 5, energy: -4 },
          guanxi: { localStudents: 7 },
          relationships: { "Neighbor Li": { friendship: 6 } },
          flags: { weekly_focus: "Neighbor Li hallway errand promise", route_local: true, contact_neighbor_li_talk_1: true, neighbor_li_errand_promise: true }
        }
      }
    ]
  },

  "event_contact_manager_zhang_talk_1": {
    speaker: "Manager Zhang",
    bgImage: '/images/simulator/backgrounds/bg_career_office.jpg',
    text: "Manager Zhang checks the time before you sit down, then turns his phone face-down.\n\nManager Zhang: 'We have fifteen minutes.'\n\nYou sit straighter than you meant to.\n\nManager Zhang: 'Relax. A career chat is not a confession booth. It is also not a performance stage.'\n\nYou: 'Then what should I bring?'\n\nManager Zhang: 'One real question.' He folds his hands on the desk. 'Not \"How do I succeed in China?\" That is a slogan pretending to be a question. Bring something real. We can work with real.'",
    dialogueChoices: [
      {
        text: "What would make someone trust me before my Chinese is perfect?",
        reply: "Preparation. Specificity. And knowing which promises you are legally allowed to make.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          guanxi: { admin: 1 },
          relationships: { "Manager Zhang": { friendship: 3 } },
          flags: { dialogue_manager_zhang_trust_before_fluency: true, route_career: true }
        }
      },
      {
        text: "How do I avoid sounding like every other international applicant?",
        reply: "Stop selling adjectives. Bring evidence. Evidence has an accent people respect.",
        effects: {
          stats: { digitalProficiency: 3, energy: -1 },
          relationships: { "Manager Zhang": { friendship: 2 } },
          flags: { dialogue_manager_zhang_evidence_over_adjectives: true, route_career: true }
        }
      },
      {
        text: "I need to understand the legal boundary before I chase experience.",
        reply: "Good. Ambition without compliance is expensive confidence.",
        effects: {
          stats: { culture: 2, digitalProficiency: 1 },
          guanxi: { admin: 2 },
          relationships: { "Manager Zhang": { friendship: 3 } },
          flags: { dialogue_manager_zhang_legal_boundary: true, route_career: true }
        }
      }
    ],
    choices: [
      {
        text: "Ask how to become useful before asking for an opportunity.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 6, culture: 6, energy: -3 },
          guanxi: { admin: 5 },
          relationships: { "Manager Zhang": { friendship: 7 } },
          flags: { weekly_focus: "Manager Zhang usefulness chat", route_career: true, contact_manager_zhang_talk_1: true, manager_zhang_usefulness_frame: true }
        }
      },
      {
        text: "Ask directly what makes international students fail interviews.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 3, energy: -4 },
          guanxi: { admin: 4 },
          relationships: { "Manager Zhang": { friendship: 6 } },
          flags: { weekly_focus: "Manager Zhang interview failure chat", route_career: true, contact_manager_zhang_talk_1: true, manager_zhang_interview_risks: true }
        }
      }
    ]
  },

  "event_contact_uncle_wang_talk_1": {
    speaker: "Uncle Wang",
    bgImage: '/images/simulator/backgrounds/bg_uncle_wang_bbq.jpg',
    text: "You arrive before the dinner rush, when the grill is warming up and the plastic stools are still stacked.\n\nUncle Wang looks at you, then kicks one stool loose with his foot.\n\nUncle Wang: 'Good timing.'\n\nYou: 'Because there is no line?'\n\nUncle Wang: 'Because when it gets busy, nobody tells the truth. Too much smoke.'\n\nHe turns a row of skewers, not looking at you directly.\n\nUncle Wang: 'Students come here hungry, lonely, excited, broke, heartbroken. They all order like they are only hungry.'\n\nYou sit down.\n\nUncle Wang: 'So. New Minghai student. Which one are you tonight?'",
    dialogueChoices: [
      {
        text: "Hungry, obviously. But also lonelier than I expected.",
        reply: "Then eat slowly. Lonely people order too fast, like the food is going to answer everything.",
        effects: {
          stats: { energy: 3, culture: 2, wealth: -10 },
          relationships: { "Uncle Wang": { friendship: 4 } },
          flags: { dialogue_uncle_wang_lonely_hungry: true, route_local: true }
        }
      },
      {
        text: "Excited. But I keep pretending I understand more than I do.",
        reply: "Good. Tonight you practice saying bu dong. Not understanding is not a disease.",
        effects: {
          stats: { chinese: 3, culture: 1, wealth: -10 },
          relationships: { "Uncle Wang": { friendship: 3 } },
          flags: { dialogue_uncle_wang_practice_budong: true, route_local: true }
        }
      },
      {
        text: "Broke enough to check the price twice.",
        reply: "Then I teach you what fills the stomach without emptying the wallet. This is also education.",
        effects: {
          stats: { culture: 2, energy: 2, wealth: 20 },
          relationships: { "Uncle Wang": { friendship: 2 } },
          flags: { dialogue_uncle_wang_budget_lesson: true, route_local: true, route_survival: true }
        }
      }
    ],
    choices: [
      {
        text: "Ask what students misunderstand about the neighborhood.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 8, chinese: 5, energy: 3, wealth: -35 },
          guanxi: { localStudents: 4 },
          relationships: { "Uncle Wang": { friendship: 8 } },
          flags: { weekly_focus: "Uncle Wang quiet-stall talk", route_local: true, contact_uncle_wang_talk_1: true, uncle_wang_neighborhood_lesson: true }
        }
      },
      {
        text: "Practice ordering for the next student who freezes.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 8, culture: 4, energy: 2, wealth: -35 },
          guanxi: { localStudents: 3 },
          relationships: { "Uncle Wang": { friendship: 6 } },
          flags: { weekly_focus: "Uncle Wang ordering practice", route_local: true, contact_uncle_wang_talk_1: true, uncle_wang_ordering_practice: true }
        }
      }
    ]
  },

  "event_request_professor_lin_class_question": {
    speaker: "Professor Lin",
    bgImage: '/images/simulator/cg/cg_professor_lin_plain_explanation.png',
    text: "Professor Lin forwards you a classmate's confused question with the name removed.\n\nProfessor Lin: 'Explain the concept in plain language.'\n\nYou read the question twice. The embarrassing part is that you understand the confusion better than the answer.\n\nYou: 'Is this for them, or for me?'\n\nProfessor Lin: 'Both, if we are lucky.'\n\nA second message arrives before you can overthink the first.\n\nProfessor Lin: 'If you cannot explain it without decoration, you may not understand it yet.'",
    dialogueChoices: [
      {
        text: "I think I understand the confusion because I still share part of it.",
        reply: "Good. That means you can explain without condescension. Start there.",
        effects: {
          stats: { academics: 3, energy: -1 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { dialogue_lin_shared_confusion: true, route_academic: true }
        }
      },
      {
        text: "Can I send a rough version first, then revise after your correction?",
        reply: "Yes. Iteration is not weakness. Pretending the first version is final is weakness.",
        effects: {
          stats: { academics: 2, digitalProficiency: 1 },
          guanxi: { professors: 1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_iteration_request: true, route_academic: true }
        }
      },
      {
        text: "I want to answer clearly, but I am afraid of exposing how much I do not know.",
        reply: "Then expose it in draft form, where ignorance can still be repaired.",
        effects: {
          stats: { academics: 2, energy: 1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_expose_gap: true, route_academic: true }
        }
      }
    ],
    choices: [
      {
        text: "Write the explanation slowly enough to expose your own gaps.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 8, energy: -4 },
          guanxi: { professors: 4, localStudents: 2 },
          relationships: { "Professor Lin": { friendship: 6 } },
          flags: { weekly_focus: "Professor Lin class-question request", route_academic: true, request_professor_lin_class_question: true },
          lifeCheck: {
            id: "lin_plain_explanation",
            label: "Plain-Language Explanation",
            route: "Academic",
            tags: ["academic", "explanation"],
            stats: { academics: 0.32, chinese: 0.12, culture: 0.12 },
            guanxi: { professors: 0.25 },
            routes: { academic: 1.2 },
            character: "Professor Lin",
            relationshipWeight: 0.25,
            dc: 13,
            success: {
              message: "The explanation works because you stop decorating the gap and start naming it.",
              stats: { academics: 2 },
              flags: { lin_explanation_check_passed: true }
            },
            failure: {
              message: "The answer helps the classmate, but Professor Lin can still hear where clarity turns into performance.",
              stats: { energy: -2 },
              flags: { lin_explanation_check_strained: true }
            }
          }
        }
      },
      {
        text: "Send a concise answer and ask him what still sounds vague.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 6, digitalProficiency: 2, energy: -3 },
          guanxi: { professors: 5 },
          relationships: { "Professor Lin": { friendship: 5 } },
          flags: { weekly_focus: "Professor Lin concise explanation", route_academic: true, request_professor_lin_class_question: true },
          lifeCheck: {
            id: "lin_concise_answer",
            label: "Concise Academic Answer",
            route: "Academic",
            tags: ["academic", "explanation"],
            stats: { academics: 0.3, digitalProficiency: 0.18, culture: 0.08 },
            guanxi: { professors: 0.25 },
            routes: { academic: 1.2 },
            character: "Professor Lin",
            relationshipWeight: 0.25,
            dc: 13,
            success: {
              message: "The concise version survives because it is plain, not thin.",
              stats: { digitalProficiency: 1, academics: 1 },
              flags: { lin_concise_check_passed: true }
            },
            failure: {
              message: "The answer is shorter, but not yet cleaner. Professor Lin marks the sentence that hides the work.",
              stats: { energy: -2 },
              flags: { lin_concise_check_strained: true }
            }
          }
        }
      }
    ]
  },

  "event_request_dr_mei_field_notes": {
    speaker: "Dr. Mei",
    bgImage: '/images/simulator/cg/cg_dr_mei_field_notes.png',
    text: "Dr. Mei sends three messy observation notes from a campus interview. The file name is plain. The notes are not.\n\nDr. Mei: 'Tell me what is missing.'\n\nYou scroll through half-sentences, bracketed pauses, and one line that only says: student laughed, unclear why.\n\nYou: 'Do you want me to clean this into a memo?'\n\nDr. Mei: 'Not yet.'\n\nAnother message appears.\n\nDr. Mei: 'Do not beautify them. Look for what the notes failed to notice.'",
    dialogueChoices: [
      {
        text: "The notes record answers, but not who felt safe giving them.",
        reply: "Exactly. Data has weather. Most people forget to write down the weather.",
        effects: {
          stats: { academics: 2, culture: 3 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_data_weather: true, route_academic: true }
        }
      },
      {
        text: "I want to mark uncertainty instead of pretending the transcript is clean.",
        reply: "Good. Uncertainty is not dirt. It is evidence that the scene was real.",
        effects: {
          stats: { academics: 3, energy: -1 },
          guanxi: { professors: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_mark_uncertainty: true, route_academic: true }
        }
      },
      {
        text: "I can organize them, but I do not want structure to erase the awkward parts.",
        reply: "Then build a structure with room for awkwardness. That is harder, and more honest.",
        effects: {
          stats: { academics: 2, digitalProficiency: 1, culture: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_awkward_structure: true, route_academic: true }
        }
      }
    ],
    choices: [
      {
        text: "Mark the blind spots instead of smoothing the story.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 7, culture: 6, energy: -5 },
          guanxi: { professors: 4 },
          relationships: { "Dr. Mei": { friendship: 6 } },
          flags: { weekly_focus: "Dr. Mei field-note request", route_academic: true, request_dr_mei_field_notes: true, dr_mei_field_note_care: true },
          lifeCheck: {
            id: "mei_field_note_blind_spots",
            label: "Field-Note Blind Spots",
            route: "Academic",
            tags: ["academic", "research"],
            stats: { academics: 0.28, culture: 0.25, digitalProficiency: 0.08 },
            guanxi: { professors: 0.25 },
            routes: { academic: 1.2 },
            character: "Dr. Mei",
            relationshipWeight: 0.25,
            dc: 13,
            success: {
              message: "You notice the silence around the answers, not only the answers themselves.",
              stats: { academics: 1, culture: 2 },
              flags: { mei_blind_spot_check_passed: true }
            },
            failure: {
              message: "You find useful patterns, but Dr. Mei has to remind you where the notes became too neat.",
              stats: { energy: -2 },
              flags: { mei_blind_spot_check_strained: true }
            }
          }
        }
      },
      {
        text: "Organize the notes into a cleaner research memo.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 8, digitalProficiency: 3, energy: -4 },
          guanxi: { professors: 3 },
          relationships: { "Dr. Mei": { friendship: 4 } },
          flags: { weekly_focus: "Dr. Mei research memo", route_academic: true, request_dr_mei_field_notes: true },
          lifeCheck: {
            id: "mei_research_memo",
            label: "Responsible Research Memo",
            route: "Academic",
            tags: ["academic", "research"],
            stats: { academics: 0.3, digitalProficiency: 0.18, culture: 0.12 },
            guanxi: { professors: 0.2 },
            routes: { academic: 1.1 },
            character: "Dr. Mei",
            relationshipWeight: 0.22,
            dc: 13,
            success: {
              message: "The memo gains structure without erasing the awkward evidence.",
              stats: { academics: 2 },
              flags: { mei_memo_check_passed: true }
            },
            failure: {
              message: "The memo is cleaner than the notes, maybe too clean. Dr. Mei writes one word in the margin: context.",
              stats: { energy: -2 },
              flags: { mei_memo_check_strained: true }
            }
          }
        }
      }
    ]
  },

  "event_request_sophie_new_student": {
    speaker: "Sophie",
    bgImage: '/images/simulator/cg/cg_sophie_arrival_rescue.png',
    text: "Sophie catches you outside the dorm elevators with one earbud in and her expression already halfway between worried and organized.\n\nSophie: 'Emergency, but not official emergency.'\n\nShe plays a voice note. A new student has landed, lost the pickup point, and started apologizing to everyone in three languages.\n\nNew Student: 'I am sorry, I think I am at the wrong exit. The driver called but I did not understand. I am really sorry.'\n\nSophie lowers the volume.\n\nSophie: 'You remember this feeling, right? The part where every sign looks like it is judging you?'\n\nYou nod before you mean to.\n\nSophie: 'Can you take this one with me? I can handle the logistics, but they need to hear from someone who survived yesterday, not someone who sounds like an orientation PDF.'",
    dialogueChoices: [
      {
        text: "I remember the shame more than the logistics. Let's start by lowering that.",
        reply: "Yes. Step one: make them stop apologizing to the whole airport.",
        effects: {
          stats: { energy: 2, culture: 1 },
          guanxi: { intlStudents: 2 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_reduce_arrival_shame: true, route_intl: true }
        }
      },
      {
        text: "I can send the practical steps while you stay on voice with them.",
        reply: "Perfect. Logistics plus a human voice. That should be a required arrival package.",
        effects: {
          stats: { digitalProficiency: 2, energy: -1 },
          guanxi: { intlStudents: 2 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { dialogue_sophie_logistics_voice: true, route_intl: true }
        }
      },
      {
        text: "Let's write down what works. Future students should not need heroic guessing.",
        reply: "That sentence is going in the guide. Maybe with fewer dramatic adjectives.",
        effects: {
          stats: { digitalProficiency: 2, culture: 1 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_guide_seed: true, route_intl: true }
        }
      }
    ],
    choices: [
      {
        text: "Send calm steps first, comfort second, jokes last.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 5, energy: -2 },
          guanxi: { intlStudents: 8 },
          relationships: { Sophie: { friendship: 6 } },
          flags: { weekly_focus: "Sophie new-student request", route_intl: true, request_sophie_new_student: true, sophie_arrival_helper: true }
        }
      },
      {
        text: "Join Sophie on a quick rescue call.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: -4, culture: 3 },
          guanxi: { intlStudents: 10 },
          relationships: { Sophie: { friendship: 7 } },
          flags: { weekly_focus: "Sophie arrival rescue call", route_intl: true, request_sophie_new_student: true }
        }
      }
    ]
  },

  "event_request_xiao_chen_onboarding": {
    speaker: "Xiao Chen",
    bgImage: '/images/simulator/cg/cg_xiao_chen_onboarding_test.png',
    text: "Xiao Chen drops a draft onboarding screen into chat at 12:08 AM.\n\nXiao Chen: 'Too many words?'\n\nYou open the image. The screen looks like a small textbook wearing a QR code.\n\nYou: 'Do you want honesty or encouragement?'\n\nXiao Chen: 'Honesty first. Encouragement after launch.'\n\nYou zoom in. There are instructions, warnings, examples, two arrows, and a sentence that starts with \"Simply\" before becoming very unsimple.\n\nXiao Chen: 'Users will read it, right?'\n\nYou do not answer fast enough.\n\nXiao Chen: 'That bad?'",
    dialogueChoices: [
      {
        text: "If a stressed student opens this, they will close it before step two.",
        reply: "Painful. Useful. So step one must survive panic.",
        effects: {
          stats: { digitalProficiency: 3, culture: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_panic_test: true, route_city: true }
        }
      },
      {
        text: "Let's remove every sentence that exists to make us feel clever.",
        reply: "Cruel to my sentences, kind to users. Fine. Delete mode.",
        effects: {
          stats: { digitalProficiency: 3, energy: -1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_delete_mode: true, route_city: true }
        }
      },
      {
        text: "We should watch two people use it without explaining anything.",
        reply: "Silent test. Brutal. Excellent. I will try not to rescue my own design.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2, energy: -1 },
          guanxi: { localStudents: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_silent_test: true, route_city: true }
        }
      }
    ],
    choices: [
      {
        text: "Cut the copy until the first task is impossible to miss.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, culture: 3, energy: -4 },
          relationships: { "Xiao Chen": { friendship: 6 } },
          flags: { weekly_focus: "Xiao Chen onboarding request", route_city: true, request_xiao_chen_onboarding: true, xiao_chen_onboarding_clear: true }
        }
      },
      {
        text: "Ask two students to use it while both of you stay silent.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 6, culture: 5, energy: -5 },
          guanxi: { localStudents: 3 },
          relationships: { "Xiao Chen": { friendship: 7 } },
          flags: { weekly_focus: "Xiao Chen silent usability test", route_city: true, request_xiao_chen_onboarding: true }
        }
      }
    ]
  },

  "event_request_neighbor_li_parcel": {
    speaker: "Neighbor Li",
    bgImage: '/images/simulator/cg/cg_neighbor_li_parcel_crisis.png',
    text: "Neighbor Li waves you into the hallway, where three students, two parcels, and one annoyed delivery driver have formed a small diplomatic crisis.\n\nDelivery Driver: 'This number is not here. I called already.'\n\nStudent: 'But the app says delivered.'\n\nNeighbor Li looks at you like this is a practical exam nobody warned you about.\n\nNeighbor Li: 'You know enough now.'\n\nYou: 'That is a generous interpretation.'\n\nNeighbor Li lowers their voice.\n\nNeighbor Li: 'Help me make this normal again. Not perfect. Normal is enough.'",
    dialogueChoices: [
      {
        text: "Tell me which part needs translating and which part needs saving face.",
        reply: "Good. You are learning that those are not the same job.",
        effects: {
          stats: { chinese: 2, culture: 2 },
          guanxi: { localStudents: 1 },
          relationships: { "Neighbor Li": { friendship: 3 } },
          flags: { dialogue_neighbor_li_translate_face: true, route_local: true }
        }
      },
      {
        text: "I can help, but stop me if I start making it about myself.",
        reply: "I will. Very quickly. Do not worry.",
        effects: {
          stats: { culture: 2, energy: 1 },
          relationships: { "Neighbor Li": { friendship: 2 } },
          flags: { dialogue_neighbor_li_stop_me: true, route_local: true }
        }
      },
      {
        text: "Let's solve the delivery first and explain the app screenshot after.",
        reply: "Practical order. Good. People listen better after soup is no longer getting cold.",
        effects: {
          stats: { digitalProficiency: 1, chinese: 2 },
          guanxi: { localStudents: 2 },
          relationships: { "Neighbor Li": { friendship: 2 } },
          flags: { dialogue_neighbor_li_practical_order: true, route_local: true }
        }
      }
    ],
    choices: [
      {
        text: "Translate the practical parts and let Li handle the face-saving.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 6, culture: 7, energy: -4 },
          guanxi: { localStudents: 7 },
          relationships: { "Neighbor Li": { friendship: 6 } },
          flags: { weekly_focus: "Neighbor Li parcel request", route_local: true, request_neighbor_li_parcel: true, neighbor_li_parcel_mediator: true },
          lifeCheck: {
            id: "neighbor_parcel_mediation",
            label: "Parcel Mediation",
            route: "Local",
            tags: ["local", "delivery", "language"],
            stats: { chinese: 0.28, culture: 0.28, digitalProficiency: 0.12 },
            guanxi: { localStudents: 0.25 },
            routes: { local: 1.2 },
            character: "Neighbor Li",
            relationshipWeight: 0.25,
            dc: 13,
            success: {
              message: "You solve the package problem without turning anyone into the loser of the hallway.",
              stats: { culture: 2 },
              flags: { neighbor_parcel_check_passed: true }
            },
            failure: {
              message: "The package is found, but the hallway gets louder before it gets calmer.",
              stats: { energy: -2 },
              flags: { neighbor_parcel_check_strained: true }
            }
          }
        }
      },
      {
        text: "Step forward and try to resolve the whole thing yourself.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 8, culture: 3, energy: -6 },
          guanxi: { localStudents: 4 },
          relationships: { "Neighbor Li": { friendship: 4 } },
          flags: { weekly_focus: "Neighbor Li parcel overreach", route_local: true, request_neighbor_li_parcel: true },
          lifeCheck: {
            id: "neighbor_parcel_overreach",
            label: "Parcel Overreach",
            route: "Local",
            tags: ["local", "delivery", "language"],
            stats: { chinese: 0.32, culture: 0.18, digitalProficiency: 0.1 },
            guanxi: { localStudents: 0.2 },
            routes: { local: 1 },
            character: "Neighbor Li",
            relationshipWeight: 0.2,
            dc: 14,
            success: {
              message: "Taking the lead works only because you keep watching Li for the parts you cannot read yet.",
              stats: { chinese: 1, culture: 1 },
              flags: { neighbor_overreach_check_passed: true }
            },
            failure: {
              message: "You fix the logistics and bruise the atmosphere. Li has to repair what the app could not show you.",
              stats: { energy: -3 },
              relationships: { "Neighbor Li": { friendship: -1 } },
              flags: { neighbor_overreach_check_strained: true }
            }
          }
        }
      }
    ]
  },

  "event_request_manager_zhang_answer": {
    speaker: "Manager Zhang",
    bgImage: '/images/simulator/cg/cg_manager_zhang_mock_interview.png',
    text: "Manager Zhang replies to your practice interview answer with one line.\n\nManager Zhang: 'Better. Still too soft.'\n\nYou stare at the message until it becomes less useful and more personal.\n\nYou: 'Soft how?'\n\nManager Zhang: 'You are asking them to imagine you are capable. Make them see evidence.'\n\nA minute later, he sends a voice message.\n\nManager Zhang: 'In interviews, adjectives are cheap. Proof is expensive. Spend proof.'",
    dialogueChoices: [
      {
        text: "So I should replace confidence with proof?",
        reply: "Not replace. Anchor. Confidence without proof floats away under pressure.",
        effects: {
          stats: { digitalProficiency: 2, academics: 1 },
          relationships: { "Manager Zhang": { friendship: 3 } },
          flags: { dialogue_manager_zhang_anchor_confidence: true, route_career: true }
        }
      },
      {
        text: "Can I say the China part plainly without making it sound exotic?",
        reply: "That is exactly the assignment. Legible, not decorative.",
        effects: {
          stats: { culture: 2, digitalProficiency: 1 },
          guanxi: { admin: 1 },
          relationships: { "Manager Zhang": { friendship: 2 } },
          flags: { dialogue_manager_zhang_legible_china: true, route_career: true }
        }
      },
      {
        text: "I need to learn where directness becomes arrogance.",
        reply: "Evidence keeps directness disciplined. Arrogance asks people to believe without receipts.",
        effects: {
          stats: { culture: 2, energy: -1 },
          relationships: { "Manager Zhang": { friendship: 3 } },
          flags: { dialogue_manager_zhang_directness_boundary: true, route_career: true }
        }
      }
    ],
    choices: [
      {
        text: "Rewrite the answer around evidence and numbers.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, academics: 3, energy: -4 },
          guanxi: { admin: 5 },
          relationships: { "Manager Zhang": { friendship: 6 } },
          flags: { weekly_focus: "Manager Zhang interview-answer request", route_career: true, request_manager_zhang_answer: true, manager_zhang_evidence_answer: true },
          lifeCheck: {
            id: "manager_evidence_answer",
            label: "Evidence-Based Interview Answer",
            route: "Career",
            tags: ["career", "interview"],
            stats: { digitalProficiency: 0.3, academics: 0.18, culture: 0.12 },
            guanxi: { admin: 0.25 },
            routes: { career: 1.2 },
            character: "Manager Zhang",
            relationshipWeight: 0.25,
            dc: 13,
            success: {
              message: "The answer stops asking for belief and starts showing receipts.",
              stats: { digitalProficiency: 2 },
              flags: { manager_evidence_check_passed: true }
            },
            failure: {
              message: "The answer improves, but Zhang can still hear the places where you hope adjectives will do the work.",
              stats: { energy: -2 },
              flags: { manager_evidence_check_strained: true }
            }
          }
        }
      },
      {
        text: "Ask him where confidence becomes exaggeration.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 6, digitalProficiency: 5, energy: -3 },
          guanxi: { admin: 4 },
          relationships: { "Manager Zhang": { friendship: 7 } },
          flags: { weekly_focus: "Manager Zhang confidence boundary", route_career: true, request_manager_zhang_answer: true },
          lifeCheck: {
            id: "manager_confidence_boundary",
            label: "Confidence Boundary",
            route: "Career",
            tags: ["career", "interview"],
            stats: { culture: 0.28, digitalProficiency: 0.22, academics: 0.1 },
            guanxi: { admin: 0.2 },
            routes: { career: 1.1 },
            character: "Manager Zhang",
            relationshipWeight: 0.25,
            dc: 13,
            success: {
              message: "You find the line where directness becomes useful instead of loud.",
              stats: { culture: 1, digitalProficiency: 1 },
              flags: { manager_boundary_check_passed: true }
            },
            failure: {
              message: "You understand the warning, but your answer still leans on tone more than evidence.",
              stats: { energy: -2 },
              flags: { manager_boundary_check_strained: true }
            }
          }
        }
      }
    ]
  },

  "event_request_uncle_wang_order_help": {
    speaker: "Uncle Wang",
    bgImage: '/images/simulator/cg/cg_uncle_wang_order_bridge.png',
    text: "A new international student freezes at the stall while the line grows behind them.\n\nNew Student: 'Sorry, sorry, I just... this one? No spicy? Maybe little spicy?'\n\nUncle Wang catches your eye and tilts his chin toward the menu.\n\nUncle Wang: 'Your classmate?'\n\nYou: 'Not exactly.'\n\nUncle Wang smiles without stopping his hands.\n\nUncle Wang: 'All Minghai students are \"not exactly\" until they need dinner.'\n\nThe student looks one apology away from fleeing.\n\nUncle Wang lowers his voice.\n\nUncle Wang: 'Help, but do not make them feel small.'",
    dialogueChoices: [
      {
        text: "I will give them the words, not take the moment away.",
        reply: "Good. Helping someone speak is better than speaking over them.",
        effects: {
          stats: { chinese: 2, culture: 2 },
          guanxi: { intlStudents: 1 },
          relationships: { "Uncle Wang": { friendship: 3 } },
          flags: { dialogue_uncle_wang_words_not_takeover: true, route_local: true }
        }
      },
      {
        text: "Can you slow the line down for ten seconds while I help?",
        reply: "For you, twelve seconds. Do not waste my generosity.",
        effects: {
          stats: { energy: 1, chinese: 1 },
          relationships: { "Uncle Wang": { friendship: 2 } },
          flags: { dialogue_uncle_wang_twelve_seconds: true, route_local: true }
        }
      },
      {
        text: "I remember this exact panic. I can make the menu less hostile.",
        reply: "Good. Then use the memory kindly. Panic should become a bridge, not a performance.",
        effects: {
          stats: { culture: 2, energy: 2 },
          guanxi: { intlStudents: 1, localStudents: 1 },
          relationships: { "Uncle Wang": { friendship: 3 } },
          flags: { dialogue_uncle_wang_panic_bridge: true, route_local: true }
        }
      }
    ],
    choices: [
      {
        text: "Help translate without making the student feel rescued.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 7, culture: 6, energy: 2, wealth: -25 },
          guanxi: { localStudents: 5, intlStudents: 2 },
          relationships: { "Uncle Wang": { friendship: 6 } },
          flags: { weekly_focus: "Uncle Wang order-help request", route_local: true, request_uncle_wang_order_help: true, uncle_wang_order_bridge: true },
          lifeCheck: {
            id: "uncle_wang_order_bridge",
            label: "Order Bridge",
            route: "Local",
            tags: ["local", "language", "social"],
            stats: { chinese: 0.3, culture: 0.25, energy: 0.04 },
            guanxi: { localStudents: 0.2, intlStudents: 0.2 },
            routes: { local: 1.2 },
            character: "Uncle Wang",
            relationshipWeight: 0.22,
            dc: 13,
            success: {
              message: "You give the student the words without taking the dignity of saying them.",
              stats: { culture: 2, energy: 1 },
              flags: { wang_order_check_passed: true }
            },
            failure: {
              message: "The order gets made, but you can feel how easily helping becomes performing.",
              stats: { energy: -2 },
              flags: { wang_order_check_strained: true }
            }
          }
        }
      },
      {
        text: "Teach the student the sentence and let them say it.",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { chinese: 5, culture: 8, energy: 3, wealth: -25 },
          guanxi: { localStudents: 4, intlStudents: 3 },
          relationships: { "Uncle Wang": { friendship: 7 } },
          flags: { weekly_focus: "Uncle Wang taught order sentence", route_local: true, request_uncle_wang_order_help: true },
          lifeCheck: {
            id: "uncle_wang_teach_sentence",
            label: "Teach the Order Sentence",
            route: "Local",
            tags: ["local", "language", "social"],
            stats: { culture: 0.3, chinese: 0.24, energy: 0.04 },
            guanxi: { localStudents: 0.18, intlStudents: 0.22 },
            routes: { local: 1.1, intl: 0.6 },
            character: "Uncle Wang",
            relationshipWeight: 0.22,
            dc: 13,
            success: {
              message: "The student says the sentence themselves. Uncle Wang smiles like that was the whole point.",
              stats: { culture: 2 },
              flags: { wang_sentence_check_passed: true }
            },
            failure: {
              message: "You teach the sentence, but the line pressure makes the moment smaller than you wanted.",
              stats: { energy: -2 },
              flags: { wang_sentence_check_strained: true }
            }
          }
        }
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
    text: "Professor Lin reads the assignment prompt, then your answer, then the prompt again.\n\nProfessor Lin: 'You answered a different question.'\n\nYou: 'A worse question?'\n\nProfessor Lin: 'A safer question.'\n\nHe turns the paper toward you and taps the sentence you liked most.\n\nProfessor Lin: 'This sentence sounds confident because it avoids the problem. Confidence is not analysis.'",
    dialogueChoices: [
      {
        text: "I chose the safer question because I knew how to sound smart there.",
        reply: "Good. Now we have found the performance. Put it down and answer the real prompt.",
        effects: {
          stats: { academics: 3, energy: -1 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { dialogue_lin_safety_performance: true, route_academic: true }
        }
      },
      {
        text: "Can you show me where confidence turns into avoidance?",
        reply: "Here. Your strongest sentence is also your escape route. That is why it felt strong.",
        effects: {
          stats: { academics: 3 },
          guanxi: { professors: 1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_confidence_avoidance: true, route_academic: true }
        }
      },
      {
        text: "I want to defend it, but I think you are right.",
        reply: "Wanting to defend it is normal. Choosing to revise is the academic habit.",
        effects: {
          stats: { academics: 2, energy: 1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_defense_to_revision: true, route_academic: true }
        }
      }
    ],
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
    text: "Dr. Mei's talk begins with theory and ends with a Shanghai case study that makes the theory feel suddenly dangerous.\n\nAfterward, you wait by the lectern while other students ask polished questions.\n\nDr. Mei: 'You have been waiting. Ask.'\n\nYou: 'I am not sure the question is polished.'\n\nDr. Mei: 'Good. Polished questions often arrive already dead.'\n\nShe does not smile much, but she listens like your question may actually matter.",
    dialogueChoices: [
      {
        text: "The case made the theory feel less neutral than I expected.",
        reply: "Good. Neutral language often hides a very interested machine.",
        effects: {
          stats: { academics: 2, culture: 2 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_theory_not_neutral: true, route_academic: true }
        }
      },
      {
        text: "I think my question is still half observation, half discomfort.",
        reply: "That is a respectable beginning. Discomfort means the observation has not gone numb.",
        effects: {
          stats: { academics: 2, energy: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_observation_discomfort: true, route_academic: true }
        }
      },
      {
        text: "How do you know when a local example is more than a convenient case?",
        reply: "When it resists being used neatly. Pay attention to the resistance.",
        effects: {
          stats: { academics: 3, culture: 1, energy: -1 },
          guanxi: { professors: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_case_resistance: true, route_academic: true }
        }
      }
    ],
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
    text: "Your follow-up message is shorter than your nervous draft.\n\nDr. Mei replies the next morning.\n\nDr. Mei: 'Three readings attached. Start with the second one. The first will make more sense after you stop trying to sound impressive.'\n\nYou read that sentence twice.\n\nA final line follows.\n\nDr. Mei: 'If this still bothers you after reading, come discuss it.'\n\nIt feels less like homework than a door left open.",
    dialogueChoices: [
      {
        text: "The second reading makes the first one less intimidating, but more troubling.",
        reply: "Then it is doing its job. Useful reading should rearrange the question, not decorate it.",
        effects: {
          stats: { academics: 3, culture: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_reading_rearranged: true, route_academic: true }
        }
      },
      {
        text: "I am trying to stop sounding impressive and start sounding precise.",
        reply: "Precision is already more impressive than most attempts to be impressive.",
        effects: {
          stats: { academics: 2, energy: 1 },
          guanxi: { professors: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_precision_over_impressive: true, route_academic: true }
        }
      },
      {
        text: "It still bothers me. I think that means I should keep going.",
        reply: "Yes. But learn the difference between a question that bothers you and one that flatters you.",
        effects: {
          stats: { academics: 2, culture: 2, energy: -1 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_bothers_keep_going: true, route_academic: true }
        }
      }
    ],
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
    text: "Professor Lin looks over your notes and circles the same weakness three times.\n\nProfessor Lin: 'You collect information faster than you turn it into an argument.'\n\nYou: 'Is that bad?'\n\nProfessor Lin: 'It is common.'\n\nHe slides the notebook back.\n\nProfessor Lin: 'Now make it less common in your work.'",
    dialogueChoices: [
      {
        text: "I keep mistaking more notes for more thinking.",
        reply: "A common student disease. Fortunately, treatable with outlines and humility.",
        effects: {
          stats: { academics: 3, energy: -1 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { dialogue_lin_notes_vs_thinking: true, route_academic: true }
        }
      },
      {
        text: "Can we build a method I can repeat when I panic?",
        reply: "Yes. A method is most useful when your confidence is absent.",
        effects: {
          stats: { academics: 3, digitalProficiency: 1 },
          guanxi: { professors: 1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_panic_method: true, route_academic: true }
        }
      },
      {
        text: "I want my work to survive without me explaining what I meant.",
        reply: "Good. That is what an argument is: a thought that can stand when you leave the room.",
        effects: {
          stats: { academics: 2, culture: 1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_argument_stands: true, route_academic: true }
        }
      }
    ],
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
    text: "Dr. Mei does not hand you a topic. She hands you a problem: a messy Shanghai case where theory explains half the picture and lived reality explains the rest.\n\nYou: 'So what is the research question?'\n\nDr. Mei: 'That is not something I give you like a campus map.'\n\nShe points at two contradictory notes.\n\nDr. Mei: 'If you can stay with the contradiction instead of cleaning it too quickly, there may be a project here.'",
    dialogueChoices: [
      {
        text: "The contradiction is uncomfortable because both sides seem partly true.",
        reply: "Good. Do not rush to choose a winner. The project may live in the tension.",
        effects: {
          stats: { academics: 3, culture: 2 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_tension_project: true, route_academic: true }
        }
      },
      {
        text: "I need to stop treating the research question like something hidden on a map.",
        reply: "Exactly. You are not finding buried treasure. You are making a responsible lens.",
        effects: {
          stats: { academics: 3, energy: -1 },
          guanxi: { professors: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_responsible_lens: true, route_academic: true }
        }
      },
      {
        text: "Can I write three possible questions and show you what each one ignores?",
        reply: "That is the first proposal today that sounds like research.",
        effects: {
          stats: { academics: 2, digitalProficiency: 1, culture: 1 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_three_questions: true, route_academic: true }
        }
      }
    ],
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
    text: "Professor Lin returns your draft with comments that are useful, precise, and personally devastating.\n\nProfessor Lin: 'Your argument is not wrong.'\n\nYou start to breathe.\n\nProfessor Lin: 'It is also not yet an argument.'\n\nYou stop breathing again.\n\nProfessor Lin folds his hands.\n\nProfessor Lin: 'The question is whether you want praise for effort, or a draft that can survive contact with another mind.'",
    dialogueChoices: [
      {
        text: "I wanted reassurance. I think I need the draft to get better more.",
        reply: "That is a painful sentence. It is also the correct one.",
        effects: {
          stats: { academics: 3, energy: -2 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { dialogue_lin_reassurance_vs_better: true, route_academic: true }
        }
      },
      {
        text: "When you say it is not yet an argument, what is the missing spine?",
        reply: "Excellent. Stop defending the skin and look for the spine.",
        effects: {
          stats: { academics: 3 },
          guanxi: { professors: 1 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_missing_spine: true, route_academic: true }
        }
      },
      {
        text: "I need a minute not to take this personally, but I do want to learn.",
        reply: "Take the minute. Then come back to the work. Scholarship begins there.",
        effects: {
          stats: { academics: 2, energy: 2 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_minute_then_work: true, route_academic: true }
        }
      }
    ],
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
    text: "Dr. Mei listens to your project idea without interrupting. That almost makes it worse.\n\nDr. Mei: 'You have a clean structure.'\n\nYou: 'That sounds good.'\n\nDr. Mei: 'Sometimes clean structures hide dirty assumptions.'\n\nShe taps the paragraph where you describe interview subjects as cases.\n\nDr. Mei: 'Who becomes invisible when you turn people into data points?'",
    dialogueChoices: [
      {
        text: "I made the structure clean because the reality made me nervous.",
        reply: "Then the nervousness belongs in the method, not under the rug.",
        effects: {
          stats: { academics: 2, culture: 3, energy: -1 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_nervous_structure: true, route_academic: true }
        }
      },
      {
        text: "I need to ask who benefits from this explanation.",
        reply: "Yes. And who disappears so that the explanation can look elegant.",
        effects: {
          stats: { academics: 3, culture: 2 },
          guanxi: { professors: 1 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_who_benefits: true, route_academic: true }
        }
      },
      {
        text: "Can I keep the scope narrow without making people smaller?",
        reply: "That is the central tension. Narrow is not the enemy. Careless is.",
        effects: {
          stats: { academics: 3, digitalProficiency: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_narrow_not_small: true, route_academic: true }
        }
      }
    ],
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
    text: "Dr. Mei sends you a draft abstract with one sentence highlighted.\n\nDr. Mei: 'This part sounds like it was written for a committee, not a reader.'\n\nYou: 'Is that not what abstracts are for?'\n\nDr. Mei: 'Committees are made of readers having a bad day.'\n\nThe conference deadline is close enough to make every word feel expensive.\n\nDr. Mei: 'Help me make the argument travel.'",
    dialogueChoices: [
      {
        text: "The highlighted sentence is trying to sound important instead of clear.",
        reply: "Good diagnosis. Now perform surgery without killing the argument.",
        effects: {
          stats: { academics: 3, energy: -1 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_abstract_surgery: true, route_academic: true }
        }
      },
      {
        text: "Can we make the first sentence carry the actual tension?",
        reply: "Yes. The reader should meet the problem before the furniture.",
        effects: {
          stats: { academics: 3, digitalProficiency: 1 },
          guanxi: { professors: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_first_sentence_tension: true, route_academic: true }
        }
      },
      {
        text: "I can cut the committee language, but I am afraid of making it too plain.",
        reply: "Plain is not simple-minded. Plain is generous when the idea is difficult.",
        effects: {
          stats: { academics: 2, culture: 1, energy: 1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_plain_generous: true, route_academic: true }
        }
      }
    ],
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
    text: "Professor Lin does not promise anything quickly.\n\nProfessor Lin: 'Bring me your best draft, your weakest transcript line, and the reason you want the next step.'\n\nYou: 'That sounds like an interview.'\n\nProfessor Lin: 'No. It is a responsibility check.'\n\nHe takes off his glasses and sets them beside your file.\n\nProfessor Lin: 'A recommendation is not a favor. It is my name attached to your habits.'",
    dialogueChoices: [
      {
        text: "Then I should show you the habit, not just the ambition.",
        reply: "Correct. Ambition is cheap until it has a calendar.",
        effects: {
          stats: { academics: 3, energy: -1 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { dialogue_lin_habit_not_ambition: true, route_academic: true }
        }
      },
      {
        text: "My weakest line is real. I do not want to hide it behind a story.",
        reply: "Good. A transcript can survive weakness. It cannot survive dishonesty.",
        effects: {
          stats: { academics: 2, culture: 1 },
          guanxi: { professors: 1 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { dialogue_lin_transcript_honesty: true, route_academic: true }
        }
      },
      {
        text: "If you write it, I want it to be because the work earned it.",
        reply: "Then bring the work. We will see whether it knows how to stand.",
        effects: {
          stats: { academics: 3, energy: -2 },
          relationships: { "Professor Lin": { friendship: 2 } },
          flags: { dialogue_lin_earned_recommendation: true, route_academic: true }
        }
      }
    ],
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
    text: "Dr. Mei opens a folder of interview notes, messy charts, and unanswered questions.\n\nDr. Mei: 'If you join this, you will not just collect material about China.'\n\nYou: 'What else would I be doing?'\n\nDr. Mei turns the laptop so you can see the raw notes.\n\nDr. Mei: 'Deciding what you are responsible for understanding.'\n\nThe room goes quiet around that sentence.",
    dialogueChoices: [
      {
        text: "I am ready to be responsible for more than an interesting topic.",
        reply: "Then you are ready to begin. Not finish. Begin.",
        effects: {
          stats: { academics: 3, culture: 2, energy: -2 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_responsible_begin: true, route_academic: true }
        }
      },
      {
        text: "I want the project to change how I see, not just what I can list.",
        reply: "That is a better ambition than publication. It may even lead to one.",
        effects: {
          stats: { academics: 2, culture: 3 },
          guanxi: { professors: 1 },
          relationships: { "Dr. Mei": { friendship: 3 } },
          flags: { dialogue_dr_mei_change_how_i_see: true, route_academic: true }
        }
      },
      {
        text: "Tell me where students usually fail this kind of work.",
        reply: "They extract stories and call it understanding. Do not do that.",
        effects: {
          stats: { academics: 3, digitalProficiency: 1, energy: -1 },
          relationships: { "Dr. Mei": { friendship: 2 } },
          flags: { dialogue_dr_mei_extracting_stories_warning: true, route_academic: true }
        }
      }
    ],
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
    text: "Neighbor Li leans against the washing machine like a person who has seen freshmen repeat history.\n\nNeighbor Li: 'This machine steals socks. That one sounds broken but works. The third one works but only if you believe in it.'\n\nYou: 'Is this official information?'\n\nNeighbor Li: 'No. Useful information.'\n\nLi points toward the stairwell.\n\nNeighbor Li: 'Also, greet the dorm auntie before you need help. People remember order.'",
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
    text: "A dorm misunderstanding starts with a washing machine queue and somehow becomes a small negotiation about space, noise, and saving face.\n\nNeighbor Li: 'You try first.'\n\nYou: 'My Chinese may betray everyone involved.'\n\nNeighbor Li: 'Then I rescue everyone involved.'\n\nYou step forward. Halfway through the apology, your sentence collapses.\n\nNeighbor Li quietly adds the missing bridge, not taking over, just making sure everyone can cross.",
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
    text: "Uncle Wang wipes down the street table and refills your tea without asking.\n\nUncle Wang: 'Before the metro station, this road was quieter. Students still got lost, though. That part never changes.'\n\nYou: 'Was the neighborhood better then?'\n\nUncle Wang laughs once.\n\nUncle Wang: 'Young people always ask if the past was better. Old people always lie about it.'\n\nHe points down the street with his towel.\n\nUncle Wang: 'The city changes. People still need somewhere to sit.'",
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
    text: "The skewer stall near the dorm is not on any official campus map. You find it by following smoke, laughter, and a queue of students pretending they are not hungry.\n\nUncle Wang: 'New Minghai student.'\n\nYou: 'Is it that obvious?'\n\nUncle Wang points at the menu.\n\nUncle Wang: 'You looked at the spice levels like they were visa categories.'\n\nHe taps the safest option.\n\nUncle Wang: 'Start here. Ambition can wait until your stomach signs the contract.'",
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
    text: "Neighbor Li knocks once, then enters only after you answer.\n\nNeighbor Li: 'Small problem. Do not make a big face.'\n\nYou: 'That sounds like a big problem.'\n\nLi shows you the dorm group chat: noise, shoes, and a message you thought was harmless.\n\nNeighbor Li: 'Nobody is angry enough to fight. Everyone is annoyed enough to remember.'\n\nThe problem is small. The embarrassment is not.",
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
    text: "Uncle Wang turns the skewers, then asks the question without looking at you.\n\nUncle Wang: 'Why did you really come to China?'\n\nYou start with the application answer and hear how thin it sounds before you finish.\n\nUncle Wang: 'Not that one.'\n\nA scooter passes. The street is loud enough to save you from sincerity, but he waits anyway.\n\nUncle Wang: 'People always have the official reason and the real reason. Both can be true.'",
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
    text: "Neighbor Li finds you near the dorm gate holding three rolls of tape.\n\nNeighbor Li: 'Good. You have hands.'\n\nYou: 'Is that the qualification?'\n\nNeighbor Li: 'For festival prep? Very high qualification.'\n\nTwo aunties start giving instructions at the same time. Li sees your face and grins.\n\nNeighbor Li: 'Do not worry. Nobody understands all aunties at first.'\n\nNobody announces belonging. They just hand you tape.",
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
    text: "Uncle Wang puts tea on the table before you order.\n\nYou: 'I did not ask yet.'\n\nUncle Wang: 'Regulars do not need to ask for tea.'\n\nThe word lands softly: regular.\n\nA student shifts their bag to make room. Someone continues a story from last week as if you were there for the beginning.\n\nUncle Wang: 'Sit. You are late for the same conversation again.'",
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
    text: "Sophie books a cheap noodle place and calls it a check-in dinner.\n\nSophie: 'Nobody is allowed to say \"I am fine\" unless they can prove it with evidence.'\n\nYou: 'What counts as evidence?'\n\nSophie lifts her bowl.\n\nSophie: 'Eating dinner before midnight. Extremely advanced behavior.'\n\nBy the second bowl, people are laughing about the things that almost broke them this week.",
    dialogueChoices: [
      {
        text: "My evidence is weak, but I did leave my room.",
        reply: "The court accepts this as preliminary evidence. More noodles may strengthen your case.",
        effects: {
          stats: { energy: 3 },
          guanxi: { intlStudents: 1 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_left_room_evidence: true, route_intl: true }
        }
      },
      {
        text: "I am not fine, but I am less alone than yesterday.",
        reply: "That is annoyingly beautiful and I hate that I understand it exactly.",
        effects: {
          stats: { energy: 4, culture: 1 },
          relationships: { Sophie: { friendship: 4 } },
          flags: { dialogue_sophie_less_alone: true, route_intl: true }
        }
      },
      {
        text: "Can we make this a habit before everyone hits crisis mode?",
        reply: "Yes. Preventative noodles. Extremely serious infrastructure.",
        effects: {
          stats: { digitalProficiency: 1, energy: 2 },
          guanxi: { intlStudents: 2 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { dialogue_sophie_preventative_noodles: true, route_intl: true }
        }
      }
    ],
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
    text: "Sophie stays after dinner, stacking empty bowls too neatly.\n\nSophie: 'These dinners are becoming emergency rooms.'\n\nYou: 'That is not nothing.'\n\nSophie: 'No. But what if people could join before they fall apart?'\n\nShe opens a blank document and labels it Support Circle.\n\nSophie: 'I do not want us to become experts at crisis only.'",
    dialogueChoices: [
      {
        text: "Let's design it around ordinary weeks, not only disasters.",
        reply: "Yes. I want help that arrives before the dramatic music.",
        effects: {
          stats: { digitalProficiency: 2, energy: -1 },
          guanxi: { intlStudents: 2 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_ordinary_weeks: true, route_intl: true }
        }
      },
      {
        text: "People may come for forms and stay because someone remembers their name.",
        reply: "That is going on the first slide. Maybe the second. It is too sincere for the first.",
        effects: {
          stats: { culture: 2, energy: 1 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_names_matter: true, route_intl: true }
        }
      },
      {
        text: "We need boundaries too. We cannot become everyone's emergency contact.",
        reply: "Thank you. Hope with boundaries. That sounds less pretty and more survivable.",
        effects: {
          stats: { digitalProficiency: 2, culture: 1 },
          guanxi: { admin: 1 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { dialogue_sophie_support_boundaries: true, route_intl: true }
        }
      }
    ],
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
    text: "Sophie scrolls through the group chat without laughing at the jokes.\n\nSophie: 'Do you ever feel like this chat is becoming a country nobody else can enter?'\n\nYou: 'It is safe.'\n\nSophie: 'I know.' She locks the phone. 'That is what makes it complicated.'\n\nThe common room hums around you.\n\nSophie: 'I cannot tell if comfort is helping us live here or helping us avoid here.'",
    dialogueChoices: [
      {
        text: "I need the bubble sometimes. I just do not want to live there full time.",
        reply: "That may be the most honest version. Shelter, not permanent address.",
        effects: {
          stats: { energy: 2, culture: 2 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_shelter_not_address: true, route_intl: true }
        }
      },
      {
        text: "Maybe the bridge should start small enough that nobody feels thrown out.",
        reply: "A tiny bridge. Manageable. Less heroic. More likely to happen.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2, energy: -1 },
          guanxi: { localStudents: 1 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_tiny_bridge: true, route_intl: true }
        }
      },
      {
        text: "Some people are not ready to integrate. Safety can be a stage too.",
        reply: "True. I forget that because I am impatient with my own fear.",
        effects: {
          stats: { energy: 3 },
          guanxi: { intlStudents: 1 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { dialogue_sophie_safety_stage: true, route_intl: true }
        }
      }
    ],
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
    text: "Sophie brings flashcards, voice notes, and the terrible confidence of someone who thinks tones are a team sport.\n\nSophie: 'If I suffer, you suffer. That is friendship.'\n\nYou: 'I thought friendship involved kindness.'\n\nSophie plays a tone drill at full volume.\n\nSophie: 'Growth is kindness with worse audio quality.'\n\nHalf the night becomes language practice. The other half becomes admitting which parts of China still make both of you feel twelve years old.",
    dialogueChoices: [
      {
        text: "If this is friendship, friendship has terrible audio quality.",
        reply: "Correct. But your third tone improved, so the suffering is scientifically valid.",
        effects: {
          stats: { chinese: 2, energy: 1 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { dialogue_sophie_audio_quality: true, route_intl: true }
        }
      },
      {
        text: "I feel less ashamed making mistakes with you here.",
        reply: "Same. Which is rude, because I planned to be effortlessly impressive abroad.",
        effects: {
          stats: { chinese: 2, energy: 3 },
          relationships: { Sophie: { friendship: 4 } },
          flags: { dialogue_sophie_less_ashamed: true, route_intl: true }
        }
      },
      {
        text: "The city feels less impossible when we practice it together.",
        reply: "That sounds dangerously close to affection. Or pedagogy. Possibly both.",
        effects: {
          stats: { chinese: 1, culture: 1, energy: 2 },
          relationships: { Sophie: { friendship: 2, romance: 2 } },
          flags: { dialogue_sophie_city_together: true, route_intl: true }
        }
      }
    ],
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
    text: "Sophie arrives with a messy slide deck, three admin email threads, and the look of someone who has chosen hope irresponsibly.\n\nSophie: 'I pitched the orientation idea.'\n\nYou: 'To who?'\n\nSophie: 'Several people who can say no professionally.'\n\nShe turns the laptop toward you.\n\nSophie: 'Next semester should not feel like being attacked by PDFs. Help me make it a map.'",
    dialogueChoices: [
      {
        text: "Let's make the first week feel navigable, not inspirational.",
        reply: "Yes. Fewer slogans, more actual doors, counters, apps, and human names.",
        effects: {
          stats: { digitalProficiency: 3, culture: 1 },
          guanxi: { admin: 1 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_navigable_orientation: true, route_intl: true }
        }
      },
      {
        text: "We should include the mistakes we made, not hide them.",
        reply: "Agreed. The guide should sound like someone survived, not like someone marketed survival.",
        effects: {
          stats: { culture: 2, energy: 1 },
          guanxi: { intlStudents: 1 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { dialogue_sophie_include_mistakes: true, route_intl: true }
        }
      },
      {
        text: "If admin says no, we can still make the student version real.",
        reply: "Good. Hope with backup channels. You have learned my entire personality.",
        effects: {
          stats: { digitalProficiency: 2, energy: -1 },
          guanxi: { intlStudents: 2 },
          relationships: { Sophie: { friendship: 2 } },
          flags: { dialogue_sophie_backup_channels: true, route_intl: true }
        }
      }
    ],
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
    text: "Manager Zhang's panel is polished, corporate, and unexpectedly blunt.\n\nManager Zhang: 'Cross-cultural ability is not a slogan.'\n\nThe room quiets in the way rooms do when someone stops flattering them.\n\nManager Zhang: 'It is whether people still trust you when the meeting gets confusing.'\n\nAfter the applause, students form a careful line around him, each holding a resume like a small shield.\n\nManager Zhang looks at yours, then at you.\n\nManager Zhang: 'Ask one question. Not five.'",
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
    text: "You send a concise follow-up: who you are, what you heard, and one practical question about legal internships.\n\nManager Zhang replies the next morning.\n\nManager Zhang: 'Good structure. Your second sentence is too broad.'\n\nTwo links follow. Then one correction.\n\nManager Zhang: 'Specificity is respect for other people's time.'\n\nIt feels both encouraging and strict, which seems to be his entire communication style.",
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
    text: "Manager Zhang reads your resume, pauses, and says the kind thing in the least comfortable way.\n\nManager Zhang: 'You are trying to look impressive instead of useful.'\n\nYou: 'That is... direct.'\n\nManager Zhang: 'Direct saves time. Time saves opportunities.'\n\nHe marks three bullet points.\n\nManager Zhang: 'Make your China experience legible. Not exotic. Legible.'",
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
    text: "Manager Zhang hears you mention a shortcut and goes quiet in the way professionals do when they are deciding whether to correct you.\n\nManager Zhang: 'Say that again, but slower.'\n\nYou repeat it and hear the problem halfway through.\n\nManager Zhang: 'In China, relationships matter. So do boundaries.'\n\nHe closes your file.\n\nManager Zhang: 'Confusing the two is how people get hurt. Sometimes legally.'",
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
    text: "The alumni dinner is not a party. It is a room full of people speaking in introductions, titles, pauses, and tiny tests.\n\nManager Zhang: 'Do not chase every business card.'\n\nYou: 'What should I chase?'\n\nManager Zhang: 'One useful conversation.'\n\nAcross the table, an alumna asks what you are studying and why Shanghai matters to it.\n\nManager Zhang gives you one small nod: now.",
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
    text: "Manager Zhang finally names a concrete opening, then spends more time explaining boundaries than opportunity.\n\nManager Zhang: 'A referral is not a magic door.'\n\nYou: 'Then what is it?'\n\nManager Zhang slides the application checklist across the desk.\n\nManager Zhang: 'A responsibility to arrive prepared and legal.'\n\nHe waits until you look up.\n\nManager Zhang: 'If I open this door, do not walk through it casually.'",
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
    text: "Xiao Chen does not begin with a pitch. He begins with a question.\n\nXiao Chen: 'What do students need badly enough to pay for?'\n\nYou: 'Food? Sleep? A printer that works?'\n\nXiao Chen points at you like you have discovered economics.\n\nXiao Chen: 'Good. Complaints are unpaid market research.'\n\nYou spend the afternoon turning annoyance into categories.",
    dialogueChoices: [
      {
        text: "Complaints are data, but people are not just data sources.",
        reply: "Good warning. Annoying warning. Useful warning. We write it on top of the sheet.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_people_not_data: true, route_city: true }
        }
      },
      {
        text: "Let's ask what they already tried before we assume the solution.",
        reply: "Yes. Failed workarounds are the map. The product is just the bridge.",
        effects: {
          stats: { digitalProficiency: 3, energy: -1 },
          guanxi: { localStudents: 1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_failed_workarounds: true, route_city: true }
        }
      },
      {
        text: "If printer access is a business idea, this campus is in worse shape than I thought.",
        reply: "Excellent. Humor plus market validation. Investors love half of that.",
        effects: {
          stats: { digitalProficiency: 2, energy: 1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_printer_market: true, route_city: true }
        }
      }
    ],
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
    text: "Xiao Chen opens the spreadsheet and immediately scrolls to the biggest number.\n\nXiao Chen: 'We should scale.'\n\nYou: 'We had eight users.'\n\nXiao Chen: 'Eight real users.'\n\nYou point at the complaint column.\n\nYou: 'And three real problems.'\n\nFor once, the exciting thing is not the idea itself, but the fact that both of you are learning how to argue honestly.",
    dialogueChoices: [
      {
        text: "Eight users is a signal, not permission to pretend we are huge.",
        reply: "Painfully fair. We celebrate the signal and do not build a castle on it.",
        effects: {
          stats: { digitalProficiency: 3, energy: -1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_signal_not_scale: true, route_city: true }
        }
      },
      {
        text: "The complaints are more valuable than the good numbers.",
        reply: "That sentence hurts my ego and helps the product. Continue.",
        effects: {
          stats: { digitalProficiency: 3, culture: 1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_complaints_value: true, route_city: true }
        }
      },
      {
        text: "Let's choose one problem and make it boringly reliable.",
        reply: "Boringly reliable is a terrible slogan and an excellent strategy.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          guanxi: { localStudents: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_boring_reliable: true, route_city: true }
        }
      }
    ],
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
    text: "Xiao Chen wants to launch before the prototype is stable.\n\nXiao Chen: 'If we wait until perfect, someone faster wins.'\n\nYou: 'If we launch broken, nobody trusts us twice.'\n\nHe exhales and looks toward the incubator windows, where Shanghai is busy being persuasive.\n\nXiao Chen: 'This city rewards speed.'\n\nYou: 'Maybe. But users remember damage.'\n\nThe argument is not really about software anymore.",
    dialogueChoices: [
      {
        text: "Speed is only an advantage if it does not make users regret trusting us.",
        reply: "You are making the correct argument in the least exciting way possible.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_speed_trust: true, route_city: true }
        }
      },
      {
        text: "I feel the pressure too. I just do not want panic to become strategy.",
        reply: "Fine. Panic is not strategy. It is just strategy with bad lighting.",
        effects: {
          stats: { digitalProficiency: 2, energy: 1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_panic_not_strategy: true, route_city: true }
        }
      },
      {
        text: "If we launch fast, we need a repair plan before the first complaint.",
        reply: "That is a compromise I can respect. Fast with a fire extinguisher.",
        effects: {
          stats: { digitalProficiency: 3, energy: -1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_repair_plan_first: true, route_city: true }
        }
      }
    ],
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
    text: "The fastest version of the project left tiny cracks everywhere: wrong pickup times, confused payment notes, a QR code nobody trusted after midnight.\n\nXiao Chen: 'Repair is so boring.'\n\nYou: 'That may be why people skip it.'\n\nHe looks at the support messages and stops joking.\n\nXiao Chen: 'And why users leave.'\n\nRepairing it is boring. That is the point.",
    dialogueChoices: [
      {
        text: "Every repair message is a chance to prove we are still here.",
        reply: "That is annoyingly noble. Also probably true.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2, energy: -1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_repair_presence: true, route_city: true }
        }
      },
      {
        text: "Let's write the apology like humans, not like a broken app notice.",
        reply: "Good. No 'inconvenience caused.' We caused it. We fix it.",
        effects: {
          stats: { digitalProficiency: 2, culture: 1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_human_apology: true, route_city: true }
        }
      },
      {
        text: "The boring work is where trust either returns or leaves permanently.",
        reply: "Fine. Put that in the product memo. Underline boring.",
        effects: {
          stats: { digitalProficiency: 3, energy: -1 },
          guanxi: { localStudents: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_boring_trust: true, route_city: true }
        }
      }
    ],
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
    text: "Xiao Chen opens a blank memo titled International Users.\n\nXiao Chen: 'What would international students actually pay for? Not what investors want to hear.'\n\nYou: 'Payment help. Dorm basics. Translation that does not make them feel stupid.'\n\nHe types fast.\n\nXiao Chen: 'Good. Pain points with dignity.'\n\nYou spend the afternoon turning homesick complaints, payment friction, and campus confusion into a launch memo.",
    dialogueChoices: [
      {
        text: "The product should reduce embarrassment, not monetize confusion.",
        reply: "Yes. If the user feels stupid, we failed before checkout.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          guanxi: { intlStudents: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_not_monetize_confusion: true, route_city: true }
        }
      },
      {
        text: "International users need defaults that assume they are tired.",
        reply: "Good. Design for tired. Tired is the real onboarding state.",
        effects: {
          stats: { digitalProficiency: 3, energy: -1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_design_for_tired: true, route_city: true }
        }
      },
      {
        text: "Let's include language support without making it feel like a remedial label.",
        reply: "Dignity layer. I like that. Sounds expensive. Probably necessary.",
        effects: {
          stats: { digitalProficiency: 2, culture: 2 },
          guanxi: { intlStudents: 1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_dignity_layer: true, route_city: true }
        }
      }
    ],
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
    text: "Demo day is less glamorous than the posters promised: half the room is distracted, the Wi-Fi argues with everyone, and the best question comes from someone who almost skipped your booth.\n\nXiao Chen: 'That was not terrible.'\n\nYou: 'That is your celebration sentence?'\n\nXiao Chen grins.\n\nXiao Chen: 'Real feedback is better than fantasy applause.'\n\nThen he looks at the sign-up sheet.\n\nXiao Chen: 'Also, three people left emails. That part can be celebration.'",
    dialogueChoices: [
      {
        text: "Three real emails beat a room full of polite nods.",
        reply: "Correct. I will still accept polite nods if they come with emails.",
        effects: {
          stats: { digitalProficiency: 3, energy: 1 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_three_real_emails: true, route_city: true }
        }
      },
      {
        text: "The best question exposed what the product still cannot explain.",
        reply: "Painful. Excellent. That question is tomorrow's roadmap.",
        effects: {
          stats: { digitalProficiency: 3, culture: 1, energy: -1 },
          relationships: { "Xiao Chen": { friendship: 2 } },
          flags: { dialogue_xiao_chen_question_roadmap: true, route_city: true }
        }
      },
      {
        text: "Let's celebrate for five minutes, then write down what broke.",
        reply: "Five minutes is cruel. Seven. Then the bug list.",
        effects: {
          stats: { energy: 3, digitalProficiency: 2 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { dialogue_xiao_chen_seven_minute_celebration: true, route_city: true }
        }
      }
    ],
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
    bgImage: '/images/simulator/cg/cg_housing_shared_flat_first_night.png',
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
    bgImage: '/images/simulator/cg/cg_studio_rent_pressure.png',
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
    text: "Professor Lin slides a bilingual source pack across the desk.\n\nProfessor Lin: 'This is approved research support. Formatting references, checking English phrasing, organizing notes. Not glamorous.'\n\nYou: 'That sounds like the opposite of glamorous.'\n\nProfessor Lin: 'Good. Glamour causes sloppy footnotes.'\n\nThe work is small, legal, and strangely useful: the kind of academic trust that arrives as a task list.",
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
    text: "Xiao Chen waves you over before your coffee number is called.\n\nXiao Chen: 'Tell me three things international students complain about but never report officially.'\n\nYou: 'That is your opening question?'\n\nXiao Chen: 'Small problems are honest. Big visions lie.'\n\nHe talks fast, but the useful part is not startup glamour. It is how quickly he notices friction other people accept as normal.",
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
    text: "Xiao Chen sends you a prototype link, then immediately sends three corrections to his own message.\n\nXiao Chen: 'You know the international-student side better than I do. Help me test this with real users? Tiny pilot. No co-founder fantasy.'\n\nYou: 'Define tiny.'\n\nXiao Chen: 'Tiny enough to survive. Big enough to prove I am not imagining the problem.'\n\nIt is a small experiment with real users, real friction, and very little sleep.",
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
    text: "Sophie claims the quiet corner table before the common room fills up.\n\nSophie: 'Status check. Are you okay, or are you doing the thing where you say okay because explaining would take too long?'\n\nYou: 'The second one, probably.'\n\nSophie: 'Good. Then we skip the performance.'\n\nYou trade payment failures, homesickness, and the weird relief of being understood without explaining every detail first.",
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
    text: "Sophie stops by the railing and watches the river traffic cut light across the water.\n\nSophie: 'I like that this does not have to be dramatic.'\n\nYou: 'A very bold review of a date.'\n\nSophie: 'Maybe that is the point. Here, everything is already intense. I like when something can just be honest.'\n\nIf there is affection here, it grows out of shared context, not fireworks.",
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
    text: "Uncle Wang points at the tiny plastic stool like he is assigning you an important position.\n\nUncle Wang: 'Sit. Your Chinese is better when you are eating.'\n\nYou: 'That may be because my mouth is full and I make fewer mistakes.'\n\nUncle Wang: 'Exactly. Very advanced strategy.'\n\nHe adds extra lamb to your plate and keeps the jokes coming until the street feels less anonymous.",
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
    text: "Uncle Wang lifts the baijiu bottle with theatrical seriousness, then sees your face and bursts out laughing.\n\nUncle Wang: 'Relax. I am not trying to destroy the foreign student tonight.'\n\nYou: 'I appreciate being preserved.'\n\nUncle Wang pours tea instead. 'Belonging is not a test,' he says. 'Drink this. Eat more.'\n\nThe real ritual is being included without being pushed past your limits.",
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
    text: "After the lecture, Dr. Mei erases one diagram and leaves the messier one on the board.\n\nDr. Mei: 'The clean model is for exams. The messy model is for reality.'\n\nYou: 'So which one should I ask about?'\n\nDr. Mei: 'Ask about the contradiction. That is usually where the research begins.'\n\nYour question lands well enough that she pauses, then answers as if you are worth the extra time.",
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
    text: "Dr. Mei opens a shared folder full of notes that look calm only from a distance.\n\nDr. Mei: 'I need someone careful. Clean the interview notes, flag unclear translations, prepare a small appendix.'\n\nYou: 'No dramatic research breakthrough?'\n\nDr. Mei: 'The breakthrough is learning not to invent one.'\n\nIt is not instant co-authorship. It is trust measured in careful tasks.",
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
    text: "Manager Zhang finishes the panel with the calm of someone who has answered the same internship question four hundred times.\n\nManager Zhang: 'Most students ask how to look impressive. Fewer ask how to be useful legally and consistently.'\n\nYou: 'Then I should ask the second one.'\n\nManager Zhang: 'Good. Start with your Chinese introduction. Short, clear, no inflated adjectives.'\n\nThe handshake is brief, but he remembers your name.",
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
    text: "At the alumni dinner, Manager Zhang listens without smiling too early.\n\nManager Zhang: 'Tell me your plan without application language.'\n\nYou: 'That removes about half my vocabulary.'\n\nManager Zhang: 'Excellent. Now we can start.'\n\nHe asks direct questions, marks which parts sound real, and explains what a legal internship path would actually require.",
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

  // --- ROUTE PROJECT ACTIONS ---
  "event_project_academic_portfolio_index": {
    speaker: "Library Desk",
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Minghai Library",
    text: "You stop treating your academic work like scattered survival evidence. Drafts, professor comments, field notes, class questions, and one uncomfortable failure all go into the same folder. A portfolio is not a scrapbook. It is a pattern you can defend.",
    choices: [
      {
        text: "Index the strongest proof and the weakest gap. [Portfolio +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 9, digitalProficiency: 4, energy: -5 },
          guanxi: { professors: 3 },
          flags: { academic_portfolio_indexed: true, route_academic: true, weekly_focus: "Academic portfolio index" },
          lifeCheck: {
            id: "academic_portfolio_index",
            label: "Academic Portfolio Index",
            route: "Academic",
            tags: ["academic", "research"],
            stats: { academics: 0.28, digitalProficiency: 0.18 },
            guanxi: { professors: 0.25 },
            routes: { academic: 1.2 },
            dc: 13,
            success: { message: "The portfolio starts to show a student with a method, not only a student with effort.", stats: { academics: 2 }, flags: { academic_portfolio_check_passed: true } },
            failure: { message: "The folder is organized, but the argument between the pieces is still faint.", stats: { energy: -2 }, flags: { academic_portfolio_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_project_internship_dossier": {
    speaker: "Career Office",
    bgImage: '/images/simulator/backgrounds/bg_career_office.jpg',
    location: "Minghai Career Office",
    text: "You assemble the internship dossier: resume, proof of enrollment, legal-work notes, a sharper interview answer, and a list of people you can ask without pretending the relationship is bigger than it is. The folder is boring in exactly the way career doors prefer.",
    choices: [
      {
        text: "Build the dossier around evidence, not vibes. [Career +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 8, academics: 3, energy: -4 },
          guanxi: { admin: 4 },
          flags: { internship_dossier_ready: true, route_career: true, weekly_focus: "Internship dossier assembled" },
          lifeCheck: {
            id: "internship_dossier",
            label: "Internship Dossier",
            route: "Career",
            tags: ["career", "interview", "admin"],
            stats: { digitalProficiency: 0.28, academics: 0.14, culture: 0.1 },
            guanxi: { admin: 0.28 },
            routes: { career: 1.2 },
            dc: 13,
            success: { message: "The dossier makes your ambition legible before anyone has to guess.", stats: { digitalProficiency: 2 }, flags: { internship_dossier_check_passed: true } },
            failure: { message: "The documents are there, but the story still needs sharper evidence.", stats: { energy: -2 }, flags: { internship_dossier_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_project_neighborhood_map": {
    speaker: "Dorm Courtyard",
    bgImage: '/images/simulator/backgrounds/bg_neighborhood_festival.jpg',
    location: "Minghai Dorm District",
    text: "Your map of the neighborhood stops being geographical. It becomes social: which gate closes early, which auntie notices greetings, which parcel shelf is chaos after rain, which stall owner will slow the line for a nervous student.",
    choices: [
      {
        text: "Write down the rules nobody posts. [Local +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { culture: 8, chinese: 5, energy: -3 },
          guanxi: { localStudents: 5 },
          flags: { neighborhood_map_indexed: true, route_local: true, weekly_focus: "Neighborhood map updated" },
          lifeCheck: {
            id: "neighborhood_map",
            label: "Neighborhood Map",
            route: "Local",
            tags: ["local", "language", "housing"],
            stats: { culture: 0.3, chinese: 0.18, digitalProficiency: 0.08 },
            guanxi: { localStudents: 0.28 },
            routes: { local: 1.2 },
            dc: 13,
            success: { message: "The map captures the city as people, not pins.", stats: { culture: 2 }, flags: { neighborhood_map_check_passed: true } },
            failure: { message: "You capture locations faster than relationships. The map is useful, but still thin.", stats: { energy: -2 }, flags: { neighborhood_map_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_project_support_guide_chapter": {
    speaker: "International Common Room",
    bgImage: '/images/simulator/backgrounds/bg_international_common_room.jpg',
    location: "International Student Common Room",
    text: "The support guide gets a new chapter: arrival panic, phone setup, whom to message before the office closes, and how to ask for help without turning confusion into shame. Sophie reads the draft and only deletes two jokes.",
    choices: [
      {
        text: "Write the chapter like someone scared will read it. [Guide +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 5, culture: 4, energy: -3 },
          guanxi: { intlStudents: 6 },
          relationships: { Sophie: { friendship: 3 } },
          flags: { support_guide_chapter_ready: true, route_intl: true, weekly_focus: "Support guide chapter" },
          lifeCheck: {
            id: "support_guide_chapter",
            label: "Support Guide Chapter",
            route: "International",
            tags: ["intl", "social", "arrival"],
            stats: { digitalProficiency: 0.22, culture: 0.18, energy: 0.04 },
            guanxi: { intlStudents: 0.3 },
            routes: { intl: 1.2 },
            character: "Sophie",
            relationshipWeight: 0.18,
            dc: 13,
            success: { message: "The chapter sounds like help from a person, not instructions from a wall.", stats: { energy: 2 }, flags: { support_guide_check_passed: true } },
            failure: { message: "The guide is useful, but Sophie marks where practical advice still turns into anxious overexplaining.", stats: { energy: -2 }, flags: { support_guide_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_project_prototype_telemetry": {
    speaker: "Incubator Room",
    bgImage: '/images/simulator/backgrounds/bg_incubator_room.jpg',
    location: "Minghai Incubator",
    text: "Xiao Chen wants to look at growth. You insist on looking at confusion: where users stop, which payment notes get ignored, which pickup instruction creates the same screenshot three times. The telemetry board is less glamorous than a pitch deck and far more honest.",
    choices: [
      {
        text: "Track friction before chasing growth. [Prototype +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { digitalProficiency: 10, culture: 3, energy: -5 },
          relationships: { "Xiao Chen": { friendship: 3 } },
          flags: { prototype_telemetry_board: true, route_city: true, weekly_focus: "Prototype telemetry board" },
          lifeCheck: {
            id: "prototype_telemetry_board",
            label: "Prototype Telemetry Board",
            route: "Shanghai",
            tags: ["digital", "career", "local"],
            stats: { digitalProficiency: 0.34, culture: 0.14 },
            guanxi: { localStudents: 0.18 },
            routes: { city: 1.2 },
            character: "Xiao Chen",
            relationshipWeight: 0.18,
            dc: 13,
            success: { message: "The board turns messy user pain into product decisions.", stats: { digitalProficiency: 2 }, flags: { prototype_telemetry_check_passed: true } },
            failure: { message: "The data is visible, but the lesson is still fighting the urge to launch faster.", stats: { energy: -2 }, flags: { prototype_telemetry_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_project_budget_ledger": {
    speaker: "Dorm Desk",
    bgImage: '/images/simulator/cg/cg_money_crisis.jpg',
    location: "Dorm Room",
    text: "You open the budget ledger and stop pretending small costs are small. Rent, meals, metro, print fees, emergency buffer, gifts, apps, and the one mystery payment that turns out to be laundry. The year becomes less romantic and more survivable.",
    choices: [
      {
        text: "Audit the numbers before they become a crisis. [Survival +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: 180, digitalProficiency: 5, energy: -2 },
          flags: { budget_ledger_audited: true, route_survival: true, weekly_focus: "Budget ledger audit" },
          lifeCheck: {
            id: "budget_ledger_audit",
            label: "Budget Ledger Audit",
            route: "Survival",
            tags: ["survival", "admin"],
            stats: { digitalProficiency: 0.28, energy: 0.06 },
            routes: { survival: 1.4 },
            dc: 11,
            success: { message: "The ledger finds a future crisis while it is still just a number.", stats: { wealth: 120 }, flags: { budget_ledger_check_passed: true } },
            failure: { message: "The ledger is honest, which is useful and slightly rude.", stats: { energy: -2 }, flags: { budget_ledger_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_recovery_forced_followup": {
    speaker: "Campus Clinic",
    bgImage: '/images/simulator/backgrounds/bg_campus_clinic.jpg',
    location: "Minghai Campus",
    text: "The week after forced recovery is quieter, which makes it dangerous. You feel better enough to overpromise. The clinic nurse gives you the look of someone who has watched students mistake one good morning for a full repair.",
    choices: [
      {
        text: "Set a smaller week and message people before they guess. [Recovery +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { energy: 18, academics: 3, digitalProficiency: 2 },
          guanxi: { professors: 2, intlStudents: 2 },
          flags: { recovery_followup_done: true, recovery_week_scar: false, recovery_week_repaired: true, weekly_focus: "Post-recovery follow-up" },
          lifeCheck: {
            id: "forced_recovery_followup",
            label: "Post-Recovery Follow-up",
            route: "Survival",
            tags: ["survival", "social", "academic"],
            stats: { energy: 0.16, digitalProficiency: 0.16, culture: 0.1 },
            guanxi: { professors: 0.16, intlStudents: 0.16 },
            routes: { survival: 1.2 },
            dc: 12,
            success: { message: "You do not bounce back dramatically. You rebuild predictably, which is better.", stats: { energy: 4 }, flags: { recovery_followup_check_passed: true } },
            failure: { message: "You reduce the damage, but recovery still feels like a debt with interest.", stats: { energy: -2 }, flags: { recovery_followup_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_recovery_academic_followup": {
    speaker: "Academic Advisor",
    bgImage: '/images/simulator/backgrounds/bg_library_night.jpg',
    location: "Minghai Advising Office",
    text: "A recovery plan is only real if it survives the second week. The advisor asks for attendance receipts, revised notes, and one professor check-in. It is not inspiring. It is exactly what repair looks like when nobody is filming.",
    choices: [
      {
        text: "Bring proof that the plan became habits. [Academic recovery +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { academics: 12, energy: -4 },
          guanxi: { professors: 4 },
          relationships: { "Professor Lin": { friendship: 3 } },
          flags: { academic_recovery_followup_done: true, academic_recovery_check_strained: false, academic_recovery_repaired: true, route_academic: true, weekly_focus: "Academic recovery follow-up" },
          lifeCheck: {
            id: "academic_recovery_followup",
            label: "Academic Recovery Follow-up",
            route: "Academic",
            tags: ["academic", "recovery"],
            stats: { academics: 0.3, digitalProficiency: 0.1, energy: 0.05 },
            guanxi: { professors: 0.25 },
            routes: { academic: 1.2 },
            character: "Professor Lin",
            relationshipWeight: 0.2,
            dc: 13,
            success: { message: "The advisor sees habits where there used to be panic.", stats: { academics: 3 }, flags: { academic_followup_check_passed: true } },
            failure: { message: "The plan is better, but fragile. It will need one more quiet week of discipline.", stats: { energy: -2 }, flags: { academic_followup_check_strained: true } }
          }
        }
      }
    ]
  },

  "event_recovery_money_followup": {
    speaker: "Dorm Desk",
    bgImage: '/images/simulator/cg/cg_money_crisis.jpg',
    location: "Dorm Room",
    text: "The rescue money solved the emergency. It did not solve the pattern. You open the ledger again, this time with the humility of someone who knows exactly how quickly a small number becomes a locked gate.",
    choices: [
      {
        text: "Build a two-week buffer and cut one recurring leak. [Money recovery +]",
        action: "advance_turn",
        next: "hub",
        effects: {
          stats: { wealth: 260, digitalProficiency: 4, energy: -2 },
          flags: { money_recovery_followup_done: true, money_recovery_buffer: true, route_survival: true, weekly_focus: "Money recovery follow-up" },
          lifeCheck: {
            id: "money_recovery_followup",
            label: "Money Recovery Follow-up",
            route: "Survival",
            tags: ["survival", "admin"],
            stats: { digitalProficiency: 0.3, energy: 0.04 },
            routes: { survival: 1.4 },
            dc: 11,
            success: { message: "The buffer is not glamorous, but it gives next week more choices.", stats: { wealth: 160 }, flags: { money_followup_check_passed: true } },
            failure: { message: "You find the leak, but the margin still feels uncomfortably alive.", stats: { energy: -2 }, flags: { money_followup_check_strained: true } }
          }
        }
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
