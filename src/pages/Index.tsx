import { useState } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const IMG_HERO     = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/75079a1b-d297-4c6c-909f-095f498a43b7.jpg";
const IMG_INTERIOR = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/39778432-6510-410c-a4b5-74fdc6b7d078.jpg";
const IMG_BARREL   = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/ba23cfcc-b793-4452-b361-c822a6cd9dd0.jpg";
const IMG_INSTALL  = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/7f26f35a-c836-4006-bc2c-281f7957da10.jpg";
const IMG_OLD_HERO = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/c2830de6-286b-432e-99e6-bd994863bdc3.jpg";

const MODELS = [
  { name: "Баня-бочка",      size: "Ø 2,2 м",  persons: "до 4 чел",  price: "от 185 000 ₽", img: IMG_BARREL,   tag: "Новинка", desc: "Компактно, стильно, быстрый прогрев" },
  { name: "Стандарт 3×2",   size: "3×2 м",    persons: "до 4 чел",  price: "от 265 000 ₽", img: IMG_OLD_HERO, tag: "",        desc: "Оптимальный выбор для небольшого участка" },
  { name: "Комфорт 4×2,3",  size: "4×2,3 м",  persons: "до 6 чел",  price: "от 340 000 ₽", img: IMG_HERO,     tag: "Хит",     desc: "Самая популярная модель сезона" },
  { name: "Люкс 5×2,5",     size: "5×2,5 м",  persons: "до 8 чел",  price: "от 480 000 ₽", img: IMG_INTERIOR, tag: "",        desc: "Просторная с предбанником и зоной отдыха" },
  { name: "Семейная 6×3",   size: "6×3 м",    persons: "до 12 чел", price: "от 640 000 ₽", img: IMG_INSTALL,  tag: "",        desc: "Для большой семьи и частых компаний" },
];

const STEPS = [
  { icon: "PhoneCall",   title: "Звонок за 10 мин",    desc: "Оставляете телефон — менеджер перезванивает и подбирает модель" },
  { icon: "FileText",    title: "Договор и смета",      desc: "Фиксируем цену, сроки, комплектацию. Без скрытых доплат" },
  { icon: "Truck",       title: "Привозим и ставим",    desc: "Бригада приезжает утром, к вечеру баня готова к первой протопке" },
  { icon: "BadgeCheck",  title: "Платите после осмотра", desc: "Принимаете работу, убеждаетесь в качестве — только тогда оплата" },
];

const REVIEWS = [
  { name: "Виктор П.",   loc: "Всеволожский р-н", text: "Привезли и поставили за 6 часов. Без предоплаты — нигде такого не видел. Уже второй сезон паримся, всё отлично.", stars: 5 },
  { name: "Светлана М.", loc: "Гатчина",           text: "Объехала несколько компаний. Здесь честная цена, нормальная вагонка, не фанера. Рекомендую без оговорок.", stars: 5 },
  { name: "Алексей Д.",  loc: "Выборгский р-н",   text: "Мастера приехали вовремя, выровняли площадку сами, уложились в смету. Всё честно, как и обещали.", stars: 5 },
  { name: "Ирина К.",    loc: "Пушкин, СПб",      text: "Баня-бочка — лучшее, что купили для участка. Детям нравится, соседи завидуют. Быстро и аккуратно.", stars: 5 },
];

const FAQS = [
  { q: "Почему без предоплаты?", a: "Работаем в СПб и ЛО 10 лет. Вы платите только после того, как осмотрели баню на участке и остались довольны. Наша уверенность — ваша гарантия." },
  { q: "Сколько займёт установка?", a: "Стандартная баня — 1 рабочий день. Утром приезжаем с бригадой, вечером принимаете готовую парилку. Большие модели — 2 дня." },
  { q: "Нужен ли фундамент?", a: "Нет. Мобильные бани не требуют капитального фундамента — достаточно ровной площадки или блочных опор. Помогаем подготовить основание." },
  { q: "Из чего сделаны бани?", a: "Каркас — сосна камерной сушки, вагонка — липа или осина класса А, утеплитель — ROCKWOOL. Все материалы сертифицированы, документы передаём при сдаче." },
  { q: "Что входит в гарантию?", a: "2 года на конструкцию и все узлы. При любом гарантийном случае — выезд мастера в течение 48 часов, бесплатно." },
];

