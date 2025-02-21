import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IAscendaMetadataTaxAndFee } from '../../interfaces';
import { CurrencySymbolPipe } from '../../pipes';

@Component({
  selector: 'ascenda-taxes-and-fees',
  imports: [CurrencySymbolPipe],
  template: `
    <ul [class.justify-end]="justifyEnd()">
      @if (instance().tax; as tax) {
        <li>
          <span class="sao-lozenges sao-lozenges--bold sao-lozenges--info">
            Tax: {{ +tax | ascendaCurrencySymbol }}
          </span>
        </li>
      }
      @if (instance().hotel_fees; as hotel_fees) {
        <li>
          <span class="sao-lozenges sao-lozenges--bold sao-lozenges--info">
            Hotel Fees: {{ +hotel_fees | ascendaCurrencySymbol }}
          </span>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      @apply contents;

      > ul {
        @apply flex w-full flex-wrap gap-2;
        zoom: 0.75;

        > li {
          @apply contents;
        }
      }
    }
  `,
})
export class TaxesAndFeesComponent {
  public readonly instance =
    input.required<Partial<IAscendaMetadataTaxAndFee>>();
  public readonly justifyEnd = input<boolean>(false);
}
