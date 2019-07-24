// server.js
const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'), 
	cors = require('cors'),
	mongoose = require('mongoose'),
    alleyRoutes = require('./src/app/expressRoutes/AlleyRoutes'),
    gameRoutes = require('./src/app/expressRoutes/GameRoutes'),
    laneRoutes = require('./src/app/expressRoutes/LaneRoutes'),
    leagueRoutes = require('./src/app/expressRoutes/LeagueRoutes'),
    matchupRoutes = require('./src/app/expressRoutes/MatchupRoutes'),
    playerRoutes = require('./src/app/expressRoutes/PlayerRoutes'),
    tournamentRoutes = require('./src/app/expressRoutes/TournamentRoutes'),
	config = require('./config/mongoDb.js');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_HOST_ADDRESS || config.DB, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database: ' + err)}
  );

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = ${aib.getParam("mongodb.mongoosePort")};

app.use('/Alley', alleyRoutes);
app.use('/Game', gameRoutes);
app.use('/Lane', laneRoutes);
app.use('/League', leagueRoutes);
app.use('/Matchup', matchupRoutes);
app.use('/Player', playerRoutes);
app.use('/Tournament', tournamentRoutes);

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
