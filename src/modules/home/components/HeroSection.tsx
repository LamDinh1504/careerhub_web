"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LuSearch, LuMapPin, LuCheck } from "react-icons/lu";
import { POPULAR_SEARCH_KEYWORDS } from "../data";

interface HeroSectionProps {
  lng?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lng = "vi" }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/${lng}/jobs?${params.toString()}`);
  };

  const handleKeywordClick = (item: string) => {
    setKeyword(item);
    router.push(`/${lng}/jobs?keyword=${encodeURIComponent(item)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EBF7F0]/80 via-[#F8FAFC] to-white pt-10 pb-16 lg:pt-14 lg:pb-22">
      {/* Soft ambient mint glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-[#16C759] text-xs font-semibold tracking-wider uppercase mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#16C759] animate-pulse" />
              <span>CƠ HỘI MỚI. PHIÊN BẢN MỚI.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0F1112] leading-[1.14] mb-6">
              Sự nghiệp mới, <br />
              <span className="text-[#0F1112]">khởi đầu từ đây.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-5 font-normal">
              Kết nối với công việc phù hợp. Tự tin bước tiếp trên hành trình sự nghiệp của bạn.
            </p>

            {/* Checkmark Value Prop */}
            <div className="flex items-center gap-2 text-sm sm:text-[15px] font-medium text-[#0F1112] mb-8">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-[#16C759]">
                <LuCheck className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>Tìm đúng việc. Bắt đầu hành trình mới.</span>
            </div>

            {/* Search Box Container */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-2xl bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-green-300 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                {/* Search Keyword Input */}
                <div className="flex-1 flex items-center gap-3 px-3 py-2">
                  <LuSearch className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Vị trí, kỹ năng hoặc công ty"
                    className="w-full bg-transparent text-sm sm:text-[15px] text-[#0F1112] placeholder:text-gray-400 focus:outline-none"
                  />
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-px h-8 bg-gray-200 shrink-0" />

                {/* Location Input */}
                <div className="flex-1 flex items-center gap-3 px-3 py-2">
                  <LuMapPin className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Tất cả địa điểm"
                    className="w-full bg-transparent text-sm sm:text-[15px] text-[#0F1112] placeholder:text-gray-400 focus:outline-none"
                  />
                </div>

                {/* Search Submit Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-[#16C759] hover:bg-[#14B34F] text-white text-sm sm:text-[15px] font-bold rounded-xl shadow-md shadow-green-500/25 transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  Tìm việc ngay
                </button>
              </div>
            </form>

            {/* Popular Search Keywords */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-500">Tìm kiếm phổ biến:</span>
              {POPULAR_SEARCH_KEYWORDS.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleKeywordClick(item)}
                  className="font-medium text-[#0F1112] hover:text-[#16C759] hover:underline transition-colors cursor-pointer"
                >
                  {item}
                  {index < POPULAR_SEARCH_KEYWORDS.length - 1 && (
                    <span className="text-gray-300 ml-2 select-none">|</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Hero Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[460px] aspect-[4/3.8] flex items-center justify-center">
              {/* Organic Soft Green Circular Background Shape */}
              <div className="absolute inset-0 m-auto w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full bg-gradient-to-tr from-green-200/70 to-emerald-100/60 -z-10" />

              {/* Main Illustration or Persona Image */}
              <div className="relative w-full h-full flex items-end justify-center">
                <Image
                  src="/home/hero-illustration.png"
                  alt="CareerHub Candidate"
                  width={500}
                  height={500}
                  priority
                  className="w-auto h-[90%] sm:h-[95%] object-contain select-none drop-shadow-sm"
                />
              </div>

              {/* Floating Notification Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-6 -left-2 sm:bottom-8 sm:left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center gap-3 z-20 select-none"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 text-[#16C759] flex items-center justify-center shrink-0">
                  <LuCheck className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F1112] leading-tight">
                    Cơ hội mới đang chờ
                  </p>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    Sẵn sàng cho bước tiếp theo
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
