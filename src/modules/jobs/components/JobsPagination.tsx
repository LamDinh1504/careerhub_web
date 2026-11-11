"use client";

import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface JobsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const JobsPagination: React.FC<JobsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages: (number | string)[] = [];

  // Build pagination numbers matching Image 1: 1 2 3 4 5 ... 143
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-10 select-none">
      {/* Prev Button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#0D3B2E] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Previous Page"
      >
        <LuChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs text-gray-400 font-bold"
            >
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p as number)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
              isCurrent
                ? "bg-[#28C76F] text-white shadow-xs"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#0D3B2E]"
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#0D3B2E] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Next Page"
      >
        <LuChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

