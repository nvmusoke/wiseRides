var express = require('express');
var router = express.Router();
var Ride = require('../models/ride');
var Drivers = require('../models/driver');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();


// GET notifications
router.get('/notifications',ensureLoggedIn, function(req,res,next){
  console.log('req.user: ', req.user);
  Drivers.findOne({ driverId: req.user.sub },'notifications',function( err,notifications ){
    if(err) console.error('Error gettting notifications: ', err);
    res.json(notifications);
  });
});

// router.get('/', function(req, res, next) {
// 	PassengerModel.find({}, '', function(err, allPassengers){
// 		if(err) console.error('Error getting passenger:', err);
// 		res.json(allPassengers);
// 	});
// });

router.post('/requestride',function(req,res,next){
  // modify this object to have just the address key
  var rideInfo = {
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    pickUpAddress: req.body.pickUpAddress,
    dropOffAddress: req.body.dropOffAddress,
  };

  Drivers.find({},'',function(error, drivers){
    if(error) console.error(error);

    drivers.forEach(function(driver,index){
      driver.notifications = driver.notifications.concat(rideInfo);
      driver.save();
    });

    console.log('rideInfo: ',rideInfo)
    res.render('ride-req-confirm',{ rideInfo: rideInfo });

  });


});

module.exports = router;
