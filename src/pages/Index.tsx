import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { PROJECTS } from "@/data/projects";

type IName = string;

const IMG_HERO = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/75079a1b-d297-4c6c-909f-095f498a43b7.jpg";
const I2 = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/39778432-6510-410c-a4b5-74fdc6b7d078.jpg";
const I3 = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/ba23cfcc-b793-4452-b361-c822a6cd9dd0.jpg";
const I4 = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/7f26f35a-c836-4006-bc2c-281f7957da10.jpg";
const I5 = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/c2830de6-286b-432e-99e6-bd994863bdc3.jpg";
const I6 = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/11d83af8-e9eb-485a-8900-9d6e02a6ae97.jpg";

const GALLERY = [IMG_HERO, I2, I3, I4, I5, I6, IMG_HERO, I2, I3];

const REVIEWS = [
  { name: "Виктор П.",   loc: "Всеволожский р-н", text: "Привезли и поставили за 6 часов. Без предоплаты — нигде такого не видел. Уже второй сезон паримся, всё отлично.", stars: 5 },
  { name: "Светлана М.", loc: "Гатчина",           text: "Объехала несколько компаний. Честная цена, нормальная вагонка, не фанера. Рекомендую без оговорок.", stars: 5 },
  { name: "Алексей Д.",  loc: "Выборгский р-н",   text: "Мастера приехали вовремя, выровняли площадку сами, уложились в смету. Всё честно, как обещали.", stars: 5 },
  { name: "Ирина К.",    loc: "Пушкин, СПб",      text: "Баня-бочка — лучшее, что купили для участка. Детям нравится, соседи завидуют. Быстро и аккуратно.", stars: 5 },
];

const FAQS = [
  { q: "Почему без предоплаты?", a: "10 лет работаем в СПб и ЛО. Вы платите только после осмотра готовой бани на вашем участке." },
  { q: "Сколько займёт установка?", a: "Стандартная баня — 1 рабочий день. Утром приезжаем, вечером принимаете готовую парилку." },
  { q: "Нужен ли фундамент?", a: "Нет. Мобильные бани не требуют капитального фундамента — достаточно ровной площадки." },
  { q: "Из чего сделаны бани?", a: "Каркас — сосна камерной сушки, вагонка — липа или осина класс А, утеплитель — ROCKWOOL. Всё с сертификатами." },
  { q: "Есть ли гарантия?", a: "2 года на конструкцию и все узлы. Выезд мастера в течение 48 часов — бесплатно." },
];

const EXTRAS = ["Душевая кабина", "Санузел", "Терраса", "Утеплённый пол"];
const WOODS  = ["Каркас (липа)", "Брус 140×140"];
const EXTRA_PRICE = 55000;

const POPULAR_SLUGS = ["komfort-4x2-3", "standart-3x2", "bochka-2-2"];
const POPULAR = PROJECTS.filter(p => POPULAR_SLUGS.includes(p.slug));

