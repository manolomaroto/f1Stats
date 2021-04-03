import { TestBed } from '@angular/core/testing';

import { F1StatsService } from './f1-stats.service';

describe('F1StatsService', () => {
  let service: F1StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
