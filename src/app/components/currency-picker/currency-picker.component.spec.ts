import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { currencies } from '../../utils';
import { CurrencyPickerComponent } from './currency-picker.component';

describe('CurrencyPickerComponent', () => {
  let component: CurrencyPickerComponent;
  let fixture: ComponentFixture<CurrencyPickerComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyPickerComponent],
      providers: [provideAnimations(), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyPickerComponent);
    component = fixture.componentInstance;
    component.value.set('USD'); // Initial currency value
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the menu when clicking on the button', async () => {
    const button = fixture.debugElement.query(By.css('button.sao-button'));

    button.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const menu = overlayContainerElement.querySelector('.sao-select');
    expect(menu).toBeTruthy();
  });

  it('should update the value when a currency is selected', async () => {
    const button = fixture.debugElement.query(By.css('button.sao-button'));

    button.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const currencyButtons =
      overlayContainerElement.querySelectorAll('.sao-select-item');
    expect(currencyButtons.length).toBe(currencies.length);

    const firstCurrency = currencies[0];
    (currencyButtons[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(component.value()).toBe(firstCurrency);
  });
});
