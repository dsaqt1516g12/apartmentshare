$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   var currentFlatsUri = authToken["links"]["current-flat"].uri;

	$.ajax({
			    	type: 'GET',
			   		url: 'http://localhost:8080/apartmentshare/flat',
			    	headers: {
					"X-Auth-Token":authToken.token
			    	}
			    })

});

$("#formCrearhabitacion").submit(function(e){
      e.preventDefault();
  crearhabitacion($('#description').val(),  $('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#status').val(), $('#price').val(), function(){
  });

      $("#buttonCrearhabitacion").blur();
	console.log("change");
  	window.location.replace('listrooms.html');
    });

