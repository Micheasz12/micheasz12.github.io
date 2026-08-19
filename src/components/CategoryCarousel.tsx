import { useRef } from 'react';
import { 
  Utensils, 
  Soup, 
  Sandwich, 
  Salad, 
  IceCream, 
  Wine, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { CATEGORIES } from '../data/menuData';
import { CategoryId } from '../types';

interface CategoryCarouselProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  lang: 'pl' | 'en';
}

const ICONS_MAP: Record<string, typeof Utensils> = {
  Utensils,
  Soup,
  Sandwich,
  Salad,
  IceCream,
  Wine,
  Sparkles,
};

export function CategoryCarousel({
  activeCategory,
  onSelectCategory,
  lang,
}: CategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3">
      {/* Category Header Label Row matching screenshot */}
      <div className="flex items-center justify-between text-xs mb-2.5 px-1">
        <span className="font-cinzel text-neutral-400 text-[11px] tracking-[0.18em] uppercase font-semibold">
          {lang === 'pl' ? 'KATEGORIE' : 'CATEGORIES'}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 text-[11px] font-medium tracking-wide">
            {lang === 'pl' ? 'Przesuń listę ⇄' : 'Swipe List ⇄'}
          </span>
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              className="p-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const IconComponent = ICONS_MAP[cat.iconName] || Utensils;
          const displayName = lang === 'pl' ? cat.namePl : cat.name;

          return (
            <button
              key={cat.id}
              id={`category-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 transform active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-b from-[#fcd34d] via-[#f59e0b] to-[#eab308] text-black shadow-lg shadow-amber-500/30 min-w-[90px] sm:min-w-[100px] h-[92px] p-2.5 font-bold border-2 border-yellow-200'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-amber-200 hover:bg-neutral-800/90 border border-neutral-800/80 min-w-[85px] sm:min-w-[95px] h-[90px] p-2 font-medium hover:border-amber-500/30'
              }`}
            >
              <div
                className={`p-2 rounded-xl mb-1.5 transition-colors ${
                  isActive ? 'bg-black/10 text-black' : 'text-amber-400/90 group-hover:text-amber-300'
                }`}
              >
                <IconComponent className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span
                className={`text-[10px] sm:text-[11px] tracking-wider text-center leading-tight uppercase font-semibold line-clamp-1 max-w-[80px] ${
                  isActive ? 'text-black font-extrabold' : 'text-neutral-300'
                }`}
              >
                {displayName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
