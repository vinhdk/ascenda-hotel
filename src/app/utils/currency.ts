import { environment } from '../../environments/environment';

const transformMapping = [
  {
    currencies: ['USD', 'SGD', 'CNY'],
    transform: (value: number) => Math.round(value),
  },
  {
    currencies: ['KRW', 'JPY', 'IDR'],
    transform: (value: number) => Math.round(value / 100) * 100,
  },
];

/**
 * @description Round currency
 * @param value {number}
 * @param currency {string | undefined}
 * @returns {number}
 * @example
 * roundCurrency(123.45); // 123
 * roundCurrency(123.45, 'USD'); // 123
 * roundCurrency(123.45, 'SGD'); // 123
 * roundCurrency(123.45, 'CNY'); // 123
 * roundCurrency(12345.67, 'KRW'); // 12300
 * roundCurrency(12345.67, 'JPY'); // 12300
 * roundCurrency(12345.67, 'IDR'); // 12300
 * roundCurrency(12345.67, 'ABC'); // 12345.67
 */
export const roundCurrency = (
  value: number,
  currency: string = environment.currency
): number => {
  const mapping = transformMapping.find(mapping =>
    mapping.currencies.includes(currency)
  );

  if (!mapping) {
    return value;
  }

  return mapping.transform(value);
};

export const currencies = ['USD', 'SGD', 'CNY', 'KRW', 'JPY', 'IDR'];

export const currencySymbols = {
  USD: '$',
  SGD: '$',
  CNY: '¥',
  KRW: '₩',
  JPY: '¥',
  IDR: 'Rp',
};
