"use client";

import React from 'react';

// Custom lightweight Badge
function Badge({ children, className }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}

// Custom lightweight Progress
function Progress({ value, className, indicatorColor }) {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full ${className}`}>
      <div
        className={`h-full w-full flex-1 transition-all duration-500 ease-in-out ${indicatorColor}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}

export default function Dashboard({ state }) {
  const { stats, turn, phase, guanxi } = state;

  return (
    <div className="flex flex-col h-full z-10 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-amber-500 uppercase tracking-wider mb-2">Sim Panda</h1>
        <p className="text-sm text-slate-400">Epoch 1: {phase}</p>
        <div className="mt-2 text-3xl text-white font-mono">Week {turn}</div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Primary Stats</h2>
        
        <StatBar label="📚 Academics" value={stats.academics} color="bg-blue-500" />
        <StatBar label="🗣️ Chinese" value={stats.chinese} color="bg-rose-500" />
        <StatBar label="🎭 Culture" value={stats.culture} color="bg-purple-500" />
        <StatBar label="📱 Digital Prof." value={stats.digitalProficiency} color="bg-emerald-500" />
        
        <div className="pt-2">
            <div className="flex justify-between mb-1 text-sm font-medium text-slate-200">
                <span>😌 Sanity</span>
                <span className={stats.sanity < 30 ? "text-red-400 font-bold" : ""}>{stats.sanity}/100</span>
            </div>
            <Progress value={stats.sanity} className={`h-2 ${stats.sanity < 30 ? "bg-red-950" : "bg-slate-700"}`} indicatorColor={stats.sanity < 30 ? "bg-red-500" : "bg-teal-400"} />
        </div>

        <div className="pt-4 border-t border-slate-700">
           <p className="text-sm font-bold text-slate-300">💰 Wealth: <span className="font-mono text-emerald-400">¥{stats.wealth}</span></p>
        </div>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-700">
        <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Guanxi Network</h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Badge className="border-slate-600 bg-slate-800 text-slate-300 flex justify-between py-1 px-2">
            <span>Professors</span>
            <span className="font-mono font-bold text-amber-400">{guanxi.professors || 0}</span>
          </Badge>
          <Badge className="border-slate-600 bg-slate-800 text-slate-300 flex justify-between py-1 px-2">
            <span>Intl. Students</span>
            <span className="font-mono font-bold text-amber-400">{guanxi.intlStudents || 0}</span>
          </Badge>
          <Badge className="border-slate-600 bg-slate-800 text-slate-300 flex justify-between py-1 px-2">
            <span>Local Students</span>
            <span className="font-mono font-bold text-amber-400">{guanxi.localStudents || 0}</span>
          </Badge>
          <Badge className="border-slate-600 bg-slate-800 text-slate-300 flex justify-between py-1 px-2">
             <span>Univ. Admin</span>
             <span className="font-mono font-bold text-amber-400">{guanxi.admin || 0}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-xs font-semibold text-slate-300">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all duration-500 ease-out`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }}></div>
      </div>
    </div>
  );
}
