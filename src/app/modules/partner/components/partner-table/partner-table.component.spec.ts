import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTableComponent } from './partner-table.component';

describe('PartnerTableComponent', () => {
  let component: PartnerTableComponent;
  let fixture: ComponentFixture<PartnerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
