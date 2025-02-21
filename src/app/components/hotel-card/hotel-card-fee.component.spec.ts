import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HotelCardFeeComponent } from './hotel-card-fee.component';

describe('HotelCardFeeComponent', () => {
  let component: HotelCardFeeComponent;
  let fixture: ComponentFixture<HotelCardFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelCardFeeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelCardFeeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('instance', {});
    fixture.componentRef.setInput('saving', 0);
    fixture.componentRef.setInput('max', 0);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show unavailable for all when price is not available', async () => {
    fixture.componentRef.setInput('instance', {
      price: null,
    });
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.unavailable()).toBe(true);

    const priceContent = fixture.debugElement.query(By.css('li'));
    expect(priceContent).toBeTruthy();
    expect(priceContent.nativeElement.textContent).toContain(
      'Rates unavailable'
    );
  });

  it('should not show unavailable for all when price is available', async () => {
    fixture.componentRef.setInput('instance', {
      price: 100,
    });
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.unavailable()).toBe(false);
    const priceContent = fixture.debugElement.query(By.css('li'));
    expect(priceContent).toBeTruthy();
    expect(priceContent.nativeElement.textContent).not.toContain(
      'Rates unavailable'
    );
  });

  it('should show taxes_and_fees when taxes_and_fees is not null', async () => {
    fixture.componentRef.setInput('instance', {
      taxes_and_fees: {},
    });
    fixture.detectChanges();
    await fixture.whenStable();
    expect(
      fixture.debugElement.query(By.css('ascenda-taxes-and-fees'))
    ).toBeTruthy();
  });
});
