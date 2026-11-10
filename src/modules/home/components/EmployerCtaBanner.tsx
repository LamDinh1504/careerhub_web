"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface EmployerCtaBannerProps {
  lng?: string;
}

export const EmployerCtaBanner: React.FC<EmployerCtaBannerProps> = ({
  lng = "vi",
}) => {
  return (
    <section id="companies" className="bg-white py-16 sm:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-50 via-[#E8F8EE] to-green-50 border border-green-200/80 p-8 sm:p-12 lg:p-16 shadow-lg shadow-green-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              <span className="text-xs font-bold tracking-wider text-[#16C759] uppercase">
                DÀNH CHO NHÀ TUYỂN DỤNG
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F1112] leading-tight">
                Nhân tài phù hợp. <br />
                Đội ngũ vững mạnh.
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
                Kết nối với ứng viên tiềm năng và cùng xây dựng tương lai cho doanh nghiệp của bạn.
              </p>

              <div className="mt-7 flex flex-col items-start gap-3">
                <Link
                  href={`/${lng}/employer/post-job`}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-[#16C759] hover:bg-[#14B34F] text-white text-sm sm:text-base font-bold rounded-xl shadow-md shadow-green-500/25 transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  Đăng tuyển ngay
                </Link>

                <p className="text-xs text-gray-500">
                  Tìm đúng người. Đi đúng hướng.
                </p>
              </div>
            </div>

            {/* Right Illustration: Potted Plant */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/3] flex items-center justify-center select-none pointer-events-none">
                <Image
                  src="/home/cta-illustration.png"
                  alt="CareerHub Employer"
                  width={340}
                  height={260}
                  className="w-auto h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
