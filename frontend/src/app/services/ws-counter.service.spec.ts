import { TestBed } from '@angular/core/testing';

import { WsCounterService } from './ws-counter.service';

describe('WsCounterService', () => {
  let service: WsCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
