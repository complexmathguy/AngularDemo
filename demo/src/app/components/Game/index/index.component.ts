import { GameService } from '../../../services/Game.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Game } from '../../../models/Game';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexGameComponent implements OnInit {

  games: any;

  constructor(private http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: GameService) {}

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.service.getGames().subscribe(res => {
      this.games = res;
    });
  }

  deleteGame(id) {
    this.service.deleteGame(id)
		.then(success => 
			{
				this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
							this.router.navigate(['indexGame']));
			});  }
}
