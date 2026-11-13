"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { COMPANIES } from "@/modules/companies/data";
import { CompanyBreadcrumbs, CompanyCoverHeader, CompanyNavTabs, CompanyOpenJobs, CompanyOverview, CompanyPerks, CompanySidebar } from "./components";
import { getCompanyDetailById } from "./data";
import type { CompanyDetail, CompanyDetailTab } from "./types";

export function CompanyDetailView({ company, lng = "vi" }: { company: CompanyDetail; lng?: string }) {
  const [activeTab, setActiveTab] = useState<CompanyDetailTab>("overview");
  const similar = useMemo(() => COMPANIES
    .filter((item) => item.id !== company.id && item.categories.some((category) => category === company.industry))
    .slice(0, 3)
    .map((item) => getCompanyDetailById(item.id))
    .filter((item): item is CompanyDetail => item !== null), [company.id, company.industry]);

  return <div className="min-h-screen bg-[#F3FAF5] pb-16 text-[#0D3B2E]">
    <div className="mx-auto max-w-[1240px] px-4 pt-3 sm:px-6 sm:pt-5">
      <CompanyBreadcrumbs lng={lng} companyName={company.name} />
      <div className="mt-3 sm:mt-5"><CompanyCoverHeader company={company} /></div>
      <div className="mt-6"><CompanyNavTabs activeTab={activeTab} jobCount={company.openJobs.length} onChange={setActiveTab} /></div>
      <div className="mt-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
        <main className="min-w-0">
          {activeTab === "overview" && <CompanyOverview company={company} />}
          {activeTab === "jobs" && <CompanyOpenJobs jobs={company.openJobs} lng={lng} />}
          {activeTab === "culture" && <CompanyPerks company={company} />}
          {activeTab === "photos" && <section aria-labelledby="company-photos-heading"><h2 id="company-photos-heading" className="text-2xl font-extrabold tracking-[-0.04em] text-[#0D3B2E]">Hình ảnh công ty</h2><p className="mt-2 text-sm text-[#6B8679]">Một vài hình ảnh trong hệ sinh thái CareerHub.</p><div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">{company.photos.map((photo, index) => <div key={photo} className={`relative overflow-hidden rounded-2xl bg-[#E4F0E7] ${index === 0 ? "sm:col-span-2" : ""}`}><Image src={photo} alt={`${company.name} · không gian và đội ngũ`} width={900} height={520} className="h-64 w-full object-cover transition duration-500 hover:scale-[1.02] sm:h-80" /></div>)}</div></section>}
        </main>
        <CompanySidebar company={company} lng={lng} similar={similar} />
      </div>
    </div>
  </div>;
}
