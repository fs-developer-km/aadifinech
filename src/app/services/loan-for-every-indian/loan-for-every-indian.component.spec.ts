import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanForEveryIndianComponent } from './loan-for-every-indian.component';

describe('LoanForEveryIndianComponent', () => {
  let component: LoanForEveryIndianComponent;
  let fixture: ComponentFixture<LoanForEveryIndianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanForEveryIndianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanForEveryIndianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
