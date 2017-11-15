import { TestBed, inject } from '@angular/core/testing';

import { HttpMockQueryService } from './http-mock-query.service';

describe('HttpMockQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpMockQueryService]
    });
  });

  it('should be created', inject([HttpMockQueryService], (service: HttpMockQueryService) => {
    expect(service).toBeTruthy();
  }));
});
