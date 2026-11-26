// One versioned source for the connector's tools: the tool tables, tool counts, llms.txt wording
// and /mcp/tools.json (written by scripts/prerender.mjs together with input schemas from
// mcpToolsLive.json, a saved copy of the live tools/list). Prerender fails if the two disagree.
// permission = the data switch in P.R.O. → Settings → MCP Connect (SERVER services/mcp/permissions.py);
// null means no switch applies, an object means it depends on the card or scope requested.
export const MCP_CATALOG = { version: '1.1.0', updated: '2026-11-25', server: 'https://mcp.proapp.uk', inventory: '/mcp/tools.json' };

export const permissionLabels = {
  profile: 'Profile',
  goals: 'Goals',
  daily_metrics: 'Daily metrics',
  water: 'Water',
  workouts: 'Workouts',
  routes: 'Workout routes',
  sleep: 'Sleep',
  heart: 'Heart rate and HRV',
  memory: 'Coach memory',
};

export function permissionLabel(permission) {
  if (!permission) return 'None';
  if (typeof permission === 'string') return permissionLabels[permission];
  return `By request: ${[...new Set(Object.values(permission))].map((p) => permissionLabels[p]).join(', ')}`;
}

export const mcpTools = [
  {
    name: 'get_daily_brief',
    title: 'Daily brief',
    what: 'One day at a glance, today by default: activity so far, last night’s sleep, readiness with short reasons, training load zone, the planned session, your streak and any metric outside your usual range.',
    access: 'Read',
    permission: 'daily_metrics',
  },
  {
    name: 'get_daily_metrics',
    title: 'Daily health metrics',
    what: 'Steps, active energy, distance, exercise minutes, flights, water, resting and average heart rate, HRV, sleep hours and sleep score. A recent period or exact dates, up to 90 days per call, per day or grouped by week or month.',
    access: 'Read',
    permission: 'daily_metrics',
  },
  {
    name: 'get_baselines',
    title: 'Personal baselines',
    what: 'Your usual range, average, latest value, deviation and trend for resting heart rate, HRV, sleep, steps and active energy over 28, 60 or 90 days.',
    access: 'Read',
    permission: 'daily_metrics',
  },
  {
    name: 'get_week_summary',
    title: 'Week in numbers',
    what: 'The last seven days compared with the seven before: steps, energy, exercise, sleep, resting heart rate, HRV and workout totals.',
    access: 'Read',
    permission: 'daily_metrics',
  },
  {
    name: 'get_workouts',
    title: 'Workouts',
    what: 'Workout summaries for a period or sport: type, date, duration, distance, energy, heart rate, pace, cadence, power, source app.',
    access: 'Read',
    permission: 'workouts',
  },
  {
    name: 'get_records',
    title: 'Personal records',
    what: 'Records from up to 10 years of workouts: longest sessions, fastest pace or speed over standard distances, best week and month, yearly totals.',
    access: 'Read',
    permission: 'workouts',
  },
  {
    name: 'get_training_load',
    title: 'Training load and readiness',
    what: 'Seven-day acute versus 28-day chronic load, their ratio and trends, plus your readiness status.',
    access: 'Read',
    permission: 'workouts',
  },
  { name: 'get_streak', title: 'Activity streak', what: 'Current and longest run of active days.', access: 'Read', permission: 'workouts' },
  {
    name: 'get_training_plan',
    title: 'Training plan',
    what: 'The active plan, upcoming sessions and the plan’s change history.',
    access: 'Read',
    permission: 'workouts',
  },
  {
    name: 'get_plan_proposal',
    title: 'Plan change status',
    what: 'A plan proposal with its changes and status: pending, accepted, partial, declined, expired or superseded.',
    access: 'Read',
    permission: 'workouts',
  },
  { name: 'get_profile', title: 'Profile', what: 'Name, sex and age; height and weight from Apple Health or the profile.', access: 'Read', permission: 'profile' },
  { name: 'get_goals', title: 'Goals and progress', what: 'Goals set in the app with targets and progress.', access: 'Read', permission: 'goals' },
  { name: 'recall', title: 'Saved coach notes', what: 'Notes you or the P.R.O. coach saved.', access: 'Read', permission: 'memory' },
  {
    name: 'get_data_status',
    title: 'Data status',
    what: 'What P.R.O. has received from your iPhone: last upload times, covered dates, tracked fields and which data categories you share.',
    access: 'Read',
    permission: null,
  },
  {
    name: 'fetch_health_data',
    title: 'Detailed health data',
    what: 'On request, for one day or one workout: full-day heart-rate series, sleep stages, workout splits and heart-rate zones, GPS route. Uploaded by the phone when asked and kept for 48 hours; heart rate and sleep of the last 30 days and the latest 20 workouts are then kept for 7 days while you use an assistant.',
    access: 'Read',
    permission: { heart_rate_series: 'heart', sleep_stages: 'sleep', workout_details: 'heart', workout_route: 'routes' },
  },
  {
    name: 'show_widget',
    title: 'Show a P.R.O. card',
    what: 'Shows a P.R.O. card in assistants that support MCP Apps: today, steps, sleep, heart, stats, compare, workouts, workout, streak, goals, plan, load, proposal, daily brief or personal records.',
    access: 'Read',
    permission: {
      today: 'daily_metrics', steps: 'daily_metrics', stats: 'daily_metrics', compare: 'daily_metrics', brief: 'daily_metrics',
      sleep: 'sleep', heart: 'heart', goals: 'goals',
      workouts: 'workouts', workout: 'workouts', streak: 'workouts', plan: 'workouts', load: 'workouts', proposal: 'workouts', records: 'workouts',
    },
  },
  {
    name: 'propose_plan_changes',
    title: 'Suggest plan changes',
    what: 'Sends a new plan or changes to your current one as a pending proposal. Nothing changes until you accept it in P.R.O.',
    access: 'Proposal',
    permission: 'workouts',
  },
  {
    name: 'remember_fact',
    title: 'Save a coach note',
    what: 'Saves one durable note (an injury, equipment, a decision). Works only if writing is enabled in the app.',
    access: 'Write (opt-in)',
    permission: 'memory',
  },
  {
    name: 'request_sync',
    title: 'Request a fresh sync',
    what: 'Asks the P.R.O. app on your iPhone to upload new Apple Health data. Returns the request status, not health data.',
    access: 'Sync request',
    permission: null,
  },
];

export const mcpActionCount = mcpTools.filter((t) => t.access !== 'Read').length;

// Example questions that use the newer tools; shown on the MCP hub pages.
export const mcpExamplePrompts = [
  'Give me my daily brief.',
  'Is my HRV below my usual range?',
  'What are my personal records this year?',
  'Compare my running distance month by month this year.',
  'When did my iPhone last sync with P.R.O.?',
];

export const catalogDate = new Date(`${MCP_CATALOG.updated}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
