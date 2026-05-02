"use client";

import React from 'react';

export default function QuestTracker({ state }) {
    let questTitle = "Explore the Campus";
    let questDesc = "No urgent deadlines right now.";
    const flags = state.flags || {};
    const currentNodeId = state.currentNodeId || "";

    if (currentNodeId === "epoch3_midterm") {
        questTitle = "Prepare for Midterms";
        questDesc = "Choose the support plan that fits your route before Week 24 resolves.";
    } else if (state.phase === "Application" && !flags.decision_e1_start) {
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
        questTitle = "Use SimPad Housing";
        questDesc = "Open SimPad > Housing, compare the options, and confirm where you will live.";
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
    } else if (state.phase === "In-China" && flags.airport_didi_required) {
        questTitle = "Use SimPad DiDi";
        questDesc = "Open SimPad > DiDi and request Airport Transfer Practice to leave Pudong.";
    } else if (state.phase === "In-China" && flags.taobao_simpad_required) {
        questTitle = "Use SimPad Taobao";
        questDesc = "Open SimPad > Taobao and buy Dorm Bedding Set or Desk Lamp Kit to finish your first dorm setup lesson.";
    } else if (state.phase === "In-China" && flags.calendar_simpad_required) {
        questTitle = "Use SimPad Calendar";
        questDesc = "Open SimPad > Calendar and pin one deadline so residence-permit pressure becomes trackable.";
    } else if (state.phase === "In-China" && flags.wechat_simpad_required) {
        questTitle = "Use SimPad WeChat";
        questDesc = "Open SimPad > WeChat and send one check-in to a confirmed Minghai contact.";
    } else if (state.phase === "In-China" && !flags.arrived_in_china) {
        questTitle = flags.airport_didi_required ? "Use SimPad DiDi" : "Arrive at Minghai";
        questDesc = flags.airport_didi_required
            ? "Open SimPad > DiDi and request Airport Transfer Practice to leave Pudong."
            : "Get from Pudong to campus, eat your first meal, and set up the dorm.";
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
        questDesc = "Meet the route contacts, then choose whether your early Minghai life leans academic, local, international, career, or city-focused.";
    } else if (state.phase === "In-China" && flags.campus_rhythm_started && !flags.core_cast_introduced) {
        questTitle = "Confirm Route Contacts";
        questDesc = "Catch up with Dr. Mei, Manager Zhang, and Uncle Wang before weekly freedom opens.";
    } else if (state.phase === "In-China" && state.turn < 24) {
        questTitle = "Plan This Week";
        questDesc = "Spend 3 weekday actions and 1 weekend action. Pick study, people, city life, or recovery.";
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
}
