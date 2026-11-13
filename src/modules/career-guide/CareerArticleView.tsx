"use client";

import { CAREER_ARTICLES } from "./data";
import type { CareerArticle } from "./types";
import { ArticleContent, ArticleHeader, CareerBreadcrumbs, CareerSidebar } from "./components";

export function CareerArticleView({ article, lng = "vi" }: { article: CareerArticle; lng?: string }) {
  const related = CAREER_ARTICLES.filter((item) => item.slug !== article.slug && item.category === article.category);
  return <div className="min-h-screen bg-[#F3FAF5] pb-16 text-[#0D3B2E]"><div className="mx-auto max-w-[1240px] px-4 pt-3 sm:px-6 sm:pt-5"><CareerBreadcrumbs lng={lng} category={article.category} title={article.title} /><div className="mt-6 rounded-[20px] border border-[#DCE9E0] bg-white p-6 sm:mt-8 sm:p-10 lg:p-14"><ArticleHeader article={article} /><div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_330px]"><main className="min-w-0"><ArticleContent article={article} /></main><CareerSidebar article={article} relatedArticles={related} lng={lng} /></div></div></div></div>;
}
