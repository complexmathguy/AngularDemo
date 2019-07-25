import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LaneService } from './Lane.service';

describe('LaneService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [LaneService] });
	});

  it('should be created', () => {
    const service: LaneService = TestBed.get(LaneService);
    expect(service).toBeTruthy();
  });
});
