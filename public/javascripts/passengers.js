$(function(){
	console.log('loaded passenger.js');

	// 	function loadPassengers(){
	//   $.get('/passengerapi/passengers',function(res){
	//
	//     res.forEach(function(passenger, index){
	//       var firstName = passenger.firstName;
	//       var lastName = passenger.lastName;
	//       var password = passenger.password;
	// 			var birthday = passenger.birthday;
	//       var email = passenger.email;
	//       var streetAddress = passenger.streetAddress;
	// 			var city = passenger.city;
	//       var state = passenger.state;
	//       var phoneNumber = passenger.phoneNumber;
	// 			var profileImage = passenger.profileImage;
	//       var notifications = passenger.notifications;
	//       var wheelChairAccess = passenger.wheelChairAccess;
	// 			var cargoSpace = passenger.cargoSpace;
	//       var lowRise = passenger.lowRise;
	//       var stepAssistance = passenger.stepAssistance;
	// 			var passengerId = passenger._id;
	//
	//       var PassengerInfo = [
	//         '<li>',
	//           '<div class="passenger" data-passengerid=',passengerId,'>',
	//               '<section class="firstName">',firstName,'</section>',
	//               '<section class="lastName">',lastName,'</section>',
	// 							'<section class="password">',password,'</section>',
	//               '<section class="birthday">',birthday,'</section>',
	//               '<section class="email">',email,'</section>',
	//               '<a class="edit-passenger" href="/passenger-profile-private">Edit </a>',
	//               '<a class="delete-account" href="#">Delete</a>',
	//             '</div>',
	//           '</li>'
	//       ].join('');
	// 			console.log(PassengerInfo);
	//       $('.main-content').find('ul.addedPassengers').prepend(PassengerInfo);
	//     });
	//   });
	// };

	// get single passenger
// 	function loadOnePassenger(passengerId){
// 	$.get('/passengerapi/' + passengerId, function(res){
//
// 	    res.forEach(function(passenger, index){
// 			var firstName = passenger.firstName;
// 			var lastName = passenger.lastName;
// 			var password = passenger.password;
// 			var birthday = passenger.birthday;
// 			var email = passenger.email;
// 			var streetAddress = passenger.streetAddress;
// 			var city = passenger.city;
// 			var state = passenger.state;
// 			var phoneNumber = passenger.phoneNumber;
// 			var profileImage = passenger.profileImage;
// 			var notifications = passenger.notifications;
// 			var wheelChairAccess = passenger.wheelChairAccess;
// 			var cargoSpace = passenger.cargoSpace;
// 			var lowRise = passenger.lowRise;
// 			var stepAssistance = passenger.stepAssistance;
// 			var passengerId = passenger._id;
//
// 			var singlePassengerInfo = [
// 				'<li>',
// 					'<div class="passenger" data-passengerid=',passengerId,'>',
// 							'<section class="firstName">',firstName,'</section>',
// 							'<section class="lastName">',lastName,'</section>',
// 							'<section class="password">',password,'</section>',
// 							'<section class="birthday">',birthday,'</section>',
// 							'<section class="email">',email,'</section>',
// 							'<a class="edit-passenger" href="/passenger-profile-private">Edit </a>',
// 							'<a class="delete-account" href="#">Delete</a>',
// 						'</div>',
// 					'</li>'
// 			].join('');
// 			console.log(singlePassengerInfo);
// 			$('.secondary-content').find('ul.addSinglePassenger').prepend(singlePassengerInfo);
// 		});
// 	});
// };

function addEventListeners(){

  $('body').on('click','a.edit-passenger',function(event){
    event.preventDefault();
    var $passenger = $(this).closest('.passenger');
    var passengerId = $passenger.data('passengerid');
    var firstName = $passenger.find('.firstName').text();
    var lastName = $passenger.find('.lastName').text();
		var email = $passenger.find('.email').text();

    $passenger.html( [
		'<li>',
			'<div class="passenger" data-passengerid=',passengerId,'>',
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
  var $passenger = $(this).closest('.passenger');
  var firstName = $passenger.find('.edit-firstName').val();
  var lastName = $passenger.find('.edit-lastName').val();
	var email = $passenger.find('.edit-email').val();
  var passengerId = $passenger.data('passengerid');
  var updatePassenger = $.ajax({
    url: '/passengerapi',
    method: 'PUT',
    data: {
      firstName: firstName,
      lastName: lastName,
			email: email,
      passengerId: passengerId
    }
  });

  updatePassenger.done(function(res){
    console.log(res);
    $passenger.html( [
			'<li>',
        '<div class="passenger" data-passengerid=',passengerId,'>',
            '<section class="firstName">',firstName,'</section>',
            '<section class="lastName">',lastName,'</section>',
            '<section class="email">',email,'</section>',
            '<a class="edit-passenger" href="/passenger-profile-private">Edit </a>',
            '<a class="delete-account" href="#">Delete</a>',
          '</div>',
        '</li>'
    ].join('') );
  });

  updatePassenger.fail(function(err){
    console.error('There was an error: ', err);
  });
});

	// Delete Post
$('body').on('click','.delete-account',function(e){
	var $passenger = $(this).closest('.passenger');
	var passengerId = $passenger.data('passengerid');
	if(!confirm('Are you sure you want to delete this account??')) return;
	var removePassenger = $.ajax({
		method: 'DELETE',
		url: '/passengerapi',
		data: { passengerId: passengerId }
	});

		removePassenger.done(function(response){
			$passenger.closest('li').remove();
			console.log('Passenger remove success: ', response);
		});

		removePassenger.fail(function(error){
			console.error('Passenger remove fail: ', error);
		});
	});
};

function main(){
  addEventListeners();
  // loadPassengers();
	// loadOnePassenger();
}
	main();
});
