import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeadComponent } from './user-lead.component';

describe('UserLeadComponent', () => {
  let component: UserLeadComponent;
  let fixture: ComponentFixture<UserLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
