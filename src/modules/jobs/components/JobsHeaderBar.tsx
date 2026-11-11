"use client";

import React from "react";
import { LuLayoutGrid, LuList } from "react-icons/lu";

interface JobsHeaderBarProps {
  totalCount: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const JobsHeaderBar: React.FC<JobsHeaderBarProps> = ({
  totalCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs mb-6">
      {/* Total Found Count */}
      <div>
        <p className="text-sm sm:text-base text-[#0D3B2E] font-medium">
          Tìm thấy{" "}
          <span className="font-extrabold text-[#0D3B2E] text-base sm:text-lg">
            {totalCount.toLocaleString("vi-VN")}
          </span>{" "}
          việc làm
        </p>
      </div>

      {/* Sort Dropdown & View Mode Switcher */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-gray-500 font-medium whitespace-nowrap">
            Sắp xếp:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="py-1.5 pl-3 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-[#0D3B2E] appearance-none focus:outline-none focus:border-[#28C76F] cursor-pointer"
            >
              <option value="relevant">Phù hợp nhất</option>
              <option value="newest">Mới nhất</option>
              <option value="salaryHigh">Lương cao nhất</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid View"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#28C76F] text-white shadow-xs"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <LuLayoutGrid className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            aria-label="List View"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "list"
                ? "bg-[#28C76F] text-white shadow-xs"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <LuList className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

