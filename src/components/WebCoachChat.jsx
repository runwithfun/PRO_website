import React, { useState } from 'react';
import CoachMarkdown from './CoachMarkdown';
import MermaidDiagram from './MermaidDiagram';

const PROMPTS = [
  { id: 'analyze', label: 'Analyze my week' },
  { id: 'nutrition', label: 'Nutrition tips' },
  { id: 'recovery', label: 'Recovery check' },
  { id: 'diagram', label: 'Plan next week' },
];

const SPORT_PIE = `pie showData
  title Sport distribution this month
  "Running" : 48
  "Cycling" : 28
  "Strength" : 14
  "Other" : 10`;

const ZONE_PIE = `pie showData
  title Heart-rate zones (this week)
  "Zone 1" : 18
  "Zone 2" : 42
  "Zone 3" : 24
  "Zone 4" : 12
  "Zone 5" : 4`;

const TRAINING_FLOW = `flowchart LR
  A["Mon · Easy 6 km"] --> B["Wed · Intervals"]
  B --> C["Fri · Rest"]
  C --> D["Sat · Long 14 km"]
  D --> E["Sun · Recovery"]
  style A fill:#1a1a1a,stroke:#d42d78,color:#fff
  style B fill:#1a1a1a,stroke:#3b82f6,color:#fff
  style C fill:#1a1a1a,stroke:#6b7280,color:#fff
  style D fill:#1a1a1a,stroke:#d42d78,color:#fff
  style E fill:#1a1a1a,stroke:#22c55e,color:#fff`;

const RECOVERY_MINDMAP = `mindmap
  root((Recovery plan))
    Sleep
      Target 7.5h
      Earlier bedtime
    Load
      Ease 2 to 3 days
      No intervals
    Signals
      Resting HR +4 bpm
      HRV slightly down`;

const NUTRITION_MINDMAP = `mindmap
  root((Race fuel))
    Pre-run
      Carbs 2h before
      Hydration 500ml
    During
      500 to 750 ml per hour
      Gels after 60 min
    Post-run
      Protein 25 to 30g
      Rehydrate`;

