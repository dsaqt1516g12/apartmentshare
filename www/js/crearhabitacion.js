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

       
      }
  );
}
});




//////////////////////////////********************* SUBIR IMÁGENES ****************************//////////////////////////////////

// SUBIR IMáGENES


function UploadImgRoom(mytoken,myuri,roomid) {

	var data
	data = new FormData();
	data.append( 'image', $( '#fileRoom' )[0].files[0] );
if ( document.getElementById("fileRoom").files.length != 0){
	

	$.ajax({
		url : myuri+'/'+roomid+'/img',
		type : 'POST',
		headers: { 
		'X-Auth-Token': mytoken},
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
	
		if ( document.getElementById("fileRoom2").files.length != 0){
			UploadImgRoom2(mytoken,myuri,roomid);
		}
		else
		{
			 window.location.replace('listrooms.html');
		}
		
		

	}).fail(function(jqXHR, textStatus) {
	
	console.log(textStatus);

	});
}

}

function UploadImgRoom2(mytoken,myuri,roomid) {

	var data2
	data2 = new FormData();
	data2.append( 'image', $( '#fileRoom2' )[0].files[0] );
if ( document.getElementById("fileRoom2").files.length != 0){
	

	$.ajax({
		url : myuri+'/'+roomid+'/img',
		type : 'POST',
		headers: { 
		'X-Auth-Token': mytoken},
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
	
		if ( document.getElementById("fileRoom3").files.length != 0){
			UploadImgRoom3(mytoken,myuri,roomid);
		}
		else
		{
			 window.location.replace('listrooms.html');
		}

	}).fail(function(jqXHR, textStatus) {
	
	console.log(textStatus);

	});
}

}

function UploadImgRoom3(mytoken,myuri,roomid) {

	var data3
	data3 = new FormData();
	data3.append( 'image', $( '#fileRoom3' )[0].files[0] );
if ( document.getElementById("fileRoom3").files.length != 0){
	

	$.ajax({
		url : myuri+'/'+roomid+'/img',
		type : 'POST',
		headers: { 
		'X-Auth-Token': mytoken},
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
	
		
		 window.location.replace('listrooms.html');

	}).fail(function(jqXHR, textStatus) {
	
	console.log(textStatus);

	});
}

}


//PREVIEW DE LAS TRES IMÁGENES

function readURLRoom(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blahRoom').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#fileRoom").change(function(){
    readURLRoom(this);
});

function readURLRoom2(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blahRoom2').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#fileRoom2").change(function(){
    readURLRoom2(this);
});

function readURLRoom3(input) {

    if (input.files && input.files[0]) {
	
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blahRoom3').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#fileRoom3").change(function(){
    readURLRoom3(this);
});
