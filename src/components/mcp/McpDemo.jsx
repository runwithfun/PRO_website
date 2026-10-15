import { useEffect, useRef, useState } from 'react';
import { mcpDemo } from '../../content/mcpDemo';

export default function McpDemo() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playbackHelp, setPlaybackHelp] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, []);

  useEffect(() => {
    if (started) videoRef.current.focus({ preventScroll: true });
  }, [started]);

  function play() {
    const video = videoRef.current;
    // Set the source and call play in the same user gesture, including on iOS.
    // No media URL is assigned before this click: preload alone is only a hint.
    video.src = mcpDemo.video;
    setStarted(true);
    video.play().catch(error => {
      if (error.name === 'AbortError') return;
      setPlaybackHelp(error.name === 'NotAllowedError'
        ? 'Use the video’s Play control to start playback.'
        : 'The video could not load. You can open the recording directly below.');
    });
  }

  return <section className="connect-wrap connect-section connect-demo" id="demo" aria-label="P.R.O. demo in ChatGPT">
    <figure className="mcp-demo-figure">
      <div className="mcp-demo-player" style={{ aspectRatio: `${mcpDemo.width} / ${mcpDemo.height}` }}>
        <video
          ref={videoRef}
          width={mcpDemo.width}
          height={mcpDemo.height}
          preload="none"
          playsInline
          controls={started}
          poster={started ? mcpDemo.poster : undefined}
          tabIndex={started ? 0 : -1}
          aria-hidden={!started}
          aria-label="P.R.O. demo in ChatGPT, using sample data. No audio."
          onPlay={() => setPlaybackHelp('')}
          onError={() => setPlaybackHelp('The video could not load. You can open the recording directly below.')}
        />
        {!started && <button className="mcp-demo-poster" type="button" onClick={play} aria-label="Play P.R.O. demo in ChatGPT, 2 minutes 8 seconds">
          <img src={mcpDemo.poster} width={mcpDemo.width} height={mcpDemo.height} alt="" loading="lazy" decoding="async" />
          <span className="mcp-demo-play">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            <span>Play demo <small>{mcpDemo.durationLabel}</small></span>
          </span>
        </button>}
      </div>
      <figcaption>
        <details className="mcp-demo-walkthrough">
          <summary>Read the walkthrough</summary>
          <ol>
            {mcpDemo.walkthrough.map(({ title, text }) => <li key={title}><strong>{title}.</strong> {text}</li>)}
          </ol>
        </details>
        <a href={mcpDemo.video} target="_blank" rel="noopener">Open video ↗</a>
      </figcaption>
      {playbackHelp && <p className="mcp-demo-status" role="status">{playbackHelp}</p>}
      <noscript><p className="mcp-demo-status"><a href={mcpDemo.video}>Watch the demo video</a> or read the walkthrough above.</p></noscript>
    </figure>
  </section>;
}
