import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeenewleadComponent } from './employeenewlead.component';

describe('EmployeenewleadComponent', () => {
  let component: EmployeenewleadComponent;
  let fixture: ComponentFixture<EmployeenewleadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeenewleadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeenewleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
