"use client";

import React from "react";
import Link from "next/link";
import {
  LuSearch,
  LuBuilding2,
  LuBriefcase,
  LuShieldCheck,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { JobsHeroCarousel } from "./JobsHeroCarousel";

interface JobsHeroProps {
  lng?: string;
  onQuickSearchClick?: () => void;
}

export const JobsHero: React.FC<JobsHeroProps> = ({
  lng = "vi",
  onQuickSearchClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#062019] via-[#0D3B2E] to-[#125542] text-white pt-10 pb-12 sm:pt-14 sm:pb-16 shadow-inner">
      {/* Organic background glow and ambient shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#28C76F]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-[#28C76F]/10 blur-3xl pointer-events-none" />

      {/* Decorative Wave lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <svg
          className="absolute -right-20 top-0 w-[800px] h-full"
          viewBox="0 0 800 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 300 C 200 150, 400 450, 800 200"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M0 200 C 300 350, 500 50, 800 280"
            stroke="#28C76F"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Headings & Buttons */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-medium text-white/70 mb-3 select-none">
              <Link
                href={`/${lng}`}
                className="hover:text-white transition-colors"
              >
                Trang chủ
              </Link>
              <span>›</span>
              <span className="text-white font-semibold">Việc làm</span>
            </nav>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.18] mb-3">
              Khám phá việc làm phù hợp
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mb-6 font-normal">
              Tìm kiếm cơ hội nghề nghiệp lý tưởng từ các doanh nghiệp uy tín, với
              bộ lọc thông minh và cập nhật việc làm mới mỗi ngày.
            </p>

            {/* 2 CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={onQuickSearchClick}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0D3B2E] text-sm font-bold shadow-md hover:bg-slate-100 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <LuSearch className="w-4 h-4 text-[#28C76F] stroke-[2.5]" />
                <span>Tìm việc ngay</span>
              </button>

              <Link
                href={`/${lng}/#companies`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/35 bg-white/5 hover:bg-white/15 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <LuBuilding2 className="w-4 h-4 text-white/90" />
                <span>Khám phá công ty</span>
              </Link>
            </div>

            {/* 3 Feature Badges in a Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs select-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90">
                <LuBriefcase className="w-3.5 h-3.5 text-[#28C76F]" />
                <span>Việc làm mới mỗi ngày</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90">
                <LuShieldCheck className="w-3.5 h-3.5 text-[#28C76F]" />
                <span>Doanh nghiệp uy tín</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90">
                <LuSlidersHorizontal className="w-3.5 h-3.5 text-[#28C76F]" />
                <span>Lọc thông minh</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Carousel with 3 Images from public/jobs */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <JobsHeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

