var uri = JSON.parse(sessionStorage["uri-rooms2"]);

window.onload = getRoom(uri);

   getRooms(uri, function(flats){
      $("#stings-list").empty();
        $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 
        flats.creationTimestamp, flats.id, flats.girlorboy, flats.sqm, flats.price, flats.status, flats.fullname, flats.furnished,
        flats.phone, flats.email, flats.numpartner, flats.smoker, flats.pets, flats.numrooms, flats.numbathrooms, flats.elevator, flats.plantnum,
        flats.internet, flats.fianza, flats.estancia, flats.campusname, flats.campusaddress, flats.filename));
   });


 $("#buttonRegresar").click(function(){window.location.replace('index.html')});

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
    window.location.replace('micuenta.html');
});

function listItemHTML(uri, address, description,lastModified, creationTimestamp, id, girlorboy, sqm, price, status, fullname, furnished, phone, email, numpartner, smoker, pets, numrooms, numbathrooms, elevator, plantnum, internet, fianza, estancia, campusname, campusaddress, filename){

if( status == 1){
status = 'Disponible';
}
else if( status == 2){
status = 'No Disponible';
}

if (smoker == 1){
  smoker = 'Sí';
}else if (smoker==2){
  smoker = 'No';
} else if (smoker==0){
  smoker = 'Indiferente';
} 

if( furnished == 1){
furnished = 'Sí';
}
else if( furnished == 2){
furnished = 'No';
}
if( pets == 1){
pets = 'Sí';
}
else if( pets == 2){
pets = 'No';
}
else if( pets == 0){
pets = 'Indiferente';
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

if( elevator == 1){
elevator = 'Sí';
}
else if( elevator == 0){
elevator = 'No';
}

if( plantnum == 0){
plantnum = 'Bajos / Edificio sin plantas';
}

if( internet == 1){
internet = 'Sí';
}
else if( internet == 0){
internet = 'No';
}

if( estancia == 12){
estancia = '12 o más';
}
if( numpartner == 5){
numpartner = '5 o más';
}

lastModifiedformat = lastModified;
var lastModified = new Date( lastModifiedformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

  var a = '<a class="list-group-item" href="'+ '/'+ id + '">';
  var infohab = '<p class="list-group-item-text unclickable">' + ' Información de la habitación ' + '</p>';
  var description = '<h6 class="list-group-item-heading unclickable" align="center">' + 'Descripción de la habitación: ' + description +'</h6>';;
  var g = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Restricción de sexo: ' +  girlorboy +'</h6>';;
  var sqm= '<h6 class="list-group-item-heading unclickable" align="center">'+  'Metros cuatradados de la habitación:' +sqm + ' m²'+ '</h6>';;
  var furnished = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Habitación amueblada: ' +  furnished +'</h6>';;
  var price= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Precio mensual: '+  price +'  (€)'+'</h6>';;
  var status= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Estado: '+  status +'</h6>';;
  var infopiso = '<p class="list-group-item-text unclickable">' + ' Información del piso' + '</p>';
  var numpartner= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Número de compañeros/as: '+  numpartner +'</h6>';;
  var smoker= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Se admiten fumadores: '+  smoker +'</h6>';;
  var pets= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Se admiten mascotas: '+  pets +'</h6>';;
  var numrooms= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Numero de habitaciones del piso: '+  numrooms +'</h6>';;
  var numbathrooms= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Numero de cuartos de baño del piso: '+  numbathrooms +'</h6>';;
  var elevator= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Dispone de ascensor: '+  elevator +'</h6>';;
  var plantnum= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Planta del piso: '+  plantnum +'</h6>';;
  var internet= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Dispone de acceso a Internet: '+  internet +'</h6>';;
  var fianza= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Fianza a depositar: '+  fianza + ' (€)' + '</h6>';;
  var estancia= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Estancia del piso: '+  estancia + ' meses' + '</h6>';;
  var campusname= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Nombre del Campus: '+  campusname  + '</h6>';;
  var campusaddress= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Dirección del Campus: '+  campusaddress  + '</h6>';;
  var flatdescription= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Descripcion del piso: '+  flatdescription  + '</h6>';;
  var flatsqm= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Descripcion del piso: '+  flatsqm  + '</h6>';;

  var infouser = '<p class="list-group-item-text unclickable">' + ' Información del anunciante' + '</p>';
  var fullname = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Nombre del anunciante: '+  fullname +'</h6>';;
  var email = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Correo electrónico: '+ email +'</h6>';;
  var phone = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Teléfono: '+ phone +'</h6>';;

  var creado = '<h6 class="list-group-item-heading unclickable" align="right">'+  'Fecha de creación: ' +'</h6>';;
  var l = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;
  var modificado = '<h6 class="list-group-item-heading unclickable" align="right">'+  'Última modificación: '+'</h6>';;
  var h = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModified +'</h6>';;

var filename = '<img  style=width:300px;height:228px; src= http://147.83.7.207:88/img/'+ filename +'>';;


  return infohab + description + g + sqm + furnished + price+ status +
  infopiso+ numpartner+smoker + pets + numrooms + numbathrooms + elevator+ plantnum + internet + fianza + estancia + campusname + campusaddress 
  +infouser + fullname + email +phone+ creado
  +l +modificado +h+ filename ;
}



function getRoom(todo_id) {
  $("#result2").text('');
  $("#result_code").text('');

    
  $.ajax({
    url : todo_id,
    type : 'GET',
    crossDomain : true,
    dataType : 'json',
    contentType : 'application/json',
    statusCode: {
      200: function() {$('<div class="alert alert-success"> <strong>Ok!</strong></div>').appendTo($("#result_code"));},
      202: function() {$('<div class="alert alert-success"> <strong>Accepted!</strong> </div>').appendTo($("#result_code"));},
      400: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Bad Request </div>').appendTo($("#result_code"));},
      404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Recipient not found </div>').appendTo($("#result_code"));},
      409: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Conflict </div>').appendTo($("#result_code"));}
    }
  }).done(function(data, status, jqxhr) {
    var room = data;
    var geocoder = new google.maps.Geocoder();
    var address =room.address;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK)
      {
        initialize_distance(room.address,results[0].geometry.location.lat(),results[0].geometry.location.lng(),room.campusname,room.latitud,room.longitud);
      }
    });
        
    
}).fail(function() {
    $('<div class="alert alert-danger"> <strong>No existe</strong> una receta con ese titulo</div>').appendTo($("#result2"));
  });

}




function initialize_distance(origin_name,origin_latitud,origin_longitud,destination_name,destionation_latitud,destination_longitud) {
    // Change a few 'var variableName' to 'window.' This lets us set global variables from within our function
    window.directionsService = new google.maps.DirectionsService();
    window.directionsDisplay = new google.maps.DirectionsRenderer();
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers (Start & end destination)
    window.markers = [
        [origin_name, origin_latitud,origin_longitud],
        [destination_name, destionation_latitud,destination_longitud]
    ];
    
    // Render our directions on the map
    directionsDisplay.setMap(map);

    // Set the current route - default: walking
    calcRoute(type);
    
}

// Calculate our route between the markers & set/change the mode of travel
function calcRoute(type) {
  //getRoom($('#getRoomId').val());
  var selectedMode =type;
    var request = {
        // London Eye
        origin: new google.maps.LatLng(markers[0][1], markers[0][2]),
        // Palace of Westminster
        destination: new google.maps.LatLng(markers[1][1], markers[1][2]),
        // Set our mode of travel - default: walking
        travelMode: google.maps.TravelMode[selectedMode]
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}
