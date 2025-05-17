import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechServicesComponent } from './tech-services.component';

describe('TechServicesComponent', () => {
  let component: TechServicesComponent;
  let fixture: ComponentFixture<TechServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
