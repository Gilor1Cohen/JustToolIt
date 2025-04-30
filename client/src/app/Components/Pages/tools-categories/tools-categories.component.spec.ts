import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsCategoriesComponent } from './tools-categories.component';

describe('ToolsCategoriesComponent', () => {
  let component: ToolsCategoriesComponent;
  let fixture: ComponentFixture<ToolsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
