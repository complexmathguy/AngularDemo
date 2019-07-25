import { HttpClient } from '@angular/common/http';
import * as enumTypes from '../models/EnumTypes';

import {AlleyService} from '../services/Alley.service';
import {GameService} from '../services/Game.service';
import {LaneService} from '../services/Lane.service';
import {LeagueService} from '../services/League.service';
import {MatchupService} from '../services/Matchup.service';
import {PlayerService} from '../services/Player.service';
import {TournamentService} from '../services/Tournament.service';

/** 
	Base class of all Components.  
	For convenience, contains all enums and entity lists 
**/
export class BaseComponent {

    constructor (private http: HttpClient) {}

// enum instances
    TournamentTypes = Object.keys(enumTypes.TournamentType);

// all collection instances
    alleys : any;
    games : any;
    lanes : any;
    leagues : any;
    matchups : any;
    players : any;
    tournaments : any;
  
// initialization  
    ngOnInit() {
    }

    initAlleyList() {
        if ( this.alleys == null ) {
            new AlleyService(this.http).getAlleys().subscribe(res => {
                this.alleys = res;
            });
        }
    }
    
    initGameList() {
        if ( this.games == null ) {
            new GameService(this.http).getGames().subscribe(res => {
                this.games = res;
            });
        }
    }
    
    initLaneList() {
        if ( this.lanes == null ) {
            new LaneService(this.http).getLanes().subscribe(res => {
                this.lanes = res;
            });
        }
    }
    
    initLeagueList() {
        if ( this.leagues == null ) {
            new LeagueService(this.http).getLeagues().subscribe(res => {
                this.leagues = res;
            });
        }
    }
    
    initMatchupList() {
        if ( this.matchups == null ) {
            new MatchupService(this.http).getMatchups().subscribe(res => {
                this.matchups = res;
            });
        }
    }
    
    initPlayerList() {
        if ( this.players == null ) {
            new PlayerService(this.http).getPlayers().subscribe(res => {
                this.players = res;
            });
        }
    }
    
    initTournamentList() {
        if ( this.tournaments == null ) {
            new TournamentService(this.http).getTournaments().subscribe(res => {
                this.tournaments = res;
            });
        }
    }
    
    
// comparison function for select controls  
    compareFn(user1: any, user2: any) {
        return user1 == user2
    }    
}