export default function Index() {
  const [modal, setModal]     = useState({ open: false, title: "" });
  const [size, setSize]       = useState(4);
  const [wood, setWood]       = useState(0);
  const [extras, setExtras]   = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal({ open: false, title: "" });

  const woodMult = [1, 1.55][wood];
  const baseP    = Math.round(265000 * (size / 4) * woodMult);
  const extrasP  = [0,1,2,3].filter(i => extras & (1<<i)).length * EXTRA_PRICE;
  const totalP   = baseP + extrasP;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--c-cream)", color: "var(--c-text)" }}>
      <SeoHead
        title="Мобильные бани под ключ в СПб и ЛО без предоплаты — от 265 000 ₽ | Дома да Бани"
        description="Привезём и установим мобильную баню за 1 день. Платите после осмотра. Собственное производство — цена на 25% ниже. Каталог 30+ моделей. СПб и Ленинградская область."
        canonical="https://domadabani.ru/"
      />
      <Modal open={modal.open} onClose={closeModal} title={modal.title} />

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <Icon name="X" size={20} />
          </button>
          <img src={lightbox} className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <button onClick={(e) => { e.stopPropagation(); openModal("Хочу такую баню"); }}
              className="btn-cta px-8 py-4 text-base">
              ХОЧУ ТАКУЮ БАНЮ →
            </button>
          </div>
        </div>
      )}

      <Nav onCta={() => openModal("Получить расчёт")} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Мобильная баня под ключ в СПб" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg,rgba(8,4,1,0.84) 0%,rgba(8,4,1,0.5) 55%,rgba(8,4,1,0.18) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(8,4,1,0.7) 0%,transparent 40%)" }} />
        </div>
        <div className="relative container mx-auto px-5 py-28">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 anim-up"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/85 text-sm">Принимаем заказы · СПб и ЛО</span>
            </div>
            <h1 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.04] text-white mb-4 anim-up d1">
              МОБИЛЬНЫЕ БАНИ<br />
              <span style={{ color: "var(--c-gold)" }}>БЕЗ ПРЕДОПЛАТЫ</span><br />
              ПОД КЛЮЧ В СПб
            </h1>
            <p className="text-white/80 text-lg mb-3 anim-up d2">
              Своё производство → цена <strong className="text-white">на 25% ниже</strong>.
            </p>
            <p className="text-white/75 text-base mb-9 max-w-lg anim-up d2">
              Привезём и установим за <strong className="text-white">1 день</strong>. Платите после осмотра. <strong className="text-white">От 265 000 ₽</strong>
            </p>
            <div className="flex flex-wrap gap-3 mb-10 anim-up d3">
              <button onClick={() => openModal("Получить расчёт за 1 минуту")}
                className="btn-cta pulse-cta text-xl px-9 py-5">
                РАСЧЁТ ЗА 1 МИНУТУ →
              </button>
              <Link to="/katalog" className="btn-ghost-white text-base px-7 py-5 flex items-center gap-2.5">
                <Icon name="LayoutGrid" size={18} />СМОТРЕТЬ ПРОЕКТЫ
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 anim-up d4">
              {[["BadgeCheck","Без предоплаты"],["Truck","Доставка бесплатно"],["Clock","Установка за 1 день"],["Shield","Гарантия 2 года"]].map(([icon,label]) => (
                <div key={label} className="flex items-center gap-2 text-white/75 text-sm">
                  <Icon name={icon as IName} size={14} style={{ color: "var(--c-gold)" }} />{label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/35 text-xs">
          <span>листайте вниз</span>
          <Icon name="ChevronDown" size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── NUMBERS ── */}
      <section className="bg-white py-10 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
          {[["500+","довольных клиентов"],["0 ₽","предоплата"],["1 день","монтаж под ключ"],["10 лет","работаем в СПб"]].map(([n,l]) => (
            <div key={n} className="text-center px-4">
              <div className="font-display text-[2.4rem] leading-none text-grad mb-1">{n}</div>
              <div className="text-sm" style={{ color: "var(--c-muted)" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3 ADVANTAGES ── */}
      <section className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Наши преимущества</div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon:"Wallet",  bg:"#FEF3C7", num:"0 ₽",    title:"Без предоплаты",    desc:"Осмотрели баню на участке, убедились в качестве — тогда оплата. Никаких авансов и рисков." },
              { icon:"Factory", bg:"#DCFCE7", num:"−25%",   title:"Собственное производство", desc:"Делаем сами — без посредников. Цена на 25% ниже рынка при том же качестве материалов." },
              { icon:"Truck",   bg:"#FEE2E2", num:"0 ₽",    title:"Доставка бесплатно", desc:"Привозим и устанавливаем бесплатно. До 500 км от СПб — без доплат. Монтаж за 1 день." },
            ].map((it, i) => (
              <div key={i} className="card p-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: it.bg }}>
                  <Icon name={it.icon as IName} size={28} style={{ color: "var(--c-brown)" }} />
                </div>
                <div className="font-display text-[3rem] leading-none text-grad mb-2">{it.num}</div>
                <h3 className="font-display text-xl mb-3">{it.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── POPULAR PROJECTS ── */}
      <section id="proekty" className="py-20 px-5 bg-white">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="section-label">Каталог</div>
              <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">ПОПУЛЯРНЫЕ ПРОЕКТЫ</h2>
            </div>
            <Link to="/katalog" className="btn-outline px-6 py-3 text-sm">
              ВСЕ 30+ ПРОЕКТОВ →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POPULAR.map((p) => (
              <div key={p.id} className="card group overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {p.tag && <span className="absolute top-3 left-3 badge-hot">{p.tag}</span>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg mb-1">{p.name}</h3>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--c-muted)" }}>{p.shortDesc}</p>
                  <div className="flex gap-2 mb-4 flex-wrap mt-auto">
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>{p.size}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>{p.persons}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>{p.materialLabel}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--c-border)" }}>
                    <span className="font-display text-lg text-grad">{p.priceLabel}</span>
                    <div className="flex gap-2">
                      <Link to={`/proekty/${p.slug}`} className="btn-outline px-3 py-2 text-xs">
                        ПОДРОБНЕЕ
                      </Link>
                      <button onClick={() => openModal(`Узнать цену — ${p.name}`)}
                        className="btn-cta px-3 py-2 text-xs">
                        ЦЕНУ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/katalog" className="btn-cta px-10 py-4 text-base inline-flex items-center gap-2">
              <Icon name="LayoutGrid" size={18} />СМОТРЕТЬ ВСЕ ПРОЕКТЫ
            </Link>
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── CALCULATOR ── */}
      <section id="calc" className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Онлайн-калькулятор</div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">РАССЧИТАЙТЕ СТОИМОСТЬ</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--c-muted)" }}>Примерная цена за 30 секунд — без звонков</p>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12" style={{ border: "1px solid var(--c-border)", boxShadow: "0 2px 24px rgba(124,58,16,0.06)" }}>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-sm">Длина бани</span>
                    <span className="font-display text-lg font-semibold text-grad">{size} м</span>
                  </div>
                  <input type="range" min={4} max={8} step={0.5} value={size}
                    onChange={e => setSize(+e.target.value)} className="w-full cursor-pointer accent-orange-700" />
                  <div className="flex justify-between text-xs mt-1.5" style={{ color: "var(--c-muted)" }}>
                    <span>4 м</span><span>8 м</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm mb-3">Материал</p>
                  <div className="grid grid-cols-2 gap-2">
                    {WOODS.map((w, i) => (
                      <button key={i} onClick={() => setWood(i)}
                        className="py-3 px-4 rounded-xl text-sm font-medium border transition-all"
                        style={{
                          background: wood === i ? "var(--c-brown)" : "var(--c-sand)",
                          color: wood === i ? "#fff" : "var(--c-text)",
                          borderColor: wood === i ? "var(--c-brown)" : "var(--c-border)",
                        }}>
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm mb-3">Опции</p>
                  <div className="space-y-3">
                    {EXTRAS.map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer">
                        <div onClick={() => setExtras(p => p ^ (1<<i))}
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-all"
                          style={{
                            background: extras & (1<<i) ? "var(--c-brown)" : "transparent",
                            borderColor: extras & (1<<i) ? "var(--c-brown)" : "var(--c-border)"
                          }}>
                          {!!(extras & (1<<i)) && <Icon name="Check" size={11} className="text-white" />}
                        </div>
                        <span className="text-sm flex-1">{opt}</span>
                        <span className="text-xs" style={{ color: "var(--c-muted)" }}>+{EXTRA_PRICE.toLocaleString("ru")} ₽</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="rounded-2xl p-8 text-center mb-6"
                  style={{ background: "linear-gradient(135deg,#FEF3C7,#FDE68A)", border: "1px solid #FCD34D" }}>
                  <p className="text-sm mb-2" style={{ color: "var(--c-muted)" }}>Примерная стоимость</p>
                  <div className="font-display text-[3rem] leading-none text-grad mb-1">
                    {totalP.toLocaleString("ru-RU")} ₽
                  </div>
                  <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--c-muted)" }}>
                    Включает доставку и монтаж.<br />Точная цена после консультации.
                  </p>
                </div>
                <button onClick={() => openModal("Точный расчёт со скидкой")}
                  className="btn-cta w-full text-lg py-5 mb-2">
                  ТОЧНЫЙ РАСЧЁТ СО СКИДКОЙ →
                </button>
                <p className="text-center text-xs" style={{ color: "var(--c-muted)" }}>Перезвоним за 10 минут</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── GALLERY ── */}
      <section className="py-20 px-5 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Реальные работы</div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">НАШИ БАНИ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((src, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in shadow-sm"
                onClick={() => setLightbox(src)}>
                <img src={src} alt={`Баня ${i+1}`} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                  style={{ background: "rgba(8,4,1,0.4)" }}>
                  <Icon name="ZoomIn" size={28} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── REVIEWS ── */}
      <section className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Клиенты о нас</div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">ОТЗЫВЫ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length:r.stars}).map((_,j) => <span key={j} className="text-amber-400 text-lg">★</span>)}
                </div>
                <p className="text-sm leading-relaxed italic mb-5">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--c-border)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,var(--c-brown),var(--c-wood))" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs flex items-center gap-1" style={{ color: "var(--c-muted)" }}>
                      <Icon name="MapPin" size={11} />{r.loc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── TRUST ── */}
      <section className="py-20 px-5 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Надёжность</div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">ГАРАНТИИ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon:"Award",       title:"Гарантия 2 года",  desc:"На конструкцию и узлы" },
              { icon:"FileCheck",   title:"Сертификаты ГОСТ", desc:"На все материалы" },
              { icon:"Users",       title:"500+ клиентов",    desc:"По СПб и ЛО" },
              { icon:"CalendarCheck", title:"10 лет работы",  desc:"На рынке с 2014 года" },
            ].map((it, i) => (
              <div key={i} className="card text-center p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#FEF3C7" }}>
                  <Icon name={it.icon as IName} size={24} style={{ color: "var(--c-brown)" }} />
                </div>
                <div className="font-display text-sm mb-1">{it.title}</div>
                <div className="text-xs" style={{ color: "var(--c-muted)" }}>{it.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── FAQ ── */}
      <section className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Ответы на вопросы</div>
            <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">ЧАСТО СПРАШИВАЮТ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ border: `1.5px solid ${openFaq===i ? "var(--c-amber)" : "var(--c-border)"}`, background:"#fff" }}>
                <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-amber-50/40 transition-colors">
                  <span className="font-display text-[1.05rem]">{item.q}</span>
                  <Icon name="ChevronDown" size={18} className="flex-shrink-0 ml-4 transition-transform duration-300"
                    style={{ color:"var(--c-amber)", transform: openFaq===i ? "rotate(180deg)":"rotate(0deg)" }} />
                </button>
                {openFaq===i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color:"var(--c-muted)" }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => openModal("Спросить инженера")} className="btn-outline px-8 py-4">
              СПРОСИТЬ ИНЖЕНЕРА →
            </button>
          </div>
        </div>
      </section>

      <Footer onCta={() => openModal("Получить расчёт")} />
    </div>
  );
}
