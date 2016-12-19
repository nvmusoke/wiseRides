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
router.get('/driver-app-pg1',function(req, res){
    res.render('driver-app-pg1');
  });

router.get('/driver-app-pg2',function(req, res){
    res.render('driver-app-pg2');
  });

router.get('/driver-app-pg3',function(req, res){
    res.render('driver-app-pg3');
  });

router.get('/driver-app-done',function(req, res){
    res.render('driver-app-done');
  });



//passenger routes

router.get('/passenger-app-pg1',function(req, res){
  	res.render('passenger-app-pg1');
});

router.get('/passenger-app-pg2',function(req, res){
    res.render('passenger-app-pg2');
  });

router.get('/passenger-app-done',function(req, res){
    res.render('passenger-app-done');
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


router.get('/passenger-error', function (req, res) {
  res.render('passenger-error');
});

router.get('/passenger-verify', function(req, res, next) {
  res.render('passenger-verify');
});


router.get('/passenger-app-pg1', function(req, res, next) {
  res.render('passenger-app-pg1');
});

router.get('/passenger-app-pg2', function(req, res, next) {
  res.render('passenger-app-pg2');
});
router.get('/passenger-app-done', function(req, res, next) {
  res.render('passenger-app-done');
});
router.get('/info', function(req, res, next) {
  res.render('info');
});
module.exports = router;
