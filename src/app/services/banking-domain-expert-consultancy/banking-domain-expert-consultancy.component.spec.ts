import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingDomainExpertConsultancyComponent } from './banking-domain-expert-consultancy.component';

describe('BankingDomainExpertConsultancyComponent', () => {
  let component: BankingDomainExpertConsultancyComponent;
  let fixture: ComponentFixture<BankingDomainExpertConsultancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingDomainExpertConsultancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingDomainExpertConsultancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
