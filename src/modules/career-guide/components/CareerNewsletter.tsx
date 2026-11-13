"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { LuMail } from "react-icons/lu";

export function CareerNewsletter() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-16" aria-labelledby="newsletter-title"><div className="relative overflow-hidden rounded-[20px] bg-[#E4F2E8] p-7 sm:p-12"><div className="relative z-10 max-w-2xl"><p className="text-sm font-bold text-[#18794E]">Bản tin CareerHub</p><h2 id="newsletter-title" className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-[#0D3B2E] sm:text-4xl">Một email hữu ích mỗi tuần.</h2><p className="mt-4 max-w-xl text-base leading-7 text-[#526D60]">Nhận bài viết mới về CV, phỏng vấn và những kỹ năng giúp bạn làm việc tốt hơn.</p><form className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={submit}><label className="relative min-w-0 flex-1"><span className="sr-only">Email nhận bản tin</span><LuMail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B8679]" /><input required type="email" placeholder="email@cuaban.com" className="h-12 w-full rounded-xl border border-[#C5DCCB] bg-white pl-11 pr-4 text-sm text-[#0D3B2E] outline-none focus:border-[#28C76F] focus:ring-2 focus:ring-[#28C76F]/20" /></label><button type="submit" className="min-h-12 rounded-xl bg-[#28C76F] px-5 text-sm font-bold text-[#0D3B2E] transition hover:-translate-y-0.5 hover:bg-[#20B461]">{sent ? "Đã đăng ký" : "Đăng ký nhận tin"}</button></form>{sent && <p className="mt-3 text-sm font-semibold text-[#18794E]" role="status">Cảm ơn bạn. Bản tin tiếp theo sẽ đến sớm.</p>}</div><Image src="/home/newsletter-illustration.png" alt="" width={260} height={180} className="pointer-events-none absolute -bottom-2 right-3 hidden w-56 opacity-80 lg:block" /></div></section>;
}
