import { TestBed } from '@angular/core/testing';

import { TarjetaServiceService } from './tarjeta-service.service';

describe('TarjetaServiceService', () => {
  let service: TarjetaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
