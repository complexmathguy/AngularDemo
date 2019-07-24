import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../services/Tournament.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { SubBaseComponent } from '../../Tournament/sub.base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateTournamentComponent extends SubBaseComponent implements OnInit {

  title = 'Add Tournament';
  tournamentForm: FormGroup;
  
  constructor(  http: HttpClient,
  				private tournamentservice: TournamentService, 
  				private fb: FormBuilder, 
  				private router: Router) {
	super(http);
    this.createForm();
   }
  createForm() {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      Matchups: ['', ],
      Type: ['', ]
   });
  }
  addTournament(name, Matchups, Type) {
      this.tournamentservice.addTournament(name, Matchups, Type)
      	.then(success => this.router.navigate(['/indexTournament']) );
  }
  
// initialization  
  ngOnInit() {
  	super.ngOnInit();
  }
}
