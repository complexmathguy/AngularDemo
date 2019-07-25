import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlleyService } from '../../../services/Alley.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SubBaseComponent } from '../../Alley/sub.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditAlleyComponent extends SubBaseComponent implements OnInit {

  alley: any;
  alleyForm: FormGroup;
  title = 'Edit Alley';
  
  constructor( http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: AlleyService, 
  				private fb: FormBuilder) {
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
  updateAlley(name, Leagues, Tournaments, Lanes) {
    this.route.params.subscribe(params => {
    	this.service.updateAlley(name, Leagues, Tournaments, Lanes, params['id'])
      		.then(success => this.router.navigate(['/indexAlley']) );
  });
}

// initialization
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.alley = this.service.editAlley(params['id']).subscribe(res => {
        this.alley = res;
      });
    });
    
    super.ngOnInit();
  }
}
