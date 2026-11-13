import Image from "next/image";
import Link from "next/link";
import { LuCircleCheck, LuHeartOff, LuMapPin, LuSend, LuWallet } from "react-icons/lu";
import type { SavedJobCardProps } from "../types";

export function SavedJobCard({ job, onApply, onRemove, lng }: SavedJobCardProps) {
  return (
    <article className="rounded-2xl border border-[#e1eee4] bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex gap-4">
        <Link href={`/${lng}/jobs/${job.id}`} className="shrink-0" aria-label={`Xem ${job.title}`}>
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#e4eee6] bg-[#f3faf5]">
            <Image src={job.companyLogo} alt={`${job.company} logo`} width={44} height={44} className="h-11 w-11 object-contain" />
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Link href={`/${lng}/jobs/${job.id}`} className="line-clamp-2 text-base font-extrabold text-[#0d3b2e] transition hover:text-[#179653] sm:text-lg">
                {job.title}
              </Link>
              <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#6b8679]">
                {job.company} {job.verified ? <LuCircleCheck className="h-4 w-4 text-[#28c76f]" /> : null}
              </p>
            </div>
            <button type="button" onClick={() => onRemove(job.id)} className="rounded-xl p-2 text-[#6b8679] transition hover:bg-[#fff4f1] hover:text-[#c76551]" aria-label={`Bỏ lưu ${job.title}`}>
              <LuHeartOff className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#6b8679]">
            <span className="inline-flex items-center gap-1"><LuMapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="inline-flex items-center gap-1"><LuWallet className="h-3.5 w-3.5" />{job.salary}</span>
            <span className="rounded-full bg-[#f3faf5] px-2.5 py-1 text-[#4e7160]">{job.workplaceType}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 border-t border-[#edf4ee] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#6b8679]">Đăng {job.postedAt} · {job.jobType}</p>
        <button type="button" onClick={() => onApply(job)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#28c76f] px-4 py-2.5 text-sm font-extrabold text-[#0d3b2e] transition hover:bg-[#20b863] focus:outline-none focus:ring-4 focus:ring-[#28c76f]/20">
          <LuSend className="h-4 w-4" /> Ứng tuyển ngay
        </button>
      </div>
    </article>
  );
}
