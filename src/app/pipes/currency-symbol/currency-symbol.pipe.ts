import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AscendaKeys } from '../../enums';
import { currencySymbols, roundCurrency } from '../../utils';

@Pipe({
  name: 'ascendaCurrencySymbol',
})
export class CurrencySymbolPipe implements PipeTransform {
  public transform(value: number): string {
    const currency =
      localStorage.getItem(AscendaKeys.STORAGE) ?? environment.currency;
    return `${currencySymbols[currency as keyof typeof currencySymbols] ?? environment.symbol} ${roundCurrency(value, currency)}`;
  }
}
