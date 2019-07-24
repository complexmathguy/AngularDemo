// laneRoutes.js

var express = require('express');
var app = express();
var laneRoutes = express.Router();

// Require Item model in our routes module
var Lane = require('../models/Lane');

// Defined store route
laneRoutes.route('/add').post(function (req, res) {
	var lane = new Lane(req.body);
	lane.save()
    .then(item => {
    	res.status(200).json({'lane': 'Lane added successfully'});
    })
    .catch(err => {
    	res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
laneRoutes.route('/').get(function (req, res) {
	Lane.find(function (err, lanes){
		if(err){
			console.log(err);
		}
		else {
			res.json(lanes);
		}
	});
});

// Defined edit route
laneRoutes.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	Lane.findById(id, function (err, lane){
		res.json(lane);
	});
});

//  Defined update route
laneRoutes.route('/update/:id').post(function (req, res) {
	Lane.findById(req.params.id, function(err, lane) {
		if (!lane)
			return next(new Error('Could not load a Lane Document using id ' + req.params.id));
		else {
            lane.number = req.body.number;

			lane.save().then(lane => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("unable to update the database");
			});
		}
	});
});

// Defined delete | remove | destroy route
laneRoutes.route('/delete/:id').get(function (req, res) {
   Lane.findOneAndDelete({_id: req.params.id}, function(err, lane){
        if(err) res.json(err);
        else res.json('Successfully removed ' + Lane + ' using id ' + req.params.id );
    });
});

module.exports = laneRoutes;