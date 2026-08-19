import { useState, useEffect } from 'react';
import { Sparkles, Globe, UtensilsCrossed } from 'lucide-react';
import { GoldBotanicalDecor } from './GoldBotanicalDecor';
import { Currency } from '../types';

interface HeaderProps {
  lang: 'pl' | 'en';
  setLang: (lang: 'pl' | 'en') => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  tableNumber: number;
  setTableNumber: (n: number) => void;
  onOpenWaiterModal: () => void;
}

export function Header({
  lang,
  setLang,
  currency,
  setCurrency,
  tableNumber,
  setTableNumber,
  onOpenWaiterModal,
}: HeaderProps) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (lang === 'pl') {
      if (hour < 12) setGreeting('Dzień Dobry');
      else if (hour < 18) setGreeting('Miłego Popołudnia');
      else setGreeting('Dobry Wieczór');
    } else {
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    }
  }, [lang]);

  return (
    <header className="relative pt-6 pb-4 px-4 overflow-hidden border-b border-amber-950/40 bg-gradient-to-b from-[#121118] via-[#0d0c10] to-[#09090b]">
      {/* Botanical gold foliage ornaments */}
      <GoldBotanicalDecor position="left" />
      <GoldBotanicalDecor position="right" />

      {/* Top Utility Bar (Table, Language, Currency) */}
      <div className="relative z-20 max-w-4xl mx-auto flex items-center justify-between text-xs text-amber-200/80 mb-3 px-1">
        {/* Table Selector */}
        <div className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/20 shadow-sm">
          <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-neutral-400">{lang === 'pl' ? 'Stolik' : 'Table'}:</span>
          <select
            id="table-selector"
            value={tableNumber}
            onChange={(e) => setTableNumber(Number(e.target.value))}
            className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 'VIP 1', 'VIP 2'].map((num) => (
              <option key={num} value={num} className="bg-neutral-900 text-white">
                #{num}
              </option>
            ))}
          </select>
        </div>

        {/* Currency & Language Buttons */}
        <div className="flex items-center gap-2">
          {/* Currency */}
          <div className="flex items-center bg-neutral-900/80 backdrop-blur-md rounded-full border border-amber-500/20 px-1 py-0.5">
            {(['USD', 'PLN', 'EUR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                id={`currency-btn-${curr}`}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                  currency === curr
                    ? 'bg-amber-500 text-black shadow-sm font-bold'
                    : 'text-neutral-400 hover:text-amber-200'
                }`}
              >
                {curr === 'USD' ? '$' : curr === 'PLN' ? 'zł' : '€'}
              </button>
            ))}
          </div>

          {/* Language Switch */}
          <button
            id="lang-toggle-btn"
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            className="flex items-center gap-1 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/20 text-neutral-300 hover:text-amber-300 transition-colors"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span className="font-semibold uppercase tracking-wider">{lang}</span>
          </button>
        </div>
      </div>

      {/* Main Center Branding matching screenshot */}
      <div className="relative z-20 text-center max-w-xl mx-auto pt-1 pb-2">
        <p className="font-serif italic text-amber-300/90 text-sm sm:text-base font-normal tracking-wide drop-shadow-sm flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400 opacity-80" />
          <span>{greeting}</span>
          <Sparkles className="w-3 h-3 text-amber-400 opacity-80" />
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#fff7d6] via-[#fcd34d] to-[#d97706] drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)] mt-0.5 mb-1 select-none">
          THE GOLDEN OAK
        </h1>

        <div className="flex items-center justify-center gap-3 text-amber-500/60 my-1">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-[10px] uppercase font-cinzel tracking-[0.25em] text-amber-200/75">
            Fine Dining & Bar
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>
      </div>
    </header>
  );
}
