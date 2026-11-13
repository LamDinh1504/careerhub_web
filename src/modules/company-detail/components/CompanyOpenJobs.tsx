"use client";

import { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { JobCardItem } from "@/modules/jobs/components/JobCardItem";
import type { Job } from "@/modules/jobs/types";

export function CompanyOpenJobs({ jobs, lng }: { jobs: Job[]; lng: string }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const categories = [...new Set(jobs.map((job) => job.category))];
  const visibleJobs = useMemo(() => jobs.filter((job) => {
    const normalized = keyword.trim().toLocaleLowerCase();
    return (!normalized || `${job.title} ${job.location}`.toLocaleLowerCase().includes(normalized)) && (!category || job.category === category);
  }), [category, jobs, keyword]);

  return <section aria-labelledby="open-jobs-heading">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><h2 id="open-jobs-heading" className="text-2xl font-extrabold tracking-[-0.04em] text-[#0D3B2E]">Việc làm đang tuyển</h2><p className="mt-2 text-sm text-[#6B8679]">Tìm vị trí phù hợp trong đội ngũ hiện tại.</p></div>
      <p className="text-sm font-semibold text-[#0D3B2E]" role="status" aria-live="polite">{visibleJobs.length} vị trí</p>
    </div>
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]">
      <label className="relative block"><span className="sr-only">Tìm vị trí</span><LuSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B8679]" /><input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Tìm theo tên vị trí hoặc địa điểm" className="h-12 w-full rounded-xl border border-[#CFE0D5] bg-white pl-11 pr-4 text-sm text-[#0D3B2E] outline-none focus:border-[#28C76F] focus:ring-2 focus:ring-[#28C76F]/20" /></label>
      <label><span className="sr-only">Lọc theo phòng ban</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 w-full rounded-xl border border-[#CFE0D5] bg-white px-4 text-sm text-[#0D3B2E] outline-none focus:border-[#28C76F] focus:ring-2 focus:ring-[#28C76F]/20"><option value="">Tất cả phòng ban</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
    </div>
    {visibleJobs.length ? <div className="mt-6 grid grid-cols-1 gap-4">{visibleJobs.map((job) => <JobCardItem key={job.id} job={job} lng={lng} viewMode="list" />)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-[#B9D4C2] bg-[#F3FAF5] p-10 text-center"><p className="font-bold text-[#0D3B2E]">Không có vị trí phù hợp</p><p className="mt-2 text-sm text-[#6B8679]">Thử từ khóa hoặc phòng ban khác.</p></div>}
  </section>;
}
