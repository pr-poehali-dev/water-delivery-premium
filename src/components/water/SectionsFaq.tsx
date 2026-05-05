import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useFade, Section, WA_LINK, PHONE_HREF, PHONE } from "./shared";

// ── FAQ ───────────────────────────────────────────────────────────────────────
type FaqItem = { q: string; a: string };

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

export function FaqSection() {
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

// ── Contact ───────────────────────────────────────────────────────────────────
export function ContactSection() {
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

// ── Floating WhatsApp ─────────────────────────────────────────────────────────
export function FloatingWA() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener" title="Написать в WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
      style={{ width: 52, height: 52, borderRadius: "50%", background: "#1DB954", boxShadow: "0 4px 20px rgba(29,185,84,0.45)" }}>
      <Icon name="MessageCircle" size={24} />
    </a>
  );
}
