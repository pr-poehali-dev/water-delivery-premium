import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const WA_LINK = "https://wa.me/79880000000?text=Здравствуйте!%20Хочу%20заказать%20воду%20в%20Новороссийске";
const PHONE_HREF = "tel:+79880000000";
const PHONE = "+7 (988) 000-00-00";

// ── Fade hook ────────────────────────────────────────────────────────────────
function useFade(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(14px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    },
  };
}

// ── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, children, bg = "#fff", py = "clamp(56px,7vw,96px)" }: {
  id?: string; children: React.ReactNode; bg?: string; py?: string;
}) {
  return (
    <section id={id} style={{ background: bg, paddingTop: py, paddingBottom: py }}>
      <div className="section-wrap">{children}</div>
    </section>
  );
}

function SectionHeader({ label, title }: { label: string; title: React.ReactNode }) {
  const f = useFade();
  return (
    <div ref={f.ref} style={f.style} className="mb-12">
      <p className="t-label mb-3">{label}</p>
      <h2 className="t-headline">{title}</h2>
    </div>
  );
}

// ── 1. Volumes ────────────────────────────────────────────────────────────────
const VOLUMES = [
  {
    vol: "19 л",
    title: "Бутылированная вода",
    use: "Дом, офис, кулер",
    price: "от 150 ₽",
    detail: "Питьевая вода в стандартных 19-литровых бутылях для домашнего и офисного кулера.",
  },
  {
    vol: "7,5 м³",
    title: "Малый объём",
    use: "Дача, частный дом, баня",
    price: "уточняйте",
    detail: "Оптимально для заполнения накопительных ёмкостей на дачных участках и частных домах.",
  },
  {
    vol: "10 м³",
    title: "Средний объём",
    use: "Офисы, стройки, бизнес",
    price: "уточняйте",
    detail: "Техническая или питьевая вода для коммерческих объектов, строительных площадок и предприятий.",
  },
];

type VolumeItem = typeof VOLUMES[0];
type ServiceItem = { title: string; desc: string; kw: string };
type WhyItem = { num: string; title: string; desc: string };
type FaqItem = { q: string; a: string };

function VolumeRow({ v, delay }: { v: VolumeItem; delay: number }) {
  const f = useFade(delay);
  return (
    <div ref={f.ref} style={f.style} className="volume-row">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 flex-1">
        <span style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--ink)", minWidth: 90, flexShrink: 0 }}>
          {v.vol}
        </span>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)" }}>{v.title}</div>
          <div className="t-small mt-1">{v.detail}</div>
        </div>
      </div>
      <div className="text-right ml-6 flex-shrink-0">
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em" }}>{v.price}</div>
        <div className="t-small" style={{ fontSize: 12 }}>{v.use}</div>
      </div>
    </div>
  );
}

function VolumesSection() {
  return (
    <Section id="volumes" bg="#F9FAFB">
      <SectionHeader label="Объёмы доставки воды" title="Доставка воды Новороссийск 19 литров" />
      <div>
        {VOLUMES.map((v, i) => <VolumeRow key={v.vol} v={v} delay={i * 60} />)}
      </div>
    </Section>
  );
}

// ── 2. Services ───────────────────────────────────────────────────────────────
const SERVICES: (ServiceItem & { icon: string; tag?: string; tagColor?: string })[] = [
  {
    icon: "Home",
    title: "Доставка воды на дом",
    desc: "19-литровые бутыли с питьевой водой — для домашнего кулера или приготовления пищи. Без минимального заказа.",
    kw: "вода на дом Новороссийск",
  },
  {
    icon: "Building2",
    title: "Доставка воды в офис",
    desc: "Регулярные поставки питьевой воды для офисных кулеров. Заключаем договор, выставляем счёт.",
    kw: "вода в офис",
  },
  {
    icon: "Zap",
    title: "Срочная доставка воды",
    desc: "Выезд в течение 1–3 часов по Новороссийску и пригородам. Работаем круглосуточно.",
    kw: "срочная доставка воды",
    tag: "Срочно",
    tagColor: "#DC2626",
  },
  {
    icon: "Droplets",
    title: "Доставка воды 19 литров",
    desc: "Стандартные бутыли для любых кулеров. Тара в аренду или выкуп. Приём пустой тары при доставке.",
    kw: "доставка воды 19 литров",
  },
  {
    icon: "HardHat",
    title: "Вода для строек и бизнеса",
    desc: "Технические объёмы 7,5 м³ и 10 м³ для строительных площадок, предприятий, складов.",
    kw: "техническая вода Новороссийск",
  },
  {
    icon: "Waves",
    title: "Наполнение бассейнов",
    desc: "Быстрое наполнение частных и коммерческих бассейнов. Рассчитаем нужный объём бесплатно.",
    kw: "наполнение бассейнов водой",
  },
];

