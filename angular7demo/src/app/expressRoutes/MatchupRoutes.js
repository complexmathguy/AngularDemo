// matchupRoutes.js

var express = require('express');
var app = express();
var matchupRoutes = express.Router();

// Require Item model in our routes module
var Matchup = require('../models/Matchup');

// Defined store route
matchupRoutes.route('/add').post(function (req, res) {
	var matchup = new Matchup(req.body);
	matchup.save()
    .then(item => {
    	res.status(200).json({'matchup': 'Matchup added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
matchupRoutes.route('/').get(function (req, res) {
	Matchup.find(function (err, matchups){
		if(err){
			console.log(err);
		}
		else {
			res.json(matchups);
		}
	});
});

// Defined edit route
matchupRoutes.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	Matchup.findById(id, function (err, matchup){
		res.json(matchup);
	});
});

//  Defined update route
matchupRoutes.route('/update/:id').post(function (req, res) {
	Matchup.findById(req.params.id, function(err, matchup) {
		if (!matchup)
			return next(new Error('Could not load a Matchup Document using id ' + req.params.id));
		else {
            matchup.name = req.body.name;
            matchup.Games = req.body.Games;

			matchup.save().then(matchup => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("unable to update the database");
			});
		}
	});
});

// Defined delete | remove | destroy route
matchupRoutes.route('/delete/:id').get(function (req, res) {
   Matchup.findOneAndDelete({_id: req.params.id}, function(err, matchup){
        if(err) res.json(err);
        else res.json('Successfully removed ' + Matchup + ' using id ' + req.params.id );
    });
});

module.exports = matchupRoutes;