export type CategoryId = 'starters' | 'mains' | 'burgers' | 'salads' | 'desserts' | 'drinks' | 'chef';

export type DietaryType = 'all' | 'veg' | 'non-veg' | 'spicy' | 'gluten-free' | 'seafood';

export interface Dish {
  id: string;
  name: string;
  namePl: string;
  categoryId: CategoryId;
  description: string;
  descriptionPl: string;
  price: number;
  originalPrice?: number;
  calories: number;
  dietary: 'veg' | 'non-veg' | 'seafood';
  spicy?: boolean;
  glutenFree?: boolean;
  badge?: 'NEW' | 'CHEF' | 'BESTSELLER' | 'POPULAR';
  image: string;
  ingredients: string[];
  ingredientsPl: string[];
  allergens: string[];
  allergensPl: string[];
  prepTime: string;
  winePairing?: string;
  winePairingPl?: string;
  options?: {
    name: string;
    namePl: string;
    choices: { name: string; namePl: string; priceDiff?: number }[];
  }[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedOptions?: Record<string, string>;
  specialInstructions?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  namePl: string;
  iconName: string;
}

export type Currency = 'USD' | 'PLN' | 'EUR';
