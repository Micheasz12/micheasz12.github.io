import { MouseEvent } from 'react';
import { Plus, Check } from 'lucide-react';
import { Dish, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface DishCardProps {
  dish: Dish;
  currency: Currency;
  lang: 'pl' | 'en';
  onSelect: (dish: Dish) => void;
  onQuickAdd: (dish: Dish, e: MouseEvent) => void;
  isAdded?: boolean;
}

export function DishGridCard({
  dish,
  currency,
  lang,
  onSelect,
  onQuickAdd,
  isAdded,
}: DishCardProps) {
  const displayName = lang === 'pl' ? dish.namePl : dish.name;
  const description = lang === 'pl' ? dish.descriptionPl : dish.description;

  const dietaryEmoji =
    dish.dietary === 'veg'
      ? '🌱'
      : dish.dietary === 'seafood'
      ? '🦐'
      : '🥩';

  return (
    <div
      id={`dish-grid-card-${dish.id}`}
      onClick={() => onSelect(dish)}
      className="group relative flex flex-col justify-between p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-amber-500/5 text-center"
    >
      {/* Badge */}
      {dish.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md border shadow-sm ${
              dish.badge === 'NEW'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            {dish.badge}
          </span>
        </div>
      )}

      {/* Centered Circular Plate */}
      <div className="relative mx-auto my-2">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1.5 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700/60 shadow-lg group-hover:border-amber-500/50 transition-all duration-300">
          <img
            src={dish.image}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between mt-2">
        <div>
          <h3 className="font-serif text-base font-bold text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug line-clamp-1">
            {displayName} <span>{dietaryEmoji}</span>
          </h3>
          <p className="text-xs text-neutral-400 font-medium mt-0.5">
            {dish.calories} {lang === 'pl' ? 'kcal' : 'Calories'}
          </p>
          <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price & Add button */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-800/60">
          <div className="flex flex-col items-start">
            {dish.originalPrice && (
              <span className="text-[11px] text-neutral-400 line-through font-serif">
                {formatPrice(dish.originalPrice, currency)}
              </span>
            )}
            <span className="font-serif text-base font-bold text-amber-300">
              {formatPrice(dish.price, currency)}
            </span>
          </div>

          <button
            id={`add-grid-btn-${dish.id}`}
            onClick={(e) => onQuickAdd(dish, e)}
            className={`p-2 rounded-full transition-all ${
              isAdded
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-neutral-800 text-amber-300 hover:bg-amber-500 hover:text-black border border-amber-500/30'
            }`}
          >
            {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
