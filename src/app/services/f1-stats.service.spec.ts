import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { F1StatsService } from './f1-stats.service';

describe('F1StatsService', () => {
  let service: F1StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [F1StatsService] 
    });
    service = TestBed.inject(F1StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current drivers stats', fakeAsync(() => {
    const service: F1StatsService = TestBed.inject(F1StatsService);
    service.getCurrentDrivers().subscribe(
      (res) => expect(res.json()).not.toBeNull(),
      (err) => fail(err)
    )
  }))
});
