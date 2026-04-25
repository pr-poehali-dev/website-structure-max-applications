import { useState } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const IMG_HERO     = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/c2830de6-286b-432e-99e6-bd994863bdc3.jpg";
const IMG_INTERIOR = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/9d642438-b7e2-4903-a3d7-8353c25beaaf.jpg";
const IMG_INSTALL  = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/7f26f35a-c836-4006-bc2c-281f7957da10.jpg";
const IMG_SAUNA    = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/11d83af8-e9eb-485a-8900-9d6e02a6ae97.jpg";

const MODELS = [
  { name: "Стандарт 3×2", size: "3×2 м", persons: "до 4 чел", price: "от 265 000 ₽", img: IMG_SAUNA, tag: "" },
  { name: "Комфорт 4×2,3", size: "4×2,3 м", persons: "до 6 чел", price: "от 340 000 ₽", img: IMG_HERO, tag: "Хит" },
  { name: "Люкс 5×2,5", size: "5×2,5 м", persons: "до 8 чел", price: "от 480 000 ₽", img: IMG_INTERIOR, tag: "" },
  { name: "Семейная 6×3", size: "6×3 м", persons: "до 12 чел", price: "от 640 000 ₽", img: IMG_INSTALL, tag: "" },
  { name: "Баня-бочка", size: "Ø 2,2 м", persons: "до 4 чел", price: "от 185 000 ₽", img: IMG_SAUNA, tag: "Новинка" },
];

const GALLERY_IMGS = [IMG_HERO, IMG_INTERIOR, IMG_INSTALL, IMG_SAUNA, IMG_HERO, IMG_INTERIOR, IMG_INSTALL, IMG_SAUNA];

const REVIEWS = [
  { name: "Виктор П.", loc: "Всеволожский р-н", text: "Привезли и поставили за 6 часов. Без предоплаты — это вообще огонь, нигде такого не видел. Уже второй сезон паримся, всё отлично.", stars: 5 },
  { name: "Светлана М.", loc: "Гатчина", text: "Выбирала долго, объехала несколько компаний. Здесь честная цена, нормальная вагонка, не фанера. Рекомендую без оговорок.", stars: 5 },
  { name: "Алексей Д.", loc: "Выборгский р-н", text: "Заказали на дачу модель 4×2,3. Мастера приехали вовремя, выровняли площадку сами, уложились в смету. Всё честно.", stars: 5 },
  { name: "Ирина К.", loc: "Пушкин, СПб", text: "Баня-бочка — лучшее, что мы купили для участка. Детям нравится, соседи завидуют. Установили быстро и аккуратно.", stars: 5 },
];

const FAQS = [
  { q: "Почему без предоплаты?", a: "Мы работаем в СПб и ЛО 10 лет. Доверие клиента — наш главный актив. Вы платите только после того, как осмотрели баню на участке и остались довольны." },
  { q: "Сколько времени занимает установка?", a: "Стандартная баня устанавливается за 1 рабочий день. Утром привозим, вечером принимаете готовую парилку. Для больших моделей — 2 дня." },
  { q: "Какой фундамент нужен?", a: "Мобильные бани не требуют капитального фундамента. Достаточно ровной площадки или блочных опор. Наши мастера помогут подготовить основание." },
  { q: "Из каких материалов изготовлены бани?", a: "Каркас — сосна камерной сушки, вагонка — липа или осина класса А, утеплитель — ROCKWOOL. Все материалы сертифицированы, есть документы." },
  { q: "Есть ли гарантия?", a: "Да, 2 года гарантии на конструкцию и все узлы. Выезд мастера в течение 48 часов при любом гарантийном случае. Бесплатно." },
];

const WOOD_TYPES = ["Липа (класс А)", "Осина", "Кедр", "Сосна"];
const EXTRAS = ["Печь Harvia", "Душевая кабина", "Веранда", "Утеплённый пол"];

