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
  const weeklyActions = state.weeklyActions || { weekday: 0, weekend: 0 };
  const routeCommitments = state.routeCommitments || {};
  const lastLifeCheck = state.lifeChecks?.last;

  const epochLabel = phase === "Application" ? "Epoch 1" : (phase === "Pre-Departure" ? "Epoch 2" : "Epoch 3");

  return (
    <div className="flex flex-col h-full z-10 space-y-4">
      <div>
        <h1 className="text-2xl font-black text-amber-500 uppercase tracking-wider mb-2">Sim Panda</h1>
        <p className="text-sm text-slate-400">{epochLabel}: {phase}</p>
        <div className="mt-2 text-3xl text-white font-mono">Week {turn}</div>
        {state.metaProgress?.completedRuns > 0 && (
          <div className="mt-3 rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/10 p-3 text-xs text-fuchsia-100">
            <div className="font-black uppercase tracking-[0.16em] text-fuchsia-300">Run Memory</div>
            <div className="mt-1 leading-relaxed">Completed lives remembered: {state.metaProgress.completedRuns}. Some future checks get a small memory bonus.</div>
          </div>
        )}
        {phase === "In-China" && (
          <div className="mt-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">Weekly Actions</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <Badge className="justify-between border-cyan-500/30 bg-slate-900 text-cyan-100">
                <span>Weekday</span>
                <span className="font-mono">{weeklyActions.weekday ?? 0}/2</span>
              </Badge>
              <Badge className="justify-between border-amber-500/30 bg-slate-900 text-amber-100">
                <span>Weekend</span>
                <span className="font-mono">{weeklyActions.weekend ?? 0}/1</span>
              </Badge>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">Primary Stats</h2>
        
        <StatBar label="📚 Academics" value={stats.academics} color="bg-blue-500" />
        <StatBar label="🗣️ Chinese" value={stats.chinese} color="bg-rose-500" />
        <StatBar label="🎭 Culture" value={stats.culture} color="bg-purple-500" />
        <StatBar label="📱 Digital Prof." value={stats.digitalProficiency} color="bg-emerald-500" />
        
        <div className="pt-2">
            <div className="flex justify-between mb-1 text-sm font-medium text-slate-200">
                <span>😌 Energy</span>
                <span className={stats.energy < 30 ? "text-red-400 font-bold" : ""}>{stats.energy}/100</span>
            </div>
            <Progress value={stats.energy} className={`h-2 ${stats.energy < 30 ? "bg-red-950" : "bg-slate-700"}`} indicatorColor={stats.energy < 30 ? "bg-red-500" : "bg-teal-400"} />
        </div>

        <div className="pt-3 border-t border-slate-700">
           <p className="text-sm font-bold text-slate-300">💰 Wealth: <span className="font-mono text-emerald-400">¥{stats.wealth}</span></p>
        </div>
      </div>

      {lastLifeCheck && (
        <div className={`rounded-xl border p-3 ${lastLifeCheck.success ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className={`text-[10px] uppercase tracking-widest font-semibold ${lastLifeCheck.success ? "text-emerald-300" : "text-rose-300"}`}>Latest Life Check</h2>
              <div className="mt-1 text-sm font-black text-slate-100">{lastLifeCheck.label}</div>
            </div>
            <div className="rounded-lg bg-slate-950/70 px-2 py-1 text-right font-mono text-xs text-slate-100">
              {lastLifeCheck.score}/{lastLifeCheck.dc}
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">{lastLifeCheck.message}</p>
          {lastLifeCheck.prepCards?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {lastLifeCheck.prepCards.slice(0, 3).map(card => (
                <span key={card.id} className="rounded-md border border-white/10 bg-slate-950/60 px-2 py-1 text-[10px] font-semibold text-slate-200">
                  {card.title} +{card.bonus}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-1.5 pt-3 border-t border-slate-700">
        <h2 className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">Relationship Network</h2>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
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

      <div className="space-y-1.5 pt-3 border-t border-slate-700">
        <h2 className="text-[10px] uppercase tracking-widest text-cyan-500 font-semibold mb-2">Route Commitment</h2>
        {state.flags?.route_commitment_label && (
          <div className="rounded-md border border-cyan-400/30 bg-cyan-400/10 p-2 text-xs font-bold text-cyan-100">
            Current life line: {state.flags.route_commitment_label}
          </div>
        )}
        <RouteMeter label="Academic" value={routeCommitments.academic || 0} />
        <RouteMeter label="Career" value={routeCommitments.career || 0} />
        <RouteMeter label="Local Life" value={routeCommitments.local || 0} />
        <RouteMeter label="Social" value={routeCommitments.intl || 0} />
        <RouteMeter label="Shanghai" value={routeCommitments.city || 0} />
        <RouteMeter label="Survival" value={routeCommitments.survival || 0} />
      </div>

      {state.relationships && (
        <div className="space-y-1.5 pt-3 border-t border-slate-700">
          <h2 className="text-[10px] uppercase tracking-widest text-pink-500 font-semibold mb-2">Character Bonds</h2>
          <div className="space-y-1.5 text-xs">
            {Object.entries(state.relationships).filter(([k,v]) => v.friendship > 0 || v.romance > 0).map(([character, rel]) => (
                <div key={character} className="bg-slate-800 border border-slate-600 rounded-md p-2 flex flex-col gap-1">
                    <div className="font-bold text-slate-200">{character}</div>
                    <div className="flex gap-4">
                        <span className="text-blue-300">🤝 Bond: {rel.friendship}</span>
                        {rel.romance > 0 && <span className="text-pink-400">💖 Closeness: {rel.romance}</span>}
                    </div>
                </div>
            ))}
          </div>
        </div>
      )}
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

function RouteMeter({ label, value }) {
  const clamped = Math.min(8, Math.max(0, value));
  return (
    <div className="grid grid-cols-[88px_1fr_24px] items-center gap-2 text-[10px] text-slate-300">
      <span className="font-semibold">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-cyan-400 transition-all duration-500" style={{ width: `${(clamped / 8) * 100}%` }}></div>
      </div>
      <span className="font-mono text-cyan-300">{value}</span>
    </div>
  );
}
