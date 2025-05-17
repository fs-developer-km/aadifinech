import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentBankingComponent } from './investment-banking.component';

describe('InvestmentBankingComponent', () => {
  let component: InvestmentBankingComponent;
  let fixture: ComponentFixture<InvestmentBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentBankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
