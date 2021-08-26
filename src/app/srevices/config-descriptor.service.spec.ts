import { TestBed } from '@angular/core/testing';

import { ConfigDescriptorService } from './config-descriptor.service';

describe('ConfigDescriptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigDescriptorService = TestBed.get(ConfigDescriptorService);
    expect(service).toBeTruthy();
  });
});
