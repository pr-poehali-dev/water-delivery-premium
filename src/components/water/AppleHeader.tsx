import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "+7 (988) 000-00-00";
const PHONE_HREF = "tel:+79880000000";
const WA_LINK = "https://wa.me/79880000000?text=Здравствуйте!%20Хочу%20заказать%20воду%20в%20Новороссийске";

const NAV = [
  ["Объёмы", "#volumes"],
  ["Услуги", "#services"],
  ["Цены", "#pricing"],
  ["FAQ", "#faq"],
  ["Контакты", "#contact"],
];

export default function AppleHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
        }}
      >
        <div className="section-wrap-wide h-[52px] flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 no-underline" style={{ textDecoration: "none" }}>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--ink)" }}
            >
              <Icon name="Droplets" size={15} className="text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}>
              АкваСервис
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(([l, h]) => (
              <a key={l} href={h} className="nav-link">{l}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={PHONE_HREF} className="nav-link flex items-center gap-1.5">
              <Icon name="Phone" size={13} />
              {PHONE}
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn-apple text-sm px-5 py-2.5">
              Заказать воду
            </a>
          </div>

          {/* Burger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => setMob(!mob)}
            style={{ color: "var(--ink)" }}
          >
            <Icon name={mob ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile drawer */}
        {mob && (
          <div
            className="md:hidden px-6 pt-2 pb-6 space-y-0"
            style={{ borderTop: "1px solid var(--border-c)" }}
          >
            {NAV.map(([l, h]) => (
              <a
                key={l}
                href={h}
                onClick={() => setMob(false)}
                className="flex items-center justify-between py-4 text-sm font-medium"
                style={{ color: "var(--ink)", borderBottom: "1px solid var(--border-subtle)" }}
              >
                {l}
                <Icon name="ChevronRight" size={15} style={{ color: "var(--ink-tertiary)" }} />
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-5">
              <a href={WA_LINK} target="_blank" rel="noopener" className="btn-apple w-full justify-center">
                Заказать воду
              </a>
              <a href={PHONE_HREF} className="btn-apple-outline w-full justify-center">
                <Icon name="Phone" size={15} /> {PHONE}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
