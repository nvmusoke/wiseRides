$(function(){
	console.log('loaded drivers.js');

		function loadDrivers(){
	  $.get('/driverapi/driver-profile-private',function(res){

	    res.forEach(function(driver, index){
	      var firstName = driver.firstName;
	      var lastName = driver.lastName;
	      var password = driver.password;
				var birthday = driver.birthday;
	      var email = driver.email;
	      var phoneNumber = driver.phoneNumber;
				var profileImage = driver.profileImage;
	      var notifications = driver.notifications;
	      var licensePlate = driver.licensePlate;
				var make = driver.make;
	      var model = driver.model;
	      var color = driver.color;
				var wheelChairAccess = driver.wheelChairAccess;
				var cargoSpace = driver.cargoSpace;
	      var lowRise = driver.lowRise;
	      var stepAssistance = driver.stepAssistance;
				var driverId = driver._id;

	      var DriverInfo = [
	        '<li>',
	          '<div class="driver" data-driverid=',driverId,'>',
	              '<section class="firstName">',firstName,'</section>',
	              '<section class="lastName">',lastName,'</section>',
								'<section class="password">',password,'</section>',
	              '<section class="birthday">',birthday,'</section>',
	              '<section class="email">',email,'</section>',
	              '<a class="edit-driver" href="/driver-profile-private">Edit </a>',
	              '<a class="delete-account" href="#">Delete</a>',
	            '</div>',
	          '</li>'
	      ].join('');
				// console.log(DriverInfo);
	      $('.main-content').find('.drivers').prepend(DriverInfo);
	    });
	  });
	};

	function addEventListeners(){

	  $('body').on('click','a.edit-driver',function(event){
	    event.preventDefault();

	    var $driver = $(this).closest('.driver');
	    var driverId = $driver.data('driverid');

	    var firstName = $driver.find('.firstName').text();
	    var lastName = $driver.find('.lastName').text();
			var email = $driver.find('.email').text();

	    $driver.html( [
			'<li>',
				'<div class="driver" data-driverid=',driverId,'>',
		      '<input class="edit-firstName" name="title" value="',firstName,'"/>',
		      '<input class="edit-lastName" name="content" value="',lastName,'"/>',
					'<input class="edit-email" name="content" value="',email,'"/>',
				'</div>',
			'</li>',
			'<button class="send-update">Update</button>'
	    ].join('') );

	  });

	  $('body').on('click','.send-update',function(e){
	    e.preventDefault();

	    var $driver = $(this).closest('.driver');
	    var firstName = $driver.find('.edit-firstName').val();
	    var lastName = $driver.find('.edit-lastName').val();
			var email = $driver.find('.edit-email').val();
	    var driverId = $driver.data('driverid');

	    console.log('firstName: ', firstName);
	    console.log('lastName: ', lastName);

	    var updateDriver = $.ajax({
	      url: '/driverapi',
	      method: 'PUT',
	      data: {
	        firstName: firstName,
	        lastName: lastName,
					email: email,
	        driverId: driverId
	      }
	    });

	    updateDriver.done(function(res){
	      console.log(res);
	      $driver.html( [
					'<li>',
	          '<div class="driver" data-driverid=',driverId,'>',
	              '<section class="firstName">',firstName,'</section>',
	              '<section class="lastName">',lastName,'</section>',
	              '<section class="email">',email,'</section>',
	              '<a class="edit-driver" href="/driver-profile-private">Edit </a>',
	              '<a class="delete-account" href="#">Delete</a>',
	            '</div>',
	          '</li>'
	      ].join('') );
	    });

	    updateDriver.fail(function(err){
	      console.error('There was an error: ', err);
	    });
	  });

		// Delete Post
	$('body').on('click','.delete-account',function(e){
		var $driver = $(this).closest('.driver');
		var driverId = $driver.data('driverid');

		if(!confirm('Are you sure you want to delete this account??')) return;

		var removeDriver = $.ajax({
			method: 'DELETE',
			url: '/driverapi',
			data: { driverId: driverId }
		});

		removeDriver.done(function(response){
			$driver.closest('li').remove();
			console.log('Driver remove success: ', response);
		});

		removeDriver.fail(function(error){
			console.error('Driver remove fail: ', error);
		});
	});


	};

	function main(){
	  addEventListeners();
	  loadDrivers();
	}

	main();
});
