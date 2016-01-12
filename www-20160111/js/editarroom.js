$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

	var uri = JSON.parse(sessionStorage["uriroom"]);

   getRoom(uri, function(flats){

	sessionStorage["idroom"] = JSON.stringify(flats.id);
	var id = JSON.parse(sessionStorage["idroom"]);
	console.log(id);
	
	sessionStorage["idroom-flat"] = JSON.stringify(flats.flatid);
	var idflat = JSON.parse(sessionStorage["idroom-flat"]);
	console.log(idflat);

	$('#girlorboy').val(flats.girlorboy);
	$('#sqm').val(flats.sqm);
	$('#smoker').val(flats.smoker);
	$('#price').val(flats.price),
	$('#status').val(flats.status);
	$('#description').val(flats.description);
      $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 			flats.creationTimestamp, flats.id, flats.girlorboy, flats.sqm, flats.price));
   });
});

$("#formEditarroom").submit(function(e){
      e.preventDefault();
  puthabitacion($('#description').val(),  $('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#status').val(), $('#price').val(), function(){

	 $("#buttonEditarroom").blur();
		console.log("change");
	  	window.location.replace('listrooms.html');
  		}


	);
});

   $("#formAtras").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      $("#buttonAtras").blur();
	  	window.location.replace('descriptionroom.html');
	
    });

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('login.html');
  });
});


$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('perfil.html');
});

function listItemHTML(uri, address, description,lastModifield, creationTimestamp, id, girlorboy, sqm, price){

lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

	if ( girlorboy ==  true){

		girlorboy = ' Es indiferente ';
 		
	}

  var a = '<a class="list-group-item" href="'+ '/'+ id + '">';
  var p = '<p class="list-group-item-text unclickable">' + ' Descripción: ' + description+ '</p>';
  var g = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Sexo de compañero :' +  girlorboy +'</h6>';;
  var sqm= '<h6 class="list-group-item-heading unclickable" align="center">'+  'Metros cuatradados de la habitación:' +sqm + ' m²'+ '</h6>';;
  var price= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Precio: '+  price +'  (€)'+'</h6>';;
  var l = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;
  var h = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +'</h6>';;
  return p + g + sqm + price+ l +h ;
}
