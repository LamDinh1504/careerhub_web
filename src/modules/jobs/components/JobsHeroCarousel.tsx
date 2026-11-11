"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LuChevronLeft,
  LuChevronRight,
  LuSearch,
  LuHandshake,
  LuUsers,
} from "react-icons/lu";
import { HERO_CAROUSEL_CARDS } from "../data";
import { HeroCardItem } from "../types";

export const JobsHeroCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default center card is 1 (Kết nối nhà tuyển dụng)
  const [isPaused, setIsPaused] = useState(false);

  const total = HERO_CAROUSEL_CARDS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play interval with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const getCardIcon = (iconType: HeroCardItem["iconType"]) => {
    switch (iconType) {
      case "search":
        return <LuSearch className="w-4 h-4 text-[#28C76F] stroke-[2.5]" />;
      case "handshake":
        return <LuHandshake className="w-4 h-4 text-[#28C76F] stroke-[2.5]" />;
      case "users":
        return <LuUsers className="w-4 h-4 text-[#28C76F] stroke-[2.5]" />;
      default:
        return <LuSearch className="w-4 h-4 text-[#28C76F] stroke-[2.5]" />;
    }
  };

  // Determine relative position of each card: -1 (left), 0 (center), 1 (right)
  const getCardPosition = (cardIndex: number) => {
    const diff = (cardIndex - activeIndex + total) % total;
    if (diff === 0) return 0; // Center
    if (diff === 1) return 1; // Right
    return -1; // Left
  };

  return (
    <div
      className="relative w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[660px] mx-auto select-none py-6 sm:py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Cards Stage */}
      <div className="relative h-[250px] sm:h-[280px] md:h-[300px] flex items-center justify-center">
        {HERO_CAROUSEL_CARDS.map((card, idx) => {
          const pos = getCardPosition(idx);
          const isCenter = pos === 0;
          const isLeft = pos === -1;

          return (
            <motion.div
              key={card.id}
              onClick={() => {
                if (!isCenter) setActiveIndex(idx);
              }}
              initial={false}
              animate={{
                x: isCenter ? "0%" : isLeft ? "-52%" : "52%",
                scale: isCenter ? 1.08 : 0.88,
                zIndex: isCenter ? 20 : 10,
                opacity: isCenter ? 1 : 0.82,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className={`absolute top-0 bottom-0 m-auto w-[200px] sm:w-[230px] md:w-[250px] h-[230px] sm:h-[260px] md:h-[275px] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-white shadow-xl cursor-pointer transition-shadow ${isCenter
                  ? "border-[3.5px] sm:border-4 border-white shadow-2xl shadow-emerald-950/40"
                  : "border border-white/40 hover:opacity-100"
                }`}
            >
              {/* Decorative Doodle on top-right of center card */}
              {isCenter && (
                <svg
                  className="absolute -top-3.5 right-4 w-7 h-7 text-white pointer-events-none drop-shadow-md z-30 animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="2" x2="12" y2="7" />
                  <line x1="5" y1="5" x2="9" y2="9" />
                  <line x1="19" y1="5" x2="15" y2="9" />
                </svg>
              )}

              {/* Card Image on Top */}
              <div className="relative w-full h-[65%] sm:h-[68%] overflow-hidden bg-emerald-900/20">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 210px, 260px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Card Text Content on Bottom */}
              <div className="h-[35%] sm:h-[32%] bg-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2.5 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#EBF7F0] flex items-center justify-center shrink-0">
                  {getCardIcon(card.iconType)}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-[13px] font-extrabold text-[#0D3B2E] leading-tight truncate">
                    {card.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight truncate mt-0.5">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Circular Navigation Buttons: < and > */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#0D3B2E] flex items-center justify-center shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer"
        >
          <LuChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#0D3B2E] flex items-center justify-center shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer"
        >
          <LuChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3 Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
        {HERO_CAROUSEL_CARDS.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${idx === activeIndex
                ? "w-6 h-2 bg-white shadow-sm"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </div>
  );
};
