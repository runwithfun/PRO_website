import { useEffect, useRef, useState } from 'react';
import AssistantIcon from './AssistantIcon';
import HealthWidget from './HealthWidget';

const assistants = ['ChatGPT', 'Claude', 'Grok', 'DeepSeek', 'Perplexity', 'Qwen', 'Mistral'];
const widgets = ['sleep', 'workout', 'load', 'streak', 'plan', 'heart', 'route', 'pace', 'recovery', 'goals', 'hrv', 'week'];
export default function HealthOrbit() {
  const ref = useRef(null);
  const [assistant, setAssistant] = useState(0);
  const [inactive, setInactive] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const el = ref.current;
    let visible = true;
    const update = () => setInactive(!visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(el);
    const size = new ResizeObserver(([entry]) => el.style.setProperty('--orbit-scale', Math.min(entry.contentRect.width / 1100, .9)));
    size.observe(el);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReduced(media.matches);
    motion(); media.addEventListener('change', motion);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); size.disconnect(); media.removeEventListener('change', motion); document.removeEventListener('visibilitychange', update); };
  }, []);
  const paused = inactive || reduced;
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setAssistant(i => (i + 1) % assistants.length), 2200);
    return () => window.clearInterval(timer);
  }, [paused]);
  return <div className={`health-orbit ${paused ? 'orbit-paused' : ''}`} ref={ref}>
    <div className="orbit-stage" aria-hidden="true"><div className="orbit-world"><div className="orbit-camera"><div className="orbit-tilt"><div className="orbit-ring">
      {widgets.map((type, i) => <div className="orbit-card" key={type} style={{ '--i': i, '--angle': `${i * 30}deg` }}><HealthWidget type={type} /></div>)}
    </div></div></div><div className="orbit-center"><div className="orbit-connection"><img className="orbit-pro" src="/mcp-guide/pro-icon-256.png" width="80" height="80" alt="" /><span className="orbit-bridge">{Array.from({ length: 24 }, (_, i) => <i key={i} className={i % 3 === 0 ? 'particle-return' : ''} style={{ '--particle-i': i, '--particle-size': `${1.5 + i % 3 * .6}px`, '--particle-duration': `${1.1 + i % 5 * .15}s`, offsetPath: `path("M ${i % 3 === 0 ? '82 22 C 60 38 24 4 0 22' : i % 2 === 0 ? '0 22 C 24 2 58 40 82 22' : '0 22 C 24 38 58 2 82 22'}")` }} />)}</span><div className="orbit-assistant-slot">{assistants.map((name, i) => <div key={name} className={`orbit-assistant ${assistant === i ? 'is-current' : ''}`}><AssistantIcon name={name} /></div>)}</div></div></div></div></div>

  </div>;
}
