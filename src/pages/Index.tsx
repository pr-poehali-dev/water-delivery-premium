import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_IMG = "https://cdn.poehali.dev/projects/66c3eddf-e576-4e82-b662-ae8fabc5f460/files/f13a39de-3ec0-452b-850b-b34126ec5ea6.jpg";
const WA_LINK = "https://wa.me/79880000000?text=Здравствуйте!%20Хочу%20заказать%20воду%20в%20Новороссийске";
const PHONE = "+7 (988) 000-00-00";
const PHONE_HREF = "tel:+79880000000";

// ─── Intersection fade ────────────────────────────────────────────────────────
function FadeSection({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.07 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(22px)", transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "Droplets",    label: "Питьевая вода",       desc: "Чистая вода для дома, офиса, кулеров и приготовления пищи.", hot: true },
  { icon: "Wrench",      label: "Техническая вода",     desc: "Для строительства, мойки, орошения и промышленных нужд.", hot: false },
  { icon: "Waves",       label: "Наполнение бассейнов", desc: "Любой объём. Бесплатный расчёт количества воды.", hot: false },
  { icon: "HardHat",     label: "Стройплощадки",        desc: "Регулярные поставки. Договор, накладные, счёт-фактура.", hot: false },
  { icon: "Zap",         label: "Срочная подача",       desc: "Выезд за 60 мин при нехватке воды. Круглосуточно.", hot: true },
  { icon: "Building2",   label: "Кафе и гостиницы",     desc: "Доставка для HoReCa и коммерческих объектов города.", hot: false },
];

const WHY = [
  { icon: "Timer",        title: "За 1–3 часа",         desc: "Собственный автопарк в Новороссийске — не ждёте посредников." },
  { icon: "Truck",        title: "Свой транспорт",      desc: "Наши водители и машины. Полный контроль качества сервиса." },
  { icon: "ShieldCheck",  title: "Документы и СанПиН",  desc: "Накладные, сертификаты, счёт-фактура для юрлиц." },
  { icon: "Headphones",   title: "24/7 без выходных",   desc: "Принимаем заявки ночью и в праздники. Экстренный выезд." },
];

const STEPS = [
  { n: "01", title: "Позвоните или напишите", desc: "Укажите адрес, объём и тип воды. Отвечаем мгновенно." },
  { n: "02", title: "Подтверждаем заявку",    desc: "Диспетчер фиксирует заказ, водовоз выезжает за 30–60 мин." },
  { n: "03", title: "Получаете воду",         desc: "Доставка, слив и документы — всё включено в стоимость." },
];

const CLIENTS = [
  { icon: "Home",             label: "Частные дома" },
  { icon: "HardHat",          label: "Стройки" },
  { icon: "Building2",        label: "Гостиницы" },
  { icon: "Waves",            label: "Бассейны" },
  { icon: "UtensilsCrossed",  label: "Кафе и рестораны" },
  { icon: "Factory",          label: "Предприятия" },
  { icon: "Leaf",             label: "Фермерские хозяйства" },
  { icon: "TreePine",         label: "Дачные посёлки" },
];

const PRICES = [
  { vol: "5 м³",  price: "от 1 800 ₽", sub: "Питьевая вода",    pop: false },
  { vol: "10 м³", price: "от 3 200 ₽", sub: "Любой тип воды",   pop: true  },
  { vol: "20 м³", price: "от 5 500 ₽", sub: "Техническая вода", pop: false },
];

const FAQS = [
  { q: "Как быстро приедет водовоз?",         a: "В большинстве районов Новороссийска — 1–2 часа. Мысхако, Цемдолина, отдалённые посёлки — до 3 часов. Ночной экстренный выезд доступен всегда." },
  { q: "Минимальный объём заказа?",           a: "От 5 м³. Бесплатный слив воды включён при любом объёме." },
  { q: "Есть ли документы на воду?",          a: "Да — накладные, счёт-фактура, сертификаты качества. Работаем с ИП и юридическими лицами." },
  { q: "Доставляете в выходные и праздники?", a: "Работаем 7 дней в неделю, 365 дней в году. Заявки — круглосуточно." },
  { q: "Как оплатить?",                       a: "Наличными, по карте или безналичным переводом для организаций. Оплата после доставки." },
];

const ZONES = ["Центр", "Мысхако", "Цемдолина", "Малая Земля", "Пролетарский", "Гайдук", "В.-Баканский", "Анапский р-н"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Golos Text', system-ui, sans-serif", color: "#1A2332" }}>

      {/* ── TOP INFO BAR ── */}
      <div className="hidden md:block text-xs py-2 px-6" style={{ background: "#0D1B2A", color: "rgba(255,255,255,0.7)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {[["MapPin","Новороссийск и пригороды"], ["Clock","Приём заявок 24/7"], ["ShieldCheck","Сертифицированная вода · СанПиН"]].map(([ic,tx]) => (
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
            {[["Услуги","#services"],["Цены","#prices"],["Как работаем","#how"],["FAQ","#faq"],["Контакты","#contacts"]].map(([l,h]) => (
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
            {[["Услуги","#services"],["Цены","#prices"],["Как работаем","#how"],["FAQ","#faq"],["Контакты","#contacts"]].map(([l,h]) => (
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

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section id="hero" style={{ background: "linear-gradient(160deg, #EBF5FF 0%, #F8FBFF 55%, #FFFFFF 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16 grid md:grid-cols-[1fr_1.05fr] gap-10 md:gap-12 items-center">

          {/* Left copy */}
          <div className="space-y-5 order-2 md:order-1">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: "#FFF0F0", color: "#C81E1E", border: "1px solid #FECACA" }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
              СРОЧНАЯ ПОДАЧА ВОДЫ · ОТ 1 ЧАСА
            </div>

            <h1 style={{ fontSize: "clamp(32px,5.5vw,58px)", fontWeight: 800, lineHeight: 1.08, color: "#0D1B2A" }}>
              Доставка воды<br />
              <span style={{ color: "#0077CC" }}>в Новороссийске</span><br />
              <span style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 600, color: "#475569" }}>за 1–3 часа</span>
            </h1>

            <p className="text-base leading-relaxed max-w-md" style={{ color: "#64748B" }}>
              Питьевая и техническая вода водовозом. Частные дома, стройки,
              бассейны, предприятия. Собственный транспорт — без посредников.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href={WA_LINK} target="_blank" rel="noopener"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-[.98]"
                style={{ background: "#25D366", boxShadow: "0 6px 20px rgba(37,211,102,0.38)" }}>
                <Icon name="MessageCircle" size={20} />
                Заказать в WhatsApp
              </a>
              <a href={PHONE_HREF}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-bold transition-all hover:bg-blue-50 hover:-translate-y-0.5"
                style={{ color: "#0077CC", border: "2px solid #0077CC", background: "white" }}>
                <Icon name="Phone" size={20} />
                {PHONE}
              </a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { ic: "Truck",       tx: "Свой автопарк" },
                { ic: "Clock3",      tx: "Работаем 24/7" },
                { ic: "Star",        tx: "500+ клиентов" },
                { ic: "FileText",    tx: "Документы" },
              ].map(({ ic, tx }) => (
                <div key={tx} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#EBF5FF", color: "#0077CC" }}>
                  <Icon name={ic} size={13} /> {tx}
                </div>
              ))}
            </div>
          </div>

          {/* Right: truck photo */}
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 28px 64px rgba(0,119,204,0.14), 0 4px 16px rgba(0,0,0,0.06)" }}>
              <img src={TRUCK_IMG} alt="Водовоз в Новороссийске — доставка воды"
                className="w-full object-cover" style={{ aspectRatio: "16/11", display: "block" }} />

              {/* Floating: urgent */}
              <div className="absolute top-4 left-4 flex items-center gap-2.5 bg-white rounded-2xl px-3.5 py-2.5"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFF0F0" }}>
                  <Icon name="Zap" size={18} style={{ color: "#C81E1E" }} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "#0D1B2A" }}>Срочный выезд</div>
                  <div className="text-[11px]" style={{ color: "#64748B" }}>от 60 минут</div>
                </div>
              </div>

              {/* Floating: cert */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white rounded-xl px-3 py-2"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                <Icon name="ShieldCheck" size={17} style={{ color: "#0077CC" }} />
                <span className="text-xs font-semibold" style={{ color: "#0D1B2A" }}>СанПиН · документы</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="border-t" style={{ borderColor: "#DCE9F5" }}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { v: "15+",  l: "лет в Новороссийске" },
              { v: "500+", l: "довольных клиентов" },
              { v: "24/7", l: "приём заявок" },
              { v: "1–3 ч",l: "время доставки" },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="text-2xl md:text-3xl font-black" style={{ color: "#0077CC" }}>{v}</div>
                <div className="text-xs md:text-sm mt-0.5" style={{ color: "#94A3B8" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ SERVICES ══════════════════════════════ */}
      <section id="services" className="py-16 md:py-20 px-4 md:px-6" style={{ background: "#F7F9FC" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3" style={{ background: "#EBF5FF", color: "#0077CC" }}>
                УСЛУГИ
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#0D1B2A" }}>
                Что мы доставляем
              </h2>
              <p className="mt-2 text-base" style={{ color: "#64748B" }}>
                Питьевая и техническая вода для любых задач — по всему Новороссийску
              </p>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <FadeSection key={s.label} delay={i * 75}>
                <div className="bg-white rounded-2xl p-6 h-full transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,119,204,0.11)]"
                  style={{ border: "1px solid #E2EBF5" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "#EBF5FF" }}>
                      <Icon name={s.icon} size={22} style={{ color: "#0077CC" }} />
                    </div>
                    {s.hot && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: "#FFF0F0", color: "#C81E1E", border: "1px solid #FECACA" }}>
                        Срочно ⚡
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base mb-1.5" style={{ color: "#0D1B2A" }}>{s.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ WHY ══════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3" style={{ background: "#EBF5FF", color: "#0077CC" }}>
                ПРЕИМУЩЕСТВА
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#0D1B2A" }}>
                Почему выбирают нас
              </h2>
            </div>
          </FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, i) => (
              <FadeSection key={w.title} delay={i * 80}>
                <div className="text-center p-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#EBF5FF" }}>
                    <Icon name={w.icon} size={26} style={{ color: "#0077CC" }} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#0D1B2A" }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{w.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PRICES ══════════════════════════════ */}
      <section id="prices" className="py-16 md:py-20 px-4 md:px-6" style={{ background: "#F7F9FC" }}>
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3" style={{ background: "#EBF5FF", color: "#0077CC" }}>
                ЦЕНЫ
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#0D1B2A" }}>
                Прозрачная стоимость
              </h2>
              <p className="mt-2 text-sm" style={{ color: "#94A3B8" }}>
                Точная цена зависит от района доставки — уточните по телефону или в WhatsApp
              </p>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {PRICES.map((p, i) => (
              <FadeSection key={p.vol} delay={i * 80}>
                <div className={`relative text-center rounded-2xl p-7 transition-all ${p.pop ? "shadow-[0_8px_40px_rgba(0,119,204,0.18)]" : ""}`}
                  style={{
                    background: p.pop ? "#0077CC" : "white",
                    border: p.pop ? "none" : "2px solid #E2EBF5",
                  }}>
                  {p.pop && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: "#0D1B2A" }}>
                      Популярный
                    </div>
                  )}
                  <div className="text-4xl font-black mb-1" style={{ color: p.pop ? "white" : "#0D1B2A" }}>{p.vol}</div>
                  <div className="text-xs mb-4 font-medium" style={{ color: p.pop ? "rgba(255,255,255,0.7)" : "#94A3B8" }}>{p.sub}</div>
                  <div className="text-xl font-extrabold mb-1" style={{ color: p.pop ? "#7DD3FA" : "#0077CC" }}>{p.price}</div>
                  <div className="text-xs" style={{ color: p.pop ? "rgba(255,255,255,0.55)" : "#94A3B8" }}>вкл. доставка и слив</div>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection delay={220}>
            <div className="mt-8 text-center">
              <a href={WA_LINK} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#25D366" }}>
                <Icon name="MessageCircle" size={18} /> Узнать точную цену в WhatsApp
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════ HOW IT WORKS ══════════════════════════════ */}
      <section id="how" className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeSection>
            <div className="text-center mb-12">
              <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3" style={{ background: "#EBF5FF", color: "#0077CC" }}>
                КАК РАБОТАЕМ
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#0D1B2A" }}>
                3 шага до доставки
              </h2>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-4 relative">
            <div className="hidden md:block absolute top-5 left-[19%] right-[19%] h-0.5" style={{ background: "#DBEAFE" }} />
            {STEPS.map((s, i) => (
              <FadeSection key={s.n} delay={i * 110} className="text-center relative px-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 font-black text-lg text-white"
                  style={{ background: "#0077CC" }}>{s.n}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#0D1B2A" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{s.desc}</p>
              </FadeSection>
            ))}
          </div>

          <FadeSection delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "#25D366" }}>
                <Icon name="MessageCircle" size={18} /> Заказать сейчас
              </a>
              <a href={PHONE_HREF}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold"
                style={{ color: "#0077CC", border: "2px solid #0077CC" }}>
                <Icon name="Phone" size={18} /> {PHONE}
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════ CLIENTS ══════════════════════════════ */}
      <section className="py-14 px-4 md:px-6" style={{ background: "#0D1B2A" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Кто заказывает воду</h2>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Частные и корпоративные клиенты по всему Новороссийску</p>
            </div>
          </FadeSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CLIENTS.map((c, i) => (
              <FadeSection key={c.label} delay={i * 55}>
                <div className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all hover:bg-white/5 cursor-default"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,119,204,0.3)" }}>
                    <Icon name={c.icon} size={21} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">{c.label}</span>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ ZONES ══════════════════════════════ */}
      <section className="py-12 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
          <FadeSection className="flex-shrink-0 w-full md:w-64">
            <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ background: "#EBF5FF", color: "#0077CC" }}>
              ЗОНЫ ДОСТАВКИ
            </div>
            <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#0D1B2A" }}>Охватываем весь город</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {ZONES.map(z => (
                <div key={z} className="flex items-center gap-1.5 text-sm" style={{ color: "#475569" }}>
                  <Icon name="Check" size={13} style={{ color: "#0077CC" }} /> {z}
                </div>
              ))}
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "#0077CC" }}>
              <Icon name="MessageCircle" size={15} /> Уточнить свой район
            </a>
          </FadeSection>

          <FadeSection delay={100} className="flex-1 w-full rounded-2xl overflow-hidden" style={{ height: 280, border: "1px solid #E2EBF5" }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.768%2C44.723&z=12&l=map"
              width="100%" height="100%" frameBorder="0" allowFullScreen title="Карта доставки Новороссийск"
              style={{ display: "block", filter: "saturate(0.85) brightness(1.02)" }}
            />
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════ FAQ ══════════════════════════════ */}
      <section id="faq" className="py-16 md:py-20 px-4 md:px-6" style={{ background: "#F7F9FC" }}>
        <div className="max-w-2xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3" style={{ background: "#EBF5FF", color: "#0077CC" }}>
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#0D1B2A" }}>Частые вопросы</h2>
            </div>
          </FadeSection>
          <div className="space-y-2">
            {FAQS.map((item, i) => (
              <FadeSection key={i} delay={i * 55}>
                <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1px solid #E2EBF5" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-sm md:text-[15px]" style={{ color: "#0D1B2A" }}>{item.q}</span>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        background: openFaq === i ? "#0077CC" : "#EBF5FF",
                        transform: openFaq === i ? "rotate(45deg)" : "none"
                      }}>
                      <Icon name="Plus" size={13} style={{ color: openFaq === i ? "white" : "#0077CC" }} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#64748B", borderTop: "1px solid #F1F5F9", paddingTop: 14 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CTA BANNER ══════════════════════════════ */}
      <section className="py-14 px-4 md:px-6" style={{ background: "linear-gradient(135deg, #0057A0 0%, #0077CC 50%, #0095E8 100%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <FadeSection>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <span className="text-xs font-bold tracking-wider text-green-300">ПРИНИМАЕМ ЗАЯВКИ СЕЙЧАС</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Нужна вода прямо сейчас?
            </h2>
            <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.72)" }}>
              Выедем в течение 1 часа. Работаем круглосуточно, без выходных.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "#25D366", boxShadow: "0 6px 20px rgba(37,211,102,0.35)" }}>
                <Icon name="MessageCircle" size={20} /> Написать в WhatsApp
              </a>
              <a href={PHONE_HREF}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
                <Icon name="Phone" size={20} /> {PHONE}
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ══════════════════════════════ CONTACTS ══════════════════════════════ */}
      <section id="contacts" className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <div className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3" style={{ background: "#EBF5FF", color: "#0077CC" }}>
                КОНТАКТЫ
              </div>
              <h2 className="text-3xl font-extrabold" style={{ color: "#0D1B2A" }}>Свяжитесь с нами</h2>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { ic: "Phone",   t: "Телефон",      lines: [PHONE, "+7 (8617) 00-00-00"], href: PHONE_HREF, cta: "Позвонить" },
              { ic: "Clock",   t: "Режим работы", lines: ["Ежедневно 00:00 – 24:00", "Приём заявок круглосуточно"], href: null, cta: null },
              { ic: "MapPin",  t: "Зона доставки",lines: ["Новороссийск и пригороды", "Мысхако, Цемдолина, Анапа"], href: null, cta: null },
            ].map((c, i) => (
              <FadeSection key={c.t} delay={i * 80}>
                <div className="rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,119,204,0.09)]"
                  style={{ border: "1px solid #E2EBF5" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "#EBF5FF" }}>
                    <Icon name={c.ic} size={22} style={{ color: "#0077CC" }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#0D1B2A" }}>{c.t}</h3>
                  {c.lines.map((l, j) => <p key={j} className="text-sm" style={{ color: "#64748B" }}>{l}</p>)}
                  {c.href && (
                    <a href={c.href} className="inline-block mt-3 text-sm font-bold" style={{ color: "#0077CC" }}>{c.cta} →</a>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-7 px-4 md:px-6" style={{ background: "#F7F9FC", borderColor: "#E2EBF5" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#0077CC" }}>
              <Icon name="Droplets" size={15} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "#0D1B2A" }}>АкваСервис Новороссийск</span>
          </div>
          <p className="text-xs text-center" style={{ color: "#94A3B8" }}>
            © 2024 АкваСервис · Доставка воды в Новороссийске · Работаем 24/7
          </p>
          <div className="flex gap-2">
            <a href={WA_LINK} target="_blank" rel="noopener"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: "#25D366" }}>
              <Icon name="MessageCircle" size={13} /> WhatsApp
            </a>
            <a href={PHONE_HREF}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold"
              style={{ color: "#0077CC", border: "1.5px solid #0077CC" }}>
              <Icon name="Phone" size={13} /> Позвонить
            </a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WA ── */}
      <a href={WA_LINK} target="_blank" rel="noopener"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: "#25D366", boxShadow: "0 6px 24px rgba(37,211,102,0.5)" }}
        title="Написать в WhatsApp">
        <Icon name="MessageCircle" size={26} />
      </a>

    </div>
  );
}
