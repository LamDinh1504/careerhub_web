import Image from "next/image";
import Link from "next/link";
import type { SavedJobsTab } from "../types";

interface SavedEmptyStateProps { tab: SavedJobsTab; lng: string; }

export function SavedEmptyState({ tab, lng }: SavedEmptyStateProps) {
  const applied = tab === "applied";
  return (
    <div className="rounded-2xl border border-dashed border-[#cfe3d4] bg-white px-6 py-12 text-center shadow-2xs">
      <Image src="/home/empty-jobs.png" alt="Minh họa danh sách trống" width={180} height={132} className="mx-auto h-28 w-auto object-contain" />
      <h2 className="mt-5 text-xl font-extrabold text-[#0d3b2e]">{applied ? "Chưa có hồ sơ ứng tuyển" : "Danh sách việc làm đang trống"}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6b8679]">{applied ? "Khi bạn gửi hồ sơ, tiến độ tuyển dụng sẽ được cập nhật tại đây." : "Lưu lại những cơ hội yêu thích để so sánh và ứng tuyển đúng thời điểm."}</p>
      <Link href={`/${lng}/jobs`} className="mt-6 inline-flex rounded-xl bg-[#28c76f] px-5 py-3 text-sm font-extrabold text-[#0d3b2e] transition hover:bg-[#20b863]">Khám phá việc làm ngay</Link>
    </div>
  );
}
