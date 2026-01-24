import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurEndToEndforeignServicesComponent } from './our-end-to-endforeign-services.component';

describe('OurEndToEndforeignServicesComponent', () => {
  let component: OurEndToEndforeignServicesComponent;
  let fixture: ComponentFixture<OurEndToEndforeignServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurEndToEndforeignServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurEndToEndforeignServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
