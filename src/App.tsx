/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, MouseEvent } from 'react';
import { Header } from './components/Header';
import { CategoryCarousel } from './components/CategoryCarousel';
import { SearchAndFilters } from './components/SearchAndFilters';
import { DishListCard } from './components/DishListCard';
import { DishGridCard } from './components/DishGridCard';
import { DishDetailModal } from './components/DishDetailModal';
import { OrderCartDrawer } from './components/OrderCartDrawer';
import { WaiterCallModal } from './components/WaiterCallModal';
import { FloatingConcierge } from './components/FloatingConcierge';
import { CATEGORIES, DISHES } from './data/menuData';
import { CategoryId, DietaryType, Currency, Dish, CartItem } from './types';
import { Sparkles, UtensilsCrossed, Clock, MapPin, Phone, Award } from 'lucide-react';

export default function App() {
  // Navigation & Filter States
  const [activeCategory, setActiveCategory] = useState<CategoryId>('starters');
  const [selectedDietary, setSelectedDietary] = useState<DietaryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Preferences & Locales
  const [lang, setLang] = useState<'pl' | 'en'>('pl');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [tableNumber, setTableNumber] = useState<number>(4);

  // Modals and Drawers
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Current active category object
  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  }, [activeCategory]);

  const currentCategoryTitle = lang === 'pl' ? currentCategory.namePl : currentCategory.name;

  // Filtered Dishes
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // If there is no search query, filter strictly by selected category
      if (!searchQuery.trim() && dish.categoryId !== activeCategory) {
        return false;
      }

      // Dietary filter
      if (selectedDietary === 'veg' && dish.dietary !== 'veg') return false;
      if (selectedDietary === 'non-veg' && dish.dietary !== 'non-veg') return false;
      if (selectedDietary === 'seafood' && dish.dietary !== 'seafood') return false;
      if (selectedDietary === 'spicy' && !dish.spicy) return false;
      if (selectedDietary === 'gluten-free' && !dish.glutenFree) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q) || dish.namePl.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q) || dish.descriptionPl.toLowerCase().includes(q);
        const matchIng =
          dish.ingredients.some((i) => i.toLowerCase().includes(q)) ||
          dish.ingredientsPl.some((i) => i.toLowerCase().includes(q));
        const matchAllergens =
          dish.allergens.some((a) => a.toLowerCase().includes(q)) ||
          dish.allergensPl.some((a) => a.toLowerCase().includes(q));

        return matchName || matchDesc || matchIng || matchAllergens;
      }

      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  // Cart Management
  const handleQuickAdd = (dish: Dish, e: MouseEvent) => {
    e.stopPropagation();
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { dish, quantity: 1 }];
    });

    setRecentlyAddedId(dish.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  const handleAddToCartWithCustomizations = (
    dish: Dish,
    quantity: number,
    options?: Record<string, string>,
    notes?: string
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        dish,
        quantity,
        selectedOptions: options,
        specialInstructions: notes,
      },
    ]);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans pb-28 selection:bg-amber-500 selection:text-black">
      {/* 1. Header with Golden Oak Branding & Botanical Flourishes */}
      <Header
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        onOpenWaiterModal={() => setIsWaiterModalOpen(true)}
      />

      {/* 2. Category Carousel */}
      <CategoryCarousel
        activeCategory={activeCategory}
        onSelectCategory={(id) => {
          setActiveCategory(id);
          setSearchQuery(''); // reset search when explicitly choosing category
        }}
        lang={lang}
      />

      {/* 3. Search and Filter Controls */}
      <SearchAndFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDietary={selectedDietary}
        setSelectedDietary={setSelectedDietary}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categoryTitle={currentCategoryTitle}
        lang={lang}
      />

      {/* 4. Main Menu Dishes List / Grid */}
      <main className="w-full max-w-4xl mx-auto px-4 mt-2">
        {filteredDishes.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 bg-neutral-900/30 rounded-3xl border border-neutral-800/80 p-8 my-4">
            <UtensilsCrossed className="w-10 h-10 mx-auto text-amber-500/40 mb-3" />
            <h3 className="font-serif text-xl font-bold text-neutral-200">
              {lang === 'pl' ? 'Nie znaleziono dań' : 'No dishes found'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              {lang === 'pl'
                ? 'Spróbuj zmienić filtr dietetyczny lub wyszukać inną frazę.'
                : 'Try adjusting your dietary filter or search query.'}
            </p>
            <button
              onClick={() => {
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-neutral-800 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/30 hover:bg-neutral-700 transition-colors"
            >
              {lang === 'pl' ? 'Wyczyść filtry' : 'Clear filters'}
            </button>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredDishes.map((dish) => (
              <DishListCard
                key={dish.id}
                dish={dish}
                currency={currency}
                lang={lang}
                onSelect={(d) => setSelectedDish(d)}
                onQuickAdd={handleQuickAdd}
                isAdded={recentlyAddedId === dish.id}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredDishes.map((dish) => (
              <DishGridCard
                key={dish.id}
                dish={dish}
                currency={currency}
                lang={lang}
                onSelect={(d) => setSelectedDish(d)}
                onQuickAdd={handleQuickAdd}
                isAdded={recentlyAddedId === dish.id}
              />
            ))}
          </div>
        )}

        {/* Fine Dining Badges & Restaurant Hours */}
        <footer className="mt-14 pt-8 border-t border-neutral-800/80 text-center space-y-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center justify-center gap-6 text-amber-400/80 font-cinzel">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Michelin Guide 2026 Recommended
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Chef's Organic Sourcing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2 text-[11px] text-neutral-400">
            <div className="flex items-center justify-center gap-1.5 bg-neutral-900/50 p-2.5 rounded-xl border border-neutral-800/60">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>12:00 – 23:30 (Daily)</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-neutral-900/50 p-2.5 rounded-xl border border-neutral-800/60">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Krakowskie Przedmieście 14</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-neutral-900/50 p-2.5 rounded-xl border border-neutral-800/60">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+48 22 890 00 00</span>
            </div>
          </div>

          <p className="text-[10px] text-neutral-600 font-cinzel tracking-widest pt-2">
            THE GOLDEN OAK RESTAURANT & WINE BAR © 2026 • ALL RIGHTS RESERVED
          </p>
        </footer>
      </main>

      {/* 5. Floating Concierge & Order Action (matching screenshot bottom right) */}
      <FloatingConcierge
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWaiter={() => setIsWaiterModalOpen(true)}
        lang={lang}
      />

      {/* 6. Modals and Drawers */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        currency={currency}
        lang={lang}
        onAddToCart={handleAddToCartWithCustomizations}
      />

      <OrderCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
        tableNumber={tableNumber}
        lang={lang}
      />

      <WaiterCallModal
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
        tableNumber={tableNumber}
        lang={lang}
      />
    </div>
  );
}
