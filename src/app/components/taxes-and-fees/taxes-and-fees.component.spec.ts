import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaxesAndFeesComponent } from './taxes-and-fees.component';

describe('TaxesAndFeesComponent', () => {
  let component: TaxesAndFeesComponent;
  let fixture: ComponentFixture<TaxesAndFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxesAndFeesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxesAndFeesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('instance', {
      tax: 10,
      hotel_fees: 5,
    });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('ul should have class justify-end', () => {
    fixture.componentRef.setInput('justifyEnd', true);
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .query(By.css('ul'))
        .nativeElement.classList.contains('justify-end')
    ).toBe(true);
  });

  it('ul should not have class justify-end', () => {
    fixture.componentRef.setInput('justifyEnd', false);
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .query(By.css('ul'))
        .nativeElement.classList.contains('justify-end')
    ).toBe(false);
  });

  it('should show tax and fees', () => {
    fixture.componentRef.setInput('instance', {
      tax: 10,
      hotel_fees: 5,
    });
    fixture.detectChanges();
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul.nativeElement.textContent).toContain('Tax: $ 10');
    expect(ul.nativeElement.textContent).toContain('Hotel Fees: $ 5');
  });

  it('should show no tax and fees', () => {
    fixture.componentRef.setInput('instance', {
      tax: null,
      hotel_fees: null,
    });
    fixture.detectChanges();
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul.nativeElement.textContent).not.toContain('Tax');
    expect(ul.nativeElement.textContent).not.toContain('Hotel Fees');
  });

  it('should show only tax when no hotel_fees', () => {
    fixture.componentRef.setInput('instance', {
      tax: 10,
      hotel_fees: null,
    });
    fixture.detectChanges();
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul.nativeElement.textContent).toContain('Tax: $ 10');
    expect(ul.nativeElement.textContent).not.toContain('Hotel Fees');
  });

  it('should show only hotel_fees when no tax', () => {
    fixture.componentRef.setInput('instance', {
      tax: null,
      hotel_fees: 5,
    });
    fixture.detectChanges();
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul.nativeElement.textContent).not.toContain('Tax');
    expect(ul.nativeElement.textContent).toContain('Hotel Fees: $ 5');
  });
});
