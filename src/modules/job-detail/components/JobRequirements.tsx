"use client";

import React from "react";

interface JobRequirementsProps {
  requirements: string[];
}

export const JobRequirements: React.FC<JobRequirementsProps> = ({ requirements }) => {
  return (
    <div className="mb-8">
      {/* Section Title with Green Indicator Bar */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-1.5 h-5 rounded-full bg-[#28C76F] shrink-0" />
        <h2 className="text-base sm:text-lg font-bold text-[#0D3B2E]">
          Yêu cầu ứng viên
        </h2>
      </div>

      {/* Bullets List */}
      <ul className="space-y-2.5 text-xs sm:text-[13px] text-gray-700 leading-relaxed pl-1">
        {requirements.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

