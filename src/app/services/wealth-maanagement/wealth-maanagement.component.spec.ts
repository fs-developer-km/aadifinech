import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthMaanagementComponent } from './wealth-maanagement.component';

describe('WealthMaanagementComponent', () => {
  let component: WealthMaanagementComponent;
  let fixture: ComponentFixture<WealthMaanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WealthMaanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WealthMaanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
