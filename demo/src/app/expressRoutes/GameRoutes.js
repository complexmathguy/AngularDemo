// gameRoutes.js

var express = require('express');
var app = express();
var gameRoutes = express.Router();

// Require Item model in our routes module
var Game = require('../models/Game');

// Defined store route
gameRoutes.route('/add').post(function (req, res) {
	var game = new Game(req.body);
	game.save()
    .then(item => {
    	res.status(200).json({'game': 'Game added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
gameRoutes.route('/').get(function (req, res) {
	Game.find(function (err, games){
		if(err){
			console.log(err);
		}
		else {
			res.json(games);
		}
	});
});

// Defined edit route
gameRoutes.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	Game.findById(id, function (err, game){
		res.json(game);
	});
});

//  Defined update route
gameRoutes.route('/update/:id').post(function (req, res) {
	Game.findById(req.params.id, function(err, game) {
		if (!game)
			return next(new Error('Could not load a Game Document using id ' + req.params.id));
		else {
            game.frames = req.body.frames;
            game.Matchup = req.body.Matchup;
            game.Player = req.body.Player;

			game.save().then(game => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("unable to update the database");
			});
		}
	});
});

// Defined delete | remove | destroy route
gameRoutes.route('/delete/:id').get(function (req, res) {
   Game.findOneAndDelete({_id: req.params.id}, function(err, game){
        if(err) res.json(err);
        else res.json('Successfully removed ' + Game + ' using id ' + req.params.id );
    });
});

module.exports = gameRoutes;