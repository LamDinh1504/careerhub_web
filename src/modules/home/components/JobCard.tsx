"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LuBookmark,
  LuMapPin,
  LuBuilding2,
} from "react-icons/lu";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
  lng?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ job, lng = "vi" }) => {
  const [bookmarked, setBookmarked] = useState(job.isBookmarked ?? false);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const getBadgeStyle = (variant?: Job["badgeVariant"]) => {
    switch (variant) {
      case "urgent":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "featured":
        return "text-[#16C759] bg-green-50 border-green-200";
      case "new":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      default:
        return "text-[#16C759] bg-green-50 border-green-200";
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-green-300 p-6 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Company Header & Bookmark */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-[#16C759] flex items-center justify-center shrink-0">
              <LuBuilding2 className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-gray-700 truncate max-w-[170px]">
              {job.company}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleBookmark}
            aria-label="Lưu việc làm"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              bookmarked
                ? "text-[#16C759] bg-green-50"
                : "text-gray-400 hover:text-[#16C759] hover:bg-gray-50"
            }`}
          >
            <LuBookmark
              className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Job Title */}
        <Link href={`/${lng}/jobs/${job.id}`} className="block">
          <h3 className="text-base sm:text-lg font-bold text-[#0F1112] group-hover:text-[#16C759] transition-colors line-clamp-1">
            {job.title}
          </h3>
        </Link>

        {/* Salary */}
        <p className="mt-2 text-base font-extrabold text-[#16C759]">
          {job.salary}
        </p>

        {/* Location */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
          <LuMapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{job.location}</span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600 select-none"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Status Badge & Posted Time */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
        <div>
          {job.badge && (
            <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold tracking-wider uppercase ${getBadgeStyle(job.badgeVariant)}`}>
              {job.badge}
            </span>
          )}
        </div>
        <span className="text-gray-400">{job.postedAt}</span>
      </div>
    </div>
  );
};
