import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface FooterProps {
  onCta: () => void;
}

export default function Footer({ onCta }: FooterProps) {
  return (
    <>
      {/* CTA strip */}
      <section className="py-16 px-5 text-center" style={{ background: "var(--c-sand)", borderTop: "1px solid var(--c-border)" }}>
        <div className="container mx-auto max-w-xl">
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] mb-3">ГОТОВЫ К ПЕРВОЙ ТОПКЕ?</h2>
          <p className="text-sm mb-8" style={{ color: "var(--c-muted)" }}>
            Оставьте телефон — перезвоним за 10 минут и подберём модель
          </p>
          <button onClick={onCta} className="btn-cta px-10 py-5 text-lg pulse-cta">
            ПОЛУЧИТЬ РАСЧЁТ →
          </button>
        </div>
      </section>

      <footer className="py-8 px-5" style={{ background: "var(--c-sand)", borderTop: "1px solid var(--c-border)" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🌲</span>
                <span className="font-display text-grad">ДОМА ДА БАНИ</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--c-muted)" }}>
                Мобильные бани под ключ в СПб и Ленинградской области. Собственное производство. Без предоплаты. Гарантия 2 года.
              </p>
            </div>
            <div>
              <div className="font-display text-sm mb-3" style={{ color: "var(--c-text)" }}>НАВИГАЦИЯ</div>
              <div className="space-y-2">
                {[
                  { to: "/", label: "Главная" },
                  { to: "/katalog", label: "Каталог проектов" },
                  { to: "/o-kompanii", label: "О компании" },
                  { to: "/blog", label: "Блог" },
                ].map(({ to, label }) => (
                  <Link key={to} to={to} className="block text-sm hover:underline" style={{ color: "var(--c-muted)" }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="font-display text-sm mb-3" style={{ color: "var(--c-text)" }}>КОНТАКТЫ</div>
              <div className="space-y-2">
                <a href="tel:+78001234567" className="flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--c-muted)" }}>
                  <Icon name="Phone" size={13} />8-800-123-45-67 (бесплатно)
                </a>
                <a href="https://wa.me/78001234567" className="flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--c-muted)" }}>
                  <Icon name="MessageCircle" size={13} />WhatsApp
                </a>
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--c-muted)" }}>
                  <Icon name="MapPin" size={13} />СПб и Ленинградская область
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
            style={{ borderTop: "1px solid var(--c-border)" }}>
            <span className="text-xs" style={{ color: "var(--c-muted)" }}>© 2024 Дома да Бани. Все права защищены.</span>
            <div className="flex gap-5">
              <Link to="/privacy" className="text-xs hover:underline" style={{ color: "var(--c-muted)" }}>Политика конфиденциальности</Link>
              <Link to="/oferta" className="text-xs hover:underline" style={{ color: "var(--c-muted)" }}>Оферта</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white"
        style={{ borderTop: "1px solid var(--c-border)", boxShadow: "0 -4px 24px rgba(0,0,0,0.08)" }}>
        <div className="flex">
          <a href="tel:+78001234567"
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
            style={{ color: "var(--c-muted)" }}>
            <Icon name="Phone" size={20} />
            <span className="text-xs font-medium">Звонок</span>
          </a>
          <a href="https://wa.me/78001234567"
            className="flex-1 flex flex-col items-center gap-1 py-3"
            style={{ color: "#22c55e" }}>
            <Icon name="MessageCircle" size={20} />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
          <button onClick={onCta}
            className="flex-1 flex flex-col items-center gap-1 py-3 btn-cta rounded-none">
            <Icon name="Calculator" size={20} />
            <span className="text-xs font-bold">Расчёт</span>
          </button>
        </div>
      </div>
    </>
  );
}
