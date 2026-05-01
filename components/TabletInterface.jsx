"use client";

import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { gameEngine } from '../engine/GameState';

export default function TabletInterface({ state, onClose, onReplayGame, onPlayGig }) {
  const { stats, guanxi, turn, phase, flags } = state;
  const initialTab = flags.airport_didi_required ? 'DiDi' : (flags.housing_simpad_required || state.currentNodeId === "e2_w12_housing" ? 'Housing' : 'Story');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedGalleryRoute, setSelectedGalleryRoute] = useState('All');
  const [utilityMessage, setUtilityMessage] = useState("");
  const housingChoice = flags.housing_choice || flags.decision_e2_housing || "";
  const originLabel = flags.origin_asian ? "Neighboring Asia" : flags.origin_western ? "Western background" : flags.origin_developing ? "Global South" : null;
  const identityLabel = flags.gender_male ? "Male" : flags.gender_female ? "Female" : flags.gender_nonbinary ? "Non-binary / another identity" : null;
  const majorLabel = flags.major_business ? "Business and Management" : flags.major_stem ? "Engineering and Computing" : flags.major_humanities ? "Humanities and China Studies" : null;
  const fundingLabel = flags.finance_scholarship ? "Scholarship-funded" : flags.finance_rich ? "Family support budget" : flags.finance_working ? "Budget planner" : null;
  const backgroundLabel = flags.background_label || (flags.background_scholarship_student ? "Scholarship student" : flags.background_family_funded ? "Family-funded student" : flags.background_working_budget ? "Working-class budget route" : flags.background_heritage_learner ? "Heritage learner" : flags.background_total_beginner ? "Total beginner" : null);
  const applicationStatus = flags.accepted_offer ? "Offer accepted" : flags.completed_application ? "Submitted, awaiting result" : flags.target_minghai ? "Minghai selected" : flags.decision_e1_start ? "Application shaping" : "Departure eve";
  const routeLabels = [
    flags.route_academic && "Academic",
    flags.route_local && "Local Integration",
    flags.route_intl && "International Circle",
    flags.route_career && "Career Bridge",
    flags.route_city && "Shanghai Opportunity"
  ].filter(Boolean).join(" / ");
  const relationshipTensionLabel = [
    flags.lin_feedback_repaired && "Lin feedback repaired",
    flags.lin_feedback_avoided && "Lin feedback avoided",
    flags.dr_mei_ethics_reframed && "Dr. Mei ethics reframed",
    flags.dr_mei_efficiency_choice && "Dr. Mei efficiency choice",
    flags.neighbor_li_boundary_repaired && "Neighbor Li boundary repaired",
    flags.neighbor_li_boundary_avoided && "Neighbor Li boundary avoided",
    flags.uncle_wang_honest_answer && "Uncle Wang honest answer",
    flags.uncle_wang_polite_answer && "Uncle Wang polite answer",
    flags.sophie_bridge_plan && "Sophie bridge plan",
    flags.sophie_safe_bubble_choice && "Sophie safe bubble",
    flags.manager_zhang_boundaries_accepted && "Manager Zhang boundaries accepted",
    flags.career_shortcut_temptation && "Career shortcut temptation",
    flags.career_shortcut_repaired && "Career shortcut repaired",
    flags.xiao_chen_responsible_pace && "Xiao Chen responsible pace",
    flags.city_speed_over_care && "Shanghai speed over care",
    flags.city_reliability_debt && "Prototype reliability debt",
    flags.city_reliability_repaired && "Prototype reliability repaired"
  ].filter(Boolean).join(" / ");
  const routeMemoryLabel = [
    flags.contact_professor_lin_talk_1 && "Professor Lin honest office hour",
    flags.contact_dr_mei_talk_1 && "Dr. Mei research coffee",
    flags.contact_sophie_talk_1 && "Sophie private check-in",
    flags.contact_xiao_chen_talk_1 && "Xiao Chen market walk",
    flags.contact_neighbor_li_talk_1 && "Neighbor Li dorm map",
    flags.contact_manager_zhang_talk_1 && "Manager Zhang career chat",
    flags.contact_uncle_wang_talk_1 && "Uncle Wang quiet-stall talk",
    flags.request_professor_lin_class_question && "Professor Lin class-question request",
    flags.request_dr_mei_field_notes && "Dr. Mei field-note request",
    flags.request_sophie_new_student && "Sophie arrival-support request",
    flags.request_xiao_chen_onboarding && "Xiao Chen onboarding request",
    flags.request_neighbor_li_parcel && "Neighbor Li parcel request",
    flags.request_manager_zhang_answer && "Manager Zhang interview-answer request",
    flags.request_uncle_wang_order_help && "Uncle Wang order-help request",
    flags.academic_empty_lecture && "Almost-empty Friday lecture",
    flags.local_rain_gate && "Rainy dorm gate help",
    flags.intl_common_room_meal && "Common-room comfort meal",
    flags.career_mock_interview && "Brutally useful mock interview",
    flags.city_qr_complaint_night && "Broken QR complaint night"
  ].filter(Boolean).join(" / ");
  const riskStatusLabel = [
    flags.unapproved_work_risk && "Unapproved work risk active",
    flags.compliance_cleanup_done && "Compliance cleanup completed",
    flags.career_shortcut_temptation && "Career shortcut risk active",
    flags.career_shortcut_repaired && "Career shortcut repaired",
    flags.city_reliability_debt && "Prototype reliability debt active",
    flags.city_reliability_repaired && "Prototype reliability repaired"
  ].filter(Boolean).join(" / ");
  const adaptationLabel = [
    flags.adaptation_novelty && "Fresh arrival",
    flags.adaptation_information_overload && "Information overload",
    flags.adaptation_language_anxiety && "Language anxiety",
    flags.adaptation_first_independent_solution && "First independent solution",
    flags.adaptation_life_rhythm && "Life rhythm forming"
  ].filter(Boolean).join(" / ");
  const calendarItems = getCalendarItems(state);
  const memoryEntries = getMemoryEntries(flags);
  const unlockedMemoryCount = memoryEntries.filter(memory => isMemoryUnlocked(memory, flags)).length;
  const galleryRoutes = ["All", ...Array.from(new Set(memoryEntries.map(memory => memory.route)))];
  const visibleMemoryEntries = selectedGalleryRoute === "All"
    ? memoryEntries
    : memoryEntries.filter(memory => memory.route === selectedGalleryRoute);
  const characterArcs = getCharacterArcProgress(state);
  const priorityMessages = getWeChatPriorityMessages(state);
  const routePlayPanels = getRoutePlayPanels(state);

  const launchStoryNode = (nodeId, cost = 0, statEffects = {}) => {
    if (cost > 0 && stats.wealth < cost) return;
    const effects = { ...statEffects };
    if (cost > 0) effects.wealth = -cost;
    if (Object.keys(effects).length > 0) gameEngine.updateStats(effects);
    gameEngine.setCurrentNode(nodeId);
    onClose();
  };

  const handleTaobaoService = (orderId) => {
    const result = gameEngine.useTaobaoServiceOrder(orderId);
    setUtilityMessage(result.message);
  };

  const handleHousingChoice = (housing) => {
    if (phase === "Application") {
      setUtilityMessage("Housing opens once Minghai starts sending real pre-departure paperwork.");
      return;
    }
    if (stats.wealth < housing.deposit) {
      setUtilityMessage(`You need at least RMB ${housing.deposit.toLocaleString()} to choose ${housing.title}.`);
      return;
    }
    if (housing.deposit > 0) {
      gameEngine.addTransaction(-housing.deposit, `Housing deposit: ${housing.title}`);
    }
    gameEngine.updateStats(housing.stats || {});
    const housingFlags = {
      campus_dorm: {
        decision: "Minghai Dorm via SimPad Housing",
        flags: { dorm_double: true, dorm_single: false, dorm_pending: false }
      },
      shared_flat: {
        decision: "Shared Flat via SimPad Housing",
        flags: { shared_flat_selected: true, dorm_pending: false, housing_city_commute: true }
      },
      studio: {
        decision: "Small Studio via SimPad Housing",
        flags: { studio_selected: true, dorm_pending: false, housing_rent_pressure: true }
      }
    };
    const selection = housingFlags[housing.id] || { decision: housing.title, flags: {} };
    gameEngine.setFlag("has_housing", true);
    gameEngine.setFlag("housing_choice", housing.title);
    gameEngine.setFlag("decision_e2_housing", selection.decision);
    gameEngine.setFlag("housing_sorted", true);
    gameEngine.setFlag("housing_simpad_selected", true);
    gameEngine.setFlag("housing_simpad_required", false);
    gameEngine.setFlag("housing_rent_weekly", housing.weeklyRent);
    gameEngine.setFlag("housing_commute", housing.commute);
    Object.entries(selection.flags).forEach(([flag, value]) => gameEngine.setFlag(flag, value));
    if (state.currentNodeId === "e2_w12_housing" || flags.housing_simpad_required) {
      gameEngine.setCurrentNode("e2_w12_roommate_intro");
      setUtilityMessage(`${housing.title} selected. Housing is confirmed; returning to the story.`);
      onClose();
      return;
    }
    setUtilityMessage(`${housing.title} selected. Your Shanghai life now has an address.`);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-300" onClick={onClose}>
        <div
           className="relative w-full max-w-2xl h-[75vh] bg-slate-900 border-[8px] border-slate-950 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300"
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
            <div className="w-full bg-slate-800 border-b border-slate-700 flex flex-wrap p-1.5 shrink-0 justify-start gap-1 shadow-sm">
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Story' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Story')}
                >🗺️ Story</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Calendar' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Calendar')}
                >📅 Calendar</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Map' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Map')}
                >📍 Shanghai Map</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Housing' ? 'bg-lime-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Housing')}
                >Housing</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Stats' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Stats')}
                >📊 Stats</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Wallet' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Wallet')}
                >💳 Alipay</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'DiDi' ? 'bg-yellow-500 text-slate-950 shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('DiDi')}
                >🚕 DiDi</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Jobs' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Jobs')}
                >💼 Jobs</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Taobao' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Taobao')}
                >🛒 Taobao</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Arcade' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Arcade')}
                >🕹️ Arcade</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Gallery' ? 'bg-fuchsia-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Gallery')}
                >🖼️ Gallery</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'Souvenirs' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Souvenirs')}
                >🧲 Souvenirs</button>
                <button
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activeTab === 'WeChat' ? 'bg-[#1AAD19] text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('WeChat')}
                >💬 WeChat</button>
            </div>

            {/* Tablet Content */}
            <div className="p-5 pb-8 flex-1 overflow-y-auto w-full">
                {activeTab === 'Stats' && (
                    <div className="max-w-xl mx-auto border border-slate-800 bg-slate-900/50 p-4 rounded-xl shadow-xl">
                       <Dashboard state={state} />
                    </div>
                )}

                {activeTab === 'Story' && (
                    <div className="max-w-xl mx-auto space-y-6 relative">
                        {/* Visual Timeline Path */}
                        <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-700 rounded-full z-0"></div>

                        <TimelineNode
                            title="Epoch 1: Departure Eve & Application"
                            active={phase === "Application"}
                            completed={phase !== "Application"}
                            desc="From the night before departure back through the choices that made Minghai University real."
                        >
                            <DecisionFlag label="Status" value={applicationStatus} />
                            <DecisionFlag label="Motivation" value={flags.decision_e1_start} />
                            <DecisionFlag label="Starting Point" value={originLabel} />
                            <DecisionFlag label="Identity" value={identityLabel} />
                            <DecisionFlag label="Opening Background" value={backgroundLabel} />
                            <DecisionFlag label="Chinese Foundation" value={flags.decision_e1_hsk} />
                            <DecisionFlag label="Major Track" value={majorLabel} />
                            <DecisionFlag label="Statement" value={flags.decision_e1_plan} />
                            <DecisionFlag label="Funding Plan" value={fundingLabel} />
                            <DecisionFlag label="Medical Form" value={flags.decision_e1_med} />
                            <DecisionFlag label="Submission" value={flags.decision_e1_submit} />
                            {flags.accepted_offer && <p className="text-emerald-400 text-sm font-semibold mt-2">✅ Minghai University Offer Accepted</p>}
                            {!flags.accepted_offer && flags.completed_application && <p className="text-sky-400 text-sm font-semibold mt-2">📨 Application Submitted to Minghai</p>}
                        </TimelineNode>

                        <TimelineNode
                            title="Epoch 2: Pre-Departure (Weeks 9-16)"
                            active={phase === "Pre-Departure"}
                            completed={phase === "In-China" || turn > 16}
                            desc="Admission package, X1 visa, digital setup, housing, flights, packing, and the emotional work of actually leaving."
                        >
                            <DecisionFlag label="Admission Package" value={flags.decision_e2_package} />
                            <DecisionFlag label="X1 Visa" value={flags.decision_e2_visa} />
                            <DecisionFlag label="Digital Access" value={flags.decision_e2_vpn} />
                            <DecisionFlag label="Digital Setup" value={flags.decision_e2_wechat} />
                            <DecisionFlag label="Housing" value={flags.decision_e2_housing} />
                            <DecisionFlag label="Flight Routing" value={flags.decision_e2_flight} />
                            <DecisionFlag label="Arrival Transport" value={flags.airport_transfer_plan} />
                            <DecisionFlag label="Semester Setup" value={flags.semester_plan} />
                            <DecisionFlag label="Luggage Priority" value={flags.decision_e2_pack} />
                            <DecisionFlag label="Farewell" value={flags.decision_e2_farewell} />
                            {flags.got_visa && <p className="text-emerald-400 text-sm font-semibold mt-2">✅ X1 Visa Secured</p>}
                            {flags.departed_for_shanghai && <p className="text-sky-400 text-sm font-semibold mt-2">✈️ Boarded for Shanghai</p>}
                        </TimelineNode>

                        <TimelineNode
                            title="Epoch 3: In-China (Weeks 17-32)"
                            active={phase === "In-China" && turn <= 32}
                            completed={turn > 32}
                            desc="Arrival at Minghai, first classes, campus relationships, route direction, and the year-end review."
                        >
                            {flags.arrived_in_china && <p className="text-emerald-400 text-sm font-semibold mb-2">🛬 Arrived in China</p>}
                            <DecisionFlag label="Airport Transport" value={flags.decision_e3_transport} />
                            <DecisionFlag label="First Meal" value={flags.decision_e3_food} />
                            <DecisionFlag label="Dorm Setup" value={flags.decision_e3_taobao} />
                            <DecisionFlag label="Registration" value={flags.decision_e3_registration} />
                            <DecisionFlag label="First Class" value={flags.decision_e3_first_class} />
                            <DecisionFlag label="Major Lens" value={flags.major_identity_confirmed} />
                            <DecisionFlag label="Social Circle" value={flags.decision_e3_social_circle} />
                            <DecisionFlag label="Life Rhythm" value={flags.decision_e3_rhythm} />
                            <DecisionFlag label="Route Bias" value={routeLabels} />
                            <DecisionFlag label="Route Commitment" value={flags.route_commitment_label} />
                            <DecisionFlag label="Weekly Focus" value={flags.weekly_focus} />
                            <DecisionFlag label="Adaptation Curve" value={adaptationLabel} />
                            <DecisionFlag label="Route Memory" value={routeMemoryLabel} />
                            <DecisionFlag label="Relationship Tension" value={relationshipTensionLabel} />
                            <DecisionFlag label="Risk Status" value={riskStatusLabel} />
                            <DecisionFlag label="Midterm Focus" value={flags.decision_e3_midterm} />
                            <DecisionFlag label="Future Direction" value={flags.decision_e3_internship} />
                            <DecisionFlag label="Year-End Reflection" value={flags.decision_e3_final} />
                            <div className="mt-4 text-sky-400 text-sm font-semibold">
                                {turn < 32 ? "⏳ Story unfolding..." : "🎓 Ready for Final Evaluation"}
                            </div>
                        </TimelineNode>

                        <div className="relative z-10 rounded-2xl border border-violet-400/25 bg-slate-950/80 p-4 shadow-xl">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.18em] text-violet-200">Character Arcs</h3>
                                    <p className="mt-1 text-xs leading-relaxed text-slate-400">Each core character now has a visible chain: first contact, trust, conflict, and commitment.</p>
                                </div>
                                <div className="rounded-xl bg-violet-400/15 px-3 py-2 text-right font-mono text-xs text-violet-100">
                                    {characterArcs.filter(arc => arc.completedStages >= 4).length}/{characterArcs.length}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {characterArcs.map(arc => (
                                    <CharacterArcCard key={arc.name} arc={arc} />
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 rounded-2xl border border-cyan-400/25 bg-slate-950/80 p-4 shadow-xl">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200">Route Projects</h3>
                                    <p className="mt-1 text-xs leading-relaxed text-slate-400">Each life route now has a concrete project you are building, not only a score.</p>
                                </div>
                                <div className="rounded-xl bg-cyan-400/15 px-3 py-2 text-right font-mono text-xs text-cyan-100">
                                    {routePlayPanels.filter(panel => panel.completedSteps >= 3).length}/{routePlayPanels.length}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {routePlayPanels.map(panel => (
                                    <RouteProjectCard key={panel.id} panel={panel} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Calendar' && (
                    <div className="max-w-xl mx-auto space-y-4">
                        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/15 p-5 shadow-xl">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-cyan-200">Semester Calendar</h2>
                                    <p className="mt-1 text-xs leading-relaxed text-cyan-100/80">Deadlines, pressure points, and useful prep. This is the part of studying abroad that turns hopes into a schedule.</p>
                                </div>
                                <div className="rounded-2xl bg-cyan-300/20 px-3 py-2 text-center font-mono text-cyan-100">
                                    <div className="text-[10px] uppercase tracking-widest">Week</div>
                                    <div className="text-2xl font-black">{turn}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {calendarItems.map((item) => (
                                <CalendarCard
                                    key={item.id}
                                    item={item}
                                    onPin={() => {
                                        const result = gameEngine.pinCalendarFocus(item.title);
                                        setUtilityMessage(result.message);
                                    }}
                                    pinned={flags.calendar_focus === item.title}
                                />
                            ))}
                        </div>

                        {utilityMessage && (
                            <div className="rounded-xl border border-cyan-400/30 bg-slate-950/80 p-3 text-xs text-cyan-100">{utilityMessage}</div>
                        )}
                    </div>
                )}

                {activeTab === 'Map' && (
                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="rounded-2xl border border-sky-400/30 bg-sky-500/15 p-5 shadow-xl">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-sky-100">Shanghai Map</h2>
                                    <p className="mt-1 text-xs leading-relaxed text-sky-100/75">One city for now: campus, housing, daily errands, and the places that can turn a normal week into a story.</p>
                                </div>
                                <div className="rounded-xl bg-slate-950/60 px-3 py-2 text-right font-mono text-xs text-sky-100">
                                    <div className="uppercase tracking-[0.2em] text-sky-300">Current</div>
                                    <div className="font-black">{state.location === "Home Country" ? "Pre-arrival" : state.location}</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-sky-900/60 bg-slate-950 shadow-2xl">
                            <img src="/images/simulator/backgrounds/bg_shanghai_bund_evening.jpg" alt="Shanghai evening map" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.72))]"></div>
                            <div className="absolute left-[12%] right-[12%] top-1/2 h-0.5 bg-cyan-300/50"></div>
                            <div className="absolute left-[26%] top-[16%] h-[66%] w-0.5 bg-amber-200/40"></div>
                            <div className="absolute left-[50%] top-[18%] h-[64%] w-0.5 rotate-12 bg-lime-200/30"></div>
                            <ShanghaiPin name="Minghai Campus" top="58%" left="27%" active />
                            <ShanghaiPin name="Dorm Office" top="72%" left="24%" />
                            <ShanghaiPin name="Rental Street" top="44%" left="42%" />
                            <ShanghaiPin name="The Bund" top="38%" left="65%" />
                            <ShanghaiPin name="Lujiazui" top="32%" left="74%" />
                            <ShanghaiPin name="Fuxing Park" top="56%" left="57%" />
                            <ShanghaiPin name="Pudong Airport" top="80%" left="84%" />
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <MapDestinationCard
                                title="Minghai Campus"
                                meta="Classes, registration, dorm life"
                                desc="Keep the core loop grounded in one school instead of scattering attention across China."
                                disabled={phase !== "In-China"}
                                onSelect={() => {
                                    gameEngine.setLocation("Shanghai");
                                    setUtilityMessage("Pinned Minghai Campus as your current Shanghai base.");
                                }}
                            />
                            <MapDestinationCard
                                title="Rental Street"
                                meta="Housing pressure"
                                desc="Open Housing to choose where this year actually sleeps."
                                disabled={phase === "Application"}
                                onSelect={() => setActiveTab("Housing")}
                            />
                            <MapDestinationCard
                                title="The Bund Evening Walk"
                                meta="RMB 80 / reflection"
                                desc="A city scene for awe, loneliness, and the first time Shanghai feels less abstract."
                                disabled={phase !== "In-China" || stats.wealth < 80}
                                onSelect={() => launchStoryNode('event_sh_bund_walk', 80, { energy: -2, culture: 2 })}
                            />
                            <MapDestinationCard
                                title="Lujiazui Fintech Talk"
                                meta="RMB 100 / opportunity"
                                desc="A practical route into internships, payments, and the speed of Shanghai work culture."
                                disabled={phase !== "In-China" || stats.wealth < 100}
                                onSelect={() => launchStoryNode('event_sh_lujiazui_mixer', 100, { energy: -3, digitalProficiency: 2 })}
                            />
                        </div>
                        {utilityMessage && (
                            <div className="rounded-xl border border-sky-400/30 bg-slate-950/80 p-3 text-xs text-sky-100">{utilityMessage}</div>
                        )}
                    </div>
                )}

                {activeTab === 'Housing' && (
                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="rounded-2xl border border-lime-400/30 bg-lime-500/15 p-5 shadow-xl">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-lime-100">Shanghai Housing</h2>
                                    <p className="mt-1 text-xs leading-relaxed text-lime-100/75">A small first version: pick one living situation. Later events can remember this address, commute, privacy, and rent pressure.</p>
                                </div>
                                <div className="rounded-xl bg-slate-950/60 px-3 py-2 text-right text-xs">
                                    <div className="font-mono uppercase tracking-[0.2em] text-lime-300">Current</div>
                                    <div className="font-black text-lime-50">{housingChoice || "Unchosen"}</div>
                                </div>
                            </div>
                        </div>

                        {phase === "Application" && (
                            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                                Housing unlocks after the application turns into real pre-departure logistics.
                            </div>
                        )}
                        {flags.housing_simpad_required && (
                            <div className="rounded-xl border border-lime-300/40 bg-lime-400/10 p-4 text-sm text-lime-100">
                                Required story task: choose one housing option here to continue Week 12.
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {getHousingOptions().map((option) => (
                                <HousingOptionCard
                                    key={option.id}
                                    option={option}
                                    selected={housingChoice === option.title}
                                    disabled={phase === "Application" || stats.wealth < option.deposit}
                                    onSelect={() => handleHousingChoice(option)}
                                />
                            ))}
                        </div>

                        <div className="rounded-2xl border border-lime-400/20 bg-slate-950/70 p-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">What this unlocks</h3>
                            <div className="mt-3 grid grid-cols-1 gap-3 text-xs text-slate-300 sm:grid-cols-3">
                                <div className="rounded-xl bg-slate-900/80 p-3">Rent pressure can become a monthly tradeoff instead of abstract wealth loss.</div>
                                <div className="rounded-xl bg-slate-900/80 p-3">Commute can affect energy, punctuality, and whether late-night city scenes are tempting.</div>
                                <div className="rounded-xl bg-slate-900/80 p-3">Roommates and dorm rules can feed long-term event chains later.</div>
                            </div>
                        </div>

                        {utilityMessage && (
                            <div className="rounded-xl border border-lime-400/30 bg-slate-950/80 p-3 text-xs text-lime-100">{utilityMessage}</div>
                        )}
                    </div>
                )}

                {activeTab === 'WeChat' && (
                    <div className="max-w-xl mx-auto h-[60vh] flex flex-col bg-[#ebebeb] rounded-2xl overflow-hidden shadow-2xl relative border border-slate-700/50">
                        <div className="bg-[#1AAD19] px-4 py-3 text-white shadow relative z-10 flex justify-between items-center shrink-0">
                            <h2 className="text-md font-bold tracking-wide">WeChat</h2>
                            <div className="text-xl opacity-80 cursor-pointer">⊕</div>
                        </div>
                        <div className="flex-1 overflow-y-auto w-full no-scrollbar">
                            {priorityMessages.length > 0 && (
                                <div className="bg-[#f6fff4] border-b border-green-200 p-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-green-700">Unread Story Messages</h3>
                                            <p className="text-[10px] text-green-700/70">Replying can move a relationship chain forward.</p>
                                        </div>
                                        <span className="rounded-full bg-[#1AAD19] px-2 py-0.5 text-[10px] font-bold text-white">{priorityMessages.length}</span>
                                    </div>
                                    {priorityMessages.map(message => (
                                        <WeChatPriorityMessage
                                            key={`${message.from}-${message.nodeId}`}
                                            message={message}
                                            disabled={(message.cost || 0) > stats.wealth}
                                            onOpen={() => launchStoryNode(message.nodeId, message.cost || 0, message.effects || {})}
                                        />
                                    ))}
                                </div>
                            )}
                            {Object.keys(state.relationships || {}).length === 0 ? (
                                <div className="text-center p-8 text-slate-500 flex flex-col items-center justify-center h-full">
                                    <div className="text-5xl mb-4 grayscale opacity-40">📱</div>
                                    <p className="font-semibold text-lg text-slate-600 mb-1">No Contacts Yet.</p>
                                    <p className="text-xs">Go out into the world and meet some people!</p>
                                </div>
                            ) : (
                                Object.entries(state.relationships || {}).map(([name, data], idx) => {
                                    const meta = getContactMeta(name);
                                    const stage = getRelationshipStage(name, data, flags);
                                    const recent = getRecentInteraction(name, flags);
                                    const meetup = getWeChatMeetup(name, flags, phase, turn);
                                    const maxFriendshipWidth = Math.min(100, Math.max(0, data.friendship || 0));
                                    const maxRomanceWidth = Math.min(100, Math.max(0, data.romance || 0));

                                    return (
                                        <div key={idx} className="bg-white border-b border-gray-200/60 p-3 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-3xl shadow-sm border border-gray-200 shrink-0 transform group-hover:scale-105 transition-transform">
                                                    {meta.emoji}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{name}</h3>
                                                    <p className="text-gray-500 text-[10px] leading-tight line-clamp-1">{meta.desc}</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${stage.className}`}>{stage.label}</span>
                                                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-gray-500">{meta.route}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1.5 w-full sm:flex-1 bg-gray-50 p-2 sm:p-2.5 rounded-lg border border-gray-100/80">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <div className="text-[10px] text-gray-500 leading-snug">{recent}</div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const sent = gameEngine.sendWeChatCheckIn(name);
                                                            setUtilityMessage(sent ? `You sent ${name} a short WeChat check-in.` : `You cannot message ${name} right now.`);
                                                        }}
                                                        disabled={phase !== "In-China" || flags.sent_wechat_ping_this_week}
                                                        className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold transition-all ${phase !== "In-China" || flags.sent_wechat_ping_this_week ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#1AAD19] text-white hover:bg-[#159014]'}`}
                                                    >
                                                        {phase !== "In-China" ? 'Locked' : flags.sent_wechat_ping_this_week ? 'Sent' : 'Check in'}
                                                    </button>
                                                    {meetup && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                launchStoryNode(meetup.nodeId, meetup.cost || 0, meetup.effects || {});
                                                            }}
                                                            disabled={(meetup.cost || 0) > stats.wealth}
                                                            className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold transition-all ${(meetup.cost || 0) > stats.wealth ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-700'}`}
                                                        >
                                                            {meetup.label}
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-4 gap-1 mb-1">
                                                    {["Contact", "Trust", "Tension", "Commitment"].map(label => (
                                                        <div key={label} className={`h-1 rounded-full ${stage.order >= getStageOrder(label) ? stage.barClass : "bg-gray-200"}`} title={label}></div>
                                                    ))}
                                                </div>
                                                <div className="relative">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                            <span className="text-[9px] font-semibold text-[#1AAD19] uppercase tracking-wider">Bond</span>
                                                        <span className="text-[10px] font-mono text-[#1AAD19]">{data.friendship}/100</span>
                                                    </div>
                                                    <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-green-100">
                                                        <div style={{ width: `${maxFriendshipWidth}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#1AAD19] transition-all duration-700"></div>
                                                    </div>
                                                </div>
                                                {data.romance > 0 && (
                                                    <div className="relative mt-0.5">
                                                        <div className="flex items-center justify-between mb-0.5">
                                                            <span className="text-[9px] font-semibold text-rose-500 uppercase tracking-wider">Closeness</span>
                                                            <span className="text-[10px] font-mono text-rose-500">{data.romance}/100</span>
                                                        </div>
                                                        <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-rose-100">
                                                            <div style={{ width: `${maxRomanceWidth}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-rose-500 transition-all duration-700"></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <div className="bg-white border-t border-gray-200 flex py-2 px-6 justify-between text-gray-400 text-xs font-medium shrink-0">
                            <div className="flex flex-col items-center text-[#1AAD19]"><span className="text-xl mb-0.5">💬</span>Chats</div>
                            <div className="flex flex-col items-center hover:text-gray-500"><span className="text-xl mb-0.5">👥</span>Contacts</div>
                            <div className="flex flex-col items-center hover:text-gray-500"><span className="text-xl mb-0.5">🧭</span>Discover</div>
                            <div className="flex flex-col items-center hover:text-gray-500"><span className="text-xl mb-0.5">👤</span>Me</div>
                        </div>
                    </div>
                )}

                {activeTab === 'Wallet' && (
                    <div className="max-w-xl mx-auto">
                        <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-xl mb-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-20 text-5xl">💳</div>
                            <h2 className="text-blue-100 font-semibold mb-1 text-sm">Total Balance</h2>
                            <div className="text-3xl font-bold font-mono">¥{stats.wealth.toLocaleString()}</div>
                            <div className="mt-3 flex gap-3 text-xs font-medium">
                                <div className="bg-white/20 px-2.5 py-1 rounded-full text-blue-50">↓ Receive</div>
                                <div className="bg-white/20 px-2.5 py-1 rounded-full text-blue-50">↑ Transfer</div>
                            </div>
                        </div>

                        <div className="mb-4 rounded-xl border border-blue-400/25 bg-slate-950/70 p-4 text-sm text-blue-100">
                            {phase !== "In-China" && "Alipay can be prepared before arrival, but the first real scan happens when a counter, a QR code, and a hungry student all meet."}
                            {phase === "In-China" && flags.first_alipay_used && "First Alipay lesson completed: scan, confirm amount, pay, and leave the counter before the lunch rush swallows you."}
                            {phase === "In-China" && !flags.first_alipay_used && flags.has_alipay && "Alipay is linked, but you have not used it in a real scene yet. The first canteen scan is still a useful confidence checkpoint."}
                            {phase === "In-China" && !flags.first_alipay_used && !flags.has_alipay && "Alipay is not ready yet. Expect more cash, help requests, and payment friction until you fix the setup."}
                        </div>

                        <h3 className="text-slate-400 font-semibold mb-2 px-2 tracking-wide uppercase text-xs">Recent Transactions</h3>
                        <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 shadow-inner overflow-hidden">
                            {(state.transactions || []).slice().reverse().map((tx, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${tx.type === 'income' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-rose-900/30 text-rose-400'}`}>
                                            {tx.type === 'income' ? '↓' : '↑'}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-200">{tx.desc}</div>
                                            <div className="text-xs text-slate-500">Week {tx.week}</div>
                                        </div>
                                    </div>
                                    <div className={`font-mono font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-slate-300'}`}>
                                        {tx.type === 'income' ? '+' : ''}{tx.amount}
                                    </div>
                                </div>
                            ))}
                            {!(state.transactions && state.transactions.length > 0) && (
                                <div className="p-8 text-center text-slate-500 italic">No transactions yet.</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'DiDi' && (
                    <div className="max-w-xl mx-auto space-y-4">
                        <div className="bg-yellow-500 rounded-2xl p-5 text-slate-950 shadow-xl relative overflow-hidden">
                            <div className="absolute -right-3 -top-4 text-7xl opacity-20">🚕</div>
                            <h2 className="text-xl font-black mb-1 tracking-tight">DiDi</h2>
                            <p className="text-slate-800 text-xs font-semibold max-w-sm">Use the phone like a real student tool: spend RMB to buy back time and Energy when Shanghai is too big for your week.</p>
                        </div>

                        {phase !== "In-China" && (
                            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
                                DiDi is prepared before arrival, but it only becomes an active city tool after you reach Shanghai.
                            </div>
                        )}
                        {phase === "In-China" && (
                            <div className="rounded-xl border border-yellow-500/30 bg-slate-950/70 p-4 text-sm text-yellow-100">
                                {flags.airport_didi_required
                                    ? "Required story task: request Airport Transfer Practice to continue from Pudong to the pickup-zone lesson."
                                    : (flags.first_didi_used ? "First DiDi lesson completed: pickup zone, plate check, route sharing, and payment are now part of your city toolkit." : "You can use DiDi now, but the airport-to-campus first-use lesson will matter most if you chose that arrival route.")}
                            </div>
                        )}

                        <RideCard
                            title="Campus Errand Ride"
                            cost={45}
                            energyGain={8}
                            desc="A short ride across campus or to a nearby print shop. Useful when one small task would otherwise eat the day."
                            disabled={phase !== "In-China" || flags.airport_didi_required || flags.used_didi_this_week || stats.wealth < 45}
                            onSelect={() => gameEngine.useDidiRide('standard')}
                            onMessage={setUtilityMessage}
                        />
                        <RideCard
                            title="Cross-Town Shortcut"
                            cost={88}
                            energyGain={14}
                            desc="Skip the worst transfer and arrive with enough focus left to actually talk to people."
                            disabled={phase !== "In-China" || flags.airport_didi_required || flags.used_didi_this_week || stats.wealth < 88}
                            onSelect={() => gameEngine.useDidiRide('comfort')}
                            onMessage={setUtilityMessage}
                        />
                        <RideCard
                            title="Airport Transfer Practice"
                            cost={160}
                            energyGain={20}
                            desc="A more expensive rehearsal for handling luggage, pickup points, and app-based transport under pressure."
                            disabled={phase !== "In-China" || flags.used_didi_this_week || stats.wealth < 160}
                            onSelect={() => {
                                const result = gameEngine.useDidiRide('airport');
                                if (result?.ok && flags.airport_didi_required) onClose();
                                return result;
                            }}
                            onMessage={setUtilityMessage}
                        />

                        <div className="rounded-2xl border border-yellow-500/20 bg-slate-950/70 p-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">City Shortcuts</h3>
                            <p className="mt-1 text-xs text-slate-400">Use DiDi as a story launcher. These start a Shanghai scene immediately, so pick one when you want the week to become more than routine planning.</p>
                            <div className="mt-3 grid grid-cols-1 gap-3">
                                <DidiDestinationCard
                                    title="Bund Evening Walk"
                                    cost={80}
                                    desc="Cross town for the skyline and a quieter city reflection."
                                    disabled={phase !== "In-China" || flags.airport_didi_required || stats.wealth < 80}
                                    onSelect={() => launchStoryNode('event_sh_bund_walk', 80, { energy: -2, culture: 2 })}
                                />
                                <DidiDestinationCard
                                    title="Lujiazui Fintech Talk"
                                    cost={100}
                                    desc="A practical city-opportunity scene for payments, offices, and Shanghai speed."
                                    disabled={phase !== "In-China" || flags.airport_didi_required || stats.wealth < 100}
                                    onSelect={() => launchStoryNode('event_sh_lujiazui_mixer', 100, { energy: -3, digitalProficiency: 2 })}
                                />
                                <DidiDestinationCard
                                    title="Fuxing Park Night"
                                    cost={120}
                                    desc="Nightlife as a cultural scene, not just a stat button."
                                    disabled={phase !== "In-China" || flags.airport_didi_required || stats.wealth < 120}
                                    onSelect={() => launchStoryNode('event_sh_ins_clubbing', 120, { energy: -5, culture: 2 })}
                                />
                            </div>
                        </div>

                        {flags.used_didi_this_week && (
                            <div className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ride used this week. Calendar reset unlocks the app again.</div>
                        )}
                        {utilityMessage && (
                            <div className="rounded-xl border border-yellow-500/30 bg-slate-950/80 p-3 text-xs text-yellow-100">{utilityMessage}</div>
                        )}
                    </div>
                )}

                {activeTab === 'Jobs' && (
                    <div className="max-w-xl mx-auto space-y-3">
                        <div className="bg-amber-600/20 border border-amber-600/50 rounded-xl p-4 mb-4">
                            <h2 className="text-lg font-bold text-amber-500 mb-1">Student Work Board</h2>
                            <p className="text-slate-300 text-xs">Campus-approved microtasks can earn RMB, but they still cost Energy. Risky off-campus work lives under Money & Compliance, not here.</p>
                        </div>

                        <div className="rounded-xl border border-amber-400/25 bg-slate-950/70 p-4 text-sm text-amber-100">
                            {phase !== "In-China" && "Student tasks unlock after arrival, once you understand campus rules and your visa boundaries."}
                            {phase === "In-China" && flags.first_student_task_used && "First student task completed: you have learned that earning RMB also spends time, Energy, and attention."}
                            {phase === "In-China" && !flags.first_student_task_used && "This board is for small campus-safe tasks. Use it when money pressure matters, but do not mistake every paid opportunity for a legal one."}
                        </div>

                        <JobCard
                            id="english_tutor" title="English Tutor" emoji="🗣️"
                            income={200} energyCost={10}
                            desc="Help with language practice through the Tonal Rhythm mini-game. Good pay, but mentally draining."
                            disabled={phase !== "In-China" || flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('tones')}
                        />
                        <JobCard
                            id="delivery_rider" title="Campus Delivery" emoji="🛵"
                            income={300} energyCost={15}
                            desc="Fast money, fast pressure. Beat the Delivery Typer game to finish the run."
                            disabled={phase !== "In-China" || flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('delivery')}
                        />
                        <JobCard
                            id="flyer_distributor" title="Flyer Distributor" emoji="🧧"
                            income={150} energyCost={5}
                            desc="Hand out campus flyers and play the Hongbao Snatch game."
                            disabled={phase !== "In-China" || flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('hongbao')}
                        />
                        <JobCard
                            id="taobao_model" title="Taobao Model" emoji="📸"
                            income={500} energyCost={20}
                            desc="Help with a student e-commerce shoot. High pay, high energy cost."
                            disabled={phase !== "In-China" || flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('model')}
                        />
                    </div>
                )}

                {activeTab === 'Taobao' && (
                    <div className="max-w-xl mx-auto">
                        <div className="bg-orange-600 rounded-2xl p-5 text-white shadow-xl mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold mb-1 tracking-tight">Taobao Mall</h2>
                                <p className="text-orange-200 text-xs">Shopping is only half the lesson. Address fields, couriers, sizing, and timing are the other half.</p>
                            </div>
                            <div className="text-4xl">🛒</div>
                        </div>

                        {phase !== "In-China" && (
                            <div className="mb-4 rounded-xl border border-orange-400/30 bg-orange-500/10 p-4 text-sm text-orange-100">
                                Taobao becomes useful after you reach the dorm. The first story order teaches address setup before this app becomes a weekly utility.
                            </div>
                        )}
                        {phase === "In-China" && (
                            <div className="mb-4 rounded-xl border border-orange-400/30 bg-slate-950/70 p-4 text-sm text-orange-100">
                                {flags.first_taobao_used ? "First Taobao lesson completed: you now understand address setup, delivery timing, seller ratings, and courier friction." : "Your first dorm order has not become a story lesson yet. Use Taobao carefully: cheap, fast, and correct are three different promises."}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ItemCard
                                id="ebike" title="Electric Bike" emoji="🛵" cost={1500}
                                desc="Reduces weekly energy drain from walking/commuting by 1 point."
                                isOwned={state.items?.ebike}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('ebike', 1500, 'Taobao: Electric Bike')}
                            />
                            <ItemCard
                                id="headphones" title="Noise-Canceling Headphones" emoji="🎧" cost={800}
                                desc="Prevents Academics and Energy penalties when working part-time jobs."
                                isOwned={state.items?.headphones}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('headphones', 800, 'Taobao: Noise-Canceling Headphones')}
                            />
                            <ItemCard
                                id="beddingSet" title="Dorm Bedding Set" emoji="🛏️" cost={280}
                                desc="Turns the first dorm week from bare mattress panic into actual recovery. +10 Energy once."
                                isOwned={state.items?.beddingSet}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('beddingSet', 280, 'Taobao: Dorm Bedding Set', { stats: { energy: 10 } })}
                            />
                            <ItemCard
                                id="deskLamp" title="Desk Lamp Kit" emoji="💡" cost={180}
                                desc="A small study setup upgrade. +3 Academics and +3 Energy once."
                                isOwned={state.items?.deskLamp}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('deskLamp', 180, 'Taobao: Desk Lamp Kit', { stats: { academics: 3, energy: 3 } })}
                            />
                            <ItemCard
                                id="phraseCards" title="Mandarin Phrase Cards" emoji="🗂️" cost={120}
                                desc="Tiny scripts for canteen, delivery, and office counters. +4 Chinese and +2 Culture once."
                                isOwned={state.items?.phraseCards}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('phraseCards', 120, 'Taobao: Mandarin Phrase Cards', { stats: { chinese: 4, culture: 2 } })}
                            />
                            <ItemCard
                                id="cityDataPack" title="City Data Pack" emoji="📶" cost={88}
                                desc="Maps, transit, payments, and translation backups. +5 Digital Proficiency once."
                                isOwned={state.items?.cityDataPack}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('cityDataPack', 88, 'Taobao: City Data Pack', { stats: { digitalProficiency: 5 } })}
                            />
                        </div>

                        <div className="mt-5 rounded-2xl border border-orange-400/30 bg-slate-950/70 p-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-orange-300">Service Orders</h3>
                            <p className="mt-1 text-xs text-slate-400">Small weekly orders turn Taobao into a lived-in tool: courier calls, wrong addresses, and meal planning.</p>
                            <div className="mt-3 grid grid-cols-1 gap-3">
                                <ServiceOrderCard
                                    title="Same-Day Dorm Fix"
                                    cost={65}
                                    desc="Batteries, hooks, detergent, and one small thing you forgot you needed. +4 Energy, +1 Digital."
                                    disabled={phase !== "In-China" || flags.used_taobao_service_this_week || stats.wealth < 65}
                                    onSelect={() => handleTaobaoService('dormFix')}
                                />
                                <ServiceOrderCard
                                    title="Wrong-Address Recovery"
                                    cost={35}
                                    desc="Practice fixing a courier issue without panicking. +3 Digital, +1 Culture, -1 Energy."
                                    disabled={phase !== "In-China" || flags.used_taobao_service_this_week || stats.wealth < 35}
                                    onSelect={() => handleTaobaoService('wrongAddress')}
                                />
                                <ServiceOrderCard
                                    title="Meal Prep Box"
                                    cost={120}
                                    desc="A not-glamorous order that saves a future evening. +6 Energy, +1 Digital."
                                    disabled={phase !== "In-China" || flags.used_taobao_service_this_week || stats.wealth < 120}
                                    onSelect={() => handleTaobaoService('mealPrep')}
                                />
                            </div>
                            {utilityMessage && (
                                <div className="mt-3 rounded-xl border border-orange-400/20 bg-orange-500/10 p-3 text-xs text-orange-100">{utilityMessage}</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'Arcade' && (
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl font-bold text-purple-400 mb-4 text-center">SimPad Arcade</h2>
                        <div className="mb-4 rounded-xl border border-purple-400/25 bg-slate-950/70 p-4 text-sm text-purple-100">
                            Arcade is a replay archive for systems you have already encountered in the story. If a game is locked, it means that life lesson has not happened to you yet.
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <ArcadeGameButton id="visa" title="Visa Bureaucracy" emoji="📄" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="subway" title="Subway Squeeze" emoji="🚇" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="delivery" title="Delivery Typer" emoji="🥡" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="tones" title="Tonal Rhythm" emoji="🗣️" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="bike" title="Bike Scramble" emoji="🚲" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="banquet" title="Banquet Balance" emoji="🍻" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="hongbao" title="Hongbao Snatch" emoji="🧧" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="bargain" title="Bargain Market" emoji="🛍️" flags={flags} onReplay={onReplayGame} />
                            <ArcadeGameButton id="model" title="Taobao Photo Shoot" emoji="📸" flags={flags} onReplay={onReplayGame} />
                        </div>
                        {Object.keys(flags).filter(k => k.startsWith('unlocked_minigame_')).length === 0 && (
                            <div className="text-center text-slate-500 mt-12">
                                <p>No games unlocked yet.</p>
                                <p className="text-sm">Play through the story to unlock minigames here.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Gallery' && (
                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="rounded-2xl bg-fuchsia-600 p-5 text-white shadow-xl">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black tracking-tight">Memory Archive</h2>
                                    <p className="mt-1 text-xs leading-relaxed text-fuchsia-100">Replay the CG moments your choices have unlocked. Locked cards show what kind of memory still exists somewhere in the year.</p>
                                </div>
                                <div className="rounded-2xl bg-white/15 px-3 py-2 text-center font-mono">
                                    <div className="text-[10px] uppercase tracking-widest text-fuchsia-100">Unlocked</div>
                                    <div className="text-2xl font-black">{unlockedMemoryCount}/{memoryEntries.length}</div>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                                {galleryRoutes.map(route => (
                                    <button
                                        key={route}
                                        onClick={() => setSelectedGalleryRoute(route)}
                                        className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${selectedGalleryRoute === route ? 'border-white bg-white text-fuchsia-700' : 'border-white/25 bg-white/10 text-fuchsia-50 hover:bg-white/20'}`}
                                    >
                                        {route}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleMemoryEntries.map((memory) => {
                                const unlocked = isMemoryUnlocked(memory, flags);
                                return (
                                    <button
                                        key={memory.id}
                                        onClick={() => unlocked && setSelectedMemory(memory)}
                                        disabled={!unlocked}
                                        className={`group overflow-hidden rounded-2xl border text-left shadow-xl transition-all ${unlocked ? 'border-fuchsia-300/40 bg-slate-900 hover:-translate-y-1 hover:border-fuchsia-200' : 'border-slate-700 bg-slate-900/60 opacity-60 grayscale'}`}
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-slate-950">
                                            <img src={memory.image} alt={memory.title} className={`h-full w-full object-cover transition-transform duration-500 ${unlocked ? 'group-hover:scale-105' : 'blur-sm'}`} />
                                            {!unlocked && <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-3xl">🔒</div>}
                                            <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-fuchsia-100">{memory.route}</div>
                                        </div>
                                        <div className="p-3">
                                            <div className="font-bold text-slate-100">{unlocked ? memory.title : "Locked Memory"}</div>
                                            <p className="mt-1 text-xs leading-snug text-slate-400">{unlocked ? memory.desc : memory.hint}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'Souvenirs' && (
                    <div className="max-w-xl mx-auto">
                        <div className="bg-pink-600 rounded-2xl p-5 text-white shadow-xl mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold mb-1 tracking-tight">Fridge Magnets</h2>
                                <p className="text-pink-200 text-xs">Collected from your travels around China.</p>
                            </div>
                            <div className="text-4xl">🧲</div>
                        </div>

                        <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-8 flex flex-wrap gap-4 justify-center items-start min-h-[300px] relative overflow-hidden">
                            {/* Refrigerator background styling */}
                            <div className="absolute inset-0 bg-slate-200 opacity-10 pointer-events-none border-x-8 border-t-8 border-slate-300"></div>

                            {!state.inventory || state.inventory.length === 0 ? (
                                <div className="text-slate-400 italic mt-20 z-10 text-center w-full font-medium">Your fridge is empty.<br/><span className="text-sm opacity-70">Travel and explore local entertainment to collect magnets!</span></div>
                            ) : (
                                state.inventory.map((magnet, idx) => (
                                    <div key={idx} className="bg-white text-slate-800 font-bold p-2 pt-3 pb-2 rounded-lg shadow-xl transform hover:scale-110 transition-transform cursor-pointer border-2 border-slate-200 z-10 flex flex-col items-center gap-1 min-w-[90px]" style={{ transform: `rotate(${(idx % 3 - 1) * 4}deg)` }}>
                                        {magnet.image ? (
                                            <div className="w-16 h-16 relative rounded-md overflow-hidden shadow-sm mb-1 bg-slate-50 flex items-center justify-center border border-slate-100">
                                                <img src={magnet.image} alt={magnet.name} className="w-full h-full object-cover transform scale-110" />
                                            </div>
                                        ) : (
                                            <span className="text-3xl drop-shadow-md mb-2">{magnet.emoji}</span>
                                        )}
                                        <span className="text-[0.65rem] uppercase tracking-widest text-slate-500 text-center leading-tight">{magnet.name}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {selectedMemory && (
                <div className="absolute inset-0 z-30 flex flex-col bg-slate-950/95 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
                        <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-fuchsia-300">{selectedMemory.route}</div>
                            <h3 className="text-lg font-black text-white">{selectedMemory.title}</h3>
                        </div>
                        <button
                            onClick={() => setSelectedMemory(null)}
                            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm font-bold text-slate-200 hover:bg-slate-800"
                        >
                            Close
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5">
                        <img src={selectedMemory.image} alt={selectedMemory.title} className="mx-auto max-h-[48vh] w-full max-w-xl rounded-2xl object-contain shadow-2xl" />
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">{selectedMemory.desc}</p>
                    </div>
                </div>
            )}

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
        <div className="pl-12 relative">
            <div className={`absolute left-[0.85rem] top-1.5 w-4 h-4 rounded-full border-[4px] z-10 transition-all ${dotColor}`}></div>
            <div className={`text-base font-bold ${active ? 'text-sky-400' : (completed ? 'text-emerald-400' : 'text-slate-500')} mb-1`}>
                {title}
            </div>
            <p className={`${textColor} text-xs mb-2`}>{desc}</p>
            <div className="bg-slate-800/80 p-3 rounded-xl flex flex-col gap-1.5 border border-slate-700/50 shadow-inner">
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
        <div className="flex justify-between items-center text-xs bg-slate-900/50 p-1.5 px-2 rounded-lg border border-slate-700/50">
            <span className="text-slate-400 shrink-0 mr-3">{label}:</span>
            <span className="text-sky-300 font-medium text-right break-words">{value}</span>
        </div>
    );
}

function getCalendarItems(state) {
    const flags = state.flags || {};
    const items = [];

    const addItem = (id, week, title, desc) => {
        const weeksAway = week - state.turn;
        const tone = weeksAway <= 0 ? "urgent" : weeksAway <= 2 ? "soon" : "future";
        const weekLabel = weeksAway <= 0 ? `Week ${week} • due now` : `Week ${week} • in ${weeksAway} week${weeksAway === 1 ? "" : "s"}`;
        items.push({ id, week, title, desc, tone, weekLabel });
    };

    if (state.phase === "Application") {
        if (!flags.completed_application) {
            addItem("application_deadline", 8, "Minghai Application Deadline", "Statement, school research, documents, interview prep, and final submission all converge here.");
        }
        if (!flags.decision_e1_plan) {
            addItem("statement_draft", 5, "Statement Draft Lock", "A credible study plan should explain why China, why Minghai, and why this major now.");
        }
        if (!flags.finance_scholarship && !flags.finance_rich && !flags.finance_working) {
            addItem("funding_plan", 6, "Funding Plan Check", "Your first serious economic choice shapes pressure for the whole year.");
        }
    }

    if (state.phase === "Pre-Departure") {
        if (!flags.got_visa) {
            addItem("x1_visa", 12, "X1 Visa Appointment", "Passport, Admission Letter, JW202, copies, photos, and one careful queue.");
        }
        if (!flags.decision_e2_wechat) {
            addItem("phone_payment", 13, "Digital Setup", "WeChat, Alipay, maps, translation backups, and ride-hailing preparation make later arrival choices possible.");
        }
        if (!flags.departed_for_shanghai) {
            addItem("flight_week", 16, "Boarding Week", "Shanghai stops being a plan and becomes a place.");
        }
    }

    if (state.phase === "In-China") {
        if (!flags.decision_e3_registration) {
            addItem("registration", 18, "Registration Window", "Student card, account setup, campus systems, and residence-permit rhythm.");
        }
        if (state.turn < 24) {
            addItem("midterm", 24, "Midterm Checkpoint", "Your habits start showing receipts: classes, energy, relationships, and money all speak at once.");
        }
        if (state.turn < 28) {
            addItem("future_direction", 28, "Future Direction", "Research, career, local integration, student support, or city opportunity becomes more than a vibe.");
        }
        if (state.turn < 32) {
            addItem("year_end_review", 32, "Year-End Review", "Routes, relationships, and pressure turn into an ending.");
        }
    }

    if (items.length === 0) {
        items.push({
            id: "open_week",
            week: state.turn,
            title: "Open Week",
            desc: "No critical deadline is screaming right now. This is a good week to invest in a route, repair a relationship, or recover Energy.",
            tone: "ready",
            weekLabel: `Week ${state.turn} • flexible`
        });
    }

    return items.sort((a, b) => a.week - b.week).slice(0, 5);
}

function getMemoryEntries(flags) {
    return [
        {
            id: "admission",
            title: "Admission Email",
            route: "Application",
            image: "images/simulator/cg/cg_admission_email.jpg",
            desc: "The China plan becomes real on a glowing screen.",
            hint: "Submit and accept the Minghai offer.",
            unlocked: flags.accepted_offer
        },
        {
            id: "documents",
            title: "Document Stack",
            route: "Pre-Departure",
            image: "images/simulator/cg/cg_document_stack_jw202.jpg",
            desc: "The paperwork pile that turns a dream into an appointment.",
            hint: "Decode the admission package or visa documents.",
            unlocked: flags.jw202_understood || flags.got_visa
        },
        {
            id: "family_farewell",
            title: "Family Farewell",
            route: "Pre-Departure",
            image: "images/simulator/cg/cg_family_farewell_keepsake.jpg",
            desc: "A small keepsake makes the flight feel less like leaving and more like carrying home forward.",
            hint: "Reach the last night at home before departure.",
            unlocked: flags.decision_e2_farewell
        },
        {
            id: "language",
            title: "Language Breakthrough",
            route: "Campus Life",
            image: "images/simulator/cg/cg_language_breakthrough.jpg",
            desc: "One ordinary sentence lands correctly, and the campus feels a little less sealed.",
            hint: "Keep investing in Chinese until a daily-life breakthrough appears.",
            unlocked: flags.language_breakthrough || flags.decision_e3_first_class || flags.chinese_confidence
        },
        {
            id: "language_partner",
            title: "Language Partner Cafe",
            route: "Campus Life",
            image: "images/simulator/cg/cg_language_partner_cafe.jpg",
            desc: "Useful phrases become less embarrassing when someone patient sits across the table.",
            hint: "Practice useful daily-life Chinese with a language partner.",
            unlocked: flags.language_partner_cafe
        },
        {
            id: "shared_flat_first_night",
            title: "Shared Flat First Night",
            route: "Housing",
            image: "images/simulator/cg/cg_housing_shared_flat_first_night.png",
            desc: "The first night turns an address choice into a living rhythm: kitchen noise, unpacked clothes, and a desk lamp that has to become home.",
            hint: "Choose or struggle through a shared-flat housing path.",
            unlocked: flags.housing_choice === "Shared flat" || flags.decision_e2_housing === "Shared flat" || flags.housing_followup_done || flags.delayed_housing_compromise_seen
        },
        {
            id: "studio_rent_pressure",
            title: "Studio Rent Pressure",
            route: "Housing",
            image: "images/simulator/cg/cg_studio_rent_pressure.png",
            desc: "Privacy has a price, and the price starts talking back when rent, meals, transport, and coursework arrive in the same week.",
            hint: "Let housing costs become a real budget pressure.",
            unlocked: /studio/i.test(flags.housing_choice || flags.decision_e2_housing || "") || flags.housing_friction_debt || flags.housing_energy_scar
        },
        {
            id: "calendar_focus",
            title: "Calendar Warning",
            route: "Phone Layer",
            image: "images/simulator/cg/cg_calendar_midterm_warning.png",
            desc: "A pinned reminder returns before panic can become the plan.",
            hint: "Pin a deadline and let it pay off in a later week.",
            unlocked: flags.delayed_calendar_focus_seen || flags.calendar_midterm_prepped || flags.calendar_final_prepped
        },
        {
            id: "wechat_repair",
            title: "WeChat Repair",
            route: "Phone Layer",
            image: "images/simulator/backgrounds/bg_phone_network_problem.jpg",
            desc: "Two quiet weeks cool a thread, then an honest message warms it back up.",
            hint: "Let message silence create distance, then repair it honestly.",
            unlocked: flags.wechat_repair_messages_sent || flags.delayed_wechat_silence_seen
        },
        {
            id: "didi_pickup",
            title: "DiDi Pickup Zone",
            route: "Phone Layer",
            image: "images/simulator/cg/cg_didi_pickup_zone_confusion.png",
            desc: "The app button was easy. The real lesson was choosing the gate the driver could actually find.",
            hint: "Use DiDi without enough city setup and learn the pickup-zone lesson.",
            unlocked: flags.didi_pickup_points_saved || flags.delayed_didi_pickup_confusion_seen
        },
        {
            id: "taobao_address",
            title: "Taobao Address Repair",
            route: "Phone Layer",
            image: "images/simulator/cg/cg_taobao_wrong_address.png",
            desc: "A tiny courier mistake becomes a practical lesson in how an address lives inside an app.",
            hint: "Use Taobao wrong-address recovery and fix the address template.",
            unlocked: flags.taobao_address_template_fixed || flags.delayed_taobao_wrong_address_seen
        },
        {
            id: "professor",
            title: "Professor Lin Office Hours",
            route: "Academic",
            image: "images/simulator/cg/cg_professor_lin_office_hours.jpg",
            desc: "A recommendation is not a favor. It is his name attached to your habits.",
            hint: "Earn Professor Lin's recommendation path.",
            unlocked: flags.lin_recommendation_ready
        },
        {
            id: "lin_plain_explanation",
            title: "Plain Explanation",
            route: "Academic",
            image: "images/simulator/cg/cg_professor_lin_plain_explanation.png",
            desc: "Professor Lin asks you to explain without decoration, and the missing part of your own understanding finally shows itself.",
            hint: "Help Professor Lin turn a confused question into a clear explanation.",
            unlocked: flags.request_professor_lin_class_question
        },
        {
            id: "mei",
            title: "Dr. Mei Project Meeting",
            route: "Academic",
            image: "images/simulator/cg/cg_dr_mei_project_meeting.jpg",
            desc: "The research question becomes too real to treat as a line on a resume.",
            hint: "Commit to Dr. Mei's research project.",
            unlocked: flags.dr_mei_project_commitment
        },
        {
            id: "mei_field_notes",
            title: "Field Notes",
            route: "Academic",
            image: "images/simulator/cg/cg_dr_mei_field_notes.png",
            desc: "Messy notes become a lesson in uncertainty, blind spots, and the responsibility not to beautify reality.",
            hint: "Read Dr. Mei's messy notes for what they failed to notice.",
            unlocked: flags.request_dr_mei_field_notes
        },
        {
            id: "research_poster",
            title: "Research Poster",
            route: "Academic",
            image: "images/simulator/cg/cg_research_poster.jpg",
            desc: "Charts, field notes, and one careful answer after another turn into public confidence.",
            hint: "Reach an academic or research ending.",
            unlocked: flags.ending_scholar || flags.ending_researcher || flags.dr_mei_project_commitment
        },
        {
            id: "sophie",
            title: "Sophie Support Circle",
            route: "International",
            image: "images/simulator/cg/cg_sophie_support_circle.jpg",
            desc: "A support dinner becomes infrastructure for the next students.",
            hint: "Build Sophie's support circle.",
            unlocked: flags.sophie_support_circle || flags.sophie_orientation_committee
        },
        {
            id: "sophie_arrival_rescue",
            title: "Arrival Rescue",
            route: "International",
            image: "images/simulator/cg/cg_sophie_arrival_rescue.png",
            desc: "You and Sophie turn one lost arrival call into calm steps, then into the first draft of a better guide.",
            hint: "Help Sophie talk a lost new student through arrival panic.",
            unlocked: flags.request_sophie_new_student || flags.sophie_arrival_helper
        },
        {
            id: "orientation",
            title: "Orientation Guide",
            route: "International",
            image: "images/simulator/cg/cg_orientation_guide.jpg",
            desc: "Your arrival notes become someone else's soft landing.",
            hint: "Turn international-student care into a reusable guide.",
            unlocked: flags.sophie_orientation_committee || flags.sophie_guide_published
        },
        {
            id: "xiao",
            title: "Xiao Chen Demo Day",
            route: "Shanghai",
            image: "images/simulator/cg/cg_xiao_chen_demo_day.jpg",
            desc: "The prototype meets real feedback, then real money starts to feel possible.",
            hint: "Reach Xiao Chen's demo day.",
            unlocked: flags.xiao_chen_demo_day
        },
        {
            id: "xiao_onboarding_test",
            title: "Onboarding Test",
            route: "Shanghai",
            image: "images/simulator/cg/cg_xiao_chen_onboarding_test.png",
            desc: "The silent usability test hurts Xiao Chen's pride and saves the product from pretending users read everything.",
            hint: "Watch real students struggle with Xiao Chen's onboarding draft.",
            unlocked: flags.request_xiao_chen_onboarding || flags.xiao_chen_onboarding_clear
        },
        {
            id: "angel_demo",
            title: "Angel Demo",
            route: "Shanghai",
            image: "images/simulator/cg/cg_angel_demo.jpg",
            desc: "A dorm-room problem travels through group chats until investors start asking practical questions.",
            hint: "Turn the student prototype into an investment-worthy demo.",
            unlocked: flags.ending_entrepreneur || flags.xiao_chen_demo_day
        },
        {
            id: "zhang",
            title: "Manager Zhang Badge",
            route: "Career",
            image: "images/simulator/cg/cg_manager_zhang_office_badge.jpg",
            desc: "The office badge makes legal preparation feel suddenly physical.",
            hint: "Prepare Manager Zhang's referral path.",
            unlocked: flags.manager_zhang_referral_ready || flags.legal_internship_ready
        },
        {
            id: "zhang_mock_interview",
            title: "Mock Interview",
            route: "Career",
            image: "images/simulator/cg/cg_manager_zhang_mock_interview.png",
            desc: "Manager Zhang turns a soft answer into evidence, numbers, boundaries, and a sharper version of ambition.",
            hint: "Rewrite Manager Zhang's practice answer around evidence.",
            unlocked: flags.request_manager_zhang_answer || flags.manager_zhang_evidence_answer
        },
        {
            id: "office_badge",
            title: "Shanghai Office Badge",
            route: "Career",
            image: "images/simulator/cg/cg_office_badge.jpg",
            desc: "The approved internship stops being a phrase and becomes a card against a glass gate.",
            hint: "Enter the legal internship route.",
            unlocked: flags.legal_internship_ready || flags.ending_diplomat || flags.ending_return_offer
        },
        {
            id: "return_offer",
            title: "Return Offer",
            route: "Career",
            image: "images/simulator/cg/cg_return_offer.jpg",
            desc: "The internship becomes a future with a start date.",
            hint: "Earn the full-time return-offer ending.",
            unlocked: flags.ending_diplomat || flags.ending_return_offer
        },
        {
            id: "wang",
            title: "Uncle Wang's Regular Table",
            route: "Local",
            image: "images/simulator/cg/cg_uncle_wang_regular_table.jpg",
            desc: "A plastic stool, a saved seat, and the quiet dignity of being expected.",
            hint: "Become a regular at Uncle Wang's table.",
            unlocked: flags.uncle_wang_regular
        },
        {
            id: "wang_order_bridge",
            title: "Order Bridge",
            route: "Local",
            image: "images/simulator/cg/cg_uncle_wang_order_bridge.png",
            desc: "At Uncle Wang's stall, helping means giving someone the words without taking the moment away.",
            hint: "Help a nervous student order without making them feel small.",
            unlocked: flags.request_uncle_wang_order_help || flags.uncle_wang_order_bridge
        },
        {
            id: "canteen_auntie",
            title: "Canteen Auntie",
            route: "Local",
            image: "images/simulator/cg/cg_canteen_auntie_kind_portion.jpg",
            desc: "A rushed lunch line becomes the first place your practical Chinese holds.",
            hint: "Keep the canteen line moving in Chinese.",
            unlocked: flags.canteen_auntie_kindness
        },
        {
            id: "dorm_auntie",
            title: "Dorm Auntie Parcel Help",
            route: "Local",
            image: "images/simulator/cg/cg_dorm_auntie_parcel_help.jpg",
            desc: "The parcel shelf teaches app codes, dorm rules, and the value of greeting people first.",
            hint: "Turn a package pickup into daily-life language practice.",
            unlocked: flags.dorm_auntie_parcel_help
        },
        {
            id: "neighbor_parcel_crisis",
            title: "Parcel Crisis",
            route: "Local",
            image: "images/simulator/cg/cg_neighbor_li_parcel_crisis.png",
            desc: "A hallway parcel mix-up becomes a small diplomatic crisis, and Neighbor Li trusts you with the practical middle.",
            hint: "Help Neighbor Li make a hallway parcel problem normal again.",
            unlocked: flags.request_neighbor_li_parcel || flags.neighbor_li_parcel_mediator
        },
        {
            id: "study_group",
            title: "Local Study Group",
            route: "Local",
            image: "images/simulator/cg/cg_local_study_group_night.jpg",
            desc: "Homework, snacks, and campus slang make belonging feel practical.",
            hint: "Stay through the awkward parts with a local study group.",
            unlocked: flags.local_study_group_night
        },
        {
            id: "local_regular",
            title: "Local Regular",
            route: "Local",
            image: "images/simulator/cg/cg_local_regular.jpg",
            desc: "Belonging arrives without ceremony: someone remembers your order.",
            hint: "Keep showing up in the neighborhood route.",
            unlocked: flags.ending_local_insider || flags.uncle_wang_regular
        },
        {
            id: "neighbor",
            title: "Neighbor Li Festival Prep",
            route: "Local",
            image: "images/simulator/cg/cg_neighbor_li_festival_prep.jpg",
            desc: "Belonging arrives as tape, lanterns, and someone trusting you with boxes.",
            hint: "Help Neighbor Li with festival prep.",
            unlocked: flags.neighbor_li_festival_invite
        },
        {
            id: "money",
            title: "Money Crisis",
            route: "Risk",
            image: "images/simulator/cg/cg_money_crisis.jpg",
            desc: "The budget stops being abstract when every small cost becomes a locked gate.",
            hint: "Reach the financial emergency route.",
            unlocked: flags.emergency_funding_used || flags.money_crisis_seen
        },
        {
            id: "quiet_return",
            title: "Quiet Return",
            route: "Risk",
            image: "images/simulator/cg/cg_quiet_return.jpg",
            desc: "Not every ending explodes. Some simply go quiet before you are ready.",
            hint: "Reach a low-resource ending.",
            unlocked: flags.ending_out_of_money || flags.ending_quiet_return
        }
    ];
}

function isMemoryUnlocked(memory) {
    return Boolean(memory.unlocked);
}

function CharacterArcCard({ arc }) {
    const meta = getContactMeta(arc.name);
    const pct = Math.round((arc.completedStages / arc.stages.length) * 100);
    const tone = arc.completedStages >= 4
        ? "border-amber-300/40 bg-amber-300/10 text-amber-100"
        : arc.completedStages >= 2
          ? "border-sky-300/35 bg-sky-300/10 text-sky-100"
          : arc.completedStages >= 1
            ? "border-emerald-300/35 bg-emerald-300/10 text-emerald-100"
            : "border-slate-700 bg-slate-900/80 text-slate-300";

    return (
        <div className={`rounded-xl border p-3 ${tone}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950/60 text-2xl">{meta.emoji}</div>
                    <div>
                        <div className="font-black text-white">{arc.name}</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">{meta.route} / {arc.stageLabel}</div>
                    </div>
                </div>
                <div className="text-right font-mono text-xs">
                    <div className="font-black">{arc.completedStages}/{arc.stages.length}</div>
                    <div className="opacity-70">Bond {arc.bond}</div>
                </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-950/60">
                <div className="h-full rounded-full bg-current transition-all duration-500" style={{ width: `${pct}%` }}></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {arc.stages.map(stage => (
                    <div key={stage.label} className={`rounded-lg border px-2 py-1 text-[10px] font-semibold ${stage.done ? "border-current bg-white/10 text-white" : "border-slate-700 bg-slate-950/45 text-slate-500"}`}>
                        {stage.done ? "✓ " : ""}{stage.label}
                    </div>
                ))}
            </div>
        </div>
    );
}

function RouteProjectCard({ panel }) {
    const pct = Math.round((panel.completedSteps / panel.steps.length) * 100);
    const activeTone = panel.completedSteps >= 4
        ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-100"
        : panel.completedSteps >= 2
          ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
          : panel.commitment > 0
            ? "border-amber-300/35 bg-amber-300/10 text-amber-100"
            : "border-slate-700 bg-slate-900/80 text-slate-300";

    return (
        <div className={`rounded-xl border p-3 ${activeTone}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{panel.icon}</span>
                        <span className="font-black text-white">{panel.title}</span>
                    </div>
                    <p className="mt-1 text-xs leading-snug opacity-75">{panel.desc}</p>
                </div>
                <div className="text-right font-mono text-xs">
                    <div className="font-black">{panel.completedSteps}/{panel.steps.length}</div>
                    <div className="opacity-70">Route {panel.commitment}</div>
                </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-950/60">
                <div className="h-full rounded-full bg-current transition-all duration-500" style={{ width: `${pct}%` }}></div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {panel.steps.map(step => (
                    <div key={step.label} className={`rounded-lg border px-2 py-1.5 text-[10px] font-semibold ${step.done ? "border-current bg-white/10 text-white" : "border-slate-700 bg-slate-950/45 text-slate-500"}`}>
                        {step.done ? "✓ " : ""}{step.label}
                    </div>
                ))}
            </div>
            {panel.latestCheck && (
                <div className={`mt-3 rounded-lg border px-3 py-2 text-xs ${panel.latestCheck.success ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" : "border-rose-300/25 bg-rose-300/10 text-rose-100"}`}>
                    Latest check: {panel.latestCheck.label} {panel.latestCheck.score}/{panel.latestCheck.dc}
                </div>
            )}
        </div>
    );
}

function WeChatPriorityMessage({ message, disabled, onOpen }) {
    return (
        <div className="rounded-xl border border-green-200 bg-white p-3 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-2xl">{message.emoji}</div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-black text-gray-900">{message.from}</span>
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-green-700">{message.route}</span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500">{message.stage}</span>
                        </div>
                        <p className="mt-1 text-xs leading-snug text-gray-600">{message.preview}</p>
                    </div>
                </div>
                <button
                    onClick={disabled ? null : onOpen}
                    disabled={disabled}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-black transition-all ${disabled ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-[#1AAD19] text-white hover:bg-[#159014]"}`}
                >
                    {disabled ? "Need RMB" : message.actionLabel}
                </button>
            </div>
        </div>
    );
}

function getWeChatMeetup(name, flags, phase, turn) {
    if (phase !== "In-China") return null;

    const firstMeetups = {};

    if (!flags.contact_professor_lin_talk_1) {
        firstMeetups["Professor Lin"] = { label: "Talk", nodeId: "event_contact_professor_lin_talk_1" };
    } else if (!flags.request_professor_lin_class_question) {
        firstMeetups["Professor Lin"] = { label: "Request", nodeId: "event_request_professor_lin_class_question" };
    }

    if (flags.met_dr_mei && !flags.contact_dr_mei_talk_1) {
        firstMeetups["Dr. Mei"] = { label: "Coffee", nodeId: "event_contact_dr_mei_talk_1" };
    } else if (flags.contact_dr_mei_talk_1 && !flags.request_dr_mei_field_notes) {
        firstMeetups["Dr. Mei"] = { label: "Request", nodeId: "event_request_dr_mei_field_notes" };
    }

    if (!flags.contact_sophie_talk_1) {
        firstMeetups.Sophie = { label: "Check-in", nodeId: "event_contact_sophie_talk_1" };
    } else if (!flags.request_sophie_new_student) {
        firstMeetups.Sophie = { label: "Request", nodeId: "event_request_sophie_new_student" };
    }

    if (flags.met_neighbor_li && !flags.contact_neighbor_li_talk_1) {
        firstMeetups["Neighbor Li"] = { label: "Dorm map", nodeId: "event_contact_neighbor_li_talk_1" };
    } else if (flags.contact_neighbor_li_talk_1 && !flags.request_neighbor_li_parcel) {
        firstMeetups["Neighbor Li"] = { label: "Request", nodeId: "event_request_neighbor_li_parcel" };
    }

    if (flags.met_uncle_wang && !flags.contact_uncle_wang_talk_1) {
        firstMeetups["Uncle Wang"] = { label: "Stall talk", nodeId: "event_contact_uncle_wang_talk_1" };
    } else if (flags.contact_uncle_wang_talk_1 && !flags.request_uncle_wang_order_help) {
        firstMeetups["Uncle Wang"] = { label: "Request", nodeId: "event_request_uncle_wang_order_help" };
    }

    if (flags.met_manager_zhang && !flags.contact_manager_zhang_talk_1) {
        firstMeetups["Manager Zhang"] = { label: "Career chat", nodeId: "event_contact_manager_zhang_talk_1" };
    } else if (flags.contact_manager_zhang_talk_1 && !flags.request_manager_zhang_answer) {
        firstMeetups["Manager Zhang"] = { label: "Request", nodeId: "event_request_manager_zhang_answer" };
    }

    if (flags.met_xiao_chen && !flags.contact_xiao_chen_talk_1) {
        firstMeetups["Xiao Chen"] = { label: "Walk", nodeId: "event_contact_xiao_chen_talk_1" };
    } else if (flags.contact_xiao_chen_talk_1 && !flags.request_xiao_chen_onboarding) {
        firstMeetups["Xiao Chen"] = { label: "Request", nodeId: "event_request_xiao_chen_onboarding" };
    }

    if (firstMeetups[name]) return firstMeetups[name];
    if (turn < 21) return null;

    const meetups = {
        "Professor Lin": flags.lin_academic_method && !flags.lin_recommendation_ready && {
            label: "Office hours",
            nodeId: "event_academic_lin_recommendation"
        },
        "Dr. Mei": flags.dr_mei_research_question && !flags.dr_mei_project_commitment && {
            label: "Project meet",
            nodeId: "event_academic_dr_mei_project_commitment"
        },
        "Sophie": flags.sophie_support_circle && !flags.sophie_orientation_committee && {
            label: "Plan guide",
            nodeId: "event_intl_sophie_orientation_committee"
        },
        "Neighbor Li": flags.neighbor_li_local_trust && !flags.neighbor_li_festival_invite && {
            label: "Festival prep",
            nodeId: "event_local_neighbor_li_festival",
            cost: 20
        },
        "Uncle Wang": flags.uncle_wang_neighborhood_story && !flags.uncle_wang_regular && {
            label: "Regular table",
            nodeId: "event_local_uncle_wang_regular",
            cost: 35
        },
        "Manager Zhang": flags.manager_zhang_career_trust && !flags.manager_zhang_referral_ready && {
            label: "Referral prep",
            nodeId: "event_career_manager_zhang_referral"
        },
        "Xiao Chen": flags.xiao_chen_city_prototype && !flags.xiao_chen_demo_day && {
            label: "Demo day",
            nodeId: "event_city_xiao_chen_demo_day"
        }
    };

    return meetups[name] || null;
}

function getCharacterArcProgress(state) {
    const flags = state.flags || {};
    const relationships = state.relationships || {};
    const arcs = [
        {
            name: "Professor Lin",
            stages: [
                { label: "First Office Hour", done: flags.contact_professor_lin_talk_1 || flags.met_professor_lin_on_campus },
                { label: "Academic Method", done: flags.lin_academic_method || flags.request_professor_lin_class_question },
                { label: "Feedback Tension", done: flags.lin_midterm_tension_resolved || flags.lin_feedback_repaired || flags.lin_feedback_avoided },
                { label: "Recommendation", done: flags.lin_recommendation_ready }
            ]
        },
        {
            name: "Dr. Mei",
            stages: [
                { label: "Research Coffee", done: flags.contact_dr_mei_talk_1 || flags.met_dr_mei },
                { label: "Project Trust", done: flags.dr_mei_project_trust || flags.request_dr_mei_field_notes },
                { label: "Ethics Conflict", done: flags.dr_mei_midterm_tension_resolved || flags.dr_mei_ethics_reframed || flags.dr_mei_efficiency_choice },
                { label: "Commitment", done: flags.dr_mei_project_commitment }
            ]
        },
        {
            name: "Sophie",
            stages: [
                { label: "Private Check-in", done: flags.contact_sophie_talk_1 || flags.wechat_sophie_added },
                { label: "Support Circle", done: flags.sophie_support_circle || flags.request_sophie_new_student },
                { label: "Bubble Tension", done: flags.sophie_midterm_tension_resolved || flags.sophie_bridge_plan || flags.sophie_safe_bubble_choice },
                { label: "Orientation Guide", done: flags.sophie_orientation_committee }
            ]
        },
        {
            name: "Neighbor Li",
            stages: [
                { label: "Dorm Map", done: flags.contact_neighbor_li_talk_1 || flags.wechat_neighbor_li_added },
                { label: "Local Trust", done: flags.neighbor_li_local_trust || flags.request_neighbor_li_parcel },
                { label: "Boundary Repair", done: flags.neighbor_li_midterm_tension_resolved || flags.neighbor_li_boundary_repaired || flags.neighbor_li_boundary_avoided },
                { label: "Festival Invite", done: flags.neighbor_li_festival_invite }
            ]
        },
        {
            name: "Uncle Wang",
            stages: [
                { label: "Stall Talk", done: flags.contact_uncle_wang_talk_1 || flags.met_uncle_wang },
                { label: "Neighborhood Story", done: flags.uncle_wang_neighborhood_story || flags.request_uncle_wang_order_help },
                { label: "Real Reason", done: flags.uncle_wang_midterm_tension_resolved || flags.uncle_wang_honest_answer || flags.uncle_wang_polite_answer },
                { label: "Regular Table", done: flags.uncle_wang_regular }
            ]
        },
        {
            name: "Manager Zhang",
            stages: [
                { label: "Career Chat", done: flags.contact_manager_zhang_talk_1 || flags.met_manager_zhang },
                { label: "Career Trust", done: flags.manager_zhang_career_trust || flags.request_manager_zhang_answer },
                { label: "Boundary Lesson", done: flags.manager_zhang_midterm_tension_resolved || flags.manager_zhang_boundaries_accepted || flags.career_shortcut_temptation },
                { label: "Referral", done: flags.manager_zhang_referral_ready }
            ]
        },
        {
            name: "Xiao Chen",
            stages: [
                { label: "Market Walk", done: flags.contact_xiao_chen_talk_1 || flags.wechat_xiao_chen_added },
                { label: "Prototype Trust", done: flags.xiao_chen_city_prototype || flags.request_xiao_chen_onboarding },
                { label: "Reliability Conflict", done: flags.xiao_chen_midterm_tension_resolved || flags.xiao_chen_responsible_pace || flags.city_speed_over_care },
                { label: "Demo Day", done: flags.xiao_chen_demo_day }
            ]
        }
    ];

    return arcs.map(arc => {
        const rel = relationships[arc.name] || {};
        const completedStages = arc.stages.filter(stage => stage.done).length;
        return {
            ...arc,
            completedStages,
            bond: rel.friendship || 0,
            stageLabel: completedStages >= 4 ? "Complete" : completedStages >= 3 ? "Conflict" : completedStages >= 2 ? "Trust" : completedStages >= 1 ? "Contact" : "Unknown"
        };
    });
}

function getRoutePlayPanels(state) {
    const flags = state.flags || {};
    const routeCommitments = state.routeCommitments || {};
    const lastChecks = state.lifeChecks?.history || [];
    const findLatest = (ids) => [...lastChecks].reverse().find(check => ids.includes(check.id));

    const panels = [
        {
            id: "academic",
            icon: "📚",
            title: "Academic Portfolio",
            desc: "Office hours, research notes, plain explanations, and a final proof of academic growth.",
            commitment: routeCommitments.academic || 0,
            latestCheck: findLatest(["lin_plain_explanation", "lin_concise_answer", "mei_field_note_blind_spots", "mei_research_memo"]),
            steps: [
                { label: "Professor method", done: flags.contact_professor_lin_talk_1 || flags.lin_academic_method },
                { label: "Plain explanation", done: flags.request_professor_lin_class_question || flags.lin_explanation_check_passed },
                { label: "Research notes", done: flags.request_dr_mei_field_notes || flags.mei_blind_spot_check_passed },
                { label: "Portfolio index", done: flags.academic_portfolio_indexed || flags.academic_portfolio_check_passed || flags.dr_mei_project_commitment || flags.ending_researcher || flags.ending_scholar }
            ]
        },
        {
            id: "career",
            icon: "💼",
            title: "Internship Dossier",
            desc: "Evidence-based answers, legal boundaries, referrals, and an internship path that can survive scrutiny.",
            commitment: routeCommitments.career || 0,
            latestCheck: findLatest(["manager_evidence_answer", "manager_confidence_boundary"]),
            steps: [
                { label: "Career chat", done: flags.contact_manager_zhang_talk_1 || flags.met_manager_zhang },
                { label: "Evidence answer", done: flags.manager_zhang_evidence_answer || flags.manager_evidence_check_passed },
                { label: "Boundary lesson", done: flags.manager_zhang_boundaries_accepted || flags.manager_boundary_check_passed },
                { label: "Internship dossier", done: flags.internship_dossier_ready || flags.internship_dossier_check_passed || flags.manager_zhang_referral_ready || flags.legal_internship_ready }
            ]
        },
        {
            id: "local",
            icon: "🏙️",
            title: "Neighborhood Map",
            desc: "Unwritten dorm rules, practical Chinese, parcel diplomacy, and the places that start recognizing you.",
            commitment: routeCommitments.local || 0,
            latestCheck: findLatest(["neighbor_parcel_mediation", "neighbor_parcel_overreach", "uncle_wang_order_bridge", "uncle_wang_teach_sentence"]),
            steps: [
                { label: "Dorm map", done: flags.contact_neighbor_li_talk_1 || flags.neighbor_li_local_trust },
                { label: "Parcel mediation", done: flags.request_neighbor_li_parcel || flags.neighbor_parcel_check_passed },
                { label: "Order bridge", done: flags.request_uncle_wang_order_help || flags.wang_order_check_passed },
                { label: "Neighborhood map", done: flags.neighborhood_map_indexed || flags.neighborhood_map_check_passed || flags.uncle_wang_regular || flags.ending_local_insider }
            ]
        },
        {
            id: "intl",
            icon: "💬",
            title: "Support Circle Guide",
            desc: "Arrival support, WeChat repair, newcomer help, and an international-student guide that becomes infrastructure.",
            commitment: routeCommitments.intl || 0,
            latestCheck: findLatest(["registration_senior_checklist"]),
            steps: [
                { label: "Private check-in", done: flags.contact_sophie_talk_1 || flags.wechat_sophie_added },
                { label: "Arrival rescue", done: flags.request_sophie_new_student || flags.sophie_arrival_helper },
                { label: "Support circle", done: flags.sophie_support_circle || flags.wechat_repair_messages_sent },
                { label: "Guide chapter", done: flags.support_guide_chapter_ready || flags.support_guide_check_passed || flags.sophie_orientation_committee || flags.ending_influencer }
            ]
        },
        {
            id: "city",
            icon: "📱",
            title: "Shanghai Prototype",
            desc: "City apps, user tests, product reliability, and the student-service idea Xiao Chen keeps sharpening.",
            commitment: routeCommitments.city || 0,
            latestCheck: findLatest(["registration_office_rhythm", "registration_improv"]),
            steps: [
                { label: "City setup", done: flags.first_didi_used || flags.first_taobao_used || flags.city_data_pack_used },
                { label: "Market walk", done: flags.contact_xiao_chen_talk_1 || flags.xiao_chen_city_prototype },
                { label: "Onboarding test", done: flags.request_xiao_chen_onboarding || flags.xiao_chen_onboarding_clear },
                { label: "Telemetry board", done: flags.prototype_telemetry_board || flags.prototype_telemetry_check_passed || flags.xiao_chen_demo_day || flags.ending_entrepreneur }
            ]
        },
        {
            id: "survival",
            icon: "¥",
            title: "Budget Ledger",
            desc: "Housing costs, emergency buffers, recovery weeks, and the unglamorous math that keeps the year playable.",
            commitment: routeCommitments.survival || 0,
            latestCheck: findLatest(["visa_document_stack", "visa_document_recovery"]),
            steps: [
                { label: "Funding plan", done: flags.finance_scholarship || flags.finance_rich || flags.finance_working },
                { label: "Housing choice", done: flags.decision_e2_housing || flags.housing_choice },
                { label: "Emergency response", done: flags.emergency_funding_used || flags.forced_recovery_used },
                { label: "Budget ledger", done: flags.budget_ledger_audited || flags.budget_ledger_check_passed || flags.ending_quiet_return || flags.ending_out_of_money || flags.ending_scholar || flags.ending_diplomat || flags.ending_local_insider }
            ]
        }
    ];

    return panels.map(panel => ({
        ...panel,
        completedSteps: panel.steps.filter(step => step.done).length
    }));
}

function getWeChatPriorityMessages(state) {
    const flags = state.flags || {};
    const relationships = state.relationships || {};
    const phase = state.phase;
    const turn = state.turn || 1;
    if (phase !== "In-China") return [];

    const messages = Object.keys(relationships)
        .map(name => {
            const meetup = getWeChatMeetup(name, flags, phase, turn);
            if (!meetup) return null;
            const meta = getContactMeta(name);
            const stage = getRelationshipStage(name, relationships[name] || {}, flags);
            return {
                from: name,
                emoji: meta.emoji,
                route: meta.route,
                nodeId: meetup.nodeId,
                cost: meetup.cost || 0,
                effects: meetup.effects || {},
                actionLabel: meetup.label,
                stage: stage.label,
                preview: getWeChatMessagePreview(name, meetup.nodeId, flags)
            };
        })
        .filter(Boolean);

    return messages.slice(0, 6);
}

function getWeChatMessagePreview(name, nodeId) {
    const previews = {
        event_contact_professor_lin_talk_1: "Professor Lin: Office hours. Bring one honest problem, not three decorative ones.",
        event_request_professor_lin_class_question: "Professor Lin: A classmate's question may expose your own gap. Useful.",
        event_contact_dr_mei_talk_1: "Dr. Mei: Coffee is acceptable. Vague fascination is not.",
        event_request_dr_mei_field_notes: "Dr. Mei: Read these notes for what they failed to notice.",
        event_contact_sophie_talk_1: "Sophie: Quick check-in. Real answer preferred over brochure answer.",
        event_request_sophie_new_student: "Sophie: A new student is spiraling at the pickup point. Help?",
        event_contact_neighbor_li_talk_1: "Neighbor Li: You need the dorm map before the dorm maps you.",
        event_request_neighbor_li_parcel: "Neighbor Li: Parcel situation in the hallway. Normal is enough.",
        event_contact_uncle_wang_talk_1: "Uncle Wang: Come before the smoke gets too loud.",
        event_request_uncle_wang_order_help: "Uncle Wang: Help this student order without making them feel small.",
        event_contact_manager_zhang_talk_1: "Manager Zhang: Fifteen minutes. One real question.",
        event_request_manager_zhang_answer: "Manager Zhang: Your answer is better. Still too soft.",
        event_contact_xiao_chen_talk_1: "Xiao Chen: Campus complaints are unpaid market research.",
        event_request_xiao_chen_onboarding: "Xiao Chen: Too many words? Honesty first."
    };

    return previews[nodeId] || `${name}: There is a conversation waiting.`;
}

function getContactMeta(name) {
    return {
        "Professor Lin": { emoji: "👨‍🏫", desc: "Academic Mentor", route: "Academic" },
        "Dr. Mei": { emoji: "👩‍🏫", desc: "Research Advisor", route: "Academic" },
        "Sophie": { emoji: "👱‍♀️", desc: "International Student Mirror", route: "International" },
        "Neighbor Li": { emoji: "🧑‍🎓", desc: "Dorm Neighbor", route: "Local" },
        "Uncle Wang": { emoji: "👨🏽‍🍳", desc: "Neighborhood Regular", route: "Local" },
        "Manager Zhang": { emoji: "👔", desc: "Corporate Recruiter", route: "Career" },
        "Xiao Chen": { emoji: "🧑‍💻", desc: "Campus Builder", route: "Shanghai" },
        "Family": { emoji: "🏠", desc: "Home Country Support", route: "Origin" }
    }[name] || { emoji: "👤", desc: "Acquaintance", route: "General" };
}

function getStageOrder(label) {
    return {
        Contact: 1,
        Trust: 2,
        Tension: 3,
        Commitment: 4
    }[label] || 0;
}

function getRelationshipStage(name, data, flags) {
    const friendship = data.friendship || 0;
    const commitmentFlags = {
        "Professor Lin": flags.lin_recommendation_ready,
        "Dr. Mei": flags.dr_mei_project_commitment,
        "Sophie": flags.sophie_orientation_committee,
        "Neighbor Li": flags.neighbor_li_festival_invite,
        "Uncle Wang": flags.uncle_wang_regular,
        "Manager Zhang": flags.manager_zhang_referral_ready,
        "Xiao Chen": flags.xiao_chen_demo_day
    };
    const tensionFlags = {
        "Professor Lin": flags.lin_midterm_tension_resolved,
        "Dr. Mei": flags.dr_mei_midterm_tension_resolved,
        "Sophie": flags.sophie_midterm_tension_resolved,
        "Neighbor Li": flags.neighbor_li_midterm_tension_resolved,
        "Uncle Wang": flags.uncle_wang_midterm_tension_resolved,
        "Manager Zhang": flags.manager_zhang_midterm_tension_resolved,
        "Xiao Chen": flags.xiao_chen_midterm_tension_resolved
    };
    const trustFlags = {
        "Professor Lin": flags.lin_academic_method,
        "Dr. Mei": flags.dr_mei_project_trust,
        "Sophie": flags.sophie_support_circle,
        "Neighbor Li": flags.neighbor_li_local_trust,
        "Uncle Wang": flags.uncle_wang_neighborhood_story,
        "Manager Zhang": flags.manager_zhang_career_trust,
        "Xiao Chen": flags.xiao_chen_city_prototype
    };

    if (commitmentFlags[name]) {
        return { label: "Commitment", order: 4, className: "bg-amber-50 border-amber-300 text-amber-700", barClass: "bg-amber-400" };
    }
    if (tensionFlags[name]) {
        return { label: "Tension Resolved", order: 3, className: "bg-orange-50 border-orange-300 text-orange-700", barClass: "bg-orange-400" };
    }
    if (trustFlags[name] || friendship >= 12) {
        return { label: "Trust", order: 2, className: "bg-sky-50 border-sky-300 text-sky-700", barClass: "bg-sky-400" };
    }
    if (friendship > 0) {
        return { label: "Contact", order: 1, className: "bg-emerald-50 border-emerald-300 text-emerald-700", barClass: "bg-emerald-400" };
    }
    return { label: "Unknown", order: 0, className: "bg-gray-50 border-gray-300 text-gray-500", barClass: "bg-gray-300" };
}

function getRecentInteraction(name, flags) {
    const notes = {
        "Professor Lin": [
            [flags.lin_recommendation_ready, "He is willing to attach his name to your habits."],
            [flags.lin_feedback_repaired, "You turned blunt feedback into a better working method."],
            [flags.lin_feedback_avoided, "You recovered privately after his draft comments."],
            [flags.request_professor_lin_class_question, "He trusted you to explain a difficult class question plainly."],
            [flags.contact_professor_lin_talk_1, "You booked twenty honest minutes instead of performing competence."],
            [flags.academic_empty_lecture, "You stayed for the almost-empty lecture and asked the real question."],
            [flags.lin_academic_method, "He helped you rebuild your academic method."],
            [flags.met_professor_lin_on_campus, "Your first Minghai class turned him from an application name into a real professor."]
        ],
        "Dr. Mei": [
            [flags.dr_mei_project_commitment, "You joined the harder research question."],
            [flags.dr_mei_ethics_reframed, "You reframed the project around people, not just data."],
            [flags.dr_mei_efficiency_choice, "You kept the research scope efficient and narrow."],
            [flags.dr_mei_field_note_care, "You marked what the field notes failed to notice."],
            [flags.request_dr_mei_field_notes, "She asked you to read messy notes without beautifying them."],
            [flags.dr_mei_ethics_seed, "Over coffee, she pushed you to ask who your research might turn into an example."],
            [flags.dr_mei_observation_notebook, "Over coffee, she made Shanghai's contradictions more specific."],
            [flags.dr_mei_project_trust, "She trusts you with a real research contradiction."],
            [flags.dr_mei_followup_ready, "Her reading list turned a nervous question into a possible research path."],
            [flags.met_dr_mei, "You first met her after a research talk, when one specific question earned a real reply."]
        ],
        "Sophie": [
            [flags.sophie_orientation_committee, "Your support circle is becoming orientation infrastructure."],
            [flags.sophie_bridge_plan, "You planned a bridge beyond the international bubble."],
            [flags.sophie_safe_bubble_choice, "You protected the group as a safe place for now."],
            [flags.sophie_arrival_helper, "She trusted you with a new student's arrival spiral."],
            [flags.request_sophie_new_student, "You helped turn someone else's panic into steps."],
            [flags.contact_sophie_talk_1, "She asked whether you were okay, or only international-student okay."],
            [flags.intl_common_room_meal, "You helped make the common-room meal feel like a temporary home."],
            [flags.sophie_support_circle, "You designed support before people fall apart."],
            [flags.wechat_sophie_added, "You first added her at orientation, when the group chats stopped being abstract."]
        ],
        "Neighbor Li": [
            [flags.neighbor_li_festival_invite, "You were trusted with neighborhood festival prep."],
            [flags.neighbor_li_boundary_repaired, "You repaired a dorm boundary misunderstanding."],
            [flags.neighbor_li_boundary_avoided, "You chose politeness over direct repair."],
            [flags.neighbor_li_parcel_mediator, "Li let you help mediate a hallway parcel problem."],
            [flags.request_neighbor_li_parcel, "The dorm hallway trusted you with a small practical crisis."],
            [flags.neighbor_li_errand_promise, "You promised to help with the next hallway errand."],
            [flags.neighbor_li_dorm_map, "Li trusted you with the dorm's unwritten map."],
            [flags.local_rain_gate, "You helped keep the rainy dorm gate moving."],
            [flags.neighbor_li_local_trust, "You handled a dorm misunderstanding with care."],
            [flags.wechat_neighbor_li_added, "Your dorm floor became less mysterious after Li explained the unwritten rules."]
        ],
        "Uncle Wang": [
            [flags.uncle_wang_regular, "His table has become part of your weekly rhythm."],
            [flags.uncle_wang_honest_answer, "You answered why you came to China honestly."],
            [flags.uncle_wang_polite_answer, "You gave the safe answer and kept some distance."],
            [flags.uncle_wang_order_bridge, "He trusted you to help another student order without embarrassment."],
            [flags.request_uncle_wang_order_help, "A confusing order became a small bridge at the stall."],
            [flags.uncle_wang_neighborhood_lesson, "Before the rush, he told you what students misunderstand about the neighborhood."],
            [flags.uncle_wang_ordering_practice, "He helped you practice ordering for the next student who freezes."],
            [flags.uncle_wang_neighborhood_story, "He gave the neighborhood more context than any guidebook."],
            [flags.met_uncle_wang, "You first found his skewer stall by following smoke, laughter, and hungry Minghai students."]
        ],
        "Manager Zhang": [
            [flags.manager_zhang_referral_ready, "A real referral path is open, with boundaries attached."],
            [flags.career_shortcut_repaired, "You repaired the shortcut impression before it became your reputation."],
            [flags.career_mock_interview, "A brutal mock interview made your story more specific."],
            [flags.manager_zhang_boundaries_accepted, "You accepted that relationships and boundaries both matter."],
            [flags.career_shortcut_temptation, "You felt the pull of faster introductions and shortcuts."],
            [flags.manager_zhang_evidence_answer, "You rewrote the interview answer around evidence instead of atmosphere."],
            [flags.request_manager_zhang_answer, "He asked for a sharper answer because vague confidence was not enough."],
            [flags.manager_zhang_interview_risks, "He told you why international students fail interviews when the answers stay too general."],
            [flags.manager_zhang_usefulness_frame, "He pushed you to become useful before asking for opportunity."],
            [flags.manager_zhang_career_trust, "He pushed you to look useful, not decorative."],
            [flags.manager_zhang_followup_ready, "A careful follow-up turned his panel into an actual checklist."],
            [flags.met_manager_zhang, "You first met him after a recruiting panel, resume in hand and timing suddenly important."]
        ],
        "Xiao Chen": [
            [flags.xiao_chen_demo_day, "You tested the project in front of real feedback."],
            [flags.city_reliability_repaired, "You repaired trust in the prototype before chasing growth."],
            [flags.city_reliability_debt, "The fast launch left reliability debt behind."],
            [flags.city_qr_complaint_night, "You read the complaint screenshots instead of defending the idea."],
            [flags.xiao_chen_responsible_pace, "You slowed down until the service was reliable."],
            [flags.city_speed_over_care, "You chose Shanghai speed and accepted the mess."],
            [flags.xiao_chen_onboarding_clear, "You cut the onboarding screen until the first task was clear."],
            [flags.request_xiao_chen_onboarding, "He asked you to test the copy before launch."],
            [flags.xiao_chen_user_interviews, "You walked the campus market and listened before pitching."],
            [flags.xiao_chen_fast_pitch_seed, "You let him challenge a quick idea before it became fantasy."],
            [flags.xiao_chen_city_prototype, "You learned how to argue about the prototype honestly."],
            [flags.wechat_xiao_chen_added, "You first saved his contact after he treated campus like a map of small systems."]
        ],
        "Family": [
            [flags.decision_e2_farewell, "Home is no longer just a place. It is part of the cost of leaving."],
            [flags.accepted_offer, "They watched the China plan become real."]
        ]
    }[name] || [];

    const found = notes.find(([condition]) => condition);
    return found ? found[1] : "No major story beat yet. Keep showing up.";
}

function ArcadeGameButton({ id, title, emoji, flags, onReplay }) {
    const isUnlocked = flags[`unlocked_minigame_${id}`];

    if (!isUnlocked) {
        return (
            <div className="bg-slate-800/30 border border-slate-700/50 p-3 rounded-xl flex items-center justify-between opacity-50 grayscale">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xl">{emoji}</div>
                    <div className="font-bold text-slate-500 text-sm">???</div>
                </div>
                <div className="text-slate-600 text-lg">🔒</div>
            </div>
        );
    }

    return (
        <button
            onClick={() => onReplay(id)}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-purple-500 p-3 rounded-xl flex items-center justify-between transition-all hover:scale-105 group text-left"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-900/50 group-hover:bg-purple-600 rounded-lg flex items-center justify-center text-xl transition-colors">{emoji}</div>
                <div className="font-bold text-slate-200 group-hover:text-white transition-colors text-sm">{title}</div>
            </div>
            <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold text-sm">PLAY ▶</div>
        </button>
    );
}

function RideCard({ title, cost, energyGain, desc, disabled, onSelect, onMessage }) {
    const handleSelect = () => {
        const result = onSelect?.();
        if (result?.message) onMessage?.(result.message);
    };
    return (
        <div className="rounded-xl border border-yellow-500/30 bg-slate-900/70 p-4 shadow-xl transition-all hover:border-yellow-400/60">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-400/30 bg-yellow-400/10 text-2xl">🚕</div>
                    <div>
                        <h3 className="font-bold text-yellow-100">{title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">{desc}</p>
                        <div className="mt-2 flex gap-2">
                            <span className="rounded bg-rose-900/40 px-1.5 py-0.5 font-mono text-[10px] text-rose-300">-¥{cost}</span>
                            <span className="rounded bg-teal-900/40 px-1.5 py-0.5 font-mono text-[10px] text-teal-300">+{energyGain} Energy</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={disabled ? null : handleSelect}
                    disabled={disabled}
                    className={`w-full shrink-0 rounded-lg px-4 py-2 text-sm font-bold transition-all sm:w-auto ${disabled ? 'cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-yellow-400 text-slate-950 hover:-translate-y-0.5 hover:bg-yellow-300'}`}
                >
                    {disabled ? 'Unavailable' : 'Call Ride'}
                </button>
            </div>
        </div>
    );
}

function DidiDestinationCard({ title, cost, desc, disabled, onSelect }) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-yellow-400/20 bg-slate-900/80 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="font-bold text-yellow-100">{title}</div>
                <p className="mt-1 text-xs leading-snug text-slate-400">{desc}</p>
                <div className="mt-2 rounded bg-rose-900/40 px-1.5 py-0.5 font-mono text-[10px] text-rose-300 inline-block">-¥{cost}</div>
            </div>
            <button
                onClick={disabled ? null : onSelect}
                disabled={disabled}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${disabled ? 'cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-yellow-400 text-slate-950 hover:bg-yellow-300'}`}
            >
                Start Scene
            </button>
        </div>
    );
}

function getHousingOptions() {
    return [
        {
            id: "campus_dorm",
            title: "Minghai Dorm",
            deposit: 0,
            weeklyRent: 180,
            commute: "5 minutes",
            stats: { energy: 8, culture: -1 },
            tags: ["Lowest friction", "Dorm rules", "Close to class"],
            desc: "The safest first address: simple, supervised, close to class, and sometimes too close to everyone else's noise."
        },
        {
            id: "shared_flat",
            title: "Shared Flat",
            deposit: 1500,
            weeklyRent: 420,
            commute: "25 minutes",
            stats: { culture: 4, energy: -3 },
            tags: ["Roommates", "More city", "Moderate rent"],
            desc: "A shared apartment near campus. More privacy than the dorm, more negotiation than you expected."
        },
        {
            id: "studio",
            title: "Small Studio",
            deposit: 3200,
            weeklyRent: 760,
            commute: "35 minutes",
            stats: { energy: 5, culture: 2 },
            tags: ["Privacy", "High rent", "Longer commute"],
            desc: "A tiny room with a door that is fully yours. The silence helps, but the rent starts every month with a raised eyebrow."
        }
    ];
}

function MapDestinationCard({ title, meta, desc, disabled, onSelect }) {
    return (
        <div className="flex flex-col justify-between rounded-xl border border-sky-400/20 bg-slate-900/80 p-4 shadow-xl">
            <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">{meta}</div>
                <h3 className="mt-1 font-black text-sky-50">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{desc}</p>
            </div>
            <button
                onClick={disabled ? null : onSelect}
                disabled={disabled}
                className={`mt-4 rounded-lg px-4 py-2 text-xs font-bold transition-all ${disabled ? 'cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-sky-400 text-slate-950 hover:-translate-y-0.5 hover:bg-sky-300'}`}
            >
                {disabled ? 'Locked' : 'Open'}
            </button>
        </div>
    );
}

function HousingOptionCard({ option, selected, disabled, onSelect }) {
    return (
        <div className={`flex min-h-[300px] flex-col rounded-2xl border p-4 shadow-xl transition-all ${selected ? 'border-lime-300 bg-lime-400/15' : 'border-lime-400/20 bg-slate-900/80 hover:border-lime-300/50'}`}>
            <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime-300">{option.commute}</div>
                    <h3 className="mt-1 text-lg font-black text-lime-50">{option.title}</h3>
                </div>
                <div className="rounded-xl bg-slate-950/70 px-3 py-2 text-right font-mono">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Deposit</div>
                    <div className="font-black text-lime-100">RMB {option.deposit.toLocaleString()}</div>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">{option.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {option.tags.map(tag => (
                    <span key={tag} className="rounded-full border border-lime-300/20 bg-lime-300/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-lime-100">{tag}</span>
                ))}
            </div>
            <div className="mt-auto pt-5">
                <div className="mb-3 rounded-xl bg-slate-950/55 p-3 text-xs text-slate-300">
                    Weekly rent estimate: <span className="font-mono font-black text-lime-200">RMB {option.weeklyRent}</span>
                </div>
                <button
                    onClick={disabled || selected ? null : onSelect}
                    disabled={disabled || selected}
                    className={`w-full rounded-lg px-4 py-2 text-sm font-bold transition-all ${selected ? 'cursor-not-allowed bg-lime-300 text-slate-950' : disabled ? 'cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-lime-400 text-slate-950 hover:-translate-y-0.5 hover:bg-lime-300'}`}
                >
                    {selected ? 'Selected' : disabled ? 'Unavailable' : 'Choose Address'}
                </button>
            </div>
        </div>
    );
}

function ServiceOrderCard({ title, cost, desc, disabled, onSelect }) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-orange-400/20 bg-slate-900/80 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="font-bold text-orange-100">{title}</div>
                <p className="mt-1 text-xs leading-snug text-slate-400">{desc}</p>
                <div className="mt-2 rounded bg-rose-900/40 px-1.5 py-0.5 font-mono text-[10px] text-rose-300 inline-block">-¥{cost}</div>
            </div>
            <button
                onClick={disabled ? null : onSelect}
                disabled={disabled}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${disabled ? 'cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
            >
                Order
            </button>
        </div>
    );
}

function CalendarCard({ item, onPin, pinned }) {
    const tone = {
        urgent: "border-rose-400/40 bg-rose-500/10 text-rose-100",
        soon: "border-amber-400/40 bg-amber-500/10 text-amber-100",
        ready: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
        future: "border-slate-700 bg-slate-900/80 text-slate-300"
    }[item.tone] || "border-slate-700 bg-slate-900/80 text-slate-300";

    return (
        <div className={`rounded-2xl border p-4 shadow-xl ${tone}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">{item.weekLabel}</div>
                    <h3 className="mt-1 font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed opacity-80">{item.desc}</p>
                </div>
                <button
                    onClick={onPin}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${pinned ? 'bg-white text-slate-950' : 'bg-slate-950/60 text-white hover:bg-slate-950'}`}
                >
                    {pinned ? 'Pinned' : 'Pin Focus'}
                </button>
            </div>
        </div>
    );
}

function JobCard({ id, title, emoji, income, energyCost, desc, onSelect, disabled }) {
    return (
        <div className={`border p-4 rounded-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-800/50 border-slate-700/50 hover:border-slate-500`}>
            <div className="flex items-start gap-3 flex-1">
                <div className="text-3xl bg-slate-900/50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-slate-700/50">{emoji}</div>
                <div>
                    <h3 className="font-bold text-base text-slate-200">{title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                    <div className="flex gap-2 mt-2">
                        <span className="text-[10px] font-mono bg-emerald-900/40 text-emerald-400 px-1.5 py-0.5 rounded">+{income} RMB</span>
                        <span className="text-[10px] font-mono bg-rose-900/40 text-rose-400 px-1.5 py-0.5 rounded">-{energyCost} Energy</span>
                    </div>
                </div>
            </div>
            <button
                onClick={disabled ? null : onSelect}
                disabled={disabled}
                className={`w-full md:w-auto px-4 py-1.5 rounded-lg font-bold text-sm transition-all shrink-0 ${
                    disabled
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-500 hover:-translate-y-0.5'
                }`}
            >
                {disabled ? 'Already Used This Week' : 'Start Task'}
            </button>
        </div>
    );
}

function ItemCard({ id, title, emoji, cost, desc, isOwned, wealth, onBuy }) {
    const canAfford = wealth >= cost;

    return (
        <div className={`p-4 rounded-xl border flex flex-col justify-between h-full transition-all ${isOwned ? 'bg-slate-800/80 border-orange-500/50 opacity-80' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-500'}`}>
            <div>
                <div className="flex justify-between items-start mb-2">
                    <div className="text-3xl bg-slate-900/50 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-700/50">{emoji}</div>
                    <div className="font-mono font-bold text-orange-400 text-sm">¥{cost}</div>
                </div>
                <h3 className="font-bold text-slate-200 leading-tight mb-1 text-sm">{title}</h3>
                <p className="text-xs text-slate-400 mb-3">{desc}</p>
            </div>

            <button
                onClick={onBuy}
                disabled={isOwned || (!canAfford && !isOwned)}
                className={`w-full py-1.5 rounded-lg font-bold text-sm transition-all ${isOwned ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : (!canAfford ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-500')}`}
            >
                {isOwned ? '✓ Owned' : 'Buy Now'}
            </button>
        </div>
    );
}

function ShanghaiPin({ name, top, left, active }) {
    return (
        <div className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ top, left }}>
            <div className={`h-3 w-3 rounded-full border-2 ${active ? 'border-white bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.8)]' : 'border-sky-100 bg-sky-400'}`}></div>
            <div className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${active ? 'border-amber-200/60 bg-amber-300 text-slate-950' : 'border-white/10 bg-slate-950/75 text-slate-200'}`}>
                {name}
            </div>
        </div>
    );
}

function CityPin({ name, top, left, active }) {
    return (
        <div className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform cursor-pointer group z-10" style={{ top, left }}>
            <div className={`text-sm font-bold px-2 py-0.5 rounded shadow whitespace-nowrap mb-1 z-20 ${active ? 'bg-sky-500 text-white opacity-100' : 'bg-slate-800 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                {name}
            </div>
            <div className="relative">
                <div className={`text-2xl drop-shadow-md z-20 relative ${active ? 'animate-bounce' : 'grayscale group-hover:grayscale-0'}`}>📍</div>
                {active && (
                    <div className="absolute -inset-2 top-2 bg-sky-400/50 rounded-full blur-md animate-ping z-10"></div>
                )}
            </div>
        </div>
    );
}
