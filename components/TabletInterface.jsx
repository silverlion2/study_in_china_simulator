"use client";

import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { gameEngine } from '../engine/GameState';

export default function TabletInterface({ state, onClose, onReplayGame, onPlayGig }) {
  const { stats, guanxi, turn, phase, flags } = state;
  const [activeTab, setActiveTab] = useState('Story');

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
            <div className="w-full bg-slate-800 border-b border-slate-700 flex p-2 shrink-0 justify-start sm:justify-center gap-2 shadow-sm overflow-x-auto no-scrollbar">
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Story' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Story')}
                >🗺️ Story</button>
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Map' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Map')}
                >📍 Map</button>
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Stats' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Stats')}
                >📊 Stats</button>
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Wallet' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Wallet')}
                >💳 Alipay</button>
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Jobs' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Jobs')}
                >💼 Jobs</button>
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Taobao' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Taobao')}
                >🛒 Taobao</button>
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Arcade' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Arcade')}
                >🕹️ Arcade</button>
                <button 
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'Souvenirs' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                  onClick={() => setActiveTab('Souvenirs')}
                >🧲 Souvenirs</button>
            </div>

            {/* Tablet Content */}
            <div className="p-8 pb-12 flex-1 overflow-y-auto w-full">
                {activeTab === 'Stats' && (
                    <div className="max-w-xl mx-auto border border-slate-800 bg-slate-900/50 p-6 rounded-2xl shadow-xl">
                       <Dashboard state={state} />
                    </div>
                )}
                
                {activeTab === 'Story' && (
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

                {activeTab === 'Map' && (
                    <div className="max-w-2xl mx-auto flex flex-col h-full bg-blue-50/5 rounded-3xl p-4 border border-blue-900/30">
                        <h2 className="text-2xl font-bold text-sky-400 mb-4 text-center">Travel Map</h2>
                        <div className="relative w-full aspect-[4/3] bg-sky-950 rounded-2xl overflow-hidden border border-sky-800 shadow-inner flex items-center justify-center">
                            {/* The Map Background */}
                            <img src="assets/china_map.png" alt="Map of China" className="w-[90%] h-[90%] object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] opacity-90" />
                            
                            {/* City Pins (Estimated relative positioning) */}
                            <CityPin name="Beijing" top="28%" left="65%" active={state.location === 'Beijing'} />
                            <CityPin name="Shanghai" top="55%" left="82%" active={state.location === 'Shanghai'} />
                            <CityPin name="Hangzhou" top="58%" left="80%" active={state.location === 'Hangzhou'} />
                            <CityPin name="Guangzhou" top="82%" left="66%" active={state.location === 'Guangzhou'} />
                            <CityPin name="Sanya" top="95%" left="60%" active={state.location === 'Sanya'} />
                            <CityPin name="Chengdu" top="62%" left="50%" active={state.location === 'Chengdu'} />
                            <CityPin name="Xi'an" top="48%" left="58%" active={state.location === 'Xi\'an'} />
                        </div>
                        <div className="mt-6 text-center text-slate-300 text-sm bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <p>Your current location is <span className="text-sky-400 font-bold text-base px-2">{state.location}</span></p>
                            <p className="mt-1 text-slate-500 text-xs">Return to the main Hub menu to use the High-Speed Rail network.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'Wallet' && (
                    <div className="max-w-xl mx-auto">
                        <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">💳</div>
                            <h2 className="text-blue-100 font-semibold mb-1">Total Balance</h2>
                            <div className="text-4xl font-bold font-mono">¥{stats.wealth.toLocaleString()}</div>
                            <div className="mt-4 flex gap-4 text-sm font-medium">
                                <div className="bg-white/20 px-3 py-1 rounded-full text-blue-50">↓ Receive</div>
                                <div className="bg-white/20 px-3 py-1 rounded-full text-blue-50">↑ Transfer</div>
                            </div>
                        </div>

                        <h3 className="text-slate-400 font-semibold mb-4 px-2 tracking-wide uppercase text-sm">Recent Transactions</h3>
                        <div className="bg-slate-900/80 rounded-2xl border border-slate-700/50 shadow-inner overflow-hidden">
                            {(state.transactions || []).slice().reverse().map((tx, idx) => (
                                <div key={idx} className="flex justify-between items-center p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
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

                {activeTab === 'Jobs' && (
                    <div className="max-w-xl mx-auto space-y-4">
                        <div className="bg-amber-600/20 border border-amber-600/50 rounded-2xl p-6 mb-6">
                            <h2 className="text-xl font-bold text-amber-500 mb-2">Gig Economy</h2>
                            <p className="text-slate-300 text-sm">Launch into a gig to earn instant RMB. Be careful not to burn out—gigs drain sanity whether you win or lose!</p>
                        </div>

                        <JobCard 
                            id="english_tutor" title="English Tutor" emoji="🗣️" 
                            income={200} sanityCost={10} 
                            desc="Teach English to local kids via the Tonal Rhythm mini-game. Good pay but mentally exhausting."
                            disabled={flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('tones')}
                        />
                        <JobCard 
                            id="delivery_rider" title="Campus Delivery" emoji="🛵" 
                            income={300} sanityCost={15} 
                            desc="High risk, high reward. Beat the Delivery Typer game to earn big."
                            disabled={flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('delivery')}
                        />
                        <JobCard 
                            id="flyer_distributor" title="Flyer Distributor" emoji="🧧" 
                            income={150} sanityCost={5} 
                            desc="Hand out flyers in the subway. Play the Hongbao Snatch game."
                            disabled={flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('hongbao')}
                        />
                        <JobCard 
                            id="taobao_model" title="Taobao Model" emoji="📸" 
                            income={500} sanityCost={20} 
                            desc="Strike the perfect pose for an e-commerce shoot. High pay but very demanding."
                            disabled={flags.has_worked_this_week}
                            onSelect={() => onPlayGig && onPlayGig('model')}
                        />
                    </div>
                )}

                {activeTab === 'Taobao' && (
                    <div className="max-w-xl mx-auto">
                        <div className="bg-orange-600 rounded-3xl p-6 text-white shadow-xl mb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-1 tracking-tight">Taobao Mall</h2>
                                <p className="text-orange-200 text-sm">Upgrade your life in China.</p>
                            </div>
                            <div className="text-5xl">🛒</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ItemCard 
                                id="ebike" title="Electric Bike" emoji="🛵" cost={1500} 
                                desc="Reduces weekly sanity drain from walking/commuting by 1 point."
                                isOwned={state.items?.ebike}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('ebike', 1500)}
                            />
                            <ItemCard 
                                id="headphones" title="Noise-Canceling Headphones" emoji="🎧" cost={800} 
                                desc="Prevents Academics and Sanity penalties when working part-time jobs."
                                isOwned={state.items?.headphones}
                                wealth={stats.wealth}
                                onBuy={() => gameEngine.purchaseItem('headphones', 800)}
                            />
                        </div>
                    </div>
                )}
                
                {activeTab === 'Arcade' && (
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">SimPad Arcade</h2>
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

                {activeTab === 'Souvenirs' && (
                    <div className="max-w-xl mx-auto">
                        <div className="bg-pink-600 rounded-3xl p-6 text-white shadow-xl mb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-1 tracking-tight">Fridge Magnets</h2>
                                <p className="text-pink-200 text-sm">Collected from your travels around China.</p>
                            </div>
                            <div className="text-5xl">🧲</div>
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

function ArcadeGameButton({ id, title, emoji, flags, onReplay }) {
    const isUnlocked = flags[`unlocked_minigame_${id}`];
    
    if (!isUnlocked) {
        return (
            <div className="bg-slate-800/30 border border-slate-700/50 p-4 rounded-2xl flex items-center justify-between opacity-50 grayscale">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl">{emoji}</div>
                    <div className="font-bold text-slate-500">???</div>
                </div>
                <div className="text-slate-600 text-xl">🔒</div>
            </div>
        );
    }
    
    return (
        <button 
            onClick={() => onReplay(id)}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-purple-500 p-4 rounded-2xl flex items-center justify-between transition-all hover:scale-105 group text-left"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-900/50 group-hover:bg-purple-600 rounded-xl flex items-center justify-center text-2xl transition-colors">{emoji}</div>
                <div className="font-bold text-slate-200 group-hover:text-white transition-colors">{title}</div>
            </div>
            <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">PLAY ▶</div>
        </button>
    );
}

function JobCard({ id, title, emoji, income, sanityCost, desc, onSelect, disabled }) {
    return (
        <div className={`border p-5 rounded-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/50 border-slate-700/50 hover:border-slate-500`}>
            <div className="flex items-start gap-4 flex-1">
                <div className="text-4xl bg-slate-900/50 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-slate-700/50">{emoji}</div>
                <div>
                    <h3 className="font-bold text-lg text-slate-200">{title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{desc}</p>
                    <div className="flex gap-3 mt-3">
                        <span className="text-xs font-mono bg-emerald-900/40 text-emerald-400 px-2 py-1 rounded">+{income} RMB</span>
                        <span className="text-xs font-mono bg-rose-900/40 text-rose-400 px-2 py-1 rounded">-{sanityCost} Sanity</span>
                    </div>
                </div>
            </div>
            <button 
                onClick={disabled ? null : onSelect}
                disabled={disabled}
                className={`w-full md:w-auto px-6 py-2.5 rounded-xl font-bold transition-all shrink-0 ${
                    disabled 
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                        : 'bg-amber-600 text-white hover:bg-amber-500 hover:-translate-y-0.5'
                }`}
            >
                {disabled ? 'Already Worked' : 'Start Gig'}
            </button>
        </div>
    );
}

function ItemCard({ id, title, emoji, cost, desc, isOwned, wealth, onBuy }) {
    const canAfford = wealth >= cost;
    
    return (
        <div className={`p-5 rounded-2xl border flex flex-col justify-between h-full transition-all ${isOwned ? 'bg-slate-800/80 border-orange-500/50 opacity-80' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-500'}`}>
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div className="text-4xl bg-slate-900/50 w-14 h-14 rounded-xl flex items-center justify-center border border-slate-700/50">{emoji}</div>
                    <div className="font-mono font-bold text-orange-400">¥{cost}</div>
                </div>
                <h3 className="font-bold text-slate-200 leading-tight mb-2">{title}</h3>
                <p className="text-sm text-slate-400 mb-4">{desc}</p>
            </div>
            
            <button 
                onClick={onBuy}
                disabled={isOwned || (!canAfford && !isOwned)}
                className={`w-full py-2.5 rounded-xl font-bold transition-all ${isOwned ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : (!canAfford ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-500')}`}
            >
                {isOwned ? '✓ Owned' : 'Buy Now'}
            </button>
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
