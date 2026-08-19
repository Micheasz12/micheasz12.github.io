import { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Receipt, 
  Users, 
  Percent, 
  CheckCircle2,
  Sparkles,
  UtensilsCrossed
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface OrderCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  currency: Currency;
  tableNumber: number;
  lang: 'pl' | 'en';
}

export function OrderCartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  tableNumber,
  lang,
}: OrderCartDrawerProps) {
  if (!isOpen) return null;

  const [tipPercentage, setTipPercentage] = useState<number>(10);
  const [splitGuests, setSplitGuests] = useState<number>(1);
  const [orderSent, setOrderSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => {
    let itemPrice = item.dish.price;
    if (item.selectedOptions && item.dish.options) {
      item.dish.options.forEach((opt) => {
        const choiceName = item.selectedOptions?.[opt.name];
        if (choiceName) {
          const match = opt.choices.find((c) => c.name === choiceName);
          if (match?.priceDiff) itemPrice += match.priceDiff;
        }
      });
    }
    return acc + itemPrice * item.quantity;
  }, 0);

  const tipAmount = (subtotal * tipPercentage) / 100;
  const total = subtotal + tipAmount;
  const perPerson = total / Math.max(1, splitGuests);

  const handleSubmitOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSent(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#ffffff', '#10b981'],
      });
    }, 1000);
  };

  const handleResetAfterOrder = () => {
    setOrderSent(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full sm:max-w-md h-[92vh] sm:h-full bg-[#121218] border-l border-amber-500/30 flex flex-col justify-between text-neutral-100 shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-100">
                {lang === 'pl' ? 'Zamówienie Stolika' : 'Table Order'}
              </h3>
              <p className="text-xs text-amber-400/90 font-medium">
                {lang === 'pl' ? `Stolik #${tableNumber}` : `Table #${tableNumber}`} • {items.length} {lang === 'pl' ? 'pozycji' : 'items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {orderSent ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-11 h-11" />
            </div>
            <div>
              <h3 className="font-serif text-3xl font-bold text-amber-200">
                {lang === 'pl' ? 'Zamówienie przyjęte!' : 'Order Placed!'}
              </h3>
              <p className="text-sm text-neutral-300 mt-1 max-w-xs mx-auto leading-relaxed">
                {lang === 'pl'
                  ? `Przekazano do szefa kuchni dla Stolika #${tableNumber}. Przygotowanie dań w toku.`
                  : `Sent to the executive chef for Table #${tableNumber}. Dishes are being prepared.`}
              </p>
            </div>

            <div className="w-full bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 text-left space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>{lang === 'pl' ? 'Szacowany czas serwowania' : 'Estimated Serving Time'}</span>
                <span className="text-amber-300 font-semibold">~15-20 min</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>{lang === 'pl' ? 'Suma rachunku' : 'Total Bill'}</span>
                <span className="text-white font-bold">{formatPrice(total, currency)}</span>
              </div>
            </div>

            <button
              onClick={handleResetAfterOrder}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl shadow-lg"
            >
              {lang === 'pl' ? 'Gotowe / Zamknij' : 'Done / Close'}
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-neutral-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <p className="text-base font-serif text-neutral-300 font-semibold">
              {lang === 'pl' ? 'Twój koszyk jest pusty' : 'Your table order is empty'}
            </p>
            <p className="text-xs text-neutral-400 max-w-xs">
              {lang === 'pl'
                ? 'Wybierz wykwintne dania z menu i dodaj je do zamówienia.'
                : 'Browse our exquisite dishes and tap + to add them to your table order.'}
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {items.map((item, index) => {
              const displayName = lang === 'pl' ? item.dish.namePl : item.dish.name;
              return (
                <div
                  key={`${item.dish.id}-${index}`}
                  className="p-3 bg-neutral-900/80 rounded-2xl border border-neutral-800 flex items-center justify-between gap-3"
                >
                  {/* Dish Image */}
                  <img
                    src={item.dish.image}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover border border-amber-500/30 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-neutral-200 line-clamp-1">
                      {displayName}
                    </h4>
                    <p className="text-xs text-amber-300 font-semibold">
                      {formatPrice(item.dish.price, currency)}
                    </p>
                    {item.specialInstructions && (
                      <p className="text-[10px] text-neutral-400 italic line-clamp-1">
                        "{item.specialInstructions}"
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-full border border-neutral-700">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <Minus className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-amber-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer & Bill Breakdown (only if items present and not sent) */}
        {!orderSent && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-800 bg-[#0e0e13] space-y-3.5">
            {/* Gratuity / Tip Selection */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                <span className="flex items-center gap-1">
                  <Percent className="w-3 h-3 text-amber-400" />
                  {lang === 'pl' ? 'Napiwek dla obsługi' : 'Service Gratuity (Tip)'}
                </span>
                <span className="text-amber-300 font-semibold">
                  {tipPercentage}% ({formatPrice(tipAmount, currency)})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 10, 15, 20].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipPercentage(t)}
                    className={`py-1 rounded-lg text-xs font-semibold transition-all border ${
                      tipPercentage === t
                        ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {t === 0 ? (lang === 'pl' ? 'Brak' : 'None') : `${t}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Bill Calculator */}
            <div className="flex items-center justify-between bg-neutral-900/90 px-3 py-2 rounded-xl border border-neutral-800 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'pl' ? 'Podział na gości:' : 'Split between:'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSplitGuests((g) => Math.max(1, g - 1))}
                  className="p-1 rounded-md bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-amber-300 min-w-[20px] text-center">
                  {splitGuests} {splitGuests === 1 ? 'os.' : 'os.'}
                </span>
                <button
                  onClick={() => setSplitGuests((g) => g + 1)}
                  className="p-1 rounded-md bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Total Row */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>{lang === 'pl' ? 'Kwota zamówienia:' : 'Subtotal:'}</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-bold text-neutral-100">
                <span className="font-serif text-amber-200">
                  {lang === 'pl' ? 'Razem do zapłaty:' : 'Total amount:'}
                </span>
                <span className="font-serif text-lg text-amber-300">
                  {formatPrice(total, currency)}
                </span>
              </div>
              {splitGuests > 1 && (
                <div className="flex items-center justify-between text-xs text-amber-400/90 font-medium">
                  <span>{lang === 'pl' ? 'Na 1 osobę:' : 'Per person:'}</span>
                  <span>{formatPrice(perPerson, currency)}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-black font-bold text-sm rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>{lang === 'pl' ? 'Przesyłanie...' : 'Sending to kitchen...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{lang === 'pl' ? 'Złóż zamówienie do kuchni' : 'Submit Table Order'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
