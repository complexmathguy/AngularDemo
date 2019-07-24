import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../../services/Tournament.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SubBaseComponent } from '../../Tournament/sub.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditTournamentComponent extends SubBaseComponent implements OnInit {

  tournament: any;
  tournamentForm: FormGroup;
  title = 'Edit Tournament';
  
  constructor( http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: TournamentService, 
  				private fb: FormBuilder) {
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
  updateTournament(name, Matchups, Type) {
    this.route.params.subscribe(params => {
    	this.service.updateTournament(name, Matchups, Type, params['id'])
      		.then(success => this.router.navigate(['/indexTournament']) );
  });
}

// initialization
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tournament = this.service.editTournament(params['id']).subscribe(res => {
        this.tournament = res;
      });
    });
    
    super.ngOnInit();
  }
}
