"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function StoryPanel({ node, state, availableChoices, onChoice, onTextTick }) {
  const [showChoices, setShowChoices] = useState(false);
  const [textKey, setTextKey] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const fullTextRef = useRef("");
  const onTextTickRef = useRef(onTextTick);

  useEffect(() => {
    onTextTickRef.current = onTextTick;
  }, [onTextTick]);

  const revealFullText = () => {
    setDisplayText(fullTextRef.current || node?.text || "");
    setShowChoices(true);
  };

  useEffect(() => {
    // Reset animations when node changes
    setShowChoices(false);
    setTextKey(prev => prev + 1);
    setDisplayText("");

    if (!node) return;

    // Typewriter effect
    let currentText = "";

    // Append a grounded personal afterword for endings, based on the strongest relationship arc.
    const isEndingNode = node.choices && node.choices.some(c => c.action === "reset_game");
    const epilogues = isEndingNode ? buildEndingAfterword(state) : "";

    const fullText = (node.text || "") + epilogues;
    fullTextRef.current = fullText;
    let i = 0;

    const interval = setInterval(() => {
      const nextChar = fullText.charAt(i);
      currentText += nextChar;
      setDisplayText(currentText);
      if (nextChar.trim() && i % 3 === 0) {
        onTextTickRef.current?.();
      }
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
        if (e.target?.closest?.('[data-week-transition]')) return;

        const isSpace = e.key === " " || e.key === "Spacebar" || e.key === "Space" || e.code === "Space";
        const isEnter = e.key === "Enter";

        if (isSpace || isEnter) {
            e.preventDefault();

            if (!showChoices) {
              revealFullText();
            }

            return;
        }

        if (!showChoices) {
           return;
        }

        // Number keys for choices
        const num = parseInt(e.key);
        if (!isNaN(num) && num > 0 && availableChoices && num <= availableChoices.length) {
            e.preventDefault();
            onChoice(availableChoices[num - 1]);
        }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [showChoices, availableChoices, node, onChoice]);

  if (!node) return null;

  const speakerImages = {
    "Professor Lin": "images/simulator/characters_v2/professor_lin_v2.jpg",
    "Professor": "images/simulator/characters_v2/professor_lin_v2.jpg",
    "Professor's Table": "images/simulator/characters_v2/professor_lin_v2.jpg",
    "Dr. Mei": "images/simulator/characters_v2/dr_mei_v2.jpg",
    "Manager Zhang": "images/simulator/characters_v2/manager_zhang_v2.jpg",
    "Xiao Chen": "images/simulator/characters_v2/xiao_chen_v2.jpg",
    "Sophie": "images/simulator/characters_v2/sophie_v2.jpg",
    "Uncle Wang": "images/simulator/characters_v2/uncle_wang_v2.jpg",
    "Neighbor Li": "images/simulator/characters_v2/neighbor_li_v2.jpg",
    "Language Partner": "images/simulator/characters_v2/language_partner_v2.jpg",
    "Local Friends": "images/simulator/characters_v2/local_friend_v2.jpg",
    "Local Classmates": "images/simulator/characters_v2/local_friend_v2.jpg",
    "Study Group": "images/simulator/characters_v2/local_friend_v2.jpg",
    "Canteen Auntie": "images/simulator/characters_v2/canteen_auntie_v2.jpg",
    "Minghai Canteen": "images/simulator/characters_v2/canteen_auntie_v2.jpg",
    "Canteen Line": "images/simulator/characters_v2/canteen_auntie_v2.jpg",
    "Dorm Auntie": "images/simulator/characters_v2/dorm_auntie_v2.jpg",
    "Dorm Gate": "images/simulator/characters_v2/dorm_auntie_v2.jpg",
    "Meituan Delivery": "images/simulator/characters_v2/delivery_driver_v2.jpg",
    "Taxi Driver": "images/simulator/characters_v2/delivery_driver_v2.jpg",
    "Taxi Driver Lao Li": "images/simulator/characters_v2/delivery_driver_v2.jpg",
  };
  const speakerImg = node?.speaker ? speakerImages[node.speaker] : null;
  const isCharacterLine = Boolean(speakerImg);

  return (
    <div className="flex-1 flex flex-col justify-end p-4 pb-16 z-10 w-full max-w-5xl mx-auto relative pt-24">

      {/* Choice Menu */}
      <div className={`flex flex-col mb-4 gap-2 items-end transition-all duration-700 ${showChoices ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {showChoices && availableChoices && availableChoices.length > 0 && availableChoices.map((choice, i) => (
          <button
            key={i}
            tabIndex={-1}
            onClick={() => onChoice(choice)}
            className="bg-slate-900/90 border border-slate-700/50 hover:bg-slate-800 hover:border-amber-500 hover:text-amber-400 text-slate-200 px-4 py-3 rounded-xl text-left w-full sm:w-2/3 shadow-xl backdrop-blur-md transition-all group flex flex-col relative"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-[10px] opacity-50 group-hover:opacity-100 group-hover:text-amber-500 transition-all">[{i+1}]</div>
            <div className="font-medium text-base pl-5">{choice.text}</div>
            {choice.effects && <ChoicePreview effects={choice.effects} />}
          </button>
        ))}
      </div>

      {/* Dialogue Box */}
      <div className={`flex w-full items-end gap-4 ${isCharacterLine ? "justify-start" : "justify-center"}`}>
        {speakerImg && (
          <div className="hidden sm:block h-80 w-56 shrink-0 overflow-hidden rounded-t-[2rem] rounded-b-2xl border border-amber-200/30 bg-slate-950/80 shadow-[0_24px_70px_rgba(0,0,0,0.72)] animate-in slide-in-from-left-8 fade-in duration-700 ease-out">
            <img src={speakerImg} alt={node.speaker} className="h-full w-full object-cover object-center" />
          </div>
        )}

        <div
          key={textKey}
          onClick={() => {
            if (!showChoices) revealFullText();
          }}
          className={`${isCharacterLine ? "max-w-3xl rounded-[1.6rem] border-amber-200/40 bg-slate-950/95 p-5 sm:p-6" : "max-w-3xl rounded-xl border-slate-700 bg-slate-900/95 p-5"} relative w-full border backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500`}
        >
          {speakerImg && (
            <>
              <div className="absolute -left-2 bottom-9 hidden h-5 w-5 rotate-45 border-b border-l border-amber-200/40 bg-slate-950/95 sm:block"></div>
              <div className="mb-4 flex items-center gap-3 sm:hidden">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border border-amber-200/30 bg-slate-950 shadow-lg">
                  <img src={speakerImg} alt={node.speaker} className="h-full w-full object-cover object-center" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Speaking Now</div>
                  <div className="text-lg font-semibold text-white">{node.speaker}</div>
                </div>
              </div>
            </>
          )}

          <div className="absolute -top-3 left-6 flex gap-2">
            <div className={`${isCharacterLine ? "bg-amber-300 text-slate-950" : "bg-amber-500 text-slate-900"} font-bold px-3 py-0.5 rounded shadow-md uppercase tracking-wider text-xs`}>
              {node.speaker || "Narrator"}
            </div>
            {isCharacterLine && (
              <div className="hidden rounded border border-amber-200/20 bg-slate-950/90 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-100 shadow-md sm:block">
                Speaking To You
              </div>
            )}
            {node.location && (
              <div className="bg-slate-700 text-amber-400 border border-amber-500/30 font-bold px-3 py-0.5 rounded shadow-md uppercase tracking-wider text-xs flex items-center gap-1.5">
                📍 {node.location}
              </div>
            )}
          </div>

          <p className={`${isCharacterLine ? "font-sans text-xl text-slate-50" : "font-serif text-lg text-slate-100"} leading-relaxed mt-2 min-h-[3rem] whitespace-pre-wrap`}>
            {displayText}
            {!showChoices && <span className="inline-block w-1.5 bg-amber-500 opacity-50 animate-pulse ml-1">&nbsp;</span>}
          </p>
          <div className="mt-4 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {showChoices ? "Choose with mouse or number keys. Space will not select." : "Press Space or Enter to finish this line."}
          </div>
        </div>
      </div>
    </div>
  );
}

function buildEndingAfterword(state) {
   if (!state || !state.relationships) return "";

   const flags = state.flags || {};
   const strongest = getStrongestRelationship(state.relationships);
   const relationshipLine = strongest ? getRelationshipAfterword(strongest.name, strongest.rel, flags) : "";
   const personalLine = getPersonalReflection(flags);
   const lines = [relationshipLine, personalLine].filter(Boolean);

   if (lines.length === 0) return "";
   return `\n\n--- PERSONAL AFTERWORD ---\n\n${lines.join("\n\n")}`;
}

function getStrongestRelationship(relationships) {
   const candidates = Object.entries(relationships)
      .filter(([, rel]) => (rel.friendship || 0) > 0 || (rel.romance || 0) > 0)
      .map(([name, rel]) => ({
         name,
         rel,
         score: (rel.friendship || 0) + (rel.romance || 0) * 1.25
      }))
      .sort((a, b) => b.score - a.score);

   return candidates[0] || null;
}

function getRelationshipAfterword(name, rel, flags) {
   if (!name || !rel) return "";

   const friendship = rel.friendship || 0;
   const romance = rel.romance || 0;

   if (name === "Professor Lin") {
      if (flags.lin_recommendation_ready) {
         return "Professor Lin's recommendation arrives in an envelope with the university seal, but the real prize is the sentence he writes by hand at the bottom: 'This student learned how to think under pressure.' You keep a photo of it on your phone long after the paper is filed away.";
      }
      if (flags.lin_feedback_repaired) {
         return "You still remember Professor Lin's harshest comments because they became the hinge of the year. Every serious draft after that carries his invisible red pen, and somehow that starts to feel like armor.";
      }
      return "Professor Lin remains one of the voices you hear when a first draft feels convincing too early, which is annoying, useful, and probably the closest thing academia has to a haunting.";
   }

   if (name === "Dr. Mei") {
      if (flags.dr_mei_project_commitment) {
         return "Dr. Mei adds your name to the project workspace, then to the forum poster, then to a draft that suddenly feels far too real. The project does not make you famous, but it gives you something better: a question sharp enough to follow into the next chapter.";
      }
      if (flags.dr_mei_ethics_reframed) {
         return "Dr. Mei's question about responsibility follows you like a second passport. It changes how you write about people, places, and every too-clean explanation you once trusted.";
      }
      return "Dr. Mei leaves you with the sense that good questions are rarely comfortable at first, and the dangerous suspicion that comfort was never the point.";
   }

   if (name === "Sophie") {
      if (romance >= 20) {
         return "Sophie remains complicated in the way real closeness often is: half timing, half courage, half unread messages at 1:17 a.m. The math does not work, but neither did most of the year, and somehow that is why it matters.";
      }
      if (flags.sophie_orientation_committee) {
         return "Sophie sends you a screenshot from the next orientation: your guide is on the projector, your jokes are still in the margins, and a room full of new students is laughing before they panic. Somewhere along the way, arrival notes became infrastructure.";
      }
      if (flags.sophie_bridge_plan) {
         return "Sophie keeps teasing you about the bridge activity, then posts the next signup link before you can protest. The international circle does not vanish; it grows doors.";
      }
      return "Sophie stays pinned near the top of WeChat, proof that sometimes the first person who admits they are lost becomes the map everyone else follows.";
   }

   if (name === "Neighbor Li") {
      if (flags.neighbor_li_festival_invite) {
         return "Neighbor Li still sends photos from the neighborhood festival group chat. You are in the corner of three of them, carrying boxes under red lanterns, looking too busy to realize you had already been accepted.";
      }
      if (flags.neighbor_li_boundary_repaired) {
         return "The dorm never became effortless, but after the misunderstanding with Neighbor Li, people stopped treating you like a guest passing through. Belonging, apparently, can begin with a properly repaired mistake.";
      }
      return "Neighbor Li remains the person who taught you that local life is mostly made of unwritten rules, repeated kindness, and someone yelling your name from across the courtyard.";
   }

   if (name === "Uncle Wang") {
      if (flags.uncle_wang_regular) {
         return "Uncle Wang never calls it friendship too loudly. He just saves your usual seat, slides extra skewers onto the plate, and introduces you to regulars as 'our Minghai student' like the title means something official.";
      }
      if (flags.uncle_wang_honest_answer) {
         return "You are not sure Uncle Wang understood every word of your answer, but he understood enough to pour tea instead of advice. Sometimes that is the highest level of fluency.";
      }
      return "Uncle Wang's table becomes one of the places you think of when people ask what Shanghai felt like after the postcards faded: smoke, jokes, traffic, and a plastic stool that somehow felt like a throne.";
   }

   if (name === "Manager Zhang") {
      if (flags.manager_zhang_referral_ready) {
         return "Manager Zhang's referral comes with conditions, paperwork, and a badge that takes three attempts to print correctly. When the return offer arrives months later, he only sends one message: 'Told you usefulness beats decoration.' It sounds cold until you realize it is his version of cheering.";
      }
      if (flags.manager_zhang_boundaries_accepted) {
         return "Manager Zhang's lesson about boundaries becomes part of how you read every opportunity after Minghai: relationship first, shortcut never. It saves you from at least one shiny disaster later.";
      }
      return "Manager Zhang leaves you with a professional skill no resume line can fully explain: how to stay useful when a cross-cultural room gets confusing and everyone pretends it is not.";
   }

   if (name === "Xiao Chen") {
      if (flags.xiao_chen_demo_day) {
         return "Xiao Chen still argues too fast, but now he brings data before excitement. After demo day, the angel investor's WeChat message lands at 11:46 p.m.: a first check, three months of runway, and one sentence that makes both of you scream quietly in the dorm hallway.";
      }
      if (flags.xiao_chen_responsible_pace) {
         return "You and Xiao Chen never fully agree about speed, but the first time a stranger says the service saved their week, even he goes quiet. A service people trust beats a pitch people applaud.";
      }
      if (flags.city_speed_over_care) {
         return "The messy launch with Xiao Chen becomes one of your sharpest lessons: Shanghai rewards motion, but it keeps receipts. The city lets you sprint, then makes you read the invoice.";
      }
      return "Xiao Chen makes Shanghai feel like a city of prototypes: unfinished, risky, neon-lit, and hard to stop thinking about once it gets into your bloodstream.";
   }

   if (name === "Family") {
      if (friendship >= 10) {
         return "Your family does not understand every detail of Minghai life, but they learn the rhythm of your check-ins: short messages, strange photos, and one airport hug that lasts long enough to say everything nobody translated properly.";
      }
      return "Home becomes quieter in your story, but it never disappears. It waits at the edge of every departure gate.";
   }

   if (romance >= 20) {
      return `${name} remains part of the story in a tender, unfinished way: a message thread, a song, a route through campus you still avoid for no practical reason. Not every important connection needs to become a destination.`;
   }
   if (friendship >= 15) {
      return `${name} remains in your WeChat contacts, no longer just a name from one semester but a witness to the version of you China forced into the open.`;
   }
   return "";
}

function getPersonalReflection(flags) {
   const major = flags.major_business
      ? "Business and Management"
      : flags.major_stem
        ? "Engineering and Computing"
        : flags.major_humanities
          ? "Humanities and China Studies"
          : null;

   if (flags.motive_curiosity) {
      return `You came because China felt like a question written in lights across a map. By the end, ${major ? major + " is no longer just a major, and " : ""}the question has teeth, names, subway lines, and a reason to keep answering.`;
   }
   if (flags.motive_scholarship) {
      return `You came with a practical calculation, and the calculation was real. What surprised you was the part no spreadsheet predicted: the year became expensive in courage, not just money.`;
   }
   if (flags.motive_restart) {
      return `You came looking for a restart. China did not erase the old version of you; it put that version under Shanghai lights and made it fight for an upgrade.`;
   }
   if (flags.motive_degree) {
      return `You came for a degree, and you earned one kind of education on paper. The other kind does not fit in a transcript, which is exactly why it follows you home.`;
   }
   return "";
}

function ChoicePreview({ effects }) {
   if (!effects) return null;

   const previews = [];
   const statNames = {
       digitalProficiency: "Digital",
       academics: "Academics",
       chinese: "Chinese",
       energy: "Energy",
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
           previews.push(<span key={`guanxi_${k}`} className={`text-amber-400 font-mono text-xs uppercase tracking-wider`}>Network({guanxiNames[k] || k}) {gSign}{v}</span>);
       });
   }
   if (effects.flags && Object.keys(effects.flags).length > 0) {
       previews.push(<span key="story_updated" className="text-blue-400 font-mono text-xs uppercase tracking-wider">Story Updated</span>);
   }

   if (effects.relationships) {
        Object.entries(effects.relationships).forEach(([char, changes]) => {
           Object.entries(changes).forEach(([type, v]) => {
               const color = v > 0 ? (type === 'romance' ? "text-pink-400" : "text-blue-400") : "text-red-400";
               const sign = v > 0 ? "+" : "";
               const emoji = type === 'romance' ? "💖 " : "🤝 ";
               const label = type === 'romance' ? "Closeness" : "Bond";
               previews.push(<span key={`${char}-${type}`} className={`${color} font-mono text-xs uppercase tracking-wider`}>{emoji}{char} {label} {sign}{v}</span>);
           });
        });
   }

   if (previews.length === 0) return null;

   return (
       <div className="flex flex-wrap gap-2 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
           {previews}
       </div>
   )
}
