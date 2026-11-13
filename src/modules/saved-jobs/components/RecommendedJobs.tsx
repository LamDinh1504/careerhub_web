import Image from "next/image";
import Link from "next/link";
import { LuBookmarkPlus, LuMapPin } from "react-icons/lu";
import type { Job } from "@/modules/jobs/types";

interface RecommendedJobsProps { jobs: Job[]; lng: string; onSave: (jobId: string) => void; }

export function RecommendedJobs({ jobs, lng, onSave }: RecommendedJobsProps) {
  return (
    <section className="rounded-2xl border border-[#e1eee4] bg-white p-5 shadow-2xs">
      <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#28a95d]">Gợi ý cho bạn</p><h2 className="mt-1 text-lg font-extrabold text-[#0d3b2e]">Có thể bạn sẽ thích</h2></div>
      <div className="mt-5 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="flex gap-3 border-b border-[#edf4ee] pb-4 last:border-0 last:pb-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f3faf5]"><Image src={job.companyLogo} alt="" width={30} height={30} className="h-7 w-7 object-contain" /></div>
            <div className="min-w-0 flex-1"><Link href={`/${lng}/jobs/${job.id}`} className="line-clamp-2 text-sm font-bold text-[#0d3b2e] hover:text-[#179653]">{job.title}</Link><p className="mt-1 truncate text-xs text-[#6b8679]">{job.company}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-[#6b8679]"><LuMapPin className="h-3 w-3" />{job.location}</p></div>
            <button type="button" onClick={() => onSave(job.id)} className="h-fit rounded-lg p-1.5 text-[#6b8679] transition hover:bg-[#e6f7eb] hover:text-[#179653]" aria-label={`Lưu ${job.title}`}><LuBookmarkPlus className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </section>
  );
}
