import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlacementComponent } from './training-placement.component';

describe('TrainingPlacementComponent', () => {
  let component: TrainingPlacementComponent;
  let fixture: ComponentFixture<TrainingPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingPlacementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
