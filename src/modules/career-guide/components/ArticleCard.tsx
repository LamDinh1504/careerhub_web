import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import type { CareerArticle } from "../types";

export function ArticleCard({ article, lng = "vi" }: { article: CareerArticle; lng?: string }) {
  return <article className="group overflow-hidden rounded-2xl border border-[#DCE9E0] bg-white shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-[#B5D8C1] hover:shadow-md"><Link href={`/${lng}/career-guide/${article.slug}`} className="block"><div className="relative aspect-[16/10] overflow-hidden bg-[#EAF5ED]"><Image src={article.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div><div className="p-5 sm:p-6"><p className="text-xs font-bold text-[#18794E]">{article.category}</p><h3 className="mt-3 line-clamp-2 text-xl font-extrabold leading-snug tracking-[-0.035em] text-[#0D3B2E] transition-colors group-hover:text-[#18794E]">{article.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6B8679]">{article.excerpt}</p><div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E6EFE9] pt-4 text-xs font-semibold text-[#6B8679]"><span>{article.updatedAt}</span><span className="inline-flex items-center gap-1 text-[#0D3B2E]">Đọc tiếp <LuArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div></div></Link></article>;
}
