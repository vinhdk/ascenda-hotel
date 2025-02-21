import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CurrencySymbolPipe } from '../../pipes';
import { AscendaCombinedHotel } from '../../types';
import { TaxesAndFeesComponent } from '../taxes-and-fees/taxes-and-fees.component';

@Component({
  selector: 'ascenda-hotel-card-fee',
  template: `
    <ul>
      <li [class.unavailable]="unavailable()">
        @if (!unavailable()) {
          <span [class.opacity-0]="saving() === 0">
            {{ instance().price | ascendaCurrencySymbol }}
          </span>
          <span>
            {{
              (saving() > 0 ? min() : instance().price) | ascendaCurrencySymbol
            }}
          </span>
        } @else {
          <span>Rates unavailable</span>
        }
      </li>
      @if (instance().taxes_and_fees; as taxes_and_fees) {
        <li>
          <ascenda-taxes-and-fees
            [instance]="taxes_and_fees"
            [justifyEnd]="true" />
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencySymbolPipe, TaxesAndFeesComponent],
  styles: `
    :host {
      @apply contents;

      > ul {
        @apply flex min-h-12 w-full flex-col items-end justify-end;

        > li {
          &:first-child {
            @apply flex items-center gap-1.5;
            &.unavailable {
              > span {
                @apply text-b5 text-branding-foreground-50;
              }
            }

            &:not(.unavailable) {
              > span {
                &:first-child {
                  @apply text-b4 text-branding-foreground-50 line-through;
                }

                &:last-child {
                  @apply text-b2 font-semibold text-branding-foreground-50;
                }
              }
            }
          }

          &:nth-child(2) {
            @apply contents;
          }
        }
      }
    }
  `,
})
export class HotelCardFeeComponent {
  public readonly instance = input.required<AscendaCombinedHotel>();
  public readonly saving = input.required<number>();
  public readonly min = input.required<number>();
  public readonly unavailable = computed(() => this.instance().price == null);
}
