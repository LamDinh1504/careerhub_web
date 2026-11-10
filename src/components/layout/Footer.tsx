"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LuInfo,
  LuBriefcase,
  LuBuilding2,
  LuMail,
  LuSearch,
  LuFileText,
  LuBookmark,
  LuBookOpen,
  LuSquarePlus,
  LuUsers,
  LuLayers,
  LuHeadphones,
  LuPhone,
  LuMapPin,
} from "react-icons/lu";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-100 bg-[#F8FAFC] text-gray-600 pt-14 pb-8">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Column 1: Brand Info & Decorative Plant (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col justify-between lg:border-r lg:border-gray-200/80 lg:pr-6 pb-6 lg:pb-0">
            <div>
              <Link href="/" className="inline-block">
                <Image
                  src="/home/careerhub-logo.png"
                  alt="CareerHub"
                  width={160}
                  height={35}
                  priority
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
              <p className="mt-4 text-[13px] sm:text-sm text-gray-500 leading-relaxed max-w-[240px]">
                Nền tảng tuyển dụng giúp bạn tìm kiếm cơ hội nghề nghiệp phù hợp.
              </p>
            </div>

            {/* Decorative Potted Plant Illustration in Bottom-Left */}
            <div className="pt-6 select-none pointer-events-none">
              <svg
                viewBox="0 0 160 130"
                className="w-28 sm:w-32 h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Soft ground hill */}
                <ellipse cx="75" cy="120" rx="65" ry="12" fill="#DCFCE7" />
                {/* Back Leaves */}
                <path
                  d="M55 65 C 35 40, 18 45, 14 58 C 22 72, 42 75, 56 68 Z"
                  fill="#16C759"
                />
                <path
                  d="M55 65 C 32 55, 18 57, 16 58"
                  stroke="#15A84D"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Main Middle Tall Leaf */}
                <path
                  d="M68 58 C 60 22, 68 8, 74 4 C 82 12, 86 30, 72 58 Z"
                  fill="#22C55E"
                />
                <path
                  d="M68 58 C 71 30, 74 12, 74 5"
                  stroke="#16A34A"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Right Leaves */}
                <path
                  d="M72 60 C 90 32, 110 38, 115 48 C 110 65, 90 68, 74 64 Z"
                  fill="#16C759"
                />
                <path
                  d="M72 60 C 90 48, 106 48, 113 49"
                  stroke="#15A84D"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Lower Right Small Leaf */}
                <path
                  d="M70 70 C 92 65, 105 75, 108 85 C 95 90, 80 82, 68 76 Z"
                  fill="#22C55E"
                />
                {/* Pot Rim */}
                <rect x="42" y="80" width="66" height="7" rx="3.5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
                {/* Pot Body */}
                <path
                  d="M47 87 L 53 118 C 54 121, 57 123, 60 123 L 90 123 C 93 123, 96 121, 97 118 L 103 87 Z"
                  fill="#FFFFFF"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* Column 2: Về chúng tôi (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold text-[#0F1112] tracking-tight">
              Về chúng tôi
            </h4>
            <ul className="space-y-2.5 text-[13px] sm:text-sm">
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuInfo className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Giới thiệu</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuBriefcase className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Việc làm</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuBuilding2 className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Công ty</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuMail className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Liên hệ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ứng viên (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold text-[#0F1112] tracking-tight">
              Ứng viên
            </h4>
            <ul className="space-y-2.5 text-[13px] sm:text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuSearch className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Tìm việc</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cv-builder"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuFileText className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Tạo CV</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/saved-jobs"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuBookmark className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Việc làm đã lưu</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/career-guide"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuBookOpen className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Cẩm nang nghề nghiệp</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Nhà tuyển dụng (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold text-[#0F1112] tracking-tight">
              Nhà tuyển dụng
            </h4>
            <ul className="space-y-2.5 text-[13px] sm:text-sm">
              <li>
                <Link
                  href="/post-job"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuSquarePlus className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Đăng tuyển</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/candidates"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuUsers className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Tìm ứng viên</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuLayers className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Bảng giá</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="flex items-center gap-2.5 text-gray-600 hover:text-[#16C759] transition-colors"
                >
                  <LuHeadphones className="h-4 w-4 text-[#16C759] shrink-0" />
                  <span>Hỗ trợ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Liên hệ với chúng tôi (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-gray-200/80 lg:pl-6">
            <h4 className="text-sm sm:text-base font-bold text-[#0F1112] tracking-tight">
              Liên hệ với chúng tôi
            </h4>

            <div className="space-y-2.5 text-[13px] sm:text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                <LuMail className="h-4 w-4 text-[#16C759] shrink-0" />
                <a
                  href="mailto:support@careerhub.vn"
                  className="hover:text-[#16C759] transition-colors"
                >
                  support@careerhub.vn
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <LuPhone className="h-4 w-4 text-[#16C759] shrink-0" />
                <a
                  href="tel:19006868"
                  className="font-medium hover:text-[#16C759] transition-colors"
                >
                  1900 6868
                </a>
              </div>

              <div className="flex items-start gap-2.5 leading-snug">
                <LuMapPin className="h-4 w-4 text-[#16C759] shrink-0 mt-0.5" />
                <span className="text-gray-500">
                  Tầng 10, Tòa nhà CareerHub, Số 123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh.
                </span>
              </div>
            </div>

            {/* Social Icons Squircle Buttons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-[#16C759] hover:bg-[#16C759] hover:text-white transition-all shadow-2xs"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-[#16C759] hover:bg-[#16C759] hover:text-white transition-all shadow-2xs"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-[#16C759] hover:bg-[#16C759] hover:text-white transition-all shadow-2xs"
                aria-label="YouTube"
              >
                <FaYoutube className="h-4 w-4" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-[#16C759] hover:bg-[#16C759] hover:text-white transition-all shadow-2xs"
                aria-label="TikTok"
              >
                <FaTiktok className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom subtle copyright note */}
        <div className="mt-10 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CareerHub. Nền tảng tuyển dụng thông minh.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              Điều khoản sử dụng
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
