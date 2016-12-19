var express = require('express');
var router = express.Router();
var DriverModel = require('../models/driver');

//GET all drivers
router.get('/driver', function(req, res, next){
	DriverModel.find({}, '', function(err,drivers){
		if(err) console.error('Error getting drivers:', err);

		res.json(drivers);
	});
});

//GET a driver by Id
router.get('/driver/:driverId', function(req,res){
	DriverModel.findById(req.params.DriverId, '', function(err, driver){
			if (err) console.log(err);

			res.json(driver);
	});
});

// "firstName": "Luke",
// "lastName": "Popwell",
// "password": "password",
// "birthday": "06/08/1981",
// "email": "lukepopwell@mac.com",
// "phoneNumber": "334-332-6441",
// "profileImage": "image placeholder",
// "notifications": "text",
// "licensePlate": "too cold to go outside",
// "make": "make",
// "model": "yes please",
// "color": "colorblind",
// "wheelChairAccess": "no",
// "cargoSpace": "no junk in my trunk",
// "lowRise": "yes",
// "stepAssistance": "yes"

//POST a new driver
router.post('/', function(req, res, next){
	console.log('got driver by Id');
	var driverInfo = {
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

	var newDriver = new DriverModel(driverInfo);

	newDriver.save(function(err,success){
		console.log('New Driver Created!!');
		if (err) console.log(err);

		res.redirect('/');
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
		res.send('SUCCESS');
	});
});

//DELETE a driver by Id
router.delete('/driver/:driverId', function(req, res, next){
	var driverId = req.body.driverId;
	DriverModel.findByIdAndRemove(driverId, function(err,driverInfo){
		if(err) console.error(err);

		res.send('SUCCESS');
	})
});

module.exports = router;
