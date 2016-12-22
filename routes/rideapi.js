var express = require('express');
var router = express.Router();
var Ride = require('../models/ride');
var Drivers = require('../models/driver');


router.get('/',function(req,res,next){
  Ride.find({},'',function( err,rides ){
    if(err) console.error('Error gettting posts: ', err);
    res.json(rides);
  });
});

router.post('/requestride',function(req,res,next){
  // modify this object to have just the address key
  var rideInfo = {
    date: req.body.date,
    time: req.body.time,
    pickUpAddress: req.body.pickUpAddress,
    dropOffAddress: req.body.dropOffAddress,
  };

  Drivers.find({},'',function(error, drivers){
    if(error) console.error(error);

    drivers.forEach(function(driver,index){
      driver.notifications.push(rideInfo);
      driver.save();
    });
    res.json(drivers);
  });
});

module.exports = router;
