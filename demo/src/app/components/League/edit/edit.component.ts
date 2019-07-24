import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeagueService } from '../../../services/League.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SubBaseComponent } from '../../League/sub.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditLeagueComponent extends SubBaseComponent implements OnInit {

  league: any;
  leagueForm: FormGroup;
  title = 'Edit League';
  
  constructor( http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: LeagueService, 
  				private fb: FormBuilder) {
    super(http);
    this.createForm();
   }

  createForm() {
    this.leagueForm = this.fb.group({
      name: ['', Validators.required],
      Players: ['', ]
   });
  }
  updateLeague(name, Players) {
    this.route.params.subscribe(params => {
    	this.service.updateLeague(name, Players, params['id'])
      		.then(success => this.router.navigate(['/indexLeague']) );
  });
}

// initialization
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.league = this.service.editLeague(params['id']).subscribe(res => {
        this.league = res;
      });
    });
    
    super.ngOnInit();
  }
}
