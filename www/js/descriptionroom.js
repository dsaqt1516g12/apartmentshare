$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

	var uri = JSON.parse(sessionStorage["uriroom"]);
   getRoom(uri, function(flats){
      $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 
        flats.creationTimestamp, flats.id, flats.girlorboy, flats.sqm, flats.price, flats.status, flats.fullname, flats.furnished, flats.filename));
   });
});

$("#formuploadajax").on("submit", function(e){
     
	   enviarImagen(function(image){

		});

});

 $("#buttonRegresar").click(function(){window.location.replace('listrooms.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('listrooms.html');
    });

	   $("#formgetfotosroom").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonetfotosroom").blur();
	window.location.replace('roomimages.html');
    });
	
	
$("#formEditarroom").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      $("#buttonEditarroom").blur();
	  	window.location.replace('editarroom.html');
	
    });

 $("#buttonVerhabitaciones").click(function(){window.location.replace('listrooms.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();

	window.location.replace('listrooms.html');

 });

   $("#formEliminarhabitacion").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
		EliminarHabitacion(function(){
	window.location.replace('listrooms.html');
  });

});

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('index.html');
  });
});


$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('micuenta.html');
});

function listItemHTML(uri, address, description,lastModified, creationTimestamp, id, girlorboy, sqm, price, status, fullname, furnished, filename){

if( status == 1){
status = 'Disponible';
}
else if( status == 2){
status = 'No Disponible';
}

if( furnished == 1){
furnished = 'Sí';
}
else if( furnished == 2){
furnished = 'No';
}

if( girlorboy == 0){
girlorboy= 'Indiferente';
}
else if( girlorboy == 1){
girlorboy = 'Sólo chicas';
}
else if (girlorboy == 2){
girlorboy = 'Sólo chicos';
}




lastModifiedformat = lastModified;
var lastModified = new Date( lastModifiedformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

//	if ( girlorboy ==  true){

//		girlorboy = ' Es indiferente ';
 		
//	}


  var a = '<a class="list-group-item" href="'+ '/'+ id + '">';
  var infohab = '<p class="list-group-item-text unclickable">' + ' Información de la habitación ' + '</p>';
  var description = '<h6 class="list-group-item-heading unclickable" align="center">' + 'Descripción de la habitación: ' + description +'</h6>';;
  var g = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Restricción de sexo: ' +  girlorboy +'</h6>';;
  var sqm= '<h6 class="list-group-item-heading unclickable" align="center">'+  'Metros cuatradados de la habitación:' +sqm + ' m²'+ '</h6>';;
  var furnished = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Habitación amueblada: ' +  furnished +'</h6>';;
  var price= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Precio mensual: '+  price +'  (€)'+'</h6>';;
  var status= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Estado: '+  status +'</h6>';;
var filename = '<img  style=width:300px;height:228px; src= http://147.83.7.207:88/img/'+ filename +'>';;

  var creado = '<h6 class="list-group-item-heading unclickable" align="right">'+  'Fecha de creación: ' +'</h6>';;

  var l = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;
  var modificado = '<h6 class="list-group-item-heading unclickable" align="right">'+  'Última modificación: '+'</h6>';;
  var h = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModified +'</h6>';;


  return infohab + description + g + sqm + furnished + price+ status +filename
  + creado +l +modificado +h ;
}
