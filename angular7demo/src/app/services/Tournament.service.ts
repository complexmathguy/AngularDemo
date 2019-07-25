import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Tournament} from '../models/Tournament';
import {MatchupService} from '../services/Matchup.service';
import { BaseService } from './base.service';

@Injectable()
export class TournamentService extends BaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	tournament : any;
	
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
	// add a Tournament 
	// returns the results untouched as a JSON representation 
	// delegates via URI to an ORM handler
	//********************************************************************
  	addTournament(name, Matchups, Type) : Promise<any> {
    	const uri = this.ormUrl + '/Tournament/add';
    	const obj = {
      		name: name,
      		Matchups: Matchups != null && Matchups.length > 0 ? Matchups : null,
			Type: Type
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// gets all Tournament 
	// returns the results untouched as JSON representation of an
	// array of Tournament models
	// delegates via URI to an ORM handler
	//********************************************************************
	getTournaments() {
    	const uri = this.ormUrl + '/Tournament';
    	
    	return this
            	.http.get(uri).map(res => {
              						return res;
            					});
  	}

	//********************************************************************
	// edit a Tournament 
	// returns the results untouched as a JSON representation of a
	// Tournament model
	// delegates via URI to an ORM handler
	//********************************************************************
  	editTournament(id) {
    	const uri = this.ormUrl + '/Tournament/edit/' + id;
    	
    	return this.http.get(uri).map(res => {
              							return res;
            						});
  	}

	//********************************************************************
	// update a Tournament 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	updateTournament(name, Matchups, Type, id)  : Promise<any>  {
    	const uri = this.ormUrl + '/Tournament/update/' + id;
    	const obj = {
      		name: name,
      		Matchups: Matchups != null && Matchups.length > 0 ? Matchups : null,
			Type: Type
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// delete a Tournament 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	deleteTournament(id)  : Promise<any> {
    	const uri = this.ormUrl + '/Tournament/delete/' + id;

        return this.http.get(uri).toPromise();
  }
  
    	
	//********************************************************************
	// adds one or more matchupsIds as a Matchups 
	// to a Tournament
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	addMatchups( tournamentId, matchupsIds ): Promise<any> {

		// get the Tournament
		this.loadHelper( tournamentId );
				
		// split on a comma with no spaces
		var idList = matchupsIds.split(',')

		// iterate over array of matchups ids
		idList.forEach(function (id) {
			// read the Matchup		
			var matchup = new MatchupService(this.http).editMatchup(id);	
			// add the Matchup if not already assigned
			if ( this.tournament.matchups.indexOf(matchup) == -1 )
				this.tournament.matchups.push(matchup);
		});
				
		// save it		
		return this.saveHelper();
	}			
	
	//********************************************************************
	// removes one or more matchupsIds as a Matchups 
	// from a Tournament
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************						
	removeMatchups( tournamentId, matchupsIds ): Promise<any> {
		
		// get the Tournament
		this.loadHelper( tournamentId );

				
		// split on a comma with no spaces
		var idList 					= matchupsIds.split(',');
		var matchups 	= this.tournament.matchups;
		
		if ( matchups != null && matchupsIds != null ) {
		
			// iterate over array of matchups ids
			matchups.forEach(function (obj) {				
				if ( matchupsIds.indexOf(obj._id) > -1 ) {
					 // remove the Matchup
					this.tournament.matchups.pop(obj);
				}
			});
					
		    // save it		
			return this.saveHelper();
		}
	}
			

	//********************************************************************
	// saveHelper - internal helper to save a Tournament
	//********************************************************************
	saveHelper() : Promise<any> {
		
		const uri = this.ormUrl + '/Tournament/update/' + this.tournament._id;		
		
    	return this
      			.http
      			.post(uri, this.tournament)
				.toPromise();			
	}

	//********************************************************************
	// loadHelper - internal helper to load a Tournament
	//********************************************************************	
	loadHelper( id ) {
		this.editTournament(id)
        		.subscribe(res => {
        			this.tournament = res;
      			});
	}
}