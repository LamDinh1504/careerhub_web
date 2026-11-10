"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function Header() {
  const { locale, locales, setLocale } = useLanguage();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChangeLocale = (nextLocale: (typeof locales)[number]["code"]) => {
    setLocale(nextLocale);
    setIsLangOpen(false);
  };

  const currentLocaleLabel =
    locales.find((item) => item.code === locale)?.label ?? locale;

  const navItems = [
    { label: "Trang chủ", href: `/${locale}` },
    { label: "Việc làm", href: `/${locale}/#jobs` },
    { label: "Công ty", href: `/${locale}/#companies` },
    { label: "Cộng đồng", href: `/${locale}/#community` },
    { label: "Cẩm nang", href: `/${locale}/#resources` },
  ];

  return (
    <header
      className={`fixed left-0 top-0 right-0 z-50 transition-all duration-200 bg-white ${
        isScrolled
          ? "border-b border-gray-200/80 shadow-xs py-2.5"
          : "border-b border-gray-100 py-3"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href={`/${locale}`} className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16C759] text-white shadow-sm transition-transform group-hover:scale-105">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#16C759]">
              Career<span className="text-[#0F1112]">Hub</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
              VIỆC LÀM & TÀI NĂNG
            </span>
          </div>
        </Link>

        {/* Center Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[14px] font-medium text-gray-700 hover:text-[#16C759] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Language & Auth CTA */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/60 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-hidden"
            >
              <svg
                className="h-3.5 w-3.5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="uppercase">{currentLocaleLabel}</span>
              <svg
                className={`h-3 w-3 text-gray-400 transition-transform ${
                  isLangOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1.5 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg z-50"
                >
                  {locales.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleChangeLocale(item.code)}
                      type="button"
                      className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-xs transition-colors ${
                        item.code === locale
                          ? "bg-green-50 font-semibold text-[#16C759]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.code === locale && (
                        <span className="text-[#16C759] font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1 pr-3 hover:bg-gray-100 transition"
              >
                <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#16C759] text-xs font-bold text-white">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.fullName || ""}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span>
                      {(user.fullName || user.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-800 max-w-[100px] truncate">
                  {user.fullName || user.email}
                </span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl z-50"
                  >
                    <div className="border-b border-gray-100 px-4 py-2.5">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {user.fullName || "User"}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-[#16C759] transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-[#0F1112] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800 active:scale-95"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-gray-700 hover:text-[#16C759]"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
