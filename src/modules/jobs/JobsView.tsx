"use client";

import React, { useState, useMemo } from "react";
import { JOBS_LIST_DATA } from "./data";
import { JobFilters } from "./types";
import {
  JobsHero,
  JobsSearchBar,
  JobsFilterSidebar,
  JobsHeaderBar,
  JobCardItem,
  JobsPagination,
} from "./components";

interface JobsViewProps {
  lng?: string;
  initialCompany?: string;
}

const INITIAL_FILTERS: JobFilters = {
  keyword: "",
  category: "",
  location: "",
  jobType: "",
  experience: "",
  salaryMax: 100,
};

export const JobsView: React.FC<JobsViewProps> = ({ lng = "vi", initialCompany = "" }) => {
  const [filters, setFilters] = useState<JobFilters>({ ...INITIAL_FILTERS, keyword: initialCompany });
  const [sortBy, setSortBy] = useState("relevant");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (key: keyof JobFilters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const handleScrollToJobs = () => {
    const el = document.getElementById("jobs-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter & Sort logic
  const filteredJobs = useMemo(() => {
    let result = JOBS_LIST_DATA.filter((job) => {
      // Keyword filter (title, company, description)
      if (filters.keyword.trim()) {
        const kw = filters.keyword.toLowerCase().trim();
        const matchTitle = job.title.toLowerCase().includes(kw);
        const matchCompany = job.company.toLowerCase().includes(kw);
        const matchDesc = job.description?.toLowerCase().includes(kw) ?? false;
        if (!matchTitle && !matchCompany && !matchDesc) return false;
      }

      // Category filter
      if (filters.category && job.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && !job.location.includes(filters.location)) {
        return false;
      }

      // Job Type filter
      if (
        filters.jobType &&
        job.jobType !== filters.jobType &&
        job.workplaceType !== filters.jobType
      ) {
        return false;
      }

      // Experience filter
      if (filters.experience && job.experience !== filters.experience) {
        return false;
      }

      // Salary max filter
      if (filters.salaryMax < 100 && (job.salaryMin ?? 0) > filters.salaryMax) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === "salaryHigh") {
      result = [...result].sort(
        (a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0)
      );
    } else if (sortBy === "newest") {
      result = [...result].sort((a, b) => (a.id > b.id ? -1 : 1));
    }

    return result;
  }, [filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / 8));

  return (
    <div className="w-full flex flex-col bg-[#F3FAF5] min-h-screen">
      {/* 1. Hero Section with 3-Slide Carousel */}
      <JobsHero lng={lng} onQuickSearchClick={handleScrollToJobs} />

      {/* 2. Horizontal Filter Search Bar in the Middle */}
      <JobsSearchBar
        keyword={filters.keyword}
        category={filters.category}
        location={filters.location}
        onKeywordChange={(val) => handleFilterChange("keyword", val)}
        onCategoryChange={(val) => handleFilterChange("category", val)}
        onLocationChange={(val) => handleFilterChange("location", val)}
        onSearch={handleScrollToJobs}
      />

      {/* 2. Main Content Container */}
      <div
        id="jobs-list"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full"
      >
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Filter Sidebar */}
          <div className="w-full lg:w-[300px] shrink-0 lg:sticky lg:top-24">
            <JobsFilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Right Column: Header Bar & Jobs Grid/List */}
          <div className="flex-1 w-full min-w-0">
            {/* Header Controls Bar */}
            <JobsHeaderBar
              totalCount={filteredJobs.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Job Listings Grid / List */}
            {filteredJobs.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {filteredJobs.slice((currentPage - 1) * 8, currentPage * 8).map((job) => (
                  <JobCardItem
                    key={job.id}
                    job={job}
                    lng={lng}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search Results */
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#28C76F] flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#0D3B2E] mb-2">
                  Không tìm thấy việc làm phù hợp
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  Vui lòng thử điều chỉnh lại từ khóa hoặc xóa bớt tiêu chí trong bộ
                  lọc để tìm kiếm thêm cơ hội khác.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#28C76F] text-white text-xs font-bold shadow-sm hover:bg-[#22b263] transition-colors cursor-pointer"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <JobsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

