import React, { useState } from 'react';
import MermaidDiagram from './MermaidDiagram';
import PhoneMockup from './PhoneMockup';

const SKILLS = [
  { id: 'analyze', icon: '📊', color: 'text-blue-400', title: 'Analyze my week', sub: 'Running summary & progress' },
  { id: 'plan', icon: '🏃', color: 'text-green-400', title: 'Plan for today', sub: 'Session from your load' },
  { id: 'recovery', icon: '❤️', color: 'text-red-400', title: 'Recovery advice', sub: 'Sleep, HRV & readiness' },
  { id: 'training', icon: '🎯', color: 'text-purple-400', title: 'Training advice', sub: 'Pace, zones & form' },
];

const CHIPS = [
  { label: 'Recovery advice', view: 'recovery' },
  { label: 'Am I overtraining?', view: 'analyze' },
  { label: 'Best nutrition tips', view: 'nutrition' },
  { label: 'Plan my next week', view: 'diagram' },
];

const METRICS_ROWS = [
  { metric: 'Resting HR', value: '47.7 bpm', range: '42–48 bpm', status: 'Slightly elevated' },
  { metric: 'Sleep avg', value: '6.1 h', range: '7.0–8.0 h', status: 'Below target' },
  { metric: 'Training load', value: 'Elevated', range: 'Moderate', status: 'Ease 2–3 days' },
  { metric: 'Weekly volume', value: '39.8 km', range: '32–45 km', status: 'On track' },
];

const SIGNAL_ROWS = [
  { signal: 'Resting HR', status: '+4 bpm', focus: 'Prioritize sleep' },
  { signal: 'Sleep', status: '6.1 h avg', focus: 'Target 7.5 h' },
  { signal: 'Training load', status: 'Elevated', focus: 'Easy effort only' },
  { signal: 'HRV', status: 'Slightly down', focus: 'Skip intervals' },
];

const WEEK_COMPARE_ROWS = [
  { metric: 'Distance', value: '39.8 km', range: '31.2 km', status: '+27%' },
  { metric: 'Avg pace', value: '5:42 /km', range: '5:58 /km', status: '−16s' },
  { metric: 'Zone 2 time', value: '2h 14m', range: '1h 48m', status: '+24%' },
  { metric: 'Resting HR', value: '51 bpm', range: '47 bpm', status: '+4 bpm' },
];

const NUTRIENT_ROWS = [
  { metric: 'Carbs', value: 'On track', range: '5–7 g/kg', status: 'Hard days' },
  { metric: 'Protein', value: 'Slightly low', range: '1.4 g/kg', status: 'Add post-run' },
  { metric: 'Hydration', value: 'Below target', range: '2.5 L+ / day', status: 'Increase' },
  { metric: 'Electrolytes', value: 'Sat long run', range: '90 min+', status: 'Add gels' },
];

const WEEK_PLAN_ROWS = [
  { metric: 'Mon', value: 'Easy 6 km', range: 'Zone 2', status: 'Base' },
  { metric: 'Wed', value: '5 × 800 m', range: 'Zone 4', status: 'Quality' },
  { metric: 'Sat', value: 'Long 14 km', range: 'Zone 2', status: 'Anchor' },
  { metric: 'Sun', value: 'Recovery 5 km', range: 'Zone 1', status: 'Flush' },
];

const WEEK_PLAN_PIE = `pie showData
  title Next week by session type
  "Easy runs" : 32
  "Long run" : 28
  "Intervals" : 18
  "Recovery" : 14
  "Rest / mobility" : 8`;

function ModelBar() {
  return (
    <div className="flex items-center justify-center gap-3 px-4 py-3">
      <button type="button" className="text-gray-400" aria-label="Close">✕</button>
      <div className="flex items-center gap-2 rounded-full border border-brand-pink/50 bg-[#1c1c1e] px-3 py-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-pink text-[10px] text-white">⚡</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Model</span>
        <span className="text-xs font-semibold text-white">Auto</span>
        <span className="text-[10px] text-gray-500">▾</span>
      </div>
      <button type="button" className="text-gray-400" aria-label="Menu">☰</button>
    </div>
  );
}

