import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCalorieCalculatorComponent } from './daily-calorie-calculator.component';

describe('DailyCalorieCalculatorComponent', () => {
  let component: DailyCalorieCalculatorComponent;
  let fixture: ComponentFixture<DailyCalorieCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyCalorieCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyCalorieCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
