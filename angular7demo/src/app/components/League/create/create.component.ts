import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../services/League.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { SubBaseComponent } from '../../League/sub.base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateLeagueComponent extends SubBaseComponent implements OnInit {

  title = 'Add League';
  leagueForm: FormGroup;
  
  constructor(  http: HttpClient,
  				private leagueservice: LeagueService, 
  				private fb: FormBuilder, 
  				private router: Router) {
	super(http);
    this.createForm();
   }
  createForm() {
    this.leagueForm = this.fb.group({
      name: ['', Validators.required],
      Players: ['', ]
   });
  }
  addLeague(name, Players) {
      this.leagueservice.addLeague(name, Players)
      	.then(success => this.router.navigate(['/indexLeague']) );
  }
  
// initialization  
  ngOnInit() {
  	super.ngOnInit();
  }
}
