"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LuHeart,
  LuMapPin,
  LuWallet,
  LuCircleCheck,
  LuArrowRight,
} from "react-icons/lu";
import { Job } from "../types";

interface JobCardItemProps {
  job: Job;
  lng?: string;
  viewMode?: "grid" | "list";
}

export const JobCardItem: React.FC<JobCardItemProps> = ({
  job,
  lng = "vi",
  viewMode = "grid",
}) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked ?? false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-gray-100 hover:border-[#28C76F]/50 p-5 shadow-2xs hover:shadow-xl hover:shadow-[#0D3B2E]/5 transition-all duration-200 flex flex-col justify-between ${viewMode === "list" ? "sm:flex-row sm:items-center gap-4" : "gap-4"
        }`}
    >
      <div className={viewMode === "list" ? "flex-1" : ""}>
        {/* Top Header: Company Logo, Job Title, Company Name, Heart Icon */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Company Logo Container */}
            <div className="w-12 h-11 rounded-xl bg-gray-50/80 border border-gray-100 p-1 flex items-center justify-center shrink-0">
              <Image
                src={job.companyLogo}
                alt={job.company}
                width={40}
                height={35}
                className="max-h-7 max-w-[40px] w-auto h-auto object-contain"
              />
            </div>

            {/* Title & Company */}
            <div>
              <Link href={`/${lng}/jobs/${job.id}`} className="block">
                <h3 className="text-base sm:text-[17px] font-extrabold text-[#0D3B2E] group-hover:text-[#28C76F] transition-colors leading-snug line-clamp-1">
                  {job.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
                <span className="font-semibold text-gray-700 truncate max-w-[160px]">
                  {job.company}
                </span>
                {job.verified && (
                  <LuCircleCheck
                    className="w-3.5 h-3.5 text-[#28C76F] shrink-0"
                    title="Doanh nghiệp đã xác thực"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Heart Bookmark Button */}
          <button
            type="button"
            onClick={toggleBookmark}
            aria-label="Lưu công việc"
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
          >
            <LuHeart
              className={`w-4 h-4 transition-colors ${isBookmarked
                  ? "fill-rose-500 text-rose-500"
                  : "text-gray-300 hover:text-rose-400"
                }`}
            />
          </button>
        </div>

        {/* Salary & Location Row */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-3 text-xs sm:text-[13px]">
          <div className="flex items-center gap-1.5 text-[#0D3B2E] font-bold">
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-[#EBF7F0] text-[#28C76F]">
              <LuWallet className="w-3.5 h-3.5" />
            </span>
            <span>{job.salary}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500">
            <LuMapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{job.location}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Tags & Action Button */}
      <div
        className={`flex items-center justify-between gap-3 pt-3.5 border-t border-gray-100/80 ${viewMode === "list" ? "sm:border-t-0 sm:pt-0 shrink-0" : ""
          }`}
      >
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md bg-[#EBF7F0] text-[#0D3B2E] text-xs font-semibold">
            {job.jobType}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
            {job.workplaceType}
          </span>
          {job.experience && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-[#0D3B2E] text-xs font-semibold">
              {job.experience}
            </span>
          )}
        </div>

        {/* Action Button: Xem chi tiết */}
        <Link
          href={`/${lng}/jobs/${job.id}`}
          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full border border-[#28C76F] text-[#28C76F] hover:bg-[#28C76F] hover:text-white text-xs font-bold transition-all duration-150 active:scale-95 whitespace-nowrap cursor-pointer"
        >
          <span>Xem chi tiết</span>
          <LuArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
