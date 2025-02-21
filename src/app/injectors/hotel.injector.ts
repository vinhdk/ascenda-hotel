import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken, Provider } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAscendaHotel, IAscendaMetadata } from '../interfaces';
import { sanitizeHTML } from '../utils';

export interface IHotelInjector {
  /**
   * @description Get all hotels
   * @returns {Observable<IAscendaHotel[]>}
   * @example
   * const hotels = await hotelActions.getAllAsync();
   * console.log(hotels);
   * // => []
   */
  getAllAsync(): Observable<IAscendaHotel[]>;
  /**
   * @description Get currency
   * @param currency {string | undefined}
   * @returns {Observable<IAscendaMetadata>}
   * @example
   * const currency = await hotelActions.getCurrencyAsync('USD');
   * console.log(currency);
   * // => {
   *   id: 1,
   *   price: 120,
   *   competitors: {
   *     'Booking.com': 125,
   *     'Hotels.com': 121,
   *     'Expedia': 120,
   *     'getaroom': 140,
   *     'AMOMA.com': 132.77
   *   },
   *   taxes_and_fees: {
   *     tax: 0,
   *     hotel_fees: 0
   *   }
   * }
   */
  getMetadataAsync(currency?: string): Observable<IAscendaMetadata[]>;
}

export const HOTEL_INJECTOR_TOKEN = new InjectionToken<IHotelInjector>(
  'HOTEL_INJECTOR_TOKEN'
);

export const provideHotel = (): Provider => ({
  provide: HOTEL_INJECTOR_TOKEN,
  useFactory: (): IHotelInjector => {
    const baseUrl = `${environment.endpoint}/hotels/tokyo`;
    const httpClient = inject(HttpClient);
    const domSanitizer = inject(DomSanitizer);

    return {
      getAllAsync: (): Observable<IAscendaHotel[]> => {
        return httpClient.get<IAscendaHotel[]>(`${baseUrl}`).pipe(
          map(hotels =>
            hotels.map(hotel => ({
              ...hotel,
              // Sanitize HTML to prevent XSS attacks
              description: domSanitizer.bypassSecurityTrustHtml(
                sanitizeHTML(`${hotel.description}`)
              ),
            }))
          )
        );
      },
      getMetadataAsync: (
        currency: string = environment.currency
      ): Observable<IAscendaMetadata[]> => {
        return httpClient.get<IAscendaMetadata[]>(`${baseUrl}/1/${currency}`);
      },
    };
  },
  deps: [HttpClient, DomSanitizer],
});

export const injectHotel = () => inject(HOTEL_INJECTOR_TOKEN);
