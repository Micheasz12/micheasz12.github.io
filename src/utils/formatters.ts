import { Currency } from '../types';

export function formatPrice(amount: number, currency: Currency): string {
  // Exchange rates for conversion
  const rates: Record<Currency, number> = {
    USD: 1,
    PLN: 4.10,
    EUR: 0.92,
  };

  const converted = amount * rates[currency];

  switch (currency) {
    case 'USD':
      return `$${converted.toFixed(2)}`;
    case 'EUR':
      return `€${converted.toFixed(2)}`;
    case 'PLN':
      return `${converted.toFixed(2)} zł`;
  }
}
