import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LeagueService } from './League.service';

describe('LeagueService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [LeagueService] });
	});

  it('should be created', () => {
    const service: LeagueService = TestBed.get(LeagueService);
    expect(service).toBeTruthy();
  });
});
