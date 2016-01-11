$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });


var uri = JSON.parse(sessionStorage["uri-flat"]);

   getFlat(uri, function(flats){
      $("#stings-list").empty();
      var edit = flats.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 			flats.creationTimestamp, flats.numpartner, flats.smoker));
   });
});


 $("#buttonRegresar").click(function(){window.location.replace('apartmentshare.html')});
 $("#buttonEditarpiso").click(function(){window.location.replace('crearpiso.html')});
 $("#buttonEliminarpiso").click(function(){
  EliminarPiso(function(){

    
  });


});
   $("#formCrearhabitacion").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      $("#buttonCrearhabitacion").blur();
	  	window.location.replace('crearhabitacion.html');
	
    });

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('listrooms.html');
    });



$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('login.html');
  });
});


$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('micuenta.html');
});
function listItemHTML(uri, address, description,lastModifield, creationTimestamp, numpartner, smoker){

if( smoker == 1){
smoker= 'Si';
}
else if( smoker == 0){
smoker = 'No';
}

lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

 // var a = '<a class="list-group-item" href="'+ uri +'/'+ id + '</a>';
  var p = '<p class="list-group-item-text unclickable">' + 'Descripción del piso: '+ description+ '</p>';
  var m = '<m class="list-group-item-text unclickable">' +  'Dirección del piso: '+ address+ '</m>';


 var numpartner = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Numero de compañeros: '+  numpartner +'</h6>';;
 var smoker = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Fumador: '+  smoker +'</h6>';;


 var creationTimestamp = '<h6 class="list-group-item-heading unclickable" align="right">'+ 'Fecha de creacón : ' + creationTimestamp +'</h6>';;
  var lastModifield = '<h6 class="list-group-item-heading unclickable" align="right">'+ 'Ultima modificacion: '+   lastModifield +'</h6>';;
  return p + m + numpartner +smoker + creationTimestamp + lastModifield;
}
