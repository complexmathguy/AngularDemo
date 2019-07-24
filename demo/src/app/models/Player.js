var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Player
var Player = new Schema({
  name: {
	type : String
  },
  dateOfBirth: {
	type : String
  },
  height: {
	type : String
  },
  isProfessional: {
	type : String
  },
},{
    collection: 'players'
});

module.exports = mongoose.model('Player', Player);