$(function(){
	console.log('loaded drivers.js');

// 	function loadDrivers(driver, index){
//
// 		$.ajax({
// 			type: 'GET',
// 			url: 'http://localhost:3000/driverapi/driver',
// 			data: {
// 				 firstName: 'firstName',
// 	       lastName: 'lastName',
// 	       password: 'password',
// 				 birthday: 'birthday',
// 	       email: 'email',
// 	       phoneNumber: 'phoneNumber',
// 				 profileImage: 'profileImage',
// 	       notifications: 'notifications',
// 	       licensePlate: 'licensePlate',
// 				 make: 'make',
// 	       model: 'model',
// 	       color: 'color',
// 				 wheelChairAccess: 'wheelChairAccess',
// 				 cargoSpace: 'cargoSpace',
// 	       lowRise: 'lowRise',
// 	       stepAssistance: 'stepAssistance',
// 				 driverId: '_id'
// 			},
//
// 			beforeSend:function(){
// 		    // this is where we append a loading image
// 		    $('.driver').html('<div class="loading"><img src="/images/passenger-photo.jpg" alt="Loading..." /></div>');
// 		  },
// 			success:function(data){
// 				console.log(driver);
//     // successful request; do something with the data
// 			$(data).find('item').each(function(i){
// 				$('.driver').append('<h4>' + $(this).find(firstName).text() + '</h4><p>' + $(this).find('lastName').text() + '</p>');
// 			});
// 			console.log(data);
// 		},
// 			error:function(){
//     // failed request; give feedback to user
//     $('#ajax-panel').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
//   }
// });
// };

//   $.get('/driverapi/driver-profile-private',function(res){
//
//     res.forEach(function(driver, index){
//        firstName: firstName;
//        lastName: lastName;
//        password: password;
// 			 birthday: birthday;
//        email: email;
//        phoneNumber: phoneNumber;
// 			 profileImage: profileImage;
//        notifications: notifications;
//        licensePlate: licensePlate;
// 			 make: make;
//        model: model;
//        color: color;
// 			 wheelChairAccess: wheelChairAccess;
// 			 cargoSpace: cargoSpace;
//        lowRise: lowRise;
//        stepAssistance: stepAssistance;
// 			 driverId: _id;
//
//       var DriverInfo = [
//         '<li>',
//           '<div class="driver" data-driverid=',driverId,'>',
//               '<section class="firstName">',firstName,'</section>',
//               '<section class="lastName">',lastName,'</section>',
// 							'<section class="password">',password,'</section>',
//               '<section class="birthday">',birthday,'</section>',
//               '<section class="email">',email,'</section>',
//               '<a class="edit-driver" href="/driver-profile-private">Edit </a>',
//               '<a class="delete-account" href="#">Delete</a>',
//             '</div>',
//           '</li>'
//       ].join('');
// 			// console.log(DriverInfo);
//       $('.main-content').find('.drivers').prepend(DriverInfo);
//     });
//   });
// };
//
function addEventListeners(){

	$('#driverAlert').on('click', function(event){
		event.preventDefault();
		alert('Please check your email for confirmation');
		console.log('alert sent');
		window.location = '/';
	});

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

//select item from drop down menu
	$(".dropdown-menu li a").click(function(){
	  $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
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
  // loadDrivers();
}
	main();
});
