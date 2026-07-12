import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md";
}

const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  danger: "border-transparent bg-red-600 text-white hover:bg-red-700",
  outline: "border-blue-600 bg-white text-blue-700 hover:bg-blue-50",
  ghost: "border-transparent bg-transparent text-slate-600 hover:bg-slate-100"
};

export function Button({ children, variant = "primary", size = "md", className = "", ...props }: ButtonProps) {
  const sizing = size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm";

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${sizing} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
