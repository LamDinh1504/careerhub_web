"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.includes("/login") ||
    pathname?.includes("/register") ||
    pathname?.includes("/forgot-password") ||
    pathname?.includes("/reset-password") ||
    pathname?.includes("/comfirm-email");

  return (
    <>
      <Header />
      <main className={`min-h-screen flex flex-col ${isAuthPage ? "pt-0" : "pt-20 sm:pt-24"}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default Layout;
