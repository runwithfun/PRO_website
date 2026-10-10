import { useEffect, useRef, useState } from 'react';

export default function ConversationDemo({ active }) {
  const [stage, setStage] = useState(0);
  const feed = useRef(null);

  useEffect(() => {
    if (!active) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) { setStage(4); return; }
    const timers = [700, 2400, 3800, 5100].map((delay, i) => window.setTimeout(() => setStage(i + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [active]);

  useEffect(() => {
    if (!active || !stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    feed.current.scrollTo({ top: feed.current.scrollHeight, behavior: 'smooth' });
  }, [stage, active]);

  return <div className="walk-chat" aria-label="Illustration of a conversation with P.R.O.">
    <div className="walk-chat-header"><span>P.R.O. is connected</span><i /></div>
    <div className="walk-chat-feed" ref={feed} tabIndex="0" aria-label="Example conversation">
      <div className="walk-message walk-chat-entry">How did I sleep this week?</div>
      {stage >= 1 && <div className="walk-response walk-chat-entry">
        <span className="walk-brand-dot">P.R.O.</span>
        <div className="walk-widget-heading"><strong>Sleep</strong><span>This week</span></div>
        <div className="walk-chat-chart">{[64, 81, 69, 83, 76, 61, 87].map((v, i) => <span key={i} style={{ height: `${v}%`, '--bar-i': i }} />)}</div>
        <div className="walk-chart-days" aria-hidden="true">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <span key={i}>{day}</span>)}</div>
      </div>}
      {stage >= 2 && <p className="walk-agent-question walk-chat-entry">Want to see your recovery, too?</p>}
      {stage >= 3 && <div className="walk-message walk-chat-entry">Yes, show me.</div>}
      {stage >= 4 && <div className="walk-response walk-recovery walk-chat-entry">
        <span className="walk-brand-dot">P.R.O.</span>
        <div className="walk-widget-heading"><strong>Recovery</strong><span>Today</span></div>
        <div className="walk-recovery-status">Ready <span>↗</span></div>
        <svg className="walk-recovery-chart" viewBox="0 0 240 40" aria-hidden="true"><path d="M0 35H240" stroke="#ffffff0a" /><path className="walk-recovery-line" pathLength="1" d="M2 31L21 28L41 30L61 22L82 25L103 17L123 21L144 12L164 15L185 8L206 11L238 3" fill="none" stroke="#48c77c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="walk-recovery-metrics"><span><b>+19%</b>HRV vs. your norm</span><span><b>−0.8 <small>bpm</small></b>Resting heart rate</span></div>
      </div>}
    </div>
  </div>;
}
