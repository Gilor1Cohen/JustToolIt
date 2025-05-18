import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexTesterWithExplanationsComponent } from './regex-tester-with-explanations.component';

describe('RegexTesterWithExplanationsComponent', () => {
  let component: RegexTesterWithExplanationsComponent;
  let fixture: ComponentFixture<RegexTesterWithExplanationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegexTesterWithExplanationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegexTesterWithExplanationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
