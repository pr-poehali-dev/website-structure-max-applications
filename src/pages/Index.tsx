import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/e2a62c76-702b-4ea4-9235-b38e11a4a641.jpg";
const PRODUCT_IMG = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/36e3c4b8-f4ad-4b60-9161-8ec2c5eb9bd6.jpg";
const WORKSHOP_IMG = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/c11b4970-369e-4d53-98ee-d3d20589b5ef.jpg";

const MATERIALS = ["Сталь 09Г2С", "Нержавейка 304", "Алюминий АД31", "Чугун СЧ20"];
const OPTIONS = ["Порошковая покраска", "Гальваника", "Термообработка", "Лазерная резка"];

const PROJECTS = [
  { title: "Металлоконструкция склада", area: "1 200 м²", price: "от 2 850 000 ₽", tag: "Завершён" },
  { title: "Ограждение промзоны", area: "850 пог.м", price: "от 680 000 ₽", tag: "Завершён" },
  { title: "Опоры ЛЭП под ключ", area: "120 шт", price: "от 3 200 000 ₽", tag: "В работе" },
  { title: "Резервуар хранения", area: "50 м³", price: "от 1 400 000 ₽", tag: "Завершён" },
  { title: "Несущие фермы цеха", area: "600 м²", price: "от 1 750 000 ₽", tag: "Завершён" },
];

const REVIEWS = [
  { name: "Андрей К.", role: "Директор ООО «СтройПром»", text: "Заказали металлоконструкции для нового цеха. Всё сделали за 18 дней, качество выше ожиданий. Никаких предоплат — очень удобно.", stars: 5 },
  { name: "Марина В.", role: "Главный инженер завода", text: "Третий заказ подряд. Цена честная, сроки держат, материалы сертифицированные. Рекомендую всем коллегам.", stars: 5 },
  { name: "Сергей Н.", role: "ИП, производство мебели", text: "Небольшой объём, но отнеслись профессионально. Доставили точно в срок, сэкономили 25% по сравнению с конкурентами.", stars: 5 },
  { name: "Ольга М.", role: "Тендерный отдел, «МегаСтрой»", text: "Работаем уже год. Всегда чёткие договора, соответствие ГОСТам, отчётные документы без задержек.", stars: 5 },
];

const FAQS = [
  { q: "Почему вы работаете без предоплаты?", a: "Мы уверены в качестве и сроках. Оплата по факту сдачи готовых изделий — наша гарантия ответственности перед клиентом." },
  { q: "Как формируется цена от 265 000 ₽?", a: "Стоимость зависит от материала, объёма, сложности обработки. Точный расчёт делается за 2 часа после замера или чертежа." },
  { q: "Какие сроки производства?", a: "Стандартные изделия — от 1 рабочего дня. Сложные конструкции — от 5 дней. Точные сроки фиксируются в договоре." },
  { q: "Есть ли у вас гарантия на продукцию?", a: "Да, 2 года гарантии на все изделия. При производственном браке — бесплатная замена в течение 48 часов." },
  { q: "Как организована доставка?", a: "Бесплатная доставка по городу и области. Для дальних регионов — согласовываем логистику и включаем в смету." },
];

