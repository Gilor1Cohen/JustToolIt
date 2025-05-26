import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsToolsMultiPageComponentComponent } from './kids-tools-multi-page-component.component';

describe('KidsToolsMultiPageComponentComponent', () => {
  let component: KidsToolsMultiPageComponentComponent;
  let fixture: ComponentFixture<KidsToolsMultiPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidsToolsMultiPageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsToolsMultiPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
