import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistryToolsMultiPageComponentComponent } from './chemistry-tools-multi-page-component.component';

describe('ChemistryToolsMultiPageComponentComponent', () => {
  let component: ChemistryToolsMultiPageComponentComponent;
  let fixture: ComponentFixture<ChemistryToolsMultiPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChemistryToolsMultiPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemistryToolsMultiPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
