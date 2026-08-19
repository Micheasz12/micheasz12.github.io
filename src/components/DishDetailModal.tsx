import { useState } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Flame, 
  Leaf, 
  Beef, 
  Fish, 
  Wheat, 
  Clock, 
  Wine, 
  AlertTriangle, 
  Check, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { Dish, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  currency: Currency;
  lang: 'pl' | 'en';
  onAddToCart: (dish: Dish, quantity: number, options?: Record<string, string>, notes?: string) => void;
}

export function DishDetailModal({
  dish,
  onClose,
  currency,
  lang,
  onAddToCart,
}: DishDetailModalProps) {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const displayName = lang === 'pl' ? dish.namePl : dish.name;
  const description = lang === 'pl' ? dish.descriptionPl : dish.description;
  const ingredients = lang === 'pl' ? dish.ingredientsPl : dish.ingredients;
  const allergens = lang === 'pl' ? dish.allergensPl : dish.allergens;
  const winePairing = lang === 'pl' ? dish.winePairingPl : dish.winePairing;

  // Calculate total price including chosen options
  let extraPrice = 0;
  if (dish.options) {
    dish.options.forEach((opt) => {
      const chosenChoiceName = selectedOptions[opt.name];
      if (chosenChoiceName) {
        const found = opt.choices.find((c) => c.name === chosenChoiceName);
        if (found?.priceDiff) {
          extraPrice += found.priceDiff;
        }
      }
    });
  }

  const unitPrice = dish.price + extraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    setAddedAnimation(true);
    onAddToCart(dish, quantity, selectedOptions, specialNotes);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#121217] border border-amber-500/30 rounded-t-3xl sm:rounded-3xl shadow-2xl text-neutral-100 no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 hover:text-white border border-neutral-700/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Plate Presentation */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-b from-neutral-900 to-[#121217] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden p-2 bg-gradient-to-tr from-neutral-800 via-neutral-900 to-black border-2 border-amber-500/40 shadow-2xl shadow-black/80">
            <img
              src={dish.image}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {dish.badge && (
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-lg bg-amber-500 text-black shadow-lg">
                {dish.badge}
              </span>
            </div>
          )}
        </div>

        {/* Details Body */}
        <div className="p-6 space-y-5">
          {/* Title & Dietary */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400">
                {displayName}
              </h2>
            </div>

            {/* Sub-meta tags: calories, time, dietary */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              <span className="bg-neutral-800/90 text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700 font-medium">
                🔥 {dish.calories} {lang === 'pl' ? 'kalorii' : 'calories'}
              </span>
              <span className="bg-neutral-800/90 text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {dish.prepTime}
              </span>
              {dish.dietary === 'veg' && (
                <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  Vegetarian
                </span>
              )}
              {dish.glutenFree && (
                <span className="bg-amber-950/60 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Wheat className="w-3 h-3" />
                  Gluten-Free
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-300 leading-relaxed font-light">
            {description}
          </p>

          {/* Ingredients list */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-widest text-amber-400 mb-2 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'pl' ? 'Kluczowe Składniki' : 'Key Ingredients'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 rounded-lg border border-neutral-800"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Sommelier Wine Pairing (Fine Dining Touch) */}
          {winePairing && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-purple-950/20 border border-amber-500/20 flex items-start gap-3">
              <Wine className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                  {lang === 'pl' ? 'Rekomendacja Sommeliera' : "Sommelier's Wine Pairing"}
                </p>
                <p className="text-xs text-neutral-300 italic mt-0.5">{winePairing}</p>
              </div>
            </div>
          )}

          {/* Allergens warning if any */}
          {allergens && allergens.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <strong className="text-neutral-300">{lang === 'pl' ? 'Alergeny:' : 'Allergens:'}</strong>{' '}
                {allergens.join(', ')}
              </span>
            </div>
          )}

          {/* Custom Dish Options (if available) */}
          {dish.options && dish.options.length > 0 && (
            <div className="space-y-3 pt-1">
              {dish.options.map((opt) => (
                <div key={opt.name}>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    {lang === 'pl' ? opt.namePl : opt.name}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {opt.choices.map((choice) => {
                      const isSelected = selectedOptions[opt.name] === choice.name || (!selectedOptions[opt.name] && choice.priceDiff === 0);
                      return (
                        <button
                          key={choice.name}
                          type="button"
                          onClick={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [opt.name]: choice.name,
                            }))
                          }
                          className={`p-2.5 rounded-xl text-left text-xs flex items-center justify-between border transition-all ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <span>{lang === 'pl' ? choice.namePl : choice.name}</span>
                          {choice.priceDiff ? (
                            <span className="font-semibold text-amber-400">
                              +{formatPrice(choice.priceDiff, currency)}
                            </span>
                          ) : (
                            <span className="text-[10px] text-neutral-500">Incl.</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Kitchen / Special Instructions */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
              {lang === 'pl' ? 'Uwagi dla kuchni (opcjonalnie)' : 'Special notes for kitchen (optional)'}
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder={lang === 'pl' ? 'np. bez cebuli, sos osobno...' : 'e.g., dressing on the side, no onions...'}
              className="w-full px-3 py-2 bg-neutral-900 text-xs text-neutral-200 placeholder-neutral-500 rounded-xl border border-neutral-800 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Bottom Bar: Quantity & Add to Cart */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-neutral-900 rounded-full border border-neutral-800 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-amber-300">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Order Button */}
            <button
              id="confirm-add-to-order-btn"
              type="button"
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                addedAnimation
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-amber-500/25 active:scale-98'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <span>{lang === 'pl' ? 'Dodano!' : 'Added!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                  <span>
                    {lang === 'pl' ? 'Dodaj do stolika' : 'Add to Order'} • {formatPrice(totalPrice, currency)}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
