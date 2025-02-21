import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { currencies } from '../../utils';
import { CurrencyListComponent } from './currency-list.component';

describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;
    component.value.set('USD');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  currencies.forEach((currency, index) => {
    it(`should have ${currency} as selected after clicking the button`, () => {
      const button = fixture.debugElement.queryAll(
        By.css('button.sao-select-item')
      )[index];
      expect(button).toBeTruthy();
      button.nativeElement.click();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('selected')).toBe(true);
    });
  });

  it('should close the menu when clicking the backdrop', () => {
    (component.cdkMenuTriggerFor as CdkMenuTrigger) = {
      close: jest.fn(),
    } as unknown as CdkMenuTrigger;
    const backdrop = fixture.debugElement.query(
      By.css('.currency-list-backdrop')
    );
    expect(backdrop).toBeTruthy();
    backdrop.nativeElement.click();
    fixture.detectChanges();
    expect(
      (component.cdkMenuTriggerFor as CdkMenuTrigger).close
    ).toHaveBeenCalled();
  });
});
