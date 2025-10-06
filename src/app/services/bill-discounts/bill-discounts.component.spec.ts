import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDiscountsComponent } from './bill-discounts.component';

describe('BillDiscountsComponent', () => {
  let component: BillDiscountsComponent;
  let fixture: ComponentFixture<BillDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillDiscountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
