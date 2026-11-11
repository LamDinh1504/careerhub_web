"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  LuSearch,
  LuLayers,
  LuMapPin,
  LuChevronDown,
  LuCheck,
} from "react-icons/lu";
import { CATEGORIES_OPTIONS, LOCATIONS_OPTIONS } from "../data";

interface JobsSearchBarProps {
  keyword: string;
  category: string;
  location: string;
  onKeywordChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onSearch: () => void;
}

export const JobsSearchBar: React.FC<JobsSearchBarProps> = ({
  keyword,
  category,
  location,
  onKeywordChange,
  onCategoryChange,
  onLocationChange,
  onSearch,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target as Node)
      ) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCategoryOpen(false);
    setIsLocationOpen(false);
    onSearch();
  };

  const selectedCategoryLabel = category || "Tất cả ngành nghề";
  const selectedLocationLabel = location || "Tất cả địa điểm";

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 z-30 w-full select-none">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl md:rounded-[22px] p-2 sm:p-2.5 shadow-xl shadow-[#0D3B2E]/10 border border-gray-100/90 flex flex-col md:flex-row items-center gap-2 sm:gap-2.5"
      >
        {/* 1. Keyword Input */}
        <div className="w-full md:flex-1 bg-[#F8FAFC] rounded-xl px-4 py-2.5 sm:py-3 flex items-center gap-3 border border-transparent focus-within:border-[#28C76F]/50 focus-within:bg-white transition-all">
          <LuSearch className="w-4 h-4 text-[#28C76F] shrink-0 stroke-[2.5]" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            placeholder="Tìm kiếm công việc, vị trí, công ty..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#0D3B2E] placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {/* 2. Custom Category Dropdown */}
        <div
          ref={categoryRef}
          className="relative w-full md:w-auto md:min-w-[220px]"
        >
          <button
            type="button"
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsLocationOpen(false);
            }}
            className={`w-full rounded-xl px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 border transition-all cursor-pointer ${
              isCategoryOpen
                ? "bg-white border-[#28C76F] shadow-sm ring-1 ring-[#28C76F]/20"
                : "bg-[#F8FAFC] border-transparent hover:bg-slate-100/80"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <LuLayers className="w-4 h-4 text-[#28C76F] shrink-0 stroke-[2.5]" />
              <span className="text-xs sm:text-sm text-[#0D3B2E] font-medium truncate">
                {selectedCategoryLabel}
              </span>
            </div>
            <LuChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                isCategoryOpen ? "rotate-180 text-[#28C76F]" : ""
              }`}
            />
          </button>

          {/* Category Dropdown Menu */}
          {isCategoryOpen && (
            <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white rounded-2xl border border-gray-100 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="max-h-60 overflow-y-auto space-y-1">
                {CATEGORIES_OPTIONS.map((cat) => {
                  const val = cat === "Tất cả ngành nghề" ? "" : cat;
                  const isSelected = category === val;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onCategoryChange(val);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-[#EBF7F0] text-[#0D3B2E] font-bold"
                          : "text-gray-700 hover:bg-[#F8FAFC] hover:text-[#0D3B2E]"
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {isSelected && (
                        <LuCheck className="w-4 h-4 text-[#28C76F] shrink-0 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Custom Location Dropdown */}
        <div
          ref={locationRef}
          className="relative w-full md:w-auto md:min-w-[200px]"
        >
          <button
            type="button"
            onClick={() => {
              setIsLocationOpen(!isLocationOpen);
              setIsCategoryOpen(false);
            }}
            className={`w-full rounded-xl px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3 border transition-all cursor-pointer ${
              isLocationOpen
                ? "bg-white border-[#28C76F] shadow-sm ring-1 ring-[#28C76F]/20"
                : "bg-[#F8FAFC] border-transparent hover:bg-slate-100/80"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <LuMapPin className="w-4 h-4 text-[#28C76F] shrink-0 stroke-[2.5]" />
              <span className="text-xs sm:text-sm text-[#0D3B2E] font-medium truncate">
                {selectedLocationLabel}
              </span>
            </div>
            <LuChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                isLocationOpen ? "rotate-180 text-[#28C76F]" : ""
              }`}
            />
          </button>

          {/* Location Dropdown Menu */}
          {isLocationOpen && (
            <div className="absolute top-full left-0 mt-2 w-full min-w-[220px] bg-white rounded-2xl border border-gray-100 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="max-h-60 overflow-y-auto space-y-1">
                {LOCATIONS_OPTIONS.map((loc) => {
                  const val = loc === "Tất cả địa điểm" ? "" : loc;
                  const isSelected = location === val;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        onLocationChange(val);
                        setIsLocationOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-[#EBF7F0] text-[#0D3B2E] font-bold"
                          : "text-gray-700 hover:bg-[#F8FAFC] hover:text-[#0D3B2E]"
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {isSelected && (
                        <LuCheck className="w-4 h-4 text-[#28C76F] shrink-0 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. Submit Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#0D3B2E] hover:bg-[#155d49] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <LuSearch className="w-4 h-4 text-white stroke-[2.5]" />
          <span>Tìm kiếm</span>
        </button>
      </form>
    </div>
  );
};
