"use client";

import React, { useState } from "react";
import {
  LuSend,
  LuHeart,
  LuCalendar,
  LuClock,
  LuEye,
} from "react-icons/lu";
import { toast } from "react-toastify";
import { JobDetail } from "../types";

interface JobApplySidebarProps {
  job: JobDetail;
  onOpenApplyModal: () => void;
}

export const JobApplySidebar: React.FC<JobApplySidebarProps> = ({
  job,
  onOpenApplyModal,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked ?? false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked
        ? "Đã hủy lưu công việc này"
        : "Đã lưu công việc vào danh sách yêu thích!"
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
      {/* Primary Apply Button - Vibrant Green matching reference */}
      <button
        type="button"
        onClick={onOpenApplyModal}
        className="w-full bg-[#28C76F] hover:bg-[#22b263] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer shadow-md shadow-green-500/25 hover:shadow-lg hover:shadow-green-500/35 active:scale-[0.99]"
      >
        <LuSend className="w-4 h-4 text-white stroke-[2.5]" />
        <span className="text-[15px]">Ứng tuyển ngay</span>
      </button>

      {/* Save Button */}
      <button
        type="button"
        onClick={toggleBookmark}
        className="w-full mt-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm"
      >
        <LuHeart
          className={`w-4 h-4 transition-colors ${
            isBookmarked
              ? "fill-rose-500 text-rose-500"
              : "text-gray-400 group-hover:text-rose-500"
          }`}
        />
        <span>{isBookmarked ? "Đã lưu tin" : "Lưu tin"}</span>
      </button>

      {/* Meta Information Container */}
      <div className="mt-4 bg-[#F8FAF9] rounded-xl p-4 border border-gray-100/80 space-y-3 text-xs text-gray-600">
        <div className="flex items-center gap-2.5">
          <LuCalendar className="w-4 h-4 text-gray-400 shrink-0" />
          <span>
            Hạn nộp hồ sơ:{" "}
            <strong className="text-gray-800 font-bold">{job.deadline}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <LuClock className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{job.postedAt}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <LuEye className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{job.viewsCount.toLocaleString("vi-VN")} lượt xem</span>
        </div>
      </div>
    </div>
  );
};

