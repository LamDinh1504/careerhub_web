import { LuBuilding2, LuCalendarDays, LuGlobe, LuMapPin } from "react-icons/lu";
import type { CompanyDetail } from "../types";

export function CompanyOverview({ company }: { company: CompanyDetail }) {
  const facts = [
    { label: "Năm thành lập", value: String(company.foundedYear), icon: LuCalendarDays },
    { label: "Quy mô", value: company.size, icon: LuBuilding2 },
    { label: "Quốc gia", value: "Việt Nam", icon: LuGlobe },
    { label: "Trụ sở", value: company.address, icon: LuMapPin },
  ];
  return <div className="space-y-8">
    <section className="rounded-2xl border border-[#DCE9E0] bg-white p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#0D3B2E]">Giới thiệu {company.name}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#526D60]">{company.description}</p>
      <h3 className="mt-8 text-lg font-bold text-[#0D3B2E]">Câu chuyện phát triển</h3>
      <p className="mt-3 max-w-3xl text-base leading-8 text-[#526D60]">{company.culture}</p>
    </section>
    <section aria-labelledby="company-facts-heading">
      <h2 id="company-facts-heading" className="text-2xl font-extrabold tracking-[-0.04em] text-[#0D3B2E]">Thông tin nhanh</h2>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {facts.map(({ label, value, icon: Icon }) => <div key={label} className="flex min-h-24 items-start gap-3 rounded-2xl border border-[#DCE9E0] bg-white p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8EF] text-[#28C76F]"><Icon aria-hidden="true" className="h-5 w-5" /></span>
          <div><p className="text-xs font-semibold text-[#6B8679]">{label}</p><p className="mt-1 text-sm font-bold leading-6 text-[#0D3B2E]">{value}</p></div>
        </div>)}
      </div>
    </section>
  </div>;
}
