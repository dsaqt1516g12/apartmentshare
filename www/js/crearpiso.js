$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   var currentFlatsUri = authToken["links"]["current-flat"].uri;


});

$("#formCrearpiso").submit(function(e){
    e.preventDefault();

$("#result").text('');
  
  if($('#campusid').val() == "" || $('#address').val()=="" || $('#smoker').val()=="" || $('#numrooms').val()=="" || $('#pets').val()=="" || $('#numbathrooms').val()=="" || $('#girlorboy').val()==""
    || $('#furnished').val()=="" || $('#plantnum').val()=="" || $('#elevator').val()=="" || $('#internet').val()==""|| $('#sqm').val()=="" || $('#estancia').val()==""
    || $('#numpartner').val()=="" || $('#fianza').val()=="" || $('#description').val()=="") {
    console.log ("hola");
    $('<div class="alert alert-info">Debes rellenar todos los campos para crear un piso</div>').appendTo($("#result"));
  
  }
   else if (isNaN($('#numrooms').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero para el numero de habitaciones</div>').appendTo($("#result"));
    }
  else if (isNaN($('#sqm').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero en los metros cuadrados del piso</div>').appendTo($("#result"));
    }
   else if (isNaN($('#fianza').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero para la fianza</div>').appendTo($("#result"));
    }
   
    else{

  	crearpiso($('#campusid').val(),  $('#address').val(), $('#description').val(), $('#numpartner').val(), $('#smoker').val(), 
  		$('#pets').val(),$('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#numrooms').val(), $('#numbathrooms').val(), 
  		$('#elevator').val(), $('#plantnum').val(), $('#internet').val(), $('#fianza').val(), $('#estancia').val(), 
  		function() {
		  	$("#buttonCrearpiso").blur();
			console.log("change");

		  	window.location.replace('apartmentshare.html');
		  }
	);
}
});



/*
$("#formCrearpiso").click(function(e){
  
  e.preventDefault();

  $("#result").text('');
  
  if($('#campusid').val() == "" || $('#address').val()=="" || $('#smoker').val()=="" || $('#numrooms').val()=="" || $('#pets').val()=="" || $('#numbathrooms').val()=="" || $('#girlorboy').val()==""
    || $('#furnished').val()=="" || $('#plantnum').val()=="" || $('#elevator').val()=="" || $('#internet').val()==""|| $('#sqm').val()=="" || $('#estancia').val()==""
    || $('#numpartner').val()=="" || $('#fianza').val()=="" || $('#description').val()=="") {
    console.log ("hola");
    $('<div class="alert alert-info">Rellena todos los campos</div>').appendTo($("#result"));
  
  }
  else if (isNaN($('#sqm').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero en los metros cuadrados del piso</div>').appendTo($("#result"));
    }
 else if (isNaN($('#fianza').val())){
        $('<div class="alert alert-success"> <strong>Error!</strong> Debes poner un numero entero para la fianza</div>').appendTo($("#result"));
    }

  
    else{
  
    FormCrearpiso(Game);
  }


});

function FormCrearpiso(){
    crearpiso($('#campusid').val(),  $('#address').val(), $('#description').val(), $('#numpartner').val(), $('#smoker').val(), 
      $('#pets').val(),$('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#numrooms').val(), $('#numbathrooms').val(), 
      $('#elevator').val(), $('#plantnum').val(), $('#internet').val(), $('#fianza').val(), $('#estancia').val(), 
      function() {
        $("#buttonCrearpiso").blur();
      console.log("change");

        window.location.replace('apartmentshare.html');
      }
  );
});

*/