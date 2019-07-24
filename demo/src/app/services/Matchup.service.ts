import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Matchup} from '../models/Matchup';
import {GameService} from '../services/Game.service';
import { BaseService } from './base.service';

@Injectable()
export class MatchupService extends BaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	matchup : any;
	
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
	// add a Matchup 
	// returns the results untouched as a JSON representation 
	// delegates via URI to an ORM handler
	//********************************************************************
  	addMatchup(name, Games) : Promise<any> {
    	const uri = this.ormUrl + '/Matchup/add';
    	const obj = {
      		name: name,
			Games: Games != null && Games.length > 0 ? Games : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// gets all Matchup 
	// returns the results untouched as JSON representation of an
	// array of Matchup models
	// delegates via URI to an ORM handler
	//********************************************************************
	getMatchups() {
    	const uri = this.ormUrl + '/Matchup';
    	
    	return this
            	.http.get(uri).map(res => {
              						return res;
            					});
  	}

	//********************************************************************
	// edit a Matchup 
	// returns the results untouched as a JSON representation of a
	// Matchup model
	// delegates via URI to an ORM handler
	//********************************************************************
  	editMatchup(id) {
    	const uri = this.ormUrl + '/Matchup/edit/' + id;
    	
    	return this.http.get(uri).map(res => {
              							return res;
            						});
  	}

	//********************************************************************
	// update a Matchup 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	updateMatchup(name, Games, id)  : Promise<any>  {
    	const uri = this.ormUrl + '/Matchup/update/' + id;
    	const obj = {
      		name: name,
			Games: Games != null && Games.length > 0 ? Games : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// delete a Matchup 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	deleteMatchup(id)  : Promise<any> {
    	const uri = this.ormUrl + '/Matchup/delete/' + id;

        return this.http.get(uri).toPromise();
  }
  
    	
	//********************************************************************
	// adds one or more gamesIds as a Games 
	// to a Matchup
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	addGames( matchupId, gamesIds ): Promise<any> {

		// get the Matchup
		this.loadHelper( matchupId );
				
		// split on a comma with no spaces
		var idList = gamesIds.split(',')

		// iterate over array of games ids
		idList.forEach(function (id) {
			// read the Game		
			var game = new GameService(this.http).editGame(id);	
			// add the Game if not already assigned
			if ( this.matchup.games.indexOf(game) == -1 )
				this.matchup.games.push(game);
		});
				
		// save it		
		return this.saveHelper();
	}			
	
	//********************************************************************
	// removes one or more gamesIds as a Games 
	// from a Matchup
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************						
	removeGames( matchupId, gamesIds ): Promise<any> {
		
		// get the Matchup
		this.loadHelper( matchupId );

				
		// split on a comma with no spaces
		var idList 					= gamesIds.split(',');
		var games 	= this.matchup.games;
		
		if ( games != null && gamesIds != null ) {
		
			// iterate over array of games ids
			games.forEach(function (obj) {				
				if ( gamesIds.indexOf(obj._id) > -1 ) {
					 // remove the Game
					this.matchup.games.pop(obj);
				}
			});
					
		    // save it		
			return this.saveHelper();
		}
	}
			

	//********************************************************************
	// saveHelper - internal helper to save a Matchup
	//********************************************************************
	saveHelper() : Promise<any> {
		
		const uri = this.ormUrl + '/Matchup/update/' + this.matchup._id;		
		
    	return this
      			.http
      			.post(uri, this.matchup)
				.toPromise();			
	}

	//********************************************************************
	// loadHelper - internal helper to load a Matchup
	//********************************************************************	
	loadHelper( id ) {
		this.editMatchup(id)
        		.subscribe(res => {
        			this.matchup = res;
      			});
	}
}