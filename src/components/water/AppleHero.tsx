import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PHONE_HREF = "tel:+79880000000";
const PHONE = "+7 (988) 000-00-00";
const WA_LINK = "https://wa.me/79880000000?text=Здравствуйте!%20Хочу%20заказать%20воду%20в%20Новороссийске";

export default function AppleHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden hero-noise"
      style={{
        background: "linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)",
        paddingTop: "clamp(64px, 9vw, 120px)",
        paddingBottom: "clamp(64px, 9vw, 120px)",
      }}
    >
      {/* Subtle ambient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          top: -120, right: -100,
          background: "radial-gradient(circle, rgba(0,113,227,0.055) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400, height: 400,
          bottom: -60, left: -80,
          background: "radial-gradient(circle, rgba(0,113,227,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="section-wrap relative z-10">
        {/* Eyebrow */}
        <div
          ref={ref}
          style={{
            opacity: 0,
            transform: "translateY(12px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p className="t-label mb-6">Новороссийск · Доставка воды</p>

          {/* Main headline */}
          <h1
            className="t-display mb-6"
            style={{ maxWidth: 780 }}
          >
            Доставка воды<br />
            в Новороссийске —<br />
            <span style={{ color: "var(--ink-secondary)", fontWeight: 300 }}>
              19 литров на дом и в офис
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="t-body mb-10"
            style={{ maxWidth: 480, fontSize: 19, color: "var(--ink-secondary)" }}
          >
            Питьевая вода от 150 ₽ за бутыль. Срочная доставка по городу.
            Технические объёмы для бизнеса и строек.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-14">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn-apple text-base px-8 py-3.5">
              Заказать воду
            </a>
            <a href={PHONE_HREF} className="btn-apple-outline text-base px-8 py-3.5">
              <Icon name="Phone" size={16} />
              {PHONE}
            </a>
          </div>

          {/* Minimal trust row */}
          <div
            className="flex flex-wrap gap-8 pt-8"
            style={{ borderTop: "1px solid var(--border-c)" }}
          >
            {[
              { val: "150 ₽",   label: "за 19 литров" },
              { val: "1–3 ч",   label: "доставка" },
              { val: "24/7",    label: "приём заявок" },
              { val: "15 лет",  label: "в Новороссийске" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "clamp(22px, 3vw, 28px)",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    color: "var(--ink)",
                    lineHeight: 1.1,
                  }}
                >
                  {val}
                </div>
                <div className="t-small mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
