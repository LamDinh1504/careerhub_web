"use client";

import React from "react";
import {
  LuSlidersHorizontal,
  LuSearch,
  LuBriefcase,
  LuMapPin,
  LuLayers,
  LuAward,
} from "react-icons/lu";
import {
  CATEGORIES_OPTIONS,
  LOCATIONS_OPTIONS,
  JOB_TYPES_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "../data";
import { JobFilters } from "../types";

interface JobsFilterSidebarProps {
  filters: JobFilters;
  onFilterChange: (key: keyof JobFilters, value: string | number) => void;
  onResetFilters: () => void;
}

export const JobsFilterSidebar: React.FC<JobsFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  return (
    <aside className="w-full bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <div className="flex items-center gap-2">
          <LuSlidersHorizontal className="w-4 h-4 text-[#0D3B2E]" />
          <h2 className="text-base font-extrabold text-[#0D3B2E] tracking-tight">
            Bộ lọc tìm kiếm
          </h2>
        </div>

        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs font-bold text-[#28C76F] hover:text-[#20a359] hover:underline transition-colors cursor-pointer"
        >
          Xóa tất cả
        </button>
      </div>

      <div className="space-y-5">
        {/* Filter 1: Từ khóa */}
        <div>
          <label className="block text-xs font-bold text-[#0D3B2E] mb-2 uppercase tracking-wide">
            Từ khóa
          </label>
          <div className="relative flex items-center">
            <LuSearch className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => onFilterChange("keyword", e.target.value)}
              placeholder="Nhập vị trí, kỹ năng, công ty..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0D3B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#28C76F] focus:ring-1 focus:ring-[#28C76F] transition-all"
            />
          </div>
        </div>

        {/* Filter 2: Ngành nghề */}
        <div>
          <label className="block text-xs font-bold text-[#0D3B2E] mb-2 uppercase tracking-wide">
            Ngành nghề
          </label>
          <div className="relative flex items-center">
            <LuBriefcase className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={filters.category}
              onChange={(e) => onFilterChange("category", e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0D3B2E] appearance-none focus:outline-none focus:border-[#28C76F] focus:ring-1 focus:ring-[#28C76F] transition-all cursor-pointer"
            >
              {CATEGORIES_OPTIONS.map((cat) => (
                <option key={cat} value={cat === "Tất cả ngành nghề" ? "" : cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 flex items-center text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter 3: Địa điểm */}
        <div>
          <label className="block text-xs font-bold text-[#0D3B2E] mb-2 uppercase tracking-wide">
            Địa điểm
          </label>
          <div className="relative flex items-center">
            <LuMapPin className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0D3B2E] appearance-none focus:outline-none focus:border-[#28C76F] focus:ring-1 focus:ring-[#28C76F] transition-all cursor-pointer"
            >
              {LOCATIONS_OPTIONS.map((loc) => (
                <option key={loc} value={loc === "Tất cả địa điểm" ? "" : loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 flex items-center text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter 4: Hình thức làm việc */}
        <div>
          <label className="block text-xs font-bold text-[#0D3B2E] mb-2 uppercase tracking-wide">
            Hình thức làm việc
          </label>
          <div className="relative flex items-center">
            <LuLayers className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={filters.jobType}
              onChange={(e) => onFilterChange("jobType", e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0D3B2E] appearance-none focus:outline-none focus:border-[#28C76F] focus:ring-1 focus:ring-[#28C76F] transition-all cursor-pointer"
            >
              {JOB_TYPES_OPTIONS.map((type) => (
                <option key={type} value={type === "Tất cả hình thức" ? "" : type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 flex items-center text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter 5: Kinh nghiệm */}
        <div>
          <label className="block text-xs font-bold text-[#0D3B2E] mb-2 uppercase tracking-wide">
            Kinh nghiệm
          </label>
          <div className="relative flex items-center">
            <LuAward className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={filters.experience}
              onChange={(e) => onFilterChange("experience", e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0D3B2E] appearance-none focus:outline-none focus:border-[#28C76F] focus:ring-1 focus:ring-[#28C76F] transition-all cursor-pointer"
            >
              {EXPERIENCE_OPTIONS.map((exp) => (
                <option key={exp} value={exp === "Tất cả kinh nghiệm" ? "" : exp}>
                  {exp}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 flex items-center text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter 5: Mức lương Slider */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#0D3B2E] uppercase tracking-wide">
              Mức lương
            </label>
            <span className="text-xs font-extrabold text-[#28C76F]">
              {filters.salaryMax >= 100
                ? "Tất cả mức lương"
                : `Dưới ${filters.salaryMax} triệu`}
            </span>
          </div>

          {/* Range Track with dynamic accent */}
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={filters.salaryMax}
            onChange={(e) =>
              onFilterChange("salaryMax", parseInt(e.target.value, 10))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#28C76F]"
          />

          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mt-2 select-none">
            <span>Từ 0 triệu</span>
            <span>Đến 100+ triệu</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

