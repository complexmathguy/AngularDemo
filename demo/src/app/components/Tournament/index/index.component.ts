import { TournamentService } from '../../../services/Tournament.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Tournament } from '../../../models/Tournament';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexTournamentComponent implements OnInit {

  tournaments: any;

  constructor(private http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: TournamentService) {}

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments() {
    this.service.getTournaments().subscribe(res => {
      this.tournaments = res;
    });
  }

  deleteTournament(id) {
    this.service.deleteTournament(id)
		.then(success => 
			{
				this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
							this.router.navigate(['indexTournament']));
			});  }
}
