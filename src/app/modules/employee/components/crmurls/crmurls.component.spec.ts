import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmurlsComponent } from './crmurls.component';

describe('CrmurlsComponent', () => {
  let component: CrmurlsComponent;
  let fixture: ComponentFixture<CrmurlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmurlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmurlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