function PhoneModal({ isOpen, onClose, title }: { isOpen: boolean; onClose: () => void; title: string }) {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-3xl p-8 bg-white shadow-2xl fade-in-up border border-[--brand-border]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <Icon name="X" size={20} />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
          <Icon name="PhoneCall" size={24} className="text-[--brand-brown]" />
        </div>
        <h3 className="font-display text-2xl text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-6">Перезвоним за 10 минут в рабочее время</p>
        <input
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 mb-4 font-body text-base"
        />
        <label className="flex items-start gap-3 mb-6 cursor-pointer" onClick={() => setConsent(!consent)}>
          <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-colors ${consent ? "bg-[--brand-brown] border-[--brand-brown]" : "border-gray-300"}`}>
            {consent && <Icon name="Check" size={11} className="text-white" />}
          </div>
          <span className="text-gray-400 text-xs leading-relaxed">Согласен на обработку персональных данных</span>
        </label>
        <button
          disabled={!phone || !consent}
          className="w-full btn-primary font-display font-semibold text-lg py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          ПОЛУЧИТЬ РАСЧЁТ →
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [size, setSize] = useState(4);
  const [wood, setWood] = useState(0);
  const [extrasMask, setExtrasMask] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (title: string) => { setModalTitle(title); setModalOpen(true); };

  const basePrice = 265000;
  const sizePrice = Math.round(basePrice * (size / 3) * [1, 1.15, 1.4, 1.0][wood]);
  const extrasPrice = [0, 1, 2, 3].filter((i) => extrasMask & (1 << i)).length * 55000;
  const totalPrice = sizePrice + extrasPrice;

  return (
    <div className="min-h-screen bg-[--brand-cream] text-gray-800 font-body overflow-x-hidden">
      <PhoneModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-[--brand-border] flex items-center justify-between px-6 py-3.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌲</span>
          <div>
            <div className="font-display text-lg leading-tight gradient-text">ДОМА ДА БАНИ</div>
            <div className="text-xs text-gray-400 leading-none">мобильные бани</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm text-gray-600">
          <a href="#calc" className="hover:text-[--brand-brown] transition-colors">Калькулятор</a>
          <a href="#models" className="hover:text-[--brand-brown] transition-colors">Модели</a>
          <a href="#reviews" className="hover:text-[--brand-brown] transition-colors">Отзывы</a>
          <a href="#faq" className="hover:text-[--brand-brown] transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+78001234567" className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[--brand-brown] transition-colors">
            <Icon name="Phone" size={15} />
            8-800-123-45-67
          </a>
          <button
            onClick={() => openModal("Получить расчёт")}
            className="btn-primary font-display font-semibold px-5 py-2.5 rounded-xl text-sm"
          >
            РАСЧЁТ БЕСПЛАТНО
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Мобильная баня" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6 fade-in-up">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">СПб и Ленобласть — работаем сегодня</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-5 fade-in-up stagger-1">
              МОБИЛЬНЫЕ БАНИ<br />
              <span className="text-[--brand-amber]">ПОД КЛЮЧ</span><br />
              В СПб И ЛО
            </h1>

            <p className="text-white/85 text-lg md:text-xl mb-3 fade-in-up stagger-2">
              Без предоплаты. Установка за 1 день.
            </p>
            <p className="text-white/70 text-base md:text-lg mb-10 fade-in-up stagger-2">
              Привезём и установим на вашем участке. Платите только после осмотра. <strong className="text-[--brand-amber]">От 265 000 ₽</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in-up stagger-3">
              <button
                onClick={() => openModal("Получить расчёт стоимости")}
                className="btn-primary font-display font-bold text-xl px-10 py-5 rounded-2xl pulse-btn"
              >
                ПОЛУЧИТЬ РАСЧЁТ →
              </button>
              <a
                href="tel:+78001234567"
                className="flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-display text-lg px-8 py-5 rounded-2xl hover:bg-white/25 transition-all"
              >
                <Icon name="Phone" size={20} />
                8-800-123-45-67
              </a>
            </div>

            <div className="flex flex-wrap gap-5 mt-10 fade-in-up stagger-4">
              {[
                { icon: "BadgeCheck", text: "Без предоплаты" },
                { icon: "Truck", text: "Доставка бесплатно" },
                { icon: "Clock", text: "Установка за 1 день" },
                { icon: "ShieldCheck", text: "Гарантия 2 года" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/80 text-sm">
                  <Icon name={item.icon as IconName} size={15} className="text-[--brand-amber]" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "Wallet",
                num: "0 ₽",
                title: "Без предоплаты",
                desc: "Платите только после того, как увидели баню на своём участке и убедились в качестве. Никаких авансов.",
                color: "bg-amber-50",
                iconColor: "text-amber-600",
              },
              {
                icon: "Factory",
                num: "−25%",
                title: "Своё производство",
                desc: "Делаем сами на собственном заводе — без посредников. Поэтому цена на 25% ниже, чем у перепродавцов.",
                color: "bg-green-50",
                iconColor: "text-green-600",
              },
              {
                icon: "Truck",
                num: "1 день",
                title: "Привезём и поставим",
                desc: "Доставка и установка включены в цену. Утром приезжаем, вечером вы принимаете готовую парилку.",
                color: "bg-orange-50",
                iconColor: "text-orange-600",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-8 card-wood">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-5`}>
                  <Icon name={item.icon as IconName} size={28} className={item.iconColor} />
                </div>
                <div className="font-display text-5xl gradient-text mb-2">{item.num}</div>
                <h3 className="font-display text-xl text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CALCULATOR */}
      <section id="calc" className="py-20 px-6 bg-[--brand-cream]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-[--brand-brown] font-display tracking-widest text-sm uppercase mb-3 block">Онлайн-калькулятор</span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-800 mb-3">РАССЧИТАЙТЕ СТОИМОСТЬ</h2>
            <p className="text-gray-500">Предварительная цена за 30 секунд</p>
          </div>

          <div className="rounded-3xl bg-white border border-[--brand-border] p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-gray-700 font-medium">Длина бани</label>
                    <span className="text-[--brand-brown] font-display text-lg font-semibold">{size} м</span>
                  </div>
                  <input
                    type="range" min={3} max={8} step={0.5} value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                    <span>3 м</span><span>8 м</span>
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-medium mb-3 block">Порода древесины</label>
                  <div className="grid grid-cols-2 gap-2">
                    {WOOD_TYPES.map((w, i) => (
                      <button
                        key={i}
                        onClick={() => setWood(i)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${wood === i ? "bg-[--brand-brown] text-white border-[--brand-brown]" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-300"}`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-medium mb-3 block">Дополнения</label>
                  <div className="space-y-2.5">
                    {EXTRAS.map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => setExtrasMask((prev) => prev ^ (1 << i))}
                          className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-colors ${extrasMask & (1 << i) ? "bg-[--brand-brown] border-[--brand-brown]" : "border-gray-300 group-hover:border-orange-400"}`}
                        >
                          {(extrasMask & (1 << i)) !== 0 && <Icon name="Check" size={11} className="text-white" />}
                        </div>
                        <span className="text-gray-600 text-sm">{opt}</span>
                        <span className="ml-auto text-gray-400 text-xs">+55 000 ₽</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-100 p-8 text-center mb-6">
                  <p className="text-gray-500 mb-2 text-sm">Предварительная стоимость</p>
                  <div className="font-display text-5xl gradient-text mb-1">
                    {totalPrice.toLocaleString("ru-RU")} ₽
                  </div>
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed">Точная цена после консультации с менеджером. Включает доставку и монтаж.</p>
                  <div className="mt-4 pt-4 border-t border-orange-100 text-xs text-gray-500">
                    🌲 Без предоплаты · Гарантия 2 года
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => openModal("Точный расчёт от менеджера")}
                    className="w-full btn-primary font-display font-bold text-lg py-5 rounded-2xl"
                  >
                    ТОЧНЫЙ РАСЧЁТ →
                  </button>
                  <p className="text-center text-gray-400 text-xs">Менеджер перезвонит за 10 минут</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MODELS / PROJECTS */}
      <section id="models" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-[--brand-brown] font-display tracking-widest text-sm uppercase mb-3 block">Каталог</span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-800">ПОПУЛЯРНЫЕ МОДЕЛИ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODELS.map((m, i) => (
              <div key={i} className="rounded-2xl overflow-hidden card-wood group">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {m.tag && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-[--brand-brown] text-white text-xs font-display font-semibold px-3 py-1 rounded-full">
                        {m.tag}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-gray-800 mb-3">{m.name}</h3>
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Icon name="Move" size={14} className="text-[--brand-wood]" />
                      {m.size}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Icon name="Users" size={14} className="text-[--brand-wood]" />
                      {m.persons}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display text-xl gradient-text">{m.price}</span>
                  </div>
                  <button
                    onClick={() => openModal(`Узнать цену — ${m.name}`)}
                    className="w-full border-2 border-[--brand-brown] text-[--brand-brown] font-display py-3 rounded-xl hover:bg-[--brand-brown] hover:text-white transition-all duration-200 text-sm font-semibold"
                  >
                    УЗНАТЬ ЦЕНУ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* GALLERY */}
      <section className="py-20 px-6 bg-[--brand-cream]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-[--brand-brown] font-display tracking-widest text-sm uppercase mb-3 block">Наши работы</span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-800">ГАЛЕРЕЯ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {GALLERY_IMGS.map((src, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm">
                <img
                  src={src}
                  alt={`Баня ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-2xl">
                  <button
                    onClick={() => openModal("Хочу такую же баню")}
                    className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 btn-primary font-display font-bold px-4 py-2.5 rounded-xl text-sm"
                  >
                    ХОЧУ ТАКУЮ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-[--brand-brown] font-display tracking-widest text-sm uppercase mb-3 block">Клиенты о нас</span>
              <h2 className="font-display text-4xl md:text-5xl text-gray-800">ОТЗЫВЫ</h2>
            </div>
            <button
              onClick={() => openModal("Оставить отзыв")}
              className="border-2 border-[--brand-brown] text-[--brand-brown] font-display px-6 py-3 rounded-xl hover:bg-[--brand-brown] hover:text-white transition-all text-sm font-semibold"
            >
              + ОСТАВИТЬ ОТЗЫВ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-2xl p-7 card-wood">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 text-sm italic">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[--brand-brown] to-[--brand-wood] flex items-center justify-center font-display text-white font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold text-sm">{r.name}</div>
                    <div className="text-gray-400 text-xs flex items-center gap-1">
                      <Icon name="MapPin" size={11} />
                      {r.loc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TRUST */}
      <section className="py-20 px-6 bg-[--brand-cream]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-[--brand-brown] font-display tracking-widest text-sm uppercase mb-3 block">Почему доверяют нам</span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-800">ГАРАНТИИ И ДОКУМЕНТЫ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              { icon: "Award", title: "Гарантия 2 года", desc: "На конструкцию и узлы" },
              { icon: "FileCheck", title: "Сертификаты ГОСТ", desc: "На все материалы" },
              { icon: "Users", title: "500+ клиентов", desc: "По СПб и ЛО" },
              { icon: "Star", title: "10 лет работы", desc: "С 2014 года" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl card-wood">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as IconName} size={24} className="text-[--brand-brown]" />
                </div>
                <div className="font-display text-base text-gray-800 mb-1">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => openModal("Запросить договор и сертификаты")}
              className="btn-primary font-display font-bold px-10 py-5 rounded-2xl text-lg"
            >
              ЗАПРОСИТЬ ДОГОВОР →
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-[--brand-brown] font-display tracking-widest text-sm uppercase mb-3 block">Отвечаем на вопросы</span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-800">ЧАСТО СПРАШИВАЮТ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border transition-all ${openFaq === i ? "border-orange-300 shadow-sm" : "border-[--brand-border] bg-white"}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-orange-50/50 transition-colors"
                >
                  <span className="font-display text-lg text-gray-800">{item.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className={`text-[--brand-brown] flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-500 leading-relaxed text-sm bg-white fade-in-up">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => openModal("Задать вопрос менеджеру")}
              className="border-2 border-[--brand-brown] text-[--brand-brown] font-display px-8 py-4 rounded-2xl hover:bg-[--brand-brown] hover:text-white transition-all font-semibold"
            >
              СПРОСИТЬ МЕНЕДЖЕРА →
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FOOTER FORM */}
      <section className="py-20 px-6 bg-[--brand-cream]">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-4xl mb-4">🌲</div>
          <h2 className="font-display text-4xl md:text-5xl text-gray-800 mb-4">ГОТОВЫ К РАСЧЁТУ?</h2>
          <p className="text-gray-500 mb-10">Оставьте телефон — перезвоним за 10 минут и подберём подходящую модель</p>
          <div className="rounded-3xl bg-white border border-[--brand-border] p-8 md:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 font-body text-base"
              />
              <button
                onClick={() => openModal("Получить расчёт")}
                className="btn-primary font-display font-bold px-8 py-4 rounded-xl whitespace-nowrap"
              >
                РАССЧИТАТЬ →
              </button>
            </div>
            <label className="flex items-center gap-3 justify-center cursor-pointer">
              <input type="checkbox" className="accent-orange-600 w-4 h-4" />
              <span className="text-gray-400 text-xs">Согласен на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[--brand-border] py-10 px-6 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌲</span>
            <div className="font-display text-lg gradient-text">ДОМА ДА БАНИ</div>
          </div>
          <div className="text-gray-400 text-sm">© 2024 · Мобильные бани в СПб и ЛО</div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[--brand-brown] transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-[--brand-brown] transition-colors">Оферта</a>
          </div>
        </div>
      </footer>

      {/* FLOATING MOBILE PANEL */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-area-bottom">
        <div className="bg-white border-t border-[--brand-border] shadow-lg flex">
          <a
            href="tel:+78001234567"
            className="flex-1 flex flex-col items-center gap-1 py-3 text-gray-600 hover:text-[--brand-brown] transition-colors"
          >
            <Icon name="Phone" size={20} />
            <span className="text-xs font-medium">Звонок</span>
          </a>
          <a
            href="https://wa.me/78001234567"
            className="flex-1 flex flex-col items-center gap-1 py-3 text-green-600 hover:text-green-700 transition-colors"
          >
            <Icon name="MessageCircle" size={20} />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
          <button
            onClick={() => openModal("Получить расчёт")}
            className="flex-1 flex flex-col items-center gap-1 py-3 btn-primary"
          >
            <Icon name="Calculator" size={20} />
            <span className="text-xs font-bold">Расчёт</span>
          </button>
        </div>
      </div>
    </div>
  );
}
