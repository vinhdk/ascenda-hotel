import { currencies } from '../../utils';
import { CurrencyFlagPipe } from './currency-flag.pipe';

describe('CurrencyFlagPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyFlagPipe();
    expect(pipe).toBeTruthy();
  });

  currencies.forEach(currency => {
    it(`should return the correct flag for ${currency}`, () => {
      const pipe = new CurrencyFlagPipe();
      expect(pipe.transform(currency)).toBe(
        `https://flagsapi.com/${currency.slice(0, 2)}/flat/32.png`
      );
    });

    [16, 24].forEach(size => {
      it(`should return the correct flag with custom size for ${currency}`, () => {
        const pipe = new CurrencyFlagPipe();
        expect(pipe.transform(currency, size)).toBe(
          `https://flagsapi.com/${currency.slice(0, 2)}/flat/${size}.png`
        );
      });
    });
  });
});
