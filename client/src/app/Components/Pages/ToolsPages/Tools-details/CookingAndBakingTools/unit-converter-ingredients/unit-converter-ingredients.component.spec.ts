import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitConverterIngredientsComponent } from './unit-converter-ingredients.component';

describe('UnitConverterIngredientsComponent', () => {
  let component: UnitConverterIngredientsComponent;
  let fixture: ComponentFixture<UnitConverterIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitConverterIngredientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitConverterIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
