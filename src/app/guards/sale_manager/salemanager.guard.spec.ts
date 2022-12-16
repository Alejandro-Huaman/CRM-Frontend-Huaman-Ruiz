/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalemanagerGuard } from './salemanager.guard';

describe('Service: Salemanager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalemanagerGuard]
    });
  });

  it('should ...', inject([SalemanagerGuard], (service: SalemanagerGuard) => {
    expect(service).toBeTruthy();
  }));
});
