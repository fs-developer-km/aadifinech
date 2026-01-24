import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialConsultancyforCorporatesComponent } from './financial-consultancyfor-corporates.component';

describe('FinancialConsultancyforCorporatesComponent', () => {
  let component: FinancialConsultancyforCorporatesComponent;
  let fixture: ComponentFixture<FinancialConsultancyforCorporatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialConsultancyforCorporatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialConsultancyforCorporatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
