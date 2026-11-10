import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "active" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const variantStyles = {
    default: "border border-[#6F7478]/30 bg-white text-[#0F1112]",
    active: "border border-[#16C759]/40 bg-[#16C759]/10 text-[#16C759]",
    neutral: "border border-transparent bg-[#FAFAF8] text-[#6F7478]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${variantStyles} ${className}`}
    >
      {variant === "active" && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#16C759] animate-pulse" />
      )}
      {children}
    </span>
  );
};

