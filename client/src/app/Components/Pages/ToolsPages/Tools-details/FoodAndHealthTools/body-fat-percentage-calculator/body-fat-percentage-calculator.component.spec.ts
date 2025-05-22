import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFatPercentageCalculatorComponent } from './body-fat-percentage-calculator.component';

describe('BodyFatPercentageCalculatorComponent', () => {
  let component: BodyFatPercentageCalculatorComponent;
  let fixture: ComponentFixture<BodyFatPercentageCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyFatPercentageCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyFatPercentageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
