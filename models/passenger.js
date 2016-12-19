var mongoose = require('mongoose');
var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var PassengerInfo = new mongoose.Schema({
	type: ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: String, required: true },
  email: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profileImage: { type: String, required: true },
  notifications: { type: String, required: true },
  wheelChairAccess: { type: String, required: true },
  cargoSpace: { type: String, required: true },
  lowRise: { type: String, required: true },
  stepAssistance: { type: String, required: true },
	created: Date
});

var PassengerModel = mongoose.model('Passenger', PassengerInfo);

// Make this available to our other files
module.exports = PassengerModel;
