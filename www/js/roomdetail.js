var API_BASE_URL = "http:/147.83.7.207:8888/apartmentshare";


//Función que ejecuta al cargar, escoger esta opción para cuando se carge la información de una habitación.
//window.onload = initialize_distance('London Eye, London', 51.503454,-0.119562,'Palace of Westminster, London', 51.499633,-0.124755);
window.onload = getRoom($('#getRoomId').val());


//*************************** VISUALIZAR DISTANCIA ENTRE CAMPUS Y ROOM *********************************************************************
// PASARLE EL ID DE LA ROOM PARA QUE CALCULE LA DISTANCIA ENTRE EL PISO DE LA ROOM Y EL CAMPUS ASOCIADO AL PISO.

function getRoom(todo_id) {
	var url = API_BASE_URL + '/rooms/' + todo_id;
	$("#result2").text('');
	$("#result_code").text('');
		
	$.ajax({
		url : url,
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