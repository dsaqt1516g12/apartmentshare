//$(function(){
  // getCurrentUserProfile(function(user){
      //$("#aProfile").text(user.fullname + ' ');
     // $("#aProfile").append('<span class="caret"></span>');
  // });

  // var authToken = JSON.parse(sessionStorage["auth-token"]);

   loadRooms(function(rooms){
      $("#stings-list").empty();
      processRoomsCollection(rooms);
});

function previousStings(){
  loadRooms($('#formPrevious').attr('action'), function(rooms){
    processRoomsCollection(rooms);
  });
}

function processRoomsCollection(rooms){

 	var lastIndex = rooms["rooms"].length-1;
	
	console.log(lastIndex);
  $.each(rooms["rooms"], function(i,rooms){

      rooms.links=linksToMap(rooms.links);
     // var edit = rooms.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(rooms.links["self"].uri, rooms.address, rooms.description, rooms.fullname, rooms.email, rooms.phone));
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
    getSting(uri, function(flat){
      // In this example we only log the sting
      console.log(flat);
    });
  });
  $(".glyphicon-pencil").click(function(e){
    e.preventDefault();
    alert("This should open a sting editor. But this is only an example.");});
}

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('login.html');
  });
});

function listItemHTML(uri, address, description, fullname, email, phone){


  var u = '<u class="list-group-item" href="'+ uri + '</u>';

  var d = '<d class="list-group-item-text unclickable">' + description + '</d>';

  var a = '<a class="list-group-item-text unclickable">' + address + '</a>';

  var f = '<f class="list-group-item-text unclickable">' + fullname +  '</f>';

  var e = '<e class="list-group-item-text unclickable">' + email + '</e>';

  var p = '<p class="list-group-item-text unclickable">' + phone + '</p>';

  return  u + 'Descripción del piso: ' + d + '  ;  ' + 'Dirección: ' +  a + '  ;  ' + 'Nombre del contacto: ' + f + '  ;  ' + 'E-mail: ' + e + '  ;  ' + 'Teléfono: ' + p;
}
