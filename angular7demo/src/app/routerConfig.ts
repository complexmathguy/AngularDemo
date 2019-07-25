// routerConfig.ts

import { Routes } from '@angular/router';
import { CreateAlleyComponent } from './components/Alley/create/create.component';
import { EditAlleyComponent } from './components/Alley/edit/edit.component';
import { IndexAlleyComponent } from './components/Alley/index/index.component';
import { CreateGameComponent } from './components/Game/create/create.component';
import { EditGameComponent } from './components/Game/edit/edit.component';
import { IndexGameComponent } from './components/Game/index/index.component';
import { CreateLaneComponent } from './components/Lane/create/create.component';
import { EditLaneComponent } from './components/Lane/edit/edit.component';
import { IndexLaneComponent } from './components/Lane/index/index.component';
import { CreateLeagueComponent } from './components/League/create/create.component';
import { EditLeagueComponent } from './components/League/edit/edit.component';
import { IndexLeagueComponent } from './components/League/index/index.component';
import { CreateMatchupComponent } from './components/Matchup/create/create.component';
import { EditMatchupComponent } from './components/Matchup/edit/edit.component';
import { IndexMatchupComponent } from './components/Matchup/index/index.component';
import { CreatePlayerComponent } from './components/Player/create/create.component';
import { EditPlayerComponent } from './components/Player/edit/edit.component';
import { IndexPlayerComponent } from './components/Player/index/index.component';
import { CreateTournamentComponent } from './components/Tournament/create/create.component';
import { EditTournamentComponent } from './components/Tournament/edit/edit.component';
import { IndexTournamentComponent } from './components/Tournament/index/index.component';

export const AlleyRoutes: Routes = [
  { path: 'createAlley',
    component: CreateAlleyComponent
  },
  {
    path: 'editAlley/:id',
    component: EditAlleyComponent
  },
  { path: 'indexAlley',
    component: IndexAlleyComponent
  }
];
export const GameRoutes: Routes = [
  { path: 'createGame',
    component: CreateGameComponent
  },
  {
    path: 'editGame/:id',
    component: EditGameComponent
  },
  { path: 'indexGame',
    component: IndexGameComponent
  }
];
export const LaneRoutes: Routes = [
  { path: 'createLane',
    component: CreateLaneComponent
  },
  {
    path: 'editLane/:id',
    component: EditLaneComponent
  },
  { path: 'indexLane',
    component: IndexLaneComponent
  }
];
export const LeagueRoutes: Routes = [
  { path: 'createLeague',
    component: CreateLeagueComponent
  },
  {
    path: 'editLeague/:id',
    component: EditLeagueComponent
  },
  { path: 'indexLeague',
    component: IndexLeagueComponent
  }
];
export const MatchupRoutes: Routes = [
  { path: 'createMatchup',
    component: CreateMatchupComponent
  },
  {
    path: 'editMatchup/:id',
    component: EditMatchupComponent
  },
  { path: 'indexMatchup',
    component: IndexMatchupComponent
  }
];
export const PlayerRoutes: Routes = [
  { path: 'createPlayer',
    component: CreatePlayerComponent
  },
  {
    path: 'editPlayer/:id',
    component: EditPlayerComponent
  },
  { path: 'indexPlayer',
    component: IndexPlayerComponent
  }
];
export const TournamentRoutes: Routes = [
  { path: 'createTournament',
    component: CreateTournamentComponent
  },
  {
    path: 'editTournament/:id',
    component: EditTournamentComponent
  },
  { path: 'indexTournament',
    component: IndexTournamentComponent
  }
];
