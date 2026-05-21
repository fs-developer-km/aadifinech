import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TectServiceDetailsComponent } from './tect-service-details.component';

describe('TectServiceDetailsComponent', () => {
  let component: TectServiceDetailsComponent;
  let fixture: ComponentFixture<TectServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TectServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TectServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
