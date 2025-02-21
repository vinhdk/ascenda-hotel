import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HotelDetailComponent } from './hotel-detail.component';

describe('HotelDetailComponent', () => {
  let component: HotelDetailComponent;
  let fixture: ComponentFixture<HotelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('instance', {});
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show taxes and fees when taxes_and_fees is not null', async () => {
    fixture.componentRef.setInput('instance', {
      taxes_and_fees: {},
    });
    fixture.detectChanges();
    await fixture.whenStable();
    expect(
      fixture.debugElement.query(By.css('ascenda-taxes-and-fees'))
    ).toBeTruthy();
  });

  it('should show competitors when competitors is not null', async () => {
    fixture.componentRef.setInput('instance', {
      competitors: {},
    });
    fixture.detectChanges();
    await fixture.whenStable();
    expect(
      fixture.debugElement.query(By.css('ascenda-hotel-detail-competitors'))
    ).toBeTruthy();
  });

  it('should emit closeEvent when close button is clicked', async () => {
    const closeEvent = jest.spyOn(component.closeEvent, 'emit');
    const closeButton = fixture.debugElement.query(By.css('header > button'));
    expect(closeButton).toBeTruthy();
    closeButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(closeEvent).toHaveBeenCalled();
  });
});
