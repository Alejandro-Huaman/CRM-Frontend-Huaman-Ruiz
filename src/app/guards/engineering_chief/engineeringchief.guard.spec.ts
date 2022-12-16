/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EngineeringchiefGuard } from './engineeringchief.guard';

describe('Service: Engineeringchief', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngineeringchiefGuard]
    });
  });

  it('should ...', inject([EngineeringchiefGuard], (service: EngineeringchiefGuard) => {
    expect(service).toBeTruthy();
  }));
});