function InputBar({ onChip }) {
  return (
    <div className="border-t border-white/5 bg-black px-3 pb-4 pt-3">
      <div className="flex items-center gap-2">
        <button type="button" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2c2c2e] text-gray-300">+</button>
        <div className="flex flex-1 items-center rounded-full bg-[#1c1c1e] px-4 py-2.5">
          <span className="text-sm text-gray-500">Ask about training, nutrition,…</span>
        </div>
        <button type="button" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2c2c2e] text-gray-300">↑</button>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => onChip(chip.view, chip.label)}
            className="shrink-0 rounded-full border border-brand-pink/60 bg-transparent px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-pink/15"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeView({ onSkill }) {
  const skillPrompts = {
    analyze: 'Analyze my week',
    plan: 'Plan for today',
    recovery: 'Recovery advice',
    nutrition: 'Training advice',
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h3 className="text-xl font-bold text-white">Hi! I&apos;m your AI coach</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        I read your Apple Health workouts, suggest a plan and answer questions about form, nutrition and recovery.
      </p>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Where do we start?</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {SKILLS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              const view = s.id === 'recovery' ? 'recovery' : s.id === 'training' ? 'nutrition' : s.id;
              onSkill(view, skillPrompts[s.id === 'training' ? 'nutrition' : s.id]);
            }}
            className="rounded-2xl border border-white/5 bg-[#1c1c1e] p-3 text-left transition hover:border-brand-pink/40 hover:bg-[#242426]"
          >
            <span className={`text-lg ${s.color}`}>{s.icon}</span>
            <p className="mt-2 text-sm font-semibold text-white">{s.title}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-gray-500">{s.sub}</p>
          </button>
        ))}
      </div>
      <p className="mt-4 flex items-start gap-1.5 text-[10px] text-gray-600">
        <span>ⓘ</span> AI can make mistakes. Not a substitute for medical advice.
      </p>
    </div>
  );
}

function UserBubble({ children }) {
  return (
    <div className="mb-4 ml-auto w-fit max-w-[85%] rounded-full bg-brand-pink px-4 py-2.5 text-sm text-white">
      {children}
    </div>
  );
}
function NutritionView({ prompt = 'Best nutrition tips' }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <UserBubble>{prompt}</UserBubble>
      <div className="space-y-3 text-sm leading-relaxed text-gray-300">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Based on your Apple Health data</p>
        <p className="font-bold text-white">Nutrition for your current load</p>
        <p>
          You logged <strong className="text-white">39.8 km</strong> this week with elevated training stress.
          Fuel consistently — easy days are not low-fuel days when you&apos;re building volume.
        </p>
        <p>
          <strong className="text-white">Hydration</strong> — Aim for 2.5 L+ daily. On runs over 60 min,
          target 500–750 ml/hour and add electrolytes past 90 minutes.
        </p>
        <p>
          <strong className="text-white">Carbohydrates</strong> — 5–7 g/kg on hard days. Front-load carbs
          2–3 hours before Saturday&apos;s long run.
        </p>
        <p>
          <strong className="text-white">Protein</strong> — 1.2–1.6 g/kg daily. Take 25–30 g within 60 min
          after key sessions to support repair.
        </p>
        <MetricsTable rows={NUTRIENT_ROWS} columns={['Nutrient', 'Trend', 'Target']} />
        <div className="rounded-xl border border-brand-pink/30 bg-[#1c1c1e] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-pink">Today&apos;s focus</p>
          <p className="mt-1 text-sm text-white">Keep carbs steady before tomorrow&apos;s quality session. Hydrate early — you&apos;re trending below target.</p>
        </div>
      </div>
    </div>
  );
}

