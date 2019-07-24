import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatchupService } from '../../../services/Matchup.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { SubBaseComponent } from '../../Matchup/sub.base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateMatchupComponent extends SubBaseComponent implements OnInit {

  title = 'Add Matchup';
  matchupForm: FormGroup;
  
  constructor(  http: HttpClient,
  				private matchupservice: MatchupService, 
  				private fb: FormBuilder, 
  				private router: Router) {
	super(http);
    this.createForm();
   }
  createForm() {
    this.matchupForm = this.fb.group({
      name: ['', Validators.required],
      Games: ['', ]
   });
  }
  addMatchup(name, Games) {
      this.matchupservice.addMatchup(name, Games)
      	.then(success => this.router.navigate(['/indexMatchup']) );
  }
  
// initialization  
  ngOnInit() {
  	super.ngOnInit();
  }
}
