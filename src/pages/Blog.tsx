import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { ARTICLES } from "@/data/blog";

export default function Blog() {
  const [modal, setModal] = useState({ open: false, title: "" });
  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal({ open: false, title: "" });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--c-cream)", color: "var(--c-text)" }}>
      <SeoHead
        title="Блог — советы по выбору и уходу за баней | Дома да Бани"
        description="Полезные статьи о мобильных банях: как выбрать, из чего строить, сколько стоит, как ухаживать. Советы от производителя."
        canonical="https://domadabani.ru/blog"
      />
      <Modal open={modal.open} onClose={closeModal} title={modal.title} />
      <Nav onCta={() => openModal("Получить расчёт")} />

      <div className="pt-16">
        <div className="bg-white py-12 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <div className="container mx-auto">
            <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "var(--c-muted)" }}>
              <Link to="/" className="hover:underline">Главная</Link>
              <Icon name="ChevronRight" size={14} />
              <span style={{ color: "var(--c-text)" }}>Блог</span>
            </nav>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-3">БЛОГ</h1>
            <p style={{ color: "var(--c-muted)" }}>Советы по выбору, уходу и эксплуатации бань от производителя</p>
          </div>
        </div>

        <div className="container mx-auto px-5 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((art) => (
              <Link key={art.slug} to={`/blog/${art.slug}`}
                className="card group overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img src={art.img} alt={art.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {art.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-lg leading-snug mb-3 group-hover:text-[--c-amber] transition-colors"
                    style={{ "--c-amber": "var(--c-amber)" } as React.CSSProperties}>
                    {art.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--c-muted)" }}>{art.excerpt}</p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--c-border)" }}>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--c-muted)" }}>
                      <Icon name="Clock" size={12} />{art.readTime}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "var(--c-amber)" }}>
                      Читать →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Lead capture */}
        <div className="py-16 px-5" style={{ background: "var(--c-sand)", borderTop: "1px solid var(--c-border)" }}>
          <div className="container mx-auto max-w-xl text-center">
            <h2 className="font-display text-2xl mb-3">НУЖНА КОНСУЛЬТАЦИЯ?</h2>
            <p className="text-sm mb-8" style={{ color: "var(--c-muted)" }}>
              Задайте вопрос инженеру — ответим по телефону в течение 10 минут
            </p>
            <button onClick={() => openModal("Получить консультацию инженера")}
              className="btn-cta px-10 py-5 text-base">
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ →
            </button>
          </div>
        </div>
      </div>

      <Footer onCta={() => openModal("Получить расчёт")} />
    </div>
  );
}
