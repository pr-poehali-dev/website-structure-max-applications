import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface NavProps {
  onCta: () => void;
}

const LINKS = [
  { href: "/katalog", label: "Каталог" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/blog", label: "Блог" },
];

export default function Nav({ onCta }: NavProps) {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/92 backdrop-blur-md"
      style={{ borderBottom: "1px solid var(--c-border)" }}>
      <div className="container mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-2xl">🌲</span>
          <div>
            <div className="font-display text-[17px] leading-tight text-grad">ДОМА ДА БАНИ</div>
            <div className="text-[10px] leading-none tracking-wide" style={{ color: "var(--c-muted)" }}>
              мобильные бани · СПб и ЛО
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/#calc" className="transition-colors hover:opacity-70" style={{ color: "var(--c-muted)" }}>
            Калькулятор
          </Link>
          {LINKS.map(({ href, label }) => (
            <Link key={href} to={href}
              className="transition-colors hover:opacity-70"
              style={{ color: pathname === href ? "var(--c-brown)" : "var(--c-muted)", fontWeight: pathname === href ? 600 : 400 }}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+78001234567"
            className="hidden lg:flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: "var(--c-brown)" }}>
            <Icon name="Phone" size={14} />8-800-123-45-67
          </a>
          <button onClick={onCta} className="btn-cta px-5 py-2.5 text-sm">
            РАСЧЁТ БЕСПЛАТНО
          </button>
        </div>
      </div>
    </header>
  );
}
