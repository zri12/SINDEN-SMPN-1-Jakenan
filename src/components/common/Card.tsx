import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`rounded-xl border border-slate-100 bg-white p-3 shadow-soft sm:p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}
