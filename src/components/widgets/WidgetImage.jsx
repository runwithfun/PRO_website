import Picture from '../ui/Picture';

export default function WidgetImage({ src, alt, className = '' }) {
  return (
    <Picture
      src={src}
      alt={alt}
      sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
      className={`widget-card h-auto w-full rounded-3xl ${className}`}
    />
  );
}
