import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttdendanceComponent } from './attdendance.component';

describe('AttdendanceComponent', () => {
  let component: AttdendanceComponent;
  let fixture: ComponentFixture<AttdendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttdendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttdendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
