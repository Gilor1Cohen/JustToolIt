import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQsPageComponent } from './faqs-page.component';

describe('FAQsPageComponent', () => {
  let component: FAQsPageComponent;
  let fixture: ComponentFixture<FAQsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FAQsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FAQsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
