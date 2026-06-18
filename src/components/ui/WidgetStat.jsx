import React from 'react';

export default function WidgetStat({ label, value, change, trend = 'up', icon, className = '' }) {
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-gray-500';

  return (
    <div className={`pro-widget rounded-2xl p-4 ${className}`}>
      <div className="mb-3 flex items-start justify-between">
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-400">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <p className="font-display text-2xl font-extrabold tracking-tight text-gray-900">{value}</p>
      {change && <p className={`mt-1 text-xs font-semibold ${trendColor}`}>{change}</p>}
    </div>
  );
}
