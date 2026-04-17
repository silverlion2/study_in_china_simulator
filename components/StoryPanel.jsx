"use client";

import React, { useState, useEffect } from 'react';

export default function StoryPanel({ node, availableChoices, onChoice }) {
  const [showChoices, setShowChoices] = useState(false);
  const [textKey, setTextKey] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    // Reset animations when node changes
    setShowChoices(false);
    setTextKey(prev => prev + 1);
    setDisplayText("");
    
    if (!node) return;
    
    // Typewriter effect
    let currentText = "";
    const fullText = node.text || "";
    let i = 0;
    
    const interval = setInterval(() => {
      currentText += fullText.charAt(i);
      setDisplayText(currentText);
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setShowChoices(true);
      }
    }, 20); // 20ms per character
    
    return () => clearInterval(interval);
  }, [node]);

  useEffect(() => {
    const handleKeyDown = (e) => {
        if (!showChoices) {
           // Skip typewriter if user presses space or enter
           if (e.key === " " || e.key === "Enter") {
             setDisplayText(node?.text || "");
             setShowChoices(true);
           }
           return;
        }
        
        // Number keys for choices
        const num = parseInt(e.key);
        if (!isNaN(num) && num > 0 && availableChoices && num <= availableChoices.length) {
            onChoice(availableChoices[num - 1]);
        }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showChoices, availableChoices, node, onChoice]);

  if (!node) return null;

  return (
    <div className="flex-1 flex flex-col justify-end p-8 pb-32 z-10 w-full max-w-4xl mx-auto">
       
      {/* Choice Menu */}
      <div className={`flex flex-col mb-8 gap-3 items-end transition-all duration-700 ${showChoices ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {availableChoices && availableChoices.length > 0 && availableChoices.map((choice, i) => (
          <button
            key={i}
            onClick={() => onChoice(choice)}
            className="bg-slate-900/90 border border-slate-700/50 hover:bg-slate-800 hover:border-amber-500 hover:text-amber-400 text-slate-200 px-6 py-4 rounded-xl text-left w-3/4 shadow-xl backdrop-blur-md transition-all group flex flex-col relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-sm opacity-50 group-hover:opacity-100 group-hover:text-amber-500 transition-all">[{i+1}]</div>
            <div className="font-semibold text-lg pl-6">{choice.text}</div>
            {choice.effects && <ChoicePreview effects={choice.effects} />}
          </button>
        ))}
      </div>

      {/* Dialogue Box */}
      <div 
         key={textKey}
         className="bg-slate-900/95 border border-slate-700 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-500 w-full"
      >
        <div className="absolute -top-4 left-6 flex gap-3">
          <div className="bg-amber-500 text-slate-900 font-bold px-4 py-1 rounded shadow-md uppercase tracking-wider text-sm">
            {node.speaker || "Narrator"}
          </div>
          {node.location && (
            <div className="bg-slate-700 text-amber-400 border border-amber-500/30 font-bold px-4 py-1 rounded shadow-md uppercase tracking-wider text-sm flex items-center gap-2">
              📍 {node.location}
            </div>
          )}
        </div>
        <p className="text-xl text-slate-100 leading-relaxed font-serif mt-2 min-h-[4rem]">
          {displayText}
          {!showChoices && <span className="inline-block w-2 bg-amber-500 opacity-50 animate-pulse ml-1">&nbsp;</span>}
        </p>
      </div>
    </div>
  );
}

function ChoicePreview({ effects }) {
   if (!effects) return null;
   
   const previews = [];
   const statNames = {
       digitalProficiency: "Digital Prod.",
       academics: "Academics",
       chinese: "Chinese",
       sanity: "Sanity",
       culture: "Culture",
       wealth: "Wealth"
   };

   if (effects.stats) {
       Object.entries(effects.stats).forEach(([k, v]) => {
          const color = v > 0 ? "text-emerald-400" : "text-red-400";
          const sign = v > 0 ? "+" : "";
          const name = statNames[k] || (k.charAt(0).toUpperCase() + k.slice(1));
          previews.push(<span key={k} className={`${color} font-mono text-xs uppercase tracking-wider`}>{name} {sign}{v}</span>);
       });
   }
   const guanxiNames = {
       admin: "Admin",
       professors: "Professors",
       localStudents: "Locals",
       intlStudents: "Intl"
   };

   if (effects.guanxi) {
       Object.entries(effects.guanxi).forEach(([k, v]) => {
          previews.push(<span key={`guanxi_${k}`} className={`text-amber-400 font-mono text-xs uppercase tracking-wider`}>Guanxi({guanxiNames[k] || k}) +{v}</span>);
       });
   }
   if (effects.flags) {
       Object.entries(effects.flags).forEach(([k, v]) => {
          previews.push(<span key={`flag_${k}`} className={`text-blue-400 font-mono text-xs uppercase tracking-wider`}>Flag: {k}</span>);
       });
   }

   if (previews.length === 0) return null;

   return (
       <div className="flex flex-wrap gap-4 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
           {previews}
       </div>
   )
}
