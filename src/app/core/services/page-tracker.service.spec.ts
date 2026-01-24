import { TestBed } from '@angular/core/testing';

import { PageTrackerService } from './page-tracker.service';

describe('PageTrackerService', () => {
  let service: PageTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
