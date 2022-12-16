/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectmanagerGuard } from './projectmanager.guard';

describe('Service: Projectmanager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectmanagerGuard]
    });
  });

  it('should ...', inject([ProjectmanagerGuard], (service: ProjectmanagerGuard) => {
    expect(service).toBeTruthy();
  }));
});
