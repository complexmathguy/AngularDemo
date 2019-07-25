import { LeagueService } from '../../../services/League.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { League } from '../../../models/League';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexLeagueComponent implements OnInit {

  leagues: any;

  constructor(private http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: LeagueService) {}

  ngOnInit() {
    this.getLeagues();
  }

  getLeagues() {
    this.service.getLeagues().subscribe(res => {
      this.leagues = res;
    });
  }

  deleteLeague(id) {
    this.service.deleteLeague(id)
		.then(success => 
			{
				this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
							this.router.navigate(['indexLeague']));
			});  }
}
