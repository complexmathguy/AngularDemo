import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatchupService } from './Matchup.service';

describe('MatchupService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [MatchupService] });
	});

  it('should be created', () => {
    const service: MatchupService = TestBed.get(MatchupService);
    expect(service).toBeTruthy();
  });
});
