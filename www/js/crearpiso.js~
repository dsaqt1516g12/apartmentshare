var API_BASE_URL = "http://147.83.7.207:8888/apartmentshare";

//Función que ejecuta al cargar, escoger esta para crear piso y para el filtro donde se selecciona el campus.
window.onload = getCampus();


//google.maps.event.addDomListener(window, 'load', initialize);
function getCampus() {
			//var API_BASE_URL = "http://147.83.7.207:8888/apartmentshare";
			//var url = API_BASE_URL +'/campus';
			$("#campusid").text('');
			$("<option selected value='base'>Selecciona un Campus</option>").appendTo($('#campusid'));
			$.ajax({
				url : 'http://147.83.7.207:8888/apartmentshare/campus',
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
								if(campuss.campusname!=undefined || campuss.campusname!=null){
									$("<option value='" + campuss.id + "'>"+ campuss.campusname +', '+campuss.address +"</option>").appendTo($('#campusid'));	
								}
										
							});	
						});
					}).fail(function() {
				$("#result").text("No List Campus.");
			});
			$("</select>").appendTo($('#campusid'));

}


function getCampusByID(todo_id) {
	var url = API_BASE_URL + '/campus/' + todo_id;
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
		contentType : 'application/json',
	}).done(function(data, status, jqxhr) {
		var campus = data;
		initialize(campus.latitud,campus.longitud,campus.campusname,campus.address);
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>No existe</strong> un campus con ese ID</div>').appendTo($("#result"));
	});

}

function initialize(Lat,Lng,name,address) {
		var mapCanvas = document.getElementById('map_campus');
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

$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   var currentFlatsUri = authToken["links"]["current-flat"].uri;


});

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
    var embed ="<iframe width='450' height='350' frameborder='0' scrolling='no'  marginheight='0' marginwidth='0'   src='https://maps.google.com/maps?&amp;q="+ encodeURIComponent( $('#myaddress').val() ) +"&amp;output=embed'></iframe>";
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






$("#formCrearpiso").submit(function(e){
    e.preventDefault();

$("#result").text('');
  
  if($('#campusid').val() == "" || $('#myaddress').val()=="" || $('#smoker').val()=="" || $('#numrooms').val()=="" || $('#pets').val()=="" || $('#numbathrooms').val()=="" || $('#girlorboy').val()==""
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

  	crearpiso($('#campusid').val(),  $('#myaddress').val(), $('#description').val(), $('#numpartner').val(), $('#smoker').val(), 
  		$('#pets').val(),$('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#numrooms').val(), $('#numbathrooms').val(), 
  		$('#elevator').val(), $('#plantnum').val(), $('#internet').val(), $('#fianza').val(), $('#estancia').val(), 
  		function(flat) {
		  	$("#buttonCrearpiso").blur();
		

			var idflatimg = JSON.parse(sessionStorage["idflatimg"]);
			UploadImg(idflatimg);
			
			console.log("change");
		
			
		  	
		  }
	);
}
});


//////////////////////////////********************* SUBIR IMÁGENES ****************************//////////////////////////////////

// SUBIR IMáGENES


function UploadImg(flatid) {

	var authToken = JSON.parse(sessionStorage["auth-token"]);

	var data
	data = new FormData();
	data.append( 'image', $( '#file' )[0].files[0] );
if ( document.getElementById("file").files.length != 0){
	

	$.ajax({
		url : 'http://147.83.7.207:8888/apartmentshare/flat/'+flatid+'/img',
		type : 'POST',
		headers: { 
		'X-Auth-Token': authToken.token},
		crossDomain : true,
		dataType : 'json',
		contentType : false,
		processData : false,
		data : data,
		statusCode: {
			200: function() {$('<div class="alert alert-success"> <strong>Ok!</strong></div>').appendTo($("#result_code"));},
			202: function() {$('<div class="alert alert-success"> <strong>Accepted!</strong> </div>').appendTo($("#result_code"));},
			400: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Bad Request </div>').appendTo($("#result_code"));},
			404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Recipient not found </div>').appendTo($("#result_code"));},
			409: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Conflict </div>').appendTo($("#result_code"));},
			401: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> No estas autorizado </div>').appendTo($("#result_code"));},
			500: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Error interno </div>').appendTo($("#result_code"));}
		}

	}).done(function(data, status, jqxhr) {
	var response = $.parseJSON(jqxhr.responseText);
	
		if ( document.getElementById("file2").files.length != 0){
			UploadImg2(flatid);
		}
		else
		{
			window.location.replace('apartmentshare.html');
		}
		
		

	}).fail(function(jqXHR, textStatus) {
	
	console.log(textStatus);

	});
}

}

