import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-green">
              {t("eyebrow")}
            </h2>
            <h1 className="mb-6 font-heading text-4xl font-black leading-tight text-brand-blue md:text-6xl">
              {t("title")}
            </h1>
            <p className="mb-10 text-justify font-body text-lg leading-relaxed text-gray-600 md:text-xl lg:text-left">
              {t("description")}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/danh-sach-bao-tro"
                className="rounded-full bg-brand-blue px-8 py-4 text-center text-lg font-bold text-white transition-all hover:bg-brand-blue/90 hover:shadow-lg"
              >
                {t("sponsorNow")}
              </Link>
              <Link
                href="/about"
                className="rounded-full border-2 border-brand-green bg-white px-8 py-4 text-center text-lg font-bold text-brand-green transition-all hover:bg-brand-green hover:text-white"
              >
                {t("learnMore")}
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500">{t("phaseNote")}</p>
          </div>

          <div className="relative w-full lg:w-1/2">
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/10 blur-3xl" />
            <div className="rotate-2 rounded-3xl border-4 border-white bg-gradient-to-br from-brand-blue/10 via-white to-brand-green/20 p-10 shadow-xl transition-transform duration-500 hover:rotate-0">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "387", label: "Trẻ được bảo trợ" },
                  { value: "17", label: "Đợt bảo trợ" },
                  { value: "51.3T+", label: "Tổng tiền nhận" },
                  { value: "27.5T+", label: "Số tiền còn lại" },
                ].map((item) => (
                  <div key={item.label} className="brand-card p-4 text-center">
                    <div className="font-heading text-2xl font-bold text-brand-blue">{item.value}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
