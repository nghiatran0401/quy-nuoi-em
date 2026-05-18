import { AlertTriangle, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ContactSectionProps = {
  heading: string;
  address: string;
  email: string;
  phone: string;
  donationNote: string;
  warning: string;
  donateWarningLabel: string;
};

export function ContactSection({
  heading,
  address,
  email,
  phone,
  donationNote,
  warning,
  donateWarningLabel,
}: ContactSectionProps) {
  return (
    <section>
      <h2 className="mb-8 font-heading text-2xl font-bold text-brand-blue">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <article className="brand-card p-6">
          <MapPin className="h-6 w-6 text-brand-accent" />
          <h3 className="mt-3 font-semibold text-gray-800">Địa chỉ</h3>
          <p className="mt-2 text-gray-600">{address}</p>
        </article>
        <article className="brand-card p-6">
          <Mail className="h-6 w-6 text-brand-accent" />
          <h3 className="mt-3 font-semibold text-gray-800">Email</h3>
          <a href={`mailto:${email}`} className="mt-2 block text-brand-blue hover:underline">
            {email}
          </a>
        </article>
        <article className="brand-card p-6">
          <Phone className="h-6 w-6 text-brand-accent" />
          <h3 className="mt-3 font-semibold text-gray-800">Hotline</h3>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-2 block text-brand-blue hover:underline">
            {phone}
          </a>
        </article>
      </div>
      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex gap-3">
          <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
          <div>
            <h3 className="font-semibold text-amber-900">{donateWarningLabel}</h3>
            <p className="mt-2 text-amber-800">
              {donationNote}{" "}
              <Link href="/dong-gop" className="font-semibold underline">
                Đóng góp
              </Link>
              .
            </p>
            <p className="mt-2 font-medium text-amber-900">{warning}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
