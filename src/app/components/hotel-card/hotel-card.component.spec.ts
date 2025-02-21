import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HotelCardComponent } from './hotel-card.component';

describe('HotelCardComponent', () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('instance', {});
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show saving when competitors price is cheaper than instance price', async () => {
    fixture.componentRef.setInput('instance', {
      price: 100,
      competitors: {
        'Booking.com': 99,
      },
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const span = fixture.debugElement.query(By.css('header > div > span'));
    expect(span).toBeTruthy();
    expect(span.nativeElement.textContent).toContain(
      `Save ${component.saving()}%`
    );
  });

  it('should not show saving when competitors price is not cheaper than instance price', async () => {
    fixture.componentRef.setInput('instance', {
      price: 100,
      competitors: {
        'Booking.com': 101,
      },
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const span = fixture.debugElement.query(By.css('header > div > span'));
    expect(span).toBeFalsy();
  });

  it('should not show saving when competitors is empty', async () => {
    fixture.componentRef.setInput('instance', {
      price: 100,
      competitors: {},
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const span = fixture.debugElement.query(By.css('header > div > span'));
    expect(span).toBeFalsy();
  });

  it('should not show saving when min is 0', async () => {
    fixture.componentRef.setInput('instance', {
      price: 100,
      competitors: {
        'Booking.com': 0,
      },
    });
    fixture.detectChanges();
    await fixture.whenStable();
    const span = fixture.debugElement.query(By.css('header > div > span'));
    expect(span).toBeFalsy();
  });
});
