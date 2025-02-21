import {
  computed,
  inject,
  InjectionToken,
  Provider,
  resource,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AscendaKeys } from '../enums';
import { IAscendaMetadata } from '../interfaces';
import { HOTEL_INJECTOR_TOKEN, injectHotel } from './hotel.injector';

export interface ICurrencyInjector {
  currencySignal: WritableSignal<string>;
  metadataSignal: Signal<IAscendaMetadata[]>;
}

export const CURRENCY_INJECTOR_TOKEN = new InjectionToken<ICurrencyInjector>(
  'CURRENCY_INJECTOR_TOKEN'
);

export const provideCurrency = (): Provider => ({
  provide: CURRENCY_INJECTOR_TOKEN,
  useFactory: (): ICurrencyInjector => {
    const hotelInjector = injectHotel();

    const currencySignal = signal<string>(
      localStorage.getItem(AscendaKeys.STORAGE) ?? environment.currency
    );

    const ref = resource({
      request: () => ({
        currency: currencySignal(),
      }),
      loader: async ({ request }) => {
        localStorage.setItem(AscendaKeys.STORAGE, request.currency);
        return firstValueFrom(hotelInjector.getMetadataAsync(request.currency));
      },
    });

    return {
      currencySignal,
      metadataSignal: computed(() => ref.value() || []),
    };
  },
  deps: [HOTEL_INJECTOR_TOKEN],
});

export const injectCurrency = () => inject(CURRENCY_INJECTOR_TOKEN);
