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
    vol: "7,5 м³",
    title: "Малый водовоз",
    use: "Дача, частный дом, баня",
    price: "по запросу",
    detail: "7 500 литров — оптимально для заполнения накопительных ёмкостей на дачах и частных домах.",
  },
  {
    vol: "10 м³",
    title: "Стандартный водовоз",
    use: "Стройки, бизнес, предприятия",
    price: "по запросу",
    detail: "10 000 литров технической или питьевой воды для строительных площадок и коммерческих объектов.",
  },
  {
    vol: "20+ м³",
    title: "Крупные объёмы",
    use: "Производство, пожаротушение",
    price: "по запросу",
    detail: "Несколько рейсов подряд для заполнения больших резервуаров, промышленных нужд и пожарных запасов.",
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
      <SectionHeader label="Объёмы водовозов" title="Выберите нужный объём" />
      <div>
        {VOLUMES.map((v, i) => <VolumeRow key={v.vol} v={v} delay={i * 60} />)}
      </div>
    </Section>
  );
}

// ── 2. Services ───────────────────────────────────────────────────────────────
const SERVICES: (ServiceItem & { icon: string; tag?: string; tagColor?: string })[] = [
  {
    icon: "HardHat",
    title: "Вода на стройку",
    desc: "Техническая вода для строительных работ — замес бетона, уплотнение грунта, пылеподавление. Объёмы 7,5 и 10 м³.",
    kw: "техническая вода на стройку Новороссийск",
  },
  {
    icon: "Home",
    title: "Водоснабжение частного дома",
    desc: "Заполнение накопительных ёмкостей и резервуаров на дачах и частных домах. Быстро и без лишних затрат.",
    kw: "водоснабжение частного дома водовоз Новороссийск",
  },
  {
    icon: "Waves",
    title: "Наполнение бассейнов",
    desc: "Быстрое наполнение частных и коммерческих бассейнов любого объёма. Рассчитаем количество рейсов бесплатно.",
    kw: "наполнение бассейна водовозом Новороссийск",
  },
  {
    icon: "Zap",
    title: "Срочная подача воды",
    desc: "Экстренный выезд при аварии или пересыхании скважины. Работаем круглосуточно, без выходных.",
    kw: "срочная доставка воды водовоз",
    tag: "24 / 7",
    tagColor: "#DC2626",
  },
  {
    icon: "Factory",
    title: "Промышленные объекты",
    desc: "Регулярные поставки воды для предприятий, складов и производств. Договор, счёт, закрывающие документы.",
    kw: "промышленная вода водовоз Новороссийск",
  },
  {
    icon: "Flame",
    title: "Пожарный запас воды",
    desc: "Заполнение пожарных резервуаров и водоёмов для объектов, удалённых от центрального водоснабжения.",
    kw: "пожарный резервуар заполнение водой Новороссийск",
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
      <SectionHeader label="Услуги" title="Куда доставляем водовоз" />

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

// ── 4. How it works (3 steps) ─────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    icon: "MessageCircle",
    title: "Оставьте заявку",
    desc: "Напишите в WhatsApp или позвоните. Скажите адрес и нужный объём — рассчитаем стоимость за минуту.",
  },
  {
    num: "02",
    icon: "Truck",
    title: "Водовоз выедет",
    desc: "Подтверждаем время выезда. В большинстве случаев доставляем в течение 1–3 часов.",
  },
  {
    num: "03",
    icon: "Droplets",
    title: "Вода на объекте",
    desc: "Водитель сливает воду в вашу ёмкость. Оплата после доставки — наличными или картой.",
  },
];

