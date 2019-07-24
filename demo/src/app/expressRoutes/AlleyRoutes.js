// alleyRoutes.js

var express = require('express');
var app = express();
var alleyRoutes = express.Router();

// Require Item model in our routes module
var Alley = require('../models/Alley');

// Defined store route
alleyRoutes.route('/add').post(function (req, res) {
	var alley = new Alley(req.body);
	alley.save()
    .then(item => {
    	res.status(200).json({'alley': 'Alley added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
alleyRoutes.route('/').get(function (req, res) {
	Alley.find(function (err, alleys){
		if(err){
			console.log(err);
		}
		else {
			res.json(alleys);
		}
	});
});

// Defined edit route
alleyRoutes.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	Alley.findById(id, function (err, alley){
		res.json(alley);
	});
});

//  Defined update route
alleyRoutes.route('/update/:id').post(function (req, res) {
	Alley.findById(req.params.id, function(err, alley) {
		if (!alley)
			return next(new Error('Could not load a Alley Document using id ' + req.params.id));
		else {
            alley.name = req.body.name;
            alley.Leagues = req.body.Leagues;
            alley.Tournaments = req.body.Tournaments;
            alley.Lanes = req.body.Lanes;

			alley.save().then(alley => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("unable to update the database");
			});
		}
	});
});

// Defined delete | remove | destroy route
alleyRoutes.route('/delete/:id').get(function (req, res) {
   Alley.findOneAndDelete({_id: req.params.id}, function(err, alley){
        if(err) res.json(err);
        else res.json('Successfully removed ' + Alley + ' using id ' + req.params.id );
    });
});

module.exports = alleyRoutes;