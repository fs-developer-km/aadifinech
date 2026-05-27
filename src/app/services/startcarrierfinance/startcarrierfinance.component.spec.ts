import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartcarrierfinanceComponent } from './startcarrierfinance.component';

describe('StartcarrierfinanceComponent', () => {
  let component: StartcarrierfinanceComponent;
  let fixture: ComponentFixture<StartcarrierfinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartcarrierfinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartcarrierfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
