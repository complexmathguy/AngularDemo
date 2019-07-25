import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/Player.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { SubBaseComponent } from '../../Player/sub.base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreatePlayerComponent extends SubBaseComponent implements OnInit {

  title = 'Add Player';
  playerForm: FormGroup;
  
  constructor(  http: HttpClient,
  				private playerservice: PlayerService, 
  				private fb: FormBuilder, 
  				private router: Router) {
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
  addPlayer(name, dateOfBirth, height, isProfessional) {
      this.playerservice.addPlayer(name, dateOfBirth, height, isProfessional)
      	.then(success => this.router.navigate(['/indexPlayer']) );
  }
  
// initialization  
  ngOnInit() {
  	super.ngOnInit();
  }
}
