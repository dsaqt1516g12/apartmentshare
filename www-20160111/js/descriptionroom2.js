$(function(){

var uri = JSON.parse(sessionStorage["uri-rooms2"]);
   getRooms(uri, function(flats){
      $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 			flats.creationTimestamp, flats.price));
   });
});
 $("#buttonRegresar").click(function(){window.location.replace('index.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('index.html');
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
    window.location.replace('login.html');
  });
});
$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('perfil.html');
});

function listItemHTML(uri, address, description,lastModifield, creationTimestamp, price){
lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

  var p = '<p class="list-group-item-text ">' + 'Descripción: ' +description+ '</p>';
  var m = '<m class="list-group-item-text ">' +' Dirección: ' +address+ '</m>';
 var price = '<h6 class="list-group-item-heading unclickable" align="center">'+  'Precio: '+  price +'  (€)'+'</h6>'
 var lastModifield = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +'</h6>';;
var creationTimestamp = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;
  return p + m + price + lastModifield+  creationTimestamp  ;
}
