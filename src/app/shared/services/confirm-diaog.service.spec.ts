import { TestBed } from '@angular/core/testing';

import { ConfirmDiaogService } from './confirm-diaog.service';

describe('ConfirmDiaogService', () => {
  let service: ConfirmDiaogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmDiaogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
