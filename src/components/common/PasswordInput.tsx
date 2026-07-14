import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./Input";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function PasswordInput({ label, className = "", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>}
      <div className="relative">
        <Input
          {...props}
          type={visible ? "text" : "password"}
          className={`pr-11 ${className}`}
        />
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
