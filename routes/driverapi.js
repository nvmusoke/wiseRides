var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var DriverModel = require('../models/driver');
var Driver = require('../models/driver');
var Trip = require('../models/trip');

//GET all drivers
router.get('/driver', ensureLoggedIn, function(req, res, next){
	DriverModel.find({ driverId: req.user.sub }, '', function(err,driver){
		if(err) console.error('Error getting drivers:', err);
		// console.log(driver);
		res.json(driver);
	});
});

//GET single driver
router.get('/driver/:driverId', function(req,res){
	DriverModel.findById({ driverId: req.params.driverId }, '', function(err, driver){
		if (err) console.log(err);
		res.json(driver);
		// console.log(req.user.passengerId);
	});
});


//POST a new driver

router.post('/', function(req, res, next){
	console.log('new driver created');

	var driverInfo = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		birthday: req.body.birthday,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		notifications: req.body.notifications,
		driverId: req.user.sub
	};

	var newDriver = new DriverModel(driverInfo);
	newDriver.save(function(err,success){
		// console.log('New Driver Created!!');
		if (err) console.log(err);
		res.redirect('/driver-app-pg2');
	});
});

//PUT a change into driver info
router.put('/driver/:driverId', function(req, res, next){
	var driverId = req.params.driverId;
	var updateInfo = {
		profileImage: req.body.profileImage,
		licensePlate: req.body.licensePlate,
		make: req.body.make,
		model: req.body.model,
		color: req.body.color,
		wheelChairAccess: req.body.wheelChairAccess,
		cargoSpace: req.body.cargoSpace,
		lowRise: req.body.lowRise,
		stepAssistance: req.body.stepAssistance
	};

	DriverModel.findByIdAndUpdate(driverId,updateInfo, function(err,driverInfo){
		if(err) console.error(err);
		console.log('Driver Edited!!');
		res.redirect('/driver-app-pg3');
	});
});

//PUT a change into driver info
router.put('/driver/:driverId', function(req, res, next){
	var driverId = req.body.driverId;
	var updateInfo = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		birthday: req.body.birthday,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		profileImage: req.body.profileImage,
		notifications: req.body.notifications,
		licensePlate: req.body.licensePlate,
		make: req.body.make,
		model: req.body.model,
		color: req.body.color,
		wheelChairAccess: req.body.wheelChairAccess,
		cargoSpace: req.body.cargoSpace,
		lowRise: req.body.lowRise,
		stepAssistance: req.body.stepAssistance
	};

	DriverModel.findByIdAndUpdate(driverId,updateInfo, function(err,driverInfo){
		if(err) console.error(err);

		console.log(driverInfo);
		// res.send('SUCCESS');
		res.redirect('/driver-app-done');
	});
});

//DELETE a driver by Id
router.delete('/', function(req, res, next){
	var driverId = req.body.driverId;
	DriverModel.findByIdAndRemove(driverId, function(err, driverInfo){
		if(err) console.error(err);

		res.send('SUCCESS');
	})
});

module.exports = router;
