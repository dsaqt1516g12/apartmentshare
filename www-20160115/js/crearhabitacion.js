$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   var currentFlatsUri = authToken["links"]["current-flat"].uri;

});

/*
$("#formCrearhabitacion").submit(function(e){
      e.preventDefault();
  crearhabitacion($('#description').val(),  $('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#status').val(), $('#price').val(), function(){

	 $("#buttonCrearhabitacion").blur();
		console.log("change");
	  	window.location.replace('listrooms.html');
  		}


	);
});
*/



$("#formCrearhabitacion").submit(function(e){
    e.preventDefault();

$("#result").text('');
  
  if($('#description').val() == "" || $('#girlorboy').val()=="" || $('#sqm').val()=="" || $('#furnished').val()=="" || $('#status').val()=="" || $('#price').val()=="") {
    console.log ("alo");
    $('<div class="alert alert-info">Debes rellenar todos los campos para crear un piso</div>').appendTo($("#result"));
  
  }
  else if (isNaN($('#sqm').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero en los metros cuadrados de la habitación</div>').appendTo($("#result"));
    }
 else if (isNaN($('#price').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero para el precio</div>').appendTo($("#result"));
    }

  
    else{

    crearhabitacion($('#description').val(),  $('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#status').val(), $('#price').val(), function(){
        $("#buttonCrearhabitacion").blur();
      console.log("change");

        window.location.replace('listrooms.html');
      }
  );
}
});