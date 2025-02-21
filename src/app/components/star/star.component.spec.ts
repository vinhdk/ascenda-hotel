import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StarComponent } from './star.component';

describe('StarComponent', () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update array when value changes', () => {
    fixture.componentRef.setInput('value', 2.5);
    expect(component.array()).toEqual([1, 2, 3]);
  });

  it('should apply the correct class to the host element', () => {
    expect(
      component.elementRef.nativeElement.classList.contains('sao-star-group')
    ).toBe(true);
  });

  it('should set the --sao-star-value CSS variable', () => {
    fixture.componentRef.setInput('value', 3.4);
    fixture.detectChanges();
    expect(
      component.elementRef.nativeElement.style.getPropertyValue(
        '--sao-star-value'
      )
    ).toBe('3.4');
  });

  it('should render the correct number of stars', () => {
    fixture.componentRef.setInput('value', 4.5);
    fixture.detectChanges();
    const stars = fixture.debugElement.queryAll(By.css('.sao-star'));
    expect(stars.length).toBe(5);
  });
});
