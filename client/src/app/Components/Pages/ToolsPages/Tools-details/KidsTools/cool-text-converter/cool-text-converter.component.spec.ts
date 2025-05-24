import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolTextConverterComponent } from './cool-text-converter.component';

describe('CoolTextConverterComponent', () => {
  let component: CoolTextConverterComponent;
  let fixture: ComponentFixture<CoolTextConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoolTextConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoolTextConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
