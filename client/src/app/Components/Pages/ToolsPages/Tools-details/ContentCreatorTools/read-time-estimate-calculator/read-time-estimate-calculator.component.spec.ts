import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTimeEstimateCalculatorComponent } from './read-time-estimate-calculator.component';

describe('ReadTimeEstimateCalculatorComponent', () => {
  let component: ReadTimeEstimateCalculatorComponent;
  let fixture: ComponentFixture<ReadTimeEstimateCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadTimeEstimateCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadTimeEstimateCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
