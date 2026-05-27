import { AlertTriangle, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

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
      <h2 className="heading-section mb-8">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <article className="brand-card p-6">
          <MapPin className="h-6 w-6 text-brand-accent" />
          <h3 className="mt-3 font-semibold text-brand-ink">Địa chỉ</h3>
          <p className="mt-2 text-brand-muted">{address}</p>
        </article>
        <article className="brand-card p-6">
          <Mail className="h-6 w-6 text-brand-accent" />
          <h3 className="mt-3 font-semibold text-brand-ink">Email</h3>
          <a href={`mailto:${email}`} className="link-accent mt-2 block">
            {email}
          </a>
        </article>
        <article className="brand-card p-6">
          <Phone className="h-6 w-6 text-brand-accent" />
          <h3 className="mt-3 font-semibold text-brand-ink">Hotline</h3>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="link-accent mt-2 block">
            {phone}
          </a>
        </article>
      </div>
      <div className="notice-info mt-8 text-left">
        <div className="flex gap-3">
          <AlertTriangle className="h-6 w-6 shrink-0 text-brand-accent" />
          <div>
            <h3 className="font-semibold text-brand-ink">{donateWarningLabel}</h3>
            <p className="mt-2 text-brand-muted">
              {donationNote}{" "}
              <Link href="/dong-gop" className="link-accent underline-offset-2">
                Đóng góp
              </Link>
              .
            </p>
            <p className="mt-2 font-medium text-brand-ink">{warning}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
