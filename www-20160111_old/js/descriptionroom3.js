$(function(){
getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

var uri = JSON.parse(sessionStorage["uri-rooms2"]);
   getRooms(uri, function(flats){
      $("#stings-list").empty();
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, 			flats.creationTimestamp, flats.id));
      processFlatsCollection(flats);
   });
});

 $("#buttonRegresar").click(function(){window.location.replace('index.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('indexusuario.html');
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


function processFlatsCollection(flats){


	var lastIndex = flats["room"].length-1;
	
	console.log(lastIndex);

  $.each(flats["flat"], function(i,flats){

      flats.links=linksToMap(flats.links);
    //  var edit = flats.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, flats.creationTimestamp, flats.id, edit));
      if(i==0)
        $("#buttonUpdate").click(function(){alert("I don't do anything, implement me!")});
     if(i==lastIndex){
      $('#formPrevious').attr('action', flats["links"].previous.uri);}
  });

  $("a.list-group-item").click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var uri = $(this).attr("href");
	sessionStorage["uri-flat"] = JSON.stringify(uri);

 
    getRoom(uri, function(flat){

      // In this example we only log the sting
      console.log(flat);	
	
     var flat2 = JSON.parse(JSON.stringify(flat))
	console.log(flat2);
	sessionStorage["room"] = JSON.stringify(flat2);
	var flatjson = JSON.parse(sessionStorage["room"]);
	console.log(flatjson);
  	//window.location.replace('descriptionflat.html');
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
    window.location.replace('perfil.html');
});

function listItemHTML(uri, address, description,lastModifield, creationTimestamp, id){
  var p = '<p class="list-group-item-text ">' +description+ '</p>';
  var m = '<m class="list-group-item-text ">' +address+ '</m>';

  return p + m ;
}
