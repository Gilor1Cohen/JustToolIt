import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWaterIntakeCalculatorComponent } from './daily-water-intake-calculator.component';

describe('DailyWaterIntakeCalculatorComponent', () => {
  let component: DailyWaterIntakeCalculatorComponent;
  let fixture: ComponentFixture<DailyWaterIntakeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyWaterIntakeCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyWaterIntakeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
