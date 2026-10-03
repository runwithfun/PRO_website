import images from '../../generated/images.json';

// Картинка из media/: AVIF/WebP нужной ширины через srcset, размеры для
// резерва места (без сдвигов вёрстки) и плейсхолдер — средний цвет и
// размытое превью, видные, пока грузится сама картинка.
//
// sizes — какую ширину картинка занимает на экране (как в атрибуте sizes);
// priority — для картинок первого экрана: грузить сразу и с высоким приоритетом.
// <picture> с display: contents не влияет на вёрстку — классы стилизуют <img>.
// <source> прячем явно: иначе в grid/flex-контейнере они становятся пустыми
// ячейками и добавляют лишние отступы (gap) между картинками.
const HIDDEN = { display: 'none' };

export default function Picture({ src, alt, sizes = '100vw', priority = false, className = '', style, ...rest }) {
  const img = images[src];
  if (!img) throw new Error(`Picture: нет «${src}» в media/ (запусти scripts/optimize-images.mjs)`);

  const set = (ext) => img.widths.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `${img.base}-${img.widths[Math.min(1, img.widths.length - 1)]}.webp`;
  const placeholder = img.placeholder
    ? {
        backgroundColor: img.placeholder.color,
        backgroundImage: `url(${img.placeholder.blur})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : null;

  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} style={HIDDEN} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} style={HIDDEN} />
      <img
        src={fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        // Картинки лёгкие (AVIF 5–40 КБ), поэтому грузим сразу: ленивую
        // загрузку Safari начинает поздно, и картинки всплывали при прокрутке.
        loading="eager"
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={{ ...placeholder, ...style }}
        {...rest}
      />
    </picture>
  );
}
