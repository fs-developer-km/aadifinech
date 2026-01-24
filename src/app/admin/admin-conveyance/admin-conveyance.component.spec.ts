import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConveyanceComponent } from './admin-conveyance.component';

describe('AdminConveyanceComponent', () => {
  let component: AdminConveyanceComponent;
  let fixture: ComponentFixture<AdminConveyanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConveyanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConveyanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
