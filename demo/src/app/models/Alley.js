var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Alley
var Alley = new Schema({
  name: {
	type : String
  },
  Leagues: {
 	type : [{ type: Schema.Types.ObjectId, ref: 'League' }]
  },
  Tournaments: {
 	type : [{ type: Schema.Types.ObjectId, ref: 'Tournament' }]
  },
  Lanes: {
 	type : [{ type: Schema.Types.ObjectId, ref: 'Lane' }]
  },
},{
    collection: 'alleys'
});

module.exports = mongoose.model('Alley', Alley);