import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { IAscendaHotel, IAscendaMetadata } from '../interfaces';
import {
  HOTEL_INJECTOR_TOKEN,
  injectHotel,
  provideHotel,
} from './hotel.injector';
import { provideLoading } from './loading.injector';

describe('[Injector injectHotel]', () => {
  let httpMock: HttpTestingController;
  let hotelInjector: ReturnType<typeof injectHotel>;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideHotel(),
        provideLoading(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    hotelInjector = TestBed.inject(HOTEL_INJECTOR_TOKEN);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(hotelInjector).toBeTruthy();
  });

  it('[Function getAllAsync] should fetch all hotels and sanitize descriptions', done => {
    const mockHotels: IAscendaHotel[] = [
      {
        id: 1,
        name: 'Hotel A',
        description: '<script>alert("XSS")</script> Safe text',
        rating: 5,
        stars: 4,
        address: 'Address 1',
        photo: 'photo.jpg',
      },
      {
        id: 2,
        name: 'Hotel B',
        description: '<b>Bold</b> Text',
        rating: 5,
        stars: 4,
        address: 'Address 2',
        photo: 'photo.jpg',
      },
    ];

    jest
      .spyOn(sanitizer, 'bypassSecurityTrustHtml')
      .mockImplementation(html => `sanitized: ${html}`);

    hotelInjector.getAllAsync().subscribe(hotels => {
      expect(hotels.length).toBe(2);
      expect(hotels[0].description).toBe('sanitized: Safe text');
      expect(hotels[1].description).toBe('sanitized: <b>Bold</b> Text');
      done();
    });

    const req = httpMock.expectOne(`${environment.endpoint}/hotels/tokyo`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHotels);
  });

  describe('[Function getMetadataAsync] should fetch currency details', () => {
    it('Passing value should return list [USD]', done => {
      const mockCurrencies: IAscendaMetadata[] = [
        {
          id: 1,
          price: 120,
          competitors: { 'Booking.com': 125, Expedia: 120 },
          taxes_and_fees: { tax: 10, hotel_fees: 5 },
        },
      ];

      hotelInjector.getMetadataAsync('USD').subscribe(currencies => {
        expect(currencies).toEqual(mockCurrencies);
        done();
      });

      const req = httpMock.expectOne(
        `${environment.endpoint}/hotels/tokyo/1/USD`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCurrencies);
    });

    it(`Passing empty value should use ${environment.currency} by default`, done => {
      const mockCurrencies: IAscendaMetadata[] = [
        {
          id: 1,
          price: 120,
          competitors: { 'Booking.com': 125, Expedia: 120 },
          taxes_and_fees: { tax: 10, hotel_fees: 5 },
        },
      ];

      hotelInjector.getMetadataAsync().subscribe(currencies => {
        expect(currencies).toEqual(mockCurrencies);
        done();
      });

      const req = httpMock.expectOne(
        `${environment.endpoint}/hotels/tokyo/1/${environment.currency}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCurrencies);
    });
  });
});
