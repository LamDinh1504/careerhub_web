import { LuBookOpen, LuHeart, LuHouse, LuShieldCheck, LuSparkles, LuUsers } from "react-icons/lu";
import type { CompanyDetail } from "../types";

const icons = { heart: LuHeart, book: LuBookOpen, home: LuHouse, users: LuUsers, shield: LuShieldCheck, sparkles: LuSparkles };

export function CompanyPerks({ company }: { company: CompanyDetail }) {
  return <section aria-labelledby="company-perks-heading"><h2 id="company-perks-heading" className="text-2xl font-extrabold tracking-[-0.04em] text-[#0D3B2E]">Văn hóa & Đãi ngộ</h2><p className="mt-2 max-w-2xl text-sm leading-7 text-[#6B8679]">Những điều đội ngũ tại {company.name} cùng xây dựng mỗi ngày.</p><div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">{company.benefits.map((benefit) => { const Icon = icons[benefit.icon]; return <article key={benefit.title} className="rounded-2xl border border-[#DCE9E0] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#A9D4B8]"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF8EF] text-[#28C76F]"><Icon aria-hidden="true" className="h-5 w-5" /></span><h3 className="mt-4 text-base font-bold text-[#0D3B2E]">{benefit.title}</h3><p className="mt-2 text-sm leading-6 text-[#6B8679]">{benefit.description}</p></article>; })}</div></section>;
}
