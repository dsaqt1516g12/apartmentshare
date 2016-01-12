$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

 var authToken = JSON.parse(sessionStorage["auth-token"]);
   var currentFlatsUri = authToken["links"]["current-flat"].uri;

});


$("#formCrearhabitacion").submit(function(e){
      e.preventDefault();
  crearhabitacion($('#description').val(),  $('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#status').val(), $('#price').val(), function(){

	 $("#buttonCrearhabitacion").blur();
		console.log("change");
	  	window.location.replace('listrooms.html');
  		}


	);
});
