import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Player} from '../models/Player';
import { BaseService } from './base.service';

@Injectable()
export class PlayerService extends BaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	player : any;
	
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
	// add a Player 
	// returns the results untouched as a JSON representation 
	// delegates via URI to an ORM handler
	//********************************************************************
  	addPlayer(name, dateOfBirth, height, isProfessional) : Promise<any> {
    	const uri = this.ormUrl + '/Player/add';
    	const obj = {
      		name: name,
      		dateOfBirth: dateOfBirth,
      		height: height,
			isProfessional: isProfessional
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// gets all Player 
	// returns the results untouched as JSON representation of an
	// array of Player models
	// delegates via URI to an ORM handler
	//********************************************************************
	getPlayers() {
    	const uri = this.ormUrl + '/Player';
    	
    	return this
            	.http.get(uri).map(res => {
              						return res;
            					});
  	}

	//********************************************************************
	// edit a Player 
	// returns the results untouched as a JSON representation of a
	// Player model
	// delegates via URI to an ORM handler
	//********************************************************************
  	editPlayer(id) {
    	const uri = this.ormUrl + '/Player/edit/' + id;
    	
    	return this.http.get(uri).map(res => {
              							return res;
            						});
  	}

	//********************************************************************
	// update a Player 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	updatePlayer(name, dateOfBirth, height, isProfessional, id)  : Promise<any>  {
    	const uri = this.ormUrl + '/Player/update/' + id;
    	const obj = {
      		name: name,
      		dateOfBirth: dateOfBirth,
      		height: height,
			isProfessional: isProfessional
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// delete a Player 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	deletePlayer(id)  : Promise<any> {
    	const uri = this.ormUrl + '/Player/delete/' + id;

        return this.http.get(uri).toPromise();
  }
  
    	

	//********************************************************************
	// saveHelper - internal helper to save a Player
	//********************************************************************
	saveHelper() : Promise<any> {
		
		const uri = this.ormUrl + '/Player/update/' + this.player._id;		
		
    	return this
      			.http
      			.post(uri, this.player)
				.toPromise();			
	}

	//********************************************************************
	// loadHelper - internal helper to load a Player
	//********************************************************************	
	loadHelper( id ) {
		this.editPlayer(id)
        		.subscribe(res => {
        			this.player = res;
      			});
	}
}