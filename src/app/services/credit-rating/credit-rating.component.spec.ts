import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRatingComponent } from './credit-rating.component';

describe('CreditRatingComponent', () => {
  let component: CreditRatingComponent;
  let fixture: ComponentFixture<CreditRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
