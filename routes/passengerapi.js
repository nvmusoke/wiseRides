var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var PassengerModel = require('../models/passenger');
var Driver = require('../models/driver');
var Trip = require('../models/trip');


// GET all passengers
router.get('/passenger', function(req, res, next) {
	PassengerModel.find({ passengerId: req.user.aud }, '', function(err, passengers){
		if(err) console.error('Error getting passenger:', err);
		res.json(passengers);
	});
});

//GET single passenger
router.get('/passenger/:passengerId', function(req,res){
	PassengerModel.findById({ userId: req.user.passengerId }, '', function(err, passenger){

		if (err) console.log(err);
		res.json(passenger);
		// console.log(req.user.passengerId);
	});
});

//POST a new passenger
router.post('/', function(req, res, next){
	// console.log('new page route working');

	// console.log('user is: ', req.user);

	// console.log('user is: ', req.passenger);


	var passengerInfo = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		birthday: req.body.birthday,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		notifications: req.body.notifications
	//	auth0Id: req.user.id
	};

	var newPassenger = new PassengerModel(passengerInfo);
		newPassenger.save(function(err,success){

			if(err) console.error(err);
			res.redirect('/passenger-app-pg2');
		});
});

// New passenger page 2

router.put('/passenger/:passengerId', function(req, res, next){

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
		// res.send('SUCCESS');
		res.redirect('/passenger-app-done');
		// console.log(passengerInfo);
	});
});

//PUT a change into passenger info
router.put('/passenger/:passengerId', function(req, res, next){
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
