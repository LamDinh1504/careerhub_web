"use client";

import React from "react";
import {
  LuCoins,
  LuShieldCheck,
  LuLaptop,
  LuGraduationCap,
} from "react-icons/lu";
import { BenefitItem } from "../types";

interface JobBenefitsProps {
  benefits: BenefitItem[];
}

export const JobBenefits: React.FC<JobBenefitsProps> = ({ benefits }) => {
  const getIcon = (type: BenefitItem["iconType"]) => {
    switch (type) {
      case "money":
        return <LuCoins className="w-5 h-5 text-[#28C76F]" />;
      case "shield":
        return <LuShieldCheck className="w-5 h-5 text-[#28C76F]" />;
      case "laptop":
        return <LuLaptop className="w-5 h-5 text-[#28C76F]" />;
      case "education":
        return <LuGraduationCap className="w-5 h-5 text-[#28C76F]" />;
      default:
        return <LuCoins className="w-5 h-5 text-[#28C76F]" />;
    }
  };

  return (
    <div className="mb-4">
      {/* Section Title with Green Indicator Bar */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-1.5 h-5 rounded-full bg-[#28C76F] shrink-0" />
        <h2 className="text-base sm:text-lg font-bold text-[#0D3B2E]">
          Quyền lợi
        </h2>
      </div>

      {/* Benefits Grid (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-[#F8FAF9]/80 border border-gray-100/90 rounded-2xl p-4 flex flex-col items-center text-center hover:bg-emerald-50/40 hover:border-emerald-200/50 transition-all shadow-2xs"
          >
            {/* Round Green Icon Container */}
            <div className="w-11 h-11 rounded-full bg-emerald-50/80 border border-emerald-100 flex items-center justify-center mb-3 shrink-0">
              {getIcon(item.iconType)}
            </div>

            {/* Text */}
            <p className="text-xs sm:text-[13px] font-bold text-[#0D3B2E] leading-snug">
              {item.title}
            </p>
            {item.subtitle && (
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                {item.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

