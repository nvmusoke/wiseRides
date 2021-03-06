var mongoose = require('mongoose');
var	Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var DriverInfo = new mongoose.Schema({
	type: ObjectId,
	driverId: String,
	firstName: String,
	lastName: String,
	password: String,
	birthday: Date,
	email: String,
	phoneNumber: String,
	profileImage: String,
	notifications: [{ name: String, date: Date, time: String, pickUpAddress: String, dropOffAddress: String }],
	licensePlate: String,
	make: String,
	model: String,
	color: String,
	wheelChairAccess: Boolean,
	cargoSpace: Boolean,
	lowRise: Boolean,
	stepAssistance: Boolean,
	created: Date
});

var DriverModel = mongoose.model('Driver', DriverInfo);

// Make this available to our other files
module.exports = DriverModel;
