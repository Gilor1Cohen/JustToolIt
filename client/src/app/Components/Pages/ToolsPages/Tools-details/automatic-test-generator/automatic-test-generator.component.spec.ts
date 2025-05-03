import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticTestGeneratorComponent } from './automatic-test-generator.component';

describe('AutomaticTestGeneratorComponent', () => {
  let component: AutomaticTestGeneratorComponent;
  let fixture: ComponentFixture<AutomaticTestGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaticTestGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomaticTestGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
