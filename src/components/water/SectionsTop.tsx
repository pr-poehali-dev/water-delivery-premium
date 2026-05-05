import Icon from "@/components/ui/icon";
import { useFade, Section, SectionHeader, WA_LINK } from "./shared";

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

export function VolumesSection() {
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
type ServiceItem = { title: string; desc: string; kw: string; icon: string; tag?: string; tagColor?: string };

const SERVICES: ServiceItem[] = [
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

function ServiceCard({ s, delay }: { s: ServiceItem; delay: number }) {
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

export function ServicesSection() {
  return (
    <Section id="services" bg="#F9FAFB">
      <SectionHeader label="Услуги" title="Куда доставляем водовоз" />
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

// ── 3. How it works ───────────────────────────────────────────────────────────
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
      <div style={{ position: "absolute", top: -10, right: 16, fontSize: 80, fontWeight: 800, letterSpacing: "-0.05em", color: accent ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
        {s.num}
      </div>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: accent ? "rgba(255,255,255,0.15)" : "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Icon name={s.icon} size={22} style={{ color: accent ? "white" : "#0071E3" }} />
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

export function HowSection() {
  return (
    <Section id="how" bg="#fff">
      <SectionHeader label="Как это работает" title={<>Три шага до<br />воды на объекте</>} />

      <div className="grid md:grid-cols-3 gap-4">
        {STEPS.map((s, i) => <StepCard key={s.num} s={s} i={i} delay={i * 80} />)}
      </div>

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
