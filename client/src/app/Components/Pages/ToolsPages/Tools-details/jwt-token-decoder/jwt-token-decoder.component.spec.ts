import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtTokenDecoderComponent } from './jwt-token-decoder.component';

describe('JwtTokenDecoderComponent', () => {
  let component: JwtTokenDecoderComponent;
  let fixture: ComponentFixture<JwtTokenDecoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JwtTokenDecoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JwtTokenDecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
