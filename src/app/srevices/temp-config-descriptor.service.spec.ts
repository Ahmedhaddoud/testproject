import { TestBed } from '@angular/core/testing';

import { TempConfigDescriptorService } from './temp-config-descriptor.service';

describe('TempConfigDescriptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempConfigDescriptorService = TestBed.get(TempConfigDescriptorService);
    expect(service).toBeTruthy();
  });
});
