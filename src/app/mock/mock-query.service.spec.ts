import { TestBed, inject } from '@angular/core/testing';

import { MockQueryService } from './mock-query.service';

describe('MockQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockQueryService]
    });
  });

  it('should be created', inject([MockQueryService], (service: MockQueryService) => {
    expect(service).toBeTruthy();
  }));
});
