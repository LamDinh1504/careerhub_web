"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LuArrowRight,
  LuHeart,
  LuMapPin,
  LuWallet,
} from "react-icons/lu";
import { toast } from "react-toastify";
import { SimilarJob } from "../types";

interface SimilarJobsCardProps {
  similarJobs: SimilarJob[];
  lng?: string;
}

export const SimilarJobsCard: React.FC<SimilarJobsCardProps> = ({
  similarJobs,
  lng = "vi",
}) => {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    similarJobs.forEach((job) => {
      initial[job.id] = job.isBookmarked ?? false;
    });
    return initial;
  });

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks((prev) => {
      const nextState = !prev[id];
      toast.success(
        nextState
          ? "Đã lưu công việc vào danh sách yêu thích!"
          : "Đã hủy lưu công việc này"
      );
      return { ...prev, [id]: nextState };
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#0D3B2E]">
          Việc làm tương tự
        </h3>

        <Link
          href={`/${lng}/jobs`}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
        >
          <span>Xem tất cả</span>
          <LuArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {similarJobs.map((job) => {
          const isSaved = bookmarks[job.id] ?? false;
          return (
            <Link
              key={job.id}
              href={`/${lng}/jobs/${job.id}`}
              className="group block p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-[#F9FBFA] transition-all"
            >
              <div className="flex items-start gap-3">
                {/* Company Logo */}
                <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 p-1.5 flex items-center justify-center shrink-0">
                  <Image
                    src={job.companyLogo}
                    alt={job.company}
                    width={35}
                    height={35}
                    className="max-h-8 max-w-[32px] w-auto h-auto object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {job.title}
                    </h4>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(e, job.id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors p-1 -mr-1 -mt-1 cursor-pointer shrink-0"
                      title="Lưu tin"
                    >
                      <LuHeart
                        className={`w-3.5 h-3.5 ${isSaved ? "fill-rose-500 text-rose-500" : ""
                          }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {job.company}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-2xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <LuMapPin className="w-3 h-3 text-[#28C76F]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-gray-700">
                      <LuWallet className="w-3 h-3 text-[#28C76F]" />
                      {job.salary}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

