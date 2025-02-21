import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CurrencyPickerComponent } from './components';
import { HotelDetailComponent, HotelListComponent } from './containers';
import { injectCurrency } from './injectors';
import { AscendaCombinedHotel } from './types';

@Component({
  selector: 'ascenda-root',
  template: `
    <header>
      <img [src]="'logo-white.svg'" alt="Ascenda Logo" />
      <ascenda-currency-picker [(value)]="currencyInjector.currencySignal" />
    </header>
    <main>
      <ascenda-hotel-list [(selected)]="selected" />
      @if (selected(); as instance) {
        <ascenda-hotel-detail
          [instance]="instance"
          (closeEvent)="selected.set(null)" />
      }
    </main>
  `,
  styles: `
    :host {
      @apply flex h-full w-full flex-col;

      > header {
        @apply flex h-16 items-center justify-between gap-4 bg-branding-background-800 px-10;

        > img {
          @apply h-6;
        }

        @media screen and (max-width: 768px) {
          @apply px-4;
        }
      }

      > main {
        @apply flex w-full;
        height: calc(100vh - 64px);

        @media screen and (min-width: 768px) {
          &:has(ascenda-hotel-detail) {
            ascenda-hotel-list {
              flex: 1 1 calc(100% - 386px);
            }
          }

          &:not(:has(ascenda-hotel-detail)) {
            ascenda-hotel-list {
              flex: 1 1 100%;
            }
          }
        }

        @media screen and (max-width: 768px) {
          ascenda-hotel-list {
            flex: 1 1 100%;
          }
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPickerComponent, HotelListComponent, HotelDetailComponent],
})
export class AppComponent {
  public readonly currencyInjector = injectCurrency();
  public readonly selected = signal<AscendaCombinedHotel | null>(null);
}
