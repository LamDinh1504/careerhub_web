"use client";

import React, { useState } from "react";
import Image from "next/image";
import { JobDetail } from "./types";
import {
  JobBreadcrumbs,
  JobDetailHeader,
  JobDetailTabs,
  DetailTabType,
  JobDescription,
  JobRequirements,
  JobBenefits,
  JobApplySidebar,
  CompanyInfoCard,
  SimilarJobsCard,
  JobApplyModal,
} from "./components";
import { LuSend } from "react-icons/lu";

interface JobDetailViewProps {
  job: JobDetail;
  lng?: string;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({
  job,
  lng = "vi",
}) => {
  const [activeTab, setActiveTab] = useState<DetailTabType>("details");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <div className="w-full bg-[#F3FAF5] min-h-screen pt-3 sm:pt-5 pb-20 sm:pb-24 text-[#0D3B2E]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <JobBreadcrumbs lng={lng} jobTitle={job.title} />

        {/* Top Header Card */}
        <JobDetailHeader job={job} />

        {/* Navigation Tabs Bar */}
        <JobDetailTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />

        {/* Main Content: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          {/* Left Column: Tab Content */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === "details" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                {/* 1. Job Description */}
                <JobDescription description={job.description} />

                {/* 2. Candidate Requirements */}
                <JobRequirements requirements={job.requirements} />

                {/* 3. Benefits / Quyền lợi */}
                <JobBenefits benefits={job.benefits} />
              </div>
            )}

            {activeTab === "company" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-[#28C76F] shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold text-[#0D3B2E]">
                    Giới thiệu {job.companyInfo.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {job.companyInfo.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F8FAF9] border border-gray-100">
                    <p className="text-xs text-gray-500">Quy mô doanh nghiệp</p>
                    <p className="text-sm font-bold text-[#0D3B2E] mt-1">
                      {job.companyInfo.size}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8FAF9] border border-gray-100">
                    <p className="text-xs text-gray-500">Lĩnh vực hoạt động</p>
                    <p className="text-sm font-bold text-[#0D3B2E] mt-1">
                      {job.companyInfo.industry}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "similar" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-1.5 h-5 rounded-full bg-[#28C76F] shrink-0" />
                  <h2 className="text-base sm:text-lg font-bold text-[#0D3B2E]">
                    Các cơ hội việc làm khác từ {job.company}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {job.similarJobs.map((simJob) => (
                    <div
                      key={simJob.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-emerald-300 hover:bg-[#F9FBFA] transition-all flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={simJob.companyLogo}
                          alt={simJob.company}
                          width={32}
                          height={32}
                          className="max-h-7 max-w-[28px] object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {simJob.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{simJob.company}</p>
                        <div className="flex items-center gap-3 mt-2 text-2xs text-gray-600">
                          <span>{simJob.location}</span>
                          <span className="font-bold text-[#0D3B2E]">{simJob.salary}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar (Pinned on screen to prevent empty gaps on scroll) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            {/* 1. Apply CTA & Meta Sidebar */}
            <JobApplySidebar
              job={job}
              onOpenApplyModal={() => setIsApplyModalOpen(true)}
            />

            {/* 2. Company Info Box */}
            <CompanyInfoCard company={job.companyInfo} lng={lng} />

            {/* 3. Similar Jobs Box */}
            <SimilarJobsCard similarJobs={job.similarJobs} lng={lng} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Apply Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-4 py-3 z-40 lg:hidden shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-500 truncate">{job.company}</p>
          <p className="text-xs sm:text-sm font-bold text-[#0D3B2E] truncate">
            {job.salary}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsApplyModalOpen(true)}
          className="bg-[#28C76F] hover:bg-[#22b263] text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-green-500/25 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <LuSend className="w-4 h-4 text-white stroke-[2.5]" />
          <span>Ứng tuyển ngay</span>
        </button>
      </div>

      {/* Apply Modal */}
      <JobApplyModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};

