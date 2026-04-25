import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { ARTICLES } from "@/data/blog";
import { PROJECTS } from "@/data/projects";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find(a => a.slug === slug);

  const [modal, setModal] = useState({ open: false, title: "" });
  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal({ open: false, title: "" });

  if (!article) return <Navigate to="/blog" replace />;

  const related = ARTICLES.filter(a => a.slug !== slug).slice(0, 3);
  const featured = PROJECTS.slice(0, 3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  };

  const renderContent = (md: string) => {
    return md.trim().split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl mt-8 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="font-display text-xl mt-6 mb-3">{line.slice(4)}</h3>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold mt-4 mb-2">{line.slice(2,-2)}</p>;
      if (line.startsWith("- ")) return <li key={i} className="ml-5 list-disc text-sm leading-relaxed mb-1" style={{ color: "var(--c-muted)" }}>{line.slice(2)}</li>;
      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line.split("|").filter(Boolean).map(c => c.trim());
        if (cells.every(c => c.match(/^-+$/))) return null;
        return (
          <div key={i} className="grid text-sm" style={{ gridTemplateColumns: `repeat(${cells.length},1fr)` }}>
            {cells.map((cell, j) => (
              <div key={j} className="px-3 py-2 border-b border-r text-sm" style={{ borderColor: "var(--c-border)" }}>{cell}</div>
            ))}
          </div>
        );
      }
      if (line === "---") return <hr key={i} className="my-6" style={{ borderColor: "var(--c-border)" }} />;
      if (line === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm leading-relaxed mb-2" style={{ color: "var(--c-muted)" }}>{line}</p>;
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--c-cream)", color: "var(--c-text)" }}>
      <SeoHead title={article.seoTitle} description={article.seoDesc} canonical={`https://domadabani.ru/blog/${article.slug}`} />
      <Modal open={modal.open} onClose={closeModal} title={modal.title} />
      <Nav onCta={() => openModal("Получить расчёт")} />

      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white py-4 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <div className="container mx-auto">
            <nav className="flex items-center gap-2 text-sm flex-wrap" style={{ color: "var(--c-muted)" }}>
              <Link to="/" className="hover:underline">Главная</Link>
              <Icon name="ChevronRight" size={14} />
              <Link to="/blog" className="hover:underline">Блог</Link>
              <Icon name="ChevronRight" size={14} />
              <span className="truncate max-w-[200px]" style={{ color: "var(--c-text)" }}>{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={article.img} alt={article.title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 30%,rgba(8,4,1,0.7) 100%)" }} />
          <div className="absolute bottom-8 left-0 right-0 px-5">
            <div className="container mx-auto max-w-3xl">
              <div className="flex gap-2 mb-3 flex-wrap">
                {article.tags.map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/15 text-white/80 backdrop-blur-sm">{t}</span>
                ))}
              </div>
              <h1 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] text-white leading-snug">{article.title}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Article body */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8 text-xs" style={{ color: "var(--c-muted)" }}>
                <span className="flex items-center gap-1.5"><Icon name="Calendar" size={12} />{formatDate(article.date)}</span>
                <span className="flex items-center gap-1.5"><Icon name="Clock" size={12} />{article.readTime} чтения</span>
              </div>

              {/* Top lead capture */}
              <div className="rounded-2xl p-6 mb-8" style={{ background: "var(--c-sand)", border: "1px solid var(--c-border)" }}>
                <p className="font-display text-lg mb-2">Нужна баня под ключ?</p>
                <p className="text-sm mb-4" style={{ color: "var(--c-muted)" }}>Получите расчёт стоимости за 1 минуту — без звонков и ожиданий</p>
                <button onClick={() => openModal("Получить расчёт")} className="btn-cta px-6 py-3 text-sm">
                  ПОЛУЧИТЬ РАСЧЁТ →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-8" style={{ border: "1px solid var(--c-border)" }}>
                {renderContent(article.content)}
              </div>

              {/* Bottom lead capture */}
              <div className="rounded-2xl p-6 mt-8" style={{ background: "linear-gradient(135deg,var(--c-sand),#F5E8D0)", border: "1px solid var(--c-border)" }}>
                <p className="font-display text-xl mb-2">Готовы к собственной бане?</p>
                <p className="text-sm mb-5" style={{ color: "var(--c-muted)" }}>
                  Подберём модель под ваш участок и бюджет. Перезвоним за 10 минут.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => openModal("Получить консультацию инженера")} className="btn-cta px-6 py-3.5 text-sm flex-1">
                    ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ →
                  </button>
                  <Link to="/katalog" className="btn-outline px-6 py-3.5 text-sm text-center">
                    СМОТРЕТЬ КАТАЛОГ
                  </Link>
                </div>
              </div>

              {/* Related articles */}
              <div className="mt-12">
                <h2 className="font-display text-xl mb-5">ДРУГИЕ СТАТЬИ</h2>
                <div className="space-y-4">
                  {related.map(a => (
                    <Link key={a.slug} to={`/blog/${a.slug}`}
                      className="card flex gap-4 p-4 items-start group">
                      <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm leading-snug mb-1 group-hover:text-[--c-amber] transition-colors"
                          style={{ "--c-amber": "var(--c-amber)" } as React.CSSProperties}>
                          {a.title}
                        </h3>
                        <span className="text-xs" style={{ color: "var(--c-muted)" }}>{a.readTime} чтения</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Sticky CTA */}
              <div className="bg-white rounded-2xl p-6 sticky top-20 mb-6" style={{ border: "1px solid var(--c-border)" }}>
                <div className="text-3xl mb-3">🌲</div>
                <h3 className="font-display text-lg mb-2">Нужна баня?</h3>
                <p className="text-xs mb-5" style={{ color: "var(--c-muted)" }}>Без предоплаты · Доставка бесплатно · Монтаж за 1 день</p>
                <button onClick={() => openModal("Рассчитать стоимость бани")}
                  className="w-full btn-cta py-4 mb-3 text-sm">
                  РАССЧИТАТЬ СТОИМОСТЬ
                </button>
                <a href="tel:+78001234567" className="w-full btn-outline py-3 flex items-center justify-center gap-2 text-sm">
                  <Icon name="Phone" size={14} />8-800-123-45-67
                </a>
              </div>

              {/* Featured projects */}
              <div>
                <h3 className="font-display text-base mb-3">ПОПУЛЯРНЫЕ ПРОЕКТЫ</h3>
                <div className="space-y-3">
                  {featured.map(p => (
                    <Link key={p.id} to={`/proekty/${p.slug}`}
                      className="card flex gap-3 p-3 items-center group">
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-display text-xs mb-0.5">{p.name}</div>
                        <div className="text-xs text-grad font-semibold">{p.priceLabel}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer onCta={() => openModal("Получить расчёт")} />
    </div>
  );
}
