import Icon from "@/components/ui/icon";
import { useFade, Section, SectionHeader, WA_LINK } from "./shared";

// ── Why ───────────────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: "Timer",        title: "1–3 часа доставка",      desc: "Выезжаем в течение часа. Экстренный выезд — без доплат.", color: "#EFF6FF", iconColor: "#0071E3" },
  { icon: "Truck",        title: "Собственный транспорт",  desc: "Свои водовозы — без посредников и накруток. Несём ответственность сами.", color: "#F0FDF4", iconColor: "#16A34A" },
  { icon: "Gauge",        title: "От 7,5 м³ за рейс",      desc: "Большие объёмы за один приезд. Организуем несколько рейсов подряд.", color: "#FFF7ED", iconColor: "#EA580C" },
  { icon: "ShieldCheck",  title: "Чистая вода",             desc: "Качество воды подтверждено сертификатами. Соответствие СанПиН.", color: "#F5F3FF", iconColor: "#7C3AED" },
  { icon: "MapPin",       title: "Весь Новороссийск",       desc: "15 лет работы в городе и пригородах. Знаем каждый район.", color: "#FFF1F2", iconColor: "#E11D48" },
  { icon: "Receipt",      title: "Прозрачные цены",         desc: "Цена при заказе — финальная. Оплата после доставки.", color: "#F0F9FF", iconColor: "#0284C7" },
];

function WhyCard({ w, delay }: { w: typeof WHY_ITEMS[0]; delay: number }) {
  const f = useFade(delay);
  return (
    <div
      ref={f.ref}
      style={{
        ...f.style,
        background: "white",
        border: "1px solid #EAECF0",
        borderRadius: 16,
        padding: "20px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: 12, background: w.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
        <Icon name={w.icon} size={20} style={{ color: w.iconColor }} />
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: 5, lineHeight: 1.25 }}>
          {w.title}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-secondary)" }}>
          {w.desc}
        </div>
      </div>
    </div>
  );
}

export function WhySection() {
  return (
    <Section id="why" bg="#F9FAFB">
      <SectionHeader label="Преимущества" title="Почему выбирают нас" />
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}
      >
        {WHY_ITEMS.map((w, i) => <WhyCard key={w.title} w={w} delay={i * 60} />)}
      </div>
    </Section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
export function PricingSection() {
  const f1 = useFade(0);
  const f2 = useFade(80);
  const f3 = useFade(160);

  return (
    <Section id="pricing" bg="#F9FAFB">
      <SectionHeader label="Цены" title="Прозрачная стоимость" />

      <div ref={f1.ref} style={f1.style} className="mb-10">
        <div style={{ fontSize: "clamp(42px,7vw,80px)", fontWeight: 600, letterSpacing: "-0.05em", color: "var(--ink)", lineHeight: 1 }}>
          от 7,5 м³
        </div>
        <p className="t-body mt-3" style={{ maxWidth: 380 }}>
          минимальный объём одного рейса.<br />Цена зависит от объёма и адреса доставки.
        </p>
      </div>

      <div ref={f2.ref} style={{ ...f2.style, maxWidth: 520 }} className="mb-8">
        {[
          ["7,5 м³",  "по запросу", "7 500 л — дача, частный дом, баня"],
          ["10 м³",   "по запросу", "10 000 л — стройка, бизнес, бассейн"],
          ["20+ м³",  "по запросу", "несколько рейсов — производство, резервуар"],
        ].map(([vol, price, note]) => (
          <div key={vol} className="flex items-baseline justify-between py-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <div>
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em" }}>{vol}</span>
              <span className="t-small ml-3" style={{ fontSize: 12 }}>{note}</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em" }}>{price}</span>
          </div>
        ))}
      </div>

      <div ref={f3.ref} style={f3.style}>
        <a href={WA_LINK} target="_blank" rel="noopener" className="btn-apple text-sm px-7 py-3">
          Узнать цену в WhatsApp
        </a>
      </div>
    </Section>
  );
}

// ── Area ──────────────────────────────────────────────────────────────────────
const ZONES = [
  "Центр Новороссийска", "Мысхако", "Цемдолина", "Малая Земля",
  "Пролетарский район", "Гайдук", "Верхнебаканский", "Анапский район",
];

export function AreaSection() {
  const f = useFade(0);
  return (
    <Section id="area" bg="#F9FAFB">
      <SectionHeader label="Зона доставки" title={<>Доставляем по<br />всему Новороссийску</>} />
      <div ref={f.ref} style={f.style}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 mb-10">
          {ZONES.map((z) => (
            <div key={z} className="flex items-center gap-2">
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ink)", flexShrink: 0 }} />
              <span className="t-small">{z}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ height: 300, border: "1px solid var(--border-c)" }}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.768%2C44.723&z=12&l=map"
            width="100%" height="100%" frameBorder="0" allowFullScreen
            title="Карта доставки воды в Новороссийске"
            style={{ display: "block", filter: "grayscale(0.2)" }}
          />
        </div>
      </div>
    </Section>
  );
}
