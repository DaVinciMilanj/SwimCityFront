import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allowAnyGuard } from './allow-any.guard';

describe('allowAnyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allowAnyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
