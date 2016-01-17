var API_BASE_URL = "http:/147.83.7.207:8888/apartmentshare";



//Función que ejecuta al cargar, escoger esta para crear piso y para el filtro donde se selecciona el campus.
window.onload = getCampus;



//google.maps.event.addDomListener(window, 'load', initialize);
function getCampus() {
			var url = API_BASE_URL +'/campus';
			$("#result2").text('');
			$("#result_code").text('');
			//$("<select id='first-choice'>").appendTo($('#result2'));
			$("<option selected value='base'>Selecciona un Campus</option>").appendTo($('#result2'));
			$.ajax({
				url : url,
				type : 'GET',
				crossDomain : true,
				dataType : 'json',
				contentType : 'application/json',
			}).done(
					function(data, status, jqxhr) {
						var campus = data;
						$.each(campus, function(i, v) {
							var campus = v;
							$.each(campus, function(i, v) {
								var campuss = v;
								$("<option value='" + campuss.id + "'>"+ campuss.campusname +"</option>").appendTo($('#result2'));			
							});	
						});
					}).fail(function() {
				$("#result").text("No List Campus.");
			});
			$("</select>").appendTo($('#result2'));

}

function initialize(Lat,Lng,name,address) {
		var mapCanvas = document.getElementById('map');
		var mapOptions = {
		  center: new google.maps.LatLng(Lat, Lng),
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		var map = new google.maps.Map(mapCanvas, mapOptions);
		var marker = new google.maps.Marker({
		position: new google.maps.LatLng(Lat, Lng),
		map: map,
		title: name +', ' + address
		});
}

function doneTyping () {
	e.preventDefault();
	alert("Hello! I am an alert box!!");
	$("address").each(function(){                         
    var embed ="<iframe width='425' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( $('#myaddress').val() ) +"&amp;output=embed'></iframe>";
                                $(this).html(embed);
                             
   });
}



function getCampusByID(todo_id) {
	var url = API_BASE_URL + '/campus/' + todo_id;
	$("#result").text('');
	$("#result_code").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		contentType : 'application/json',
	}).done(function(data, status, jqxhr) {
		var campus = data;

		$('<strong> Título: </strong> ' + campus.id + '<br>').appendTo($('#result'));
		$('<strong> Dificultad </strong> ' + campus.campusname + '<br>').appendTo($('#result'));
		$('<strong> Autor: </strong> ' + campus.address + '<br>').appendTo($('#result'));
		$('<strong> Ingredientes </strong> ' + campus.longitud + '<br>').appendTo($('#result'));
		$('<strong> Preparación: </strong> ' + campus.latitud + '<br>').appendTo($('#result'));
		$('<br> <br>').appendTo($('#result'));
		initialize(campus.latitud,campus.longitud,campus.campusname,campus.address);
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>No existe</strong> una receta con ese titulo</div>').appendTo($("#result"));
	});

}

// función que controla lo que se escribe en el campo myaddress, al cabo de un segundo de dejar de escribir te hace la búsqueda en google maps.
;(function($){
    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);

//Coge el valor del campo input myaddress y coloca el mapa de google maps en el campo address
$('#myaddress').donetyping(function(){
  $(document).ready(function(){
  $("address").each(function(){                         
    var embed ="<iframe width='425' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( $('#myaddress').val() ) +"&amp;output=embed'></iframe>";
                                $(this).html(embed);
                             
  });
});
});


jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});
