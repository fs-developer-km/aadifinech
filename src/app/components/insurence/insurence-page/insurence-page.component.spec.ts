import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurencePageComponent } from './insurence-page.component';

describe('InsurencePageComponent', () => {
  let component: InsurencePageComponent;
  let fixture: ComponentFixture<InsurencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurencePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsurencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
