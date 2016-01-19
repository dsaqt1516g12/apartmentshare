$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

$("#result").text('');
$("#formEditarpiso").submit(function(e){
    e.preventDefault();

if (isNaN($('#numrooms').val())){
        $('<div class="alert alert-danger"> <strong>Error!</strong> Debes poner un numero entero para el numero de habitaciones</div>').appendTo($("#result"));
    }
  else if (isNaN($('#sqm').val())){
        $('<div class="alert alert-danger"> <strong>Error!</strong> Debes poner un numero entero en los metros cuadrados del piso</div>').appendTo($("#result"));
    }
   else if (isNaN($('#fianza').val())){
        $('<div class="alert alert-danger"> <strong>Error!</strong> Debes poner un numero entero para la fianza</div>').appendTo($("#result"));
    }
   
    else{


  	putpiso($('#campusid').val(),  $('#address').val(), $('#description').val(), $('#numpartner').val(), $('#smoker').val(), 
  		$('#pets').val(),$('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#numrooms').val(), $('#numbathrooms').val(), 
  		$('#elevator').val(), $('#plantnum').val(), $('#internet').val(), $('#fianza').val(), $('#estancia').val(), 
  		function() {
		  	window.location.replace('descriptionflat.html');
			window.location.reload();
		  }
	);
  	        $('<div class="alert alert-success"> <strong>OK!</strong> Edición finalizada con éxito</div>').appendTo($("#result"));

  }
});

   $("#formAtras").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      $("#buttonAtras").blur();
	  	window.location.replace('descriptionflat.html');
	
    });

var uri = JSON.parse(sessionStorage["uri-flat"]);

   getFlat(uri, function(flats){

		
	sessionStorage["idflat"] = JSON.stringify(flats.id);
	var id = JSON.parse(sessionStorage["idflat"]);
	console.log(id);


	$('#campusid').val(flats.campusid);
	$('#address').val(flats.address);
	$('#smoker').val(flats.smoker);
	$('#pets').val(flats.pets),
	$('#smoker').val(flats.smoker);
	$('#furnished').val(flats.furnished);
	$('#numrooms').val(flats.numrooms);
	$('#numrooms').val(flats.numrooms);
	$('#numbathrooms').val(flats.numbathrooms);
	$('#girlorboy').val(flats.girlorboy);
	$('#plantnum').val(flats.plantnum);
	$('#sqm').val(flats.sqm);
	$('#elevator').val(flats.elevator);
	$('#internet').val(flats.internet);
	$('#numpartner').val(flats.numpartner);
	$('#estancia').val(flats.estancia);
	$('#fianza').val(flats.fianza);
	$('#description').val(flats.description);


      $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 
      	flats.creationTimestamp, flats.numpartner, flats.smoker));
   });
});


$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('login.html');
  });
});


$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('micuenta.html');
});
function listItemHTML(uri, address, description,lastModifield, creationTimestamp, numpartner, smoker){

if( smoker == 1){
smoker= 'Si';
}
else if( smoker == 2){
smoker = 'No';
}
else if (smoker == 0){
	smoker='Indiferente'
}
if( numpartner == 5){
numpartner= '5 o más';
}

lastModifiedformat = lastModified;
var lastModified = new Date( lastModifiedformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

 // var a = '<a class="list-group-item" href="'+ uri +'/'+ id + '</a>';
  var p = '<p class="list-group-item-text unclickable">' + 'Descripción del piso: '+ description+ '</p>';
  var m = '<m class="list-group-item-text unclickable">' +  'Dirección del piso: '+ address+ '</m>';


 var numpartner = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Numero de compañeros: '+  numpartner +'</h6>';;
 var smoker = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Se permiten fumadores: '+  smoker +'</h6>';;


 var creationTimestamp = '<h6 class="list-group-item-heading unclickable" align="right">'+ 'Fecha de creacón : ' + creationTimestamp +'</h6>';;
  var lastModified = '<h6 class="list-group-item-heading unclickable" align="right">'+ 'Ultima modificacion: '+   lastModified +'</h6>';;
  return p + m + numpartner +smoker  + creationTimestamp + lastModified;
}



