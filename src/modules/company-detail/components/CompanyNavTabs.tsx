import type { CompanyDetailTab } from "../types";

interface CompanyNavTabsProps {
  activeTab: CompanyDetailTab;
  jobCount: number;
  onChange: (tab: CompanyDetailTab) => void;
}

const tabs: Array<{ id: CompanyDetailTab; label: string }> = [
  { id: "overview", label: "Tổng quan" },
  { id: "jobs", label: "Việc làm đang tuyển" },
  { id: "culture", label: "Văn hóa & Đãi ngộ" },
  { id: "photos", label: "Hình ảnh" },
];

export function CompanyNavTabs({ activeTab, jobCount, onChange }: CompanyNavTabsProps) {
  return (
    <nav className="overflow-x-auto border-b border-[#DCE9E0]" aria-label="Các mục trong hồ sơ công ty">
      <div className="flex min-w-max gap-1">
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          return <button key={tab.id} type="button" onClick={() => onChange(tab.id)} aria-selected={active} role="tab" className={`relative min-h-14 whitespace-nowrap px-4 text-sm font-bold transition-colors sm:px-5 ${active ? "text-[#0D3B2E]" : "text-[#6B8679] hover:text-[#0D3B2E]"}`}>
            {tab.label}{tab.id === "jobs" ? ` (${jobCount})` : ""}
            {active && <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#28C76F]" aria-hidden="true" />}
          </button>;
        })}
      </div>
    </nav>
  );
}
