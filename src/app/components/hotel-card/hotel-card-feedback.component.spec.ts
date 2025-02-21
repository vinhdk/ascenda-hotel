import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelCardFeedbackComponent } from './hotel-card-feedback.component';

describe('HotelCardFeedbackComponent', () => {
  let component: HotelCardFeedbackComponent;
  let fixture: ComponentFixture<HotelCardFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelCardFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelCardFeedbackComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('instance', {});
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
