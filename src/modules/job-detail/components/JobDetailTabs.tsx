"use client";

import React from "react";
import {
  LuFileText,
  LuBuilding2,
  LuBriefcase,
} from "react-icons/lu";

export type DetailTabType = "details" | "company" | "similar";

interface JobDetailTabsProps {
  activeTab: DetailTabType;
  onChangeTab: (tab: DetailTabType) => void;
}

export const JobDetailTabs: React.FC<JobDetailTabsProps> = ({
  activeTab,
  onChangeTab,
}) => {
  const tabs: { id: DetailTabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "details",
      label: "Chi tiết công việc",
      icon: <LuFileText className="w-4 h-4" />,
    },
    {
      id: "company",
      label: "Về công ty",
      icon: <LuBuilding2 className="w-4 h-4" />,
    },
    {
      id: "similar",
      label: "Việc làm khác",
      icon: <LuBriefcase className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-2 sm:p-2.5 shadow-sm mb-6 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-[#28C76F] text-white shadow-md shadow-green-500/25"
                  : "text-gray-600 hover:text-[#28C76F] hover:bg-emerald-50/60"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
