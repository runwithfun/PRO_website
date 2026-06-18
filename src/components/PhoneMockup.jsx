import React from 'react';

const FRAME_SRC = `${import.meta.env.BASE_URL}screenshots/iphone-17-pro-silver-front.png`;

/** Screen inset ratios measured from iphone-17-pro-silver-front.png (1180×2274). */
const SCREEN = {
  top: '3.30%',
  left: '8.56%',
  width: '83.56%',
  height: '93.93%',
  borderRadius: '11% / 4%',
};

export default function PhoneMockup({ children, className = '', maxWidth = 340 }) {
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
