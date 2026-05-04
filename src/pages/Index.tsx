import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/66c3eddf-e576-4e82-b662-ae8fabc5f460/files/a1fee88c-7708-4683-a322-eb29afe591a7.jpg";

const VOLUMES = [
  { id: "19l", label: "19 л", desc: "Кулерная бутыль", price: "320 ₽", priceNum: 320 },
  { id: "10l", label: "10 л", desc: "Средний формат", price: "210 ₽", priceNum: 210 },
  { id: "5l", label: "5 л", desc: "Домашний", price: "130 ₽", priceNum: 130 },
  { id: "0.5l", label: "0.5 л × 12", desc: "Упаковка", price: "290 ₽", priceNum: 290 },
];

const SERVICES = [
  { icon: "Droplets", title: "Горная родниковая", desc: "Вода с предгорий Кавказа. Естественная минерализация, идеальный pH 7.2–7.6.", badge: "Хит" },
  { icon: "Shield", title: "Глубокая очистка", desc: "7-ступенчатая система фильтрации с ультрафиолетовым обеззараживанием.", badge: null },
  { icon: "Zap", title: "Экспресс за 2 часа", desc: "Доставка в любую точку Новороссийска: Центр, Мысхако, Цемдолина, Малая Земля.", badge: "Быстро" },
  { icon: "RefreshCw", title: "Подписка", desc: "Автоматическая доставка по расписанию. Забудьте о тяжёлых бутылях навсегда.", badge: "-15%" },
];

