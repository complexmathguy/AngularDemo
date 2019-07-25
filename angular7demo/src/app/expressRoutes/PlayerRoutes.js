// playerRoutes.js

var express = require('express');
var app = express();
var playerRoutes = express.Router();

// Require Item model in our routes module
var Player = require('../models/Player');

// Defined store route
playerRoutes.route('/add').post(function (req, res) {
	var player = new Player(req.body);
	player.save()
    .then(item => {
    	res.status(200).json({'player': 'Player added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
playerRoutes.route('/').get(function (req, res) {
	Player.find(function (err, players){
		if(err){
			console.log(err);
		}
		else {
			res.json(players);
		}
	});
});

// Defined edit route
playerRoutes.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	Player.findById(id, function (err, player){
		res.json(player);
	});
});

//  Defined update route
playerRoutes.route('/update/:id').post(function (req, res) {
	Player.findById(req.params.id, function(err, player) {
		if (!player)
			return next(new Error('Could not load a Player Document using id ' + req.params.id));
		else {
            player.name = req.body.name;
            player.dateOfBirth = req.body.dateOfBirth;
            player.height = req.body.height;
            player.isProfessional = req.body.isProfessional;

			player.save().then(player => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("unable to update the database");
			});
		}
	});
});

// Defined delete | remove | destroy route
playerRoutes.route('/delete/:id').get(function (req, res) {
   Player.findOneAndDelete({_id: req.params.id}, function(err, player){
        if(err) res.json(err);
        else res.json('Successfully removed ' + Player + ' using id ' + req.params.id );
    });
});

module.exports = playerRoutes;