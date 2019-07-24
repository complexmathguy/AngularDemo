import { AlleyService } from '../../../services/Alley.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Alley } from '../../../models/Alley';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexAlleyComponent implements OnInit {

  alleys: any;

  constructor(private http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: AlleyService) {}

  ngOnInit() {
    this.getAlleys();
  }

  getAlleys() {
    this.service.getAlleys().subscribe(res => {
      this.alleys = res;
    });
  }

  deleteAlley(id) {
    this.service.deleteAlley(id)
		.then(success => 
			{
				this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
							this.router.navigate(['indexAlley']));
			});  }
}
