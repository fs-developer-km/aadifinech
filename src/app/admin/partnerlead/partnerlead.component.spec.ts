import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerleadComponent } from './partnerlead.component';

describe('PartnerleadComponent', () => {
  let component: PartnerleadComponent;
  let fixture: ComponentFixture<PartnerleadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerleadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
