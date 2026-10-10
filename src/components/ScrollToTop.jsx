import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Wait for route panels to open before measuring the anchor position.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        let id;
        try { id = decodeURIComponent(hash.slice(1)); }
        catch { return; }
        document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}