function ServiceCard({ s, delay }: { s: typeof SERVICES[0]; delay: number }) {
  const f = useFade(delay);
  return (
    <div
      ref={f.ref}
      style={{
        ...f.style,
        background: "white",
        border: "1px solid #EAECF0",
        borderRadius: 16,
        padding: "24px",
        transition: `${f.style.transition}, box-shadow 0.2s ease, border-color 0.2s ease`,
        cursor: "default",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#D1D5DB";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#EAECF0";
      }}
    >
      {/* Icon + tag row */}
      <div className="flex items-start justify-between mb-4">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#F0F4FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name={s.icon} size={21} style={{ color: "#0071E3" }} />
        </div>
        {s.tag && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 9px",
              borderRadius: 100,
              background: "#FEF2F2",
              color: s.tagColor,
              border: "1px solid #FECACA",
              letterSpacing: "0.02em",
            }}
          >
            {s.tag}
          </span>
        )}
      </div>

      {/* Text */}
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "var(--ink)",
          marginBottom: 8,
          lineHeight: 1.3,
        }}
      >
        {s.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink-secondary)" }}>{s.desc}</p>
    </div>
  );
}

function ServicesSection() {
  return (
    <Section id="services" bg="#F9FAFB">
      <SectionHeader label="Услуги" title="Что мы доставляем" />

      {/* Desktop & Mobile: responsive grid — 2 cols on md, 1 on mobile */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))" }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} s={s} delay={i * 60} />
        ))}
      </div>
    </Section>
  );
}

