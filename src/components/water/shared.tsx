import { useState, useEffect, useRef } from "react";

export const WA_LINK = "https://wa.me/79880000000?text=Здравствуйте!%20Хочу%20заказать%20воду%20в%20Новороссийске";
export const PHONE_HREF = "tel:+79880000000";
export const PHONE = "+7 (988) 000-00-00";

export function useFade(delay = 0) {
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

export function Section({ id, children, bg = "#fff", py = "clamp(56px,7vw,96px)" }: {
  id?: string; children: React.ReactNode; bg?: string; py?: string;
}) {
  return (
    <section id={id} style={{ background: bg, paddingTop: py, paddingBottom: py }}>
      <div className="section-wrap">{children}</div>
    </section>
  );
}

export function SectionHeader({ label, title }: { label: string; title: React.ReactNode }) {
  const f = useFade();
  return (
    <div ref={f.ref} style={f.style} className="mb-12">
      <p className="t-label mb-3">{label}</p>
      <h2 className="t-headline">{title}</h2>
    </div>
  );
}
