import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CresitRatingComponent } from './cresit-rating.component';

describe('CresitRatingComponent', () => {
  let component: CresitRatingComponent;
  let fixture: ComponentFixture<CresitRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CresitRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CresitRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