// ── 3. Pricing ────────────────────────────────────────────────────────────────
function PricingSection() {
  const f1 = useFade(0);
  const f2 = useFade(80);
  const f3 = useFade(160);

  return (
    <Section id="pricing" bg="#F9FAFB">
      <SectionHeader label="Цены" title="Прозрачная стоимость" />

      <div ref={f1.ref} style={f1.style} className="mb-10">
        <div style={{ fontSize: "clamp(42px,7vw,80px)", fontWeight: 600, letterSpacing: "-0.05em", color: "var(--ink)", lineHeight: 1 }}>
          от 150 ₽
        </div>
        <p className="t-body mt-3" style={{ maxWidth: 380 }}>
          за 19 литров питьевой воды.<br />Доставка по Новороссийску включена.
        </p>
      </div>

      <div ref={f2.ref} style={{ ...f2.style, maxWidth: 520 }} className="mb-8">
        {[
          ["19 л (бутыль)",    "от 150 ₽",   "питьевая вода, кулер"],
          ["7,5 м³ (водовоз)", "по запросу", "7 500 литров, дача, дом"],
          ["10 м³ (водовоз)",  "по запросу", "10 000 литров, бизнес, стройка"],
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

// ── 4. Why ────────────────────────────────────────────────────────────────────
const WHY_ITEMS: WhyItem[] = [
  { num: "01", title: "Быстрая доставка",  desc: "1–3 часа по Новороссийску. Экстренный выезд — в течение часа." },
  { num: "02", title: "Чистая вода",       desc: "Соответствие СанПиН. Сертификаты качества прилагаются по запросу." },
  { num: "03", title: "Местный сервис",    desc: "15 лет работы в Новороссийске. Собственный транспорт, без посредников." },
  { num: "04", title: "Прозрачные цены",   desc: "Цена при заказе — финальная. Никаких скрытых платежей и сюрпризов." },
];

function WhyCard({ w, delay }: { w: WhyItem; delay: number }) {
  const f = useFade(delay);
  return (
    <div ref={f.ref} style={f.style} className="why-card">
      <div className="t-label mb-3">{w.num}</div>
      <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: 8 }}>
        {w.title}
      </h3>
      <p className="t-small" style={{ lineHeight: 1.65 }}>{w.desc}</p>
    </div>
  );
}

function WhySection() {
  return (
    <Section id="why">
      <SectionHeader label="Преимущества" title="Почему выбирают нас" />
      <div className="grid md:grid-cols-2 gap-x-12">
        {WHY_ITEMS.map((w, i) => <WhyCard key={w.num} w={w} delay={i * 70} />)}
      </div>
    </Section>
  );
}

// ── 5. Area ───────────────────────────────────────────────────────────────────
const ZONES = [
  "Центр Новороссийска", "Мысхако", "Цемдолина", "Малая Земля",
  "Пролетарский район", "Гайдук", "Верхнебаканский", "Анапский район",
];

function AreaSection() {
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

// ── 6. FAQ ────────────────────────────────────────────────────────────────────
const FAQS: FaqItem[] = [
  { q: "Как быстро приедет водовоз?", a: "В большинстве районов Новороссийска — 1–2 часа с момента подтверждения заявки. Мысхако, Цемдолина и отдалённые посёлки — до 3 часов. Принимаем заявки круглосуточно." },
  { q: "Какой минимальный объём заказа воды?", a: "Для 19-литровых бутылей — одна бутыль. Для водовоза — от 5 м³ (5 000 литров). Слив воды включён в стоимость." },
  { q: "Доставляете воду 19 литров на дом?", a: "Да. Привозим прямо до двери. Забираем пустые бутыли при следующей доставке." },
  { q: "Какие документы предоставляете?", a: "Товарная накладная, счёт-фактура (для юрлиц и ИП), сертификаты качества воды — по запросу." },
  { q: "Как оплатить?", a: "Наличными, картой или банковским переводом. Для организаций — по счёту. Оплата после доставки." },
  { q: "Что такое 7.5 м³ и 10 м³ воды?", a: "Это объём водовоза — 7 500 или 10 000 литров. Подходит для заполнения накопительных ёмкостей, бассейнов, нужд строительства и производства." },
];

function FaqRow({ item, isOpen, onToggle, delay }: { item: FaqItem; isOpen: boolean; onToggle: () => void; delay: number }) {
  const f = useFade(delay);
  return (
    <div ref={f.ref} style={f.style} className="faq-item">
      <button className="faq-btn" onClick={onToggle}>
        <span style={{ fontSize: 16, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em", paddingRight: 16 }}>
          {item.q}
        </span>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: "var(--surface-3)", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s ease", transform: isOpen ? "rotate(45deg)" : "none",
        }}>
          <Icon name="Plus" size={14} style={{ color: "var(--ink)" }} />
        </div>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p className="t-body" style={{ fontSize: 15 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const header = useFade(0);

  return (
    <Section id="faq">
      <div ref={header.ref} style={header.style} className="mb-12">
        <p className="t-label mb-3">Частые вопросы</p>
        <h2 className="t-headline">FAQ</h2>
      </div>
      <div style={{ maxWidth: 680 }}>
        {FAQS.map((item, i) => (
          <FaqRow
            key={i}
            item={item}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
            delay={i * 50}
          />
        ))}
      </div>
    </Section>
  );
}

// ── 7. Contact ───────────────────────────────────────────────────────────────
function ContactSection() {
  const f1 = useFade(0);
  const f2 = useFade(100);

  return (
    <section
      id="contact"
      style={{ background: "var(--ink)", paddingTop: "clamp(64px,8vw,112px)", paddingBottom: "clamp(64px,8vw,112px)" }}
    >
      <div className="section-wrap">
        <div ref={f1.ref} style={f1.style} className="mb-10">
          <p className="t-label mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Контакты</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 600, letterSpacing: "-0.04em", color: "white", lineHeight: 1.1, maxWidth: 560 }}>
            Закажите воду прямо сейчас
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", marginTop: 16, maxWidth: 420, lineHeight: 1.65 }}>
            Выезжаем в течение 1–3 часов. Работаем без выходных.
          </p>
        </div>

        <div ref={f2.ref} style={f2.style} className="flex flex-col sm:flex-row flex-wrap gap-3 mb-14">
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn-wa text-base px-8 py-3.5">
            <Icon name="MessageCircle" size={18} /> Написать в WhatsApp
          </a>
          <a href={PHONE_HREF}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-medium text-white transition-all hover:bg-white/10"
            style={{ border: "1.5px solid rgba(255,255,255,0.25)", letterSpacing: "-0.01em" }}>
            <Icon name="Phone" size={16} /> {PHONE}
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
              <Icon name="Droplets" size={13} className="text-white" />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>АкваСервис Новороссийск</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © 2024 · Доставка воды в Новороссийске · Работаем 24/7
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Floating WhatsApp ────────────────────────────────────────────────────────
function FloatingWA() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener" title="Написать в WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
      style={{ width: 52, height: 52, borderRadius: "50%", background: "#1DB954", boxShadow: "0 4px 20px rgba(29,185,84,0.45)" }}>
      <Icon name="MessageCircle" size={24} />
    </a>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function AppleContent() {
  return (
    <>
      <VolumesSection />
      <ServicesSection />
      <PricingSection />
      <WhySection />
      <AreaSection />
      <FaqSection />
      <ContactSection />
      <FloatingWA />
    </>
  );
}