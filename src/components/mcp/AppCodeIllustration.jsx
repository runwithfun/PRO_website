import { useEffect, useRef, useState } from 'react';
import AssistantIcon from './AssistantIcon';

const APP_STORE = 'https://apps.apple.com/us/app/p-r-o/id6749865568';

function AppSymbol({ name }) {
  const paths = {
    sparkle: 'm12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
    download: 'M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
    sliders: 'M4 6h16M4 12h16M4 18h16M8 3v6m8 0v6m-6 0v6',
    brain: 'M12 4a4 4 0 0 0-7 3 4 4 0 0 0-2 7 4 4 0 0 0 3 6 4 4 0 0 0 6 0 4 4 0 0 0 6 0 4 4 0 0 0 3-6 4 4 0 0 0-2-7 4 4 0 0 0-7-3Zm0 0v16M5 7l3 2m-5 5 5-1m11-6-3 2m5 5-5-1',
    document: 'M6 2h8l4 4v16H6ZM14 2v5h4M9 12h6m-6 4h6',
    key: 'M14 4a5 5 0 1 0 6 6 5 5 0 0 0-6-6ZM11 13l-8 8m1-5 4 4m0-8 4 4',
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

function SettingsRow({ icon, children, toggle = false, connect = false }) {
  return <div className={`walk-settings-row${connect ? ' walk-settings-connect' : ''}`}>
    <span className="walk-settings-tile"><AppSymbol name={icon} /></span>
    <span>{children}</span>
    {connect && <span className="walk-settings-brands">{['Claude', 'ChatGPT', 'Perplexity'].map(name => <AssistantIcon key={name} name={name} />)}</span>}
    {toggle ? <i className="walk-settings-toggle" /> : <span className="walk-settings-chevron">›</span>}
    {connect && <i className="walk-app-touch" />}
  </div>;
}

// Labels, order and sheet presentation follow SettingsView / MCPConnectView in the iOS app.
function NativeAppSequence() {
  const screen = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      setPlaying(entry.isIntersecting && entry.intersectionRatio >= .35);
    }, { threshold: [0, .35] });
    observer.observe(screen.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={screen} className={`walk-app-screen${playing ? ' walk-app-playing' : ''}`} aria-hidden="true">
    <div className="walk-settings-screen">
      <div className="walk-settings-nav"><span>Settings</span><span>Done</span></div>
      <div className="walk-native-group">
        <p>Training</p>
        <div className="walk-settings-card">
          <SettingsRow icon="bell" toggle>Notifications</SettingsRow>
          <SettingsRow icon="download" toggle>Auto Import</SettingsRow>
          <SettingsRow icon="heart" toggle>Heart Rate Zones</SettingsRow>
          <SettingsRow icon="sliders">Configure Zones</SettingsRow>
        </div>
      </div>
      <div className="walk-native-group">
        <p>AI</p>
        <div className="walk-settings-card">
          <SettingsRow icon="sparkle" connect>MCP Connect</SettingsRow>
          <SettingsRow icon="brain" toggle>AI Features</SettingsRow>
          <SettingsRow icon="document">AI Privacy Notice</SettingsRow>
        </div>
      </div>
    </div>
    <div className="walk-mcp-sheet">
      <div className="walk-mcp-nav"><strong>MCP Connect</strong><span>Done</span></div>
      <div className="walk-mcp-body">
        <div className="walk-mcp-hero">
          <div className="walk-mcp-logos"><span className="walk-mcp-pro"><img src="/mcp-guide/pro-wordmark.png" width="40" height="18" alt="" /></span><span className="walk-mcp-plus">+</span>{['Claude', 'ChatGPT', 'Perplexity'].map(name => <AssistantIcon key={name} name={name} />)}</div>
          <strong>Your training, inside any AI</strong>
          <p>Ask Claude, ChatGPT or Perplexity about your workouts, sleep and goals.</p>
          <span className="walk-mcp-status"><i />Not connected yet</span>
        </div>
        <div className="walk-app-code">
          <span className="walk-get-code"><AppSymbol name="key" />Get connection code<i className="walk-app-touch" /></span>
          <div className="walk-issued-code">
            <div className="walk-app-cells">{'ABC234'.split('').map((char, i) => <span key={i}>{char}</span>)}<i className="walk-app-touch" /></div>
            <div className="walk-app-expiry"><i /><span><span className="walk-code-countdown">10:00</span><strong>Copied</strong><span className="walk-code-countdown-end">09:57</span></span></div>
          </div>
        </div>
        <div className="walk-native-group walk-mcp-address"><p>Connector address</p><div><code>https://mcp.proapp.uk</code><span>⧉</span><p>Add it as a custom connector in your assistant, then enter the code.</p></div></div>
      </div>
    </div>
  </div>;
}

export default function AppCodeIllustration() {
  const [run, setRun] = useState(0);
  return <div className="walk-app">
    <div className="walk-app-download">
      <img src="/mcp-guide/pro-icon-256.png" width="44" height="44" alt="P.R.O. icon" />
      <span><strong>P.R.O.</strong><small>For iPhone</small></span>
      <a href={APP_STORE} target="_blank" rel="noopener noreferrer">Download ↗</a>
    </div>
    <NativeAppSequence key={run} />
    <div className="walk-app-caption"><p>One-time code · valid for 10 minutes</p><button type="button" onClick={() => setRun(n => n + 1)} aria-label="Replay the path from Settings to the connection code"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" /></svg></button></div>
  </div>;
}
