import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageToBase64ConverterComponent } from './image-to-base64-converter.component';

describe('ImageToBase64ConverterComponent', () => {
  let component: ImageToBase64ConverterComponent;
  let fixture: ComponentFixture<ImageToBase64ConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageToBase64ConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageToBase64ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
