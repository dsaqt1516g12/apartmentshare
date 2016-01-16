$(function(){

var uri = JSON.parse(sessionStorage["uri-rooms2"]);
    getRooms(uri, function(flats){
      $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 
        flats.creationTimestamp, flats.id, flats.girlorboy, flats.sqm, flats.price, flats.status, flats.fullname, flats.furnished,
        flats.phone, flats.email, flats.numpartner, flats.smoker, flats.pets, flats.numrooms, flats.numbathrooms, flats.elevator, flats.plantnum,
        flats.internet, flats.fianza, flats.estancia, flats.campusname, flats.campusaddress, flats.flatdescription));
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
    window.location.replace('index.html');
  });
});
$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('perfil.html');
});

function listItemHTML(uri, address, description,lastModified, creationTimestamp, id, girlorboy, sqm, price, status, fullname, furnished, phone, email, numpartner, smoker, pets, numrooms, numbathrooms, elevator, plantnum, internet, fianza, estancia, campusname, campusaddress, flatdescription){


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
}
else if (smoker==0){
  smoker = 'Indiferente';
}

if( furnished == 1){
furnished = 'Sí';
}
else if( furnished == 2){
furnished = 'No';
}

if( pets == 0){
pets = 'Indiferente';
}
else if( pets == 1){
pets = 'Si';
} 
else if ( pets == 2)
pets = 'No';
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
else if( elevator == 2){
elevator = 'No';
}

if( plantnum == 0){
plantnum = 'Bajos / Edificio sin plantas';
}

if( internet == 1){
internet = 'Sí';
}
else if( internet == 2){
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


  var infouser = '<p class="list-group-item-text unclickable">' + ' Información del anunciante' + '</p>';
  var fullname = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Nombre del anunciante: '+  fullname +'</h6>';;
  var email = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Correo electrónico: '+ email +'</h6>';;
  var phone = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Teléfono: '+ phone +'</h6>';;
  var mensaje= '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Inicia sesión para ponerte en contacto con el anunciante' + '</h6>';;

  var creado = '<h6 class="list-group-item-heading unclickable" align="right">'+  'Fecha de creación: ' +'</h6>';;
  var l = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;
  var modificado = '<h6 class="list-group-item-heading unclickable" align="right">'+  'Última modificación: '+'</h6>';;
  var h = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModified +'</h6>';;


  return infohab + description + g + sqm + furnished + price+ status +
  infopiso+ numpartner+smoker + pets + numrooms + numbathrooms + elevator+ plantnum + internet + fianza + estancia + campusname + campusaddress + flatdescription
  +infouser + fullname + email +phone+ mensaje+
  creado +l +modificado +h ;
}


