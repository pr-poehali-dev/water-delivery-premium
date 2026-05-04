import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { WA_LINK, PHONE, PHONE_HREF } from "./constants";

const NAV_LINKS: [string, string][] = [
  ["Услуги", "#services"],
  ["Цены", "#prices"],
  ["Как работаем", "#how"],
  ["FAQ", "#faq"],
  ["Контакты", "#contacts"],
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* ── TOP INFO BAR ── */}
      <div className="hidden md:block text-xs py-2 px-6" style={{ background: "#0D1B2A", color: "rgba(255,255,255,0.7)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {[["MapPin", "Новороссийск и пригороды"], ["Clock", "Приём заявок 24/7"], ["ShieldCheck", "Сертифицированная вода · СанПиН"]].map(([ic, tx]) => (
              <span key={tx} className="flex items-center gap-1.5">
                <Icon name={ic} size={11} /> {tx}
              </span>
            ))}
          </div>
          <a href={PHONE_HREF} className="flex items-center gap-1.5 font-semibold text-white hover:text-blue-300 transition-colors">
            <Icon name="Phone" size={11} /> {PHONE}
          </a>
        </div>
      </div>

      {/* ── NAV ── */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : "border-b border-gray-100"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-[62px] flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#0077CC" }}>
              <Icon name="Droplets" size={20} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[15px]" style={{ color: "#0D1B2A" }}>АкваСервис</div>
              <div className="text-[11px]" style={{ color: "#94A3B8" }}>Доставка воды · Новороссийск</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "#64748B" }}>
            {NAV_LINKS.map(([l, h]) => (
              <a key={l} href={h} className="hover:text-blue-600 transition-colors">{l}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a href={PHONE_HREF} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-blue-50"
              style={{ color: "#0077CC", border: "1.5px solid #0077CC" }}>
              <Icon name="Phone" size={15} /> {PHONE}
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#25D366" }}>
              <Icon name="MessageCircle" size={15} /> WhatsApp
            </a>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-1" onClick={() => setMob(!mob)}>
            <Icon name={mob ? "X" : "Menu"} size={24} style={{ color: "#0D1B2A" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {mob && (
          <div className="md:hidden border-t bg-white px-4 py-4 space-y-1">
            {NAV_LINKS.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMob(false)}
                className="block py-2.5 text-sm font-medium border-b border-gray-50" style={{ color: "#1A2332" }}>{l}</a>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <a href={WA_LINK} target="_blank" rel="noopener"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#25D366" }}>
                <Icon name="MessageCircle" size={16} /> Написать в WhatsApp
              </a>
              <a href={PHONE_HREF}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                style={{ color: "#0077CC", border: "1.5px solid #0077CC" }}>
                <Icon name="Phone" size={16} /> {PHONE}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
