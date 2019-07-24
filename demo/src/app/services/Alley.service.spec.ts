import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AlleyService } from './Alley.service';

describe('AlleyService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [AlleyService] });
	});

  it('should be created', () => {
    const service: AlleyService = TestBed.get(AlleyService);
    expect(service).toBeTruthy();
  });
});
