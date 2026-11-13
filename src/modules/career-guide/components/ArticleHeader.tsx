"use client";

import Image from "next/image";
import { useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { LuCheck, LuClock3, LuCopy } from "react-icons/lu";
import type { CareerArticle } from "../types";

export function ArticleHeader({ article }: { article: CareerArticle }) {
  const [copied, setCopied] = useState(false);
  async function copyLink() { await navigator.clipboard?.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  return <header><p className="text-sm font-bold text-[#18794E]">{article.category}</p><h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] text-[#0D3B2E] sm:text-6xl">{article.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[#526D60]">{article.excerpt}</p><div className="mt-8 flex flex-col gap-5 border-y border-[#DCE9E0] py-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><Image src={article.author.avatar} alt={article.author.name} width={42} height={42} className="h-11 w-11 rounded-full border border-[#DCE9E0] object-cover" /><div><p className="text-sm font-bold text-[#0D3B2E]">{article.author.name}</p><p className="mt-0.5 text-xs text-[#6B8679]">{article.author.role} · {article.publishedAt}</p></div><span className="hidden h-5 w-px bg-[#DCE9E0] sm:block" aria-hidden="true" /><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B8679]"><LuClock3 aria-hidden="true" className="h-4 w-4" />{article.readTime}</span></div><div className="flex items-center gap-2" aria-label="Chia sẻ bài viết"><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Chia sẻ Facebook" className="grid h-10 w-10 place-items-center rounded-lg border border-[#DCE9E0] text-[#0D3B2E] hover:bg-[#EAF8EF]"><FaFacebookF aria-hidden="true" className="h-4 w-4" /></a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Chia sẻ LinkedIn" className="grid h-10 w-10 place-items-center rounded-lg border border-[#DCE9E0] text-[#0D3B2E] hover:bg-[#EAF8EF]"><FaLinkedinIn aria-hidden="true" className="h-4 w-4" /></a><button type="button" onClick={copyLink} aria-label="Sao chép đường dẫn" className="grid h-10 w-10 place-items-center rounded-lg border border-[#DCE9E0] text-[#0D3B2E] hover:bg-[#EAF8EF]">{copied ? <LuCheck aria-hidden="true" className="h-4 w-4 text-[#18794E]" /> : <LuCopy aria-hidden="true" className="h-4 w-4" />}</button></div></div></header>;
}
