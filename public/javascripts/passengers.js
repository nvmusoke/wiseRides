$(function(){
	console.log('loaded passenger.js');

function getNotifications(){
// use ajax to get notifsactions
	var request = $.ajax({
		url: 'rideapi/notifications',
		method: 'GET'
	});

	request.done(function(res){
		var numberOfNotifications = res.notifications.length;
		if (numberOfNotifications == 0){
			$('#notifications').html('<h2 class="header-text purple-text" style="margin: 0; text-align: center;">No Notifications</h2>');
		}

		$('.pushNotification').append([
			'<div class="num-notification">',numberOfNotifications,'</div>'
		].join(''));

		res.notifications.forEach(function(notification, index){
			// $('#notifications').html('');
			$('#notifications').prepend([
				'<div>', '<br>',
				'<div>',notification.name,'</div>',
				'<div>',notification.date.replace('T00:00:00.000Z',''),'</div>',
				'<div>',notification.time,'</div>',
				'<div>',notification.pickUpAddress,'</div>',
				'<div>',notification.dropOffAddress,'</div>',
				'<button class="btn-accept-ride">','Accept Ride','</button>',
				'</div>'
			].join(''));
		});
	});
// populate notifications in the dom

}

function addEventListeners(){

	$('.nav-ride').on('click', function(e){
		getNotifications();
	});

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
	getNotifications();
  addEventListeners();
  // loadPassengers();
	// loadOnePassenger();
}
	main();
});
