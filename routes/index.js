var express = require('express');
var passport = require('passport');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env });
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/signup',
  function(req, res){
    res.render('signup');
  });

//driver routes
router.get('/driverapp_pg1',function(req, res){
    res.render('driverapp_pg1');
  });

router.get('/driverapp_pg2',function(req, res){
    res.render('driverapp_pg2');
  });

router.get('/driverapp_pg3',function(req, res){
    res.render('driverapp_pg3');
  });

router.get('/driverapp_done',function(req, res){
    res.render('driverapp_done');
  });



//passenger routes

router.get('/passengerapp_pg1',function(req, res){
  	res.render('passengerapp_pg1');
});

router.get('/passengerapp_pg2',function(req, res){
    res.render('passengerapp_pg2');
  });

router.get('/passengerapp_done',function(req, res){
    res.render('passengerapp_done');
  });



router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });


router.get('/passengerno', function (req, res) {
  res.render('passengerno');
});

router.get('/passengerverify', function(req, res, next) {
  res.render('passengerverify');
});


router.get('/passengerapp_pg1', function(req, res, next) {
  res.render('passengerapp_pg1');
});

router.get('/passengerapp_pg2', function(req, res, next) {
  res.render('passengerapp_pg2');
});
router.get('/passengerapp_done', function(req, res, next) {
  res.render('passengerapp_done');
});
module.exports = router;
