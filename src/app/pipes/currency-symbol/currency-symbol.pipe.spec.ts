import { AscendaKeys } from '../../enums';
import { CurrencySymbolPipe } from './currency-symbol.pipe';

describe('CurrencySymbolPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencySymbolPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the correct symbol', () => {
    const pipe = new CurrencySymbolPipe();
    expect(pipe.transform(100)).toBe('$ 100');
  });

  it('should return the correct symbol for USD', () => {
    const pipe = new CurrencySymbolPipe();
    localStorage.setItem(AscendaKeys.STORAGE, 'USD');
    expect(pipe.transform(100)).toBe('$ 100');
  });

  it('should return the correct symbol for SGD', () => {
    const pipe = new CurrencySymbolPipe();
    localStorage.setItem(AscendaKeys.STORAGE, 'SGD');
    expect(pipe.transform(100)).toBe('$ 100');
  });

  it('should return the correct symbol for CNY', () => {
    const pipe = new CurrencySymbolPipe();
    localStorage.setItem(AscendaKeys.STORAGE, 'CNY');
    expect(pipe.transform(100)).toBe('¥ 100');
  });

  it('should return the correct symbol for KRW', () => {
    const pipe = new CurrencySymbolPipe();
    localStorage.setItem(AscendaKeys.STORAGE, 'KRW');
    expect(pipe.transform(100)).toBe('₩ 100');
  });

  it('should return the correct symbol for JPY', () => {
    const pipe = new CurrencySymbolPipe();
    localStorage.setItem(AscendaKeys.STORAGE, 'JPY');
    expect(pipe.transform(100)).toBe('¥ 100');
  });

  it('should return the correct symbol for IDR', () => {
    const pipe = new CurrencySymbolPipe();
    localStorage.setItem(AscendaKeys.STORAGE, 'IDR');
    expect(pipe.transform(100)).toBe('Rp 100');
  });

  it('should return default symbol in environment when currency is not found', () => {
    const pipe = new CurrencySymbolPipe();
    localStorage.setItem(AscendaKeys.STORAGE, 'ABC');
    expect(pipe.transform(100)).toBe('$ 100');
  });
});
