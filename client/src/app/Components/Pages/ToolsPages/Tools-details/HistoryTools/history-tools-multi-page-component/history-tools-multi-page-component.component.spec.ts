import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryToolsMultiPageComponentComponent } from './history-tools-multi-page-component.component';

describe('HistoryToolsMultiPageComponentComponent', () => {
  let component: HistoryToolsMultiPageComponentComponent;
  let fixture: ComponentFixture<HistoryToolsMultiPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryToolsMultiPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryToolsMultiPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
