"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import { FEATURED_JOBS_DATA } from "../data";
import { JobFilterTab } from "../types";
import { JobCard } from "./JobCard";

interface FeaturedJobsSectionProps {
  lng?: string;
}

const TABS: { id: JobFilterTab; label: string }[] = [
  { id: "all", label: "Dành cho bạn" },
  { id: "latest", label: "Mới nhất" },
  { id: "salary", label: "Lương cao" },
  { id: "remote", label: "Làm việc từ xa" },
];

export const FeaturedJobsSection: React.FC<FeaturedJobsSectionProps> = ({
  lng = "vi",
}) => {
  const [activeTab, setActiveTab] = useState<JobFilterTab>("all");

  const filteredJobs = FEATURED_JOBS_DATA.filter((job) => {
    if (activeTab === "all") return true;
    if (activeTab === "latest") return job.badgeVariant === "new";
    if (activeTab === "salary") return parseInt(job.salary) >= 20;
    if (activeTab === "remote")
      return job.tags.some((t) => t.toLowerCase().includes("remote") || job.location.includes("Toàn quốc"));
    return true;
  });

  return (
    <section id="jobs" className="bg-[#F8FAFC] py-16 sm:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1112]">
              Việc tốt, chờ bạn
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Những cơ hội nổi bật từ các doanh nghiệp đang tuyển dụng.
            </p>
          </div>

          <Link
            href={`/${lng}/jobs`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#16C759] hover:text-[#14B34F] transition-colors group cursor-pointer shrink-0"
          >
            <span>Xem tất cả việc làm</span>
            <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#0F1112] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} lng={lng} />
          ))}
        </div>

        {/* Verified Notice Footer */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-[#16C759]">
            <LuCheck className="w-3.5 h-3.5 stroke-[3]" />
          </span>
          <span>Cơ hội được cập nhật và kiểm duyệt mỗi ngày</span>
        </div>
      </div>
    </section>
  );
};
