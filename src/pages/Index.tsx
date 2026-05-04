import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TRUCK_IMG = "https://cdn.poehali.dev/projects/66c3eddf-e576-4e82-b662-ae8fabc5f460/files/7ead2ccd-7874-4f33-837d-5732810216c8.jpg";

const WA_LINK = "https://wa.me/79880000000?text=Здравствуйте!%20Хочу%20заказать%20воду%20в%20Новороссийске";
const PHONE = "+7 (988) 000-00-00";
const PHONE_HREF = "tel:+79880000000";

function FadeSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`section-fade ${visible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const SERVICES = [
  { icon: "Droplets", title: "Питьевая вода", desc: "Чистая вода для дома, офиса и производства. Подходит для питья и приготовления пищи.", tag: "Хит" },
  { icon: "Wrench", title: "Техническая вода", desc: "Для строительства, мойки, пожаротушения и промышленных нужд. Любые объёмы.", tag: null },
  { icon: "Waves", title: "Наполнение бассейнов", desc: "Быстрое наполнение частных и коммерческих бассейнов. Рассчитаем объём бесплатно.", tag: null },
  { icon: "HardHat", title: "Строительные площадки", desc: "Регулярные поставки воды на стройку. Договор, документы, счёт-фактура.", tag: null },
  { icon: "Zap", title: "Экстренная доставка", desc: "Срочный выезд в течение 1 часа при нехватке воды. Работаем в любое время суток.", tag: "Срочно" },
  { icon: "Building2", title: "Предприятия и кафе", desc: "Доставка для ресторанов, кафе, гостиниц и промышленных предприятий города.", tag: null },
];

const WHY = [
  { icon: "Clock", title: "Доставка за 1–3 часа", desc: "Собственный автопарк водовозов в Новороссийске. Без посредников — быстрее и дешевле." },
  { icon: "Truck", title: "Собственный транспорт", desc: "Не перепродаём заявки. Наши водители, наши машины, наш контроль качества." },
  { icon: "ShieldCheck", title: "Качество гарантировано", desc: "Вода соответствует СанПиН. Документы и сертификаты прилагаются по запросу." },
  { icon: "Headphones", title: "Работаем 24/7", desc: "Принимаем заявки круглосуточно. Экстренный выезд доступен в любое время." },
];

const CLIENTS = [
  { icon: "Home", label: "Частные дома" },
  { icon: "HardHat", label: "Стройки" },
  { icon: "Building2", label: "Гостиницы" },
  { icon: "Waves", label: "Бассейны" },
  { icon: "UtensilsCrossed", label: "Кафе и рестораны" },
  { icon: "Factory", label: "Предприятия" },
  { icon: "Leaf", label: "Фермерские хозяйства" },
  { icon: "MapPin", label: "Дачные посёлки" },
];

const PRICES = [
  { vol: "5 м³", price: "от 1 800 ₽", note: "Питьевая", popular: false },
  { vol: "10 м³", price: "от 3 200 ₽", note: "Оптимально", popular: true },
  { vol: "20 м³", price: "от 5 500 ₽", note: "Техническая", popular: false },
];

const STEPS = [
  { n: "1", title: "Позвоните или напишите", desc: "Укажите адрес, объём и тип воды. Ответим мгновенно." },
  { n: "2", title: "Подтверждаем и выезжаем", desc: "Водовоз выезжает в течение 30–60 минут после заявки." },
  { n: "3", title: "Получаете воду", desc: "Доставка, слив, документы — всё включено в стоимость." },
];

const FAQS = [
  { q: "Как быстро приедет водовоз?", a: "В большинстве районов Новороссийска — 1–2 часа. В Мысхако, Цемдолину и отдалённые посёлки — до 3 часов. Экстренный выезд доступен круглосуточно." },
  { q: "Какой минимальный объём заказа?", a: "Минимальный заказ — 5 м³. Бесплатный слив воды включён в стоимость при любом объёме." },
  { q: "Есть ли документы на воду?", a: "Да. Предоставляем накладные, счёт-фактуру, сертификаты качества воды по запросу. Работаем с ИП и юрлицами." },
  { q: "Доставляете в выходные?", a: "Работаем 7 дней в неделю, включая праздники. Принимаем заявки и ночью." },
  { q: "Как оплатить?", a: "Наличными, по карте или безналичным переводом (для организаций). Оплата после доставки." },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-golos" style={{ color: "var(--brand-text)" }}>

      {/* ── TRUST BAR ── */}
      <div className="hidden md:block text-white text-xs py-2 px-6" style={{ background: "var(--brand-navy)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Icon name="MapPin" size={12} /> г. Новороссийск и пригороды</span>
            <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} /> Работаем 24/7</span>
            <span className="flex items-center gap-1.5"><Icon name="ShieldCheck" size={12} /> Документы и сертификаты</span>
          </div>
          <a href={PHONE_HREF} className="flex items-center gap-1.5 font-semibold hover:text-blue-300 transition-colors">
            <Icon name="Phone" size={12} /> {PHONE}
          </a>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-200 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-blue)" }}>
              <Icon name="Droplets" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-base leading-tight" style={{ color: "var(--brand-navy)" }}>АкваСервис</div>
              <div className="text-xs" style={{ color: "var(--brand-muted)" }}>Доставка воды</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "var(--brand-muted)" }}>
            {[["Услуги", "#services"], ["Цены", "#prices"], ["Как работаем", "#how"], ["FAQ", "#faq"], ["Контакты", "#contacts"]].map(([l, h]) => (
              <a key={l} href={h} className="hover:text-blue-600 transition-colors">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={PHONE_HREF} className="btn-outline text-sm px-4 py-2.5">
              <Icon name="Phone" size={15} /> {PHONE}
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn-whatsapp text-sm px-4 py-2.5">
              <Icon name="MessageCircle" size={15} /> WhatsApp
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={24} style={{ color: "var(--brand-navy)" }} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
            {[["Услуги", "#services"], ["Цены", "#prices"], ["Как работаем", "#how"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMobileMenu(false)} className="block py-2 font-medium text-sm" style={{ color: "var(--brand-text)" }}>{l}</a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <a href={WA_LINK} target="_blank" rel="noopener" className="btn-whatsapp py-3 text-sm w-full">
                <Icon name="MessageCircle" size={16} /> Написать в WhatsApp
              </a>
              <a href={PHONE_HREF} className="btn-outline py-3 text-sm w-full">
                <Icon name="Phone" size={16} /> Позвонить
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #EAF4FD 0%, #F7FBFF 60%, #FFFFFF 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div className="space-y-6 order-2 md:order-1">
            {/* Urgent badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
              Срочная подача воды · от 1 часа
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight" style={{ color: "var(--brand-navy)" }}>
              Доставка воды<br />
              <span style={{ color: "var(--brand-blue)" }}>в Новороссийске</span><br />
              <span className="text-3xl md:text-4xl font-medium" style={{ color: "var(--brand-muted)" }}>за 1–3 часа</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: "var(--brand-muted)" }}>
              Питьевая и техническая вода с доставкой водовозом. Частные дома, стройки, бассейны, предприятия.
              Собственный транспорт — без посредников.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener"
                className="btn-whatsapp text-base px-6 py-4 animate-pulse-ring">
                <Icon name="MessageCircle" size={20} />
                Заказать в WhatsApp
              </a>
              <a href={PHONE_HREF} className="btn-outline text-base px-6 py-4">
                <Icon name="Phone" size={20} />
                {PHONE}
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {[
                { icon: "Truck", text: "Свой автопарк" },
                { icon: "Clock", text: "24/7" },
                { icon: "Star", text: "500+ клиентов" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--brand-muted)" }}>
                  <Icon name={icon} size={15} style={{ color: "var(--brand-blue)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative order-1 md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: "0 24px 64px rgba(0,119,204,0.15)" }}>
              <img src={TRUCK_IMG} alt="Водовоз в Новороссийске" className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
              {/* Overlay tag */}
              <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#FEF2F2" }}>
                  <Icon name="Zap" size={16} style={{ color: "#DC2626" }} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--brand-navy)" }}>Срочный выезд</div>
                  <div className="text-xs" style={{ color: "var(--brand-muted)" }}>от 1 часа</div>
                </div>
              </div>
              {/* Bottom tag */}
              <div className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Icon name="ShieldCheck" size={18} style={{ color: "var(--brand-blue)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--brand-navy)" }}>Документы прилагаются</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t" style={{ borderColor: "#DDE8F5" }}>
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "15+", label: "лет в Новороссийске" },
              { val: "500+", label: "постоянных клиентов" },
              { val: "24/7", label: "приём заявок" },
              { val: "1–3 ч", label: "время доставки" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--brand-blue)" }}>{val}</div>
                <div className="text-xs md:text-sm mt-0.5" style={{ color: "var(--brand-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-16 md:py-20 px-4 md:px-6" style={{ background: "var(--brand-gray)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="badge-blue mb-3">Услуги</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--brand-navy)" }}>
                Что мы доставляем
              </h2>
              <p className="mt-3 text-base" style={{ color: "var(--brand-muted)" }}>
                Питьевая и техническая вода для любых задач в Новороссийске и пригородах
              </p>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <FadeSection key={s.title} delay={i * 80}>
                <div className="card-service p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-blue-light)" }}>
                      <Icon name={s.icon} size={22} style={{ color: "var(--brand-blue)" }} />
                    </div>
                    {s.tag && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={s.tag === "Срочно"
                          ? { background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }
                          : { background: "var(--brand-blue-light)", color: "var(--brand-blue)" }}>
                        {s.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--brand-navy)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="badge-blue mb-3">Преимущества</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--brand-navy)" }}>
                Почему выбирают нас
              </h2>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, i) => (
              <FadeSection key={w.title} delay={i * 90}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "var(--brand-blue-light)" }}>
                    <Icon name={w.icon} size={26} style={{ color: "var(--brand-blue)" }} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "var(--brand-navy)" }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>{w.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICES ── */}
      <section id="prices" className="py-16 md:py-20 px-4 md:px-6" style={{ background: "var(--brand-gray)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="badge-blue mb-3">Цены</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--brand-navy)" }}>
                Прозрачная стоимость
              </h2>
              <p className="mt-3 text-sm" style={{ color: "var(--brand-muted)" }}>Точная цена зависит от района доставки. Уточняйте по телефону.</p>
            </div>
          </FadeSection>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {PRICES.map((p, i) => (
              <FadeSection key={p.vol} delay={i * 80}>
                <div className={`price-card p-6 text-center relative ${p.popular ? "active" : ""}`}>
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "var(--brand-blue)" }}>
                      Популярный
                    </div>
                  )}
                  <div className="text-3xl font-bold mb-1" style={{ color: "var(--brand-navy)" }}>{p.vol}</div>
                  <div className="text-xs mb-3" style={{ color: "var(--brand-muted)" }}>{p.note}</div>
                  <div className="text-xl font-bold" style={{ color: "var(--brand-blue)" }}>{p.price}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--brand-muted)" }}>включая доставку</div>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection delay={200}>
            <div className="text-center mt-8">
              <a href={WA_LINK} target="_blank" rel="noopener" className="btn-whatsapp inline-flex px-7 py-3.5 text-sm">
                <Icon name="MessageCircle" size={18} />
                Узнать точную цену в WhatsApp
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeSection>
            <div className="text-center mb-12">
              <span className="badge-blue mb-3">Как работаем</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--brand-navy)" }}>
                3 шага до доставки
              </h2>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-0.5" style={{ background: "var(--brand-blue-light)" }} />

            {STEPS.map((s, i) => (
              <FadeSection key={s.n} delay={i * 120}>
                <div className="text-center px-4">
                  <div className="step-num mx-auto mb-4 relative z-10">{s.n}</div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "var(--brand-navy)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--brand-muted)" }}>{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection delay={300}>
            <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener" className="btn-whatsapp px-7 py-3.5 text-sm">
                <Icon name="MessageCircle" size={18} /> Заказать сейчас
              </a>
              <a href={PHONE_HREF} className="btn-outline px-7 py-3.5 text-sm">
                <Icon name="Phone" size={18} /> {PHONE}
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="py-14 px-4 md:px-6" style={{ background: "var(--brand-navy)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Кто заказывает воду</h2>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Работаем с частными и корпоративными клиентами</p>
            </div>
          </FadeSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CLIENTS.map((c, i) => (
              <FadeSection key={c.label} delay={i * 60}>
                <div className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,119,204,0.3)" }}>
                    <Icon name={c.icon} size={22} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">{c.label}</span>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="badge-blue mb-3">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ color: "var(--brand-navy)" }}>
                Частые вопросы
              </h2>
            </div>
          </FadeSection>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <FadeSection key={i} delay={i * 60}>
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #E8EFF7" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-sm md:text-base" style={{ color: "var(--brand-navy)" }}>{item.q}</span>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{
                        background: openFaq === i ? "var(--brand-blue)" : "var(--brand-blue-light)",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)"
                      }}>
                      <Icon name="Plus" size={13} style={{ color: openFaq === i ? "white" : "var(--brand-blue)" }} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--brand-muted)", borderTop: "1px solid #E8EFF7", paddingTop: 14 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-14 px-4 md:px-6" style={{ background: "linear-gradient(135deg, #0077CC 0%, #005FA3 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeSection>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Нужна вода прямо сейчас?
            </h2>
            <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              Оставьте заявку — выедем в течение 1 часа. Работаем круглосуточно.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener"
                className="btn-whatsapp px-8 py-4 text-base w-full sm:w-auto">
                <Icon name="MessageCircle" size={20} />
                Написать в WhatsApp
              </a>
              <a href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:bg-white/10 w-full sm:w-auto"
                style={{ border: "2px solid rgba(255,255,255,0.4)" }}>
                <Icon name="Phone" size={20} />
                {PHONE}
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-16 md:py-20 px-4 md:px-6" style={{ background: "var(--brand-gray)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-10">
              <span className="badge-blue mb-3">Контакты</span>
              <h2 className="text-3xl font-bold mt-2" style={{ color: "var(--brand-navy)" }}>Свяжитесь с нами</h2>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "Phone", title: "Телефон", lines: [PHONE, "+7 (8617) 00-00-00"], link: PHONE_HREF, linkText: "Позвонить" },
              { icon: "Clock", title: "Режим работы", lines: ["Ежедневно: 00:00 – 24:00", "Принимаем заявки 24/7"], link: null, linkText: null },
              { icon: "MapPin", title: "Зона доставки", lines: ["Новороссийск и пригороды", "Мысхако, Цемдолина, Анапа"], link: null, linkText: null },
            ].map((c, i) => (
              <FadeSection key={c.title} delay={i * 80}>
                <div className="card-service p-6 text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "var(--brand-blue-light)" }}>
                    <Icon name={c.icon} size={22} style={{ color: "var(--brand-blue)" }} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "var(--brand-navy)" }}>{c.title}</h3>
                  {c.lines.map((l, j) => <p key={j} className="text-sm" style={{ color: "var(--brand-muted)" }}>{l}</p>)}
                  {c.link && (
                    <a href={c.link} className="inline-block mt-3 text-sm font-semibold" style={{ color: "var(--brand-blue)" }}>{c.linkText} →</a>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-4 md:px-6 border-t bg-white" style={{ borderColor: "#E8EFF7" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--brand-blue)" }}>
              <Icon name="Droplets" size={15} className="text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "var(--brand-navy)" }}>АкваСервис Новороссийск</span>
          </div>
          <p className="text-xs text-center" style={{ color: "var(--brand-muted)" }}>
            © 2024 АкваСервис · Доставка воды в Новороссийске · Работаем 24/7
          </p>
          <div className="flex gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn-whatsapp px-4 py-2 text-xs">
              <Icon name="MessageCircle" size={14} /> WhatsApp
            </a>
            <a href={PHONE_HREF} className="btn-outline px-4 py-2 text-xs">
              <Icon name="Phone" size={14} /> Позвонить
            </a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WA BUTTON ── */}
      <a href={WA_LINK} target="_blank" rel="noopener"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
        style={{ background: "#25D366", boxShadow: "0 8px 30px rgba(37,211,102,0.5)" }}
        title="Написать в WhatsApp">
        <Icon name="MessageCircle" size={26} className="text-white" />
      </a>

    </div>
  );
}
