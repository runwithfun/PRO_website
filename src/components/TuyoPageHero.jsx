
// Первый экран страницы: появление на CSS-анимации (hero-in/hero-fade), а не на
// IntersectionObserver — текст виден сразу после отрисовки HTML и не ждёт
// загрузки JS (раньше заголовок оставался opacity-0 до гидрации и тормозил LCP).
export default function TuyoPageHero({ eyebrow, lines, accentIndex = 1, description, children }) {
  return (
    <section
      className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/5 bg-black pt-28 pb-16 sm:min-h-[75vh] sm:pb-24"
    >
      <div className="accent-orb accent-orb-pink -right-24 top-20 h-80 w-80 opacity-40" aria-hidden />
      <div className="accent-orb accent-orb-soft -left-32 bottom-0 h-96 w-96 opacity-25" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p
            className="hero-fade mb-6 text-xs font-bold uppercase tracking-[0.22em] text-brand-pink"
          >
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-5xl">
          {lines.map((line, i) => (
            <span
              key={line}
              className={`hero-in block font-display font-extrabold leading-[0.92] tracking-tighter ${
                i === accentIndex
                  ? 'text-[clamp(2.75rem,10vw,6.5rem)] text-brand-pink'
                  : 'text-[clamp(2.25rem,8vw,5rem)] text-white'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>
        {description && (
          <p
            className="hero-fade mt-8 max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl"
            style={{ animationDelay: '280ms' }}
          >
            {description}
          </p>
        )}
        {children && (
          <div
            className="hero-fade mt-10"
            style={{ animationDelay: '360ms' }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
