var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Lane
var Lane = new Schema({
  number: {
	type : String
  },
},{
    collection: 'lanes'
});

module.exports = mongoose.model('Lane', Lane);