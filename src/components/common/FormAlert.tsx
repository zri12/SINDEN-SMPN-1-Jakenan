import { useEffect, useRef } from "react";

interface FormAlertProps {
  message: string;
  tone?: "error" | "success";
}

export function FormAlert({ message, tone = "error" }: FormAlertProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!message) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  if (!message) return null;

  const className = tone === "success"
    ? "rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700"
    : "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700";

  return <p ref={ref} className={className}>{message}</p>;
}
