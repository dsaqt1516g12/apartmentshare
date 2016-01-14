   BuscarRooms(function(rooms){
      $("#stings-list").empty();
      processRoomsCollection(rooms);
});

function previousStings(){
  loadRooms($('#formPrevious').attr('action'), function(rooms){
    processRoomsCollection(rooms);
  });
}
   $("#formBuscarhabitacion").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      $("#buttonBuscarhabitacion").blur();
	  	window.location.replace('buscarhabitacion.html');
	
    });

function processRoomsCollection(rooms){

 	var lastIndex = rooms["rooms"].length-1;
	
	console.log(lastIndex);
  $.each(rooms["rooms"], function(i,rooms){

      rooms.links=linksToMap(rooms.links);

      $("#stings-list").append(listItemHTML(rooms.links["self"].uri, rooms.address, rooms.description, rooms.fullname, rooms.email, rooms.phone, rooms.id, rooms.price, rooms.lastModified, rooms.creationTimestamp));
      if(i==0)
        $("#buttonUpdate").click(function(){alert("I don't do anything, implement me!")});
     if(i==lastIndex){
      $('#formPrevious').attr('action', rooms["links"].previous.uri);}
  });

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      previousStings();
      $("#buttonPrevious").blur();
    });

  $("a.list-group-item").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var uri = $(this).attr("href");
    getRooms(uri, function(room){
      console.log(room);
	window.location.replace('descriptionroom2.html');
    });
  });
  $(".glyphicon-pencil").click(function(e){
    e.preventDefault();
    alert("This should open a sting editor. But this is only an example.");});
}


function listItemHTML(uri, address, description, fullname, email, phone, id, price, lastModified, creationTimestamp  ){


lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

 var a = '<a class="list-group-item" href="'+ uri +'/'+ id + '">';

  var d = '<d class="list-group-item-text unclickable">' + description + '</d>';

  var u = '<u class="list-group-item-text unclickable">' + address + '</u>';

  var f = '<f class="list-group-item-text unclickable">' + fullname +  '</f>';

  var e = '<e class="list-group-item-text unclickable">' + email + '</e>';

 var phone = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Telefono: '+  phone +'</h6>';;

 var price = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Precio: '+  price +'</h6>';;

 var lastModifield = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +'</h6>';;
var creationTimestamp = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;


  return  a + 'Descripción del piso: ' + d + '  ;  ' + 'Dirección: ' +  u + '  ;  ' + 'Nombre del contacto: ' + f + '  ;  ' + 'E-mail: ' + e + '  ;  ' + 'Teléfono: ' + phone + price +  creationTimestamp + '</a>' ;
}
