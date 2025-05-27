import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNumberCheckerComponent } from './prime-number-checker.component';

describe('PrimeNumberCheckerComponent', () => {
  let component: PrimeNumberCheckerComponent;
  let fixture: ComponentFixture<PrimeNumberCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeNumberCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeNumberCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
