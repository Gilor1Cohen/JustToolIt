import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPrayerTimesComponent } from './daily-prayer-times.component';

describe('DailyPrayerTimesComponent', () => {
  let component: DailyPrayerTimesComponent;
  let fixture: ComponentFixture<DailyPrayerTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyPrayerTimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPrayerTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
