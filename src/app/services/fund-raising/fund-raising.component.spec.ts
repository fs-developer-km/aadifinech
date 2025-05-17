import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRaisingComponent } from './fund-raising.component';

describe('FundRaisingComponent', () => {
  let component: FundRaisingComponent;
  let fixture: ComponentFixture<FundRaisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundRaisingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundRaisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