function UploadImg2(flatid) {

	var authToken = JSON.parse(sessionStorage["auth-token"]);

	var data2
	data2 = new FormData();
	data2.append( 'image', $( '#file2' )[0].files[0] );
if ( document.getElementById("file2").files.length != 0){
	

	$.ajax({
		url : 'http://147.83.7.207:8888/apartmentshare/flat/'+flatid+'/img',
		type : 'POST',
		headers: { 
		'X-Auth-Token': authToken.token},
		crossDomain : true,
		dataType : 'json',
		contentType : false,
		processData : false,
		data : data2,
		statusCode: {
			200: function() {$('<div class="alert alert-success"> <strong>Ok!</strong></div>').appendTo($("#result_code"));},
			202: function() {$('<div class="alert alert-success"> <strong>Accepted!</strong> </div>').appendTo($("#result_code"));},
			400: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Bad Request </div>').appendTo($("#result_code"));},
			404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Recipient not found </div>').appendTo($("#result_code"));},
			409: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Conflict </div>').appendTo($("#result_code"));},
			401: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> No estas autorizado </div>').appendTo($("#result_code"));},
			500: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Error interno </div>').appendTo($("#result_code"));}
		}

	}).done(function(data2, status, jqxhr) {
	var response = $.parseJSON(jqxhr.responseText);
	
		if ( document.getElementById("file3").files.length != 0){
			UploadImg3(flatid);
		}
		else
		{
			window.location.replace('apartmentshare.html');
		}

	}).fail(function(jqXHR, textStatus) {
	
	console.log(textStatus);

	});
}

}

function UploadImg3(flatid) {

	var authToken = JSON.parse(sessionStorage["auth-token"]);

	var data3
	data3 = new FormData();
	data3.append( 'image', $( '#file3' )[0].files[0] );
if ( document.getElementById("file3").files.length != 0){
	

	$.ajax({
		url : 'http://147.83.7.207:8888/apartmentshare/flat/'+flatid+'/img',
		type : 'POST',
		headers: { 
		'X-Auth-Token': authToken.token},
		crossDomain : true,
		dataType : 'json',
		contentType : false,
		processData : false,
		data : data3,
		statusCode: {
			200: function() {$('<div class="alert alert-success"> <strong>Ok!</strong></div>').appendTo($("#result_code"));},
			202: function() {$('<div class="alert alert-success"> <strong>Accepted!</strong> </div>').appendTo($("#result_code"));},
			400: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Bad Request </div>').appendTo($("#result_code"));},
			404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Recipient not found </div>').appendTo($("#result_code"));},
			409: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Conflict </div>').appendTo($("#result_code"));},
			401: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> No estas autorizado </div>').appendTo($("#result_code"));},
			500: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Error interno </div>').appendTo($("#result_code"));}
		}

	}).done(function(data3, status, jqxhr) {
	var response = $.parseJSON(jqxhr.responseText);
	
		
		window.location.replace('apartmentshare.html');

	}).fail(function(jqXHR, textStatus) {
	
	console.log(textStatus);

	});
}

}


//PREVIEW DE LAS TRES IMÁGENES

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#file").change(function(){
    readURL(this);
});

function readURL2(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah2').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#file2").change(function(){
    readURL2(this);
});

function readURL3(input) {

    if (input.files && input.files[0]) {
	
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah3').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#file3").change(function(){
    readURL3(this);
});

