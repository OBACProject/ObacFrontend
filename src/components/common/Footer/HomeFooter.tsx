"use client";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Youtube,
  Globe,
  ArrowUp,
} from "lucide-react";

export default function HomeFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="w-full bg-[#0C243C] text-white mt-auto"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="lg:flex grid place-items-center items-center gap-4">
            <div className="bg-white/95 w-fit rounded-full p-2 shadow-sm">
              <img
                src="/images/obac_navbar_logo.png"
                alt="OBAC logo"
                className="h-12 w-auto"
              />
            </div>
            <div className="leading-tight lg:text-start text-center font-prompt">
              <p className="font-prompt text-base sm:text-lg">
                Ekawit Business Administration Vocational College
              </p>
              <p className="text-white/80 text-sm sm:text-base">
                วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://web.facebook.com/OBAC41/?locale=th_TH&_rdc=1&_rdr#"
              aria-label="Facebook"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/"
              aria-label="YouTube"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="/"
              aria-label="Website"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl font-prompt px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact */}
        <div>
          <h3 className="text-sm font-prompt tracking-wider uppercase text-white/90">
            ติดต่อเรา
          </h3>
          <ul className="mt-4 space-y-3 text-white/90">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
              <span>
                5 ซอย ลาดกระบัง 34/1 ถนนลาดกระบัง แขวงลาดกระบัง เขตลาดกระบัง
                <br />
                กรุงเทพมหานคร 10520
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0" />
              <a href="tel:023272992" className="hover:underline">
                02 327 2992
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0" />
              <a href="mailto:info@obac.ac.th" className="hover:underline">
                pr.obac.th@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="h-5 w-5 shrink-0 mt-0.5" />
              <span>เวลาทำการ: จันทร์–ศุกร์ 08:30–16:30 น.</span>
            </li>
          </ul>
          <div className="mt-4 flex justify-center lg:justify-start">
            <a
              href="https://maps.app.goo.gl/cyXnbqDM37i8opfr6"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-[#0C243C] px-3 py-2 text-sm font-medium hover:bg-white/90 transition shadow-sm"
            >
              เปิดแผนที่
            </a>
          </div>
        </div>
        <div className=" lg:grid lg:h-fit lg:place-items-start grid place-items-center">
          <h3 className="text-lg font-prompt tracking-wider uppercase text-white/90">
            บริการ
          </h3>
          <ul className="mt-4 lg:grid grid grid-cols-2 lg:place-items-start place-items-center font-prompt_Light  gap-2 text-white/90">
            {[
              { label: "สมัครเรียน", href: "#" },
              { label: "หลักสูตร", href: "/program/accounting" },
              { label: "ปฏิทินการศึกษา", href: "#" },
              { label: "บริการออนไลน์", href: "/" },
              { label: "ข่าวประกาศ", href: "/news" },
              { label: "ติดต่อ", href: "/contact-obac" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:grid lg:h-fit lg:place-items-start grid place-items-center">
          <h3 className="text-lg   tracking-wider uppercase text-white/90">
            นโยบาย
          </h3>
          <ul className="mt-4 space-y-2 grid  lg:place-items-start place-items-center font-prompt_Light text-white/90">
            <li>
              <a href="#" className="hover:underline">
                นโยบายความเป็นส่วนตัวผู้ใช้
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                เงื่อนไขการใช้บริการ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                การใช้คุกกี้
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                การเข้าถึงสำหรับบุคลากร
              </a>
            </li>
          </ul>
        </div>
        <div className="grid h-fit lg:place-items-start place-items-center">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90">
            รับข่าวสาร
          </h3>
          <p className="mt-4 text-white/80 lg:text-start text-center">
            สมัครรับข่าวสาร กิจกรรม และประกาศสำคัญของวิทยาลัย
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex items-center gap-2"
            aria-label="subscribe-newsletter"
          >
            <input
              type="email"
              required
              placeholder="อีเมลของคุณ"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm placeholder-white/60 outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="rounded-xl bg-white text-[#0C243C] px-3 py-2 text-sm font-medium hover:bg-white/90 transition shadow-sm"
            >
              สมัคร
            </button>
          </form>
          <p className="mt-2 text-xs text-white/60">
            กดสมัครถือว่ายอมรับนโยบายความเป็นส่วนตัว
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/80">
          <p>©{year} วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)</p>
          <div className="flex items-center gap-4">
            <a
              href="https://maps.app.goo.gl/cyXnbqDM37i8opfr6"
              className="hover:underline"
            >
              Sitemap
            </a>
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 hover:underline"
            >
              กลับขึ้นด้านบน <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
