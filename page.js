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

export default function SimulatorPage() {
  const [gameState, setGameState] = useState(gameEngine.getState());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTabletOpen, setIsTabletOpen] = useState(false);
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
    <div className="flex h-[100dvh] w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Main area: Visual Novel */}
      <div 
         className="w-full flex flex-col relative bg-cover bg-center transition-all duration-1000 ease-in-out" 
         style={{ backgroundImage: `url("${currentNode?.bgImage || '/images/simulator/hub_bg.png'}")` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-b from-black/80 to-transparent z-40 flex items-center px-6 justify-between text-slate-200">
            <div className="flex gap-8 font-mono font-semibold ml-2 text-sm">
                <div className="text-amber-400 text-lg">Week {gameState.turn} <span className="text-slate-400 font-normal ml-2 text-sm">[{gameState.phase}]</span></div>
                <div className="flex items-center gap-3">
                   <span>😌 {gameState.stats.sanity}/100</span>
                   <div className={`w-32 h-2.5 rounded-full ${gameState.stats.sanity < 30 ? "bg-red-900" : "bg-slate-700"} overflow-hidden shadow-inner`}>
                      <div className={`h-full transition-all duration-500 ease-out ${gameState.stats.sanity < 30 ? "bg-red-500" : "bg-teal-400"}`} style={{ width: `${gameState.stats.sanity}%` }}></div>
                   </div>
                </div>
                <div className="text-emerald-400">💰 ¥{gameState.stats.wealth}</div>
            </div>
        </div>

        {/* Top Menu */}
        <div className="absolute top-4 right-6 z-50">
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setIsTabletOpen(true)}
              className="bg-sky-600/80 hover:bg-sky-500 text-white border border-sky-400 px-4 py-2 rounded shadow-[0_0_15px_rgba(14,165,233,0.5)] font-semibold font-mono flex items-center gap-2 backdrop-blur-md transition-all"
            >
              📱 SimPad
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 px-4 py-2 rounded shadow-md font-semibold font-mono flex items-center gap-2 backdrop-blur-md transition-colors"
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

        {isTabletOpen && <TabletInterface state={gameState} onClose={() => setIsTabletOpen(false)} />}

        <StoryPanel 
          node={currentNode} 
          onChoice={handleChoice} 
          availableChoices={events.getAvailableChoices(currentNodeId)}
        />
      </div>
    </div>
  );
}
