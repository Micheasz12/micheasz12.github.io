import { useState } from 'react';
import { User, Bell, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface FloatingConciergeProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenWaiter: () => void;
  lang: 'pl' | 'en';
}

export function FloatingConcierge({
  cartItems,
  onOpenCart,
  onOpenWaiter,
  lang,
}: FloatingConciergeProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end">
      {/* Quick Action Popover */}
      {isMenuOpen && (
        <div className="mb-3 w-56 p-2 bg-[#16161e] border border-amber-500/40 rounded-2xl shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Call Waiter */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onOpenWaiter();
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-800 text-left transition-colors text-amber-200"
          >
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Bell className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-neutral-100">{lang === 'pl' ? 'Wezwij kelnera' : 'Call Waiter'}</p>
              <p className="text-[10px] text-neutral-400">{lang === 'pl' ? 'Obsługa stolika' : 'Table assistance'}</p>
            </div>
          </button>

          {/* View Order / Bill */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onOpenCart();
            }}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-800 text-left transition-colors text-amber-200"
          >
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 relative">
              <ShoppingBag className="w-4 h-4" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black text-[9px] font-extrabold rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            <div className="text-xs">
              <p className="font-bold text-neutral-100">{lang === 'pl' ? 'Rachunek & Koszyk' : 'Order & Bill'}</p>
              <p className="text-[10px] text-neutral-400">
                {totalQuantity > 0
                  ? `${totalQuantity} ${lang === 'pl' ? 'dań' : 'items'}`
                  : lang === 'pl'
                  ? 'Brak dań'
                  : 'No items'}
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Main Golden Circle Floating Button (matching screenshot) */}
      <button
        id="floating-concierge-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#f59e0b] via-[#fbbf24] to-[#fef08a] text-black flex items-center justify-center shadow-[0_8px_25px_rgba(245,158,11,0.4)] border-2 border-yellow-200 hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label="Table Concierge and Cart"
      >
        {/* Person / Waiter Icon matching the screenshot icon */}
        <div className="flex items-center justify-center">
          <User className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2] text-black fill-black/10" />
        </div>

        {/* Floating Cart Counter Badge */}
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 border-2 border-black text-white text-xs font-black rounded-full flex items-center justify-center shadow-md animate-bounce">
            {totalQuantity}
          </span>
        )}

        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-ping pointer-events-none opacity-30" />
      </button>
    </div>
  );
}
