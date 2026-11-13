import Image from "next/image";
import Link from "next/link";
import { LuCircleCheck, LuMapPin } from "react-icons/lu";
import type { Job } from "@/modules/jobs/types";
import type { ApplicationRecord, ApplicationStatus } from "../types";

interface AppliedJobCardProps { job: Job; application: ApplicationRecord; lng: string; }

const steps: Array<{ id: ApplicationStatus; label: string }> = [
  { id: "submitted", label: "Đã nộp hồ sơ" },
  { id: "viewed", label: "Đã xem" },
  { id: "interview", label: "Mời phỏng vấn" },
  { id: "fit", label: "Phù hợp" },
];

const rank: Record<ApplicationStatus, number> = { submitted: 0, viewed: 1, interview: 2, fit: 3, "not-fit": -1 };

export function AppliedJobCard({ job, application, lng }: AppliedJobCardProps) {
  const isNotFit = application.status === "not-fit";
  const currentRank = rank[application.status];
  return (
    <article className="rounded-2xl border border-[#e1eee4] bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex gap-4">
        <Link href={`/${lng}/jobs/${job.id}`} className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e4eee6] bg-[#f3faf5]">
          <Image src={job.companyLogo} alt={`${job.company} logo`} width={38} height={38} className="h-9 w-9 object-contain" />
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={`/${lng}/jobs/${job.id}`} className="line-clamp-2 text-base font-extrabold text-[#0d3b2e] hover:text-[#179653]">{job.title}</Link>
          <p className="mt-1 flex items-center gap-1 text-sm text-[#6b8679]">{job.company} {job.verified ? <LuCircleCheck className="h-4 w-4 text-[#28c76f]" /> : null}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#6b8679]"><LuMapPin className="h-3.5 w-3.5" />{job.location}</p>
        </div>
        <span className={`h-fit rounded-full px-3 py-1 text-xs font-bold ${isNotFit ? "bg-[#f1f3f2] text-[#6b8679]" : application.status === "interview" ? "bg-[#fff4df] text-[#a56b17]" : "bg-[#e6f7eb] text-[#23834b]"}`}>
          {isNotFit ? "Chưa phù hợp" : application.status === "interview" ? "Mời phỏng vấn" : "Đang xử lý"}
        </span>
      </div>
      <div className="mt-5 border-t border-[#edf4ee] pt-4">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step, index) => {
            const complete = !isNotFit && currentRank >= index;
            return <div key={step.id} className="min-w-0"><div className={`mb-2 h-1 rounded-full ${complete ? "bg-[#28c76f]" : "bg-[#e6eee8]"}`} /><p className={`text-[10px] leading-tight sm:text-xs ${complete ? "font-bold text-[#0d3b2e]" : "text-[#9aaca1]"}`}>{step.label}</p></div>;
          })}
        </div>
        <p className="mt-4 text-xs text-[#6b8679]">Đã ứng tuyển {application.appliedAt} · Cập nhật {application.updatedAt}</p>
      </div>
    </article>
  );
}
