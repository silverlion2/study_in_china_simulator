"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function StoryPanel({ node, state, availableChoices, onChoice }) {
  const [showChoices, setShowChoices] = useState(false);
  const [textKey, setTextKey] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const fullTextRef = useRef("");

  useEffect(() => {
    // Reset animations when node changes
    setShowChoices(false);
    setTextKey(prev => prev + 1);
    setDisplayText("");
    
    if (!node) return;
    
    // Typewriter effect
    let currentText = "";
    
    // Setup specific character epilogues to append if we die or finish the game
    const isEndingNode = node.choices && node.choices.some(c => c.action === "reset_game");
    let epilogues = "";
    
    if (isEndingNode && state && state.relationships) {
       let addedLines = false;
       for (const [char, rel] of Object.entries(state.relationships)) {
           let charEpilogue = "";
           const flags = state.flags || {};
           
           if (char === "Xiao Chen" && flags.xiao_chen_startup) {
               charEpilogue = `The AI startup you brainstormed with Xiao Chen received Series B funding. Xiao Chen is now the CEO of a major tech unicorn, and you still hold equity as a founding partner.`;
           } else if (char === "Sophie" && flags.sophie_dated) {
               if (rel.romance >= 50) {
                   charEpilogue = `Your whirlwind romance with Sophie survived the distance. You eventually moved in together in Paris and remain deeply in love.`;
               } else {
                   charEpilogue = `You and Sophie shared an intense, memorable romance. You ultimately went your separate ways, but you always smile when you see her aesthetic posts from Europe.`;
               }
           } else if (char === "Uncle Wang" && flags.uncle_wang_drank) {
               charEpilogue = `Uncle Wang successfully expanded his BBQ cart into a full-fledged restaurant chain. He still keeps a bottle of cheap Baijiu behind the counter specifically for when you visit.`;
           } else if (char === "Dr. Mei" && flags.dr_mei_paper) {
               charEpilogue = `You were listed as a co-author on Dr. Mei's breakthrough biomedical paper. The publication single-handedly secured your acceptance into a prestigious postgraduate program at Peking University.`;
           } else if (char === "Manager Zhang" && flags.manager_zhang_job) {
               charEpilogue = `Manager Zhang was deeply impressed by your composure and understanding of both markets. He offered you a highly lucrative Management Trainee position before you even graduated.`;
           } else {
               // Default fallbacks
               if (rel.romance >= 50) {
                   charEpilogue = `Your deep romance with ${char} blossomed into a beautiful long-term partnership. The two of you remain together to this day.`;
               } else if (rel.romance >= 20) {
                   charEpilogue = `You and ${char} shared a passionate but brief connection, eventually parting ways as fond memories.`;
               } else if (rel.friendship >= 40) {
                   charEpilogue = `You and ${char} forged an unbreakable bond. You still talk regularly, navigating your drastically different lives together.`;
               } else if (rel.friendship >= 15) {
                   charEpilogue = `You remain casual acquaintances with ${char}, occasionally liking each other's WeChat moments.`;
               }
           }
           
           if (charEpilogue) {
               epilogues += `\n\n` + charEpilogue;
               addedLines = true;
           }
       }
       if (addedLines) {
           epilogues = "\n\n--- EPILOGUES ---" + epilogues;
       }
    }

    const fullText = (node.text || "") + epilogues;
    fullTextRef.current = fullText;
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
              setDisplayText(fullTextRef.current || node?.text || "");
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

  const speakerImages = {
    "Professor Lin": "images/simulator/characters/professor_lin.png",
    "Professor": "images/simulator/characters/professor_lin.png",
    "Professor's Table": "images/simulator/characters/professor_lin.png",
    "Language Partner": "images/simulator/characters/language_partner.png",
    "Neighbor Li": "images/simulator/characters/language_partner.png",
    "Local Friends": "images/simulator/characters/local_friend.png",
    "Meituan Delivery": "images/simulator/characters/delivery_driver.png",
    "Taxi Driver": "images/simulator/characters/delivery_driver.png",
    "Xiao Chen": "images/simulator/characters/xiao_chen.png",
    "Sophie": "images/simulator/characters/sophie.png",
    "Uncle Wang": "images/simulator/characters/uncle_wang.png",
    "Dr. Mei": "images/simulator/characters/dr_mei.png",
    "Manager Zhang": "images/simulator/characters/manager_zhang.png",
  };
  const speakerImg = node?.speaker ? speakerImages[node.speaker] : null;

  return (
    <div className="flex-1 flex flex-col justify-end p-8 pb-32 z-10 w-full max-w-4xl mx-auto relative pt-48">
       
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
        {speakerImg && (
            <div className="absolute bottom-full mb-[-2rem] left-8 h-[28rem] pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] z-[-1] animate-in slide-in-from-bottom-12 fade-in duration-700 ease-out">
               <img src={speakerImg} alt={node.speaker} className="h-full w-auto object-contain object-bottom" />
            </div>
        )}
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
        <p className="text-xl text-slate-100 leading-relaxed font-serif mt-2 min-h-[4rem] whitespace-pre-wrap">
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
           const gSign = v > 0 ? "+" : "";
           previews.push(<span key={`guanxi_${k}`} className={`text-amber-400 font-mono text-xs uppercase tracking-wider`}>Guanxi({guanxiNames[k] || k}) {gSign}{v}</span>);
       });
   }
   if (effects.flags) {
       Object.entries(effects.flags).forEach(([k, v]) => {
          previews.push(<span key={`flag_${k}`} className={`text-blue-400 font-mono text-xs uppercase tracking-wider`}>Flag: {k}</span>);
       });
   }
   
   if (effects.relationships) {
        Object.entries(effects.relationships).forEach(([char, changes]) => {
           Object.entries(changes).forEach(([type, v]) => {
               const color = v > 0 ? (type === 'romance' ? "text-pink-400" : "text-blue-400") : "text-red-400";
               const sign = v > 0 ? "+" : "";
               const emoji = type === 'romance' ? "💖 " : "🤝 ";
               previews.push(<span key={`${char}-${type}`} className={`${color} font-mono text-xs uppercase tracking-wider`}>{emoji}{char} {type} {sign}{v}</span>);
           });
        });
   }

   if (previews.length === 0) return null;

   return (
       <div className="flex flex-wrap gap-4 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
           {previews}
       </div>
   )
}
