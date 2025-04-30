import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsCategoriesDetailsComponent } from './tools-categories-details.component';

describe('ToolsCategoriesDetailsComponent', () => {
  let component: ToolsCategoriesDetailsComponent;
  let fixture: ComponentFixture<ToolsCategoriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsCategoriesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsCategoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