function PhoneModal({ isOpen, onClose, title }: { isOpen: boolean; onClose: () => void; title: string }) {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl p-8 card-glass border border-orange-500/30 fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <Icon name="X" size={20} />
        </button>
        <div className="text-orange-400 mb-2">
          <Icon name="PhoneCall" size={28} />
        </div>
        <h3 className="font-display text-2xl text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">Перезвоним за 10 минут в рабочее время</p>
        <input
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 mb-4 font-body"
        />
        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <div
            className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${consent ? "bg-orange-500 border-orange-500" : "border-gray-600"}`}
            onClick={() => setConsent(!consent)}
          >
            {consent && <Icon name="Check" size={12} className="text-black" />}
          </div>
          <span className="text-gray-400 text-xs leading-relaxed">
            Согласен на обработку персональных данных в соответствии с политикой конфиденциальности
          </span>
        </label>
        <button
          disabled={!phone || !consent}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-display font-semibold text-lg py-4 rounded-xl btn-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
        >
          ПОЛУЧИТЬ РАСЧЁТ
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [modalTitle, setModalTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [length, setLength] = useState(10);
  const [material, setMaterial] = useState(0);
  const [optionsMask, setOptionsMask] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (title: string) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const basePrice = 265000;
  const lengthMultiplier = length * 0.9;
  const materialMultiplier = [1, 1.3, 0.85, 0.75][material];
  const optionsCount = [0, 1, 2, 3].filter((i) => optionsMask & (1 << i)).length;
  const calcPrice = Math.round(basePrice * (lengthMultiplier / 10) * materialMultiplier + optionsCount * 45000);

  return (
    <div className="min-h-screen mesh-gradient text-white font-body overflow-x-hidden">
      <PhoneModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="font-display text-xl tracking-wider">
          <span className="gradient-text">ПРОМИЗДЕЛИЯ</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#calc" className="hover:text-orange-400 transition-colors">Калькулятор</a>
          <a href="#projects" className="hover:text-orange-400 transition-colors">Проекты</a>
          <a href="#reviews" className="hover:text-orange-400 transition-colors">Отзывы</a>
          <a href="#faq" className="hover:text-orange-400 transition-colors">FAQ</a>
        </div>
        <button
          onClick={() => openModal("Получить расчёт")}
          className="bg-gradient-to-r from-orange-500 to-amber-500 text-black font-display font-semibold px-5 py-2.5 rounded-xl text-sm btn-glow"
        >
          РАСЧЁТ БЕСПЛАТНО
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Производство" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6 fade-in-up">
              <div className="w-2 h-2 rounded-full bg-orange-400 pulse-ring" />
              <span className="text-orange-300 text-sm font-medium">Производство работает — заявки принимаем сейчас</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6 fade-in-up stagger-1">
              БЕЗ ПРЕДОПЛАТЫ.<br />
              <span className="gradient-text">ДОСТАВКА 1 ДЕНЬ.</span><br />
              ОТ 265 000 ₽
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed fade-in-up stagger-2">
              Собственное производство промышленных и бытовых изделий. Цена на 25% ниже рынка. Гарантия 2 года.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-in-up stagger-3">
              <button
                onClick={() => openModal("Получить расчёт")}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-black font-display font-bold text-xl px-10 py-5 rounded-2xl btn-glow pulse-ring"
              >
                ПОЛУЧИТЬ РАСЧЁТ →
              </button>
              <a
                href="tel:+78001234567"
                className="flex items-center justify-center gap-3 border border-white/20 text-white font-display text-lg px-8 py-5 rounded-2xl hover:border-orange-500/50 hover:bg-white/5 transition-all"
              >
                <Icon name="Phone" size={20} />
                8-800-123-45-67
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-12 fade-in-up stagger-4">
              {[
                { icon: "ShieldCheck", text: "Гарантия 2 года" },
                { icon: "Truck", text: "Доставка бесплатно" },
                { icon: "Clock", text: "Расчёт за 2 часа" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-gray-300 text-sm">
                  <Icon name={item.icon as IconName} size={16} className="text-orange-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "BadgeDollarSign",
                num: "0 ₽",
                title: "Без предоплаты",
                desc: "Оплата только после получения готового изделия. Никаких авансов и рисков для вас.",
              },
              {
                icon: "Factory",
                num: "−25%",
                title: "Своё производство",
                desc: "Прямые цены без посредников. Полный цикл на одном заводе снижает себестоимость на 25%.",
              },
              {
                icon: "Truck",
                num: "1 день",
                title: "Бесплатная доставка",
                desc: "Собственный автопарк. Доставка по городу и области бесплатно, в день отгрузки.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative group rounded-2xl p-8 card-glass hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 border"
                style={{ borderColor: "var(--brand-border)" }}
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/15 flex items-center justify-center mb-6 group-hover:bg-orange-500/25 transition-colors">
                  <Icon name={item.icon as IconName} size={28} className="text-orange-400" />
                </div>
                <div className="font-display text-5xl gradient-text mb-2">{item.num}</div>
                <h3 className="font-display text-xl text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* CALCULATOR */}
      <section id="calc" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-display tracking-widest text-sm uppercase mb-3 block">Онлайн-калькулятор</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">РАССЧИТАЙТЕ СТОИМОСТЬ</h2>
            <p className="text-gray-400">Предварительный расчёт за 30 секунд</p>
          </div>

          <div className="rounded-3xl card-glass p-8 md:p-12 border border-orange-500/15">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-gray-300 font-medium">Длина / объём</label>
                    <span className="text-orange-400 font-display text-lg">{length} м</span>
                  </div>
                  <input
                    type="range" min={1} max={100} value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1 м</span><span>100 м</span>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 font-medium mb-3 block">Материал</label>
                  <div className="grid grid-cols-2 gap-2">
                    {MATERIALS.map((m, i) => (
                      <button
                        key={i}
                        onClick={() => setMaterial(i)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${material === i ? "bg-orange-500 text-black" : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 font-medium mb-3 block">Дополнительные опции</label>
                  <div className="space-y-2">
                    {OPTIONS.map((opt, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => setOptionsMask((prev) => prev ^ (1 << i))}
                          className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${optionsMask & (1 << i) ? "bg-orange-500 border-orange-500" : "border-gray-600 group-hover:border-orange-500/50"}`}
                        >
                          {(optionsMask & (1 << i)) !== 0 && <Icon name="Check" size={12} className="text-black" />}
                        </div>
                        <span className="text-gray-300 text-sm">{opt}</span>
                        <span className="ml-auto text-gray-500 text-xs">+45 000 ₽</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 p-8 text-center mb-6">
                  <p className="text-gray-400 mb-2 text-sm">Предварительная стоимость</p>
                  <div className="font-display text-5xl gradient-text mb-1">
                    {calcPrice.toLocaleString("ru-RU")} ₽
                  </div>
                  <p className="text-gray-500 text-xs mt-3">Точная цена после консультации с инженером</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => openModal("Точный расчёт от инженера")}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-display font-bold text-lg py-5 rounded-2xl btn-glow"
                  >
                    ТОЧНЫЙ РАСЧЁТ →
                  </button>
                  <p className="text-center text-gray-500 text-xs">Инженер перезвонит за 10 минут</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-display tracking-widest text-sm uppercase mb-3 block">Наши работы</span>
            <h2 className="font-display text-4xl md:text-5xl text-white">ТОП ПРОЕКТОВ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden card-glass border transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30"
                style={{ borderColor: "var(--brand-border)" }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={i % 2 === 0 ? PRODUCT_IMG : WORKSHOP_IMG}
                    alt={p.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${p.tag === "В работе" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/10 text-gray-300"}`}>
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-white mb-2">{p.title}</h3>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-gray-400 text-sm">{p.area}</span>
                    <span className="text-orange-400 font-display">{p.price}</span>
                  </div>
                  <button
                    onClick={() => openModal(`Узнать цену — ${p.title}`)}
                    className="w-full border border-orange-500/40 text-orange-400 font-display py-3 rounded-xl hover:bg-orange-500 hover:text-black transition-all duration-200 text-sm"
                  >
                    УЗНАТЬ ЦЕНУ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* GALLERY */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-display tracking-widest text-sm uppercase mb-3 block">Портфолио</span>
            <h2 className="font-display text-4xl md:text-5xl text-white">ГАЛЕРЕЯ РАБОТ</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={i % 3 === 0 ? HERO_IMG : i % 3 === 1 ? PRODUCT_IMG : WORKSHOP_IMG}
                  alt={`Работа ${i + 1}`}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openModal("Хочу такую же конструкцию")}
                    className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-orange-500 text-black font-display font-bold px-4 py-2 rounded-xl text-sm"
                  >
                    ХОЧУ ТАКУЮ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* REVIEWS */}
      <section id="reviews" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-orange-400 font-display tracking-widest text-sm uppercase mb-3 block">Что говорят клиенты</span>
              <h2 className="font-display text-4xl md:text-5xl text-white">ОТЗЫВЫ</h2>
            </div>
            <button
              onClick={() => openModal("Оставить отзыв")}
              className="border border-orange-500/40 text-orange-400 font-display px-6 py-3 rounded-xl hover:bg-orange-500 hover:text-black transition-all text-sm"
            >
              + ОСТАВИТЬ ОТЗЫВ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 card-glass border transition-all hover:border-orange-500/20"
                style={{ borderColor: "var(--brand-border)" }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-orange-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-display text-black font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{r.name}</div>
                    <div className="text-gray-500 text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* TRUST */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-display tracking-widest text-sm uppercase mb-3 block">Надёжность</span>
            <h2 className="font-display text-4xl md:text-5xl text-white">МЫ ЗАСЛУЖИВАЕМ ДОВЕРИЯ</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              { icon: "Award", title: "Гарантия 2 года", desc: "На все изделия" },
              { icon: "FileCheck", title: "ГОСТ-сертификаты", desc: "Вся продукция" },
              { icon: "Users", title: "200+ клиентов", desc: "За 10 лет работы" },
              { icon: "Building2", title: "Партнёры", desc: "ФСК, ЕЭС России" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl card-glass border" style={{ borderColor: "var(--brand-border)" }}>
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as IconName} size={24} className="text-orange-400" />
                </div>
                <div className="font-display text-lg text-white mb-1">{item.title}</div>
                <div className="text-gray-400 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => openModal("Запросить договор")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-black font-display font-bold px-10 py-5 rounded-2xl btn-glow text-lg"
            >
              ЗАПРОСИТЬ ДОГОВОР →
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-display tracking-widest text-sm uppercase mb-3 block">Вопросы и ответы</span>
            <h2 className="font-display text-4xl md:text-5xl text-white">ЧАСТО СПРАШИВАЮТ</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl card-glass border overflow-hidden transition-all"
                style={{ borderColor: openFaq === i ? "rgba(249,115,22,0.3)" : "var(--brand-border)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg text-white">{item.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className={`text-orange-400 flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed fade-in-up">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => openModal("Задать вопрос инженеру")}
              className="border border-orange-500/40 text-orange-400 font-display px-8 py-4 rounded-2xl hover:bg-orange-500 hover:text-black transition-all"
            >
              СПРОСИТЬ ИНЖЕНЕРА →
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6" />

      {/* FOOTER FORM */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">ГОТОВЫ НАЧАТЬ?</h2>
          <p className="text-gray-400 mb-10">Оставьте телефон — перезвоним за 10 минут и сделаем расчёт бесплатно</p>

          <div className="rounded-3xl card-glass border p-8 md:p-12" style={{ borderColor: "var(--brand-border)" }}>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-body text-lg"
              />
              <button
                onClick={() => openModal("Получить расчёт")}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-black font-display font-bold px-8 py-4 rounded-xl btn-glow whitespace-nowrap"
              >
                РАССЧИТАТЬ →
              </button>
            </div>
            <label className="flex items-center gap-3 justify-center cursor-pointer">
              <input type="checkbox" className="accent-orange-500" />
              <span className="text-gray-500 text-xs">Согласен на обработку персональных данных</span>
            </label>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 px-6" style={{ borderColor: "var(--brand-border)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl gradient-text">ПРОМИЗДЕЛИЯ</div>
          <div className="text-gray-500 text-sm">© 2024 · Производство изделий · Все права защищены</div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Оферта</a>
          </div>
        </div>
      </footer>

      {/* FLOATING MOBILE PANEL */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 flex">
          <a
            href="tel:+78001234567"
            className="flex-1 flex flex-col items-center gap-1 py-3 text-white hover:text-orange-400 transition-colors"
          >
            <Icon name="Phone" size={20} />
            <span className="text-xs font-medium">Звонок</span>
          </a>
          <a
            href="https://wa.me/78001234567"
            className="flex-1 flex flex-col items-center gap-1 py-3 text-green-400 hover:text-green-300 transition-colors"
          >
            <Icon name="MessageCircle" size={20} />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
          <button
            onClick={() => openModal("Получить расчёт")}
            className="flex-1 flex flex-col items-center gap-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-black"
          >
            <Icon name="Calculator" size={20} />
            <span className="text-xs font-bold">Расчёт</span>
          </button>
        </div>
      </div>
    </div>
  );
}