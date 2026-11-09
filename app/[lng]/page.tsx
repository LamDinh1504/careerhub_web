"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const TELEMETRY_METRICS = [
  { id: "1", label: "VIỆC LÀM ĐANG MỞ", value: "5,420+" },
  { id: "2", label: "DOANH NGHIỆP UY TÍN", value: "850+" },
  { id: "3", label: "TỶ LỆ PHẢN HỒI", value: "98.5%" },
];

const POPULAR_DOMAINS = [
  "Frontend",
  "Backend",
  "Fullstack",
  "DevOps / Cloud",
  "AI & Data Science",
  "Mobile App",
];

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-12 shadow-xl shadow-gray-200/50">
          {/* Top Status */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16C759] font-bold text-white shadow-xs">
                C
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#16C759]">
                  Career<span className="text-[#0F1112]">Hub</span>
                </span>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider">
                  NỀN TẢNG TUYỂN DỤNG & VIỆC LÀM
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-[#14B34F]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16C759] animate-pulse" />
              {isAuthenticated ? "ĐÃ ĐĂNG NHẬP" : "TRẠNG THÁI: SẴN SÀNG"}
            </span>
          </div>

          {/* Main Content */}
          <div className="pt-6">
            {isAuthenticated && user ? (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#0F1112]">
                    Xin chào, {user.fullName || user.email}
                  </h1>
                  <p className="mt-1 text-[13px] text-gray-500">
                    Hồ sơ và thông tin tuyển dụng của bạn đang hoạt động trên hệ thống CareerHub.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      THÔNG TIN TÀI KHOẢN
                    </span>
                    <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-[#14B34F] uppercase">
                      VAI TRÒ: {user.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl border border-gray-100 bg-white p-3.5">
                      <span className="block text-[11px] text-gray-400 uppercase font-medium">
                        EMAIL
                      </span>
                      <span className="text-[14px] font-medium text-gray-900 break-all">
                        {user.email}
                      </span>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-3.5">
                      <span className="block text-[11px] text-gray-400 uppercase font-medium">
                        MÃ ĐỊNH DANH
                      </span>
                      <span className="text-[14px] font-medium text-gray-900">
                        USR-{user.id || "001"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => logout()}
                  className="w-full rounded-xl border border-red-200 bg-white py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Đăng xuất tài khoản
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1112]">
                    Nền tảng Tuyển dụng & Kết nối Việc làm
                  </h1>
                  <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                    Kết nối trực tiếp giữa ứng viên tài năng và các doanh nghiệp công nghệ hàng đầu.
                    Minh bạch mức lương, phản hồi phỏng vấn nhanh chóng.
                  </p>
                </div>

                {/* Telemetry snippet */}
                <div className="grid grid-cols-3 gap-3">
                  {TELEMETRY_METRICS.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-gray-100 bg-[#F8FAFC] p-3.5 text-center"
                    >
                      <div className="text-[10px] uppercase font-semibold tracking-wider text-gray-500">
                        {item.label}
                      </div>
                      <div className="mt-1 text-lg font-bold text-[#16C759]">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech tags preview */}
                <div>
                  <div className="text-xs uppercase font-semibold text-gray-500 mb-2">
                    LĨNH VỰC HÀNG ĐẦU
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_DOMAINS.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-700 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Link href="/login" className="w-full">
                    <button className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs">
                      Đăng nhập
                    </button>
                  </Link>

                  <Link href="/register" className="w-full">
                    <button className="w-full rounded-xl bg-[#16C759] py-3 text-sm font-semibold text-white hover:bg-[#14B34F] transition-colors shadow-md shadow-green-500/20">
                      Tạo tài khoản ngay
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
