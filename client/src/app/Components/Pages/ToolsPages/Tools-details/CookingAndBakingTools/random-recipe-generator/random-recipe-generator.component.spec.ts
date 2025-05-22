import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomRecipeGeneratorComponent } from './random-recipe-generator.component';

describe('RandomRecipeGeneratorComponent', () => {
  let component: RandomRecipeGeneratorComponent;
  let fixture: ComponentFixture<RandomRecipeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomRecipeGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomRecipeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
