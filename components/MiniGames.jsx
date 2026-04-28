"use client";

import React, { useState, useEffect, useRef } from 'react';

// Central Switchboard
export default function MiniGameOverlay({ gameId, onComplete }) {
  const [result, setResult] = useState(null);

  const handleGameEnd = (outcome) => {
    setResult(outcome);
    setTimeout(() => {
        onComplete(outcome);
    }, 1500); // 1.5s delay to show win/lose screen
  };

  const renderGame = () => {
    switch(gameId) {
        case 'bargain': return <BargainMarketGame onComplete={handleGameEnd} />;
        case 'subway': return <SubwaySqueezeGame onComplete={handleGameEnd} />;
        case 'delivery': return <DeliveryTyperGame onComplete={handleGameEnd} />;
        case 'tones': return <TonalRhythmGame onComplete={handleGameEnd} />;
        case 'visa': return <VisaBureaucracyGame onComplete={handleGameEnd} />;
        case 'bike': return <BikeScrambleGame onComplete={handleGameEnd} />;
        case 'banquet': return <BanquetBalanceGame onComplete={handleGameEnd} />;
        case 'hongbao': return <HongbaoSnatchGame onComplete={handleGameEnd} />;
        case 'model': return <PhotoShootGame onComplete={handleGameEnd} />;
        default: return <div className="text-white">Unknown Game ID: {gameId}</div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8 z-[60] w-full max-w-4xl mx-auto absolute inset-0 backdrop-blur-md bg-black/60">
        <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-6 w-full shadow-[0_0_50px_rgba(99,102,241,0.4)] relative overflow-hidden">
            {result ? (
                <div className="absolute inset-0 z-50 bg-slate-900/90 flex flex-col items-center justify-center animate-in zoom-in duration-300">
                    <h2 className={`text-5xl font-black mb-4 ${result.win ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]'}`}>
                        {result.win ? 'SUCCESS' : 'FAILED'}
                    </h2>
                    <p className="text-slate-300 text-lg uppercase tracking-widest">{result.message}</p>
                </div>
            ) : null}
            {renderGame()}
        </div>
    </div>
  );
}

// 1. Bargain Market Game
function BargainMarketGame({ onComplete }) {
    const [bossOffer, setBossOffer] = useState(800);
    const [anger, setAnger] = useState(0);
    const [turn, setTurn] = useState(1);
    
    const handleCounter = () => {
        const newOffer = Math.floor(bossOffer * 0.75); // Reduce price by 25%
        const angerInc = Math.floor(Math.random() * 20) + 15; // Random anger 15-35
        setBossOffer(newOffer);
        setAnger(a => a + angerInc);
        setTurn(t => t + 1);
    };

    const handleCompliment = () => {
        setAnger(a => Math.max(0, a - 30));
        setBossOffer(Math.floor(bossOffer * 1.05)); // Boss feels confident, price goes up slightly
        setTurn(t => t + 1);
    };

    const handleWalkAway = () => {
        if (anger < 50 && turn > 2) {
            // Boss caves
            onComplete({ win: true, cost: Math.floor(bossOffer * 0.5), message: '"Wait! Come back! Special price for you."' });
        } else {
            onComplete({ win: false, cost: bossOffer, message: '"Leave then! I don\'t need your business!" Boss refuses to sell.' });
        }
    };

    const handleAccept = () => {
        onComplete({ win: true, cost: bossOffer, message: `You bought it for ¥${bossOffer}.`});
    }

    useEffect(() => {
        if (anger >= 100) {
            onComplete({ win: false, cost: bossOffer, message: '"Get out of my shop!" Boss kicked you out.' });
        }
    }, [anger]);

    return (
        <div className="text-center p-4">
            <h3 className="text-2xl font-bold text-amber-400 mb-2">Fake Market Haggling</h3>
            <p className="text-sm text-slate-400 mb-6">Convince the boss to lower the price, but don't make him too angry!</p>
            
            <div className="bg-slate-800 rounded-xl p-8 mb-6 border border-slate-700">
                <div className="text-6xl font-black text-emerald-400 mb-2">¥{bossOffer}</div>
                <div className="text-slate-500 font-mono text-sm">Boss's Current Offer</div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
                    <span>Boss Anger Meter</span>
                    <span className={anger > 80 ? "text-red-400" : ""}>{anger}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                    <div className={`h-full rounded-full transition-all duration-300 ${anger > 80 ? 'bg-red-500' : 'bg-orange-500'}`} style={{width: `${Math.min(100, anger)}%`}}></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button onClick={handleCounter} className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-lg border border-rose-400 transition-colors">
                   Counter-Offer (-25%)
                </button>
                <button onClick={handleCompliment} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg border border-sky-400 transition-colors">
                   Compliment Boss (Reduce Anger)
                </button>
                <button onClick={handleWalkAway} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors">
                   Fake Walk Away
                </button>
                <button onClick={handleAccept} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg border border-emerald-400 transition-colors">
                   Accept Price
                </button>
            </div>
        </div>
    );
}

// 2. Subway Squeeze Game
function SubwaySqueezeGame({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [direction, setDirection] = useState(1);
    const [squeezes, setSqueezes] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                let next = prev + (direction * 4);
                if (next > 100) { next = 100; setDirection(-1); }
                if (next < 0) { next = 0; setDirection(1); }
                return next;
            });
        }, 16);
        return () => clearInterval(interval);
    }, [direction]);

    const handleSqueeze = () => {
        // Target area is 40% to 60%
        if (progress >= 35 && progress <= 65) {
            setSqueezes(s => s + 1);
            if (squeezes + 1 >= 3) {
                onComplete({ win: true, message: "You made it onto the train!" });
            }
            // Increase speed/difficulty
            setProgress(0); 
        } else {
            onComplete({ win: false, message: "The doors closed on you!" });
        }
    };

    return (
        <div className="text-center p-4 h-64 flex flex-col justify-center items-center">
            <h3 className="text-2xl font-bold text-sky-400 mb-2">Rush Hour Squeeze</h3>
            <p className="text-sm text-slate-400 mb-8">Hit 'PUSH' when the marker is in the green zone! (3 times needed)</p>

            <div className="w-full max-w-md h-8 bg-slate-800 rounded-full relative mb-8 overflow-hidden border border-slate-600 shadow-inner">
                {/* Target Zone */}
                <div className="absolute top-0 bottom-0 left-[35%] w-[30%] bg-emerald-500/30 border-x-2 border-emerald-400"></div>
                {/* Marker */}
                <div className="absolute top-0 bottom-0 w-4 bg-white rounded-full shadow-[0_0_10px_white]" style={{ left: `calc(${progress}% - 8px)` }}></div>
            </div>

            <div className="flex justify-between items-center w-full max-w-md mb-4 text-slate-300 font-mono font-bold">
                <span>Attempt: {squeezes}/3</span>
            </div>

            <button onClick={handleSqueeze} className="w-48 h-16 bg-amber-500 hover:bg-amber-400 text-slate-900 text-2xl font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                PUSH!
            </button>
        </div>
    );
}

