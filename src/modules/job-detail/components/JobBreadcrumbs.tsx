"use client";

import React from "react";
import Link from "next/link";
import { LuHouse, LuChevronRight } from "react-icons/lu";

interface JobBreadcrumbsProps {
  lng?: string;
  jobTitle: string;
}

export const JobBreadcrumbs: React.FC<JobBreadcrumbsProps> = ({
  lng = "vi",
  jobTitle,
}) => {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-500 mb-5 select-none overflow-x-auto no-scrollbar py-1">
      <Link
        href={`/${lng}`}
        className="flex items-center gap-1 hover:text-[#0D3B2E] transition-colors shrink-0"
      >
        <LuHouse className="w-3.5 h-3.5" />
        <span>Trang chủ</span>
      </Link>

      <LuChevronRight className="w-3 h-3 text-gray-400 shrink-0" />

      <Link
        href={`/${lng}/jobs`}
        className="hover:text-[#0D3B2E] transition-colors shrink-0"
      >
        Việc làm
      </Link>

      <LuChevronRight className="w-3 h-3 text-gray-400 shrink-0" />

      <span className="text-gray-800 font-semibold truncate max-w-[280px] sm:max-w-none">
        {jobTitle}
      </span>
    </nav>
  );
};
