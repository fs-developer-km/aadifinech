import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillDiscountingComponent } from './export-bill-discounting.component';

describe('ExportBillDiscountingComponent', () => {
  let component: ExportBillDiscountingComponent;
  let fixture: ComponentFixture<ExportBillDiscountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportBillDiscountingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportBillDiscountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
