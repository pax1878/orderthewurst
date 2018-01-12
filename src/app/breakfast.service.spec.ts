import { TestBed, inject } from '@angular/core/testing';

import { BreakfastService } from './breakfast.service';

describe('BreakfastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreakfastService]
    });
  });

  it('should be created', inject([BreakfastService], (service: BreakfastService) => {
    expect(service).toBeTruthy();
  }));
});