const WOOD_TYPES  = ["Липа (класс А)", "Осина", "Кедр", "Сосна"];
const EXTRAS      = ["Печь Harvia", "Душевая кабина", "Веранда", "Утеплённый пол"];
const EXTRA_PRICE = 55000;

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title }: { open: boolean; onClose: () => void; title: string }) {
  const [phone, setPhone] = useState("");
  const [ok, setOk] = useState(false);
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSend = () => { if (phone && ok) setSent(true); };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px]" />
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl"
        style={{ border: "1px solid var(--c-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {!sent ? (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              <Icon name="X" size={16} />
            </button>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--c-sand)" }}>
              <Icon name="PhoneCall" size={22} className="text-[--c-brown]" style={{ color: "var(--c-brown)" }} />
            </div>
            <h3 className="font-display text-2xl mb-1" style={{ color: "var(--c-text)" }}>{title}</h3>
            <p className="text-sm mb-6" style={{ color: "var(--c-muted)" }}>Перезвоним за 10 минут в рабочее время</p>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 text-base mb-4 focus:outline-none transition-colors"
              style={{ background: "var(--c-sand)", border: "1.5px solid var(--c-border)", color: "var(--c-text)" }}
            />
            <label className="flex items-start gap-3 mb-6 cursor-pointer" onClick={() => setOk(!ok)}>
              <div className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-colors"
                style={{ background: ok ? "var(--c-brown)" : "transparent", borderColor: ok ? "var(--c-brown)" : "var(--c-border)" }}>
                {ok && <Icon name="Check" size={11} className="text-white" />}
              </div>
              <span className="text-xs leading-relaxed" style={{ color: "var(--c-muted)" }}>Согласен на обработку персональных данных</span>
            </label>
            <button
              onClick={handleSend}
              disabled={!phone || !ok}
              className="w-full btn-cta text-lg py-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              ПОЛУЧИТЬ РАСЧЁТ →
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--c-sand)" }}>
              <Icon name="CheckCircle" size={36} className="text-green-500" />
            </div>
            <h3 className="font-display text-2xl mb-2" style={{ color: "var(--c-text)" }}>Заявка принята!</h3>
            <p className="text-sm" style={{ color: "var(--c-muted)" }}>Менеджер перезвонит вам в течение 10 минут</p>
            <button onClick={onClose} className="mt-6 btn-cta px-8 py-3 text-sm">Хорошо</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const [modal, setModal]     = useState({ open: false, title: "" });
  const [size, setSize]       = useState(4);
  const [wood, setWood]       = useState(0);
  const [extras, setExtras]   = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal({ open: false, title: "" });

  const woodMult  = [1, 1.0, 1.45, 0.9][wood];
  const baseP     = Math.round(265000 * (size / 3) * woodMult);
  const extrasP   = [0,1,2,3].filter(i => extras & (1<<i)).length * EXTRA_PRICE;
  const totalP    = baseP + extrasP;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--c-cream)", color: "var(--c-text)" }}>
      <Modal open={modal.open} onClose={closeModal} title={modal.title} />

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/92 backdrop-blur-md"
        style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="text-2xl">🌲</span>
            <div>
              <div className="font-display text-[17px] leading-tight text-grad">ДОМА ДА БАНИ</div>
              <div className="text-[10px] leading-none tracking-wide" style={{ color: "var(--c-muted)" }}>мобильные бани · СПб и ЛО</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: "var(--c-muted)" }}>
            {[["#models","Модели"],["#calc","Калькулятор"],["#steps","Как работаем"],["#reviews","Отзывы"],["#faq","FAQ"]].map(([href,label]) => (
              <a key={href} href={href} className="hover:text-[--c-brown] transition-colors"
                style={{ "--c-brown": "var(--c-brown)" } as React.CSSProperties}>{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden lg:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: "var(--c-brown)" }}>
              <Icon name="Phone" size={14} />8-800-123-45-67
            </a>
            <button onClick={() => openModal("Получить расчёт")} className="btn-cta px-5 py-2.5 text-sm">
              РАСЧЁТ БЕСПЛАТНО
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Мобильная баня" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(105deg, rgba(10,6,2,0.82) 0%, rgba(10,6,2,0.55) 55%, rgba(10,6,2,0.18) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(0deg, rgba(10,6,2,0.65) 0%, transparent 45%)"
          }} />
        </div>

        <div className="relative container mx-auto px-5 py-28">
          <div className="max-w-[640px]">

            {/* live badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 anim-up"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/85 text-sm">Принимаем заказы · СПб и ЛО</span>
            </div>

            <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.04] text-white mb-5 anim-up d1">
              МОБИЛЬНЫЕ БАНИ<br />
              <span style={{ color: "var(--c-gold)" }}>ПОД КЛЮЧ</span><br />
              В СПб И ЛО
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-9 max-w-lg anim-up d2">
              Привезём и установим за <strong className="text-white">1 день</strong>.&nbsp;
              Платите <strong className="text-white">после осмотра</strong>.&nbsp;
              Цены <strong className="text-white">от 265 000 ₽</strong> — без предоплаты.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 anim-up d3">
              <button onClick={() => openModal("Получить расчёт")}
                className="btn-cta pulse-cta text-xl px-9 py-5">
                ПОЛУЧИТЬ РАСЧЁТ →
              </button>
              <a href="tel:+78001234567" className="btn-ghost-white text-lg px-7 py-5 flex items-center gap-2.5">
                <Icon name="Phone" size={19} />8-800-123-45-67
              </a>
            </div>

            {/* trust strip */}
            <div className="flex flex-wrap gap-5 anim-up d4">
              {[
                { icon: "BadgeCheck", label: "Без предоплаты" },
                { icon: "Truck",      label: "Доставка бесплатно" },
                { icon: "Clock",      label: "Установка за 1 день" },
                { icon: "Shield",     label: "Гарантия 2 года" },
              ].map(it => (
                <div key={it.label} className="flex items-center gap-2 text-white/75 text-sm">
                  <Icon name={it.icon as IconName} size={15} style={{ color: "var(--c-gold)" }} />
                  {it.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 text-xs">
          <span>листайте вниз</span>
          <Icon name="ChevronDown" size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ── NUMBERS STRIP ── */}
      <section className="bg-white py-10 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[--c-border]">
          {[
            { num: "500+",  label: "довольных клиентов" },
            { num: "0 ₽",   label: "предоплата" },
            { num: "1 день", label: "установка под ключ" },
            { num: "10 лет", label: "работаем в СПб и ЛО" },
          ].map(it => (
            <div key={it.num} className="text-center px-4">
              <div className="font-display text-[2.4rem] leading-none text-grad mb-1">{it.num}</div>
              <div className="text-sm" style={{ color: "var(--c-muted)" }}>{it.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="section-label justify-center">Почему выбирают нас</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">ТРИ ПРИЧИНЫ ОБРАТИТЬСЯ К НАМ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Wallet",  num: "0 ₽",    title: "Без предоплаты",     desc: "Платите только после того, как приняли баню на участке. Никаких авансов и рисков для вас.", color: "#FEF3C7" },
              { icon: "Factory", num: "−25%",   title: "Собственный завод",  desc: "Производим сами — без посредников. Поэтому цена на 25% ниже, чем у перекупщиков.", color: "#DCFCE7" },
              { icon: "Truck",   num: "1 день", title: "Привезём и поставим", desc: "Доставка и монтаж включены в цену. Утром приезжаем, вечером топите первый раз.", color: "#FEE2E2" },
            ].map((it, i) => (
              <div key={i} className="card p-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: it.color }}>
                  <Icon name={it.icon as IconName} size={28} style={{ color: "var(--c-brown)" }} />
                </div>
                <div className="font-display text-[3.2rem] leading-none text-grad mb-2">{it.num}</div>
                <h3 className="font-display text-xl mb-3">{it.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── MODELS ── */}
      <section id="models" className="py-20 px-5 bg-white">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="section-label justify-center">Каталог</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">ВЫБЕРИТЕ СВОЮ МОДЕЛЬ</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--c-muted)" }}>Все модели в наличии · Доставка по СПб и ЛО</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODELS.map((m, i) => (
              <div key={i} className="card group overflow-hidden flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={m.img} alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {m.tag && <span className="absolute top-3 left-3 badge-hot">{m.tag}</span>}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl mb-1">{m.name}</h3>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--c-muted)" }}>{m.desc}</p>
                  <div className="flex gap-3 mb-5 mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                      style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>
                      <Icon name="Move" size={12} />{m.size}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                      style={{ background: "var(--c-sand)", color: "var(--c-muted)" }}>
                      <Icon name="Users" size={12} />{m.persons}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--c-border)" }}>
                    <span className="font-display text-xl text-grad">{m.price}</span>
                    <button onClick={() => openModal(`Узнать цену — ${m.name}`)}
                      className="btn-cta px-5 py-2.5 text-sm">
                      УЗНАТЬ ЦЕНУ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── CALCULATOR ── */}
      <section id="calc" className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="section-label justify-center">Онлайн-калькулятор</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">РАССЧИТАЙТЕ СТОИМОСТЬ</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--c-muted)" }}>Предварительная цена за 30 секунд</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12" style={{ border: "1px solid var(--c-border)", boxShadow: "0 2px 24px rgba(124,58,16,0.06)" }}>
            <div className="grid md:grid-cols-2 gap-10">
              {/* controls */}
              <div className="space-y-8">
                {/* length */}
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-sm">Длина бани</span>
                    <span className="font-display text-lg font-semibold text-grad">{size} м</span>
                  </div>
                  <input type="range" min={3} max={8} step={0.5} value={size}
                    onChange={e => setSize(+e.target.value)}
                    className="w-full cursor-pointer accent-orange-700" />
                  <div className="flex justify-between text-xs mt-1.5" style={{ color: "var(--c-muted)" }}>
                    <span>3 м</span><span>8 м</span>
                  </div>
                </div>

                {/* wood */}
                <div>
                  <p className="font-medium text-sm mb-3">Порода дерева</p>
                  <div className="grid grid-cols-2 gap-2">
                    {WOOD_TYPES.map((w, i) => (
                      <button key={i} onClick={() => setWood(i)}
                        className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition-all ${wood === i
                          ? "text-white border-transparent"
                          : "border-[--c-border] hover:border-orange-300"}`}
                        style={{
                          background: wood === i ? "var(--c-brown)" : "var(--c-sand)",
                          color: wood === i ? "#fff" : "var(--c-text)",
                          "--c-border": "var(--c-border)",
                        } as React.CSSProperties}>
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                {/* extras */}
                <div>
                  <p className="font-medium text-sm mb-3">Дополнения</p>
                  <div className="space-y-3">
                    {EXTRAS.map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div onClick={() => setExtras(p => p ^ (1<<i))}
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-all"
                          style={{
                            background: extras & (1<<i) ? "var(--c-brown)" : "transparent",
                            borderColor: extras & (1<<i) ? "var(--c-brown)" : "var(--c-border)"
                          }}>
                          {!!(extras & (1<<i)) && <Icon name="Check" size={11} className="text-white" />}
                        </div>
                        <span className="text-sm flex-1" style={{ color: "var(--c-text)" }}>{opt}</span>
                        <span className="text-xs" style={{ color: "var(--c-muted)" }}>+{EXTRA_PRICE.toLocaleString("ru")} ₽</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* result */}
              <div className="flex flex-col justify-between">
                <div className="rounded-2xl p-8 text-center mb-6"
                  style={{ background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)", border: "1px solid #FCD34D" }}>
                  <p className="text-sm mb-3" style={{ color: "var(--c-muted)" }}>Предварительная стоимость</p>
                  <div className="font-display text-[3rem] leading-none text-grad mb-1">
                    {totalP.toLocaleString("ru-RU")} ₽
                  </div>
                  <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--c-muted)" }}>
                    Включает доставку и монтаж.<br />Точная цена после консультации.
                  </p>
                  <div className="mt-4 pt-4 text-xs flex items-center justify-center gap-1.5"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.06)", color: "var(--c-muted)" }}>
                    <Icon name="ShieldCheck" size={13} />
                    Без предоплаты · Гарантия 2 года
                  </div>
                </div>
                <button onClick={() => openModal("Точный расчёт от менеджера")}
                  className="btn-cta w-full text-lg py-5 mb-2">
                  ТОЧНЫЙ РАСЧЁТ →
                </button>
                <p className="text-center text-xs" style={{ color: "var(--c-muted)" }}>
                  Менеджер перезвонит за 10 минут
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── HOW IT WORKS ── */}
      <section id="steps" className="py-20 px-5 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="section-label justify-center">Процесс</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">КАК МЫ РАБОТАЕМ</h2>
          </div>
          <div className="space-y-5">
            {STEPS.map((s, i) => (
              <div key={i} className="relative flex gap-5 items-start">
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-[-20px] w-0.5"
                    style={{ background: "linear-gradient(180deg, var(--c-border), transparent)" }} />
                )}
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display text-white text-sm relative z-10"
                  style={{ background: "linear-gradient(135deg, var(--c-brown), var(--c-amber))" }}>
                  {i + 1}
                </div>
                <div className="card flex-1 p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--c-sand)" }}>
                    <Icon name={s.icon as IconName} size={20} style={{ color: "var(--c-brown)" }} />
                  </div>
                  <div>
                    <div className="font-display text-base">{s.title}</div>
                    <div className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--c-muted)" }}>{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => openModal("Начать — первый шаг")}
              className="btn-cta px-10 py-5 text-lg">
              НАЧАТЬ СЕЙЧАС →
            </button>
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── GALLERY ── */}
      <section className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="section-label justify-center">Наши работы</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">ГАЛЕРЕЯ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[IMG_HERO, IMG_INTERIOR, IMG_BARREL, IMG_INSTALL, IMG_OLD_HERO, IMG_HERO, IMG_INTERIOR, IMG_BARREL].map((src, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                <img src={src} alt={`Работа ${i+1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                  style={{ background: "rgba(10,6,2,0.45)" }}>
                  <button onClick={() => openModal("Хочу такую же баню")}
                    className="btn-cta px-5 py-2.5 text-sm translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    ХОЧУ ТАКУЮ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-20 px-5 bg-white">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="section-label">Клиенты о нас</div>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">ОТЗЫВЫ</h2>
            </div>
            <button onClick={() => openModal("Оставить отзыв")} className="btn-outline px-6 py-3 text-sm">
              + ОСТАВИТЬ ОТЗЫВ
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({length: r.stars}).map((_,j) => <span key={j} className="text-amber-400 text-lg">★</span>)}
                </div>
                <p className="text-sm leading-relaxed italic mb-5" style={{ color: "var(--c-text)" }}>«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--c-border)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--c-brown), var(--c-wood))" }}>
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
      <section className="py-20 px-5" style={{ background: "var(--c-sand)" }}>
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <div className="section-label justify-center">Надёжность</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">ГАРАНТИИ И ДОКУМЕНТЫ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              { icon: "Award",      title: "Гарантия 2 года",   desc: "На конструкцию и узлы" },
              { icon: "FileCheck",  title: "Сертификаты ГОСТ",  desc: "На все материалы" },
              { icon: "Users",      title: "500+ клиентов",     desc: "По СПб и ЛО" },
              { icon: "CalendarCheck", title: "10 лет работы",  desc: "На рынке с 2014 года" },
            ].map((it, i) => (
              <div key={i} className="text-center card p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#FEF3C7" }}>
                  <Icon name={it.icon as IconName} size={24} style={{ color: "var(--c-brown)" }} />
                </div>
                <div className="font-display text-base mb-1">{it.title}</div>
                <div className="text-xs" style={{ color: "var(--c-muted)" }}>{it.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => openModal("Запросить договор и сертификаты")}
              className="btn-cta px-10 py-5 text-lg">
              ЗАПРОСИТЬ ДОГОВОР →
            </button>
          </div>
        </div>
      </section>

      <div className="divider mx-5" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-5 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="section-label justify-center">Ответы на вопросы</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]">ЧАСТО СПРАШИВАЮТ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all"
                style={{ border: `1.5px solid ${openFaq === i ? "var(--c-amber)" : "var(--c-border)"}`, background: "#fff" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-amber-50/40 transition-colors">
                  <span className="font-display text-[1.05rem]">{item.q}</span>
                  <Icon name="ChevronDown" size={19} className="flex-shrink-0 ml-4 transition-transform duration-300"
                    style={{ color: "var(--c-amber)", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => openModal("Задать вопрос менеджеру")} className="btn-outline px-8 py-4">
              СПРОСИТЬ МЕНЕДЖЕРА →
            </button>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FOOTER CTA ── */}
      <section className="py-24 px-5 text-center" style={{ background: "var(--c-cream)" }}>
        <div className="container mx-auto max-w-xl">
          <span className="text-4xl mb-4 block">🌲</span>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] mb-3">ГОТОВЫ К ПЕРВОЙ ТОПКЕ?</h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: "var(--c-muted)" }}>
            Оставьте телефон — перезвоним за 10 минут, подберём модель и назовём точную цену
          </p>
          <div className="bg-white rounded-3xl p-8 md:p-10" style={{ border: "1px solid var(--c-border)", boxShadow: "0 2px 20px rgba(124,58,16,0.06)" }}>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input type="tel" placeholder="+7 (___) ___-__-__"
                className="flex-1 rounded-xl px-5 py-4 text-base focus:outline-none transition-colors"
                style={{ background: "var(--c-sand)", border: "1.5px solid var(--c-border)", color: "var(--c-text)" }} />
              <button onClick={() => openModal("Получить расчёт")}
                className="btn-cta px-7 py-4 whitespace-nowrap">
                РАССЧИТАТЬ →
              </button>
            </div>
            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-orange-700" />
              <span className="text-xs" style={{ color: "var(--c-muted)" }}>Согласен на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-5" style={{ background: "var(--c-sand)", borderTop: "1px solid var(--c-border)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--c-muted)" }}>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌲</span>
            <span className="font-display text-grad">ДОМА ДА БАНИ</span>
          </div>
          <span>© 2024 · Мобильные бани в СПб и ЛО</span>
          <div className="flex gap-5">
            <a href="#" className="hover:underline">Политика конфиденциальности</a>
            <a href="#" className="hover:underline">Оферта</a>
          </div>
        </div>
      </footer>

      {/* ── MOBILE FLOATING BAR ── */}
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
          <button onClick={() => openModal("Получить расчёт")}
            className="flex-1 flex flex-col items-center gap-1 py-3 btn-cta rounded-none">
            <Icon name="Calculator" size={20} />
            <span className="text-xs font-bold">Расчёт</span>
          </button>
        </div>
      </div>

    </div>
  );
}
