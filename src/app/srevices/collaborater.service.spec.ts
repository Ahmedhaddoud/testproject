import { TestBed } from '@angular/core/testing';

import { CollaboraterService } from './collaborater.service';

describe('CollaboraterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaboraterService = TestBed.get(CollaboraterService);
    expect(service).toBeTruthy();
  });
});
