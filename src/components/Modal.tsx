import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function Modal({ open, onClose, title = "Получить расчёт" }: ModalProps) {
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
            <button onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              <Icon name="X" size={16} />
            </button>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "var(--c-sand)" }}>
              <Icon name="PhoneCall" size={22} style={{ color: "var(--c-brown)" }} />
            </div>
            <h3 className="font-display text-2xl mb-1" style={{ color: "var(--c-text)" }}>{title}</h3>
            <p className="text-sm mb-6" style={{ color: "var(--c-muted)" }}>Перезвоним за 10 минут в рабочее время</p>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 text-base mb-4 focus:outline-none"
              style={{ background: "var(--c-sand)", border: "1.5px solid var(--c-border)", color: "var(--c-text)" }}
            />
            <label className="flex items-start gap-3 mb-6 cursor-pointer" onClick={() => setOk(!ok)}>
              <div className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-colors"
                style={{ background: ok ? "var(--c-brown)" : "transparent", borderColor: ok ? "var(--c-brown)" : "var(--c-border)" }}>
                {ok && <Icon name="Check" size={11} className="text-white" />}
              </div>
              <span className="text-xs leading-relaxed" style={{ color: "var(--c-muted)" }}>
                Согласен на обработку персональных данных
              </span>
            </label>
            <button onClick={handleSend} disabled={!phone || !ok}
              className="w-full btn-cta text-lg py-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
              ПОЛУЧИТЬ РАСЧЁТ →
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--c-sand)" }}>
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
