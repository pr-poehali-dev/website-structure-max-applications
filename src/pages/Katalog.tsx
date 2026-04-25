import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { PROJECTS, CATEGORIES, type Project } from "@/data/projects";

type IName = string;

export default function Katalog() {
  const [modal, setModal]   = useState({ open: false, title: "" });
  const [cat, setCat]       = useState("Все");
  const [matFilter, setMat] = useState<"all"|"frame"|"timber">("all");
  const [bath, setBath]     = useState(false);
  const [terrace, setTerrace] = useState(false);
  const [maxPrice, setMaxPrice] = useState(700000);
  const [page, setPage]     = useState(1);

  const PER_PAGE = 6;

  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal({ open: false, title: "" });

  const filtered = useMemo(() => {
    return PROJECTS.filter((p: Project) => {
      if (cat !== "Все" && p.category !== cat) return false;
      if (matFilter !== "all" && p.material !== matFilter) return false;
      if (bath && !p.hasBathroom) return false;
      if (terrace && !p.hasTerrace) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [cat, matFilter, bath, terrace, maxPrice]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const shown  = filtered.slice(0, page * PER_PAGE);
  const hasMore = shown.length < filtered.length;

  const resetFilters = () => {
    setCat("Все"); setMat("all"); setBath(false); setTerrace(false); setMaxPrice(700000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--c-cream)", color: "var(--c-text)" }}>
      <SeoHead
        title="Каталог мобильных бань — 30+ проектов под ключ | Дома да Бани"
        description="Каталог мобильных бань под ключ в СПб и ЛО. Каркасные, из бруса, бани-бочки. Фильтры по размеру, цене, комплектации. Без предоплаты. От 185 000 ₽."
        canonical="https://domadabani.ru/katalog"
      />
      <Modal open={modal.open} onClose={closeModal} title={modal.title} />
      <Nav onCta={() => openModal("Получить расчёт")} />

      <div className="pt-16">
        {/* Hero */}
        <div className="bg-white py-12 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <div className="container mx-auto">
            <nav className="flex items-center gap-2 text-sm mb-5" style={{ color: "var(--c-muted)" }}>
              <Link to="/" className="hover:underline">Главная</Link>
              <Icon name="ChevronRight" size={14} />
              <span style={{ color: "var(--c-text)" }}>Каталог</span>
            </nav>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-3">КАТАЛОГ МОБИЛЬНЫХ БАНЬ</h1>
            <p style={{ color: "var(--c-muted)" }}>
              {PROJECTS.length} проектов · Доставка и монтаж бесплатно · Без предоплаты
            </p>
          </div>
        </div>

        <div className="container mx-auto px-5 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 sticky top-20" style={{ border: "1px solid var(--c-border)" }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-lg">ФИЛЬТРЫ</span>
                  <button onClick={resetFilters} className="text-xs hover:underline" style={{ color: "var(--c-amber)" }}>
                    Сбросить
                  </button>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <p className="font-medium text-sm mb-3">Тип бани</p>
                  <div className="space-y-2">
                    {CATEGORIES.map((c) => (
                      <button key={c} onClick={() => { setCat(c); setPage(1); }}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all"
                        style={{
                          background: cat === c ? "var(--c-brown)" : "transparent",
                          color: cat === c ? "#fff" : "var(--c-text)",
                        }}>
                        <Icon name={cat===c ? "CheckSquare" : "Square"} size={14} />
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material */}
                <div className="mb-6">
                  <p className="font-medium text-sm mb-3">Материал</p>
                  <div className="space-y-2">
                    {[["all","Все"], ["frame","Каркасные"], ["timber","Из бруса"]].map(([val, label]) => (
                      <button key={val} onClick={() => { setMat(val as typeof matFilter); setPage(1); }}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all"
                        style={{
                          background: matFilter === val ? "var(--c-brown)" : "transparent",
                          color: matFilter === val ? "#fff" : "var(--c-text)",
                        }}>
                        <Icon name={matFilter===val ? "CheckSquare" : "Square"} size={14} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max price */}
                <div className="mb-6">
                  <div className="flex justify-between mb-3">
                    <p className="font-medium text-sm">Цена до</p>
                    <span className="text-sm font-semibold text-grad">{(maxPrice/1000).toFixed(0)} тыс. ₽</span>
                  </div>
                  <input type="range" min={185000} max={700000} step={5000} value={maxPrice}
                    onChange={e => { setMaxPrice(+e.target.value); setPage(1); }}
                    className="w-full cursor-pointer accent-orange-700" />
                  <div className="flex justify-between text-xs mt-1" style={{ color: "var(--c-muted)" }}>
                    <span>185 тыс.</span><span>700 тыс.</span>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div onClick={() => { setBath(!bath); setPage(1); }}
                      className="w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all"
                      style={{ background: bath?"var(--c-brown)":"transparent", borderColor: bath?"var(--c-brown)":"var(--c-border)" }}>
                      {bath && <Icon name="Check" size={11} className="text-white" />}
                    </div>
                    <span className="text-sm">Есть душ / санузел</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div onClick={() => { setTerrace(!terrace); setPage(1); }}
                      className="w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all"
                      style={{ background: terrace?"var(--c-brown)":"transparent", borderColor: terrace?"var(--c-brown)":"var(--c-border)" }}>
                      {terrace && <Icon name="Check" size={11} className="text-white" />}
                    </div>
                    <span className="text-sm">Есть терраса</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm" style={{ color: "var(--c-muted)" }}>
                  Найдено: <strong style={{ color: "var(--c-text)" }}>{filtered.length}</strong> проект{filtered.length===1?"":"ов"}
                </span>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2" style={{ color: "var(--c-muted)" }}>Ничего не найдено</p>
                  <button onClick={resetFilters} className="btn-cta px-6 py-3 text-sm mt-4">Сбросить фильтры</button>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {shown.map((p: Project) => (
                      <div key={p.id} className="card group overflow-hidden flex flex-col">
                        <div className="relative h-44 overflow-hidden">
                          <img src={p.img} alt={p.name} loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          {p.tag && <span className="absolute top-3 left-3 badge-hot">{p.tag}</span>}
                          {p.hasBathroom && (
                            <span className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-display px-2 py-0.5 rounded-full">
                              Душ
                            </span>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h2 className="font-display text-base mb-1">{p.name}</h2>
                          <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--c-muted)" }}>{p.shortDesc}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                            <span className="text-xs px-2 py-1 rounded-full" style={{ background:"var(--c-sand)",color:"var(--c-muted)" }}>{p.size}</span>
                            <span className="text-xs px-2 py-1 rounded-full" style={{ background:"var(--c-sand)",color:"var(--c-muted)" }}>{p.persons}</span>
                            <span className="text-xs px-2 py-1 rounded-full" style={{ background:"var(--c-sand)",color:"var(--c-muted)" }}>{p.materialLabel}</span>
                          </div>
                          <div className="flex items-center justify-between pt-3" style={{ borderTop:"1px solid var(--c-border)" }}>
                            <span className="font-display text-base text-grad">{p.priceLabel}</span>
                            <div className="flex gap-1.5">
                              <Link to={`/proekty/${p.slug}`}
                                className="border border-[--c-brown] text-[--c-brown] text-xs font-display px-3 py-2 rounded-xl hover:bg-[--c-brown] hover:text-white transition-all"
                                style={{ "--c-brown":"var(--c-brown)" } as React.CSSProperties}>
                                ПОДРОБНЕЕ
                              </Link>
                              <button onClick={() => openModal(`Цена — ${p.name}`)}
                                className="btn-cta px-3 py-2 text-xs">ЦЕНУ</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {hasMore && (
                    <div className="text-center mt-10">
                      <button onClick={() => setPage(p => p + 1)}
                        className="btn-outline px-10 py-4">
                        ПОКАЗАТЬ ЕЩЁ ({filtered.length - shown.length})
                      </button>
                    </div>
                  )}

                  {pages > 1 && !hasMore && (
                    <p className="text-center text-sm mt-8" style={{ color: "var(--c-muted)" }}>
                      Показаны все {filtered.length} проектов
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer onCta={() => openModal("Получить расчёт")} />
    </div>
  );
}
