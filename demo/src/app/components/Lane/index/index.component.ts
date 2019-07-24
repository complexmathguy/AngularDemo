import { LaneService } from '../../../services/Lane.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Lane } from '../../../models/Lane';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexLaneComponent implements OnInit {

  lanes: any;

  constructor(private http: HttpClient, 
  				private route: ActivatedRoute, 
  				private router: Router, 
  				private service: LaneService) {}

  ngOnInit() {
    this.getLanes();
  }

  getLanes() {
    this.service.getLanes().subscribe(res => {
      this.lanes = res;
    });
  }

  deleteLane(id) {
    this.service.deleteLane(id)
		.then(success => 
			{
				this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
							this.router.navigate(['indexLane']));
			});  }
}
