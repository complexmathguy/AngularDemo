// tournamentRoutes.js

var express = require('express');
var app = express();
var tournamentRoutes = express.Router();

// Require Item model in our routes module
var Tournament = require('../models/Tournament');

// Defined store route
tournamentRoutes.route('/add').post(function (req, res) {
	var tournament = new Tournament(req.body);
	tournament.save()
    .then(item => {
    	res.status(200).json({'tournament': 'Tournament added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
tournamentRoutes.route('/').get(function (req, res) {
	Tournament.find(function (err, tournaments){
		if(err){
			console.log(err);
		}
		else {
			res.json(tournaments);
		}
	});
});

// Defined edit route
tournamentRoutes.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	Tournament.findById(id, function (err, tournament){
		res.json(tournament);
	});
});

//  Defined update route
tournamentRoutes.route('/update/:id').post(function (req, res) {
	Tournament.findById(req.params.id, function(err, tournament) {
		if (!tournament)
			return next(new Error('Could not load a Tournament Document using id ' + req.params.id));
		else {
            tournament.name = req.body.name;
            tournament.Matchups = req.body.Matchups;
            tournament.Type = req.body.Type;

			tournament.save().then(tournament => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("unable to update the database");
			});
		}
	});
});

// Defined delete | remove | destroy route
tournamentRoutes.route('/delete/:id').get(function (req, res) {
   Tournament.findOneAndDelete({_id: req.params.id}, function(err, tournament){
        if(err) res.json(err);
        else res.json('Successfully removed ' + Tournament + ' using id ' + req.params.id );
    });
});

module.exports = tournamentRoutes;