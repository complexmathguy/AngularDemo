var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Tournament
var Tournament = new Schema({
  name: {
	type : String
  },
  Matchups: {
 	type : [{ type: Schema.Types.ObjectId, ref: 'Matchup' }]
  },
  Type: {
 	type : String
  },
},{
    collection: 'tournaments'
});

module.exports = mongoose.model('Tournament', Tournament);