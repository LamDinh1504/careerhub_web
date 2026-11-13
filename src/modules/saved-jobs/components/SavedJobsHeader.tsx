import { LuSearch, LuBookmark } from "react-icons/lu";

interface SavedJobsHeaderProps {
  count: number;
  search: string;
  onSearch: (value: string) => void;
}

export function SavedJobsHeader({ count, search, onSearch }: SavedJobsHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-[#dcebe0] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e6f7eb] px-3 py-1 text-xs font-semibold text-[#0d3b2e]">
          <LuBookmark className="h-3.5 w-3.5 text-[#28c76f]" />
          Không bỏ lỡ cơ hội phù hợp
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0d3b2e] sm:text-4xl">Việc làm đã lưu</h1>
        <p className="mt-2 text-sm text-[#6b8679]">Bạn đang lưu {count} công việc để xem lại khi sẵn sàng.</p>
      </div>
      <label className="relative block w-full sm:max-w-[310px]">
        <span className="sr-only">Tìm trong việc làm đã lưu</span>
        <LuSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b8679]" />
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Tìm vị trí, công ty..."
          className="h-12 w-full rounded-2xl border border-[#d8e8dc] bg-white pl-11 pr-4 text-sm text-[#0d3b2e] outline-none transition focus:border-[#28c76f] focus:ring-4 focus:ring-[#28c76f]/10"
        />
      </label>
    </header>
  );
}
