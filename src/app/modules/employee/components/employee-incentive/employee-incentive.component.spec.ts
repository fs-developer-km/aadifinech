import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeIncentiveComponent } from './employee-incentive.component';

describe('EmployeeIncentiveComponent', () => {
  let component: EmployeeIncentiveComponent;
  let fixture: ComponentFixture<EmployeeIncentiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeIncentiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
