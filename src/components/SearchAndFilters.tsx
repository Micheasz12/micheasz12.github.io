import { ReactNode } from 'react';
import { Search, X, LayoutList, LayoutGrid, Leaf, Beef, Flame, Fish, Wheat } from 'lucide-react';
import { DietaryType } from '../types';

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDietary: DietaryType;
  setSelectedDietary: (d: DietaryType) => void;
  viewMode: 'list' | 'grid';
  setViewMode: (v: 'list' | 'grid') => void;
  categoryTitle: string;
  lang: 'pl' | 'en';
}

export function SearchAndFilters({
  searchQuery,
  setSearchQuery,
  selectedDietary,
  setSelectedDietary,
  viewMode,
  setViewMode,
  categoryTitle,
  lang,
}: SearchAndFiltersProps) {
  const dietaryOptions: { id: DietaryType; label: string; icon: ReactNode; color: string }[] = [
    { id: 'all', label: lang === 'pl' ? 'Wszystkie' : 'All', icon: null, color: '' },
    {
      id: 'veg',
      label: 'Veg',
      icon: <Leaf className="w-3 h-3 text-emerald-400 fill-emerald-400/30" />,
      color: 'text-emerald-400',
    },
    {
      id: 'non-veg',
      label: 'Non-Veg',
      icon: <Beef className="w-3 h-3 text-rose-400" />,
      color: 'text-rose-400',
    },
    {
      id: 'seafood',
      label: lang === 'pl' ? 'Ryby & Owoce morza' : 'Seafood',
      icon: <Fish className="w-3 h-3 text-cyan-400" />,
      color: 'text-cyan-400',
    },
    {
      id: 'spicy',
      label: lang === 'pl' ? 'Ostre' : 'Spicy',
      icon: <Flame className="w-3 h-3 text-amber-500 fill-amber-500/40" />,
      color: 'text-amber-400',
    },
    {
      id: 'gluten-free',
      label: 'Gluten-Free',
      icon: <Wheat className="w-3 h-3 text-yellow-300" />,
      color: 'text-yellow-300',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-3.5 my-2">
      {/* Search Input matching screenshot */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-amber-500/70" />
        </div>
        <input
          id="search-dishes-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === 'pl' ? 'Szukaj dań, składników, alergenów...' : 'Search dishes, ingredients, allergens...'}
          className="w-full pl-10 pr-10 py-2.5 bg-neutral-900/90 text-sm text-neutral-100 placeholder-neutral-500 rounded-xl border border-neutral-800 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Heading & Filters matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        {/* Category Title in Serif */}
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-100 tracking-wide flex items-center gap-2">
          {categoryTitle}
          {searchQuery && (
            <span className="text-xs font-sans font-normal text-amber-400/80 bg-neutral-800/80 px-2 py-0.5 rounded-full border border-neutral-700">
              {lang === 'pl' ? 'Wyniki wyszukiwania' : 'Search results'}
            </span>
          )}
        </h2>

        {/* Dietary Pills & Layout View Toggle */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {/* Dietary Filters */}
          <div className="flex items-center gap-1.5 bg-neutral-900/80 p-1 rounded-full border border-neutral-800/90 shadow-sm flex-shrink-0">
            {dietaryOptions.map((opt) => {
              const isSelected = selectedDietary === opt.id;
              return (
                <button
                  key={opt.id}
                  id={`filter-btn-${opt.id}`}
                  onClick={() => setSelectedDietary(opt.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-neutral-800 text-amber-300 border border-amber-500/50 shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: List vs Grid */}
          <div className="flex items-center bg-neutral-900/80 p-1 rounded-full border border-neutral-800/90 shadow-sm flex-shrink-0">
            <button
              id="view-mode-list-btn"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-all ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title={lang === 'pl' ? 'Widok listy' : 'List view'}
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              id="view-mode-grid-btn"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-all ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title={lang === 'pl' ? 'Widok siatki' : 'Grid view'}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
