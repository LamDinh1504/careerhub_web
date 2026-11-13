import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuClock3 } from "react-icons/lu";
import type { CareerArticle } from "../types";

export function FeaturedArticle({ article, lng = "vi" }: { article: CareerArticle; lng?: string }) {
  return <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-16" aria-labelledby="featured-article-title">
    <div className="grid overflow-hidden rounded-[20px] bg-[#0D3B2E] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-[280px] overflow-hidden bg-[#174C3C] lg:order-2 lg:min-h-[500px]"><Image src={article.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-85 transition duration-700 hover:scale-[1.03]" /></div>
      <div className="flex flex-col justify-center p-7 text-white sm:p-12 lg:order-1 lg:p-16"><span className="w-fit rounded-full bg-[#28C76F] px-3 py-1.5 text-xs font-bold text-[#0D3B2E]">Bài viết tiêu điểm</span><p className="mt-7 text-sm font-semibold text-[#A9D9B8]">{article.category}</p><h2 id="featured-article-title" className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl">{article.title}</h2><p className="mt-5 max-w-xl text-base leading-7 text-[#D9EAE0]">{article.excerpt}</p><div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#B7D2C1]"><span>{article.author.name}</span><span aria-hidden="true">·</span><span>{article.publishedAt}</span><span aria-hidden="true">·</span><span className="inline-flex items-center gap-1.5"><LuClock3 aria-hidden="true" className="h-4 w-4" />{article.readTime}</span></div><Link href={`/${lng}/career-guide/${article.slug}`} className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#0D3B2E] transition hover:-translate-y-0.5 hover:bg-[#EAF8EF]">Đọc bài viết <LuArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
    </div>
  </section>;
}
