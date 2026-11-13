import Image from "next/image";
import type { CareerArticle } from "../types";

export function ArticleContent({ article }: { article: CareerArticle }) {
  return <div className="prose-career max-w-none"><div className="relative mb-10 overflow-hidden rounded-2xl bg-[#EAF5ED]"><Image src={article.image} alt="" width={1000} height={560} className="h-auto max-h-[500px] w-full object-cover" /></div>{article.sections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-28"><h2 className="mt-10 text-2xl font-extrabold tracking-[-0.035em] text-[#0D3B2E] sm:text-3xl">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-8 text-[#3F584C]">{paragraph}</p>)}{section.quote && <blockquote className="my-8 rounded-r-2xl border-l-4 border-[#28C76F] bg-[#EAF8EF] px-5 py-4 text-lg font-bold leading-8 text-[#0D3B2E]">{section.quote}</blockquote>}{section.bullets && <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-[#3F584C]">{section.bullets.map((bullet) => <li key={bullet} className="pl-2 marker:text-[#28C76F]">{bullet}</li>)}</ul>}</section>)}</div>;
}
