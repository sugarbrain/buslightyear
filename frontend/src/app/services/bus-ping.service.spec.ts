import { TestBed } from '@angular/core/testing';

import { BusPingService } from './bus-ping.service';

describe('BusPingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusPingService = TestBed.get(BusPingService);
    expect(service).toBeTruthy();
  });
});
