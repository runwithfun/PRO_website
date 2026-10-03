import { useEffect, useRef, useState } from 'react';

// Бегущие строки и ленты ставим на паузу, пока их не видно: бесконечная
// анимация за экраном зря грузит GPU и батарею телефона.
export function usePauseOffscreen() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { rootMargin: '100px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, paused };
}
