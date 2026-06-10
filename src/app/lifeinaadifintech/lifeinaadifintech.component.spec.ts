import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeinaadifintechComponent } from './lifeinaadifintech.component';

describe('LifeinaadifintechComponent', () => {
  let component: LifeinaadifintechComponent;
  let fixture: ComponentFixture<LifeinaadifintechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeinaadifintechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeinaadifintechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
