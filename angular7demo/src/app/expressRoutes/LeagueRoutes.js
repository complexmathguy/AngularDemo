// leagueRoutes.js

var express = require('express');
var app = express();
var leagueRoutes = express.Router();

// Require Item model in our routes module
var League = require('../models/League');

// Defined store route
leagueRoutes.route('/add').post(function (req, res) {
	var league = new League(req.body);
	league.save()
    .then(item => {
    	res.status(200).json({'league': 'League added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
leagueRoutes.route('/').get(function (req, res) {
	League.find(function (err, leagues){
		if(err){
			console.log(err);
		}
		else {
			res.json(leagues);
		}
	});
});

// Defined edit route
leagueRoutes.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	League.findById(id, function (err, league){
		res.json(league);
	});
});

//  Defined update route
leagueRoutes.route('/update/:id').post(function (req, res) {
	League.findById(req.params.id, function(err, league) {
		if (!league)
			return next(new Error('Could not load a League Document using id ' + req.params.id));
		else {
            league.name = req.body.name;
            league.Players = req.body.Players;

			league.save().then(league => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("unable to update the database");
			});
		}
	});
});

// Defined delete | remove | destroy route
leagueRoutes.route('/delete/:id').get(function (req, res) {
   League.findOneAndDelete({_id: req.params.id}, function(err, league){
        if(err) res.json(err);
        else res.json('Successfully removed ' + League + ' using id ' + req.params.id );
    });
});

module.exports = leagueRoutes;