"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import { CAREER_GUIDES_DATA } from "../data";

interface CareerGuidesSectionProps {
  lng?: string;
}

export const CareerGuidesSection: React.FC<CareerGuidesSectionProps> = ({
  lng = "vi",
}) => {
  return (
    <section id="resources" className="bg-[#F8FAFC] py-16 sm:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1112]">
              Hành trang cho sự nghiệp
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Góc nhìn mới để bạn tự tin hơn ở mỗi bước đi.
            </p>
          </div>

          <Link
            href={`/${lng}/blog`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#16C759] hover:text-[#14B34F] transition-colors group cursor-pointer shrink-0"
          >
            <span>Khám phá cẩm nang</span>
            <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Guide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CAREER_GUIDES_DATA.map((article) => (
            <Link
              key={article.id}
              href={`/${lng}/blog/${article.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-green-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Article Image with Hover Zoom */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Category Tag */}
                  <span className="text-xs font-bold tracking-wider text-[#16C759] uppercase">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 text-base sm:text-lg font-bold text-[#0F1112] group-hover:text-[#16C759] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 flex items-center justify-between text-xs border-t border-gray-100">
                <span className="text-gray-400">{article.readTime}</span>
                <span className="font-bold text-[#16C759] group-hover:text-[#14B34F] transition-colors flex items-center gap-1">
                  Đọc tiếp
                  <LuArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
