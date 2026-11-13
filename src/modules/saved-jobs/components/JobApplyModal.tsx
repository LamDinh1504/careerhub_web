"use client";

import { useState, type FormEvent } from "react";
import { LuSend, LuX } from "react-icons/lu";
import type { Job } from "@/modules/jobs/types";

export interface ApplicationFormValues { fullName: string; email: string; message: string; }
interface JobApplyModalProps { job: Job; onClose: () => void; onSubmit: (values: ApplicationFormValues) => void; }

export function JobApplyModal({ job, onClose, onSubmit }: JobApplyModalProps) {
  const [values, setValues] = useState<ApplicationFormValues>({ fullName: "", email: "", message: "" });
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit(values); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d3b2e]/35 p-4" role="dialog" aria-modal="true" aria-labelledby="apply-modal-title">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#28a95d]">Ứng tuyển nhanh</p><h2 id="apply-modal-title" className="mt-2 text-2xl font-extrabold text-[#0d3b2e]">{job.title}</h2><p className="mt-1 text-sm text-[#6b8679]">{job.company}</p></div><button type="button" onClick={onClose} className="rounded-xl p-2 text-[#6b8679] hover:bg-[#f3faf5]" aria-label="Đóng"><LuX className="h-5 w-5" /></button></div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-bold text-[#0d3b2e]">Họ và tên<input required value={values.fullName} onChange={(event) => setValues({ ...values, fullName: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#d8e8dc] px-3 text-sm font-normal outline-none focus:border-[#28c76f] focus:ring-4 focus:ring-[#28c76f]/10" placeholder="Nguyễn Văn A" /></label>
          <label className="block text-sm font-bold text-[#0d3b2e]">Email nhận liên hệ<input required type="email" value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} className="mt-2 h-11 w-full rounded-xl border border-[#d8e8dc] px-3 text-sm font-normal outline-none focus:border-[#28c76f] focus:ring-4 focus:ring-[#28c76f]/10" placeholder="you@email.com" /></label>
          <label className="block text-sm font-bold text-[#0d3b2e]">Lời nhắn <span className="font-normal text-[#6b8679]">(không bắt buộc)</span><textarea value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} rows={3} className="mt-2 w-full resize-none rounded-xl border border-[#d8e8dc] px-3 py-2 text-sm font-normal outline-none focus:border-[#28c76f] focus:ring-4 focus:ring-[#28c76f]/10" placeholder="Chia sẻ ngắn về kinh nghiệm của bạn..." /></label>
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#28c76f] px-4 py-3 text-sm font-extrabold text-[#0d3b2e] hover:bg-[#20b863]"><LuSend className="h-4 w-4" /> Gửi hồ sơ ứng tuyển</button>
        </form>
      </div>
    </div>
  );
}
