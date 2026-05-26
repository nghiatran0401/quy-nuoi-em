import { AlertCircle, CheckCircle2 } from "lucide-react";

type AdminAlertProps = {
  variant: "success" | "error";
  message: string;
};

export function AdminAlert({ variant, message }: AdminAlertProps) {
  const isSuccess = variant === "success";

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      )}
      <p>{message}</p>
    </div>
  );
}
