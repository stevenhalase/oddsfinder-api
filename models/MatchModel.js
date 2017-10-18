var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MatchSchema = new Schema({
  'PsuedoKey' : String,
  'Service' : String,
	'Date' : Date,
	'Team1' : {
    'Name': String,
    'Price': String
	},
	'Team2' : {
    'Name': String,
    'Price': String
	},
	'DrawPrice' : String,
	'Sport' : String
});

module.exports = mongoose.model('Match', MatchSchema);
