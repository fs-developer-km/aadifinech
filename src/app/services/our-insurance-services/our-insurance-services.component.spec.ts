import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurInsuranceServicesComponent } from './our-insurance-services.component';

describe('OurInsuranceServicesComponent', () => {
  let component: OurInsuranceServicesComponent;
  let fixture: ComponentFixture<OurInsuranceServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurInsuranceServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurInsuranceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
