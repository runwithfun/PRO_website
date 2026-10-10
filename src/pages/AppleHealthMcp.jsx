import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HealthOrbit from '../components/mcp/HealthOrbit';
import ConnectionWalkthrough from '../components/mcp/ConnectionWalkthrough';
import AssistantIcon from '../components/mcp/AssistantIcon';
import { guides, MCP_URL } from '../content/mcpGuides';
import { mcpFaq } from '../content/mcpFaq';
import { mcpTools } from '../content/mcpTools';
import './mcp-connect.css';

export default function AppleHealthMcp() {
  const { hash } = useLocation();
  useEffect(() => {
    const id = hash.slice(1);
    if (!guides.some(g => g.id === id)) return;
    const panel = document.getElementById(id);
    panel.open = true;
  }, [hash]);
  return <div className="mcp-page">
    <header className="connect-intro connect-wrap">
      <h1 className="font-display font-extrabold">
        <span className="hero-in connect-title-line">Your health.</span>
        <span className="hero-in connect-title-line text-brand-pink" style={{ animationDelay: '80ms' }}>Your favorite AI.</span>
      </h1>
      <p className="connect-description hero-fade text-gray-500" style={{ animationDelay: '280ms' }}>Connect your health data to ChatGPT, Claude, Codex or Grok.<br className="connect-desktop-break" /> Your workouts, sleep and progress — in the conversation.</p>
    </header>
    <div className="connect-orbit-wrap"><HealthOrbit /></div>
    <section className="connect-wrap connect-section" id="how-to-connect" aria-labelledby="setup-heading">
      <div className="connect-section-heading"><h2 id="setup-heading">Five simple steps.</h2></div>
      <ConnectionWalkthrough />
    </section>
    <section className="connect-wrap connect-section assistant-help" id="assistant-guides" aria-labelledby="assistant-heading">
      <div className="connect-section-heading"><p className="connect-eyebrow">A LITTLE MORE GUIDANCE</p><h2 id="assistant-heading">Find your assistant.</h2><p>The same connection. Slightly different menus.</p></div>
      {guides.map(g => <details className="assistant-guide" key={g.id} id={g.id}>
        <summary><AssistantIcon name={g.name} /><span><h3>Connect P.R.O. to {g.name}</h3><small>{g.platform}</small></span><span className="connect-expand" aria-hidden="true">+</span></summary>
        <div className="assistant-guide-body"><p>{g.intro}</p><ol>{g.steps.map((s, i) => <li key={i}><strong>{s.title}</strong>{s.text && <p>{s.text}</p>}{s.pairing && <Link to="#connect-step-3">Get your code using step 3 above ↑</Link>}{s.link && <a href={s.link} target="_blank" rel="noopener noreferrer">{s.linkText}</a>}</li>)}</ol><p className="guide-recorded">{g.verified}<a href={g.helpUrl} target="_blank" rel="noopener noreferrer">Official setup help ↗</a></p></div>
      </details>)}
      <details className="assistant-guide assistant-guide-other"><summary><span className="assistant-other-icon" aria-hidden="true">↗</span><span><h3>Another MCP-compatible agent</h3><small>Remote MCP · Streamable HTTP · OAuth</small></span><span className="connect-expand" aria-hidden="true">+</span></summary><div className="assistant-guide-body"><p>Use <code>{MCP_URL}</code> in a client that supports remote MCP over Streamable HTTP and OAuth. Other clients may work; only ChatGPT, Claude, Codex and Grok have been tested. Perplexity setup is still being verified.</p></div></details>
      <p className="connect-footnote">Custom connectors depend on your assistant’s plan and account permissions. ChatGPT and Codex setup was recorded with Pro. Interactive cards are confirmed in ChatGPT and Claude.</p>
    </section>
    <section className="connect-wrap connect-section connect-questions" aria-labelledby="questions-heading">
      <div className="connect-section-heading"><p className="connect-eyebrow">GOOD TO KNOW</p><h2 id="questions-heading">Your data. Your call.</h2><p>Choose what to share. Revoke access in P.R.O. anytime.</p></div>
      {mcpFaq.map(item => <details className="connect-question" key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}
      <details className="connect-question"><summary>Technical reference: available MCP tools<span aria-hidden="true">+</span></summary><p>Remote Streamable HTTP at <code>{MCP_URL}</code>, with OAuth 2.1. Data tools respect your access settings.</p><div className="connect-tools"><table><caption>P.R.O. connector tools and access</caption><thead><tr><th scope="col">Tool</th><th scope="col">What it does</th><th scope="col">Access</th></tr></thead><tbody>{mcpTools.map(t => <tr key={t.name}><th scope="row"><code>{t.name}</code></th><td>{t.what}</td><td>{t.access}</td></tr>)}</tbody></table></div></details>
      <div className="connect-end"><p>Setup recorded October 8–10, 2026. Interfaces can change.<br />P.R.O. provides fitness and wellness information, not medical advice.</p><div><Link to="/support">Get help ↗</Link><Link to="/privacy">Privacy ↗</Link></div></div>
    </section>
  </div>;
}
