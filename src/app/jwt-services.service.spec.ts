import { TestBed } from '@angular/core/testing';

import { JwtServicesService } from './jwt-services.service';

describe('JwtServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtServicesService = TestBed.get(JwtServicesService);
    expect(service).toBeTruthy();
  });
});