function StepCard({ s, i, delay }: { s: typeof STEPS[0]; i: number; delay: number }) {
  const f = useFade(delay);
  const accent = i === 1;
  return (
    <div
      ref={f.ref}
      style={{
        ...f.style,
        background: accent ? "#0071E3" : "#F9FAFB",
        border: accent ? "none" : "1px solid #EAECF0",
        borderRadius: 20,
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Num + icon row */}
      <div className="flex items-center justify-between mb-5">
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: accent ? "rgba(255,255,255,0.55)" : "#0071E3",
            background: accent ? "rgba(255,255,255,0.15)" : "#EFF6FF",
            borderRadius: 100,
            padding: "5px 12px",
          }}
        >
          {s.num}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: accent ? "rgba(255,255,255,0.15)" : "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={s.icon} size={21} style={{ color: accent ? "white" : "#0071E3" }} />
        </div>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: accent ? "white" : "var(--ink)", marginBottom: 10, lineHeight: 1.25 }}>
        {s.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.65, color: accent ? "rgba(255,255,255,0.75)" : "var(--ink-secondary)" }}>
        {s.desc}
      </p>
    </div>
  );
}

function HowSection() {
  return (
    <Section id="how" bg="#fff">
      <SectionHeader label="Как это работает" title={<>Три шага до<br />воды на объекте</>} />

      {/* Desktop: 3 cols / Mobile: single column cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {STEPS.map((s, i) => <StepCard key={s.num} s={s} i={i} delay={i * 80} />)}
      </div>

      {/* Mobile CTA after steps */}
      <div className="md:hidden mt-6">
        <a
          href={WA_LINK} target="_blank" rel="noopener"
          className="flex items-center justify-center gap-2 w-full"
          style={{
            background: "#0071E3",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            padding: "17px 24px",
            borderRadius: 16,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          <Icon name="MessageCircle" size={19} />
          Заказать водовоз
        </a>
      </div>
    </Section>
  );
}

// ── 5. Why ────────────────────────────────────────────────────────────────────
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

function WhySection() {
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
  { q: "Какой минимальный объём заказа?", a: "Минимальный рейс — 7,5 м³ (7 500 литров). Слив воды и подъезд к объекту включены в стоимость." },
  { q: "Сколько стоит доставка водовоза?", a: "Цена зависит от объёма и адреса. Уточните стоимость в WhatsApp — ответим за несколько минут и рассчитаем точную цену." },
  { q: "Как заполнить бассейн водовозом?", a: "Укажите объём бассейна — рассчитаем количество рейсов. Средний бассейн 30–50 м³ заполняем за 3–5 рейсов. Можем организовать несколько машин одновременно." },
  { q: "Какие документы предоставляете?", a: "Товарная накладная, счёт-фактура (для юрлиц и ИП), сертификаты качества воды — по запросу." },
  { q: "Как оплатить?", a: "Наличными, картой или банковским переводом. Для организаций — по счёту. Оплата после доставки." },
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
            Закажите водовоз прямо сейчас
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", marginTop: 16, maxWidth: 420, lineHeight: 1.65 }}>
            От 7,5 м³ воды на ваш объект. Выезжаем в течение 1–3 часов, работаем без выходных.
          </p>
        </div>

        <div ref={f2.ref} style={f2.style} className="mb-14">
          {/* Mobile: full-width stacked / Desktop: inline row */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={WA_LINK} target="_blank" rel="noopener"
              className="btn-wa sm:w-auto w-full justify-center"
              style={{ fontSize: 16, padding: "17px 32px", borderRadius: 16 }}
            >
              <Icon name="MessageCircle" size={19} /> Написать в WhatsApp
            </a>
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 sm:w-auto w-full transition-all hover:bg-white/10"
              style={{
                fontSize: 16,
                fontWeight: 600,
                padding: "16px 28px",
                borderRadius: 16,
                border: "1.5px solid rgba(255,255,255,0.25)",
                color: "white",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              <Icon name="Phone" size={18} /> {PHONE}
            </a>
          </div>

          {/* Mobile only: объём-подсказка */}
          <div
            className="md:hidden mt-4 flex items-center gap-2 justify-center"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}
          >
            <Icon name="Info" size={13} />
            Минимальный объём — 7,5 м³ (7 500 литров)
          </div>
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
      <HowSection />
      <WhySection />
      <PricingSection />
      <AreaSection />
      <FaqSection />
      <ContactSection />
      <FloatingWA />
    </>
  );
}