export const mcpTools = [
  { name: 'get_profile', title: 'Profile', what: 'Name, sex, age, height and weight.', access: 'Read' },
  { name: 'get_goals', title: 'Goals and progress', what: 'Goals set in the app with targets and progress.', access: 'Read' },
  {
    name: 'get_daily_metrics',
    title: 'Daily health metrics',
    what: 'Steps, active energy, distance, exercise minutes, flights, resting and average heart rate, HRV, sleep hours and sleep score, per day.',
    access: 'Read',
  },
  {
    name: 'get_workouts',
    title: 'Workouts',
    what: 'Workout summaries: type, date, duration, distance, energy, heart rate, pace, cadence, power, source app.',
    access: 'Read',
  },
  { name: 'get_streak', title: 'Activity streak', what: 'Current and longest run of active days.', access: 'Read' },
  {
    name: 'get_training_plan',
    title: 'Training plan',
    what: 'The active plan, upcoming sessions and the plan’s change history.',
    access: 'Read',
  },
  { name: 'recall', title: 'Saved coach notes', what: 'Notes you or the P.R.O. coach saved.', access: 'Read' },
  {
    name: 'fetch_health_data',
    title: 'Detailed health data',
    what: 'On request, for one day or one workout: full-day heart-rate series, stages or splits of an older night or workout, workout GPS route. Uploaded by the phone, cached for 48 hours.',
    access: 'Read',
  },
  {
    name: 'show_widget',
    title: 'Show a P.R.O. widget',
    what: 'Renders P.R.O. cards (today, sleep, heart, workouts, streak, goals…) inline in assistants that support MCP Apps.',
    access: 'Read',
  },
  {
    name: 'remember_fact',
    title: 'Save a coach note',
    what: 'Saves one durable note (an injury, equipment, a decision). Works only if writing is enabled in the app.',
    access: 'Write (opt-in)',
  },
  {
    name: 'request_sync',
    title: 'Request a fresh sync',
    what: 'Asks the P.R.O. app to upload new Apple Health data the next time you open it.',
    access: 'Sync request',
  },
];