const CONTENT = {
  analyze: {
    question: 'How did my running week compare to last week?',
    markdown: `*Based on your Apple Health data*

### Strong week — volume up, pacing improved

You ran **39.8 km** across 5 sessions, up **27%** from last week. Easy-day pacing improved and Zone 2 volume is trending in the right direction. Resting HR is slightly elevated — watch recovery alongside load.

| Metric | This week | Last week | Δ |
| --- | --- | --- | --- |
| Distance | 39.8 km | 31.2 km | **+27%** |
| Avg pace | 5:42 /km | 5:58 /km | **−16s** |
| Zone 2 time | 2h 14m | 1h 48m | **+24%** |
| Resting HR | 51 bpm | 47 bpm | +4 bpm |
| Sleep avg | 6.1 h | 6.4 h | −18m |

**Recommendation:** keep Saturday as your long-run anchor. Add one 30-min recovery jog on Tuesday instead of pushing mid-week intensity.`,
    diagrams: [
      { label: 'Sport mix', chart: SPORT_PIE },
      { label: 'HR zones', chart: ZONE_PIE },
    ],
  },
  nutrition: {
    question: 'Best nutrition tips for my current training load?',
    markdown: `### Best nutrition for endurance athletes

Given your **39.8 km** week and elevated load, prioritise fueling and recovery:

1. **Hydration** — 500–750 ml/hour on runs over 60 min. Add electrolytes when sessions exceed 90 min.
2. **Carbohydrates** — 5–7 g/kg on hard training days. Front-load carbs 2–3 h before your long Saturday run.
3. **Protein** — 1.2–1.6 g/kg daily. 25–30 g within 60 min post-session for muscle repair.
4. **Stretching & foam rolling** — 10 min post-session to reduce soreness.

| Nutrient | Target | Your trend |
| --- | --- | --- |
| Carbs | 5–7 g/kg | On track |
| Protein | 1.4 g/kg | Slightly low |
| Hydration | 2.5 L+ / day | Below target |
| Electrolytes | On long runs | Add on Sat |

> Easy days are not low-fuel days — keep carbs steady to support tomorrow's quality session.`,
    diagrams: [{ label: 'Fuel strategy', chart: NUTRITION_MINDMAP }],
  },
  recovery: {
    question: 'Am I overtraining? What should I focus on?',
    markdown: `### Recovery check — ease load for 2–3 days

Resting HR is elevated. You're **~4 bpm above your baseline**. Usually a recovery signal, not a fitness problem. Ease load for 2–3 days and watch the trend.

| Signal | Status | Focus |
| --- | --- | --- |
| Resting HR | +4 bpm | Prioritize sleep |
| Sleep | 6.1 h avg | Target 7.5 h |
| Training load | Elevated | Easy effort only |
| HRV | Slightly down | Skip intervals |

**What to do this week:**
- Replace Wednesday intervals with 30 min easy jog
- Keep Saturday long run but cap HR in Zone 2
- In bed 30 min earlier for the next 4 nights`,
    diagrams: [{ label: 'Recovery focus', chart: RECOVERY_MINDMAP }],
  },
  diagram: {
    question: 'Plan my next week based on recent load and recovery.',
    markdown: `### Proposed training block

Built from your last 4 weeks of volume, recovery signals, and long-run pattern.

| Day | Session | Intensity | Target |
| --- | --- | --- | --- |
| Mon | Easy run | Zone 2 | 6 km |
| Tue | Recovery jog | Zone 1 | 30 min |
| Wed | Intervals | Zone 4 | 5 × 800 m |
| Thu | Rest | — | — |
| Fri | Mobility | Easy | 20 min |
| Sat | Long run | Zone 2 | 14 km |
| Sun | Recovery | Zone 1 | 5 km |

The block below maps how sessions connect across the week.`,
    diagrams: [{ label: 'Weekly flow', chart: TRAINING_FLOW }],
  },
};

function UserBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-2xl rounded-full bg-brand-pink px-6 py-3.5 text-base font-medium text-white shadow-lg shadow-brand-pink/20 sm:text-lg">
        {children}
      </div>
    </div>
  );
}

function CoachAnswer({ topic }) {
  const data = CONTENT[topic] || CONTENT.analyze;

  return (
    <>
      <UserBubble>{data.question}</UserBubble>
      <div className="web-chat-answer rounded-3xl border border-white/8 bg-black px-5 py-6 sm:px-8 sm:py-8">
        <CoachMarkdown content={data.markdown} />

        {data.diagrams?.length > 0 && (
          <div
            className={`mt-2 grid gap-6 ${
              data.diagrams.length > 1 ? 'lg:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {data.diagrams.map((d) => (
              <div key={d.label}>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">
                  {d.label}
                </p>
                <MermaidDiagram chart={d.chart} className="min-h-[220px] p-4 sm:p-5" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function WebCoachChat() {
  const [topic, setTopic] = useState('analyze');

  return (
    <div className="web-chat w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-brand-pink/10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-pink">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-white">Coach Assistant</p>
            <p className="text-xs text-gray-500">Markdown · tables · diagrams</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-brand-pink/40 bg-white/5 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-gray-300">Model · Auto</span>
        </div>
      </div>

      <div className="max-h-[min(75vh,920px)] space-y-6 overflow-y-auto px-4 py-8 sm:space-y-8 sm:px-8">
        <CoachAnswer key={topic} topic={topic} />
      </div>

      <div className="border-t border-white/8 bg-[#0a0a0a] px-4 py-5 sm:px-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {PROMPTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setTopic(p.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                topic === p.id
                  ? 'bg-brand-pink text-white'
                  : 'border border-brand-pink/50 text-gray-300 hover:bg-brand-pink/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#141414] px-5 py-3.5">
          <span className="flex-1 text-sm text-gray-500">Ask about training, nutrition, recovery…</span>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink text-white"
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
