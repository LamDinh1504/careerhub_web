"use client";

import { useState } from "react";
import type React from "react";
import validator from "validator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authApi, getAuthErrorMessage } from "@/auth/auth-api";
import { AuthSideBanner } from "../components/AuthSideBanner";

type RoleType = "candidate" | "employer";

const RegisterForm = () => {
  const router = useRouter();

  const [roleType, setRoleType] = useState<RoleType>("candidate");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: "" };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8 && /[0-9]/.test(pass)) score++;
    if (/[A-Z]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;

    const text = ["Yếu", "Trung bình", "Khá mạnh", "Rất an toàn"][score] || "Trung bình";
    return { score, text };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!fullName.trim()) {
      toast.error("Vui lòng nhập họ và tên.");
      return;
    }

    if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    if (!validator.isLength(password, { min: 6 })) {
      toast.error("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }

    if (!validator.equals(password, confirmPassword)) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!termsAccepted) {
      toast.error("Vui lòng đồng ý với Điều khoản dịch vụ của CareerHub.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.register({
        email: normalizedEmail,
        password,
        fullName: fullName.trim(),
      });
      toast.success("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
      router.push("/login");
    } catch (error: unknown) {
      toast.error(
        getAuthErrorMessage(
          error,
          "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Tính năng đăng ký qua Google đang kết nối...");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex w-full bg-[#F8FAFC]">
      {/* Left Column: Bright Green Brand Banner */}
      <AuthSideBanner
        title="CareerHub"
        subtitle="Khởi đầu sự nghiệp mơ ước cùng hàng ngàn cơ hội việc làm hấp dẫn."
        bulletPoints={[
          "Tiếp cận hơn 5,000+ công việc công nghệ từ các công ty hàng đầu",
          "Nhận thông báo việc làm phù hợp với mức lương và kỹ năng kỳ vọng",
          "Tạo CV trực tuyến chuyên nghiệp và ứng tuyển chỉ với 1 cú nhấp chuột",
        ]}
      />

      {/* Right Column: Centered Form Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative">
        <div className="w-full max-w-[500px] bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 sm:p-12">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1112]">
              Tạo tài khoản mới
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#16C759] hover:text-[#13A849] hover:underline transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>

          {/* Role Switcher Pill */}
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-gray-100/80 p-1 mb-6">
            <button
              type="button"
              onClick={() => setRoleType("candidate")}
              className={`rounded-xl py-2 text-xs font-semibold transition-all ${
                roleType === "candidate"
                  ? "bg-white text-[#16C759] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Người tìm việc
            </button>
            <button
              type="button"
              onClick={() => setRoleType("employer")}
              className={`rounded-xl py-2 text-xs font-semibold transition-all ${
                roleType === "employer"
                  ? "bg-white text-[#16C759] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Nhà tuyển dụng
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                {roleType === "candidate" ? "Họ và tên" : "Tên doanh nghiệp / Người liên hệ"}
              </label>
              <input
                id="fullName"
                type="text"
                required
                placeholder={roleType === "candidate" ? "Nguyễn Văn A" : "Công ty TNHH Công Nghệ Mới"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#16C759] focus:outline-hidden focus:ring-4 focus:ring-[#16C759]/15"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="ban@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#16C759] focus:outline-hidden focus:ring-4 focus:ring-[#16C759]/15"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Mật khẩu (tối thiểu 6 ký tự)
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#16C759] focus:outline-hidden focus:ring-4 focus:ring-[#16C759]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1.5">
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 1 ? "bg-[#16C759]" : "bg-gray-200"}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 2 ? "bg-[#16C759]" : "bg-gray-200"}`} />
                    <div className={`h-full flex-1 rounded-full ${strength.score >= 3 ? "bg-[#16C759]" : "bg-gray-200"}`} />
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Độ an toàn:</span>
                    <span className="font-medium text-[#16C759]">{strength.text}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-[15px] text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-hidden focus:ring-4 ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                      : "border-gray-200 focus:border-[#16C759] focus:ring-[#16C759]/15"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-md border-gray-300 text-[#16C759] focus:ring-[#16C759] accent-[#16C759]"
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  Tôi đồng ý với{" "}
                  <span className="font-semibold text-gray-800 underline">
                    Điều khoản dịch vụ
                  </span>{" "}
                  và{" "}
                  <span className="font-semibold text-gray-800 underline">
                    Chính sách bảo mật
                  </span>{" "}
                  của CareerHub.
                </span>
              </label>
            </div>

            {/* Bright Vivid Green Submit Button (rounded-2xl) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[#16C759] py-3.5 px-4 text-[15px] font-bold text-white shadow-md shadow-green-500/25 transition-all duration-150 hover:bg-[#14B34F] hover:shadow-lg hover:shadow-green-500/35 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Đang khởi tạo tài khoản...</span>
                </span>
              ) : (
                "Đăng ký tài khoản"
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="absolute bg-white px-3 text-xs text-gray-400">
              Hoặc tiếp tục với
            </span>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white py-3 px-4 text-sm font-medium text-gray-700 shadow-2xs transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Đăng ký với Google</span>
          </button>
        </div>

        {/* Small floating chat bot bubble as in reference image */}
        <div className="fixed bottom-6 right-6 z-40 hidden sm:flex">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16C759] text-white shadow-lg shadow-green-500/30 cursor-pointer hover:scale-105 transition-transform"
            title="Hỗ trợ trực tuyến"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
        </div>

        {/* Small floating notification badge on bottom-left as in reference image */}
        <div className="fixed bottom-6 left-6 z-40 hidden sm:flex">
          <div
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#E11D48] text-white font-bold text-xs shadow-md shadow-rose-500/30 cursor-pointer hover:scale-105 transition-transform"
            title="Thông báo tuyển dụng mới"
          >
            <span>N</span>
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-white flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-[#16C759] animate-ping" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
