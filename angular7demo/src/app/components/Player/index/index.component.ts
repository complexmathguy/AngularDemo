import { PlayerService } from '../../../services/Player.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../../models/Player';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexPlayerComponent implements OnInit {

  players: any;

  constructor(private http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: PlayerService) {}

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.service.getPlayers().subscribe(res => {
      this.players = res;
    });
  }

  deletePlayer(id) {
    this.service.deletePlayer(id)
		.then(success => 
			{
				this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
							this.router.navigate(['indexPlayer']));
			});  }
}
