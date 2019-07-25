import { Injectable } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Game} from '../models/Game';
import {MatchupService} from '../services/Matchup.service';
import {PlayerService} from '../services/Player.service';
import { BaseService } from './base.service';

@Injectable()
export class GameService extends BaseService {

	//********************************************************************
	// general holder 
	//********************************************************************
	game : any;
	
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
	// add a Game 
	// returns the results untouched as a JSON representation 
	// delegates via URI to an ORM handler
	//********************************************************************
  	addGame(frames, Matchup, Player) : Promise<any> {
    	const uri = this.ormUrl + '/Game/add';
    	const obj = {
      		frames: frames,
      		Matchup: Matchup != null && Matchup.length > 0 ? Matchup : null,
			Player: Player != null && Player.length > 0 ? Player : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// gets all Game 
	// returns the results untouched as JSON representation of an
	// array of Game models
	// delegates via URI to an ORM handler
	//********************************************************************
	getGames() {
    	const uri = this.ormUrl + '/Game';
    	
    	return this
            	.http.get(uri).map(res => {
              						return res;
            					});
  	}

	//********************************************************************
	// edit a Game 
	// returns the results untouched as a JSON representation of a
	// Game model
	// delegates via URI to an ORM handler
	//********************************************************************
  	editGame(id) {
    	const uri = this.ormUrl + '/Game/edit/' + id;
    	
    	return this.http.get(uri).map(res => {
              							return res;
            						});
  	}

	//********************************************************************
	// update a Game 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	updateGame(frames, Matchup, Player, id)  : Promise<any>  {
    	const uri = this.ormUrl + '/Game/update/' + id;
    	const obj = {
      		frames: frames,
      		Matchup: Matchup != null && Matchup.length > 0 ? Matchup : null,
			Player: Player != null && Player.length > 0 ? Player : null
    	};
    	
    	return this.http.post(uri, obj).toPromise();
  	}

	//********************************************************************
	// delete a Game 
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	deleteGame(id)  : Promise<any> {
    	const uri = this.ormUrl + '/Game/delete/' + id;

        return this.http.get(uri).toPromise();
  }
  
    		//********************************************************************
	// assigns a Matchup on a Game
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	assignMatchup( gameId, matchupId ): Promise<any> {

		// get the Game from storage
		this.loadHelper( gameId );
		
		// get the Matchup from storage
		var matchup 	= new MatchupService(this.http).editMatchup(matchupId);
		
		// assign the Matchup		
		this.game.matchup = matchup;
      		
		// save the Game
		return this.saveHelper();		
	}

	//********************************************************************
	// unassigns a Matchup on a Game
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	unassignMatchup( gameId ): Promise<any> {

		// get the Game from storage
        this.loadHelper( gameId );
		
		// assign Matchup to null		
		this.game.matchup = null;
      		
		// save the Game
		return this.saveHelper();
	}
	
	//********************************************************************
	// assigns a Player on a Game
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************
	assignPlayer( gameId, playerId ): Promise<any> {

		// get the Game from storage
		this.loadHelper( gameId );
		
		// get the Player from storage
		var player 	= new PlayerService(this.http).editPlayer(playerId);
		
		// assign the Player		
		this.game.player = player;
      		
		// save the Game
		return this.saveHelper();		
	}

	//********************************************************************
	// unassigns a Player on a Game
	// returns a Promise
	// delegates via URI to an ORM handler
	//********************************************************************				
	unassignPlayer( gameId ): Promise<any> {

		// get the Game from storage
        this.loadHelper( gameId );
		
		// assign Player to null		
		this.game.player = null;
      		
		// save the Game
		return this.saveHelper();
	}
	


	//********************************************************************
	// saveHelper - internal helper to save a Game
	//********************************************************************
	saveHelper() : Promise<any> {
		
		const uri = this.ormUrl + '/Game/update/' + this.game._id;		
		
    	return this
      			.http
      			.post(uri, this.game)
				.toPromise();			
	}

	//********************************************************************
	// loadHelper - internal helper to load a Game
	//********************************************************************	
	loadHelper( id ) {
		this.editGame(id)
        		.subscribe(res => {
        			this.game = res;
      			});
	}
}