$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });


var uri = JSON.parse(sessionStorage["uri-flat"]);

   getFlat(uri, function(flats){
      $("#stings-list").empty();
      var edit = flats.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 
        flats.creationTimestamp, flats.numpartner, flats.smoker, flats.pets, flats.girlorboy, flats.sqm, flats.numrooms,
        flats.furnished, flats.numbathrooms, flats.elevator, flats.plantnum, flats.internet, flats.fianza, flats.estancia, flats.campusid));
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
    window.location.replace('index.html');
  });
});


$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('micuenta.html');
});
function listItemHTML(uri, address, description,lastModifield, creationTimestamp, numpartner, smoker, pets, girlorboy, sqm, numrooms, furnished, numbathrooms, elevator, plantnum, internet, fianza, estancia, campusid){

if( smoker == 1){
smoker= 'Si';
}
else if( smoker == 2){
smoker = 'No';
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

if( furnished == 1){
furnished = 'Si';
}
else if( furnished == 2){
furnished = 'No';
}


if( elevator == 1){
elevator = 'Si';
}
else if( elevator == 2){
elevator = 'No';
}

if ( pets == 1){
  pets = 'Si';
}
  else if ( pets == 2){
    pets = 'No';
}

if (plantnum == 0){
  plantnum = 'Bajos/Entresuelo/Edificio sin plantas';
}

if ( internet == 1){
  internet = 'Si';
}
  else if ( internet == 2){
    internet = 'No';
}

if ( numrooms == 5){
  numtooms = '5 o más ';
}
if ( numpartner == 6){
  numpartner = '6 o más ';
}

if (estancia == 12){
  estancia = '12 o más ';
}

if ( campusid == '7998490EA1D011E5ABF5002318A56C8C'){
 campusid = 'EETAC';
}
else if (campusid =='0713E26AB95611E5AE7CA4DB305B7F0E'){
  campusid = 'FIB'
}
else if (campusid =='2431ADDEB95111E5AE7CA4DB305B7F0E'){
  campusid = 'EPSEM'
}
else if (campusid =='29AC8985B95311E5AE7CA4DB305B7F0E'){
  campusid = 'ETSAB'
}
else if (campusid =='351E5933B95511E5AE7CA4DB305B7F0E'){
  campusid = 'ETSEIB'
}
else if (campusid =='352F85C0B95711E5AE7CA4DB305B7F0E'){
  campusid = 'EEI'
}
else if (campusid =='4D6228A9B95611E5AE7CA4DB305B7F0E'){
  campusid = 'FME'
}
else if (campusid =='6A7D3E31B95711E5AE7CA4DB305B7F0E'){
  campusid = 'EUETIB'
}
else if (campusid =='6D31B1FFB95311E5AE7CA4DB305B7F0E'){
  campusid = 'ETSAV'
}
else if (campusid =='747A6B55B95111E5AE7CA4DB305B7F0E'){
  campusid = 'EET'
}
else if (campusid =='7F9D90DAB95611E5AE7CA4DB305B7F0E'){
  campusid = 'FNB'
}
else if (campusid =='8299B89FB95411E5AE7CA4DB305B7F0E'){
  campusid = 'ETSEIAT'
}
else if (campusid =='87268CFDB94C11E5AE7CA4DB305B7F0E'){
  campusid = 'EPSEB'
}
else if (campusid =='93D66A78B95511E5AE7CA4DB305B7F0E'){
  campusid = 'ETSETB'
}
else if (campusid =='AB44AAE6B95311E5AE7CA4DB305B7F0E'){
  campusid = 'EPSEVG'
}
else if (campusid =='C192880EB95611E5AE7CA4DB305B7F0E'){
  campusid = 'CFIS'
}
else if (campusid =='CFC60493B95511E5AE7CA4DB305B7F0E'){
  campusid = 'FOOT'
}
else if (campusid =='F2CDAA45B95211E5AE7CA4DB305B7F0E'){
  campusid = 'ESAB'
}
else if (campusid =='FBF97602B95611E5AE7CA4DB305B7F0E'){
  campusid = 'CITM'
}



lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

 // var a = '<a class="list-group-item" href="'+ uri +'/'+ id + '</a>';
  var p = '<p class="list-group-item-text unclickable">' + 'Descripción del piso: '+ description+ '</p>';
  var m = '<m class="list-group-item-text unclickable">' +  'Dirección del piso: '+ address+ '</m>';

var campusid = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Piso situado cerca del Campus: '+  campusid + '</h6>';;
 var numpartner = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Numero de compañeros: '+  numpartner +'</h6>';;
 var sqm = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Número de metros cuadrados del piso: '+  sqm +' m²'+'</h6>';;
 var numbathrooms = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Numero de cuartos de baño: '+  numbathrooms +'</h6>';;
  var numrooms = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Numero de habitaciones: '+  numrooms + ' habitaciones'+'</h6>';;
 var smoker = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Fumador: '+  smoker +'</h6>';;
 var girlorboy = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Restricción de sexo: '+  girlorboy +'</h6>';;
var furnished = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Amueblado: '+  furnished +'</h6>';;
var elevator = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Dispone de Ascensor: '+  elevator +'</h6>';;
var plantnum = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Número de planta: '+  plantnum +'</h6>';;
var pets = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Se admite mascota: '+  pets +'</h6>';;
var internet = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Dispone de Internet: '+  internet +'</h6>';;
var fianza = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Fianza a depositar requerida: '+  fianza + ' €'+'</h6>';;
var estancia = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Estancia del piso: '+  estancia + ' meses'+'</h6>';;



 var creationTimestamp = '<h6 class="list-group-item-heading unclickable" align="right">'+ 'Fecha de creacón : ' + creationTimestamp +'</h6>';;
  var lastModifield = '<h6 class="list-group-item-heading unclickable" align="right">'+ 'Ultima modificacion: '+   lastModifield +'</h6>';;
  return p + m + campusid +  numpartner + sqm + numrooms + numbathrooms + smoker + girlorboy + furnished + elevator + plantnum + pets + internet 
  + fianza + estancia + creationTimestamp + lastModifield;
}
