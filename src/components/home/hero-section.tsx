import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteImages } from "@/lib/images";

export async function HeroSection() {
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
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/10 blur-3xl" />
            <Image
              src={siteImages.heroHomepage}
              alt="Quỹ Tony Buổi Sáng hoạt động thiện nguyện"
              width={800}
              height={600}
              className="h-auto w-full rotate-2 rounded-3xl border-4 border-white shadow-xl transition-transform duration-500 hover:rotate-0"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
