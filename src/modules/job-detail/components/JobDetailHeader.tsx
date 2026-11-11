"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LuMapPin,
  LuBriefcase,
  LuChartBar,
  LuWallet,
  LuShare2,
  LuHeart,
  LuCircleCheck,
} from "react-icons/lu";
import { toast } from "react-toastify";
import { JobDetail } from "../types";

interface JobDetailHeaderProps {
  job: JobDetail;
}

export const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked ?? false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép liên kết việc làm vào bộ nhớ tạm!");
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked
        ? "Đã hủy lưu công việc này"
        : "Đã lưu công việc vào danh sách yêu thích!"
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 lg:p-7 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-5">
        {/* Left: Company Logo & Job Title Information */}
        <div className="flex items-start gap-4 sm:gap-5 min-w-0">
          {/* Logo Container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F8FAFC] border border-gray-100 p-2 flex items-center justify-center shrink-0 shadow-2xs">
            <Image
              src={job.companyLogo}
              alt={job.company}
              width={65}
              height={65}
              className="max-h-12 sm:max-h-14 max-w-[55px] sm:max-w-[65px] w-auto h-auto object-contain"
            />
          </div>

          {/* Job Details Info */}
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0D3B2E] tracking-tight leading-snug">
              {job.title}
            </h1>

            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
              <span className="font-bold text-gray-800">{job.company}</span>
              {job.verified && (
                <LuCircleCheck
                  className="w-4 h-4 text-[#28C76F] shrink-0"
                  title="Doanh nghiệp đã xác thực"
                />
              )}
            </div>

            {/* Meta Row: Location, Job Type, Level, Salary */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs sm:text-[13px] text-gray-600">
              <div className="flex items-center gap-1.5">
                <LuMapPin className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <LuBriefcase className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
                <span>{job.jobType}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <LuChartBar className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
                <span>{job.level}</span>
              </div>

              <div className="flex items-center gap-1.5 font-bold text-[#0D3B2E]">
                <LuWallet className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
                <span>{job.salary}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Share & Bookmark Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Chia sẻ việc làm"
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title="Chia sẻ"
          >
            <LuShare2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleBookmark}
            aria-label="Lưu công việc"
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title="Lưu tin"
          >
            <LuHeart
              className={`w-4 h-4 transition-colors ${isBookmarked
                  ? "fill-rose-500 text-rose-500"
                  : "text-gray-400 hover:text-rose-500"
                }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
