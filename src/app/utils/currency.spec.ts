import { roundCurrency } from './currency';

describe('[Function roundCurrency]', () => {
  it('[USD, SGD, CNY]', () => {
    expect(roundCurrency(123.45)).toEqual(123);
    expect(roundCurrency(123.45, 'USD')).toEqual(123);
    expect(roundCurrency(123.45, 'SGD')).toEqual(123);
    expect(roundCurrency(123.45, 'CNY')).toEqual(123);
  });

  it('[KRW, JPY, IDR]', () => {
    expect(roundCurrency(12345.67, 'KRW')).toEqual(12300);
    expect(roundCurrency(12345.67, 'JPY')).toEqual(12300);
    expect(roundCurrency(12345.67, 'IDR')).toEqual(12300);
  });

  it('[Invalid Currency]', () => {
    expect(roundCurrency(12345.67, 'ABC')).toEqual(12345.67);
  });
});
