import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityCalculatorComponent } from './probability-calculator.component';

describe('ProbabilityCalculatorComponent', () => {
  let component: ProbabilityCalculatorComponent;
  let fixture: ComponentFixture<ProbabilityCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProbabilityCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbabilityCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
