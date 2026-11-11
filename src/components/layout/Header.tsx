"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { HiMenu, HiX } from "react-icons/hi";
import { FiGlobe, FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
  const { locale, locales, setLocale } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const isUserLoggedIn = Boolean(isAuthenticated && user);
  const displayName = user?.fullName || user?.email || "";
  const displayEmail = user?.email || "";
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChangeLocale = (nextLocale: (typeof locales)[number]["code"]) => {
    setLocale(nextLocale);
    setIsLangOpen(false);
  };

  const getLocalizedPath = (path: string) => {
    if (locale === "vi") return path;
    return `/${locale}${path === "/" ? "" : path}`;
  };

  const navLinks = [
    {
      path: "/",
      label: locale === "vi" ? "Trang chủ" : "Home",
      matchExact: true,
    },
    {
      path: "/jobs",
      label: locale === "vi" ? "Việc làm" : "Jobs",
    },
    {
      path: "/#companies",
      label: locale === "vi" ? "Công ty" : "Companies",
    },
    {
      path: "/#resources",
      label: locale === "vi" ? "Cẩm nang" : "Resources",
    },
  ];

  const isLinkActive = (path: string, matchExact?: boolean) => {
    if (!pathname) return false;
    const normalizedPathname = pathname.replace(/^\/(vi|en)(\/|$)/, "/").replace(/\/$/, "") || "/";
    const normalizedTarget = path.replace(/\/$/, "") || "/";

    if (matchExact || normalizedTarget === "/") {
      return normalizedPathname === "/";
    }
    return (
      normalizedPathname === normalizedTarget ||
      normalizedPathname.startsWith(`${normalizedTarget}/`)
    );
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-6 w-full max-w-[1340px] mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-[16px] border border-[#0D3B2E]/10 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-sm">
        {/* Left: Brand Logo */}
        <Link
          href={getLocalizedPath("/")}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <Image
            src="/home/careerhub-logo.png"
            alt="CareerHub"
            width={155}
            height={34}
            priority
            className="h-8 sm:h-8.5 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path, link.matchExact);
            return (
              <Link
                key={link.path}
                href={getLocalizedPath(link.path)}
                className={`text-xs sm:text-sm font-semibold whitespace-nowrap px-3.5 py-2 rounded-[10px] transition-colors flex items-center gap-1.5 ${
                  active
                    ? "bg-[#0D3B2E] text-white shadow-sm"
                    : "text-[#6B8679] hover:text-[#0D3B2E] hover:bg-[#F3FAF5]"
                }`}
              >
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] shrink-0" />
                )}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Language & User */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Language Switcher */}
          <div className="relative hidden sm:block" ref={langMenuRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              type="button"
              className="flex h-8 items-center gap-1.5 rounded-[8px] border border-[#0D3B2E]/10 bg-[#F3FAF5] hover:bg-slate-100 px-2.5 text-xs font-semibold text-[#0D3B2E] transition-colors whitespace-nowrap cursor-pointer"
              title="Change Language"
            >
              <FiGlobe className="w-3.5 h-3.5 text-[#6B8679]" />
              <span className="uppercase">{locale}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-[12px] border border-slate-200 bg-white p-1.5 z-50 shadow-xl">
                {locales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => handleChangeLocale(loc.code)}
                    className={`w-full rounded-[8px] px-3 py-1.5 text-left text-xs font-medium transition-colors cursor-pointer ${
                      locale === loc.code
                        ? "bg-[#F3FAF5] text-[#0D3B2E] font-bold"
                        : "text-[#6B8679] hover:bg-[#F3FAF5] hover:text-[#0D3B2E]"
                    }`}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher Dropdown */}
          {isUserLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 rounded-[10px] border border-[#0D3B2E]/10 bg-[#F3FAF5] hover:bg-slate-100 px-3 py-1.5 text-sm text-[#0D3B2E] transition-colors whitespace-nowrap cursor-pointer"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#0D3B2E] text-white font-bold text-xs uppercase">
                  {displayName ? displayName.charAt(0) : "U"}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-bold text-xs text-[#0D3B2E] max-w-[130px] truncate leading-tight">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-[#28C76F] font-bold uppercase">
                    {user?.role || "Ứng viên"}
                  </span>
                </div>
                <svg
                  className={`w-3.5 h-3.5 text-[#6B8679] transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2.5 z-50 shadow-2xl text-xs space-y-1.5">
                  <div className="p-2.5 bg-[#F3FAF5] rounded-xl space-y-0.5">
                    <span className="font-bold text-slate-800 truncate block">{displayName}</span>
                    {displayEmail && <p className="text-[11px] text-slate-500 truncate">{displayEmail}</p>}
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4 text-rose-500" />
                    <span>{locale === "vi" ? "Đăng xuất" : "Sign Out"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href={`/${locale}/login`}
                className="rounded-[8px] border border-[#0D3B2E]/15 bg-white hover:bg-[#F3FAF5] px-3.5 py-1.5 text-xs font-bold text-[#0D3B2E] transition-colors"
              >
                {locale === "vi" ? "Đăng nhập" : "Sign In"}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="rounded-[8px] bg-[#0D3B2E] text-white hover:bg-[#155d49] px-3.5 py-1.5 text-xs font-bold shadow-sm transition-colors"
              >
                {locale === "vi" ? "Đăng ký" : "Sign Up"}
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-[8px] p-2 text-[#0D3B2E] hover:bg-[#F3FAF5] transition-colors lg:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6 text-[#0D3B2E]" />
            ) : (
              <HiMenu className="h-6 w-6 text-[#0D3B2E]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mt-2 rounded-[16px] border border-[#0D3B2E]/10 bg-white p-5 lg:hidden shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path, link.matchExact);
              return (
                <Link
                  key={link.path}
                  href={getLocalizedPath(link.path)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-semibold transition-colors px-4 py-2.5 rounded-[10px] flex items-center justify-between ${
                    active
                      ? "bg-[#0D3B2E] text-white font-bold"
                      : "text-[#6B8679] hover:bg-[#F3FAF5] hover:text-[#0D3B2E]"
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F] shrink-0" />
                  )}
                </Link>
              );
            })}

            {!isUserLoggedIn && (
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold text-[#0D3B2E] bg-[#F3FAF5] hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {locale === "vi" ? "Đăng nhập" : "Sign In"}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#0D3B2E] hover:bg-[#155d49] rounded-xl transition-colors shadow-sm"
                >
                  {locale === "vi" ? "Đăng ký tài khoản" : "Create Account"}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
