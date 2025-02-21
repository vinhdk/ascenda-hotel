import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelDetailFeedbackComponent } from './hotel-detail-feedback.component';

describe('HotelDetailFeedbackComponent', () => {
  let component: HotelDetailFeedbackComponent;
  let fixture: ComponentFixture<HotelDetailFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelDetailFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelDetailFeedbackComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('instance', {});
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
