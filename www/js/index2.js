var API_BASE_URL = "http://147.83.7.207:8888/apartmentshare";

//Función que ejecuta al cargar, escoger esta para crear piso y para el filtro donde se selecciona el campus.
window.onload = getCampus;


//google.maps.event.addDomListener(window, 'load', initialize);
function getCampus() {
			//var url = API_BASE_URL +'/campus';
			$("#campusname").text('');
			$("<option selected value='base'>Selecciona un Campus</option>").appendTo($('#campusname'));
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
									$("<option value='" + campuss.id + "'>"+ campuss.campusname +', '+campuss.address +"</option>").appendTo($('#campusname'));	
								}
										
							});	
						});
					}).fail(function() {
				$("#result").text("No List Campus.");
			});
			$("</select>").appendTo($('#campusname'));

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


   loadRooms(function(rooms){
      $("#stings-list").empty();
      processRoomsCollection(rooms);
});


function previousStings(){
  loadRooms3(function(rooms){
    processRoomsCollection(rooms);
  });
}

$("#buttonPrevious").click(function(e) {
    e.preventDefault();
     previousStings()

});


$("#formBuscarhabitacion").submit(function(e){
  e.preventDefault();
    BuscarRooms($('#campusname').val(), $('#smoker').val(), $('#pets').val(),  
      $('#girlorboy').val(), $('#numpartner').val(), 
      $('#maxprice').val(), $('#minprice').val(), 
      function(rooms) {
        $("#buttonBuscarhabitacion").blur();
       $("#stings-list").empty();
              processRoomsCollection(rooms);

	  
	});

});

function processRoomsCollection(rooms){

 	var lastIndex = rooms["rooms"].length-1;
	
	console.log(lastIndex);
  $.each(rooms["rooms"], function(i,rooms){

      rooms.links=linksToMap(rooms.links);

      $("#stings-list").append(listItemHTML(rooms.links["self"].uri, rooms.address, rooms.description, rooms.fullname, rooms.email, rooms.phone, rooms.id, rooms.price, rooms.campusname, rooms.imageURL, rooms.lastModified, rooms.creationTimestamp));
      if(i==0)
        $("#buttonUpdate").click(function(){alert("I don't do anything, implement me!")});
     if(i==lastIndex){
      $('#formPrevious').attr('action', rooms["links"].previous.uri);}
  });

  $("a.list-group-item").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var uri = $(this).attr("href");
    getRooms(uri, function(room){
      console.log(room);
	window.location.replace('descriptionroom2logueado.html');
    });
  });
  $(".glyphicon-pencil").click(function(e){
    e.preventDefault();
    alert("This should open a sting editor. But this is only an example.");});
}



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

function listItemHTML(uri, address, description, fullname, email, phone, id, price, campusname,  imageURL, lastModified, creationTimestamp  ){


lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

 var a = '<a class="list-group-item" href="'+ uri +'/'+ id + '">';

 var description = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Descripción : '+  description +'</h6>';;
 var address = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Direccíon: '+  address +'</h6>';;
var campusname = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Cerda de campus UPC: '+  campusname +'</h6>';;

 var fullname = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Nombre completo del arrendador: '+  fullname +'</h6>';;
	
 var email = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Email: '+  email +'</h6>';;


 var phone = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Telefono: '+  phone +'</h6>';;

var imageURL = '<img  style=width:300px;height:228px; src='+ imageURL +'>';;

 var price = '<h6 class="list-group-item-heading unclickable" color="red" align="center">'+ 'Precio: '+  price +'</h6>';;

 var lastModifield = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +'</h6>';;
var creationTimestamp = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;


  return  a + description + address + campusname + fullname + email + phone + imageURL+  price +  creationTimestamp + '</a>' ;
}
