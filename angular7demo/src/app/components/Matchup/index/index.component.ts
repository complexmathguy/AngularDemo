import { MatchupService } from '../../../services/Matchup.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Matchup } from '../../../models/Matchup';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexMatchupComponent implements OnInit {

  matchups: any;

  constructor(private http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: MatchupService) {}

  ngOnInit() {
    this.getMatchups();
  }

  getMatchups() {
    this.service.getMatchups().subscribe(res => {
      this.matchups = res;
    });
  }

  deleteMatchup(id) {
    this.service.deleteMatchup(id)
		.then(success => 
			{
				this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
							this.router.navigate(['indexMatchup']));
			});  }
}
