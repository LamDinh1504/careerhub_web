"use client";

import { useMemo, useState } from "react";
import { CAREER_ARTICLES, CAREER_PAGE_SIZE, FEATURED_ARTICLE } from "./data";
import type { CareerCategory } from "./types";
import { ArticleGrid, CareerHero, CareerNewsletter, CareerPagination, FeaturedArticle } from "./components";

export function CareerGuideView({ lng = "vi" }: { lng?: string }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<CareerCategory>("Tất cả");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const query = keyword.trim().toLocaleLowerCase();
    return CAREER_ARTICLES.filter((article) => article.slug !== FEATURED_ARTICLE.slug && (category === "Tất cả" || article.category === category) && (!query || `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase().includes(query)));
  }, [category, keyword]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / CAREER_PAGE_SIZE));
  const visible = filtered.slice((page - 1) * CAREER_PAGE_SIZE, page * CAREER_PAGE_SIZE);
  function changeCategory(value: CareerCategory) { setCategory(value); setPage(1); }
  function search() { setPage(1); document.getElementById("career-articles")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  return <div className="min-h-screen bg-[#F3FAF5] text-[#0D3B2E]"><CareerHero keyword={keyword} category={category} onKeywordChange={setKeyword} onCategoryChange={changeCategory} onSearch={search} /><FeaturedArticle article={FEATURED_ARTICLE} lng={lng} /><section id="career-articles" className="scroll-mt-24 bg-white" aria-labelledby="career-articles-title"><div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold text-[#18794E]">Cẩm nang mới</p><h2 id="career-articles-title" className="mt-2 text-3xl font-extrabold tracking-[-0.045em] text-[#0D3B2E] sm:text-4xl">Bài viết dành cho bước tiếp theo</h2></div><p className="max-w-sm text-sm leading-6 text-[#6B8679]">{filtered.length} bài viết phù hợp với chủ đề bạn đang tìm.</p></div>{visible.length ? <><div className="mt-8"><ArticleGrid articles={visible} lng={lng} /></div><CareerPagination page={page} totalPages={totalPages} onChange={(value) => { setPage(value); document.getElementById("career-articles")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} /></> : <div className="mt-8 rounded-2xl border border-dashed border-[#B9D4C2] bg-[#F3FAF5] p-12 text-center"><h3 className="text-xl font-bold">Chưa tìm thấy bài viết</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B8679]">Thử một từ khóa khác hoặc chọn lại chủ đề để xem thêm hướng dẫn.</p><button type="button" onClick={() => { setKeyword(""); setCategory("Tất cả"); setPage(1); }} className="mt-5 min-h-11 rounded-xl bg-[#0D3B2E] px-5 text-sm font-bold text-white">Xóa bộ lọc</button></div>}</div></section><CareerNewsletter /></div>;
}
