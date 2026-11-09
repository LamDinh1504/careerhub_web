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
      <main className="min-h-screen pt-16 flex flex-col">{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default Layout;
