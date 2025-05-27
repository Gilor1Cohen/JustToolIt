import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomToolsMultiPageComponentComponent } from './random-tools-multi-page-component.component';

describe('RandomToolsMultiPageComponentComponent', () => {
  let component: RandomToolsMultiPageComponentComponent;
  let fixture: ComponentFixture<RandomToolsMultiPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomToolsMultiPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomToolsMultiPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
