import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64SizeCalculatorComponent } from './base64-size-calculator.component';

describe('Base64SizeCalculatorComponent', () => {
  let component: Base64SizeCalculatorComponent;
  let fixture: ComponentFixture<Base64SizeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Base64SizeCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Base64SizeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
