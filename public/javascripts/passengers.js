// $(function(){
// 	console.log('loaded passengers.js');
//
// 		function loadPassenger(){
// 	  $.get('/passenger-app-done',function(res){
//
// 	//     res.forEach(function(passenger, index){
// 	//       var firstName = passenger.firstName;
// 	//       var lastName = passenger.lastName;
// 	//       var email = passenger.email;
// 	//       var id = passenger._id;
// 	//
// 	//       var passengerInfo = [
// 	//         '<li>',
// 	//           '<div class="passenger" data-passengerid=',id,'>',
// 	//               '<section class="firstName">',firstName,'</section>',
// 	//               '<section class="lastName">',lastName,'</section>',
// 	//               '<section class="email">',email,'</section>',
// 	//               '<a class="edit-info" href="#">Edit </a>',
// 	//               '<a class="delete-account" href="#">Delete</a>',
// 	//             '</div>',
// 	//           '</li>'
// 	//       ].join('');
// 	//
// 	//       $('.main-content').find('ul.passenger').prepend(passengerInfo);
// 	//     });
// 	//
// 	//   });
// 	// };
//
// 	function addEventListeners(){
//
// 	  $('body').on('click','a.edit-passenger',function(event){
// 	    event.preventDefault();
//
// 	    var $passenger = $(this).closest('.passenger');
// 	    var passengerId = $passenger.data('passengerid');
//
// 	    var passengerFirstName = $passenger.find('.firstName').text();
// 	    var passengerLastName = $passenger.find('.lastName').text();
//
// 	    $passenger.html( [
// 	      '<input class="edit-firstName" name="title" value="',passengerFirstName,'"/>',
// 	      '<input class="edit-lastName" name="content" value="',passengerLastName,'"/>',
// 	      '<button class="send-update">Update</button>'
// 	    ].join('') );
//
// 	  });
//
// 	  $('body').on('click','.send-update',function(e){
// 	    e.preventDefault();
//
// 	    var $passenger = $(this).closest('.passenger');
// 	    var passengerFirstName = $passenger.find('.edit-firstName').val();
// 	    var passengerLastName = $passenger.find('.edit-lastName').val();
// 	    var passengerId = $passenger.data('passengerid');
//
// 	    console.log('firstName: ', firstName);
// 	    console.log('lastName: ', lastName);
//
// 	    var updatePassenger = $.ajax({
// 	      url: '/passenger-profile-private',
// 	      method: 'PUT',
// 	      data: {
// 	        firstName: firstName,
// 	        lastName: lastName,
// 	        id: id
// 	      }
// 	    });
//
// 	    updatePassenger.done(function(res){
// 	      console.log(res);
// 	      $passenger.html( [
// 	        '<section class="firstName">',firstName,'</section>',
// 	        '<section class="lastName">',lastName,'</section>',
// 	        '<a class="edit-info" href="#">Edit </a>',
// 	        '<a class="delete-account" href="#">Delete</a>',
// 	      ].join('') );
// 	    });
//
// 	    updatePassenger.fail(function(err){
// 	      console.error('There was an error: ', err);
// 	    });
// 	  });
//
//
// 	};
//
// 	function main(){
// 	  addEventListeners();
// 	  loadPassenger();
// 	}
//
// 	main();
// });
