var express = require('express');
var router = express.Router();
var PassengerModel = require('../models/passenger');
var Driver = require('../models/driver');
var Trip = require('../models/trip');

// GET all passengers
router.get('/passenger', function(req, res, next) {
	PassengerModel.find({}, '', function(err,passenger){
		console.log('passenger model', passenger);
		if(err) console.error('Error getting passenger:', err);

		res.json(passenger);
	});
});

//GET single passenger
router.get('/passenger/:passengerId', function(req,res){
	PassengerModel.findById(req.params.passengerId, '', function(err, passenger){
		if (err) console.log(err);

		res.json(passenger);
	});
});


		// "firstName": "Luke",
    // "lastName": "Popwell",
    // "password": "password",
    // "birthday": "06/08/1981",
    // "email": "lukepopwell@mac.com",
    // "streetAddress": "1500 fake lane",
    // "city": "Austin",
    // "state": "TX",
    // "phoneNumber": "334-332-6441",
    // "profileIMage": "image placeholder",
    // "notifications": "text",
    // "wheelchairAccess": "no",
    // "cargoSpace": "no junk in my trunk",
    // "lowRise": "yes",
    // "stepAssistance": "yes"

//POST  a new passenger
router.post('/passengerapp_pg1', function(req, res, next){
	console.log('new page route working');
	var passengerInfo = {
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

	var newPassenger = new PassengerModel(passengerInfo);

	newPassenger.save(function(err,success){
		console.log('New passenger created');
		if(err) console.error(err);
		// res.send('New Passenger Created');
		res.redirect('/');
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

router.delete('/passenger/:passengerId', function(req, res, next){
	var passengerId = req.params.passengerId;
	PassengerModel.findByIdAndRemove(passengerId, function(err,passengerInfo){
		if(err) console.error(err);

		res.send('SUCCESS');
	})
});

module.exports = router;
