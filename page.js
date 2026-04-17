"use client";

import React, { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import StoryPanel from './components/StoryPanel';
import { gameEngine } from './engine/GameState';
import { EventSystem } from './engine/EventSystem';
import { epoch1Events } from './data/epoch1';
import { epoch2Events } from './data/epoch2';
import { epoch3Events } from './data/epoch3';
import { gameNodes } from './data/hubData';
import TabletInterface from './components/TabletInterface';
import MiniGameOverlay from './components/MiniGames';

const QuestTracker = ({ state }) => {
    let questTitle = "Explore the Campus";
    let questDesc = "No urgent deadlines right now.";
    
    if (!state.flags.completed_application && state.phase === "Application") {
        questTitle = "Submit Application";
        questDesc = "Gather documents and apply before Week 8.";
    } else if (state.phase === "Application" && state.flags.completed_application) {
         questTitle = "The Waiting Game";
         questDesc = "Wait to see if you are accepted.";
    } else if (state.phase === "Pre-Departure" && state.turn < 16) {
        questTitle = "Prepare for Departure";
        questDesc = "Say your goodbyes. Flight boards at Week 16.";
    } else if (state.turn === 16) {
        questTitle = "Boarding Call";
        questDesc = "It's time to fly to China!";
    } else if (!state.flags.decision_e3_taobao && state.location === "Shanghai" && state.phase === "In-China" && state.turn < 20) {
        questTitle = "Settle In";
        questDesc = "Buy essentials on Taobao for your dorm.";
    } else if (state.phase === "In-China" && state.turn < 24) {
        questTitle = "Midterms Approaching";
        questDesc = "Prepare for examinations at Week 24.";
    } else if (state.phase === "In-China" && state.turn < 32) {
        questTitle = "Final Defense";
        questDesc = "Get ready for the final evaluation at Week 32.";
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

export default function SimulatorPage() {
  const [gameState, setGameState] = useState(gameEngine.getState());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTabletOpen, setIsTabletOpen] = useState(false);
  const [replayGameId, setReplayGameId] = useState(null);
  const [gigGameId, setGigGameId] = useState(null);
  // Combine all event nodes
  const allEvents = { ...epoch1Events, ...epoch2Events, ...epoch3Events, ...gameNodes };

  const [events] = useState(() => {
    const e = new EventSystem(gameEngine);
    e.loadEvents(allEvents);
    return e;
  });

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
    let nextNode = events.executeChoice(choice);
    
    if (choice.action === "reset_game") {
        gameEngine.reset();
    }
    
    // Explicit action trigger
    if (choice.action === "advance_turn") {
        gameEngine.advanceTurn();
    }
    
    // Enforce Game Over and Epoch transitions
    const state = gameEngine.getState();
    if (state.stats.sanity <= 0) nextNode = "game_over_sanity";
    else if (state.stats.wealth <= 0) nextNode = "game_over_wealth";
    else if (state.turn === 8 && choice.action === "advance_turn") nextNode = "pre_departure_start";
    else if (state.turn === 16 && choice.action === "advance_turn") nextNode = "in_china_start";
    else if (state.turn === 24 && choice.action === "advance_turn") nextNode = "epoch3_midterm";
    else if (state.turn === 28 && choice.action === "advance_turn") nextNode = "epoch3_internship";
    else if (state.turn === 32 && choice.action === "advance_turn") nextNode = "epoch3_final";
    
    // Slight delay for effect
    setTimeout(() => {
        gameEngine.setCurrentNode(nextNode);
    }, 150);
  };

  const handleGigComplete = (result) => {
    // Unlock for Arcade automatically
    gameEngine.setFlag(`unlocked_minigame_${gigGameId}`, true);
    
    // Mark as worked this week
    gameEngine.setFlag('has_worked_this_week', true);

    // Handle gig rewards
    if (gigGameId === 'tones') {
       if(result.win) {
           gameEngine.addTransaction(200, "Gig: English Tutor");
           gameEngine.updateStats({ sanity: -10, academics: -2 });
       } else {
           gameEngine.addTransaction(50, "Gig: English Tutor (Poor)");
           gameEngine.updateStats({ sanity: -15 });
       }
    } else if (gigGameId === 'delivery') {
       if(result.win) {
           gameEngine.addTransaction(300, "Gig: Campus Delivery");
           gameEngine.updateStats({ sanity: -15 });
       } else {
           gameEngine.updateStats({ sanity: -20 });
       }
    } else if (gigGameId === 'hongbao') {
       if(result.win) {
           gameEngine.addTransaction(150, "Gig: Flyer Distributor");
           gameEngine.updateStats({ sanity: -5 });
       } else {
           gameEngine.updateStats({ sanity: -10 });
       }
    } else if (gigGameId === 'model') {
       if(result.win) {
           gameEngine.addTransaction(500, "Gig: Taobao Model");
           gameEngine.updateStats({ sanity: -20 });
       } else {
           gameEngine.updateStats({ sanity: -25 });
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
            gameEngine.updateStats({ sanity: 15, wealth: -30 });
        } else {
            gameEngine.updateStats({ sanity: -10, wealth: -30 });
        }
    } else if (currentNode.minigame === 'tones') {
        if (result.win) {
            gameEngine.updateStats({ chinese: 5, academics: 2, sanity: -5 });
        } else {
            gameEngine.updateStats({ sanity: -10 });
        }
    } else if (currentNode.minigame === 'hongbao') {
        if (result.win) {
            gameEngine.updateStats({ wealth: 100, sanity: 10 });
        } else {
            gameEngine.updateStats({ sanity: -5 });
        }
    } else if (currentNode.minigame === 'banquet') {
        if (result.win) {
            gameEngine.updateGuanxi("professors", 10);
            gameEngine.updateStats({ sanity: -10 });
        } else {
            gameEngine.updateGuanxi("professors", -5);
            gameEngine.updateStats({ sanity: -20 });
        }
    } else if (currentNode.minigame === 'bike') {
        if (result.win) {
            gameEngine.updateStats({ digitalProficiency: 5, sanity: -5 });
        } else {
            gameEngine.updateStats({ sanity: -15 });
        }
    } else if (currentNode.minigame === 'subway' && !result.win) {
        gameEngine.updateStats({ sanity: -15 });
    }
    
    const nextNodeId = result.win ? currentNode.onWin : currentNode.onLose;
    
    setTimeout(() => {
        gameEngine.setCurrentNode(nextNodeId);
    }, 150);
  };

  const handleSave = () => {
    gameEngine.save();
    setIsMenuOpen(false);
    alert("Game saved!");
  };

  const handleLoad = () => {
    if (gameEngine.load()) {
      setIsMenuOpen(false);
      alert("Game loaded!");
    } else {
      alert("No save found.");
    }
  };

  const handleRestart = () => {
    if (confirm("Are you sure you want to restart? All unsaved progress will be lost.")) {
      gameEngine.reset();
      setIsMenuOpen(false);
    }
  };

  const handleFullscreen = () => {
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

  const currentNodeId = gameState.currentNodeId || "start";
  const currentNode = allEvents[currentNodeId];

  return (
    <div className="flex h-full w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Main area: Visual Novel */}
      <div 
         className="w-full flex flex-col relative bg-cover bg-center transition-all duration-1000 ease-in-out" 
         style={{ backgroundImage: `url("${currentNode?.bgImage || '/images/simulator/hub_bg.png'}")` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black/80 to-transparent z-40 flex items-center px-4 justify-between text-slate-200">
            <div className="flex gap-6 font-mono font-semibold ml-2 text-xs">
                <div className="text-amber-400 text-base">Week {gameState.turn} <span className="text-slate-400 font-normal ml-1 text-xs">[{gameState.phase}]</span></div>
                <div className="flex items-center gap-2">
                   <span>😌 {gameState.stats.sanity}/100</span>
                   <div className={`w-24 h-1.5 rounded-full ${gameState.stats.sanity < 30 ? "bg-red-900" : "bg-slate-700"} overflow-hidden shadow-inner`}>
                      <div className={`h-full transition-all duration-500 ease-out ${gameState.stats.sanity < 30 ? "bg-red-500" : "bg-teal-400"}`} style={{ width: `${gameState.stats.sanity}%` }}></div>
                   </div>
                </div>
                <div className="text-emerald-400">💰 ¥{gameState.stats.wealth}</div>
            </div>
        </div>

        {/* Top Menu */}
        <div className="absolute top-3 right-4 z-50">
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => setIsTabletOpen(true)}
              className="bg-sky-600/80 hover:bg-sky-500 text-white border border-sky-400 px-3 py-1.5 rounded shadow-[0_0_15px_rgba(14,165,233,0.5)] font-semibold font-mono flex items-center gap-1.5 backdrop-blur-md transition-all text-sm"
            >
              📱 SimPad
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                <div className="border-t border-slate-700 my-1"></div>
                <button onClick={handleRestart} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-slate-900">
                  🔄 Restart Game
                </button>
              </div>
            )}
          </div>
          </div>
        </div>

        <QuestTracker state={gameState} />

        {isTabletOpen && <TabletInterface state={gameState} onClose={() => setIsTabletOpen(false)} onReplayGame={(id) => setReplayGameId(id)} onPlayGig={(id) => { setIsTabletOpen(false); setGigGameId(id); }} />}

        {currentNode?.minigame && !replayGameId && !gigGameId && (
            <MiniGameOverlay gameId={currentNode.minigame} onComplete={handleMinigameComplete} />
        )}

        {replayGameId && (
            <MiniGameOverlay gameId={replayGameId} onComplete={() => setReplayGameId(null)} />
        )}

        {gigGameId && (
            <MiniGameOverlay gameId={gigGameId} onComplete={handleGigComplete} />
        )}

        <StoryPanel 
          node={currentNode} 
          state={gameState}
          onChoice={handleChoice} 
          availableChoices={events.getAvailableChoices(currentNodeId)}
        />
      </div>
    </div>
  );
}