const FAQS = [
  { q: "Как быстро доставляете по Новороссийску?", a: "В пределах центра города — от 1 часа. В отдалённые районы (Мысхако, Цемдолина, Пролетарский) — до 3 часов. Экспресс-доставка за 2 часа в любую точку." },
  { q: "Какой минимальный заказ?", a: "Минимальный заказ — от 1 бутыли 19 литров или от 2 упаковок 0.5л. Бесплатная доставка при заказе от 3 бутылей." },
  { q: "Нужна ли регистрация для заказа?", a: "Нет. Достаточно оставить имя, адрес и телефон. Менеджер перезвонит для подтверждения в течение 15 минут." },
  { q: "Что делать с пустыми бутылями?", a: "Курьер забирает пустую тару при доставке следующей партии. Залог за бутыль — 150 ₽, возвращается при сдаче." },
  { q: "Есть ли доставка в выходные?", a: "Работаем 7 дней в неделю с 8:00 до 21:00, включая праздники." },
];

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="section-fade"
      style={{
        transitionDelay: `${delay}ms`,
        ...(visible ? { opacity: 1, transform: "translateY(0)" } : {}),
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [selectedVolume, setSelectedVolume] = useState("19l");
  const [qty, setQty] = useState(1);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [orderSent, setOrderSent] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
    setTimeout(() => setOrderSent(false), 4000);
  };

  const currentPrice = VOLUMES.find(v => v.id === selectedVolume)?.priceNum ?? 320;

  return (
    <div className="min-h-screen" style={{ background: "var(--water-deep)", color: "var(--water-crystal)" }}>

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute blob animate-blob-1 opacity-25"
          style={{ width: 650, height: 650, top: "0%", left: "-15%", background: "radial-gradient(circle, #1565c0 0%, #0d47a1 60%, transparent 100%)" }} />
        <div className="absolute blob animate-blob-2 opacity-20"
          style={{ width: 500, height: 500, top: "45%", right: "-10%", background: "radial-gradient(circle, #0288d1 0%, #01579b 60%, transparent 100%)" }} />
        <div className="absolute blob animate-blob-3 opacity-15"
          style={{ width: 700, height: 700, bottom: "5%", left: "25%", background: "radial-gradient(circle, #29b6f6 0%, #0277bd 70%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(41,182,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(41,182,246,0.6) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(2,13,26,0.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(41,182,246,0.12)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1565c0, #29b6f6)" }}>
            <Icon name="Droplets" size={16} className="text-white" />
          </div>
          <span className="font-cormorant text-xl font-semibold text-white tracking-wide">АкваПремиум</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[["Главная", "#hero"], ["Услуги", "#services"], ["Заказать", "#order"], ["FAQ", "#faq"], ["Контакты", "#contacts"]].map(([l, h]) => (
            <a key={l} href={h} className="nav-link text-sm font-medium">{l}</a>
          ))}
        </div>

        <a href="#order" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #1565c0, #29b6f6)", border: "1px solid rgba(79,195,247,0.3)" }}>
          Заказать <Icon name="ArrowRight" size={14} />
        </a>

        <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
          <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-8 gap-4"
          style={{ background: "rgba(2,13,26,0.97)", backdropFilter: "blur(30px)" }}>
          {[["Главная", "#hero"], ["Услуги", "#services"], ["Заказать", "#order"], ["FAQ", "#faq"], ["Контакты", "#contacts"]].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMobileMenu(false)}
              className="text-3xl font-cormorant font-light text-white border-b py-4"
              style={{ borderColor: "rgba(41,182,246,0.15)" }}>{l}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-16">

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"
              style={{ background: "rgba(41,182,246,0.1)", border: "1px solid rgba(41,182,246,0.25)", color: "var(--water-glow)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Новороссийск · Доставка 7 дней в неделю
            </div>

            <h1 className="font-cormorant leading-none tracking-tight" style={{ fontSize: "clamp(52px, 8vw, 90px)" }}>
              <span className="block text-white">Чистая</span>
              <span className="block shimmer-text">вода</span>
              <span className="block text-white">к вашей</span>
              <span className="block font-light italic" style={{ color: "rgba(225,245,254,0.45)" }}>двери</span>
            </h1>

            <p className="text-lg font-light max-w-md" style={{ color: "rgba(179,229,252,0.65)", lineHeight: 1.75 }}>
              Премиальная горная вода из предгорий Кавказа. Доставка по всему Новороссийску — от Центра до Мысхако за 1–2 часа.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#order"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #1565c0, #29b6f6)", boxShadow: "0 8px 32px rgba(41,182,246,0.3)" }}>
                <Icon name="ShoppingCart" size={18} />
                Заказать сейчас
              </a>
              <a href="tel:+78617000000"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-medium transition-all hover:scale-105"
                style={{ background: "rgba(41,182,246,0.08)", border: "1px solid rgba(41,182,246,0.3)", color: "var(--water-glow)" }}>
                <Icon name="Phone" size={18} />
                +7 (8617) 00-00-00
              </a>
            </div>

            <div className="flex gap-10 pt-2">
              {[["2 000+", "клиентов"], ["15 лет", "на рынке"], ["1–2 ч", "доставка"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-cormorant text-3xl font-semibold" style={{ color: "var(--water-glow)" }}>{v}</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: "rgba(179,229,252,0.45)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full opacity-50 animate-blob-1"
                style={{ background: "radial-gradient(circle, rgba(41,182,246,0.45) 0%, transparent 70%)", filter: "blur(35px)", transform: "scale(1.4)" }} />
              <div className="relative rounded-3xl overflow-hidden"
                style={{ border: "1px solid rgba(41,182,246,0.22)", boxShadow: "0 40px 120px rgba(41,182,246,0.18), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                <img src={HERO_IMAGE} alt="Чистая вода" className="w-full object-cover" style={{ aspectRatio: "4/5" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(2,13,26,0.85) 100%)" }} />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl"
                  style={{ background: "rgba(10,31,61,0.78)", backdropFilter: "blur(20px)", border: "1px solid rgba(41,182,246,0.22)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #1565c0, #29b6f6)" }}>
                      <Icon name="Award" size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Сертифицировано</div>
                      <div className="text-xs" style={{ color: "rgba(179,229,252,0.55)" }}>Роспотребнадзор · ГОСТ Р 52109</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(79,195,247,0.35)" }}>листать</span>
          <Icon name="ChevronDown" size={16} style={{ color: "rgba(79,195,247,0.35)" }} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6"
                style={{ background: "rgba(41,182,246,0.1)", border: "1px solid rgba(41,182,246,0.2)", color: "var(--water-glow)" }}>
                Наши услуги
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white">
                Всё для вашего <span className="water-text">комфорта</span>
              </h2>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <FadeSection key={s.title} delay={i * 100}>
                <div className="service-card p-8 h-full relative">
                  {s.badge && (
                    <span className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: "rgba(41,182,246,0.18)", color: "var(--water-glow)", border: "1px solid rgba(41,182,246,0.3)" }}>
                      {s.badge}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "linear-gradient(135deg, rgba(21,101,192,0.55), rgba(41,182,246,0.35))", border: "1px solid rgba(79,195,247,0.25)" }}>
                    <Icon name={s.icon} size={22} style={{ color: "var(--water-glow)" }} />
                  </div>
                  <h3 className="font-cormorant text-2xl font-medium text-white mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(179,229,252,0.6)" }}>{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <FadeSection>
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6"
                style={{ background: "rgba(41,182,246,0.1)", border: "1px solid rgba(41,182,246,0.2)", color: "var(--water-glow)" }}>
                Онлайн-заказ
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white">
                Оформить <span className="water-text">доставку</span>
              </h2>
              <p className="mt-4 text-sm" style={{ color: "rgba(179,229,252,0.45)" }}>
                Менеджер перезвонит в течение 15 минут для подтверждения
              </p>
            </div>
          </FadeSection>

          <FadeSection delay={120}>
            <form onSubmit={handleOrder} className="rounded-3xl p-8 md:p-10 space-y-8"
              style={{ background: "rgba(10,31,61,0.55)", border: "1px solid rgba(41,182,246,0.18)", backdropFilter: "blur(30px)" }}>

              {/* Volume */}
              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: "rgba(179,229,252,0.75)" }}>Объём воды</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {VOLUMES.map((v) => (
                    <button key={v.id} type="button" onClick={() => setSelectedVolume(v.id)}
                      className={`volume-card p-4 text-center ${selectedVolume === v.id ? "selected" : ""}`}>
                      <div className="font-cormorant text-2xl font-semibold text-white">{v.label}</div>
                      <div className="text-xs mt-1" style={{ color: "rgba(179,229,252,0.45)" }}>{v.desc}</div>
                      <div className="text-sm font-semibold mt-2" style={{ color: "var(--water-glow)" }}>{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: "rgba(179,229,252,0.75)" }}>Количество</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "rgba(41,182,246,0.12)", border: "1px solid rgba(41,182,246,0.3)", color: "var(--water-glow)" }}>
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="font-cormorant text-4xl font-light text-white w-12 text-center">{qty}</span>
                  <button type="button" onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "rgba(41,182,246,0.12)", border: "1px solid rgba(41,182,246,0.3)", color: "var(--water-glow)" }}>
                    <Icon name="Plus" size={16} />
                  </button>
                  <span className="ml-4 text-sm" style={{ color: "rgba(179,229,252,0.5)" }}>
                    Итого: <span className="text-white font-semibold">{qty * currentPrice} ₽</span>
                  </span>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: "rgba(179,229,252,0.75)" }}>Адрес доставки в Новороссийске</label>
                <input className="input-glass" placeholder="Улица, дом, квартира" value={address} onChange={e => setAddress(e.target.value)} required />
              </div>

              {/* Name + Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: "rgba(179,229,252,0.75)" }}>Ваше имя</label>
                  <input className="input-glass" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: "rgba(179,229,252,0.75)" }}>Телефон</label>
                  <input className="input-glass" placeholder="+7 (___) ___-__-__" value={phone} onChange={e => setPhone(e.target.value)} required type="tel" />
                </div>
              </div>

              <button type="submit"
                className="w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #1565c0, #29b6f6)", boxShadow: "0 8px 30px rgba(41,182,246,0.28)" }}>
                {orderSent ? (
                  <><Icon name="CheckCircle" size={20} /> Заявка принята! Скоро перезвоним</>
                ) : (
                  <><Icon name="Truck" size={20} /> Оформить доставку</>
                )}
              </button>
            </form>
          </FadeSection>
        </div>
      </section>

      {/* MAP */}
      <section className="relative z-10 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start gap-8"
              style={{ background: "rgba(10,31,61,0.45)", border: "1px solid rgba(41,182,246,0.16)", backdropFilter: "blur(20px)" }}>
              <div className="flex-shrink-0 w-full md:w-auto md:min-w-[240px]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #1565c0, #29b6f6)" }}>
                    <Icon name="MapPin" size={18} className="text-white" />
                  </div>
                  <span className="font-cormorant text-2xl text-white">Зоны доставки</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  {["Центр", "Мысхако", "Цемдолина", "Малая Земля", "Пролетарский", "Новый район", "Верхнебаканский", "Гайдук"].map(z => (
                    <div key={z} className="flex items-center gap-2 text-sm" style={{ color: "rgba(179,229,252,0.65)" }}>
                      <Icon name="Check" size={13} style={{ color: "var(--water-glow)" }} />
                      {z}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full rounded-2xl overflow-hidden" style={{ height: 300, border: "1px solid rgba(41,182,246,0.18)" }}>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=37.768%2C44.723&z=12&l=map"
                  width="100%" height="100%" frameBorder="0" allowFullScreen title="Карта Новороссийска"
                  style={{ filter: "brightness(0.8) saturate(0.7) hue-rotate(190deg)" }}
                />
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <FadeSection>
            <div className="text-center mb-14">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6"
                style={{ background: "rgba(41,182,246,0.1)", border: "1px solid rgba(41,182,246,0.2)", color: "var(--water-glow)" }}>
                Частые вопросы
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white">
                Ответы на <span className="water-text">вопросы</span>
              </h2>
            </div>
          </FadeSection>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <FadeSection key={i} delay={i * 70}>
                <div className="faq-item overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left gap-4">
                    <span className="font-medium text-white">{item.q}</span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: openFaq === i ? "rgba(41,182,246,0.25)" : "rgba(41,182,246,0.08)",
                        transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)"
                      }}>
                      <Icon name="Plus" size={14} style={{ color: "var(--water-glow)" }} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-sm leading-relaxed"
                      style={{ color: "rgba(179,229,252,0.6)", borderTop: "1px solid rgba(41,182,246,0.1)", paddingTop: 16 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="text-center mb-14">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6"
                style={{ background: "rgba(41,182,246,0.1)", border: "1px solid rgba(41,182,246,0.2)", color: "var(--water-glow)" }}>
                Контакты
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white">
                Свяжитесь <span className="water-text">с нами</span>
              </h2>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", title: "Телефон", lines: ["+7 (8617) 00-00-00", "+7 (988) 000-00-00"], link: "tel:+78617000000" },
              { icon: "Clock", title: "Часы работы", lines: ["Пн–Вс: 8:00 – 21:00", "Без праздников"], link: null },
              { icon: "MapPin", title: "Адрес офиса", lines: ["г. Новороссийск,", "ул. Советов, 1"], link: null },
            ].map((c, i) => (
              <FadeSection key={c.title} delay={i * 100}>
                <div className="service-card p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "linear-gradient(135deg, rgba(21,101,192,0.5), rgba(41,182,246,0.3))", border: "1px solid rgba(79,195,247,0.25)" }}>
                    <Icon name={c.icon} size={24} style={{ color: "var(--water-glow)" }} />
                  </div>
                  <h3 className="font-cormorant text-xl text-white mb-3">{c.title}</h3>
                  {c.lines.map((l, j) => (
                    <p key={j} className="text-sm" style={{ color: "rgba(179,229,252,0.6)" }}>{l}</p>
                  ))}
                  {c.link && (
                    <a href={c.link} className="inline-block mt-4 text-sm font-semibold" style={{ color: "var(--water-glow)" }}>
                      Позвонить →
                    </a>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 px-6 text-center"
        style={{ borderTop: "1px solid rgba(41,182,246,0.1)" }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1565c0, #29b6f6)" }}>
            <Icon name="Droplets" size={14} className="text-white" />
          </div>
          <span className="font-cormorant text-lg font-semibold text-white">АкваПремиум</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(179,229,252,0.3)" }}>
          © 2024 АкваПремиум · г. Новороссийск · Доставка питьевой воды
        </p>
      </footer>

    </div>
  );
}