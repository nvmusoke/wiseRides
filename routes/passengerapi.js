var express = require('express');
var router = express.Router();
var PassengerModel = require('../models/passenger');
var Driver = require('../models/driver');
var Trip = require('../models/trip');

// GET all passengers
router.get('/passenger-profile-private', function(req, res, next) {
	PassengerModel.find({}, '', function(err,passenger){
		console.log('passenger model', passenger);
		if(err) console.error('Error getting passenger:', err);
		console.log(passenger);
		res.json(passenger);
	});
});

//GET single passenger
router.get('/passenger/:passengerId', function(req,res){
	PassengerModel.findById(req.params.passengerId, '', function(err, passenger){
		if (err) console.log(err);
		// console.log(passenger);
		res.json(passenger);
	});
});

//POST a new passenger
router.post('/passenger-app-pg1', function(req, res, next){
	console.log('new page route working');
	var passengerInfo = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		birthday: req.body.birthday,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		notifications: req.body.notifications
	};

	var newPassenger = new PassengerModel(passengerInfo);

	newPassenger.save(function(err,success){
		console.log('New passenger created');
		if(err) console.error(err);
		res.send('New Passenger Created');
		// res.redirect('/');
	});
});


// New passenger page 2
router.put('/passenger/:passengerId/passenger-app-pg2', function(req, res, next){
	console.log('new passenger updated by :id');
	var passengerId = req.params.passengerId;
	var updateInfo = {
		streetAddress: req.body.streetAddress,
		city: req.body.city,
		state: req.body.state,
		profileImage: req.body.profileImage,
		wheelChairAccess: req.body.wheelChairAccess,
		cargoSpace: req.body.cargoSpace,
		lowRise: req.body.lowRise,
		stepAssistance: req.body.stepAssistance
	};

	PassengerModel.findByIdAndUpdate(passengerId,updateInfo, function(err,passengerInfo){
		if(err) console.error(err);
		res.send('SUCCESS');
		res.redirect('/passenger-app-done');
	});
});

//PUT a change into passenger info
router.put('/', function(req, res, next){
	var passengerId = req.params.passengerId;
	var updateInfo = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		birthday: req.body.birthday,
		email: req.body.email,
		streetAddress: req.body.streetAddress,
		city: req.body.city,
		state: req.body.state,
		phoneNumber: req.body.phoneNumber,
		profileImage: req.body.profileImage,
		notifications: req.body.notifications,
		wheelChairAccess: req.body.wheelChairAccess,
		cargoSpace: req.body.cargoSpace,
		lowRise: req.body.lowRise,
		stepAssistance: req.body.stepAssistance
	};

	PassengerModel.findByIdAndUpdate(passengerId,updateInfo, function(err,passengerInfo){
		if(err) console.error(err);
		res.send('SUCCESS');
	});
});


router.delete('/', function(req, res, next){
	var passengerId = req.body.passengerId;
	PassengerModel.findByIdAndRemove(passengerId, function(err,passengerInfo){
		if(err) console.error(err);

		res.send('SUCCESS');
	})
});

module.exports = router;
