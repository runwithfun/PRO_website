// Данные демо-чата. Каталог моделей, тексты, навыки и подсказки взяты из приложения
// (FullApp/P.R.O.: ChatChrome.swift, ChatModelSelection.swift, ChatSkillsSheet.swift,
// Chat.swift) и сервера (SERVER/services/llm/registry.py — витрина GET /ai/models).
// Ответы коуча — заготовленные, на демонстрационных данных; сеть не используется.

/* ── Модели (порядок = порядок в каталоге сервера) ─────────────────────────── */

export const MODELS = [
  {
    id: 'auto', label: 'Auto', level: 'auto', brand: 'none',
    tagline: 'Fast everyday assistant — included free.',
    strengths: ['fast', 'everyday'], speed: 'fast', cost: 'low',
  },
  {
    id: 'deepseek/deepseek-v4-flash', label: 'DeepSeek V4 Flash', level: 'basic', brand: 'deepseek',
    tagline: 'Newest DeepSeek — fast and superb value.',
    strengths: ['reasoning', 'value', 'fast'], speed: 'fast', cost: 'low',
  },
  {
    id: 'qwen/qwen3-235b-a22b-2507', label: 'Qwen3 235B', level: 'basic', brand: 'qwen',
    tagline: 'Huge open model — unbeatable value for general & coding.',
    strengths: ['general', 'coding', 'value'], speed: 'medium', cost: 'low',
  },
  {
    id: 'openai/gpt-5-mini', label: 'GPT-5 mini', level: 'basic', brand: 'openai',
    tagline: 'Quick, capable all-rounder.',
    strengths: ['fast', 'general'], speed: 'fast', cost: 'low',
  },
  {
    id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash', level: 'basic', brand: 'gemini',
    tagline: 'Blazing fast, huge context window.',
    strengths: ['fast', 'long context'], speed: 'fast', cost: 'low',
  },
  {
    id: 'moonshotai/kimi-k2.5', label: 'Kimi K2.5', level: 'basic', brand: 'moonshot',
    tagline: 'Agentic powerhouse, strong at coding.',
    strengths: ['coding', 'agentic', 'reasoning'], speed: 'medium', cost: 'low',
  },
  {
    id: 'google/gemini-2.5-pro', label: 'Gemini 2.5 Pro', level: 'advanced', brand: 'gemini',
    tagline: 'Deep analysis over long context.',
    strengths: ['analysis', 'long context', 'reasoning'], speed: 'medium', cost: 'medium',
  },
  {
    id: 'openai/gpt-5.2', label: 'GPT-5.2', level: 'advanced', brand: 'openai',
    tagline: 'Newest GPT — top-tier reasoning.',
    strengths: ['reasoning', 'general'], speed: 'medium', cost: 'medium',
  },
  {
    id: 'anthropic/claude-sonnet-4.6', label: 'Claude Sonnet 4.6', level: 'advanced', brand: 'anthropic',
    tagline: 'Excellent writing and coding.',
    strengths: ['writing', 'coding'], speed: 'medium', cost: 'medium',
  },
  {
    id: 'anthropic/claude-opus-4.8', label: 'Claude Opus 4.8', level: 'advanced', brand: 'anthropic',
    tagline: 'Most capable for the hardest problems.',
    strengths: ['reasoning', 'coding', 'analysis'], speed: 'slow', cost: 'high',
  },
  {
    id: 'super-composer', label: 'Super Composer', level: 'fusion', brand: 'none',
    tagline: 'A council of top models, debated and synthesized into one best answer.',
    strengths: ['accuracy', 'reasoning', 'hardest tasks'], speed: 'slow', cost: 'high',
  },
];

