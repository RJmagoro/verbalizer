import { TestBed } from '@angular/core/testing';

import { VerbalizeServiceService } from './verbalize-service.service';

describe('VerbalizeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerbalizeServiceService = TestBed.get(VerbalizeServiceService);
    expect(service).toBeTruthy();
  });
});
