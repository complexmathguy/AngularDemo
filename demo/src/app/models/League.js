var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for League
var League = new Schema({
  name: {
	type : String
  },
  Players: {
 	type : [{ type: Schema.Types.ObjectId, ref: 'Player' }]
  },
},{
    collection: 'leagues'
});

module.exports = mongoose.model('League', League);