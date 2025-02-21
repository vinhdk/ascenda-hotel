import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HotelCardComponent } from '../../components';
import { injectCurrency, injectHotel } from '../../injectors';
import { AscendaCombinedHotel } from '../../types';
import { combineHotels } from '../../utils';

@Component({
  selector: 'ascenda-hotel-list',
  template: `
    @for (hotel of hotelCombinedSignal(); track hotel.id) {
      <ascenda-hotel-card
        [instance]="hotel"
        (click)="selected.set(hotel)"
        [class.opacity-50]="selected()?.id === hotel.id" />
    }
  `,
  imports: [HotelCardComponent],
  styles: `
    :host {
      @apply grid h-full gap-10 overflow-y-auto p-10;
      grid-template-columns: repeat(auto-fit, minmax(312px, 1fr));

      @media screen and (max-width: 768px) {
        @apply p-4;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelListComponent {
  public readonly hotelInjector = injectHotel();
  public readonly currencyInjector = injectCurrency();
  public readonly selected = model<AscendaCombinedHotel | null>(null);
  public readonly hotelsSignal = toSignal(this.hotelInjector.getAllAsync(), {
    initialValue: [],
  });
  public readonly hotelCombinedSignal = computed(() => {
    const hotels = this.hotelsSignal();
    const metadata = this.currencyInjector.metadataSignal();
    return combineHotels(hotels, metadata);
  });
}
