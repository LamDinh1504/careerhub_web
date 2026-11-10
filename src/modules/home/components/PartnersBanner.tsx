"use client";

import React from "react";
import { PARTNERS_DATA } from "../data";

export const PartnersBanner: React.FC = () => {
  // Triplicate list to guarantee a 100% seamless infinite scroll loop on all screen widths
  const marqueeList = [...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <section className="relative overflow-hidden border-y border-[#0D3B2E]/10 bg-white py-8 select-none">
      {/* Inline self-contained marquee style ensuring GPU acceleration and pause-on-hover */}
      <style>{`
        @keyframes partnersScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333333%, 0, 0);
          }
        }
        .partners-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
          animation: partnersScroll 32s linear infinite;
        }
        .partners-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Banner Tagline */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-center text-xs font-bold tracking-widest text-[#6B8679] uppercase">
          ĐỒNG HÀNH CÙNG NHỮNG DOANH NGHIỆP TIÊN PHONG
        </p>
      </div>

      {/* Marquee Viewport with Left and Right Gradient Fade Overlays */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left Fade Overlay */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

        {/* Right Fade Overlay */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Infinite Moving Track */}
        <div className="partners-marquee-track gap-10 sm:gap-14 md:gap-16 py-1">
          {marqueeList.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex h-12 w-28 sm:w-36 items-center justify-center shrink-0 cursor-pointer select-none transition-transform duration-200 hover:scale-105"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="eager"
                className="max-h-7 sm:max-h-8 max-w-[110px] sm:max-w-[130px] w-auto h-auto object-contain block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
