import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Modal from "@/components/Modal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";

type IName = string;

const I1 = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/75079a1b-d297-4c6c-909f-095f498a43b7.jpg";
const I4 = "https://cdn.poehali.dev/projects/fe51eca5-7b86-4c57-9d23-8e4346d3d359/files/7f26f35a-c836-4006-bc2c-281f7957da10.jpg";

export default function About() {
  const [modal, setModal] = useState({ open: false, title: "" });
  const openModal = (title: string) => setModal({ open: true, title });
  const closeModal = () => setModal({ open: false, title: "" });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--c-cream)", color: "var(--c-text)" }}>
      <SeoHead
        title="О компании Дома да Бани — производитель мобильных бань в СПб"
        description="Дома да Бани — производитель мобильных бань с 2014 года. Собственный завод, 500+ клиентов, гарантия 2 года. СПб и Ленинградская область."
        canonical="https://domadabani.ru/o-kompanii"
      />
      <Modal open={modal.open} onClose={closeModal} title={modal.title} />
      <Nav onCta={() => openModal("Записаться на экскурсию")} />

      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-white py-4 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <div className="container mx-auto">
            <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--c-muted)" }}>
              <Link to="/" className="hover:underline">Главная</Link>
              <Icon name="ChevronRight" size={14} />
              <span style={{ color: "var(--c-text)" }}>О компании</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white py-16 px-5" style={{ borderBottom: "1px solid var(--c-border)" }}>
          <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label">О нас</div>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-5">ДОМА ДА БАНИ</h1>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--c-muted)" }}>
                С 2014 года мы производим мобильные бани под ключ для жителей Санкт-Петербурга и Ленинградской области. Собственный завод в Пестово, штат 25 человек, 500+ довольных клиентов.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--c-muted)" }}>
                Главный принцип — честная работа. Фиксированная цена в договоре, оплата после осмотра, гарантия 2 года письменно.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
              <img src={I4} alt="Производство бань" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Numbers */}
        <div className="py-14 px-5" style={{ background: "var(--c-sand)", borderBottom: "1px solid var(--c-border)" }}>
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { n: "10 лет", l: "на рынке СПб" },
              { n: "500+",   l: "клиентов по ЛО" },
              { n: "25",     l: "специалистов в штате" },
              { n: "2 года", l: "гарантия письменно" },
            ].map(({ n, l }) => (
              <div key={n}>
                <div className="font-display text-[2.2rem] leading-none text-grad mb-1">{n}</div>
                <div className="text-sm" style={{ color: "var(--c-muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Production */}
        <div className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="section-label justify-center">Производство</div>
              <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">КАК МЫ ДЕЛАЕМ БАНИ</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              <div className="space-y-6">
                {[
                  { icon: "TreePine", title: "Собственный склад древесины", desc: "Закупаем сосну и липу камерной сушки напрямую у лесозаготовителей. Влажность не более 12%." },
                  { icon: "Settings", title: "ЧПУ-обработка деталей", desc: "Точность резки ±1 мм. Все детали каркаса изготавливаются на станках с числовым управлением." },
                  { icon: "Package", title: "Сборка на производстве", desc: "Собираем баню в цеху, проверяем геометрию, запускаем печь — и только потом везём к вам." },
                  { icon: "Truck", title: "Доставка и установка", desc: "Грузовик с манипулятором. Монтажная бригада устанавливает и подключает за 1 день." },
                ].map((it, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "#FEF3C7" }}>
                      <Icon name={it.icon as IName} size={22} style={{ color: "var(--c-brown)" }} />
                    </div>
                    <div>
                      <div className="font-display text-base mb-1">{it.title}</div>
                      <div className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{it.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                <img src={I1} alt="Производство мобильных бань" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-20 px-5 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="section-label justify-center">Команда</div>
              <h2 className="font-display text-[clamp(1.7rem,4vw,2.8rem)]">ЛЮДИ, КОТОРЫМ ДОВЕРЯЕТЕ</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { name: "Иван Смирнов", role: "Директор и основатель", emoji: "👨‍💼" },
                { name: "Алексей Петров", role: "Главный инженер", emoji: "👨‍🔧" },
                { name: "Ольга Козлова", role: "Менеджер по продажам", emoji: "👩‍💼" },
              ].map((p, i) => (
                <div key={i} className="card text-center p-6">
                  <div className="text-4xl mb-3">{p.emoji}</div>
                  <div className="font-display text-base mb-1">{p.name}</div>
                  <div className="text-xs" style={{ color: "var(--c-muted)" }}>{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requisites */}
        <div className="py-16 px-5" style={{ background: "var(--c-sand)", borderTop: "1px solid var(--c-border)" }}>
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl">РЕКВИЗИТЫ КОМПАНИИ</h2>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid var(--c-border)" }}>
              {[
                { label: "Полное название", value: "ООО «Дома да Бани»" },
                { label: "ИНН", value: "7823456789" },
                { label: "ОГРН", value: "1234567890123" },
                { label: "Юридический адрес", value: "Новгородская обл., г. Пестово, ул. Заводская, 12" },
                { label: "Телефон", value: "8-800-123-45-67 (бесплатно)" },
                { label: "Email", value: "info@domadabani.ru" },
              ].map((item, i, arr) => (
                <div key={i} className="flex justify-between px-6 py-3.5 text-sm"
                  style={{ background: i%2===0 ? "#fff" : "var(--c-sand)", borderBottom: i<arr.length-1 ? "1px solid var(--c-border)" : "none" }}>
                  <span style={{ color: "var(--c-muted)" }}>{item.label}</span>
                  <span className="font-medium text-right ml-4">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Excursion CTA */}
        <div className="py-20 px-5" style={{ background: "var(--c-cream)" }}>
          <div className="container mx-auto max-w-2xl text-center">
            <div className="text-4xl mb-4">🏭</div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] mb-3">ПРИЕЗЖАЙТЕ НА ПРОИЗВОДСТВО</h2>
            <p className="text-sm mb-8" style={{ color: "var(--c-muted)" }}>
              Покажем цех, готовые бани, материалы. Г. Пестово, Новгородская обл. — 200 км от СПб. Экскурсия бесплатная, по записи.
            </p>
            <button onClick={() => openModal("Записаться на экскурсию на производство")}
              className="btn-cta px-12 py-5 text-lg">
              ЗАПИСАТЬСЯ НА ЭКСКУРСИЮ →
            </button>
          </div>
        </div>
      </div>

      <Footer onCta={() => openModal("Получить расчёт")} />
    </div>
  );
}
