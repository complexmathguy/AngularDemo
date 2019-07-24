import { TestBed } from '@angular/core/testing';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { TournamentService } from './Tournament.service';

describe('TournamentService', () => {
  	beforeEach(() => {
	  TestBed.configureTestingModule({ imports: [HttpClient, FormGroup, FormBuilder, Validators], providers: [TournamentService] });
	});

  it('should be created', () => {
    const service: TournamentService = TestBed.get(TournamentService);
    expect(service).toBeTruthy();
  });
});
