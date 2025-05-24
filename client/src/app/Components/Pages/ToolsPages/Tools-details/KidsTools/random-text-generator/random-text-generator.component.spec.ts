import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTextGeneratorComponent } from './random-text-generator.component';

describe('RandomTextGeneratorComponent', () => {
  let component: RandomTextGeneratorComponent;
  let fixture: ComponentFixture<RandomTextGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomTextGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomTextGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