/** Группы пикера: Super Composer → Auto → Basic → Advanced (AIModelLevel.sortOrder). */
export const MODEL_GROUPS = [
  { level: 'fusion', title: 'Super Composer', badge: 'Premium' },
  { level: 'auto', title: 'Auto', badge: 'Free' },
  { level: 'basic', title: 'Basic', badge: 'Pro+' },
  { level: 'advanced', title: 'Advanced', badge: 'Premium' },
];

/** Тизер в пилюле на новом чате: все модели, кроме Auto, максимум 8. */
export const TICKER_MODELS = MODELS.filter((m) => m.id !== 'auto').slice(0, 8);

/** Провайдеры BYOK (BYOKProvider.allCases) — крутятся в шапке «ADD API KEY». */
export const BYOK_PROVIDERS = ['openrouter', 'openai', 'anthropic', 'gemini', 'deepseek', 'qwen', 'moonshot'];

export const SPEED_RANK = { fast: 3, medium: 2, slow: 1 };
export const COST_RANK = { high: 3, medium: 2, low: 1 };

/* ── Экран приветствия (ChatWelcomeView) ───────────────────────────────────── */

export const WELCOME_CARDS = [
  { icon: 'chart', color: 'blue', title: 'Analyze my week', desc: 'Running summary & progress', script: 'analyze' },
  { icon: 'run', color: 'green', title: 'Plan for today', desc: 'What and how to train', script: 'today' },
  { icon: 'heart', color: 'red', title: 'Recovery advice', desc: 'Rest & readiness', script: 'recovery' },
  { icon: 'target', color: 'purple', title: 'Training advice', desc: 'Goals & targets', script: 'training' },
];

/* ── Лист навыков «+» (ChatSkillsSheet) ────────────────────────────────────── */

export const SKILL_ACTIONS = [
  { icon: 'chart', color: 'blue', title: 'Analyze my week', subtitle: 'Running summary & progress', script: 'analyze' },
  { icon: 'run', color: 'green', title: 'Plan for today', subtitle: 'What and how to train', script: 'today' },
  { icon: 'target', color: 'purple', title: 'Training advice', subtitle: 'Set goals & get a plan', script: 'training' },
];

export const SKILL_GROUPS = [
  {
    title: 'Recovery',
    skills: [
      { icon: 'heart', color: 'red', title: 'Recovery advice', script: 'recovery' },
      { icon: 'gauge', color: 'pink', title: 'Am I overtraining?', script: 'overtraining' },
      { icon: 'bed', color: 'indigo', title: 'How is my sleep affecting training?', script: 'sleep' },
    ],
  },
  {
    title: 'Training',
    skills: [
      { icon: 'run', color: 'green', title: 'How to improve running?', script: 'improve' },
      { icon: 'boltHeart', color: 'red', title: 'How to build endurance?', script: 'endurance' },
      { icon: 'flag', color: 'gray', title: 'Tips for race day', script: 'race' },
      { icon: 'bandage', color: 'teal', title: 'How to prevent injuries?', script: 'injuries' },
    ],
  },
  {
    title: 'Nutrition',
    skills: [
      { icon: 'fork', color: 'orange', title: 'Best nutrition tips', script: 'nutrition' },
      { icon: 'bag', color: 'orange', title: 'What to eat before a run?', script: 'preRun' },
    ],
  },
  {
    title: 'Planning',
    skills: [{ icon: 'calendar', color: 'blue', title: 'Plan my next week', script: 'nextWeek' }],
  },
];

/* ── Тулы агента (AgentToolStatusText / AgentDeviceTool) ───────────────────── */

export const TOOLS = {
  get_workouts: { icon: 'run', label: 'looking through your workouts…', title: 'workouts' },
  get_health: { icon: 'heart', label: 'reading your Health data…', title: 'health data' },
  get_daily_metrics: { icon: 'walk', label: 'reading your daily metrics…', title: 'daily metrics' },
  get_training_plan: { icon: 'calendar', label: 'opening your training plan…', title: 'training plan' },
  get_goals: { icon: 'target', label: 'checking your goals…', title: 'goals' },
  recall: { icon: 'brain', label: 'remembering what you told me…', title: 'memory' },
};

