$(function(){
   getCurrentUserProfile(function(user){

	$("#stings-list").empty();
      $("#stings-list").append(listItemHTML(user.loginid, user.fullname, user.email, user.phone));
      $("#aProfile").text(user.fullname + ' ');
	$('#loginid').val(user.loginid);
	$('#fullname').val(user.fullname);
	$('#email').val(user.email);
	 $('#phone').val(user.phone)
      $("#aProfile").append('<span class="caret"></span>');
	   
   });
});


$( "#form-signin" ).submit(function( event ) {
  event.preventDefault(); 
  putUsuario($('#loginid').val(), $('#fullname').val(), $('#email').val(), $('#phone').val(), function(){
  	console.log("change");
  	window.location.replace('micuenta.html');
  });
});

 $("#buttonRegresar").click(function(){window.location.replace('indexusuario.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('micuenta.html');
    });

   $("#formEliminarusuario").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
  EliminarUsuario(function(){
  });
 logout(function(){
  });
      $("#buttonEliminarusuario").blur();
	window.location.replace('login.html');
    });

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('login.html');
  });
});

function listItemHTML(loginid, fullname, email, phone ){
 
  var loginid = '<h6 class="list-group-item-heading unclickable" align="center">' +loginid+ '</h6>';
  var fullname = '<h6 class="list-group-item-heading unclickable" align="center">' +fullname+ '</h6>';
  var email = '<h6 class="list-group-item-heading unclickable" align="center">' +email+ '</h6>';
 var phone = '<h6 class="list-group-item-heading unclickable" align="center">' +phone+ '</h6>';
  return loginid +  fullname +email+ phone ;
}
