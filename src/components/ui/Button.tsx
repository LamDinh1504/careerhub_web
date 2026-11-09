"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[5px] select-none focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:translate-y-[1px]";

    const sizeStyles = {
      sm: "h-8 px-3 text-[12px]",
      md: "h-11 px-5 text-[14px]",
      lg: "h-13 px-6 text-[15px]",
    }[size];

    const variantStyles = {
      primary:
        "bg-[#16C759] text-white hover:bg-[#14B34F] shadow-2xs focus:ring-2 focus:ring-[#16C759]/30",
      secondary:
        "bg-white border border-[#6F7478]/25 text-[#0F1112] hover:bg-[#FAFAF8] hover:border-[#6F7478]/40 focus:ring-2 focus:ring-[#6F7478]/20",
      outline:
        "bg-transparent border border-[#6F7478] text-[#0F1112] hover:bg-[#FAFAF8]",
      ghost:
        "bg-transparent text-[#6F7478] hover:text-[#0F1112] hover:bg-[#FAFAF8]",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2 font-mono text-[12px]">
            <svg
              className="h-3.5 w-3.5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
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
            <span>PROCESSING...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

