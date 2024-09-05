import { TestBed } from '@angular/core/testing';

import { LivetodoService } from './livetodo.service';

describe('LivetodoService', () => {
  let service: LivetodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivetodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
