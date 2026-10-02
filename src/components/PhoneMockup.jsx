import React from 'react';

const FRAME_SRC = `${import.meta.env.BASE_URL}screenshots/iphone-17-pro-silver-front.png`;

/** Screen inset ratios measured from iphone-17-pro-silver-front.png (1180×2274): the white
 *  screen area is x 101–1086, y 74–2210, corner ≈180 px; the box overlaps it by ~2 px per
 *  side so no light edge shows through at fractional sizes. */
const SCREEN = {
  top: '3.17%',
  left: '8.39%',
  width: '83.9%',
  height: '94.15%',
  borderRadius: '18.5% / 8.5%',
};

export default function PhoneMockup({ children, className = '', maxWidth = 360 }) {
  return (
    <div className={`phone-mockup relative mx-auto w-full min-w-[240px] ${className}`} style={{ maxWidth }}>
      <div className="relative w-full" style={{ aspectRatio: '1180 / 2274' }}>
        <img
          src={FRAME_SRC}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
          draggable={false}
        />
        <div
          className="phone-mockup-screen absolute overflow-hidden bg-black"
          style={{
            top: SCREEN.top,
            left: SCREEN.left,
            width: SCREEN.width,
            height: SCREEN.height,
            borderRadius: SCREEN.borderRadius,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