/* ── Сценарии ответов ──────────────────────────────────────────────────────────
   text — markdown-подмножество, которое рисует нативный текст приложения
   (абзацы, **жирный**, ### заголовки, списки «- »). blocks — структурные блоки
   (таблицы, диаграмма), они идут ПОСЛЕ текста, как в ChatAssistantMessageCard.
   chips — follow-up подсказки под строкой ввода (в приложении — 3 случайные из пула). */

export const SCRIPTS = {
  analyze: {
    prompt: "Analyze my training this week and how I'm progressing.",
    tools: ['get_workouts', 'get_health'],
    text: `**Strong week — volume is up, recovery is lagging a little.**

You ran **39.8 km** across 5 sessions, **27% more** than last week. Average pace dropped by 16 s/km and Zone 2 time grew, so the aerobic base is building nicely.

Resting HR sits **~4 bpm above your baseline**. That's usually fatigue, not lost fitness.

### What I'd do next
- Swap Wednesday's intervals for an easy 30 min
- Keep Saturday's long run in Zone 2
- Get to bed 30 min earlier for the next 3 nights`,
    blocks: [
      {
        type: 'table',
        head: ['Metric', 'This week', 'Last week'],
        rows: [
          ['Distance', '39.8 km', '31.2 km'],
          ['Avg pace', '5:42 /km', '5:58 /km'],
          ['Zone 2 time', '2h 14m', '1h 48m'],
          ['Resting HR', '51 bpm', '47 bpm'],
        ],
      },
    ],
    chips: ['Am I overtraining?', 'Plan my next week', 'Recovery advice'],
  },
  today: {
    prompt: 'What should I train today, and how hard?',
    tools: ['get_training_plan', 'get_health'],
    text: `**Easy run · 6 km · Zone 2.**

Yesterday's load was high and you slept **6 h 05 m**, below your usual 7 h 20 m. Today should build the week, not dig a recovery hole.

- **Warm-up:** 8 min walk/jog + 4 × 20 s strides
- **Main:** 6 km at 5:45–6:00 /km, HR under 148
- **Cool-down:** 5 min walk, light stretching

Wednesday is your next quality window if resting HR settles.`,
    blocks: [
      {
        type: 'table',
        head: ['Part', 'Target', 'Effort'],
        rows: [
          ['Warm-up', '8 min', 'RPE 2'],
          ['Easy run', '6 km', 'Zone 2'],
          ['Cool-down', '5 min', 'RPE 1'],
        ],
      },
    ],
    chips: ['How is my sleep affecting training?', 'What to eat before a run?', 'How to build endurance?'],
  },
  recovery: {
    prompt: 'Recovery advice',
    tools: ['get_health', 'get_daily_metrics'],
    text: `**Ease off for 2–3 days.**

Sleep is averaging **6.1 h** against your 7–8 h target, and resting HR is up. Your body is still absorbing a big week, so give it room before adding intensity.

- Replace intervals with a 30 min easy jog
- Cap Saturday's long run in Zone 2
- 10 min of mobility after each session`,
    blocks: [
      {
        type: 'table',
        head: ['Signal', 'Now', 'Target'],
        rows: [
          ['Resting HR', '51 bpm', '47 bpm'],
          ['Sleep avg', '6.1 h', '7–8 h'],
          ['HRV', '38 ms', '45 ms'],
          ['Training load', 'High', 'Moderate'],
        ],
      },
    ],
    chips: ['Am I overtraining?', 'How is my sleep affecting training?', 'Best nutrition tips'],
  },
  training: {
    prompt: 'Training Advice for Run 10K under 50 min',
    loading: 'Generating training advice',
    tools: [],
    text: `**Sub-50 10K is realistic in 8 weeks.**

Your recent 5K pace of **4:52 /km** projects to about 51:30 for 10K. Closing that gap means more threshold work and a longer long run.

### Key sessions
- **Tuesday:** 5 × 1 km at 4:50 /km, 2 min jog
- **Thursday:** 25 min tempo at 5:05 /km
- **Sunday:** long run, building to 16 km

Keep every other run easy — that's where the fitness actually lands.`,
    blocks: [
      {
        type: 'table',
        head: ['Week', 'Volume', 'Focus'],
        rows: [
          ['1–2', '32 km', 'Base'],
          ['3–5', '38 km', 'Threshold'],
          ['6–7', '42 km', 'Race pace'],
          ['8', '25 km', 'Taper'],
        ],
      },
    ],
    chips: ['Tips for race day', 'How to prevent injuries?', 'Plan my next week'],
  },
  overtraining: {
    prompt: 'Am I overtraining?',
    tools: ['get_health', 'get_workouts'],
    text: `**Not overtrained — but you're in overreaching territory.**

Two of four warning signs are on: resting HR is **+4 bpm** and HRV has been below baseline for **5 days**. Performance is still improving, which is the good news.

A light week now keeps it that way. Push through it and the next block starts from a deeper hole.`,
    blocks: [
      {
        type: 'table',
        head: ['Warning sign', 'Status'],
        rows: [
          ['Resting HR up', 'Yes · +4 bpm'],
          ['HRV down', 'Yes · 5 days'],
          ['Pace dropping', 'No'],
          ['Poor sleep', 'Borderline'],
        ],
      },
    ],
    chips: ['Recovery advice', 'Plan my next week', 'How is my sleep affecting training?'],
  },
  sleep: {
    prompt: 'How is my sleep affecting training?',
    tools: ['get_health'],
    text: `**Short nights are showing up in your runs.**

On nights under 6.5 h, your next-day easy pace was **11 s/km slower** at the same heart rate. Deep sleep averaged **58 min** this week, about 20 min less than last month.

- Keep a fixed bedtime, even on weekends
- No hard sessions after 8 pm
- Aim for 7.5 h before Saturday's long run`,
    blocks: [],
    chips: ['Recovery advice', 'Am I overtraining?', 'Best nutrition tips'],
  },
  nutrition: {
    prompt: 'Best nutrition tips',
    tools: ['get_workouts'],
    text: `**Fuel for the week you're actually running.**

At ~40 km a week, easy days are not low-fuel days.

- **Carbs:** 5–7 g/kg on hard days, front-loaded before the long run
- **Protein:** 25–30 g within an hour after key sessions
- **Hydration:** 2.5 L+ a day, electrolytes on runs over 90 min`,
    blocks: [
      {
        type: 'table',
        head: ['Nutrient', 'Now', 'Target'],
        rows: [
          ['Carbs', 'On track', '5–7 g/kg'],
          ['Protein', 'A bit low', '1.4 g/kg'],
          ['Hydration', 'Low', '2.5 L/day'],
        ],
      },
    ],
    chips: ['What to eat before a run?', 'Recovery advice', 'Tips for race day'],
  },
  nextWeek: {
    prompt: 'Plan my next week',
    tools: ['get_training_plan', 'get_workouts'],
    text: `**A lighter week to absorb the last block.**

Volume drops to **34 km**, with one quality session and Saturday as your long-run anchor. Thursday stays a full rest day.`,
    blocks: [
      {
        type: 'table',
        head: ['Day', 'Session', 'Zone'],
        rows: [
          ['Mon', 'Easy 6 km', 'Z2'],
          ['Wed', '5 × 800 m', 'Z4'],
          ['Sat', 'Long 14 km', 'Z2'],
          ['Sun', 'Recovery 5 km', 'Z1'],
        ],
      },
      {
        type: 'pie',
        title: 'Next week by session type',
        slices: [
          ['Easy runs', 38],
          ['Long run', 30],
          ['Intervals', 18],
          ['Recovery', 14],
        ],
      },
    ],
    chips: ['How to build endurance?', 'Best nutrition tips', 'Am I overtraining?'],
  },
  improve: {
    prompt: 'How to improve running?',
    tools: ['get_workouts'],
    text: `**Your biggest lever is consistency, not speed work.**

You ran 3–5 times a week for the last 6 weeks. Making that a steady 4 will do more than adding another interval session.

- 80% of runs easy, 20% hard
- Strides twice a week for form
- One long run, growing 10% at most per week`,
    blocks: [],
    chips: ['How to build endurance?', 'How to prevent injuries?', 'Plan my next week'],
  },
  endurance: {
    prompt: 'How to build endurance?',
    tools: ['get_workouts', 'get_health'],
    text: `**Grow the long run, keep it slow.**

Your long run is **12 km**. Add 1–1.5 km every other week and stay under **148 bpm** — that's your Zone 2 ceiling.

Back-to-back easy days build more endurance than one heroic run.`,
    blocks: [],
    chips: ['Plan my next week', 'Best nutrition tips', 'Recovery advice'],
  },
  race: {
    prompt: 'Tips for race day',
    tools: ['get_goals'],
    text: `**Start slower than you want to.**

- Eat a familiar breakfast 3 h before the start
- Warm up 10 min easy + 3 strides
- First 2 km at goal pace + 5 s, then settle
- Push only from 8 km if you feel strong`,
    blocks: [],
    chips: ['What to eat before a run?', 'Recovery advice', 'How to prevent injuries?'],
  },
  injuries: {
    prompt: 'How to prevent injuries?',
    tools: ['get_workouts'],
    text: `**Watch the spikes in your weekly load.**

This week jumped **27%**. Keep weekly increases under 10% and add two short strength sessions: calf raises, single-leg squats, planks.

Pain that changes your stride means a rest day, not a slower run.`,
    blocks: [],
    chips: ['Recovery advice', 'How to improve running?', 'Am I overtraining?'],
  },
  preRun: {
    prompt: 'What to eat before a run?',
    tools: [],
    text: `**Simple carbs, low fat, low fibre.**

- **2–3 h before:** oats with banana and honey
- **30–60 min before:** a banana or a couple of dates
- **Long runs:** a gel every 40 min after the first hour`,
    blocks: [],
    chips: ['Best nutrition tips', 'Tips for race day', 'How to build endurance?'],
  },
  freeform: {
    tools: ['recall'],
    text: `This is a preview with sample data, so I can only answer the ready-made questions here.

In **P.R.O.** I'd answer this from your real Apple Health workouts, sleep and heart rate. Try one of the suggestions below.`,
    blocks: [],
    chips: ['Analyze my week', 'Recovery advice', 'Am I overtraining?'],
  },
};

/** Подсказки-чипы → сценарий. */
export const CHIP_TO_SCRIPT = {
  'Analyze my week': 'analyze',
  'Recovery advice': 'recovery',
  'Am I overtraining?': 'overtraining',
  'How is my sleep affecting training?': 'sleep',
  'Best nutrition tips': 'nutrition',
  'Plan my next week': 'nextWeek',
  'How to improve running?': 'improve',
  'How to build endurance?': 'endurance',
  'Tips for race day': 'race',
  'How to prevent injuries?': 'injuries',
  'What to eat before a run?': 'preRun',
};

/* ── История чатов (ChatHistoryDrawer) — демо-беседы ───────────────────────── */

export const HISTORY = [
  { id: 'h1', title: 'Week analysis', script: 'analyze', date: '9/28/26, 8:14 AM' },
  { id: 'h2', title: 'Recovery check', script: 'recovery', date: '9/26/26, 9:02 PM' },
  { id: 'h3', title: 'Sub-50 10K plan', script: 'training', date: '9/21/26, 7:45 AM' },
];
