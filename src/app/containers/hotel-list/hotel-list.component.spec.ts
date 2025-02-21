import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  CURRENCY_INJECTOR_TOKEN,
  HOTEL_INJECTOR_TOKEN,
  injectHotel,
  provideCurrency,
  provideHotel,
} from '../../injectors';
import { IAscendaHotel, IAscendaMetadata } from '../../interfaces';
import { HotelListComponent } from './hotel-list.component';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideCurrency(),
        provideHotel(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty when no data', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN],
      async (hotelInjector: ReturnType<typeof injectHotel>) => {
        jest.spyOn(hotelInjector, 'getAllAsync').mockReturnValue(of([]));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.hotelsSignal()).toEqual([]);
        const hotelCards = fixture.debugElement.queryAll(
          By.css('sao-hotel-card')
        );
        expect(hotelCards.length).toBe(0);
      }
    )
  ));

  it('should show list of hotels when have data', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN],
      async (hotelInjector: ReturnType<typeof injectHotel>) => {
        const mockHotels: IAscendaHotel[] = [
          {
            id: 1,
            name: 'Hotel A',
            description: '<p>Hello World</p>',
            rating: 5,
            stars: 4,
            address: 'Address 1',
            photo: 'photo.jpg',
          },
          {
            id: 2,
            name: 'Hotel B',
            description: '<p>Hello World</p>',
            rating: 5,
            stars: 4,
            address: 'Address 2',
            photo: 'photo.jpg',
          },
        ];
        jest
          .spyOn(hotelInjector, 'getAllAsync')
          .mockReturnValue(of(mockHotels));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.hotelsSignal()).toEqual(mockHotels);
        const hotelCards = fixture.debugElement.queryAll(
          By.css('sao-hotel-card')
        );
        expect(hotelCards.length).toBe(2);
      }
    )
  ));

  it('should show `Rates unavailable` when price is empty', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN, CURRENCY_INJECTOR_TOKEN],
      async (hotelInjector: ReturnType<typeof injectHotel>) => {
        const mockHotels: IAscendaHotel[] = [
          {
            id: 1,
            name: 'Hotel A',
            description: '<p>Hello World</p>',
            rating: 5,
            stars: 4,
            address: 'Address 1',
            photo: 'photo.jpg',
          },
          {
            id: 2,
            name: 'Hotel B',
            description: '<p>Hello World</p>',
            rating: 5,
            stars: 4,
            address: 'Address 2',
            photo: 'photo.jpg',
          },
        ];
        jest
          .spyOn(hotelInjector, 'getAllAsync')
          .mockReturnValue(of(mockHotels));
        jest.spyOn(hotelInjector, 'getMetadataAsync').mockReturnValue(
          of([
            {
              id: 1,
              price: 100,
            },
            {
              id: 2,
            },
          ] as IAscendaMetadata[])
        );
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.hotelsSignal()).toEqual(mockHotels);
        const hotelCards = fixture.debugElement.queryAll(
          By.css('sao-hotel-card')
        );
        expect(hotelCards.length).toBe(2);
        expect(hotelCards[1].nativeElement.textContent).not.toContain(
          'Rates unavailable'
        );
        expect(hotelCards[0].nativeElement.textContent).toContain(
          'Rates unavailable'
        );
      }
    )
  ));

  it('should update selected when click hotel card', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN],
      async (hotelInjector: ReturnType<typeof injectHotel>) => {
        const mockHotels: IAscendaHotel[] = [
          {
            id: 1,
            name: 'Hotel A',
            description: '<p>Hello World</p>',
            rating: 5,
            stars: 4,
            address: 'Address 1',
            photo: 'photo.jpg',
          },
          {
            id: 2,
            name: 'Hotel B',
            description: '<p>Hello World</p>',
            rating: 5,
            stars: 4,
            address: 'Address 2',
            photo: 'photo.jpg',
          },
        ];
        jest
          .spyOn(hotelInjector, 'getAllAsync')
          .mockReturnValue(of(mockHotels));
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.hotelsSignal()).toEqual(mockHotels);
        const hotelCards = fixture.debugElement.queryAll(
          By.css('sao-hotel-card')
        );
        expect(hotelCards.length).toBe(2);

        hotelCards[0].nativeElement.click();
        fixture.detectChanges();
        expect(component.selected()).toEqual(mockHotels[0]);
      }
    )
  ));
});
