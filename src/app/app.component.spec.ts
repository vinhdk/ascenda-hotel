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
import { AppComponent } from './app.component';
import {
  HOTEL_INJECTOR_TOKEN,
  injectHotel,
  provideCurrency,
  provideHotel,
} from './injectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideHotel(),
        provideCurrency(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show detail when select hotel', waitForAsync(
    inject(
      [HOTEL_INJECTOR_TOKEN],
      async (hotelInjector: ReturnType<typeof injectHotel>) => {
        jest.spyOn(hotelInjector, 'getAllAsync').mockReturnValue(
          of([
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
          ])
        );
        fixture.detectChanges();
        await fixture.whenStable();
        const hotelCards = fixture.debugElement.queryAll(
          By.css('sao-hotel-card')
        );
        expect(hotelCards.length).toBe(2);
        expect(
          hotelCards[0].nativeElement.querySelector('img')?.getAttribute('src')
        ).toBe('photo.jpg');
        expect(
          hotelCards[0].nativeElement.querySelector('strong')?.textContent
        ).toBe('Hotel A');
        expect(
          hotelCards[1].nativeElement.querySelector('img')?.getAttribute('src')
        ).toBe('photo.jpg');
        expect(
          hotelCards[1].nativeElement.querySelector('strong')?.textContent
        ).toBe('Hotel B');

        hotelCards[0].nativeElement.click();
        fixture.detectChanges();
        const detail = fixture.debugElement.query(By.css('sao-hotel-detail'));
        expect(detail).toBeTruthy();
      }
    )
  ));
});
