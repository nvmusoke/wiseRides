var mongoose = require('mongoose');
var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var PassengerInfo = new mongoose.Schema({
	type: ObjectId,
  firstName: String,
  lastName: String,
  password: String,
  birthday: Date,
  email: String,
  streetAddress: String,
  city: String,
  state: String,
  phoneNumber: String,
  profileImage: String,
  notifications: Boolean,
  wheelChairAccess: String,
  cargoSpace: String,
  lowRise: String,
  stepAssistance: String,
	created: Date
});

var PassengerModel = mongoose.model('Passenger', PassengerInfo);

// Make this available to our other files
module.exports = PassengerModel;
