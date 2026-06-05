import { Facebook, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { brandVisual } from "@/config/brand-visual";
import { contactContent, getStaticPageHero } from "@/content/pages/static-pages";

export function ContactView() {
  const { contact, office, social } = brandVisual;
  const c = contactContent;

  return (
    <StaticPageShell {...getStaticPageHero("contact")} contentClassName="max-w-3xl">
      <p className="text-body home-prose text-center text-brand-muted">{c.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ContactCard
          href={`mailto:${contact.email}`}
          icon={Mail}
          label="Email"
          value={contact.email}
        />
        <ContactCard
          href={`tel:${contact.phone}`}
          icon={Phone}
          label="Hotline"
          value={contact.phoneDisplay}
          hint={c.phoneContactName}
        />
        <ContactCard
          href={social.facebook}
          icon={Facebook}
          label="Facebook"
          value={c.facebookLabel}
          external
        />
        <ContactCard
          href={social.messenger}
          icon={MessageCircle}
          label="Messenger"
          value={c.messengerLabel}
          external
        />
      </div>

      <div className="brand-card mt-8 p-5 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand-green">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          {c.officeLabel}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">{office.address}</p>
      </div>
    </StaticPageShell>
  );
}

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  hint,
  external,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  value: string;
  hint?: string;
  external?: boolean;
}) {
  const className =
    "brand-card-interactive flex h-full flex-col gap-3 p-5 transition-colors hover:border-brand-accent/30";

  const content = (
    <>
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green-light text-brand-deep">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{label}</p>
      </div>
      <div>
        <p className="font-heading text-base font-bold text-brand-ink">{value}</p>
        {hint ? <p className="mt-1 text-sm text-brand-muted">{hint}</p> : null}
      </div>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
