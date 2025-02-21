import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HotelDetailCompetitorsComponent } from './hotel-detail-competitors.component';

describe('HotelDetailCompetitorsComponent', () => {
  let component: HotelDetailCompetitorsComponent;
  let fixture: ComponentFixture<HotelDetailCompetitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelDetailCompetitorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelDetailCompetitorsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('instance', {});
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show unavailable for all when price is not available', async () => {
    fixture.componentRef.setInput('instance', {
      competitors: {
        Agoda: 100,
        'Booking.com': 100,
      },
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.unavailable()).toBe(true);
    const items = fixture.debugElement.queryAll(By.css('ul > li'));
    expect(items.length).toBe(2);
    items.forEach(item => {
      expect(item.nativeElement.textContent).toContain('Rates unavailable');
    });
  });

  it('should not show unavailable for all when price is available', async () => {
    fixture.componentRef.setInput('instance', {
      competitors: {
        Agoda: 100,
        'Booking.com': 100,
      },
      price: 100,
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.unavailable()).toBe(false);
    const items = fixture.debugElement.queryAll(By.css('ul > li'));
    expect(items.length).toBe(2);
    items.forEach(item => {
      expect(item.nativeElement.textContent).not.toContain('Rates unavailable');
    });
  });
});
