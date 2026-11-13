"use client";

import Image from "next/image";
import { useState } from "react";
import { LuCheck, LuGlobe, LuHeart, LuMapPin, LuShare2, LuUsers } from "react-icons/lu";
import type { CompanyDetail } from "../types";

export function CompanyCoverHeader({ company }: { company: CompanyDetail }) {
  const [following, setFollowing] = useState(false);
  const [shared, setShared] = useState(false);

  async function shareCompany() {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: company.name, text: `Cơ hội việc làm tại ${company.name}`, url: window.location.href });
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard?.writeText(window.location.href);
    }
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  }

  return (
    <section className="overflow-hidden rounded-[20px] border border-[#DCE9E0] bg-white shadow-[0_8px_30px_rgba(13,59,46,0.05)]" aria-labelledby="company-name">
      <div className="relative h-40 overflow-hidden bg-[#0D3B2E] sm:h-52">
        <Image src={company.banner} alt="" fill priority sizes="(max-width: 768px) 100vw, 1240px" className="object-cover opacity-80 mix-blend-screen" />
        <div className="absolute inset-0 bg-[#0D3B2E]/55" aria-hidden="true" />
        <div className="absolute bottom-5 left-5 text-white sm:bottom-7 sm:left-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">Hồ sơ nhà tuyển dụng</p>
          <p className="mt-1 text-sm text-white/90">Cập nhật từ CareerHub</p>
        </div>
      </div>
      <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[#DCE9E0] bg-white p-3 shadow-md sm:h-28 sm:w-28">
              <Image src={company.logo} alt={company.name} width={120} height={72} className="max-h-full w-auto object-contain" />
            </div>
            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 id="company-name" className="text-2xl font-extrabold tracking-[-0.04em] text-[#0D3B2E] sm:text-3xl">{company.name}</h1>
                {company.verified && <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F8EF] px-2 py-1 text-xs font-bold text-[#17884D]"><LuCheck aria-hidden="true" className="h-3.5 w-3.5" />Đã xác thực</span>}
              </div>
              <p className="mt-2 text-sm font-medium text-[#6B8679]">{company.industry}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2 sm:pb-1">
            <button type="button" onClick={() => setFollowing((value) => !value)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition active:translate-y-px ${following ? "border border-[#28C76F] bg-[#EAF8EF] text-[#0D3B2E]" : "bg-[#28C76F] text-white hover:bg-[#20B461]"}`} aria-pressed={following}>
              <LuHeart aria-hidden="true" className={`h-4 w-4 ${following ? "fill-[#28C76F] text-[#28C76F]" : ""}`} />{following ? "Đang theo dõi" : "Theo dõi công ty"}
            </button>
            <button type="button" onClick={shareCompany} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#CFE0D5] bg-white px-4 text-sm font-bold text-[#0D3B2E] transition hover:bg-[#F3FAF5] active:translate-y-px" aria-label="Chia sẻ công ty">
              <LuShare2 aria-hidden="true" className="h-4 w-4" />{shared ? "Đã sao chép" : "Chia sẻ"}
            </button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#E6EFE9] pt-5 text-sm text-[#526D60] sm:grid-cols-3">
          <span className="flex items-center gap-2"><LuUsers aria-hidden="true" className="h-4 w-4 text-[#28C76F]" />{company.size}</span>
          <span className="flex items-center gap-2"><LuMapPin aria-hidden="true" className="h-4 w-4 text-[#28C76F]" />{company.address}</span>
          <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-[#0D3B2E] underline-offset-4 hover:underline"><LuGlobe aria-hidden="true" className="h-4 w-4 text-[#28C76F]" />Website công ty</a>
        </div>
      </div>
    </section>
  );
}
