import type { SavedJobsTab } from "../types";

interface SavedJobsTabsProps {
  tab: SavedJobsTab;
  savedCount: number;
  appliedCount: number;
  onChange: (tab: SavedJobsTab) => void;
}

export function SavedJobsTabs({ tab, savedCount, appliedCount, onChange }: SavedJobsTabsProps) {
  const items: Array<{ id: SavedJobsTab; label: string; count: number }> = [
    { id: "saved", label: "Việc làm đã lưu", count: savedCount },
    { id: "applied", label: "Việc đã ứng tuyển", count: appliedCount },
  ];

  return (
    <div className="mt-6 flex gap-6 overflow-x-auto border-b border-[#dcebe0]" role="tablist" aria-label="Quản lý việc làm">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={tab === item.id}
          onClick={() => onChange(item.id)}
          className={`relative whitespace-nowrap pb-3 text-sm font-bold transition ${tab === item.id ? "text-[#0d3b2e]" : "text-[#6b8679] hover:text-[#0d3b2e]"}`}
        >
          {item.label} <span className="ml-1 text-xs font-semibold">({item.count})</span>
          <span className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#28c76f] transition ${tab === item.id ? "opacity-100" : "opacity-0"}`} />
        </button>
      ))}
    </div>
  );
}
