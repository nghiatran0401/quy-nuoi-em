import Image from "next/image";
import { ArrowRight, CircleAlert, Clock3, ExternalLink, MessageCircle, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { brandVisual } from "@/config/brand-visual";
import { nuoiEmImage } from "@/lib/nuoiem-images";
import {
  CODE_MEANING_URL,
  costTiers,
  importantNotes,
  paymentScenarios,
  processSteps2026,
  SCHOOL_BUILD_URL,
  timelineMilestones,
} from "@/content/quy-trinh-cap-ma-2026";

const { contact, social, financeUrl, donateQrPath } = brandVisual;

export function QuyTrinhCapMa2026View() {
  return (
    <div className="section-warm">
      {/* Hero */}
      <section className="banner-primary relative overflow-hidden border-b border-brand-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(255,228,168,0.32),transparent_45%),radial-gradient(circle_at_85%_12%,rgba(240,120,74,0.16),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="eyebrow mb-3">Mùa nuôi 2025 – 2026</p>
            <h1 className="heading-display max-w-4xl text-4xl md:text-5xl lg:text-6xl">
              Quy trình cấp và nhận mã
              <span className="text-brand-accent-dark"> cho anh/chị nuôi mới</span>
            </h1>
            <p className="text-body mt-5 max-w-3xl text-lg">
              Khi đã có mã NE, làm đúng 6 bước dưới đây để giữ mã, chuyển khoản đúng cú pháp, nhận thông tin bé và theo
              dõi suốt năm học. Nội dung tham chiếu từ quy trình chính thức của dự án.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={social.messenger} target="_blank" rel="noreferrer" className="btn-primary">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
                Nhận mã qua Messenger
              </a>
              <a href={social.group} target="_blank" rel="noreferrer" className="btn-secondary">
                Tham gia group Nuôi Em
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-brand-border/70 bg-white shadow-[var(--shadow-brand-card)] lg:max-w-none">
            <Image
              src={nuoiEmImage("processGuide")}
              alt="Sơ đồ 6 bước quy trình nhận mã Nuôi Em"
              fill
              className="object-contain p-2"
              sizes="(max-width: 1024px) 90vw, 420px"
              priority
            />
          </div>
        </div>
      </section>

      {/* 6 steps */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow">6 bước cốt lõi</p>
          <h2 className="heading-section mt-2">Từ nhận mã đến thăm em</h2>
          <p className="text-body mt-3">
            Làm lần lượt — không bỏ bước. Mốc thời gian ghi trên từng bước để anh/chị chủ động theo dõi.
          </p>
        </header>

        <ol className="space-y-5">
          {processSteps2026.map((step) => (
            <li
              key={step.number}
              className="brand-card grid gap-5 p-5 sm:p-6 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-8 md:p-7"
            >
              <div className="flex items-start md:pt-1">
                <span
                  className="font-heading text-5xl leading-none font-extrabold tracking-tight text-brand-accent sm:text-6xl"
                  aria-hidden
                >
                  {step.number}
                </span>
                <span className="sr-only">Bước {step.number}</span>
              </div>

              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-brand-ink">{step.title}</h3>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-border bg-brand-sky-soft px-3 py-1 text-xs font-semibold text-brand-muted">
                    <Clock3 className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
                    {step.timing}
                  </span>
                </div>
                <p className="leading-relaxed text-brand-muted">{step.summary}</p>
                <ul className="space-y-2 border-t border-brand-border/60 pt-3">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-brand-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-accent" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Cost */}
      <section className="border-y border-brand-border/60 bg-brand-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <p className="eyebrow">Mức đóng góp</p>
          <h2 className="heading-section mt-2">Chi phí nuôi một em / một năm học</h2>
          <p className="text-body mt-3 max-w-3xl">
            Bữa ăn ~8.500đ/suất (tiểu học), mầm non ~6.800đ/suất. Khoản cơ sở vật chất 100.000đ/mã dùng cho các dự án bổ
            trợ (không đóng thêm).
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {costTiers.map((tier) => (
              <div key={tier.label} className="rounded-2xl border border-brand-border/70 bg-white p-6">
                <p className="text-sm font-semibold text-brand-green">{tier.label}</p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-accent">{tier.amount}</p>
                <p className="mt-2 text-sm text-brand-muted">{tier.breakdown}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transfer */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">Chuyển khoản</p>
            <h2 className="heading-section mt-2">Thông tin tài khoản & kịch bản gửi tiền</h2>

            <div className="mt-5 rounded-2xl border border-brand-danger/25 bg-brand-danger-soft/60 p-4">
              <p className="flex items-start gap-2 text-sm font-semibold text-brand-ink">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-danger" aria-hidden />
                Bắt buộc ghi nội dung: «Mã bé nhận nuôi» + tên anh/chị. Không có mã NE → không hoàn lại, chuyển quỹ vô
                danh (xây trường).
              </p>
            </div>

            <dl className="mt-6 space-y-3 text-brand-muted">
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Số tài khoản</dt>
                <dd className="mt-0.5 font-mono text-lg font-bold text-brand-accent">0711000280294</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Ngân hàng</dt>
                <dd>Vietcombank — Chi nhánh Thanh Xuân, Hà Nội</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Chủ tài khoản</dt>
                <dd>Hoàng Hoa Trung</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Điện thoại</dt>
                <dd>
                  <a href={`tel:${contact.phone}`} className="link-accent">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <h3 className="mt-8 text-lg font-bold text-brand-ink">Kịch bản chuyển tiền</h3>
            <ul className="mt-4 space-y-3">
              {paymentScenarios.map((scenario) => (
                <li
                  key={scenario.label}
                  className="rounded-xl border border-brand-border/70 bg-brand-warm px-4 py-3"
                >
                  <p className="font-semibold text-brand-ink">
                    {scenario.label}
                    {scenario.tag ? (
                      <span className="ml-2 rounded-full bg-brand-highlight px-2 py-0.5 text-xs font-bold text-brand-ink">
                        {scenario.tag}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-brand-muted">{scenario.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-brand-muted">
              Dù chọn kịch bản nào, cần hoàn tất 100% tiền ăn trước 31/12 mỗi năm học để dự án vận hành ổn định (trường
              ký hợp đồng thực phẩm từ tháng 7).
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <div className="w-full max-w-sm rounded-3xl border border-brand-border bg-white p-6 shadow-[var(--shadow-brand-card)]">
              <p className="text-center text-sm font-semibold text-brand-ink">Quét mã chuyển khoản</p>
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[240px]">
                <Image
                  src={donateQrPath}
                  alt="Mã QR chuyển khoản Nuôi Em"
                  fill
                  className="object-contain"
                  sizes="240px"
                />
              </div>
              <a href={social.messenger} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
                Nhận mã NE
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white/80">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <p className="eyebrow">Mốc thời gian</p>
          <h2 className="heading-section mt-2">Lịch quan trọng trong năm học</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timelineMilestones.map((item) => (
              <div
                key={item.when}
                className="rounded-2xl border border-brand-border/70 bg-brand-warm px-5 py-4"
              >
                <p className="text-sm font-bold text-brand-accent">{item.when}</p>
                <p className="mt-2 font-semibold text-brand-ink">{item.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important notes + finance */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Lưu ý quan trọng</p>
            <h2 className="heading-section mt-2">Về mã NE và thông tin bé</h2>
            <ul className="mt-6 space-y-4">
              {importantNotes.map((note, i) => (
                <li key={note} className="flex gap-3 text-brand-muted">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-bold text-brand-accent-dark">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
            <a
              href={CODE_MEANING_URL}
              target="_blank"
              rel="noreferrer"
              className="link-accent mt-6 inline-flex items-center gap-1 text-sm"
            >
              Mã mỗi em có ý nghĩa gì?
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="surface-info rounded-2xl p-6">
            <p className="eyebrow">Minh bạch tài chính</p>
            <h3 className="mt-2 text-xl font-bold text-brand-ink">Xác nhận chuyển khoản</h3>
            <p className="mt-3 leading-relaxed text-brand-muted">
              Báo cáo công khai tại{" "}
              <a href={financeUrl} target="_blank" rel="noreferrer" className="link-accent">
                taichinh.nuoiem.com
              </a>
              . Team tài chính xác nhận chuyển khoản thành công qua tin nhắn Facebook sau khoảng 7 ngày, kèm mã giao
              dịch.
            </p>
            <p className="mt-3 text-sm text-brand-muted">
              Số tiền chuyển dư hoặc chưa dùng hết có thể chuyển sang dự án xây trường{" "}
              <a href={SCHOOL_BUILD_URL} target="_blank" rel="noreferrer" className="link-accent">
                Sức mạnh 2000
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="cta-warm border-t border-brand-border/40">
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="heading-section">Cần hỗ trợ?</h2>
          <p className="text-body mx-auto mt-3 max-w-2xl">
            Chỉ hỏi qua Messenger Fanpage Nuôi Em — không hỏi ở comment để tránh bỏ lỡ tin. Hotline khi cần gấp.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={social.messenger} target="_blank" rel="noreferrer" className="btn-primary">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
              Inbox Fanpage
            </a>
            <a href={`tel:${contact.phone}`} className="btn-secondary">
              <Phone className="mr-2 h-5 w-5" aria-hidden />
              {contact.phoneDisplay}
            </a>
            <Link href="/contact" className="btn-secondary">
              Trang liên hệ Quỹ
            </Link>
          </div>
          <p className="mt-6 text-sm text-brand-muted">
            Tham khảo thêm tại{" "}
            <a href="https://www.nuoiem.com/" target="_blank" rel="noreferrer" className="link-accent">
              nuoiem.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
