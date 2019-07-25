import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../../services/Player.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SubBaseComponent } from '../../Player/sub.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditPlayerComponent extends SubBaseComponent implements OnInit {

  player: any;
  playerForm: FormGroup;
  title = 'Edit Player';
  
  constructor( http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: PlayerService, 
  				private fb: FormBuilder) {
    super(http);
    this.createForm();
   }

  createForm() {
    this.playerForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      height: ['', Validators.required],
      isProfessional: ['', Validators.required]
   });
  }
  updatePlayer(name, dateOfBirth, height, isProfessional) {
    this.route.params.subscribe(params => {
    	this.service.updatePlayer(name, dateOfBirth, height, isProfessional, params['id'])
      		.then(success => this.router.navigate(['/indexPlayer']) );
  });
}

// initialization
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.player = this.service.editPlayer(params['id']).subscribe(res => {
        this.player = res;
      });
    });
    
    super.ngOnInit();
  }
}
