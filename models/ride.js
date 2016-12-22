var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  pickUpAddress: String,
  dropOffAddress: String

});

var RideModel = mongoose.model('ride', schema);

// Make this available to our other files
module.exports = RideModel;
