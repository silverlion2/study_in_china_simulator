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
import QuestTracker from './components/QuestTracker';
import { getFallbackBackground } from './lib/sceneBackgrounds';
import { getSceneAmbienceId, getSceneBgmId } from './lib/sceneAudio';

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

const getDelayedConsequenceNode = (state) => {
    const flags = state.flags || {};
    if (state.phase !== "In-China" || !flags.arrived_in_china) return null;
    if (!flags.campus_rhythm_started) return null;

    if (!flags.delayed_phone_payment_friction_seen && state.turn >= 21 && (!flags.has_alipay || !flags.has_wechat || flags.airport_app_setup_stress)) {
        return "delayed_phone_payment_friction";
    }
    if (!flags.delayed_language_anxiety_seen && state.turn >= 21 && (flags.chinese_beginner || state.stats.chinese < 25)) {
        return "delayed_language_anxiety";
    }
    if (!flags.delayed_housing_compromise_seen && state.turn >= 22 && (flags.dorm_pending || flags.taobao_wrong_size_lesson || flags.housing_friction_debt || !flags.housing_sorted)) {
        return "delayed_housing_compromise";
    }
    if (!flags.delayed_dorm_auntie_help_seen && state.turn >= 22 && (flags.dorm_auntie_parcel_help || flags.neighbor_li_parcel_mediator)) {
        return "delayed_dorm_auntie_help";
    }
    if (!flags.delayed_calendar_focus_seen && state.turn >= 23 && (flags.calendar_midterm_prepped || flags.calendar_admin_prepped || flags.calendar_future_prepped)) {
        return "delayed_calendar_focus_payoff";
    }
    if (!flags.delayed_wechat_silence_seen && state.turn >= 22 && flags.wechat_silence_consequence_ready) {
        return "delayed_wechat_silence";
    }
    if (!flags.delayed_didi_pickup_confusion_seen && state.turn >= 22 && flags.didi_pickup_friction_ready) {
        return "delayed_didi_pickup_confusion";
    }
    if (!flags.delayed_taobao_wrong_address_seen && state.turn >= 22 && flags.taobao_wrong_address_recovery_used) {
        return "delayed_taobao_wrong_address";
    }

    return null;
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
        id: "shared_flat_first_night",
        title: "Shared Flat First Night",
        route: "Housing",
        image: "/images/simulator/cg/cg_housing_shared_flat_first_night.png",
        hint: "Choose or struggle through a shared-flat housing path.",
        unlock: (flags) => flags.housing_choice === "Shared flat" || flags.decision_e2_housing === "Shared flat" || flags.housing_followup_done || flags.delayed_housing_compromise_seen
    },
    {
        id: "studio_rent_pressure",
        title: "Studio Rent Pressure",
        route: "Housing",
        image: "/images/simulator/cg/cg_studio_rent_pressure.png",
        hint: "Let housing costs become a real budget pressure.",
        unlock: (flags) => /studio/i.test(flags.housing_choice || flags.decision_e2_housing || "") || flags.housing_friction_debt || flags.housing_energy_scar
    },
    {
        id: "calendar_focus",
        title: "Calendar Warning",
        route: "Phone Layer",
        image: "/images/simulator/cg/cg_calendar_midterm_warning.png",
        hint: "Pin a deadline and let it pay off in a later week.",
        unlock: (flags) => flags.delayed_calendar_focus_seen || flags.calendar_midterm_prepped || flags.calendar_final_prepped
    },
    {
        id: "wechat_repair",
        title: "WeChat Repair",
        route: "Phone Layer",
        image: "/images/simulator/backgrounds/bg_phone_network_problem.jpg",
        hint: "Let message silence create distance, then repair it honestly.",
        unlock: (flags) => flags.wechat_repair_messages_sent || flags.delayed_wechat_silence_seen
    },
    {
        id: "didi_pickup",
        title: "DiDi Pickup Zone",
        route: "Phone Layer",
        image: "/images/simulator/cg/cg_didi_pickup_zone_confusion.png",
        hint: "Use DiDi without enough city setup and learn the pickup-zone lesson.",
        unlock: (flags) => flags.didi_pickup_points_saved || flags.delayed_didi_pickup_confusion_seen
    },
    {
        id: "taobao_address",
        title: "Taobao Address Repair",
        route: "Phone Layer",
        image: "/images/simulator/cg/cg_taobao_wrong_address.png",
        hint: "Use Taobao wrong-address recovery and fix the address template.",
        unlock: (flags) => flags.taobao_address_template_fixed || flags.delayed_taobao_wrong_address_seen
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
        id: "lin_plain_explanation",
        title: "Plain Explanation",
        route: "Academic",
        image: "/images/simulator/cg/cg_professor_lin_plain_explanation.png",
        hint: "Help Professor Lin turn a confused question into a clear explanation.",
        unlock: (flags) => flags.request_professor_lin_class_question
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
        id: "mei_field_notes",
        title: "Field Notes",
        route: "Academic",
        image: "/images/simulator/cg/cg_dr_mei_field_notes.png",
        hint: "Read Dr. Mei's messy notes for what they failed to notice.",
        unlock: (flags) => flags.request_dr_mei_field_notes
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
        id: "sophie_arrival_rescue",
        title: "Arrival Rescue",
        route: "International",
        image: "/images/simulator/cg/cg_sophie_arrival_rescue.png",
        hint: "Help Sophie talk a lost new student through arrival panic.",
        unlock: (flags) => flags.request_sophie_new_student || flags.sophie_arrival_helper
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
        id: "xiao_onboarding_test",
        title: "Onboarding Test",
        route: "Shanghai",
        image: "/images/simulator/cg/cg_xiao_chen_onboarding_test.png",
        hint: "Watch real students struggle with Xiao Chen's onboarding draft.",
        unlock: (flags) => flags.request_xiao_chen_onboarding || flags.xiao_chen_onboarding_clear
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
        id: "zhang_mock_interview",
        title: "Mock Interview",
        route: "Career",
        image: "/images/simulator/cg/cg_manager_zhang_mock_interview.png",
        hint: "Rewrite Manager Zhang's practice answer around evidence.",
        unlock: (flags) => flags.request_manager_zhang_answer || flags.manager_zhang_evidence_answer
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
        id: "wang_order_bridge",
        title: "Order Bridge",
        route: "Local",
        image: "/images/simulator/cg/cg_uncle_wang_order_bridge.png",
        hint: "Help a nervous student order without making them feel small.",
        unlock: (flags) => flags.request_uncle_wang_order_help || flags.uncle_wang_order_bridge
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
        id: "neighbor_parcel_crisis",
        title: "Parcel Crisis",
        route: "Local",
        image: "/images/simulator/cg/cg_neighbor_li_parcel_crisis.png",
        hint: "Help Neighbor Li make a hallway parcel problem normal again.",
        unlock: (flags) => flags.request_neighbor_li_parcel || flags.neighbor_li_parcel_mediator
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

const getMemoryUnlockSet = (flags = {}) => new Set(
    TITLE_GALLERY_ITEMS
      .filter(item => {
          try {
              return Boolean(item.unlock(flags));
          } catch (error) {
              return false;
          }
      })
      .map(item => item.title)
);

const getStatDeltas = (beforeState, afterState) => {
    const statLabels = {
        academics: "Academics",
        chinese: "Chinese",
        culture: "Culture",
        digitalProficiency: "Digital",
        energy: "Energy",
        wealth: "RMB"
    };

    return Object.entries(statLabels)
      .map(([key, label]) => {
          const beforeValue = beforeState?.stats?.[key] ?? 0;
          const afterValue = afterState?.stats?.[key] ?? 0;
          return { key, label, delta: afterValue - beforeValue, value: afterValue };
      })
      .filter(item => item.delta !== 0);
};

const getNetworkDelta = (beforeState, afterState) => {
    const beforeGuanxi = beforeState?.guanxi || {};
    const afterGuanxi = afterState?.guanxi || {};
    const guanxiDelta = Object.keys({ ...beforeGuanxi, ...afterGuanxi }).reduce((total, key) => {
        return total + ((afterGuanxi[key] || 0) - (beforeGuanxi[key] || 0));
    }, 0);

    const beforeRelationships = beforeState?.relationships || {};
    const afterRelationships = afterState?.relationships || {};
    const relationshipDelta = Object.keys({ ...beforeRelationships, ...afterRelationships }).reduce((total, character) => {
        return total + ((afterRelationships[character]?.friendship || 0) - (beforeRelationships[character]?.friendship || 0));
    }, 0);

    return { guanxiDelta, relationshipDelta };
};

const buildChoiceFeedbackToast = (beforeState, afterState, choice, nextNode) => {
    const statDeltas = getStatDeltas(beforeState, afterState);
    const { guanxiDelta, relationshipDelta } = getNetworkDelta(beforeState, afterState);
    const previousMemories = getMemoryUnlockSet(beforeState?.flags || {});
    const currentMemories = getMemoryUnlockSet(afterState?.flags || {});
    const newMemories = [...currentMemories].filter(title => !previousMemories.has(title));
    const beforeFlags = beforeState?.flags || {};
    const afterFlags = afterState?.flags || {};
    const changedFlags = Object.keys({ ...beforeFlags, ...afterFlags })
      .filter(flag => beforeFlags[flag] !== afterFlags[flag] && !/^last_life_check/.test(flag) && !/^life_check_/.test(flag));
    const lifeCheck = afterState?.lifeChecks?.last;
    const isFreshLifeCheck = choice?.effects?.lifeCheck && lifeCheck?.id === choice.effects.lifeCheck.id;
    const isEnding = /^ending_/.test(nextNode || "");

    const items = [
        ...statDeltas.slice(0, 4).map(item => ({
            label: item.label,
            value: `${item.delta > 0 ? "+" : ""}${item.delta}`,
            tone: item.delta > 0 ? "good" : "bad"
        }))
    ];

    if (guanxiDelta) {
        items.push({ label: "Guanxi", value: `${guanxiDelta > 0 ? "+" : ""}${guanxiDelta}`, tone: guanxiDelta > 0 ? "good" : "bad" });
    }
    if (relationshipDelta) {
        items.push({ label: "Bond", value: `${relationshipDelta > 0 ? "+" : ""}${relationshipDelta}`, tone: relationshipDelta > 0 ? "good" : "bad" });
    }
    if (newMemories.length > 0) {
        items.push({ label: "Memory", value: newMemories[0], tone: "memory" });
    }
    if (isFreshLifeCheck) {
        items.unshift({
            label: lifeCheck.success ? "Life Check Passed" : "Life Check Strained",
            value: `${lifeCheck.score}/${lifeCheck.dc}`,
            tone: lifeCheck.success ? "good" : "bad"
        });
    }
    if (items.length === 0 && changedFlags.length > 0) {
        items.push({ label: "Story", value: "Updated", tone: "memory" });
    }

    if (items.length === 0 && !isEnding) return null;

    return {
        title: isEnding
          ? "Ending Route Opened"
          : isFreshLifeCheck
            ? lifeCheck.label
            : newMemories.length > 0
              ? "Memory Unlocked"
              : "Choice Impact",
        body: isFreshLifeCheck
          ? lifeCheck.message
          : newMemories.length > 0
            ? newMemories.slice(0, 2).join(" / ")
            : choice?.text || "The choice has been applied.",
        tone: isEnding ? "ending" : isFreshLifeCheck && !lifeCheck.success ? "risk" : newMemories.length > 0 ? "memory" : "normal",
        items: items.slice(0, 5)
    };
};

const buildChoiceAudioFeedback = (beforeState, afterState, choice, nextNode) => {
    const sounds = [];
    const statDeltas = getStatDeltas(beforeState, afterState);
    const { guanxiDelta, relationshipDelta } = getNetworkDelta(beforeState, afterState);
    const flags = afterState?.flags || {};
    const previousMemories = getMemoryUnlockSet(beforeState?.flags || {});
    const currentMemories = getMemoryUnlockSet(flags);
    const unlockedMemory = [...currentMemories].some(title => !previousMemories.has(title));
    const lifeCheck = afterState?.lifeChecks?.last;
    const isFreshLifeCheck = choice?.effects?.lifeCheck && lifeCheck?.id === choice.effects.lifeCheck.id;

    if (flags.got_visa && !beforeState?.flags?.got_visa) sounds.push({ type: "stinger", id: "visaApproved" });
    if (flags.accepted_offer && !beforeState?.flags?.accepted_offer) sounds.push({ type: "sfx", id: "emailArrive" });
    if (unlockedMemory) sounds.push({ type: "stinger", id: "cgUnlock" });
    if (isFreshLifeCheck) sounds.push({ type: lifeCheck.success ? "stinger" : "sfx", id: lifeCheck.success ? "cgUnlock" : "deadlineWarning" });
    if (/^ending_/.test(nextNode || "")) {
        sounds.push({ type: "stinger", id: /out_of_money|quiet|probation|deportee|scare|shortcut|unreliable/i.test(nextNode) ? "badEnding" : "endingUnlock" });
    }
    if (statDeltas.some(item => item.key === "wealth" && item.delta > 0)) sounds.push({ type: "sfx", id: "moneyGain" });
    if (statDeltas.some(item => item.key === "wealth" && item.delta < 0)) sounds.push({ type: "sfx", id: "moneySpend" });
    if (statDeltas.some(item => item.key !== "wealth" && item.delta > 0)) sounds.push({ type: "sfx", id: "statUp" });
    if (statDeltas.some(item => item.key !== "wealth" && item.delta < 0)) sounds.push({ type: "sfx", id: "statDown" });
    if (guanxiDelta > 0 || relationshipDelta > 0) sounds.push({ type: "sfx", id: "relationshipUp" });

    const deduped = [];
    const seen = new Set();
    for (const sound of sounds) {
        const key = `${sound.type}:${sound.id}`;
        if (!seen.has(key)) {
            seen.add(key);
            deduped.push(sound);
        }
    }
    return deduped.slice(0, 4);
};

function ChoiceImpactToast({ toast }) {
    if (!toast) return null;

    const toneClass = {
        normal: "border-sky-300/35 bg-slate-950/90 text-sky-50",
        memory: "border-fuchsia-300/40 bg-fuchsia-950/85 text-fuchsia-50",
        risk: "border-rose-300/45 bg-rose-950/85 text-rose-50",
        ending: "border-amber-300/45 bg-amber-950/85 text-amber-50"
    }[toast.tone] || "border-sky-300/35 bg-slate-950/90 text-sky-50";

    const chipClass = (tone) => ({
        good: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
        bad: "border-rose-300/30 bg-rose-400/10 text-rose-100",
        memory: "border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-100"
    }[tone] || "border-slate-300/20 bg-slate-800/70 text-slate-100");

    return (
        <div className={`absolute right-4 top-16 z-[75] w-[min(22rem,calc(100%-2rem))] rounded-2xl border p-4 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl animate-in fade-in slide-in-from-right-4 duration-300 ${toneClass}`}>
            <div className="text-[10px] font-black uppercase tracking-[0.22em] opacity-70">Feedback</div>
            <div className="mt-1 text-sm font-black">{toast.title}</div>
            {toast.body && <p className="mt-1 line-clamp-2 text-xs leading-relaxed opacity-80">{toast.body}</p>}
            {toast.items?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {toast.items.map((item, index) => (
                        <span key={`${item.label}-${index}`} className={`rounded-lg border px-2 py-1 text-[10px] font-bold ${chipClass(item.tone)}`}>
                            {item.label}: {item.value}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function CoverScreen({ onStart }) {
    const [isStarting, setIsStarting] = useState(false);

    const triggerStart = async () => {
        if (isStarting) return;
        setIsStarting(true);
        await onStart();
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                triggerStart();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [triggerStart]);

    return (
        <div className={`relative flex h-full w-full items-end justify-center overflow-hidden bg-slate-950 text-white transition duration-700 ease-out ${isStarting ? "scale-[1.015] opacity-0" : "scale-100 opacity-100"}`}>
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/images/simulator/generated/sim_panda_cover_start.png")' }}
            ></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(15,23,42,0)_0%,rgba(15,23,42,0.18)_46%,rgba(2,6,23,0.84)_100%)]"></div>
            <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/45 to-transparent"></div>

            <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 pb-12 text-center sm:pb-16">
                <div className="mb-4 rounded-full border border-white/20 bg-slate-950/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-amber-100 shadow-2xl backdrop-blur-md">
                    Minghai University / Shanghai
                </div>
                <p className="max-w-2xl text-sm font-medium leading-7 text-slate-200 drop-shadow-lg sm:text-base">
                    A study-abroad visual novel life simulator about the choices before arrival, the city after landing, and the year that follows.
                </p>
                <button
                    onClick={triggerStart}
                    disabled={isStarting}
                    className="mt-7 min-w-56 rounded-full border border-amber-100/70 bg-amber-300 px-10 py-4 text-lg font-black uppercase tracking-[0.32em] text-slate-950 shadow-[0_20px_60px_rgba(251,191,36,0.35)] transition hover:-translate-y-0.5 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-wait disabled:opacity-80"
                >
                    {isStarting ? "Starting" : "Start"}
                </button>
            </div>
        </div>
    );
}

function TitleScreen({ mode, hasSave, savedFlags, titleMessage, audioEnabled, onNewGame, onLoadGame, onOpenGallery, onBack, onToggleAudio }) {
    const [selectedGalleryRoute, setSelectedGalleryRoute] = useState("All");
    const galleryMode = mode === "gallery";
    const galleryEntries = TITLE_GALLERY_ITEMS.map(item => ({
        ...item,
        unlocked: Boolean(item.unlock(savedFlags || {}))
    }));
    const unlockedCount = galleryEntries.filter(item => item.unlocked).length;
    const galleryRoutes = ["All", ...Array.from(new Set(galleryEntries.map(item => item.route)))];
    const visibleGalleryEntries = selectedGalleryRoute === "All"
        ? galleryEntries
        : galleryEntries.filter(item => item.route === selectedGalleryRoute);

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

                        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                            {galleryRoutes.map(route => (
                                <button
                                    key={route}
                                    onClick={() => setSelectedGalleryRoute(route)}
                                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${selectedGalleryRoute === route ? "border-white bg-white text-fuchsia-700" : "border-white/20 bg-white/10 text-fuchsia-50 hover:bg-white/20"}`}
                                >
                                    {route}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 grid min-h-0 flex-1 grid-cols-2 gap-4 overflow-y-auto pr-2 sm:grid-cols-3 lg:grid-cols-4">
                            {visibleGalleryEntries.map(item => (
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
  const [screenMode, setScreenMode] = useState("cover");
  const [titleMessage, setTitleMessage] = useState("");
  const [hasSave, setHasSave] = useState(false);
  const [savedFlags, setSavedFlags] = useState({});
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);
  const [restartConfirmOpen, setRestartConfirmOpen] = useState(false);
  const feedbackTimerRef = useRef(null);
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
    setFeedbackToast(null);
    setRestartConfirmOpen(false);
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
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

  const playChoiceAudioFeedback = (beforeState, afterState, choice, nextNode) => {
    if (!audioEnabled) return;
    const sounds = buildChoiceAudioFeedback(beforeState, afterState, choice, nextNode);
    sounds.forEach((sound, index) => {
      window.setTimeout(() => {
        if (sound.type === "stinger") {
          audioEngineRef.current?.playStinger(sound.id);
        } else {
          audioEngineRef.current?.playSfx(sound.id);
        }
      }, 90 + index * 140);
    });
  };

  const showChoiceFeedback = (beforeState, afterState, choice, nextNode) => {
    const toast = buildChoiceFeedbackToast(beforeState, afterState, choice, nextNode);
    if (!toast) return;
    setFeedbackToast(toast);
    if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedbackToast(null);
      feedbackTimerRef.current = null;
    }, 3200);
  };

  const showSystemFeedback = (title, body, tone = "normal") => {
    setFeedbackToast({ title, body, tone, items: [] });
    if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedbackToast(null);
      feedbackTimerRef.current = null;
    }, 2600);
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

  const handleStartFromCover = async () => {
    setTitleMessage("");
    const started = await enableAudio();
    if (started) {
      audioEngineRef.current?.playBgm("title", { fadeMs: 450 });
      audioEngineRef.current?.playSfx("uiConfirm");
    }
    refreshSaveStatus();
    window.setTimeout(() => {
      setScreenMode("title");
    }, started ? 620 : 280);
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
      if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
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
    const activeNodeId = beforeChoiceState.currentNodeId || "start";
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
    const stateAfterEffects = gameEngine.getState();
    const isCampusWeeklyAction = advancesWeek
      && stateAfterEffects.phase === "In-China"
      && (activeNodeId === "hub" || activeNodeId.startsWith("submenu_") || activeNodeId.startsWith("event_contact_") || activeNodeId.startsWith("event_request_") || activeNodeId.startsWith("event_academic_") || activeNodeId.startsWith("event_local_") || activeNodeId.startsWith("event_intl_") || activeNodeId.startsWith("event_career_") || activeNodeId.startsWith("event_city_") || activeNodeId.startsWith("event_admin_"));
    const inferredActionSlot = choice.actionSlot
      || (/weekend|travel|ktv|evening|bund|festival|dinner|stall|table|beach|west lake|opera|hotpot/i.test(choice.text || "") || /submenu_travel|submenu_entertainment/.test(activeNodeId) ? "weekend" : "auto");
    const weeklyActionResult = isCampusWeeklyAction ? gameEngine.spendWeeklyAction(inferredActionSlot) : null;
    const shouldAdvanceWeek = advancesWeek && (!isCampusWeeklyAction || weeklyActionResult?.weekComplete);

    if (shouldAdvanceWeek) {
        gameEngine.advanceTurn();
    }

    // Enforce Game Over and Epoch transitions
    const state = gameEngine.getState();
    if (state.stats.energy <= 0) nextNode = "forced_recovery_week";
    else if (state.stats.wealth <= 0) nextNode = state.flags.emergency_funding_used ? "game_over_wealth" : "money_crisis";
    else if (state.phase === "In-China" && state.flags.campus_rhythm_started && state.stats.academics <= 20 && !state.flags.academic_crisis_used) nextNode = "academic_crisis";
    else if (shouldAdvanceWeek && getDelayedConsequenceNode(state)) nextNode = getDelayedConsequenceNode(state);
    else if (state.turn === 8 && shouldAdvanceWeek) nextNode = "pre_departure_start";
    else if (state.turn === 16 && shouldAdvanceWeek) nextNode = "in_china_start";
    else if (state.turn === 24 && shouldAdvanceWeek) nextNode = "epoch3_midterm";
    else if (state.turn === 28 && shouldAdvanceWeek) nextNode = "epoch3_internship";
    else if (state.turn === 32 && shouldAdvanceWeek) nextNode = "epoch3_final";

    const afterChoiceState = cloneStateForSummary(state);
    showChoiceFeedback(beforeChoiceState, afterChoiceState, choice, nextNode);
    playChoiceAudioFeedback(beforeChoiceState, afterChoiceState, choice, nextNode);

    if (shouldAdvanceWeek) {
        setWeekTransition(buildWeekTransition(beforeChoiceState, cloneStateForSummary(state), nextNode));
        return;
    }

    // Slight delay for effect
    setTimeout(() => {
        gameEngine.setCurrentNode(nextNode);
    }, 150);
  };

  const handleDialogueChoice = (choice) => {
    playUiSound("uiConfirm");
    const beforeChoiceState = cloneStateForSummary(gameEngine.getState());
    events.applyChoiceEffects(choice);
    const afterChoiceState = cloneStateForSummary(gameEngine.getState());
    showChoiceFeedback(beforeChoiceState, afterChoiceState, choice, gameState.currentNodeId);
    playChoiceAudioFeedback(beforeChoiceState, afterChoiceState, choice, gameState.currentNodeId);
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
    showSystemFeedback("Game Saved", "Your local journey is stored on this device.", "memory");
  };

  const handleLoad = () => {
    playUiSound("load");
    if (gameEngine.load()) {
      setWeekTransition(null);
      setIsSceneFocusMode(false);
      setIsMenuOpen(false);
      refreshSaveStatus();
      showSystemFeedback("Game Loaded", "Your saved Minghai year is back on screen.", "memory");
    } else {
      setIsMenuOpen(false);
      showSystemFeedback("No Save Found", "Start a new journey before using quick load.", "risk");
    }
  };

  const handleRestart = () => {
    playUiSound("deadlineWarning");
    setIsMenuOpen(false);
    setRestartConfirmOpen(true);
  };

  const handleConfirmRestart = () => {
    playUiSound("deadlineWarning");
    gameEngine.reset();
    setWeekTransition(null);
    setIsSceneFocusMode(false);
    setIsMenuOpen(false);
    setRestartConfirmOpen(false);
    showSystemFeedback("Game Restarted", "A fresh application journey is ready.", "risk");
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

  useEffect(() => {
    if (!audioEnabled) return;
    const ambienceId = getSceneAmbienceId(gameState, currentNode, screenMode);
    if (ambienceId) {
      audioEngineRef.current?.playAmbience(ambienceId, { fadeMs: 900 });
    } else {
      audioEngineRef.current?.stopAmbience({ fadeMs: 450 });
    }
  }, [audioEnabled, screenMode, gameState.phase, gameState.turn, gameState.currentNodeId]);

  if (screenMode === "cover") {
    return <CoverScreen onStart={handleStartFromCover} />;
  }

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

        {!isSceneFocusMode && <ChoiceImpactToast toast={feedbackToast} />}

        {!isSceneFocusMode && restartConfirmOpen && (
          <div className="absolute inset-0 z-[92] flex items-center justify-center bg-slate-950/70 px-6 backdrop-blur-md">
            <div className="w-full max-w-md rounded-2xl border border-rose-300/35 bg-slate-950/95 p-6 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
              <div className="text-[10px] font-black uppercase tracking-[0.28em] text-rose-200">Restart Game</div>
              <h2 className="mt-3 text-2xl font-black text-white">Start over?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Unsaved progress in this run will be lost. Your existing quick save stays available unless you save again later.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    playUiSound("uiBack");
                    setRestartConfirmOpen(false);
                  }}
                  className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-bold text-slate-100 transition hover:border-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRestart}
                  className="rounded-xl border border-rose-200/30 bg-rose-500 px-4 py-2 text-sm font-black text-white shadow-[0_12px_30px_rgba(244,63,94,0.25)] transition hover:bg-rose-400"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}

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
          onDialogueChoice={handleDialogueChoice}
          onTextTick={audioEnabled ? () => audioEngineRef.current?.typeTick() : null}
          availableChoices={events.getAvailableChoices(currentNodeId)}
          availableDialogueChoices={events.getAvailableDialogueChoices(currentNodeId)}
        />}
      </div>
    </div>
  );
}
