import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashboardComponentComponent } from './employee-dashboard-component.component';

describe('EmployeeDashboardComponentComponent', () => {
  let component: EmployeeDashboardComponentComponent;
  let fixture: ComponentFixture<EmployeeDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDashboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
