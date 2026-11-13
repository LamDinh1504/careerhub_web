import { LuArrowDown, LuSearch } from "react-icons/lu";
import { CAREER_CATEGORIES } from "../data";
import type { CareerCategory } from "../types";

interface CareerHeroProps {
  keyword: string;
  category: CareerCategory;
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: CareerCategory) => void;
  onSearch: () => void;
}

export function CareerHero({ keyword, category, onKeywordChange, onCategoryChange, onSearch }: CareerHeroProps) {
  return <section className="relative overflow-hidden bg-[#F3FAF5]" aria-labelledby="career-guide-title" data-enter>
    <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-sm font-bold text-[#18794E]"><span className="h-2 w-2 rounded-full bg-[#28C76F]" aria-hidden="true" />CareerHub Editorial</p>
        <h1 id="career-guide-title" className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] text-[#0D3B2E] sm:text-6xl">Cẩm nang nghề nghiệp <span className="text-[#28C76F]">&</span> Bí quyết phát triển</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#526D60] sm:text-lg">Những hướng dẫn thực tế để bạn viết tốt hơn, phỏng vấn tự tin hơn và chọn bước tiến tiếp theo có cơ sở.</p>
      </div>
      <form className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row" onSubmit={(event) => { event.preventDefault(); onSearch(); }} role="search">
        <label className="relative block min-w-0 flex-1"><span className="sr-only">Tìm bài viết</span><LuSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B8679]" /><input value={keyword} onChange={(event) => onKeywordChange(event.target.value)} type="search" placeholder="Tìm bài viết về CV, phỏng vấn, kỹ thuật..." className="h-14 w-full rounded-xl border border-[#CFE0D5] bg-white pl-12 pr-4 text-base text-[#0D3B2E] shadow-2xs outline-none placeholder:text-[#789083] focus:border-[#28C76F] focus:ring-2 focus:ring-[#28C76F]/20" /></label><button type="submit" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#0D3B2E] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#145440] active:translate-y-px"><LuSearch aria-hidden="true" className="h-4 w-4" />Tìm bài viết</button>
      </form>
      <div className="mt-8 flex flex-wrap items-center gap-2" aria-label="Chủ đề bài viết">
        {CAREER_CATEGORIES.map((item) => <button key={item} type="button" onClick={() => onCategoryChange(item)} aria-pressed={category === item} className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${category === item ? "border-[#0D3B2E] bg-[#0D3B2E] text-white" : "border-[#CFE0D5] bg-white text-[#526D60] hover:border-[#28C76F] hover:text-[#0D3B2E]"}`}>{item}</button>)}
      </div>
      <a href="#career-articles" className="mt-12 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0D3B2E] underline-offset-4 hover:underline">Xem bài viết mới nhất <LuArrowDown aria-hidden="true" className="h-4 w-4" /></a>
    </div>
  </section>;
}
