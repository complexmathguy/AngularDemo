import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaneService } from '../../../services/Lane.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SubBaseComponent } from '../../Lane/sub.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditLaneComponent extends SubBaseComponent implements OnInit {

  lane: any;
  laneForm: FormGroup;
  title = 'Edit Lane';
  
  constructor( http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: LaneService, 
  				private fb: FormBuilder) {
    super(http);
    this.createForm();
   }

  createForm() {
    this.laneForm = this.fb.group({
      number: ['', Validators.required]
   });
  }
  updateLane(number) {
    this.route.params.subscribe(params => {
    	this.service.updateLane(number, params['id'])
      		.then(success => this.router.navigate(['/indexLane']) );
  });
}

// initialization
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lane = this.service.editLane(params['id']).subscribe(res => {
        this.lane = res;
      });
    });
    
    super.ngOnInit();
  }
}
