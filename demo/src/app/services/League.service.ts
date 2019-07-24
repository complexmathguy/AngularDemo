import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {League} from '../models/League';
import {PlayerService} from '../services/Player.service';
import { BaseService } from './base.service';

@Injectable()
export class LeagueService extends BaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	league : any;
	
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
	// add a League 
	// returns the results untouched as a JSON representation 
	// delegates via URI to an ORM handler
	//********************************************************************
  	addLeague(name, Players) : Promise<any> {
    	const uri = this.ormUrl + '/League/add';
    	const obj = {
      		name: name,
			Players: Players != null && Players.length > 0 ? Players : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// gets all League 
	// returns the results untouched as JSON representation of an
	// array of League models
	// delegates via URI to an ORM handler
	//********************************************************************
	getLeagues() {
    	const uri = this.ormUrl + '/League';
    	
    	return this
            	.http.get(uri).map(res => {
              						return res;
            					});
  	}

	//********************************************************************
	// edit a League 
	// returns the results untouched as a JSON representation of a
	// League model
	// delegates via URI to an ORM handler
	//********************************************************************
  	editLeague(id) {
    	const uri = this.ormUrl + '/League/edit/' + id;
    	
    	return this.http.get(uri).map(res => {
              							return res;
            						});
  	}

	//********************************************************************
	// update a League 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	updateLeague(name, Players, id)  : Promise<any>  {
    	const uri = this.ormUrl + '/League/update/' + id;
    	const obj = {
      		name: name,
			Players: Players != null && Players.length > 0 ? Players : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// delete a League 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	deleteLeague(id)  : Promise<any> {
    	const uri = this.ormUrl + '/League/delete/' + id;

        return this.http.get(uri).toPromise();
  }
  
    	
	//********************************************************************
	// adds one or more playersIds as a Players 
	// to a League
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	addPlayers( leagueId, playersIds ): Promise<any> {

		// get the League
		this.loadHelper( leagueId );
				
		// split on a comma with no spaces
		var idList = playersIds.split(',')

		// iterate over array of players ids
		idList.forEach(function (id) {
			// read the Player		
			var player = new PlayerService(this.http).editPlayer(id);	
			// add the Player if not already assigned
			if ( this.league.players.indexOf(player) == -1 )
				this.league.players.push(player);
		});
				
		// save it		
		return this.saveHelper();
	}			
	
	//********************************************************************
	// removes one or more playersIds as a Players 
	// from a League
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************						
	removePlayers( leagueId, playersIds ): Promise<any> {
		
		// get the League
		this.loadHelper( leagueId );

				
		// split on a comma with no spaces
		var idList 					= playersIds.split(',');
		var players 	= this.league.players;
		
		if ( players != null && playersIds != null ) {
		
			// iterate over array of players ids
			players.forEach(function (obj) {				
				if ( playersIds.indexOf(obj._id) > -1 ) {
					 // remove the Player
					this.league.players.pop(obj);
				}
			});
					
		    // save it		
			return this.saveHelper();
		}
	}
			

	//********************************************************************
	// saveHelper - internal helper to save a League
	//********************************************************************
	saveHelper() : Promise<any> {
		
		const uri = this.ormUrl + '/League/update/' + this.league._id;		
		
    	return this
      			.http
      			.post(uri, this.league)
				.toPromise();			
	}

	//********************************************************************
	// loadHelper - internal helper to load a League
	//********************************************************************	
	loadHelper( id ) {
		this.editLeague(id)
        		.subscribe(res => {
        			this.league = res;
      			});
	}
}