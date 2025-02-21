import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  model,
  untracked,
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
      @apply grid h-full gap-6 overflow-y-auto p-6;
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

  public constructor() {
    effect(() => {
      const hotels = this.hotelCombinedSignal();
      const selected = untracked(() => this.selected());
      this.updateSelected(hotels, selected);
    });
  }

  public updateSelected(
    hotels: AscendaCombinedHotel[],
    selected: AscendaCombinedHotel | null
  ): void {
    this.selected.set(
      selected ? (hotels.find(hotel => hotel.id === selected.id) ?? null) : null
    );
  }
}
