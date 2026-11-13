"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LuCircleCheck,
  LuMapPin,
  LuGlobe,
  LuExternalLink,
  LuUsers,
  LuArrowRight,
} from "react-icons/lu";
import { CompanyInfo } from "../types";

interface CompanyInfoCardProps {
  company: CompanyInfo;
  lng?: string;
}

export const CompanyInfoCard: React.FC<CompanyInfoCardProps> = ({
  company,
  lng = "vi",
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm mb-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-5 rounded-full bg-[#28C76F] shrink-0" />
        <h3 className="text-base font-bold text-[#0D3B2E]">
          Thông tin công ty
        </h3>
      </div>

      {/* Company Header: Logo & Name */}
      <div className="flex items-center gap-3.5 mb-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#F8FAF9] border border-gray-100 p-1.5 flex items-center justify-center shrink-0">
          <Image
            src={company.logo}
            alt={company.name}
            width={40}
            height={40}
            className="max-h-9 max-w-[38px] w-auto h-auto object-contain"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-sm text-gray-900 truncate">
              {company.name}
            </h4>
            {company.verified && (
              <LuCircleCheck className="w-3.5 h-3.5 text-[#28C76F] shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">
            {company.industry} • {company.size}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {company.description}
      </p>

      {/* Meta details list */}
      <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3.5">
        <div className="flex items-center gap-2">
          <LuMapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{company.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <LuGlobe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#0D3B2E] hover:underline flex items-center gap-1 truncate"
          >
            <span className="truncate">{company.website}</span>
            <LuExternalLink className="w-3 h-3 shrink-0 text-gray-400" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <LuUsers className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{company.size}</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href={`/${lng}/companies`}
        className="mt-5 w-full bg-[#EBF7F0] hover:bg-[#28C76F] text-[#0D3B2E] hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:shadow-md hover:shadow-green-500/20 group cursor-pointer"
      >
        <span>Xem trang công ty</span>
        <LuArrowRight className="w-3.5 h-3.5 text-[#28C76F] group-hover:text-white transition-colors" />
      </Link>
    </div>
  );
};

