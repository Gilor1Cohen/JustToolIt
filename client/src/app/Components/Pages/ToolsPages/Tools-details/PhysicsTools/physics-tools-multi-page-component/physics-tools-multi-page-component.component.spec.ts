import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicsToolsMultiPageComponentComponent } from './physics-tools-multi-page-component.component';

describe('PhysicsToolsMultiPageComponentComponent', () => {
  let component: PhysicsToolsMultiPageComponentComponent;
  let fixture: ComponentFixture<PhysicsToolsMultiPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicsToolsMultiPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicsToolsMultiPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
