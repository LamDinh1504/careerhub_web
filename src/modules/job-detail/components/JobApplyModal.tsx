"use client";

import React, { useState, useRef } from "react";
import {
  LuX,
  LuCloudUpload,
  LuFileCheck,
  LuSend,
  LuTrash2,
} from "react-icons/lu";
import { toast } from "react-toastify";
import { JobDetail } from "../types";

interface JobApplyModalProps {
  job: JobDetail;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 5 * 1024 * 1024) {
        toast.error("File CV không được vượt quá 5MB");
        return;
      }
      setFile(selected);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }
    if (!file) {
      toast.error("Vui lòng đính kèm tệp CV của bạn!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `Nộp hồ sơ ứng tuyển vị trí ${job.title} thành công! Nhà tuyển dụng sẽ sớm liên hệ với bạn.`
      );
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-lg rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#F8FAF9]">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-[#0D3B2E]">
              Ứng tuyển vị trí
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs sm:max-w-md">
              {job.title} • {job.company}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <LuX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Họ và tên <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email liên hệ <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ungvien@example.com"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Số điện thoại <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912 345 678"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-800"
              />
            </div>
          </div>

          {/* Upload CV */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Đính kèm CV <span className="text-rose-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 hover:border-emerald-400 bg-gray-50/60 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#28C76F] flex items-center justify-center mb-2">
                  <LuCloudUpload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-gray-800">
                  Nhấn để tải lên CV của bạn
                </p>
                <p className="text-2xs text-gray-400 mt-0.5">
                  Định dạng hỗ trợ: PDF, DOC, DOCX (Dung lượng tối đa 5MB)
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <div className="flex items-center gap-2.5 min-w-0">
                  <LuFileCheck className="w-5 h-5 text-[#28C76F] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-2xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-rose-500 p-1 cursor-pointer"
                  title="Xóa tệp"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Thư giới thiệu (Không bắt buộc)
            </label>
            <textarea
              rows={3}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Giới thiệu ngắn gọn về kinh nghiệm, thế mạnh hoặc lý do bạn phù hợp với vị trí này..."
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-gray-800 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#28C76F] hover:bg-[#22b263] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-green-500/25 hover:shadow-lg hover:shadow-green-500/35 active:scale-[0.99] disabled:opacity-50"
            >
              <LuSend className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              <span>{isSubmitting ? "Đang gửi..." : "Gửi hồ sơ ứng tuyển"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
