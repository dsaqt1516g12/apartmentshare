$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   //var currentFlatsUri = authToken["links"]["current-flat"].uri;

  $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/apartmentshare',
            headers: {
          "X-Auth-Token":authToken.token
            }
          })
});




var uri = JSON.parse(sessionStorage["uri-rooms2"]);
   getRooms(uri, function(flats){
      $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 
        flats.creationTimestamp, flats.id, flats.girlorboy, flats.sqm, flats.price, flats.status, flats.fullname, flats.furnished));
   });


 $("#buttonRegresar").click(function(){window.location.replace('indexusuario.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('indexusuario.html');
    });

$("#formEnviarmensaje").submit(function(e){
    e.preventDefault();
  	enviarMensaje($('#text').val(), 
  		function() {
		  	$("#buttonEnviarmensaje").blur();
			console.log("change");
			opener.location.reload('descriptionroom2logueado.html');
		  	window.location.replace('descriptionroom2logueado.html');
		  }
	);
});

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('index.html');
  });
});
$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('perfil.html');
});

function listItemHTML(uri, address, description,lastModified, creationTimestamp, id, girlorboy, sqm, price, status, fullname, furnished){

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


lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

  var a = '<a class="list-group-item" href="'+ '/'+ id + '">';
  var p = '<p class="list-group-item-text unclickable">' + ' Descripción: ' + description+ '</p>';
  var g = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Restricción de sexo: ' +  girlorboy +'</h6>';;
  var sqm= '<h6 class="list-group-item-heading unclickable" align="center">'+  'Metros cuatradados de la habitación:' +sqm + ' m²'+ '</h6>';;
  var furnished = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Habitación amueblada: ' +  furnished +'</h6>';;
  var price= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Precio: '+  price +'  (€)'+'</h6>';;
  var status= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Estado: '+  status +'</h6>';;
  var fullname= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Anuncio creado por el usuario: ' +  fullname +'</h6>';;
  var l = '<h6 class="list-group-item-heading unclickable" align="right"> '+'Ultima modificacion: '+  creationTimestamp +'</h6>';;
  var h = '<h6 class="list-group-item-heading unclickable" align="right">' +'Ultima modificacion: '+  lastModified +'</h6>';;


  return p + g + sqm + furnished + price+ status + fullname + l ;
}
