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

export function DishListCard({
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
      id={`dish-card-${dish.id}`}
      onClick={() => onSelect(dish)}
      className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-md hover:shadow-xl hover:shadow-amber-500/5"
    >
      {/* Left side: Plate image and Badges */}
      <div className="relative flex-shrink-0 mr-4">
        {/* Badge: NEW, CHEF, BESTSELLER */}
        {dish.badge && (
          <div className="absolute -top-2 -left-1 z-10">
            {dish.badge === 'NEW' ? (
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm">
                NEW
              </span>
            ) : dish.badge === 'CHEF' ? (
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                CHEF
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm">
                STAR
              </span>
            )}
          </div>
        )}

        {/* Circular Plate Image matching the screenshot */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700/60 shadow-lg group-hover:border-amber-500/50 transition-all duration-300">
          <img
            src={dish.image}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* Middle & Right: Content matching screenshot */}
      <div className="flex-1 min-w-0 pr-2">
        {/* Dish Title & Dietary Icon */}
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug">
            {displayName}{' '}
            <span className="text-sm font-normal ml-0.5 inline-block select-none" title={dish.dietary}>
              {dietaryEmoji}
            </span>
          </h3>
        </div>

        {/* Calories info */}
        <p className="text-xs text-neutral-400 font-medium mt-0.5">
          {dish.calories} {lang === 'pl' ? 'Kalorii' : 'Calories'}
          {dish.prepTime && (
            <span className="ml-2 text-[11px] text-neutral-400 hidden sm:inline">
              • {dish.prepTime}
            </span>
          )}
        </p>

        {/* Short description clamp */}
        <p className="text-[11px] text-neutral-400 line-clamp-1 mt-1 font-normal leading-relaxed">
          {description}
        </p>

        {/* Pricing Row matching screenshot */}
        <div className="flex items-center gap-2 mt-2">
          {dish.originalPrice && (
            <span className="text-xs sm:text-sm text-neutral-400 line-through font-serif decoration-neutral-500">
              {formatPrice(dish.originalPrice, currency)}
            </span>
          )}
          <span className="font-serif text-base sm:text-lg font-bold text-amber-300 tracking-wide drop-shadow-sm">
            {formatPrice(dish.price, currency)}
          </span>
        </div>
      </div>

      {/* Action Button: Add to Cart */}
      <div className="flex-shrink-0 flex items-center gap-1.5">
        <button
          id={`add-btn-${dish.id}`}
          onClick={(e) => onQuickAdd(dish, e)}
          className={`p-2.5 rounded-full transition-all duration-200 transform active:scale-90 ${
            isAdded
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20 font-bold'
              : 'bg-neutral-800/90 text-amber-300 hover:bg-amber-500 hover:text-black border border-amber-500/30 hover:border-amber-400 shadow-sm'
          }`}
          title={lang === 'pl' ? 'Dodaj do zamówienia' : 'Add to order'}
          aria-label={lang === 'pl' ? 'Dodaj do zamówienia' : 'Add to order'}
        >
          {isAdded ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
        </button>
      </div>
    </div>
  );
}