function MetricsTable({ rows, columns, onRowClick, activeRow }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-brand-pink/50">
      <table className="w-full min-w-[260px] text-left text-[11px]">
        <thead>
          <tr className="border-b border-brand-pink/40 text-[10px] uppercase tracking-wider text-gray-400">
            {columns.map((c) => (
              <th key={c} className="px-2.5 py-2 font-semibold">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.metric || row.signal}
              onClick={() => onRowClick?.(i)}
              className={`cursor-pointer border-b border-brand-pink/20 transition last:border-0 ${
                activeRow === i ? 'bg-brand-pink/15' : 'hover:bg-white/5'
              }`}
            >
              <td className="px-2.5 py-2 font-medium text-white">{row.metric || row.signal}</td>
              <td className="px-2.5 py-2 text-gray-300">{row.value || row.status}</td>
              <td className="px-2.5 py-2 text-gray-400">{row.range || row.focus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalyzeView({ prompt = 'Analyze my week' }) {
  const [activeRow, setActiveRow] = useState(0);
  const row = SIGNAL_ROWS[activeRow];

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <UserBubble>{prompt}</UserBubble>
      <div className="space-y-3 text-sm text-gray-300">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Week analysis · recovery check</p>
        <p className="font-bold text-white">Strong week — but watch recovery</p>
        <p>
          You ran <strong className="text-white">39.8 km</strong> across 5 sessions, up <strong className="text-white">27%</strong> from
          last week. Pacing improved and Zone 2 volume is trending well. Resting HR is <strong className="text-white">~4 bpm above baseline</strong> —
          usually a recovery signal, not a fitness problem.
        </p>
        <MetricsTable rows={WEEK_COMPARE_ROWS} columns={['Metric', 'This wk', 'Last wk']} />
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Recovery signals · tap to inspect ↓
        </p>
        <MetricsTable
          rows={SIGNAL_ROWS}
          columns={['Signal', 'Status', 'Focus']}
          activeRow={activeRow}
          onRowClick={setActiveRow}
        />
        <div className="rounded-xl border border-brand-pink/30 bg-[#1c1c1e] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-pink">Selected · {row.signal}</p>
          <p className="mt-1 text-sm text-white">{row.focus}</p>
          <p className="mt-1 text-xs text-gray-500">Status: {row.status}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#141414] p-3 text-xs leading-relaxed">
          <p className="font-semibold text-white">Recommendation</p>
          <p className="mt-1">Ease load for 2–3 days. Swap Wednesday intervals for an easy 30-min jog. Keep Saturday&apos;s long run in Zone 2.</p>
        </div>
      </div>
    </div>
  );
}

function RecoveryView({ prompt = 'Recovery advice' }) {
  const [activeRow, setActiveRow] = useState(0);

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <UserBubble>{prompt}</UserBubble>
      <div className="space-y-3 text-sm text-gray-300">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Readiness snapshot</p>
        <p className="font-bold text-white">Ease load for 2–3 days</p>
        <p>
          Sleep is averaging <strong className="text-white">6.1 h</strong> (below your 7–8 h target) and resting HR
          is elevated. Your body is absorbing a big week — prioritise rest before adding intensity.
        </p>
        <MetricsTable
          rows={METRICS_ROWS}
          columns={['Metric', 'Current', 'Range']}
          activeRow={activeRow}
          onRowClick={setActiveRow}
        />
        <p className="text-xs text-gray-500">
          Highlighted: <span className="text-white">{METRICS_ROWS[activeRow].metric}</span> — {METRICS_ROWS[activeRow].status}
        </p>
        <div className="space-y-2 rounded-xl border border-white/5 bg-[#141414] p-3 text-xs leading-relaxed">
          <p className="font-semibold text-white">This week</p>
          <p>· Replace intervals with 30 min easy jog</p>
          <p>· Cap Saturday long run HR in Zone 2</p>
          <p>· In bed 30 min earlier for 4 nights</p>
          <p>· 10 min foam rolling post-session</p>
        </div>
      </div>
    </div>
  );
}

function PlanTodayView({ prompt = 'Plan for today' }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <UserBubble>{prompt}</UserBubble>
      <div className="space-y-3 text-sm text-gray-300">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Session from your load</p>
        <p className="font-bold text-white">Easy run · 6 km · Zone 2</p>
        <p>
          Yesterday&apos;s load was elevated and sleep came in under target. Today should be aerobic, not ambitious —
          build the week without digging a recovery hole.
        </p>
        <div className="rounded-xl border border-brand-pink/40 bg-[#1c1c1e] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-pink">Today&apos;s session</p>
          <p className="mt-2 text-sm text-white">6 km easy · 5:45–6:00 /km</p>
          <p className="mt-1 text-xs text-gray-500">HR cap Zone 2 · RPE 3–4 · flat or gentle terrain</p>
        </div>
        <p>
          <strong className="text-white">Warm-up</strong> — 8 min walk/jog, 4 × 20 s strides.{' '}
          <strong className="text-white">Cool-down</strong> — 5 min walk, light stretching.
        </p>
        <p className="text-xs text-gray-500">
          Skip intervals until resting HR normalises. Wednesday is your next quality window if recovery trends improve.
        </p>
      </div>
    </div>
  );
}

function DiagramView({ prompt = 'Plan my next week' }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <UserBubble>{prompt}</UserBubble>
      <div className="space-y-3 text-sm text-gray-300">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Proposed training block</p>
        <p className="font-bold text-white">Built from your last 4 weeks</p>
        <p>
          Volume, recovery signals, and your Saturday long-run pattern shaped this block. Easy and long runs carry
          most of the load; one quality session mid-week; full rest Thursday.
        </p>
        <MetricsTable rows={WEEK_PLAN_ROWS} columns={['Day', 'Session', 'Zone']} />
        <MermaidDiagram chart={WEEK_PLAN_PIE} />
        <p className="text-xs text-gray-500">Volume split across session types for the week ahead</p>
        <div className="rounded-xl border border-brand-pink/30 bg-[#1c1c1e] p-3 text-xs leading-relaxed">
          <p className="font-semibold text-white">Key takeaway</p>
          <p className="mt-1">Keep Saturday as your long-run anchor. If resting HR stays elevated, swap Wednesday intervals for another easy day.</p>
        </div>
      </div>
    </div>
  );
}

const VIEWS = {
  home: HomeView,
  nutrition: NutritionView,
  analyze: AnalyzeView,
  recovery: RecoveryView,
  diagram: DiagramView,
  plan: PlanTodayView,
};

export default function AppChatDemo({ className = '' }) {
  const [view, setView] = useState('home');
  const [prompt, setPrompt] = useState('');
  const View = VIEWS[view] || HomeView;

  function navigate(nextView, nextPrompt) {
    setView(nextView);
    setPrompt(nextPrompt);
  }

  return (
    <div className={className}>
      <PhoneMockup>
        <div className="flex h-full min-h-0 flex-col bg-black">
          <ModelBar />
          {view === 'home' ? (
            <HomeView onSkill={navigate} />
          ) : (
            <View prompt={prompt} />
          )}
          <InputBar onChip={navigate} />
        </div>
      </PhoneMockup>
    </div>
  );
}
