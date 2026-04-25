import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { PROJECTS } from "@/data/projects";

type IName = string;

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project  = PROJECTS.find(p => p.slug === slug);

  const [modal, setModal]       = useState({ open: false, title: "" });
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox]   = useState(false);

  if (!project) return <Navigate to="/katalog" replace />;

  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal({ open: false, title: "" });

  const related = PROJECTS.filter(p => p.slug !== project.slug && p.category === project.category).slice(0, 3);

  const schemaJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": project.name,
    "description": project.shortDesc,
    "image": project.imgs[0],
    "offers": {
      "@type": "Offer",
      "price": project.price,
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "4",
    },
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--c-cream)", color: "var(--c-text)" }}>
      <SeoHead title={project.seoTitle} description={project.seoDesc} canonical={`https://domadabani.ru/proekty/${project.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJSON }} />
      <Modal open={modal.open} onClose={closeModal} title={modal.title} />

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Icon name="X" size={20} />
          </button>
          <img src={project.imgs[activeImg]} className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
        </div>
      )}

      <Nav onCta={() => openModal(`Заказать — ${project.name}`)} />

      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white py-4 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <div className="container mx-auto">
            <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--c-muted)" }}>
              <Link to="/" className="hover:underline">Главная</Link>
              <Icon name="ChevronRight" size={14} />
              <Link to="/katalog" className="hover:underline">Каталог</Link>
              <Icon name="ChevronRight" size={14} />
              <span style={{ color: "var(--c-text)" }}>{project.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-5 py-10">
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Gallery */}
            <div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-zoom-in mb-3 shadow-sm"
                onClick={() => setLightbox(true)}>
                <img src={project.imgs[activeImg]} alt={project.name}
                  className="w-full h-full object-cover" loading="eager" />
                <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                  <Icon name="ZoomIn" size={13} />Увеличить
                </div>
                {project.tag && (
                  <div className="absolute top-4 left-4">
                    <span className="badge-hot">{project.tag}</span>
                  </div>
                )}
              </div>
              {project.imgs.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {project.imgs.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all"
                      style={{ ring: activeImg===i ? "2px solid var(--c-brown)" : "none", opacity: activeImg===i ? 1 : 0.55 }}>
                      <img src={img} className="w-full h-full object-cover" alt={`${project.name} фото ${i+1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="section-label">{project.category}</div>
              <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] mb-2">{project.name}</h1>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--c-muted)" }}>{project.shortDesc}</p>

              <div className="font-display text-[2.6rem] text-grad mb-1">{project.priceLabel}</div>
              <p className="text-xs mb-6" style={{ color: "var(--c-muted)" }}>
                Включает доставку и монтаж · Без предоплаты · Гарантия 2 года
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { icon: "Move", label: project.size },
                  { icon: "Users", label: project.persons },
                  { icon: "Layers", label: project.materialLabel },
                  { icon: "Maximize", label: project.area },
                ].map((it) => (
                  <span key={it.label} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm"
                    style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>
                    <Icon name={it.icon as IName} size={13} />
                    {it.label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-3 mb-8">
                <button onClick={() => openModal(`Заказать — ${project.name}`)}
                  className="w-full btn-cta pulse-cta text-lg py-5">
                  ЗАКАЗАТЬ ТАКУЮ БАНЮ →
                </button>
                <a href="tel:+78001234567"
                  className="w-full btn-outline py-4 flex items-center justify-center gap-2.5 text-base">
                  <Icon name="Phone" size={18} />8-800-123-45-67
                </a>
              </div>

              {/* Trust mini */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "BadgeCheck", text: "Без предоплаты" },
                  { icon: "Truck",      text: "Доставка бесплатно" },
                  { icon: "Clock",      text: "Монтаж за 1 день" },
                  { icon: "Shield",     text: "Гарантия 2 года" },
                ].map((it) => (
                  <div key={it.text} className="flex items-center gap-2 text-xs p-3 rounded-xl"
                    style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>
                    <Icon name={it.icon as IName} size={14} style={{ color: "var(--c-brown)" }} />
                    {it.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description + Specs */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl mb-4">ОПИСАНИЕ</h2>
              <div className="space-y-3 text-sm leading-relaxed mb-8" style={{ color: "var(--c-muted)" }}>
                {project.fullDesc.trim().split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Included */}
              <h2 className="font-display text-2xl mb-4">ВХОДИТ В СТОИМОСТЬ</h2>
              <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: "1px solid var(--c-border)" }}>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {project.included.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "#DCFCE7" }}>
                        <Icon name="Check" size={11} className="text-green-600" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional */}
              <h2 className="font-display text-2xl mb-4">ОПЦИОНАЛЬНО</h2>
              <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid var(--c-border)" }}>
                <div className="space-y-3">
                  {project.optional.map((opt, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-2"
                      style={{ borderBottom: i<project.optional.length-1 ? "1px solid var(--c-border)" : "none" }}>
                      <span>{opt.label}</span>
                      <span className="font-semibold" style={{ color: "var(--c-brown)" }}>{opt.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs */}
            <div>
              <h2 className="font-display text-2xl mb-4">ХАРАКТЕРИСТИКИ</h2>
              <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid var(--c-border)" }}>
                {project.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between px-5 py-3 text-sm"
                    style={{ background: i%2===0 ? "#fff" : "var(--c-sand)", borderBottom: i<project.specs.length-1 ? "1px solid var(--c-border)" : "none" }}>
                    <span style={{ color: "var(--c-muted)" }}>{spec.label}</span>
                    <span className="font-medium text-right ml-4">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Sticky CTA */}
              <div className="mt-6 bg-white rounded-2xl p-5 sticky top-20" style={{ border: "1px solid var(--c-border)" }}>
                <div className="font-display text-2xl text-grad mb-1">{project.priceLabel}</div>
                <p className="text-xs mb-4" style={{ color: "var(--c-muted)" }}>Доставка и монтаж включены</p>
                <button onClick={() => openModal(`Заказать — ${project.name}`)}
                  className="w-full btn-cta py-4 mb-2">
                  ЗАКАЗАТЬ →
                </button>
                <a href="tel:+78001234567"
                  className="w-full btn-outline py-3 flex items-center justify-center gap-2 text-sm">
                  <Icon name="Phone" size={15} />Позвонить
                </a>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl mb-6">ПОХОЖИЕ ПРОЕКТЫ</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link key={p.id} to={`/proekty/${p.slug}`}
                    className="card group overflow-hidden flex flex-col">
                    <div className="h-40 overflow-hidden relative">
                      <img src={p.img} alt={p.name} loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-display text-base mb-1">{p.name}</h3>
                      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid var(--c-border)" }}>
                        <span className="text-grad font-display text-sm">{p.priceLabel}</span>
                        <span className="text-xs" style={{ color: "var(--c-amber)" }}>Подробнее →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="rounded-3xl p-10 text-center" style={{ background: "var(--c-sand)", border: "1px solid var(--c-border)" }}>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] mb-3">ХОТИТЕ ИМЕННО ЭТУ БАНЮ?</h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--c-muted)" }}>
              Оставьте телефон — перезвоним за 10 минут, уточним детали и назначим доставку.
            </p>
            <button onClick={() => openModal(`Заказать — ${project.name}`)}
              className="btn-cta px-12 py-5 text-lg">
              ЗАКАЗАТЬ ТАКУЮ БАНЮ →
            </button>
          </div>
        </div>
      </div>

      <Footer onCta={() => openModal(`Заказать — ${project.name}`)} />
    </div>
  );
}
