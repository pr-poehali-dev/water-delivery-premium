import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_IMG = "https://cdn.poehali.dev/projects/66c3eddf-e576-4e82-b662-ae8fabc5f460/files/6843bb42-875c-49a6-8f92-7bacfbd926f1.jpg";
const PHONE_HREF = "tel:+79880000000";
const PHONE = "+7 (988) 000-00-00";
const WA_LINK = "https://wa.me/79880000000?text=Здравствуйте!%20Хочу%20заказать%20доставку%20воды%20водовозом%20в%20Новороссийске";

const BADGES = [
  { icon: "Truck",     text: "Объёмы от 7,5 м³" },
  { icon: "MapPin",    text: "Весь Новороссийск" },
  { icon: "PhoneCall", text: "Приём 24 / 7" },
];

const STATS = [
  { val: "7,5 м³",  label: "минимальный объём" },
  { val: "1–3 ч",   label: "время доставки" },
  { val: "24 / 7",  label: "приём заявок" },
  { val: "15 лет",  label: "опыт работы" },
];

export default function AppleHero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const fadeContent = {
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 0.75s ease, transform 0.75s ease",
  };
  const fadeImg = {
    opacity: mounted ? 1 : 0,
    transform: mounted ? "scale(1)" : "scale(0.97)",
    transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ background: "#FAFBFC", borderBottom: "1px solid #EAECF0" }}
    >
      {/* ── DESKTOP: split-screen ── */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 1fr", minHeight: "92vh", maxHeight: 820 }}>

        {/* LEFT — Content */}
        <div
          className="flex flex-col justify-center"
          style={{ padding: "clamp(48px,5vw,80px) clamp(32px,4vw,64px) clamp(48px,5vw,80px) clamp(32px,5vw,80px)" }}
        >
          <div ref={contentRef} style={fadeContent}>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ink-secondary)" }}>
                Новороссийск · Водовозы · Доставка воды
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontSize: "clamp(32px, 3.4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.07,
                letterSpacing: "-0.04em",
                color: "var(--ink)",
                marginBottom: 20,
              }}
            >
              Доставка воды<br />
              водовозом —<br />
              <span style={{ color: "#0071E3" }}>от 7,5 м³</span>{" "}
              <span style={{ color: "var(--ink-secondary)", fontWeight: 400 }}>на объект</span>
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-secondary)", maxWidth: 420, marginBottom: 32 }}>
              Технические и питьевые объёмы для строек, частных домов, бассейнов
              и промышленных объектов. Быстрый выезд по Новороссийску и краснодарскому краю.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={WA_LINK} target="_blank" rel="noopener"
                className="btn-apple"
                style={{ fontSize: 15, padding: "14px 28px" }}
              >
                <Icon name="MessageCircle" size={17} />
                Заказать водовоз
              </a>
              <a
                href={PHONE_HREF}
                className="btn-apple-outline"
                style={{ fontSize: 15, padding: "13px 24px" }}
              >
                <Icon name="Phone" size={15} />
                {PHONE}
              </a>
            </div>

            {/* Info badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {BADGES.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5"
                  style={{
                    background: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: 100,
                    padding: "6px 13px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--ink-secondary)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <Icon name={icon} size={12} style={{ color: "#0071E3" }} />
                  {text}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-4 gap-4"
              style={{ borderTop: "1px solid #EAECF0", paddingTop: 24 }}
            >
              {STATS.map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontSize: "clamp(17px,1.7vw,23px)", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--ink)", lineHeight: 1.1 }}>
                    {val}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-tertiary)", marginTop: 3, letterSpacing: "0.01em" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Photo */}
        <div className="relative overflow-hidden" style={fadeImg} ref={imgRef}>
          <img
            src={TRUCK_IMG}
            alt="Водовоз доставляет воду на стройку в Новороссийске"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
          {/* Left fade */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{ width: 120, background: "linear-gradient(to right, #FAFBFC, transparent)" }}
          />

          {/* Floating card — top left: объём */}
          <div
            className="absolute top-8 left-6"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: 16,
              padding: "12px 16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="Truck" size={18} style={{ color: "#0071E3" }} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0A0F1E", letterSpacing: "-0.01em" }}>До 10 000 литров</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>за один рейс</div>
            </div>
          </div>

          {/* Floating card — bottom right: срочно */}
          <div
            className="absolute bottom-8 right-6"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: 16,
              padding: "12px 16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="Zap" size={18} style={{ color: "#DC2626" }} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0A0F1E", letterSpacing: "-0.01em" }}>Срочный выезд</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>от 1 часа</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden">

        {/* Photo */}
        <div className="relative overflow-hidden" style={{ height: "55vw", minHeight: 220, maxHeight: 340 }}>
          <img
            src={TRUCK_IMG}
            alt="Водовоз доставляет воду на стройку в Новороссийске"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: "50%", background: "linear-gradient(to top, #FAFBFC, transparent)" }}
          />
          {/* Mobile badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5"
            style={{
              background: "rgba(255,255,255,0.93)",
              backdropFilter: "blur(12px)",
              borderRadius: 100,
              padding: "6px 10px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#DC2626" }} className="animate-pulse" />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#0A0F1E", letterSpacing: "0.02em" }}>
              СРОЧНЫЙ ВЫЕЗД · ОТ 1 ЧАСА
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 20px 40px", background: "#FAFBFC" }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-1.5 mb-4">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ink-secondary)" }}>
              Новороссийск · Водовозы
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(28px, 7.5vw, 38px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              marginBottom: 14,
            }}
          >
            Доставка воды<br />
            водовозом —<br />
            <span style={{ color: "#0071E3" }}>от 7,5 м³</span>{" "}
            <span style={{ color: "var(--ink-secondary)", fontWeight: 400 }}>на объект</span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-secondary)", marginBottom: 24 }}>
            Технические и питьевые объёмы для строек, частных домов, бассейнов и промышленных объектов.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mb-6">
            <a
              href={WA_LINK} target="_blank" rel="noopener"
              className="btn-apple w-full justify-center"
              style={{ fontSize: 16, padding: "16px 24px", borderRadius: 16 }}
            >
              <Icon name="MessageCircle" size={19} />
              Заказать водовоз
            </a>
            <a
              href={PHONE_HREF}
              className="w-full flex items-center justify-center gap-2"
              style={{
                fontSize: 16,
                fontWeight: 500,
                padding: "15px 24px",
                borderRadius: 16,
                border: "1.5px solid #D1D5DB",
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                background: "white",
                textDecoration: "none",
              }}
            >
              <Icon name="Phone" size={17} style={{ color: "#0071E3" }} />
              {PHONE}
            </a>
          </div>

          {/* Badges */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6" style={{ scrollbarWidth: "none" }}>
            {BADGES.map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 flex-shrink-0"
                style={{
                  background: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: 100,
                  padding: "7px 12px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--ink-secondary)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <Icon name={icon} size={12} style={{ color: "#0071E3" }} />
                {text}
              </div>
            ))}
          </div>

          {/* Stats 2×2 */}
          <div
            className="grid grid-cols-2 gap-3"
            style={{ borderTop: "1px solid #EAECF0", paddingTop: 20 }}
          >
            {STATS.map(({ val, label }) => (
              <div
                key={label}
                style={{
                  background: "white",
                  borderRadius: 12,
                  padding: "16px",
                  border: "1px solid #EAECF0",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--ink)", lineHeight: 1.1 }}>
                  {val}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-tertiary)", marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
