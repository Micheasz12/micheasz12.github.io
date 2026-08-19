import { useState } from 'react';
import { 
  X, 
  Bell, 
  Wine, 
  Receipt, 
  Sparkles, 
  MessageSquareText, 
  CheckCircle2, 
  Clock, 
  Utensils
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WaiterCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number;
  lang: 'pl' | 'en';
}

export function WaiterCallModal({
  isOpen,
  onClose,
  tableNumber,
  lang,
}: WaiterCallModalProps) {
  if (!isOpen) return null;

  const [selectedReason, setSelectedReason] = useState<string>('waiter');
  const [customNote, setCustomNote] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'confirmed'>('idle');

  const reasons = [
    {
      id: 'waiter',
      title: lang === 'pl' ? 'Poproś kelnera do stolika' : 'Call Waiter to Table',
      icon: Bell,
      desc: lang === 'pl' ? 'Ogólna obsługa i pytania' : 'General service & questions',
    },
    {
      id: 'water',
      title: lang === 'pl' ? 'Woda / Uzupełnienie napoju' : 'Refill Water / Beverages',
      icon: Wine,
      desc: lang === 'pl' ? 'Woda gazowana / niegazowana' : 'Still or sparkling water',
    },
    {
      id: 'bill',
      title: lang === 'pl' ? 'Poproś o rachunek' : 'Request Table Bill',
      icon: Receipt,
      desc: lang === 'pl' ? 'Karta płatnicza, gotówka lub BLIK' : 'Card or cash payment',
    },
    {
      id: 'sommelier',
      title: lang === 'pl' ? 'Konsultacja z Sommelierem' : 'Sommelier Wine Advice',
      icon: Sparkles,
      desc: lang === 'pl' ? 'Dobór win do wybranych dań' : 'Pairing recommendations',
    },
    {
      id: 'cutlery',
      title: lang === 'pl' ? 'Dodatkowe sztućce / serwetki' : 'Extra Cutlery / Napkins',
      icon: Utensils,
      desc: lang === 'pl' ? 'Talerzyki do dzielenia się itp.' : 'Sharing plates & napkins',
    },
  ];

  const handleCall = () => {
    setCallStatus('calling');
    setTimeout(() => {
      setCallStatus('confirmed');
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#ffffff'],
      });
    }, 800);
  };

  const handleDone = () => {
    setCallStatus('idle');
    setCustomNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-[#14141a] border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
        >
          <X className="w-4 h-4" />
        </button>

        {callStatus === 'confirmed' ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-200">
                {lang === 'pl' ? 'Kelner powiadomiony!' : 'Staff Notified!'}
              </h3>
              <p className="text-sm text-neutral-300 mt-1">
                {lang === 'pl'
                  ? `Obsługa podchodzi do Stolika #${tableNumber}. Szacowany czas: ~1-2 minuty.`
                  : `Our team is on their way to Table #${tableNumber}. Estimated time: ~1-2 minutes.`}
              </p>
            </div>

            <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 text-xs text-neutral-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{lang === 'pl' ? 'Status: W drodze' : 'Status: En route'}</span>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl shadow-lg"
            >
              {lang === 'pl' ? 'Wróć do menu' : 'Back to Menu'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-amber-400">
                <Bell className="w-5 h-5" />
                <span className="font-cinzel text-xs uppercase tracking-widest font-semibold">
                  {lang === 'pl' ? 'Obsługa Stolika' : 'Table Concierge'}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-100 mt-1">
                {lang === 'pl' ? `Wezwij kelnera (Stolik #${tableNumber})` : `Call Waiter (Table #${tableNumber})`}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                {lang === 'pl' ? 'Wybierz cel wezwania, abyśmy obsłużyli Cię sprawnie:' : 'Select what you need for instant service:'}
              </p>
            </div>

            {/* Reasons Grid */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {reasons.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedReason === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedReason(r.id)}
                    className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all border ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                        : 'bg-neutral-900/90 border-neutral-800/90 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${
                        isSelected ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-amber-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold leading-snug">{r.title}</p>
                      <p className="text-[11px] text-neutral-400">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Optional message */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1 flex items-center gap-1">
                <MessageSquareText className="w-3 h-3 text-amber-400" />
                {lang === 'pl' ? 'Dodatkowa wiadomość (opcjonalnie)' : 'Additional note (optional)'}
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder={lang === 'pl' ? 'np. potrzebujemy 2 dodatkowe kieliszki' : 'e.g. need 2 extra wine glasses'}
                className="w-full px-3 py-2 bg-neutral-900 text-xs text-neutral-200 placeholder-neutral-500 rounded-xl border border-neutral-800 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleCall}
              disabled={callStatus === 'calling'}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-sm rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              {callStatus === 'calling' ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'pl' ? 'Wysyłanie...' : 'Sending request...'}</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4 fill-black" />
                  <span>{lang === 'pl' ? 'Wezwij teraz' : 'Call Now'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
