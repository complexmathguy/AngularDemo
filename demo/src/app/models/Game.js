var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Game
var Game = new Schema({
  frames: {
	type : String
  },
  Matchup: {
	type : Schema.Types.ObjectId
  },
  Player: {
	type : Schema.Types.ObjectId
  },
},{
    collection: 'games'
});

module.exports = mongoose.model('Game', Game);