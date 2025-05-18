import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryCodeGeneratorComponent } from './binary-code-generator.component';

describe('BinaryCodeGeneratorComponent', () => {
  let component: BinaryCodeGeneratorComponent;
  let fixture: ComponentFixture<BinaryCodeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinaryCodeGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinaryCodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
