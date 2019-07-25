var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Matchup
var Matchup = new Schema({
  name: {
	type : String
  },
  Games: {
 	type : [{ type: Schema.Types.ObjectId, ref: 'Game' }]
  },
},{
    collection: 'matchups'
});

module.exports = mongoose.model('Matchup', Matchup);