// 3. Delivery Typer Game
function DeliveryTyperGame({ onComplete }) {
    const vocab = [
        { ch: "外卖 (Wàimài)", en: "Takeout" },
        { ch: "到了 (Dàole)", en: "Arrived" },
        { ch: "南门 (Nánmén)", en: "South Gate" },
        { ch: "放门口 (Fàng ménkǒu)", en: "Leave at door" },
        { ch: "快点 (Kuàidiǎn)", en: "Hurry up" },
        { ch: "没筷子 (Méi kuàizi)", en: "No chopsticks" }
    ];
    
    const [currentWord, setCurrentWord] = useState(vocab[0]);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        nextWord();
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    onComplete({ win: false, message: "The delivery guy left with your food!" });
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (score >= 5) {
            onComplete({ win: true, message: "You successfully communicated your location!" });
        }
    }, [score]);

    const nextWord = () => {
        const word = vocab[Math.floor(Math.random() * vocab.length)];
        setCurrentWord(word);
        
        // Pick 3 random english words + the correct one
        let newOptions = [word.en];
        while (newOptions.length < 4) {
            const random = vocab[Math.floor(Math.random() * vocab.length)].en;
            if (!newOptions.includes(random)) newOptions.push(random);
        }
        setOptions(newOptions.sort(() => Math.random() - 0.5));
    };

    const handlePick = (en) => {
        if (en === currentWord.en) {
            setScore(s => s + 1);
            nextWord();
        } else {
            setTimeLeft(t => Math.max(0, t - 3)); // 3 second penalty
        }
    };

    return (
        <div className="text-center p-4 h-80 flex flex-col justify-center items-center relative">
            <div className="absolute top-4 right-4 text-xl font-mono text-amber-400">⏱️ {timeLeft}s</div>
            <div className="absolute top-4 left-4 text-xl font-mono text-emerald-400">✅ {score}/5</div>
            
            <h3 className="text-2xl font-bold text-blue-400 mb-8">Delivery Call Panic!</h3>
            
            <div className="text-5xl font-black text-rose-500 mb-10 bg-slate-800 px-6 py-4 rounded-xl shadow-inner border border-slate-700">
                {currentWord?.ch}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {options.map((opt, i) => (
                    <button key={i} onClick={() => handlePick(opt)} className="bg-slate-700 hover:bg-sky-600 text-white text-lg font-bold py-4 rounded-xl transition-colors">
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

// 4. Tonal Rhythm Game
function TonalRhythmGame({ onComplete }) {
    const [notes, setNotes] = useState([]);
    const [score, setScore] = useState(0);
    const targetY = 250; // The hit line

    useEffect(() => {
        let spawnInterval = setInterval(() => {
            setNotes(prev => [...prev, { id: Date.now(), y: 0, tone: Math.floor(Math.random() * 4) + 1 }]);
        }, 1000);

        let moveInterval = setInterval(() => {
            setNotes(prev => {
                let activeNotes = prev.map(n => ({...n, y: n.y + 4}));
                // Check if missed
                if (activeNotes.some(n => n.y > targetY + 30)) {
                    // Missed one
                    setScore(s => s - 2);
                }
                return activeNotes.filter(n => n.y <= targetY + 30);
            });
        }, 30);

        return () => { clearInterval(spawnInterval); clearInterval(moveInterval); }
    }, []);

    useEffect(() => {
        if (score >= 10) onComplete({ win: true, message: "Perfect Pronunciation!" });
        if (score <= -6) onComplete({ win: false, message: "The teacher frowned in confusion." });
    }, [score]);

    const handleHit = (tone) => {
        setNotes(prev => {
            // Find note in target zone
            const hitIndex = prev.findIndex(n => Math.abs(n.y - targetY) < 30 && n.tone === tone);
            if (hitIndex !== -1) {
                setScore(s => s + 2);
                return prev.filter((_, i) => i !== hitIndex);
            } else {
                setScore(s => s - 1); // Wrong key or mistiming
                return prev;
            }
        });
    };

    return (
        <div className="p-4 h-96 relative flex flex-col pt-8">
            <div className="absolute top-4 right-4 text-xl font-mono text-emerald-400">Score: {score}/10</div>
            <h3 className="text-2xl font-bold text-indigo-400 text-center mb-4">Tone Matching</h3>
            
            <div className="flex-1 border bg-slate-900 border-slate-700 relative overflow-hidden rounded-t-xl mx-8 shadow-inner">
                {/* Hit Line */}
                <div className="absolute w-full h-1 bg-amber-500/80 shadow-[0_0_10px_orange]" style={{top: targetY}}></div>
                
                {/* Notes */}
                {notes.map(note => (
                    <div key={note.id} className="absolute text-center font-black rounded-full" 
                         style={{top: note.y, left: `${(note.tone - 1) * 25}%`, width: '25%'}}>
                        <div className="inline-flex justify-center items-center w-10 h-10 bg-slate-100 text-indigo-600 rounded-lg shadow-lg border-b-4 border-slate-400">
                           {note.tone === 1 && "—"}
                           {note.tone === 2 && "／"}
                           {note.tone === 3 && "V"}
                           {note.tone === 4 && "＼"}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex h-20 mx-8 gap-2 mt-2">
                {[1, 2, 3, 4].map(t => (
                    <button key={t} onClick={() => handleHit(t)} className="flex-1 bg-slate-800 hover:bg-indigo-600 text-white font-bold rounded-b-xl border-t border-slate-600 active:bg-indigo-400 transition-colors">
                        Tone {t}
                    </button>
                ))}
            </div>
            <p className="text-center text-slate-500 text-xs mt-2">Click the buttons when the tones hit the orange line.</p>
        </div>
    );
}

// 5. Visa Bureaucracy Game
function VisaBureaucracyGame({ onComplete }) {
    const docs = [
        "Passport", "JW202 Form", "Admission Letter", "Physical Exam", 
        "Movie Ticket", "Library Card", "Expired Visa", "Restaurant Receipt"
    ].sort(() => Math.random() - 0.5);

    const targetDocs = ["Passport", "JW202 Form", "Admission Letter", "Physical Exam"];
    const [selected, setSelected] = useState([]);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    onComplete({ win: false, message: "The bureau closed for lunch. Come back tomorrow." });
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleDoc = (doc) => {
        if (selected.includes(doc)) setSelected(selected.filter(d => d !== doc));
        else setSelected([...selected, doc]);
    };

    const handleSubmit = () => {
        // Check if selected matches target exact
        const isCorrect = selected.length === targetDocs.length && targetDocs.every(d => selected.includes(d));
        if (isCorrect) {
            onComplete({ win: true, message: "Perfect documents! Visas approved." });
        } else {
            onComplete({ win: false, message: "Missing or incorrect documents. Application rejected." });
        }
    };

    return (
        <div className="p-4 h-80 flex flex-col justify-center items-center relative">
            <div className="absolute top-4 right-4 text-xl font-mono text-amber-400">⏱️ {timeLeft}s</div>
            <h3 className="text-2xl font-bold text-rose-400 mb-2">Bureaucracy Puzzle</h3>
            <p className="text-sm text-slate-400 mb-6">Select requested documents: Passport, JW202, Admission Letter, Physical Exam</p>

            <div className="flex flex-wrap gap-3 justify-center mb-8 max-w-lg">
                {docs.map(doc => (
                    <button 
                       key={doc} 
                       onClick={() => toggleDoc(doc)}
                       className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${selected.includes(doc) ? 'bg-sky-600 border-sky-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'}`}
                    >
                        📄 {doc}
                    </button>
                ))}
            </div>

            <button onClick={handleSubmit} className="px-12 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg border border-emerald-400 text-xl transition-all hover:-translate-y-1">
                Submit to Window
            </button>
        </div>
    )
}

// 6. Bike Scramble
function BikeScrambleGame({ onComplete }) {
    const emojis = ["🚲", "🚕", "🛵", "🏍️", "🛴", "🛒"];
    const [grid, setGrid] = useState([]);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const arr = Array(16).fill("🛵");
        arr[Math.floor(Math.random() * 16)] = "🚲"; // Only one bike
        setGrid(arr.map((e, i) => ({ id: i, emoji: e })));

        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    onComplete({ win: false, message: "You couldn't find a bike and was late!" });
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClick = (emoji) => {
        if (emoji === "🚲") {
            onComplete({ win: true, message: "You found a working bike and sped to class!" });
        } else {
            setTimeLeft(t => Math.max(0, t - 2)); // Time penalty
        }
    };

    return (
        <div className="p-4 h-auto flex flex-col justify-center items-center relative py-12">
            <div className="absolute top-4 right-4 text-xl font-mono text-amber-400">⏱️ {timeLeft}s</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Find the Shared Bike!</h3>
            <p className="text-sm text-slate-400 mb-8">Scan the pile of vehicles and find the ONLY actual bicycle 🚲</p>

            <div className="grid grid-cols-4 gap-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                {grid.map(item => (
                    <button key={item.id} onClick={() => handleClick(item.emoji)} className="w-16 h-16 bg-slate-700 hover:bg-slate-600 rounded-xl text-3xl flex items-center justify-center transition-all hover:scale-110">
                        {item.emoji}
                    </button>
                ))}
            </div>
        </div>
    )
}

// 7. Banquet Balance Game
function BanquetBalanceGame({ onComplete }) {
    const [round, setRound] = useState(1);
    const [tableTrust, setTableTrust] = useState(0);
    const [intox, setIntox] = useState(0);

    const playTurn = (trust, i, msg) => {
        const newIntox = intox + i;
        const newTableTrust = tableTrust + trust;
        
        if (newIntox >= 100) {
            onComplete({ win: false, message: "You pushed past your limit and lost face at the table." });
            return;
        }

        setIntox(newIntox);
        setTableTrust(newTableTrust);
        
        if (round >= 5) {
            if (newTableTrust >= 30) {
                onComplete({ win: true, message: "You handled the dinner and gained massive respect." });
            } else {
                onComplete({ win: false, message: "You made it through, but the table never quite warmed to you." });
            }
        } else {
            setRound(r => r + 1);
        }
    };

    return (
        <div className="p-4 h-96 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-red-500 mb-2">The Banquet Toast</h3>
            <p className="text-sm text-slate-400 mb-6">Round {round}/5 - The boss is raising a glass of 53% Baijiu.</p>

            <div className="w-full max-w-sm space-y-4 mb-8">
                <div>
                    <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
                        <span>Intoxication</span>
                        <span className="text-purple-400">{intox}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-purple-500 h-full rounded-full transition-all" style={{width: `${Math.min(100, intox)}%`}}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
                        <span>Table Trust</span>
                        <span className="text-amber-400">{tableTrust} (Goal: 30)</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-amber-500 h-full rounded-full transition-all" style={{width: `${Math.min(100, (tableTrust/30)*100)}%`}}></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                <button onClick={() => playTurn(15, 25, "Ganbei")} className="bg-red-900 hover:bg-red-800 text-white font-bold py-3 rounded-xl border border-red-500 transition-colors">
                   🥂 "Ganbei!" (Drain the glass: +15 Trust, +25 Intox)
                </button>
                <button onClick={() => playTurn(5, 5, "Sip")} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl border border-slate-500 transition-colors">
                   🍷 Polite Sip (+5 Trust, +5 Intox)
                </button>
                <button onClick={() => playTurn(-5, -10, "Eat")} className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl border border-emerald-500 transition-colors">
                   🥢 Eat Food (-5 Trust, -10 Intox)
                </button>
            </div>
        </div>
    )
}

// 8. Hongbao Snatch
function HongbaoSnatchGame({ onComplete }) {
    const [pos, setPos] = useState(null);
    const [waiting, setWaiting] = useState(true);
    const failTimerRef = useRef(null);
    const completedRef = useRef(false);

    useEffect(() => {
        // Wait random time between 1 and 3 seconds
        const waitTime = Math.random() * 2000 + 1000;
        const wTimer = setTimeout(() => {
            setWaiting(false);
            setPos({ 
                top: `${Math.floor(Math.random() * 60) + 10}%`, 
                left: `${Math.floor(Math.random() * 60) + 10}%` 
            });
            
            // Disappear after 1 second
            failTimerRef.current = setTimeout(() => {
                if (!completedRef.current) {
                    completedRef.current = true;
                    onComplete({ win: false, message: "A step too late. The envelope is empty." });
                }
            }, 1000);

        }, waitTime);

        return () => {
            clearTimeout(wTimer);
            if (failTimerRef.current) clearTimeout(failTimerRef.current);
        };
    }, []);

    const handleClick = () => {
        if (!waiting && !completedRef.current) {
            completedRef.current = true;
            if (failTimerRef.current) clearTimeout(failTimerRef.current);
            onComplete({ win: true, message: "You snatched ¥100 from the group chat!" });
        }
    };

    return (
        <div className="p-4 h-96 relative flex flex-col justify-center items-center w-full">
            <h3 className="text-2xl font-bold text-red-500 mb-2">WeChat Hongbao</h3>
            <p className="text-sm text-slate-400 mb-8">Get ready to click the red envelope the moment it drops!</p>

            <div className="w-full max-w-md h-64 bg-slate-800 rounded-3xl relative border-4 border-slate-700 overflow-hidden shadow-inner">
                {waiting ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-mono animate-pulse">
                        Waiting for boss to drop envelope...
                    </div>
                ) : (
                    <button 
                       onClick={handleClick}
                       className="absolute w-16 h-20 bg-red-600 rounded drop-shadow-xl flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-2 border-red-400 hover:scale-110 active:scale-90"
                       style={{ top: pos.top, left: pos.left }}
                    >
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-red-600 text-[9px] shadow-inner">OPEN</div>
                    </button>
                )}
            </div>
        </div>
    )
}

// 9. Photo Shoot Game
function PhotoShootGame({ onComplete }) {
    const poses = [
        { id: 'smile', emoji: '😊', label: 'Smile' },
        { id: 'cool', emoji: '😎', label: 'Cool' },
        { id: 'fierce', emoji: '😠', label: 'Fierce' },
        { id: 'cute', emoji: '🥺', label: 'Cute' }
    ];
    
    const [targetPose, setTargetPose] = useState(poses[0]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        nextPose();
        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    onComplete({ win: false, message: "Too slow! The photographer left." });
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (score >= 6) {
            onComplete({ win: true, message: "Perfect shots! That's a wrap." });
        }
    }, [score]);

    const nextPose = () => {
        const pose = poses[Math.floor(Math.random() * poses.length)];
        setTargetPose(pose);
    };

    const handlePick = (id) => {
        if (id === targetPose.id) {
            setScore(s => s + 1);
            nextPose();
        } else {
            setTimeLeft(t => Math.max(0, t - 2)); // 2 second penalty
        }
    };

    return (
        <div className="text-center p-4 h-80 flex flex-col justify-center items-center relative">
            <div className="absolute top-4 right-4 text-xl font-mono text-amber-400">⏱️ {timeLeft}s</div>
            <div className="absolute top-4 left-4 text-xl font-mono text-emerald-400">📸 {score}/6</div>
            
            <h3 className="text-2xl font-bold text-pink-400 mb-8">Taobao Photo Shoot!</h3>
            
            <div className="text-4xl font-black text-rose-500 mb-10 bg-slate-800 px-8 py-6 rounded-3xl shadow-inner border border-slate-700 uppercase tracking-widest">
                {targetPose?.label}
            </div>

            <div className="flex gap-4 w-full max-w-sm justify-center">
                {poses.map((p, i) => (
                    <button key={i} onClick={() => handlePick(p.id)} className="bg-slate-700 hover:bg-pink-600 active:bg-pink-400 text-white text-5xl py-4 flex-1 rounded-xl transition-colors">
                        {p.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
}
