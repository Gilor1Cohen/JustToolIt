import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabbathCandleLightingTimeComponent } from './sabbath-candle-lighting-time.component';

describe('SabbathCandleLightingTimeComponent', () => {
  let component: SabbathCandleLightingTimeComponent;
  let fixture: ComponentFixture<SabbathCandleLightingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SabbathCandleLightingTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SabbathCandleLightingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
