import Image from "next/image";
import { resolveCmsImageUrl } from "@/lib/cms/resolve-image-url";

type AdminImageFieldProps = {
  label: string;
  fileName: string;
  existingFieldName: string;
  currentUrl: string;
  hint?: string;
};

export function AdminImageField({
  label,
  fileName,
  existingFieldName,
  currentUrl,
  hint,
}: AdminImageFieldProps) {
  const previewSrc = resolveCmsImageUrl(currentUrl, currentUrl);

  return (
    <div className="space-y-2">
      <label className="admin-label" htmlFor={fileName}>
        {label}
      </label>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      <input type="hidden" name={existingFieldName} value={currentUrl} />
      <div className="flex flex-wrap items-start gap-4">
        <div className="relative h-24 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <Image src={previewSrc} alt="" fill className="object-contain p-1" sizes="144px" />
        </div>
        <input
          id={fileName}
          name={fileName}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="max-w-sm text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium"
        />
      </div>
    </div>
  );
}
