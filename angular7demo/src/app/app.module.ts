import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatDatepickerModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav'


import { IndexAlleyComponent } from './components/Alley/index/index.component';
import { CreateAlleyComponent } from './components/Alley/create/create.component';
import { EditAlleyComponent } from './components/Alley/edit/edit.component';
import { IndexGameComponent } from './components/Game/index/index.component';
import { CreateGameComponent } from './components/Game/create/create.component';
import { EditGameComponent } from './components/Game/edit/edit.component';
import { IndexLaneComponent } from './components/Lane/index/index.component';
import { CreateLaneComponent } from './components/Lane/create/create.component';
import { EditLaneComponent } from './components/Lane/edit/edit.component';
import { IndexLeagueComponent } from './components/League/index/index.component';
import { CreateLeagueComponent } from './components/League/create/create.component';
import { EditLeagueComponent } from './components/League/edit/edit.component';
import { IndexMatchupComponent } from './components/Matchup/index/index.component';
import { CreateMatchupComponent } from './components/Matchup/create/create.component';
import { EditMatchupComponent } from './components/Matchup/edit/edit.component';
import { IndexPlayerComponent } from './components/Player/index/index.component';
import { CreatePlayerComponent } from './components/Player/create/create.component';
import { EditPlayerComponent } from './components/Player/edit/edit.component';
import { IndexTournamentComponent } from './components/Tournament/index/index.component';
import { CreateTournamentComponent } from './components/Tournament/create/create.component';
import { EditTournamentComponent } from './components/Tournament/edit/edit.component';

import * as appRoutes from './routerConfig';

import { AlleyService } from './services/Alley.service';
import { GameService } from './services/Game.service';
import { LaneService } from './services/Lane.service';
import { LeagueService } from './services/League.service';
import { MatchupService } from './services/Matchup.service';
import { PlayerService } from './services/Player.service';
import { TournamentService } from './services/Tournament.service';

@NgModule({
  declarations: [
    IndexAlleyComponent,
    CreateAlleyComponent,
    EditAlleyComponent,
    IndexGameComponent,
    CreateGameComponent,
    EditGameComponent,
    IndexLaneComponent,
    CreateLaneComponent,
    EditLaneComponent,
    IndexLeagueComponent,
    CreateLeagueComponent,
    EditLeagueComponent,
    IndexMatchupComponent,
    CreateMatchupComponent,
    EditMatchupComponent,
    IndexPlayerComponent,
    CreatePlayerComponent,
    EditPlayerComponent,
    IndexTournamentComponent,
    CreateTournamentComponent,
    EditTournamentComponent,
    AppComponent
  ],
  imports: [

    BrowserModule, 
    NgbModule,
    MatMenuModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
	MatMomentDateModule,
    BrowserAnimationsModule,
	HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,    
    RouterModule.forRoot(appRoutes.AlleyRoutes), 
    RouterModule.forRoot(appRoutes.GameRoutes), 
    RouterModule.forRoot(appRoutes.LaneRoutes), 
    RouterModule.forRoot(appRoutes.LeagueRoutes), 
    RouterModule.forRoot(appRoutes.MatchupRoutes), 
    RouterModule.forRoot(appRoutes.PlayerRoutes), 
    RouterModule.forRoot(appRoutes.TournamentRoutes), 
  ],
  providers: [AlleyService,GameService,LaneService,LeagueService,MatchupService,PlayerService,TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
