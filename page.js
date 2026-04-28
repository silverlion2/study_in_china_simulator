"use client";

import React, { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import StoryPanel from './components/StoryPanel';
import { gameEngine } from './engine/GameState';
import { EventSystem } from './engine/EventSystem';
import { AudioManager } from './engine/AudioManager';
import { epoch1Events } from './data/epoch1';
import { epoch2Events } from './data/epoch2';
import { epoch3Events } from './data/epoch3';
import { gameNodes } from './data/hubData';
import { audioManifest } from './data/audioManifest';
import TabletInterface from './components/TabletInterface';
import MiniGameOverlay from './components/MiniGames';

const QuestTracker = ({ state }) => {
    let questTitle = "Explore the Campus";
    let questDesc = "No urgent deadlines right now.";
    const flags = state.flags || {};

    if (state.phase === "Application" && !flags.decision_e1_start) {
        questTitle = "Departure Eve";
        questDesc = "Pack, check your messages, and remember how the China plan began.";
    } else if (state.phase === "Application" && !flags.target_minghai) {
        questTitle = "Choose Your China Plan";
        questDesc = "Define your motivation, background, Chinese foundation, and target university.";
    } else if (state.phase === "Application" && !flags.statement_finalized) {
        questTitle = "Write the Application";
        questDesc = "Shape your Minghai University statement and ask Professor Lin for real feedback.";
    } else if (state.phase === "Application" && !flags.finance_scholarship && !flags.finance_rich && !flags.finance_working) {
        questTitle = "Plan the Budget";
        questDesc = "Decide how this year in Shanghai will be funded.";
    } else if (state.phase === "Application" && !flags.completed_application) {
        questTitle = "Submit to Minghai";
        questDesc = "Finish documents, handle the interview, and submit before the deadline.";
    } else if (state.phase === "Application" && !flags.accepted_offer) {
         questTitle = "Open the Result";
         questDesc = "Your Minghai University admission email is waiting.";
    } else if (state.phase === "Pre-Departure" && !flags.admission_package_ready) {
        questTitle = "Decode the Admission Package";
        questDesc = "Understand Minghai's offer, visa form, and the document stack before the X1 appointment.";
    } else if (state.phase === "Pre-Departure" && !flags.got_visa) {
        questTitle = "Secure the X1 Visa";
        questDesc = "Bring the right documents and get your passport ready for China.";
    } else if (state.phase === "Pre-Departure" && !flags.decision_e2_wechat) {
        questTitle = "Prepare Your Phone";
        questDesc = "Set up digital access, WeChat, Alipay, and arrival tools for Shanghai.";
    } else if (state.phase === "Pre-Departure" && !flags.decision_e2_housing) {
        questTitle = "Choose Housing";
        questDesc = "Balance privacy, budget, and your first Minghai social connections.";
    } else if (state.phase === "Pre-Departure" && !flags.decision_e2_flight) {
        questTitle = "Book the Flight";
        questDesc = "Choose how much money, time, and energy the route to Shanghai will cost.";
    } else if (state.phase === "Pre-Departure" && !flags.semester_plan) {
        questTitle = "Set Up First Semester";
        questDesc = "Prepare for classes, campus Chinese, and registration before arrival.";
    } else if (state.phase === "Pre-Departure" && (!flags.decision_e2_pack || !flags.decision_e2_farewell)) {
        questTitle = "Pack and Say Goodbye";
        questDesc = "Decide what fits in the suitcase and what needs to be said before leaving.";
    } else if (state.phase === "Pre-Departure") {
        questTitle = "Boarding Call";
        questDesc = "It's time to board the flight to Shanghai.";
    } else if (state.phase === "In-China" && !flags.arrived_in_china) {
        questTitle = "Arrive at Minghai";
        questDesc = "Get from Pudong to campus, eat your first meal, and set up the dorm.";
    } else if (state.phase === "In-China" && !flags.decision_e3_registration) {
        questTitle = "Complete Registration";
        questDesc = "Get your student card, campus account, and first residence-permit deadlines under control.";
    } else if (state.phase === "In-China" && !flags.decision_e3_first_class) {
        questTitle = "Attend First Class";
        questDesc = "Discover what your Minghai major feels like in a real classroom.";
    } else if (state.phase === "In-China" && !flags.decision_e3_social_circle) {
        questTitle = "Find Your First Circle";
        questDesc = "Start building the relationships that make campus feel less abstract.";
    } else if (state.phase === "In-China" && !flags.decision_e3_rhythm && state.turn < 24) {
        questTitle = "Find Your First Rhythm";
        questDesc = "Choose whether your early Minghai life leans academic, local, international, career, or city-focused.";
    } else if (state.phase === "In-China" && state.turn < 24) {
        questTitle = "Prepare for Midterms";
        questDesc = "Use the weekly rhythm to strengthen your weakest part before Week 24.";
    } else if (state.phase === "In-China" && !flags.decision_e3_internship && state.turn < 32) {
        questTitle = "Choose a Future Direction";
        questDesc = "Turn your China experience toward research, career, local integration, student support, or city opportunity.";
    } else if (state.phase === "In-China" && state.turn < 32) {
        questTitle = "Finish the Year";
        questDesc = "Bring your studies, relationships, and future direction into the final review.";
    } else if (state.turn >= 32) {
        questTitle = "Epilogue";
        questDesc = "Your journey is coming to an end.";
    }

    return (
        <div className="absolute top-14 left-4 z-40 bg-slate-900/80 border border-slate-700/50 backdrop-blur-md p-3 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] w-64 pointer-events-none transition-all duration-300">
            <h3 className="text-amber-400 font-bold text-[10px] uppercase tracking-widest mb-1 flex items-center justify-between">
                <span>🎯 Current Objective</span>
                <span className="bg-amber-500/20 px-1 py-0.5 rounded text-amber-300">Active</span>
            </h3>
            <p className="text-slate-100 font-semibold text-sm leading-tight">{questTitle}</p>
            <p className="text-slate-400 text-[11px] mt-1.5 leading-tight italic">{questDesc}</p>
        </div>
    );
};

const getFallbackBackground = (state, node) => {
    const flags = state.flags || {};
    const speaker = node?.speaker || "";
    const location = node?.location || "";
    const text = node?.text || "";
    const context = `${speaker} ${location} ${text}`;

    if (/Out of Money|balance hits zero|Financial Emergency|locked gates|money crisis|hardship bursary|mutual-aid/i.test(context)) {
        return '/images/simulator/cg/cg_money_crisis.jpg';
    }
    if (/Campus Clinic|recovery|sick|Body files a formal complaint/i.test(context)) {
        return '/images/simulator/backgrounds/bg_campus_clinic.jpg';
    }
    if (/club fair|Campus Square|Hundred Regiment|student club/i.test(context)) {
        return '/images/simulator/backgrounds/bg_campus_square_club_fair.jpg';
    }
    if (/festival|Neighbor Li|neighborhood festival/i.test(context)) {
        return '/images/simulator/backgrounds/bg_neighborhood_festival.jpg';
    }
    if (/Language Partner|campus cafe|coffee meetup|check-in dinner|support circle/i.test(context)) {
        return '/images/simulator/backgrounds/bg_campus_cafe.jpg';
    }
    if (/Dorm Common Room|common room|homesick|comfort meal|international territory/i.test(context)) {
        return '/images/simulator/backgrounds/bg_dorm_common_room.jpg';
    }
    if (/Peking Opera|Opera Theater|opera mask/i.test(context)) {
        return '/images/simulator/backgrounds/bg_beijing_opera.jpg';
    }
    if (/Canton Fair|Trade Fair Floor/i.test(context)) {
        return '/images/simulator/backgrounds/bg_canton_fair.jpg';
    }
    if (/Terracotta|Guide Jin/i.test(context)) {
        return '/images/simulator/backgrounds/bg_terracotta_museum.jpg';
    }
    if (/hotpot|mala|sesame oil/i.test(context)) {
        return '/images/simulator/backgrounds/bg_chengdu_hotpot.jpg';
    }
    if (/Panda|panda|conservation|Sanctuary Guide/i.test(context)) {
        return '/images/simulator/backgrounds/bg_chengdu_panda_base.jpg';
    }
    if (/The Bund|Huangpu|Pearl Tower|skyline/i.test(context)) {
        return '/images/simulator/backgrounds/bg_shanghai_bund_evening.jpg';
    }
    if (/Fuxing Park|INS|nightlife|Disco/i.test(context)) {
        return '/images/simulator/backgrounds/bg_fuxing_park_night.jpg';
    }
    if (/Lujiazui|fintech|payment rails|Fintech Coin/i.test(context)) {
        return '/images/simulator/backgrounds/bg_lujiazui_fintech_talk.jpg';
    }
    if (/alumni dinner|business cards|networking/i.test(context)) {
        return '/images/simulator/backgrounds/bg_alumni_dinner.jpg';
    }
    if (/VPN|outside-web|payment problem|payment app|Phone Screen/i.test(context)) {
        return '/images/simulator/backgrounds/bg_phone_network_problem.jpg';
    }
    if (/dorm inspection|Dorm Auntie|hot plates|rice cookers|unauthorized appliances/i.test(context)) {
        return '/images/simulator/backgrounds/bg_dorm_inspection.jpg';
    }
    if (/Beijing|Forbidden City|Qianmen|Hutong|Palace|Peking Opera|Taxi Driver Lao Li/i.test(context)) {
        return '/images/simulator/backgrounds/bg_beijing_hutong.jpg';
    }
    if (/Guangzhou|Canton Fair|Baima|Wholesale Market|Boss Wu|Trade Fair/i.test(context)) {
        return '/images/simulator/backgrounds/bg_guangzhou_market.jpg';
    }
    if (/Chengdu|People's Park|Kuanzhai|hotpot|Teahouse|Sanctuary Guide|panda/i.test(context)) {
        return '/images/simulator/backgrounds/bg_chengdu_teahouse.jpg';
    }
    if (/Xi'an|Terracotta|Muslim Quarter|Ancient City Wall|Guide Jin|Street Vendor/i.test(context)) {
        return '/images/simulator/backgrounds/bg_xian_city_wall.jpg';
    }
    if (/Hangzhou|West Lake|Tea Pavilion|Binjiang|Tech Info Session/i.test(context)) {
        return '/images/simulator/backgrounds/bg_hangzhou_west_lake.jpg';
    }
    if (/Sanya|Houhai|Yalong Bay|Surfer|Beach Club|Public Beach/i.test(context)) {
        return '/images/simulator/backgrounds/bg_sanya_beach.jpg';
    }
    if (/Uncle Wang|BBQ|barbecue|skewer|neighborhood/i.test(context)) {
        return '/images/simulator/backgrounds/bg_uncle_wang_bbq.jpg';
    }
    if (/Sophie|International Student|Minghai Intl|common room|orientation/i.test(context)) {
        return '/images/simulator/backgrounds/bg_international_common_room.jpg';
    }
    if (/Career Office|Manager Zhang|internship|resume|referral|office badge/i.test(context)) {
        return '/images/simulator/backgrounds/bg_career_office.jpg';
    }
    if (/Xiao Chen|incubator|demo|prototype|startup|student-service|Lujiazui|Opportunity/i.test(context)) {
        return '/images/simulator/backgrounds/bg_incubator_room.jpg';
    }
    if (/Metro|Line 2|subway/i.test(context)) {
        return '/images/simulator/backgrounds/bg_shanghai_metro.jpg';
    }
    if (/Professor Lin|office hours|recommendation|academic method|draft feedback/i.test(context)) {
        return '/images/simulator/backgrounds/bg_professor_office.jpg';
    }
    if (/Dr\\. Mei|research discussion|research question|conference abstract|research ethics/i.test(context)) {
        return '/images/simulator/backgrounds/bg_research_meeting_room.jpg';
    }
    if (/Library|research|midterm|academic/i.test(context)) {
        return '/images/simulator/backgrounds/bg_library_night.jpg';
    }

    if (state.phase === "Application") {
        if (flags.accepted_offer) return '/images/simulator/backgrounds/bg_departure_eve_room.jpg';
        return '/images/simulator/backgrounds/bg_application_laptop.jpg';
    }

    if (state.phase === "Pre-Departure") {
        if (state.turn >= 15) return '/images/simulator/backgrounds/bg_predeparture_suitcase.jpg';
        if (state.turn >= 13) return '/images/simulator/backgrounds/bg_airplane_window.jpg';
        return '/images/simulator/cg/cg_document_stack_jw202.jpg';
    }

    if (state.phase === "In-China") {
        if (!flags.arrived_in_china) return '/images/simulator/backgrounds/bg_pudong_arrivals.jpg';
        return '/images/simulator/backgrounds/bg_minghai_gate.jpg';
    }

    return '/images/simulator/hub_bg.jpg';
};

const cloneStateForSummary = (state) => JSON.parse(JSON.stringify(state || {}));

const getSummaryDelta = (beforeState, afterState, key, label, tone = "slate") => {
    const beforeValue = beforeState?.stats?.[key] ?? 0;
    const afterValue = afterState?.stats?.[key] ?? 0;
    const delta = afterValue - beforeValue;
    return {
        key,
        label,
        beforeValue,
        afterValue,
        delta,
        tone
    };
};

const buildWeekTransition = (beforeState, state, nextNode) => {
    const milestoneTitles = {
        pre_departure_start: "Pre-Departure Begins",
        in_china_start: "Arrival in China",
        epoch3_midterm: "Midterm Week",
        epoch3_internship: "Future Direction Week",
        epoch3_final: "Year-End Review",
        forced_recovery_week: "Forced Recovery",
        money_crisis: "Financial Emergency",
        game_over_wealth: "Out of Money"
    };

    const phaseCopy = {
        Application: "Application work continues: documents, decisions, and the future taking shape one deadline at a time.",
        "Pre-Departure": "Departure preparation continues: visa details, digital setup, packing, and the emotional weight of leaving.",
        "In-China": "Campus life moves forward: classes, relationships, city routines, and the version of you Minghai is shaping."
    };

    const specialCopy = {
        forced_recovery_week: "Your energy has hit zero. The next scene pauses the normal plan so you can recover before the year breaks you.",
        money_crisis: "Your funds have run out. The next scene gives you one chance to find emergency support.",
        game_over_wealth: "There is no emergency option left. The next scene closes the route.",
        pre_departure_start: "The application is no longer an idea. Now you have an offer to decode and a departure to prepare.",
        in_china_start: "The plane has landed. Shanghai is no longer research, screenshots, or imagination.",
        epoch3_midterm: "The semester reaches its first serious checkpoint. Your habits are about to show their receipts.",
        epoch3_internship: "The year opens toward what comes next: research, work, service, community, or a bigger city gamble.",
        epoch3_final: "Everything you built this year is ready to become an ending."
    };

    return {
        previousWeek: beforeState.turn,
        week: state.turn,
        phase: state.phase,
        title: milestoneTitles[nextNode] || `Week ${state.turn}`,
        body: specialCopy[nextNode] || phaseCopy[state.phase] || "A new week begins.",
        nextNode,
        calendarFocus: state.flags?.calendar_focus || null,
        summaryStats: [
            getSummaryDelta(beforeState, state, "energy", "Energy", "teal"),
            getSummaryDelta(beforeState, state, "wealth", "RMB", "emerald"),
            getSummaryDelta(beforeState, state, "academics", "Academics", "sky"),
            getSummaryDelta(beforeState, state, "chinese", "Chinese", "amber"),
            getSummaryDelta(beforeState, state, "digitalProficiency", "Digital", "violet"),
            getSummaryDelta(beforeState, state, "culture", "Culture", "rose")
        ]
    };
};

const TITLE_GALLERY_ITEMS = [
    {
        id: "admission",
        title: "Admission Email",
        route: "Application",
        image: "/images/simulator/cg/cg_admission_email.jpg",
        hint: "Submit and accept the Minghai offer.",
        unlock: (flags) => flags.accepted_offer
    },
    {
        id: "documents",
        title: "Document Stack",
        route: "Pre-Departure",
        image: "/images/simulator/cg/cg_document_stack_jw202.jpg",
        hint: "Decode the admission package or visa documents.",
        unlock: (flags) => flags.jw202_understood || flags.got_visa
    },
    {
        id: "family_farewell",
        title: "Family Farewell",
        route: "Pre-Departure",
        image: "/images/simulator/cg/cg_family_farewell_keepsake.jpg",
        hint: "Reach the last night at home before departure.",
        unlock: (flags) => flags.decision_e2_farewell
    },
    {
        id: "language",
        title: "Language Breakthrough",
        route: "Campus Life",
        image: "/images/simulator/cg/cg_language_breakthrough.jpg",
        hint: "Find your first real Chinese-language rhythm.",
        unlock: (flags) => flags.language_breakthrough || flags.decision_e3_first_class || flags.chinese_confidence
    },
    {
        id: "language_partner",
        title: "Language Partner Cafe",
        route: "Campus Life",
        image: "/images/simulator/cg/cg_language_partner_cafe.jpg",
        hint: "Practice useful daily-life Chinese with a language partner.",
        unlock: (flags) => flags.language_partner_cafe
    },
    {
        id: "professor",
        title: "Professor Lin Office Hours",
        route: "Academic",
        image: "/images/simulator/cg/cg_professor_lin_office_hours.jpg",
        hint: "Earn Professor Lin's recommendation path.",
        unlock: (flags) => flags.lin_recommendation_ready
    },
    {
        id: "mei",
        title: "Dr. Mei Project Meeting",
        route: "Academic",
        image: "/images/simulator/cg/cg_dr_mei_project_meeting.jpg",
        hint: "Commit to Dr. Mei's research project.",
        unlock: (flags) => flags.dr_mei_project_commitment
    },
    {
        id: "research_poster",
        title: "Research Poster",
        route: "Academic",
        image: "/images/simulator/cg/cg_research_poster.jpg",
        hint: "Reach an academic or research ending.",
        unlock: (flags) => flags.ending_scholar || flags.ending_researcher || flags.dr_mei_project_commitment
    },
    {
        id: "sophie",
        title: "Sophie Support Circle",
        route: "International",
        image: "/images/simulator/cg/cg_sophie_support_circle.jpg",
        hint: "Build Sophie's support circle.",
        unlock: (flags) => flags.sophie_support_circle || flags.sophie_orientation_committee
    },
    {
        id: "orientation",
        title: "Orientation Guide",
        route: "International",
        image: "/images/simulator/cg/cg_orientation_guide.jpg",
        hint: "Turn international-student care into a reusable guide.",
        unlock: (flags) => flags.sophie_orientation_committee || flags.sophie_guide_published
    },
    {
        id: "xiao",
        title: "Xiao Chen Demo Day",
        route: "Shanghai",
        image: "/images/simulator/cg/cg_xiao_chen_demo_day.jpg",
        hint: "Reach Xiao Chen's demo day.",
        unlock: (flags) => flags.xiao_chen_demo_day
    },
    {
        id: "angel_demo",
        title: "Angel Demo",
        route: "Shanghai",
        image: "/images/simulator/cg/cg_angel_demo.jpg",
        hint: "Turn the student prototype into an investment-worthy demo.",
        unlock: (flags) => flags.ending_entrepreneur || flags.xiao_chen_demo_day
    },
    {
        id: "zhang",
        title: "Manager Zhang Badge",
        route: "Career",
        image: "/images/simulator/cg/cg_manager_zhang_office_badge.jpg",
        hint: "Prepare Manager Zhang's referral path.",
        unlock: (flags) => flags.manager_zhang_referral_ready || flags.legal_internship_ready
    },
    {
        id: "office_badge",
        title: "Shanghai Office Badge",
        route: "Career",
        image: "/images/simulator/cg/cg_office_badge.jpg",
        hint: "Enter the legal internship route.",
        unlock: (flags) => flags.legal_internship_ready || flags.ending_diplomat || flags.ending_return_offer
    },
    {
        id: "return_offer",
        title: "Return Offer",
        route: "Career",
        image: "/images/simulator/cg/cg_return_offer.jpg",
        hint: "Earn the full-time return-offer ending.",
        unlock: (flags) => flags.ending_diplomat || flags.ending_return_offer
    },
    {
        id: "wang",
        title: "Uncle Wang's Regular Table",
        route: "Local",
        image: "/images/simulator/cg/cg_uncle_wang_regular_table.jpg",
        hint: "Become a regular at Uncle Wang's table.",
        unlock: (flags) => flags.uncle_wang_regular
    },
    {
        id: "canteen_auntie",
        title: "Canteen Auntie",
        route: "Local",
        image: "/images/simulator/cg/cg_canteen_auntie_kind_portion.jpg",
        hint: "Keep the canteen line moving in Chinese.",
        unlock: (flags) => flags.canteen_auntie_kindness
    },
    {
        id: "dorm_auntie",
        title: "Dorm Auntie Parcel Help",
        route: "Local",
        image: "/images/simulator/cg/cg_dorm_auntie_parcel_help.jpg",
        hint: "Turn a package pickup into daily-life language practice.",
        unlock: (flags) => flags.dorm_auntie_parcel_help
    },
    {
        id: "study_group",
        title: "Local Study Group",
        route: "Local",
        image: "/images/simulator/cg/cg_local_study_group_night.jpg",
        hint: "Stay through the awkward parts with a local study group.",
        unlock: (flags) => flags.local_study_group_night
    },
    {
        id: "local_regular",
        title: "Local Regular",
        route: "Local",
        image: "/images/simulator/cg/cg_local_regular.jpg",
        hint: "Keep showing up in the neighborhood route.",
        unlock: (flags) => flags.ending_local_insider || flags.uncle_wang_regular
    },
    {
        id: "neighbor",
        title: "Neighbor Li Festival Prep",
        route: "Local",
        image: "/images/simulator/cg/cg_neighbor_li_festival_prep.jpg",
        hint: "Help Neighbor Li with festival prep.",
        unlock: (flags) => flags.neighbor_li_festival_invite
    },
    {
        id: "money",
        title: "Money Crisis",
        route: "Risk",
        image: "/images/simulator/cg/cg_money_crisis.jpg",
        hint: "Reach the financial emergency route.",
        unlock: (flags) => flags.emergency_funding_used || flags.money_crisis_seen
    },
    {
        id: "quiet_return",
        title: "Quiet Return",
        route: "Risk",
        image: "/images/simulator/cg/cg_quiet_return.jpg",
        hint: "Reach a low-resource ending.",
        unlock: (flags) => flags.ending_out_of_money || flags.ending_quiet_return
    }
];

const getSceneBgmId = (state, node, screenMode) => {
    if (screenMode !== "game") return "title";

    const phase = state?.phase || "Application";
    const nodeId = state?.currentNodeId || "";
    const speaker = node?.speaker || "";
    const location = node?.location || "";
    const text = node?.text || "";
    const context = `${nodeId} ${speaker} ${location} ${text}`;

    if (/Out of Money|Financial Emergency|money crisis|ending_out_of_money|quiet return|game_over_wealth/i.test(context)) {
        return "crisisMoney";
    }
    if (/ending_/i.test(nodeId)) {
        if (/out_of_money|quiet|failed|bad/i.test(nodeId)) return "quietEnding";
        return "goodEnding";
    }
    if (/Xiao Chen|incubator|demo|prototype|startup|angel/i.test(context)) return "startupDemo";
    if (/Manager Zhang|Career Office|internship|office badge|return offer|alumni dinner/i.test(context)) return "careerOffice";
    if (/Uncle Wang|Neighbor Li|BBQ|barbecue|skewer|festival|neighborhood/i.test(context)) return "localLife";
    if (/Sophie|International Student|support circle|common room|orientation/i.test(context)) return "socialWarm";
    if (/Professor Lin|Dr\\. Mei|Library|research|classroom|midterm|academic|office hours/i.test(context)) return "studyLibrary";
    if (/Bund|Metro|Line 2|Lujiazui|Shanghai city|Fuxing|nightlife|city/i.test(context)) return "shanghaiCity";

    if (phase === "Application") {
        if (/deadline|interview|submit|feedback|decision|result/i.test(context)) return "applicationPressure";
        return "applicationLateNight";
    }
    if (phase === "Pre-Departure") {
        if (/JW202|visa|document|admission package|paperwork/i.test(context)) return "documentsAdmin";
        if (/flight|boarding|airplane|arrival|Pudong/i.test(context)) return "flightArrival";
        return "predepartureHome";
    }
    if (phase === "In-China" && !state?.flags?.arrived_in_china) {
        return "flightArrival";
    }

    return "campusDaily";
};

function TitleScreen({ mode, hasSave, savedFlags, titleMessage, audioEnabled, onNewGame, onLoadGame, onOpenGallery, onBack, onToggleAudio }) {
    const galleryMode = mode === "gallery";
    const galleryEntries = TITLE_GALLERY_ITEMS.map(item => ({
        ...item,
        unlocked: Boolean(item.unlock(savedFlags || {}))
    }));
    const unlockedCount = galleryEntries.filter(item => item.unlocked).length;

    return (
        <div className="relative flex h-full w-full overflow-hidden bg-slate-950 text-slate-100">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1800ms] ease-out"
                style={{ backgroundImage: 'url("/images/simulator/backgrounds/bg_pudong_arrivals.jpg")' }}
            ></div>
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.92)_34%,rgba(15,23,42,0.62)_62%,rgba(2,6,23,0.86)_100%)]"></div>
            <div className="absolute inset-x-0 top-0 h-24 border-b border-white/10 bg-slate-950/35 backdrop-blur-sm"></div>
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 to-transparent"></div>

            <div className="relative z-10 flex h-full w-full flex-col px-6 py-6 sm:px-10">
                <div className="flex items-center justify-between">
                    <div className="rounded-full border border-amber-200/30 bg-slate-950/60 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-amber-100 backdrop-blur-md">
                        PVG Gate A12 / Minghai University
                    </div>
                    <button
                        onClick={onToggleAudio}
                        className="rounded-full border border-slate-500/60 bg-slate-950/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-100 backdrop-blur-md transition hover:border-amber-200 hover:text-amber-200"
                    >
                        Sound {audioEnabled ? "On" : "Off"}
                    </button>
                </div>

                {galleryMode ? (
                    <div className="mt-8 flex min-h-0 flex-1 flex-col">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-200">CG Gallery</div>
                                <h1 className="mt-2 font-serif text-4xl font-black text-white sm:text-6xl">Memory Archive</h1>
                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                                    Key scenes unlock through your save file. Load your journey to sync the full in-game archive.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-3 text-center">
                                    <div className="text-2xl font-black text-white">{unlockedCount}/{galleryEntries.length}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-100">Unlocked</div>
                                </div>
                                <button
                                    onClick={onBack}
                                    className="rounded-2xl border border-slate-500 bg-slate-950/70 px-5 py-3 text-sm font-bold text-slate-100 backdrop-blur-md transition hover:border-amber-200 hover:text-amber-200"
                                >
                                    Back
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 grid min-h-0 flex-1 grid-cols-2 gap-4 overflow-y-auto pr-2 sm:grid-cols-3 lg:grid-cols-4">
                            {galleryEntries.map(item => (
                                <div
                                    key={item.id}
                                    className={`overflow-hidden rounded-3xl border bg-slate-950/78 shadow-2xl transition ${item.unlocked ? "border-fuchsia-300/40 hover:-translate-y-1" : "border-slate-700 opacity-70"}`}
                                >
                                    <div className="relative h-36 overflow-hidden sm:h-44">
                                        <img src={item.image} alt={item.title} className={`h-full w-full object-cover transition duration-500 ${item.unlocked ? "scale-100" : "scale-105 blur-sm grayscale"}`} />
                                        {!item.unlocked && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-black uppercase tracking-[0.28em] text-white">Locked</div>
                                        )}
                                        <div className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-100">
                                            {item.route}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="font-bold text-white">{item.unlocked ? item.title : "Locked Memory"}</div>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.unlocked ? "Available from your current save." : item.hint}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid min-h-0 flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="max-w-4xl">
                            <div className="mb-5 inline-flex rounded-full border border-sky-200/25 bg-sky-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-sky-100">
                                Shanghai only / one school / one year
                            </div>
                            <h1 className="max-w-4xl font-serif text-5xl font-black leading-[0.95] text-white drop-shadow-2xl sm:text-7xl">
                                Study in China Simulator
                            </h1>
                            <div className="mt-4 text-2xl font-semibold text-amber-100 sm:text-4xl">
                                Sim Panda: Minghai Arrival
                            </div>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                                Apply, prepare, land in Shanghai, learn the apps everyone assumes you already know, find a place to sleep, and build a year at Minghai University that can actually hold together.
                            </p>
                            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                                {[
                                    ["32", "Weeks"],
                                    ["1", "School"],
                                    ["Shanghai", "City"]
                                ].map(([value, label]) => (
                                    <div key={label} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                                        <div className="text-2xl font-black text-white sm:text-3xl">{value}</div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-amber-200/25 bg-slate-950/82 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.58)] backdrop-blur-xl">
                            <div className="mb-4 flex items-center justify-between gap-4 border-b border-dashed border-amber-200/25 pb-4">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-200">Boarding Pass</div>
                                    <div className="mt-1 text-2xl font-black text-white">Dreamer Class</div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-right font-mono">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Seat</div>
                                    <div className="text-xl font-black text-amber-100">STUDY 01</div>
                                </div>
                            </div>

                            <div className="relative mb-5 h-52 overflow-hidden rounded-xl border border-white/10 bg-slate-900">
                                <img src="/images/simulator/cg/cg_admission_email.jpg" alt="Minghai admission package" className="h-full w-full object-cover opacity-85" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3 text-xs">
                                    <div>
                                        <div className="font-mono uppercase tracking-[0.2em] text-slate-400">From</div>
                                        <div className="mt-1 font-black text-white">Home</div>
                                    </div>
                                    <div>
                                        <div className="font-mono uppercase tracking-[0.2em] text-slate-400">To</div>
                                        <div className="mt-1 font-black text-white">Shanghai</div>
                                    </div>
                                    <div>
                                        <div className="font-mono uppercase tracking-[0.2em] text-slate-400">Campus</div>
                                        <div className="mt-1 font-black text-white">Minghai</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={onNewGame}
                                    className="w-full rounded-xl bg-amber-300 px-5 py-4 text-left font-black text-slate-950 shadow-[0_16px_40px_rgba(251,191,36,0.26)] transition hover:-translate-y-0.5 hover:bg-amber-200"
                                >
                                    Start Check-in
                                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">Begin at the departure-eve prologue</span>
                                </button>
                                <button
                                    onClick={onLoadGame}
                                    disabled={!hasSave}
                                    className={`w-full rounded-xl border px-5 py-4 text-left font-black transition ${hasSave ? "border-sky-300/45 bg-sky-300/10 text-sky-50 hover:-translate-y-0.5 hover:bg-sky-300/18" : "cursor-not-allowed border-slate-700 bg-slate-900/65 text-slate-500"}`}
                                >
                                    Continue Save
                                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{hasSave ? "Continue your saved year" : "No local save found"}</span>
                                </button>
                                <button
                                    onClick={onOpenGallery}
                                    className="w-full rounded-xl border border-fuchsia-300/35 bg-fuchsia-300/10 px-5 py-4 text-left font-black text-fuchsia-50 transition hover:-translate-y-0.5 hover:bg-fuchsia-300/18"
                                >
                                    CG Gallery
                                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100/75">View memory unlocks from your save</span>
                                </button>
                            </div>

                            {titleMessage && (
                                <div className="mt-4 rounded-2xl border border-amber-200/30 bg-amber-200/10 px-4 py-3 text-sm text-amber-100">
                                    {titleMessage}
                                </div>
                            )}
                            <div className="mt-5 text-[11px] leading-relaxed text-slate-500">
                                Music starts after a player action because desktop browsers block autoplay. You can mute it anytime.
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SimulatorPage() {
  const [gameState, setGameState] = useState(gameEngine.getState());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTabletOpen, setIsTabletOpen] = useState(false);
  const [replayGameId, setReplayGameId] = useState(null);
  const [gigGameId, setGigGameId] = useState(null);
  const [weekTransition, setWeekTransition] = useState(null);
  const [isSceneFocusMode, setIsSceneFocusMode] = useState(false);
  const [screenMode, setScreenMode] = useState("title");
  const [titleMessage, setTitleMessage] = useState("");
  const [hasSave, setHasSave] = useState(false);
  const [savedFlags, setSavedFlags] = useState({});
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioEngineRef = useRef(null);
  if (!audioEngineRef.current) {
    audioEngineRef.current = new AudioManager(audioManifest);
  }
  // Combine all event nodes
  const allEvents = { ...epoch1Events, ...epoch2Events, ...epoch3Events, ...gameNodes };

  const [events] = useState(() => {
    const e = new EventSystem(gameEngine);
    e.loadEvents(allEvents);
    return e;
  });

  const refreshSaveStatus = () => {
    try {
      if (typeof window === "undefined" || !window.localStorage) {
        setHasSave(false);
        setSavedFlags({});
        return false;
      }
      const rawSave = window.localStorage.getItem("sim_panda_save");
      if (!rawSave) {
        setHasSave(false);
        setSavedFlags({});
        return false;
      }
      const parsedSave = JSON.parse(rawSave);
      setHasSave(true);
      setSavedFlags(parsedSave.flags || {});
      return true;
    } catch (error) {
      console.error("Save status check failed", error);
      setHasSave(false);
      setSavedFlags({});
      return false;
    }
  };

  const clearTransientUi = () => {
    setIsMenuOpen(false);
    setIsTabletOpen(false);
    setReplayGameId(null);
    setGigGameId(null);
    setWeekTransition(null);
    setIsSceneFocusMode(false);
  };

  const enableAudio = async () => {
    const started = await audioEngineRef.current?.start();
    setAudioEnabled(Boolean(started));
    if (!started) {
      setTitleMessage("Audio is not available in this environment yet.");
    }
    return started;
  };

  const playUiSound = (id = "uiClick") => {
    if (audioEnabled) audioEngineRef.current?.playSfx(id);
  };

  const handleToggleAudio = async () => {
    if (audioEnabled) {
      audioEngineRef.current?.stop();
      audioEngineRef.current?.mute();
      setAudioEnabled(false);
      return;
    }
    const started = await enableAudio();
    if (started) audioEngineRef.current?.playSfx("uiConfirm");
  };

  const handleNewGameFromTitle = async () => {
    const started = await enableAudio();
    if (started) audioEngineRef.current?.playSfx("uiConfirm");
    gameEngine.reset();
    clearTransientUi();
    setTitleMessage("");
    setScreenMode("game");
    refreshSaveStatus();
  };

  const handleLoadFromTitle = async () => {
    if (!gameEngine.load()) {
      setTitleMessage("No local save found yet. Start a new application journey first.");
      refreshSaveStatus();
      return;
    }
    const started = await enableAudio();
    if (started) audioEngineRef.current?.playSfx("load");
    clearTransientUi();
    setTitleMessage("");
    setScreenMode("game");
    refreshSaveStatus();
  };

  const handleOpenTitleGallery = () => {
    playUiSound("menuOpen");
    refreshSaveStatus();
    setTitleMessage("");
    setScreenMode("gallery");
  };

  const handleBackToTitle = () => {
    playUiSound("uiBack");
    refreshSaveStatus();
    setTitleMessage("");
    setScreenMode("title");
  };

  useEffect(() => {
    refreshSaveStatus();
    return () => {
      audioEngineRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    // Hide header/footer for immersive mode
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';

    // Subscribe to engine
    const unsubscribe = gameEngine.subscribe((newState) => {
      setGameState({ ...newState });
    });

    return () => {
      if (nav) nav.style.display = '';
      if (footer) footer.style.display = '';
      unsubscribe();
    };
  }, [events]);

  const handleChoice = (choice) => {
    playUiSound("uiConfirm");
    const beforeChoiceState = cloneStateForSummary(gameEngine.getState());
    let nextNode = events.executeChoice(choice);

    if (choice.action === "reset_game") {
        gameEngine.reset();
        clearTransientUi();
        setScreenMode("title");
        refreshSaveStatus();
        return;
    }

    // Explicit action trigger
    const advancesWeek = choice.action === "advance_turn";
    if (advancesWeek) {
        gameEngine.advanceTurn();
    }

    // Enforce Game Over and Epoch transitions
    const state = gameEngine.getState();
    if (state.stats.energy <= 0) nextNode = "forced_recovery_week";
    else if (state.stats.wealth <= 0) nextNode = state.flags.emergency_funding_used ? "game_over_wealth" : "money_crisis";
    else if (state.turn === 8 && advancesWeek) nextNode = "pre_departure_start";
    else if (state.turn === 16 && advancesWeek) nextNode = "in_china_start";
    else if (state.turn === 24 && advancesWeek) nextNode = "epoch3_midterm";
    else if (state.turn === 28 && advancesWeek) nextNode = "epoch3_internship";
    else if (state.turn === 32 && advancesWeek) nextNode = "epoch3_final";

    if (advancesWeek) {
        setWeekTransition(buildWeekTransition(beforeChoiceState, cloneStateForSummary(state), nextNode));
        return;
    }

    // Slight delay for effect
    setTimeout(() => {
        gameEngine.setCurrentNode(nextNode);
    }, 150);
  };

  const handleContinueWeek = () => {
    if (!weekTransition) return;
    playUiSound("calendarFlip");
    gameEngine.setCurrentNode(weekTransition.nextNode);
    setWeekTransition(null);
    setIsSceneFocusMode(false);
  };

  const toggleSceneFocusMode = () => {
    playUiSound();
    setIsSceneFocusMode((value) => !value);
    setIsMenuOpen(false);
    setIsTabletOpen(false);
  };

  const handleGigComplete = (result) => {
    // Unlock for Arcade automatically
    gameEngine.setFlag(`unlocked_minigame_${gigGameId}`, true);

    // Mark as worked this week
    gameEngine.setFlag('has_worked_this_week', true);
    gameEngine.setFlag('first_student_task_used', true);
    gameEngine.setFlag('campus_microtask_board_used', true);
    gameEngine.setFlag(`completed_gig_${gigGameId}`, true);

    // Handle gig rewards
    if (gigGameId === 'tones') {
       if(result.win) {
           gameEngine.addTransaction(200, "Gig: English Tutor");
           gameEngine.updateStats({ energy: -10, academics: -2 });
       } else {
           gameEngine.addTransaction(50, "Gig: English Tutor (Poor)");
           gameEngine.updateStats({ energy: -15 });
       }
    } else if (gigGameId === 'delivery') {
       if(result.win) {
           gameEngine.addTransaction(300, "Gig: Campus Delivery");
           gameEngine.updateStats({ energy: -15 });
       } else {
           gameEngine.updateStats({ energy: -20 });
       }
    } else if (gigGameId === 'hongbao') {
       if(result.win) {
           gameEngine.addTransaction(150, "Gig: Flyer Distributor");
           gameEngine.updateStats({ energy: -5 });
       } else {
           gameEngine.updateStats({ energy: -10 });
       }
    } else if (gigGameId === 'model') {
       if(result.win) {
           gameEngine.addTransaction(500, "Gig: Taobao Model");
           gameEngine.updateStats({ energy: -20 });
       } else {
           gameEngine.updateStats({ energy: -25 });
       }
    }
    setGigGameId(null);
  };

  const handleMinigameComplete = (result) => {
    const currentNode = allEvents[gameState.currentNodeId];

    // Unlock the minigame for replay in the tablet
    gameEngine.setFlag(`unlocked_minigame_${currentNode.minigame}`, true);

    if (currentNode.minigame === 'bargain') {
        gameEngine.updateStats({ wealth: -(result.cost || 0) });
    } else if (currentNode.minigame === 'delivery') {
        if (result.win) {
            gameEngine.updateStats({ energy: 15, wealth: -30 });
        } else {
            gameEngine.updateStats({ energy: -10, wealth: -30 });
        }
    } else if (currentNode.minigame === 'tones') {
        if (result.win) {
            gameEngine.updateStats({ chinese: 5, academics: 2, energy: -5 });
        } else {
            gameEngine.updateStats({ energy: -10 });
        }
    } else if (currentNode.minigame === 'hongbao') {
        if (result.win) {
            gameEngine.updateStats({ wealth: 100, energy: 10 });
        } else {
            gameEngine.updateStats({ energy: -5 });
        }
    } else if (currentNode.minigame === 'banquet') {
        if (result.win) {
            gameEngine.updateGuanxi("professors", 10);
            gameEngine.updateStats({ energy: -10 });
        } else {
            gameEngine.updateGuanxi("professors", -5);
            gameEngine.updateStats({ energy: -20 });
        }
    } else if (currentNode.minigame === 'bike') {
        if (result.win) {
            gameEngine.updateStats({ digitalProficiency: 5, energy: -5 });
        } else {
            gameEngine.updateStats({ energy: -15 });
        }
    } else if (currentNode.minigame === 'subway' && !result.win) {
        gameEngine.updateStats({ energy: -15 });
    }

    const nextNodeId = result.win ? currentNode.onWin : currentNode.onLose;

    setTimeout(() => {
        gameEngine.setCurrentNode(nextNodeId);
    }, 150);
  };

  const handleSave = () => {
    playUiSound("save");
    gameEngine.save();
    refreshSaveStatus();
    setIsMenuOpen(false);
    alert("Game saved!");
  };

  const handleLoad = () => {
    playUiSound("load");
    if (gameEngine.load()) {
      setWeekTransition(null);
      setIsSceneFocusMode(false);
      setIsMenuOpen(false);
      refreshSaveStatus();
      alert("Game loaded!");
    } else {
      alert("No save found.");
    }
  };

  const handleRestart = () => {
    playUiSound("deadlineWarning");
    if (confirm("Are you sure you want to restart? All unsaved progress will be lost.")) {
      gameEngine.reset();
      setWeekTransition(null);
      setIsSceneFocusMode(false);
      setIsMenuOpen(false);
    }
  };

  const handleFullscreen = () => {
    playUiSound("menuOpen");
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsMenuOpen(false);
  };

  const handleReturnToTitle = () => {
    playUiSound();
    clearTransientUi();
    refreshSaveStatus();
    setScreenMode("title");
  };

  const currentNodeId = gameState.currentNodeId || "start";
  const currentNode = allEvents[currentNodeId];
  const sceneImage = currentNode?.bgImage || getFallbackBackground(gameState, currentNode);

  useEffect(() => {
    if (!audioEnabled) return;
    const bgmId = getSceneBgmId(gameState, currentNode, screenMode);
    audioEngineRef.current?.playBgm(bgmId, { fadeMs: 900 });
  }, [audioEnabled, screenMode, gameState.phase, gameState.turn, gameState.currentNodeId]);

  if (screenMode !== "game") {
    return (
      <TitleScreen
        mode={screenMode}
        hasSave={hasSave}
        savedFlags={savedFlags}
        titleMessage={titleMessage}
        audioEnabled={audioEnabled}
        onNewGame={handleNewGameFromTitle}
        onLoadGame={handleLoadFromTitle}
        onOpenGallery={handleOpenTitleGallery}
        onBack={handleBackToTitle}
        onToggleAudio={handleToggleAudio}
      />
    );
  }

  return (
    <div className="flex h-full w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Main area: Visual Novel */}
      <div
         className="w-full flex flex-col relative bg-cover bg-center transition-all duration-1000 ease-in-out"
         style={{ backgroundImage: `url("${sceneImage}")` }}
      >
        <div className={`absolute inset-0 transition-all duration-500 ${isSceneFocusMode ? "bg-black/0 backdrop-blur-0" : "bg-black/40 backdrop-blur-sm"}`}></div>

        {/* Top Info Bar */}
        {!isSceneFocusMode && <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black/80 to-transparent z-40 flex items-center px-4 justify-between text-slate-200">
            <div className="flex gap-6 font-mono font-semibold ml-2 text-xs">
                <div className="text-amber-400 text-base">Week {gameState.turn} <span className="text-slate-400 font-normal ml-1 text-xs">[{gameState.phase}]</span></div>
                <div className="flex items-center gap-2">
                   <span>😌 Energy {gameState.stats.energy}/100</span>
                   <div className={`w-24 h-1.5 rounded-full ${gameState.stats.energy < 30 ? "bg-red-900" : "bg-slate-700"} overflow-hidden shadow-inner`}>
                      <div className={`h-full transition-all duration-500 ease-out ${gameState.stats.energy < 30 ? "bg-red-500" : "bg-teal-400"}`} style={{ width: `${gameState.stats.energy}%` }}></div>
                   </div>
                </div>
                <div className="text-emerald-400">💰 ¥{gameState.stats.wealth}</div>
            </div>
        </div>}

        {/* Top Menu */}
        <div className="absolute top-3 right-4 z-50">
          <div className="flex gap-3 items-center">
            <button
              onClick={handleToggleAudio}
              className={`${audioEnabled ? "bg-emerald-500/80 text-slate-950 border-emerald-200" : "bg-slate-900/70 text-slate-300 border-slate-500/70 hover:border-emerald-200 hover:text-emerald-100"} px-3 py-1.5 rounded shadow-md font-semibold font-mono backdrop-blur-md transition-all text-sm`}
            >
              Sound {audioEnabled ? "On" : "Off"}
            </button>
            <button
              onClick={toggleSceneFocusMode}
              className={`${isSceneFocusMode ? "bg-amber-400 text-slate-950 border-amber-200" : "bg-slate-900/70 text-amber-100 border-amber-300/60 hover:bg-slate-800/90"} px-3 py-1.5 rounded shadow-[0_0_15px_rgba(251,191,36,0.25)] font-semibold font-mono backdrop-blur-md transition-all text-sm`}
            >
              {isSceneFocusMode ? "Back to Story" : "View Scene"}
            </button>
            {!isSceneFocusMode && (
            <button
              onClick={() => {
                playUiSound();
                setIsTabletOpen(true);
              }}
              className="bg-sky-600/80 hover:bg-sky-500 text-white border border-sky-400 px-3 py-1.5 rounded shadow-[0_0_15px_rgba(14,165,233,0.5)] font-semibold font-mono flex items-center gap-1.5 backdrop-blur-md transition-all text-sm"
            >
              📱 SimPad
            </button>
            )}
            {!isSceneFocusMode && (
            <div className="relative">
              <button
                onClick={() => {
                  playUiSound();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 px-3 py-1.5 rounded shadow-md font-semibold font-mono flex items-center gap-1.5 backdrop-blur-md transition-colors text-sm"
              >
                <span>⚙️</span> Menu
              </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-md shadow-2xl py-1 transform origin-top-right transition-all">
                <button onClick={handleSave} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-emerald-400">
                  💾 Quick Save
                </button>
                <button onClick={handleLoad} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-amber-400">
                  📂 Quick Load
                </button>
                <button onClick={handleFullscreen} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-blue-400">
                  🔲 Toggle Fullscreen
                </button>
                <button onClick={handleReturnToTitle} className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-fuchsia-300">
                  🏠 Title Screen
                </button>
                <div className="border-t border-slate-700 my-1"></div>
                <button onClick={handleRestart} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-slate-900">
                  🔄 Restart Game
                </button>
              </div>
            )}
          </div>
            )}
          </div>
        </div>

        {isSceneFocusMode && (
          <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/70 to-transparent p-6 pointer-events-none">
            <div className="max-w-3xl text-sm text-slate-200/80">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-200/90">Scene View</div>
              <div className="mt-1 text-lg font-semibold text-white">{currentNode?.location || gameState.location || gameState.phase}</div>
            </div>
          </div>
        )}

        {!isSceneFocusMode && <QuestTracker state={gameState} />}

        {!isSceneFocusMode && weekTransition && (
          <div data-week-transition className="absolute inset-0 z-[90] flex items-center justify-center bg-slate-950/75 backdrop-blur-md px-6">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-300/30 bg-slate-950/95 p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.65)] animate-in fade-in zoom-in-95 duration-500">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-sky-300 to-emerald-400"></div>
              <div className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-300/80">Calendar Updated</div>
              <div className="mt-5 font-serif text-6xl font-bold text-slate-50 drop-shadow-lg">Week {weekTransition.week}</div>
              <div className="mt-3 inline-flex rounded-full border border-slate-600/70 bg-slate-900/80 px-4 py-1 text-xs font-bold uppercase tracking-widest text-sky-200">
                {weekTransition.phase}
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-amber-100">{weekTransition.title}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">{weekTransition.body}</p>
              {weekTransition.calendarFocus && (
                <div className="mx-auto mt-4 max-w-md rounded-xl border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">
                  Pinned focus: {weekTransition.calendarFocus}
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {weekTransition.summaryStats.map((item) => {
                  const sign = item.delta > 0 ? "+" : "";
                  const changed = item.delta !== 0;
                  return (
                    <div key={item.key} className={`rounded-2xl border p-3 text-left ${changed ? "border-slate-600 bg-slate-900/90" : "border-slate-800 bg-slate-900/45 opacity-65"}`}>
                      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                      <div className="mt-1 flex items-end justify-between gap-2">
                        <span className="font-mono text-lg font-black text-slate-100">{item.afterValue}</span>
                        <span className={`font-mono text-xs font-bold ${item.delta > 0 ? "text-emerald-300" : item.delta < 0 ? "text-rose-300" : "text-slate-500"}`}>
                          {sign}{item.delta}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-[11px] text-slate-500">
                Week {weekTransition.previousWeek} has been settled. Living costs, work, items, and story effects are now reflected above.
              </div>
              <button
                onClick={handleContinueWeek}
                onKeyDown={(e) => e.stopPropagation()}
                className="mt-8 rounded-xl bg-amber-400 px-8 py-3 font-bold text-slate-950 shadow-[0_12px_30px_rgba(251,191,36,0.28)] transition-all hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
              >
                Start Week {weekTransition.week}
              </button>
              <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-slate-500">Choices resume after this pause</div>
            </div>
          </div>
        )}

        {!isSceneFocusMode && isTabletOpen && <TabletInterface state={gameState} onClose={() => setIsTabletOpen(false)} onReplayGame={(id) => setReplayGameId(id)} onPlayGig={(id) => { setIsTabletOpen(false); setGigGameId(id); }} />}

        {!isSceneFocusMode && currentNode?.minigame && !replayGameId && !gigGameId && (
            <MiniGameOverlay gameId={currentNode.minigame} onComplete={handleMinigameComplete} />
        )}

        {!isSceneFocusMode && replayGameId && (
            <MiniGameOverlay gameId={replayGameId} onComplete={() => setReplayGameId(null)} />
        )}

        {!isSceneFocusMode && gigGameId && (
            <MiniGameOverlay gameId={gigGameId} onComplete={handleGigComplete} />
        )}

        {!isSceneFocusMode && <StoryPanel
          node={currentNode}
          state={gameState}
          onChoice={handleChoice}
          onTextTick={audioEnabled ? () => audioEngineRef.current?.typeTick() : null}
          availableChoices={events.getAvailableChoices(currentNodeId)}
        />}
      </div>
    </div>
  );
}
