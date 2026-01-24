import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSliderComponent } from './service-slider.component';

describe('ServiceSliderComponent', () => {
  let component: ServiceSliderComponent;
  let fixture: ComponentFixture<ServiceSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
