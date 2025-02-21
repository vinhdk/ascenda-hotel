import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ascendaCurrencyFlag',
})
export class CurrencyFlagPipe implements PipeTransform {
  public transform(currency: string, size = 32): string {
    return `https://flagsapi.com/${currency.slice(0, 2)}/flat/${size}.png`;
  }
}
