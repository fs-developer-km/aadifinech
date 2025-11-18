import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignLeadComponent } from './employee-assign-lead.component';

describe('EmployeeAssignLeadComponent', () => {
  let component: EmployeeAssignLeadComponent;
  let fixture: ComponentFixture<EmployeeAssignLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAssignLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAssignLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
