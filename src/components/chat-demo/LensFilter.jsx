import { LENS_FILTER_ID } from './liquidGlass';

/* SVG-фильтр Liquid Glass для пилюли — механика описана в liquidGlass.js. */

/**
 * SVG-фильтр рефракции. Рендерится всегда (одинаково на сервере и клиенте),
 * карта смещений подставляется после монтирования.
 */
export default function LensFilter({ w, h, lensUrl }) {
  const s = Math.max(4, h * 0.34); // максимальное смещение, px
  const blur = Math.max(0.6, h * 0.045); // «regular»-стекло слегка матовое
  return (
    <svg className="cd-lens-svg" width="0" height="0" aria-hidden="true" focusable="false">
      <filter
        id={LENS_FILTER_ID}
        x="0"
        y="0"
        width={w || 1}
        height={h || 1}
        filterUnits="userSpaceOnUse"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation={blur.toFixed(2)} result="soft" />
        <feImage href={lensUrl || undefined} x="0" y="0" width={w || 1} height={h || 1} preserveAspectRatio="none" result="map" />
        {/* Хроматическая аберрация: красный преломляется сильнее синего. */}
        <feDisplacementMap in="soft" in2="map" scale={s * 1.07} xChannelSelector="R" yChannelSelector="G" result="dR" />
        <feDisplacementMap in="soft" in2="map" scale={s * 1.02} xChannelSelector="R" yChannelSelector="G" result="dG" />
        <feDisplacementMap in="soft" in2="map" scale={s * 0.97} xChannelSelector="R" yChannelSelector="G" result="dB" />
        <feColorMatrix in="dR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
        <feColorMatrix in="dG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
        <feColorMatrix in="dB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
        <feBlend in="r" in2="g" mode="screen" result="rg" />
        <feBlend in="rg" in2="b" mode="screen" result="rgb" />
        {/* Насыщение и лёгкое осветление фона, как у стекла iOS. */}
        <feColorMatrix in="rgb" type="saturate" values="1.7" result="sat" />
        <feComponentTransfer in="sat">
          <feFuncR type="linear" slope="1.08" intercept="0.02" />
          <feFuncG type="linear" slope="1.08" intercept="0.02" />
          <feFuncB type="linear" slope="1.08" intercept="0.02" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
