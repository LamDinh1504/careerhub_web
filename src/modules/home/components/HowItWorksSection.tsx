"use client";

import React from "react";
import Link from "next/link";
import { PROCESS_STEPS_DATA } from "../data";

interface HowItWorksSectionProps {
  lng?: string;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  lng = "vi",
}) => {
  return (
    <section className="bg-white py-20 sm:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F1112] leading-tight">
            Bước nhỏ hôm nay. <br />
            Bước tiến lớn ngày mai.
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Từ hồ sơ đầu tiên đến công việc tiếp theo — CareerHub luôn đồng hành.
          </p>
        </div>

        {/* 3 Steps Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-14">
          {PROCESS_STEPS_DATA.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-start p-2"
            >
              {/* Step Pill */}
              <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-green-100 text-[#16C759] text-sm font-extrabold tracking-wide">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="mt-5 text-lg sm:text-xl font-bold text-[#0F1112]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-sm sm:text-base text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Central Action CTA */}
        <div className="flex justify-center">
          <Link
            href={`/${lng}/register`}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#16C759] hover:bg-[#14B34F] text-white text-base font-bold rounded-xl shadow-md shadow-green-500/25 transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            Tạo hồ sơ miễn phí
          </Link>
        </div>
      </div>
    </section>
  );
};
