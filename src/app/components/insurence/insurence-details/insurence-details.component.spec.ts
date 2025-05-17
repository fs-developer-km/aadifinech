import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurenceDetailsComponent } from './insurence-details.component';

describe('InsurenceDetailsComponent', () => {
  let component: InsurenceDetailsComponent;
  let fixture: ComponentFixture<InsurenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurenceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
