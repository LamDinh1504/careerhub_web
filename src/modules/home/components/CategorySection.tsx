"use client";

import React from "react";
import Link from "next/link";
import {
  LuCode,
  LuTrendingUp,
  LuWallet,
  LuPenTool,
  LuArrowRight,
} from "react-icons/lu";
import { CATEGORIES_DATA } from "../data";
import { Category } from "../types";

const getCategoryIcon = (iconType: Category["iconType"]) => {
  switch (iconType) {
    case "code":
      return <LuCode className="w-5 h-5" />;
    case "marketing":
      return <LuTrendingUp className="w-5 h-5" />;
    case "finance":
      return <LuWallet className="w-5 h-5" />;
    case "design":
      return <LuPenTool className="w-5 h-5" />;
    default:
      return <LuCode className="w-5 h-5" />;
  }
};

interface CategorySectionProps {
  lng?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  lng = "vi",
}) => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1112]">
              Tìm hướng đi của bạn
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Khám phá cơ hội theo lĩnh vực bạn yêu thích.
            </p>
          </div>

          <Link
            href={`/${lng}/jobs`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#16C759] hover:text-[#14B34F] transition-colors group cursor-pointer shrink-0"
          >
            <span>Tất cả ngành nghề</span>
            <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((item) => (
            <Link
              key={item.id}
              href={`/${lng}${item.href}`}
              className="group block p-6 bg-white rounded-2xl border border-gray-100 hover:border-green-300 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-200 hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[#16C759] group-hover:bg-[#16C759] group-hover:text-white flex items-center justify-center transition-colors">
                {getCategoryIcon(item.iconType)}
              </div>

              {/* Category Name */}
              <h3 className="mt-5 text-base sm:text-lg font-bold text-[#0F1112] group-hover:text-[#16C759] transition-colors leading-snug">
                {item.name}
              </h3>

              {/* Job Count */}
              <p className="mt-2 text-sm text-gray-500">
                {item.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
