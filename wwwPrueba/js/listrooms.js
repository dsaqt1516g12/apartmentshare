$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   //var currentRoomsUri = authToken["links"]["current-rooms-list"].uri;
	var currentRoomsUri = JSON.parse(sessionStorage["uri-flat"]);
	currentRoomsUri = currentRoomsUri + '/room';
	console.log(currentRoomsUri);

   loadRoomsList(currentRoomsUri, function(rooms){
      $("#stings-list").empty();
      processRoomsCollection(rooms);
   });
});

 $("#buttonRegresar").click(function(){window.location.replace('descriptionflat.html')});
  

function previousRooms(){
  loadFlats($('#formPrevious').attr('action'), function(rooms){
    processRoomsCollection(rooms);
  });
}

function processRoomsCollection(rooms){

 	var lastIndex = rooms["rooms"].length-1;
	
	console.log(lastIndex);
  $.each(rooms["rooms"], function(i,rooms){

      rooms.links=linksToMap(rooms.links);
      var edit = rooms.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(rooms.links["self"].uri, rooms.address, rooms.description, rooms.lastModified, rooms.creationTimestamp, rooms.id, edit));
      if(i==0)
        $("#buttonUpdate").click(function(){alert("I don't do anything, implement me!")});
     if(i==lastIndex){
      $('#formPrevious').attr('action', rooms["links"].previous.uri);}
  });

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      previousRooms();
      $("#buttonPrevious").blur();
    });

  $("a.list-group-item").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
   // var uri = $(this).attr("href");
	//sessionStorage["uri-flat"] = JSON.stringify(uri);
	var uri = JSON.parse(sessionStorage["uri-flat"]);
	console.log(uri);
	uri = uri + '/room'+ $(this).attr("href");
	sessionStorage["uriroom"] = JSON.stringify(uri);
	var flatjson = JSON.parse(sessionStorage["uriroom"]);

	console.log(uri);

 
    getRoom(uri, function(room){

      // In this example we only log the sting
      console.log(room);	
	
     var Room2 = JSON.parse(JSON.stringify(room))
	console.log(rooms);
	sessionStorage["room"] = JSON.stringify(room);
	var flatjson = JSON.parse(sessionStorage["room"]);
	console.log(flatjson);
  	window.location.replace('descriptionroom.html');
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


$("#aGoToProfile").click(function(e){
  e.preventDefault();
    window.location.replace('perfil.html');
});

function listItemHTML(uri, address, description,lastModifield, creationTimestamp, id, edit){
  var a = '<a class="list-group-item" href="'+ '/'+ id + '">';
  var p = '<p class="list-group-item-text unclickable">' +description+ '</p>';
  var m = '<m class="list-group-item-text unclickable">' +address+ '</m>';
  var l = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ creationTimestamp +'</h6>';;
  var h = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ lastModifield +'</h6>';;
  return a + p + m + l +h + '</a>';
}