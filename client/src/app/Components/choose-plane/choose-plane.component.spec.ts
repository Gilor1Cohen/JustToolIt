import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePlaneComponent } from './choose-plane.component';

describe('ChoosePlaneComponent', () => {
  let component: ChoosePlaneComponent;
  let fixture: ComponentFixture<ChoosePlaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePlaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
