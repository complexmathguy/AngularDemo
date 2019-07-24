import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchupService } from '../../../services/Matchup.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SubBaseComponent } from '../../Matchup/sub.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditMatchupComponent extends SubBaseComponent implements OnInit {

  matchup: any;
  matchupForm: FormGroup;
  title = 'Edit Matchup';
  
  constructor( http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: MatchupService, 
  				private fb: FormBuilder) {
    super(http);
    this.createForm();
   }

  createForm() {
    this.matchupForm = this.fb.group({
      name: ['', Validators.required],
      Games: ['', ]
   });
  }
  updateMatchup(name, Games) {
    this.route.params.subscribe(params => {
    	this.service.updateMatchup(name, Games, params['id'])
      		.then(success => this.router.navigate(['/indexMatchup']) );
  });
}

// initialization
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.matchup = this.service.editMatchup(params['id']).subscribe(res => {
        this.matchup = res;
      });
    });
    
    super.ngOnInit();
  }
}
