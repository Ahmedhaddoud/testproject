
import { TestBed } from '@angular/core/testing';

import { DescriptorService } from './descriptor.service';

describe('DownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DescriptorService = TestBed.get(DescriptorService);
    expect(service).toBeTruthy();
  });
});