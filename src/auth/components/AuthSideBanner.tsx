"use client";

import React from "react";

interface AuthSideBannerProps {
  title?: string;
  subtitle?: string;
  bulletPoints?: string[];
}

export const AuthSideBanner: React.FC<AuthSideBannerProps> = ({
  title = "CareerHub",
  subtitle = "Tìm việc làm — kết nối doanh nghiệp — phát triển sự nghiệp.",
  bulletPoints = [
    "Khám phá hàng ngàn công việc chất lượng từ các công ty hàng đầu",
    "Ứng tuyển nhanh chóng & kết nối trực tiếp với nhà tuyển dụng",
    "Quản lý hồ sơ CV và theo dõi tiến trình phỏng vấn tiện lợi",
  ],
}) => {
  return (
    <div className="relative hidden lg:flex w-full lg:w-[48%] xl:w-[45%] flex-col justify-center px-10 xl:px-16 py-12 overflow-hidden bg-gradient-to-br from-[#22C55E] via-[#16C759] to-[#15A84D] text-white select-none shadow-inner">
      {/* Decorative concentric radar circles as seen in design reference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -left-24 top-1/2 -translate-y-1/2 w-[720px] h-[720px] opacity-25"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="350" cy="350" r="140" stroke="white" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="350" cy="350" r="230" stroke="white" strokeWidth="1.5" />
          <circle cx="350" cy="350" r="320" stroke="white" strokeWidth="1.2" />
          <circle cx="350" cy="350" r="410" stroke="white" strokeWidth="0.8" strokeDasharray="6 6" />
        </svg>

        {/* Soft glowing ambient light spots for extra brightness */}
        <div className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-white/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-0 w-96 h-96 rounded-full bg-green-200/25 blur-3xl pointer-events-none" />
      </div>

      {/* Main Content inside Left Banner */}
      <div className="relative z-10 max-w-lg space-y-7">
        {/* White circle icon with Brand letter C */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl shadow-green-900/10">
          <span className="text-3xl font-extrabold text-[#16C759]">C</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-xs">
            {title}
          </h2>
          <p className="text-white/95 text-[15px] leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Bullet points with clear white bullets */}
        <ul className="space-y-3.5 pt-2 text-[14px] xl:text-[15px] font-medium text-white">
          {bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-white shrink-0 shadow-xs" />
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Subtle Bottom Credit */}
      <div className="relative z-10 pt-12 mt-12 border-t border-white/20 text-[12px] text-white/80 flex items-center justify-between">
        <span>© {new Date().getFullYear()} CareerHub Platform</span>
        <span className="font-medium text-white">Phiên bản tuyển dụng 2.5</span>
      </div>
    </div>
  );
};
