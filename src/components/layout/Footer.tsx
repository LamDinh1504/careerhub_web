"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-7xl px-4">
        <p>© {new Date().getFullYear()} CareerHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
