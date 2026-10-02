import { useEffect, useRef, useState } from 'react';

// Анимация появления при прокрутке.
//
// В HTML (пререндер) и при гидрации блок видим: текст доступен ботам без JS,
// а на медленном телефоне никто не скроллит в пустоту, пока грузится JS.
// После гидрации прячем только блоки ниже экрана — их ещё не видели, мигания
// нет — и показываем их, когда они доезжают до экрана.
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
