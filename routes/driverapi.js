var express = require('express');
var router = express.Router();
var DriverModel = require('../models/driver');
var Driver = require('../models/driver');
var Trip = require('../models/trip');

//GET all drivers
router.get('/driver-profile-private', function(req, res, next){
	DriverModel.find({}, '', function(err,driver){
		if(err) console.error('Error getting drivers:', err);
		// console.log(driver);
		res.json(driver);
	});
});


//POST a new driver
router.post('/driver-app-pg1', function(req, res, next){
	// console.log('new driver created');
	var driverInfo = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		birthday: req.body.birthday,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		notifications: req.body.notifications
	};

	var newDriver = new DriverModel(driverInfo);

	newDriver.save(function(err,success){
		// console.log('New Driver Created!!');
		if (err) console.log(err);

		res.send('New Driver Created');
		// res.redirect('/');
	});
});

//PUT a change into driver info
router.put('/driver/:driverId/driver-app-pg3', function(req, res, next){
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
		res.send('SUCCESS');
		// res.redirect('/');
	});
});

//PUT a change into driver info
router.put('/', function(req, res, next){
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
		// console.log(driverInfo);
		res.send('SUCCESS');
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
