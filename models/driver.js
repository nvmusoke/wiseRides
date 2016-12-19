var mongoose = require('mongoose');
var	Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var DriverInfo = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	birthday: { type: String, required: true },
	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	profileImage: { type: String, required: true },
	notifications: { type: String, required: true },
	licensePlate: { type: String, required: true },
	make: { type: String, required: true },
	model: { type: String, required: true },
	color: { type: String, required: true },
	wheelChairAccess: { type: String, required: true },
	cargoSpace: { type: String, required: true },
	lowRise: { type: String, required: true },
	stepAssistance: { type: String, required: true }
});

var DriverModel = mongoose.model('driver', DriverInfo);

// Make this available to our other files
module.exports = DriverModel;
