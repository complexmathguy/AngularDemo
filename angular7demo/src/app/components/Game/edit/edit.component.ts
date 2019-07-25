import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../services/Game.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SubBaseComponent } from '../../Game/sub.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditGameComponent extends SubBaseComponent implements OnInit {

  game: any;
  gameForm: FormGroup;
  title = 'Edit Game';
  
  constructor( http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: GameService, 
  				private fb: FormBuilder) {
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
  updateGame(frames, Matchup, Player) {
    this.route.params.subscribe(params => {
    	this.service.updateGame(frames, Matchup, Player, params['id'])
      		.then(success => this.router.navigate(['/indexGame']) );
  });
}

// initialization
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.game = this.service.editGame(params['id']).subscribe(res => {
        this.game = res;
      });
    });
    
    super.ngOnInit();
  }
}
