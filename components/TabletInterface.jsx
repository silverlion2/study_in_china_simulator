"use client";

import React, { useState } from 'react';
import Dashboard from './Dashboard';

export default function TabletInterface({ state, onClose }) {
  const { stats, guanxi, turn, phase, flags } = state;
  const [activeTab, setActiveTab] = useState('Map');

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-300" onClick={onClose}>
        <div 
           className="relative w-full max-w-3xl h-[85vh] bg-slate-900 border-[12px] border-slate-950 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
           onClick={e => e.stopPropagation()}
        >
            {/* iPad Notch / Camera */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 tracking-widest text-[#111] leading-none select-none z-20 pt-1">
                ⚫
            </div>

            {/* SimOS Header */}
            <div className="w-full bg-slate-950 text-slate-400 text-xs px-6 py-2 flex justify-between font-mono z-10 shrink-0">
               <span>SimOS v1.0.4</span>
               <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
               <span>📶 5G  🔋 100%</span>
            </div>

            {/* Tab Navigation */}
            <div className="w-full bg-slate-800 border-b border-slate-700 flex p-2 shrink-0 justify-center gap-4 shadow-sm">
                <button 
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'Map' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Map')}
                >
                  🗺️ Story Tracking
                </button>
                <button 
                  className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === 'Stats' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Stats')}
                >
                  📊 My Stats 
                </button>
            </div>

            {/* Tablet Content */}
            <div className="p-8 pb-12 flex-1 overflow-y-auto w-full">
                {activeTab === 'Stats' && (
                    <div className="max-w-xl mx-auto border border-slate-800 bg-slate-900/50 p-6 rounded-2xl shadow-xl">
                       <Dashboard state={state} />
                    </div>
                )}
                
                {activeTab === 'Map' && (
                    <div className="max-w-xl mx-auto space-y-8 relative">
                        {/* Visual Timeline Path */}
                        <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-700 rounded-full z-0"></div>

                        <TimelineNode 
                            title="Epoch 1: Application (Weeks 1-8)" 
                            active={turn <= 8} 
                            completed={turn > 8}
                            desc="Did you secure the scholarship and acceptance?"
                        >
                            <DecisionFlag label="Preparation Strategy" value={flags.decision_e1_start} />
                            <DecisionFlag label="Study Plan" value={flags.decision_e1_plan} />
                            <DecisionFlag label="Medical Examination" value={flags.decision_e1_med} />
                            <DecisionFlag label="Language Proof" value={flags.decision_e1_hsk} />
                            <DecisionFlag label="Application Submission" value={flags.decision_e1_submit} />
                            {flags.completed_application && <p className="text-emerald-400 text-sm font-semibold mt-2">✅ Application Submitted Successfully</p>}
                        </TimelineNode>

                        <TimelineNode 
                            title="Epoch 2: Pre-Departure (Weeks 9-16)" 
                            active={turn > 8 && turn <= 16} 
                            completed={turn > 16}
                            desc="Bureaucracy, logistics, and digital adaptation."
                        >
                            <DecisionFlag label="Visa Interview" value={flags.decision_e2_visa} />
                            <DecisionFlag label="Flight Routing" value={flags.decision_e2_flight} />
                            <DecisionFlag label="Digital Readiness" value={flags.decision_e2_wechat} />
                            <DecisionFlag label="Luggage Priority" value={flags.decision_e2_pack} />
                            {flags.got_visa && <p className="text-emerald-400 text-sm font-semibold mt-2">✅ X1 Visa Secured</p>}
                        </TimelineNode>

                        <TimelineNode 
                            title="Epoch 3: In-China (Weeks 17-32)" 
                            active={turn > 16 && turn <= 32} 
                            completed={turn > 32}
                            desc="The reality of living and studying abroad."
                        >
                            {flags.arrived_in_china && <p className="text-emerald-400 text-sm font-semibold mb-2">🛬 Arrived in China</p>}
                            <DecisionFlag label="Airport Transport" value={flags.decision_e3_transport} />
                            <DecisionFlag label="Dorm Setup" value={flags.decision_e3_taobao} />
                            <DecisionFlag label="Midterm Focus" value={flags.decision_e3_midterm} />
                            <DecisionFlag label="Career Direction" value={flags.decision_e3_internship} />
                            <div className="mt-4 text-sky-400 text-sm font-semibold">
                                {turn < 32 ? "⏳ Story unfolding..." : "🎓 Ready for Final Evaluation"}
                            </div>
                        </TimelineNode>
                    </div>
                )}
            </div>

            {/* Home Button area */}
            <div className="w-full h-8 bg-slate-950 flex justify-center items-start pt-2 shrink-0">
               <div className="w-32 h-1.5 bg-slate-500 rounded-full cursor-pointer hover:bg-slate-300 transition-colors" onClick={onClose} title="Swipe up to close"></div>
            </div>
        </div>
    </div>
  );
}

function TimelineNode({ title, desc, active, completed, children }) {
    let dotColor = "bg-slate-700 border-slate-900";
    let textColor = "text-slate-500";
    if (completed) {
        dotColor = "bg-emerald-500 border-slate-900";
        textColor = "text-slate-300";
    } else if (active) {
        dotColor = "bg-sky-400 border-sky-900 shadow-[0_0_15px_rgba(56,189,248,0.5)]";
        textColor = "text-white";
    }

    return (
        <div className="pl-16 relative">
            <div className={`absolute left-[1.125rem] top-1.5 w-5 h-5 rounded-full border-[5px] z-10 transition-all ${dotColor}`}></div>
            <div className={`text-lg font-bold ${active ? 'text-sky-400' : (completed ? 'text-emerald-400' : 'text-slate-500')} mb-1`}>
                {title}
            </div>
            <p className={`${textColor} text-sm mb-3`}>{desc}</p>
            <div className="bg-slate-800/80 p-4 rounded-xl flex flex-col gap-2 border border-slate-700/50 shadow-inner">
                {children}
            </div>
        </div>
    );
}

function DecisionFlag({ label, value }) {
    if (!value) {
        return (
            <div className="flex justify-between items-center text-xs opacity-50">
                <span className="text-slate-500">{label}:</span>
                <span className="text-slate-600 font-mono italic">Pending...</span>
            </div>
        );
    }
    return (
        <div className="flex justify-between items-center text-sm bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
            <span className="text-slate-400">{label}:</span>
            <span className="text-sky-300 font-medium">{value}</span>
        </div>
    );
}
