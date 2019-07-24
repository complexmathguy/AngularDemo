import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlleyService } from '../../../services/Alley.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { SubBaseComponent } from '../../Alley/sub.base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateAlleyComponent extends SubBaseComponent implements OnInit {

  title = 'Add Alley';
  alleyForm: FormGroup;
  
  constructor(  http: HttpClient,
  				private alleyservice: AlleyService, 
  				private fb: FormBuilder, 
  				private router: Router) {
	super(http);
    this.createForm();
   }
  createForm() {
    this.alleyForm = this.fb.group({
      name: ['', Validators.required],
      Leagues: ['', ],
      Tournaments: ['', ],
      Lanes: ['', ]
   });
  }
  addAlley(name, Leagues, Tournaments, Lanes) {
      this.alleyservice.addAlley(name, Leagues, Tournaments, Lanes)
      	.then(success => this.router.navigate(['/indexAlley']) );
  }
  
// initialization  
  ngOnInit() {
  	super.ngOnInit();
  }
}
