import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AscendaKeys } from '../enums';
import { IAscendaMetadata } from '../interfaces';
import { currencies } from '../utils';
import {
  CURRENCY_INJECTOR_TOKEN,
  injectCurrency,
  provideCurrency,
} from './currency.injector';
import {
  HOTEL_INJECTOR_TOKEN,
  injectHotel,
  provideHotel,
} from './hotel.injector';
import { provideLoading } from './loading.injector';

describe('[Injector injectCurrency]', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideHotel(),
        provideCurrency(),
        provideLoading(),
      ],
    });
  });

  it('should be created', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN, CURRENCY_INJECTOR_TOKEN],
      (
        hotelInjector: ReturnType<typeof injectHotel>,
        currencyInjector: ReturnType<typeof injectCurrency>
      ) => {
        expect(currencyInjector).toBeTruthy();
        expect(hotelInjector).toBeTruthy();
      }
    )
  ));

  it('metadataSignal should be empty when currency is empty', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN, CURRENCY_INJECTOR_TOKEN],
      (
        hotelInjector: ReturnType<typeof injectHotel>,
        currencyInjector: ReturnType<typeof injectCurrency>
      ) => {
        const mockCurrencies: IAscendaMetadata[] = [];
        jest
          .spyOn(hotelInjector, 'getMetadataAsync')
          .mockReturnValue(of(mockCurrencies));

        setTimeout(() => {
          expect(hotelInjector.getMetadataAsync).toHaveBeenCalledWith(
            currencyInjector.currencySignal()
          );
          expect(currencyInjector.metadataSignal()).toEqual(mockCurrencies);
        }, 0);
      }
    )
  ));

  [
    {
      title: 'metadataSignal should be empty when currency is empty',
      response: [] as IAscendaMetadata[],
    },
    {
      title: 'metadataSignal should be filled when currency is not empty',
      response: [
        {
          id: 1,
          price: 120,
          competitors: { 'Booking.com': 125, Expedia: 120 },
          taxes_and_fees: { tax: 10, hotel_fees: 5 },
        },
      ] as IAscendaMetadata[],
    },
  ].forEach(({ title, response }) => {
    it(
      title,
      waitForAsync(
        inject(
          [HOTEL_INJECTOR_TOKEN, CURRENCY_INJECTOR_TOKEN],
          (
            hotelInjector: ReturnType<typeof injectHotel>,
            currencyInjector: ReturnType<typeof injectCurrency>
          ) => {
            jest
              .spyOn(hotelInjector, 'getMetadataAsync')
              .mockReturnValue(of(response));

            setTimeout(() => {
              expect(hotelInjector.getMetadataAsync).toHaveBeenCalledWith(
                currencyInjector.currencySignal()
              );
              expect(currencyInjector.metadataSignal()).toEqual(response);
            }, 0);
          }
        )
      )
    );
  });

  currencies.forEach(currency => {
    it('localStorage should be set when currency is ${currency}', waitForAsync(
      inject(
        [HOTEL_INJECTOR_TOKEN, CURRENCY_INJECTOR_TOKEN],
        (
          hotelInjector: ReturnType<typeof injectHotel>,
          currencyInjector: ReturnType<typeof injectCurrency>
        ) => {
          jest.spyOn(hotelInjector, 'getMetadataAsync').mockReturnValue(of([]));

          currencyInjector.currencySignal.set(currency);

          setTimeout(() => {
            expect(localStorage.getItem(AscendaKeys.STORAGE)).toBe(currency);
          }, 0);
        }
      )
    ));
  });

  it('metadataSignal should return empty when error', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN, CURRENCY_INJECTOR_TOKEN],
      (
        hotelInjector: ReturnType<typeof injectHotel>,
        currencyInjector: ReturnType<typeof injectCurrency>
      ) => {
        jest
          .spyOn(hotelInjector, 'getMetadataAsync')
          .mockReturnValue(throwError(() => new Error('Error')));

        setTimeout(() => {
          expect(currencyInjector.metadataSignal()).toEqual([]);
        }, 0);
      }
    )
  ));
});
