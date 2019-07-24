import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Alley} from '../models/Alley';
import {LeagueService} from '../services/League.service';
import {TournamentService} from '../services/Tournament.service';
import {LaneService} from '../services/Lane.service';
import { BaseService } from './base.service';

@Injectable()
export class AlleyService extends BaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	alley : any;
	
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
	// add a Alley 
	// returns the results untouched as a JSON representation 
	// delegates via URI to an ORM handler
	//********************************************************************
  	addAlley(name, Leagues, Tournaments, Lanes) : Promise<any> {
    	const uri = this.ormUrl + '/Alley/add';
    	const obj = {
      		name: name,
      		Leagues: Leagues != null && Leagues.length > 0 ? Leagues : null,
      		Tournaments: Tournaments != null && Tournaments.length > 0 ? Tournaments : null,
			Lanes: Lanes != null && Lanes.length > 0 ? Lanes : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// gets all Alley 
	// returns the results untouched as JSON representation of an
	// array of Alley models
	// delegates via URI to an ORM handler
	//********************************************************************
	getAlleys() {
    	const uri = this.ormUrl + '/Alley';
    	
    	return this
            	.http.get(uri).map(res => {
              						return res;
            					});
  	}

	//********************************************************************
	// edit a Alley 
	// returns the results untouched as a JSON representation of a
	// Alley model
	// delegates via URI to an ORM handler
	//********************************************************************
  	editAlley(id) {
    	const uri = this.ormUrl + '/Alley/edit/' + id;
    	
    	return this.http.get(uri).map(res => {
              							return res;
            						});
  	}

	//********************************************************************
	// update a Alley 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	updateAlley(name, Leagues, Tournaments, Lanes, id)  : Promise<any>  {
    	const uri = this.ormUrl + '/Alley/update/' + id;
    	const obj = {
      		name: name,
      		Leagues: Leagues != null && Leagues.length > 0 ? Leagues : null,
      		Tournaments: Tournaments != null && Tournaments.length > 0 ? Tournaments : null,
			Lanes: Lanes != null && Lanes.length > 0 ? Lanes : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// delete a Alley 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	deleteAlley(id)  : Promise<any> {
    	const uri = this.ormUrl + '/Alley/delete/' + id;

        return this.http.get(uri).toPromise();
  }
  
    	
	//********************************************************************
	// adds one or more leaguesIds as a Leagues 
	// to a Alley
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	addLeagues( alleyId, leaguesIds ): Promise<any> {

		// get the Alley
		this.loadHelper( alleyId );
				
		// split on a comma with no spaces
		var idList = leaguesIds.split(',')

		// iterate over array of leagues ids
		idList.forEach(function (id) {
			// read the League		
			var league = new LeagueService(this.http).editLeague(id);	
			// add the League if not already assigned
			if ( this.alley.leagues.indexOf(league) == -1 )
				this.alley.leagues.push(league);
		});
				
		// save it		
		return this.saveHelper();
	}			
	
	//********************************************************************
	// removes one or more leaguesIds as a Leagues 
	// from a Alley
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************						
	removeLeagues( alleyId, leaguesIds ): Promise<any> {
		
		// get the Alley
		this.loadHelper( alleyId );

				
		// split on a comma with no spaces
		var idList 					= leaguesIds.split(',');
		var leagues 	= this.alley.leagues;
		
		if ( leagues != null && leaguesIds != null ) {
		
			// iterate over array of leagues ids
			leagues.forEach(function (obj) {				
				if ( leaguesIds.indexOf(obj._id) > -1 ) {
					 // remove the League
					this.alley.leagues.pop(obj);
				}
			});
					
		    // save it		
			return this.saveHelper();
		}
	}
			
	//********************************************************************
	// adds one or more tournamentsIds as a Tournaments 
	// to a Alley
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	addTournaments( alleyId, tournamentsIds ): Promise<any> {

		// get the Alley
		this.loadHelper( alleyId );
				
		// split on a comma with no spaces
		var idList = tournamentsIds.split(',')

		// iterate over array of tournaments ids
		idList.forEach(function (id) {
			// read the Tournament		
			var tournament = new TournamentService(this.http).editTournament(id);	
			// add the Tournament if not already assigned
			if ( this.alley.tournaments.indexOf(tournament) == -1 )
				this.alley.tournaments.push(tournament);
		});
				
		// save it		
		return this.saveHelper();
	}			
	
	//********************************************************************
	// removes one or more tournamentsIds as a Tournaments 
	// from a Alley
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************						
	removeTournaments( alleyId, tournamentsIds ): Promise<any> {
		
		// get the Alley
		this.loadHelper( alleyId );

				
		// split on a comma with no spaces
		var idList 					= tournamentsIds.split(',');
		var tournaments 	= this.alley.tournaments;
		
		if ( tournaments != null && tournamentsIds != null ) {
		
			// iterate over array of tournaments ids
			tournaments.forEach(function (obj) {				
				if ( tournamentsIds.indexOf(obj._id) > -1 ) {
					 // remove the Tournament
					this.alley.tournaments.pop(obj);
				}
			});
					
		    // save it		
			return this.saveHelper();
		}
	}
			
	//********************************************************************
	// adds one or more lanesIds as a Lanes 
	// to a Alley
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	addLanes( alleyId, lanesIds ): Promise<any> {

		// get the Alley
		this.loadHelper( alleyId );
				
		// split on a comma with no spaces
		var idList = lanesIds.split(',')

		// iterate over array of lanes ids
		idList.forEach(function (id) {
			// read the Lane		
			var lane = new LaneService(this.http).editLane(id);	
			// add the Lane if not already assigned
			if ( this.alley.lanes.indexOf(lane) == -1 )
				this.alley.lanes.push(lane);
		});
				
		// save it		
		return this.saveHelper();
	}			
	
	//********************************************************************
	// removes one or more lanesIds as a Lanes 
	// from a Alley
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************						
	removeLanes( alleyId, lanesIds ): Promise<any> {
		
		// get the Alley
		this.loadHelper( alleyId );

				
		// split on a comma with no spaces
		var idList 					= lanesIds.split(',');
		var lanes 	= this.alley.lanes;
		
		if ( lanes != null && lanesIds != null ) {
		
			// iterate over array of lanes ids
			lanes.forEach(function (obj) {				
				if ( lanesIds.indexOf(obj._id) > -1 ) {
					 // remove the Lane
					this.alley.lanes.pop(obj);
				}
			});
					
		    // save it		
			return this.saveHelper();
		}
	}
			

	//********************************************************************
	// saveHelper - internal helper to save a Alley
	//********************************************************************
	saveHelper() : Promise<any> {
		
		const uri = this.ormUrl + '/Alley/update/' + this.alley._id;		
		
    	return this
      			.http
      			.post(uri, this.alley)
				.toPromise();			
	}

	//********************************************************************
	// loadHelper - internal helper to load a Alley
	//********************************************************************	
	loadHelper( id ) {
		this.editAlley(id)
        		.subscribe(res => {
        			this.alley = res;
      			});
	}
}