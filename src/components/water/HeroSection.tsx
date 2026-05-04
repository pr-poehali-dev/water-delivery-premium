import Icon from "@/components/ui/icon";
import { TRUCK_IMG, WA_LINK, PHONE, PHONE_HREF } from "./constants";

export default function HeroSection() {
  return (
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
              { ic: "Truck",    tx: "Свой автопарк" },
              { ic: "Clock3",   tx: "Работаем 24/7" },
              { ic: "Star",     tx: "500+ клиентов" },
              { ic: "FileText", tx: "Документы" },
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
  );
}
