import { TestBed } from '@angular/core/testing';

import { ArmazenagemService } from './armazenagem.service';

describe('ArmazenagemService', () => {
  let service: ArmazenagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmazenagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
