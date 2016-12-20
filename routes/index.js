var express = require('express');
var passport = require('passport');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

// info routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env });
});

router.get('/info',function(req, res){
    res.render('info');
  });

router.get('/contact',function(req, res){
    res.render('contact');
  });

router.get('/error',function(req, res){
    res.render('error');
  });

router.get('/faq',function(req, res){
    res.render('faq');
  });

router.get('/login',function(req, res){
    res.render('login', { title: 'Login', env: env });
  });

router.get('/onboarding',function(req, res){
    res.render('onboarding');
  });

router.get('/settings',function(req, res){
    res.render('settings');
  });

router.get('/signup',function(req, res){
    res.render('signup');
  });

// driver application routes

router.get('/driver-app-pg1',function(req, res){
    res.render('driver-app-pg1');
  });

router.get('/driver-app-pg2',function(req, res){
    res.render('driver-app-pg2');
  });

router.get('/driver-app-pg3',function(req, res){
    res.render('driver-app-pg3');
  });

router.get('/driver-app-error',function(req, res){
    res.render('driver-app-error');
  });

router.get('/driver-app-done',function(req, res){
    res.render('driver-app-done');
  });

// driver profile/appointment/ride request routes

router.get('/driver-profile-private',function(req, res){
    res.render('driver-profile-private');
  });

router.get('/driver-profile-public',function(req, res){
    res.render('driver-profile-public');
  });

router.get('/driver-ridepage-with-appt',function(req, res){
    res.render('driver-ridepage-with-appt');
  });

router.get('/driver-ridepage-without-appt',function(req, res){
    res.render('driver-ridepage-without-appt');
  });

router.get('/driver-unfulfilled-ride-request',function(req, res){
    res.render('driver-unfulfilled-ride-request');
  });

// driver schedule routes

router.get('/driver-schedule',function(req, res){
    res.render('driver-schedule');
  });

router.get('/driver-schedule-builder-day',function(req, res){
    res.render('driver-schedule-builder-day');
  });

router.get('/driver-schedule-builder-time',function(req, res){
    res.render('driver-schedule-builder-time');
  });

router.get('/driver-schedule-built',function(req, res){
    res.render('driver-schedule-built');
  });

//passenger application routes

router.get('/passenger-verify',function(req, res){
    res.render('passenger-verify');
  });

router.get('/passenger-error',function(req, res){
    res.render('passenger-error');
  });

router.get('/passenger-app-pg1',function(req, res){
  	res.render('passenger-app-pg1');
});

router.get('/passenger-app-pg2',function(req, res){
    res.render('passenger-app-pg2');
  });

router.get('/passenger-app-done',function(req, res){
    res.render('passenger-app-done');
  });

//passenger profile/appointment/schedule routes

router.get('/passenger-profile-private',function(req, res){
    res.render('passenger-profile-private');
  });

router.get('/passenger-profile-public',function(req, res){
  	res.render('passenger-profile-public');
});

router.get('/passenger-ride-with-appt',function(req, res){
    res.render('ppassenger-ride-with-appt');
  });

router.get('passenger-ride-without-appt',function(req, res){
    res.render('passenger-ride-without-appt');
  });

router.get('passenger-unfulfilled-ride-request',function(req, res){
    res.render('passenger-unfulfilled-ride-request');
  });

router.get('passenger-schedule-built',function(req, res){
    res.render('passenger-schedule-built');
  });

//ride request routes

router.get('/new-ride-cancel',function(req, res){
    res.render('new-ride-cancel');
  });

router.get('/old-ride-cancel',function(req, res){
  	res.render('old-ride-cancel');
});

router.get('/ride-map',function(req, res){
    res.render('ride-map');
  });

router.get('/ride-req-confirm',function(req, res){
    res.render('ride-req-confirm');
  });

router.get('/ride-req-driver',function(req, res){
    res.render('ride-req-driver');
  });

router.get('/ride-req-location',function(req, res){
    res.render('ride-req-location');
  });

router.get('/ride-req-location-error',function(req, res){
    res.render('ride-req-location-error');
  });

router.get('/ride-req-perim',function(req, res){
    res.render('ride-req-perim');
  });

router.get('/ride-req-time',function(req, res){
    res.render('ride-req-time');
  });

router.get('/ride-req-unfulfilled',function(req, res){
    res.render('ride-req-unfulfilled');
  });

// calender routes

router.get('/ride-request-cal',function(req, res){
    res.render('ride-request-cal');
  });

router.get('/ride-req-unfulfilled',function(req, res){
    res.render('ride-req-unfulfilled');
  });

// redirects
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});




router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });


module.exports = router;
