import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/Game.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BaseComponent } from '../../base.component';
import { SubBaseComponent } from '../../Game/sub.base.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateGameComponent extends SubBaseComponent implements OnInit {

  title = 'Add Game';
  gameForm: FormGroup;
  
  constructor(  http: HttpClient,
  				private gameservice: GameService, 
  				private fb: FormBuilder, 
  				private router: Router) {
	super(http);
    this.createForm();
   }
  createForm() {
    this.gameForm = this.fb.group({
      frames: ['', Validators.required],
      Matchup: ['', ],
      Player: ['', ]
   });
  }
  addGame(frames, Matchup, Player) {
      this.gameservice.addGame(frames, Matchup, Player)
      	.then(success => this.router.navigate(['/indexGame']) );
  }
  
// initialization  
  ngOnInit() {
  	super.ngOnInit();
  }
}
