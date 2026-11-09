"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useT } from "next-i18next/client";
import { motion } from "framer-motion";

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useT("common");

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <div className="rounded-2xl border border-gray-200/80 bg-white p-8 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md">
              C
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t("home.title", "Hệ thống Quản lý & Xác thực")}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "home.subtitle",
                "Khởi đầu cho đồ án mới của bạn với hệ thống xác thực (Auth) hoàn chỉnh."
              )}
            </p>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            {isAuthenticated && user ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-blue-50/70 p-5 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                        {t("home.authenticated", "Đã đăng nhập")}
                      </p>
                      <h2 className="mt-1 text-lg font-bold text-gray-900">
                        {user.fullName || user.email}
                      </h2>
                    </div>
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white uppercase">
                      {user.role}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <div className="rounded-lg bg-white p-3 border border-gray-100">
                      <span className="block text-xs text-gray-500">
                        {t("home.email", "Email")}
                      </span>
                      <span className="font-medium text-gray-800 break-all">
                        {user.email}
                      </span>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-gray-100">
                      <span className="block text-xs text-gray-500">
                        {t("home.role", "Vai trò")}
                      </span>
                      <span className="font-medium text-gray-800 uppercase">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => logout()}
                  className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  {t("home.logout", "Đăng xuất")}
                </button>
              </div>
            ) : (
              <div className="space-y-5 text-center">
                <div className="rounded-xl bg-gray-50 p-6 border border-gray-100">
                  <h2 className="text-base font-semibold text-gray-900">
                    {t("home.guestTitle", "Bạn chưa đăng nhập")}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {t(
                      "home.guestSubtitle",
                      "Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục."
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    {t("home.login", "Đăng nhập")}
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center rounded-xl border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 shadow-2xs transition hover:bg-gray-50"
                  >
                    {t("home.register", "Đăng ký")}
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
