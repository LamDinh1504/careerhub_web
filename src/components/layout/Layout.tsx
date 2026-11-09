import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { BackToTop } from "../ui";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Layout;
