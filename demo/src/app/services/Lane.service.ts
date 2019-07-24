import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Lane} from '../models/Lane';
import { BaseService } from './base.service';

@Injectable()
export class LaneService extends BaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	lane : any;
	
	//********************************************************************
	// Catch all for the return value of a service call
	//********************************************************************
	result: any;

	//********************************************************************
	// sole constructor, injected with the HttpClient
	//********************************************************************
 	constructor(private http: HttpClient) {
 	    super();
    }
 	
	//********************************************************************
	// add a Lane 
	// returns the results untouched as a JSON representation 
	// delegates via URI to an ORM handler
	//********************************************************************
  	addLane(number) : Promise<any> {
    	const uri = this.ormUrl + '/Lane/add';
    	const obj = {
			number: number
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// gets all Lane 
	// returns the results untouched as JSON representation of an
	// array of Lane models
	// delegates via URI to an ORM handler
	//********************************************************************
	getLanes() {
    	const uri = this.ormUrl + '/Lane';
    	
    	return this
            	.http.get(uri).map(res => {
              						return res;
            					});
  	}

	//********************************************************************
	// edit a Lane 
	// returns the results untouched as a JSON representation of a
	// Lane model
	// delegates via URI to an ORM handler
	//********************************************************************
  	editLane(id) {
    	const uri = this.ormUrl + '/Lane/edit/' + id;
    	
    	return this.http.get(uri).map(res => {
              							return res;
            						});
  	}

	//********************************************************************
	// update a Lane 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	updateLane(number, id)  : Promise<any>  {
    	const uri = this.ormUrl + '/Lane/update/' + id;
    	const obj = {
			number: number
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// delete a Lane 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	deleteLane(id)  : Promise<any> {
    	const uri = this.ormUrl + '/Lane/delete/' + id;

        return this.http.get(uri).toPromise();
  }
  
    	

	//********************************************************************
	// saveHelper - internal helper to save a Lane
	//********************************************************************
	saveHelper() : Promise<any> {
		
		const uri = this.ormUrl + '/Lane/update/' + this.lane._id;		
		
    	return this
      			.http
      			.post(uri, this.lane)
				.toPromise();			
	}

	//********************************************************************
	// loadHelper - internal helper to load a Lane
	//********************************************************************	
	loadHelper( id ) {
		this.editLane(id)
        		.subscribe(res => {
        			this.lane = res;
      			});
	}
}