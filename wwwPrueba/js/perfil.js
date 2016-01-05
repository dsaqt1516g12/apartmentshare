$(function(){
   getCurrentUserProfile(function(user){
	$("#stings-list").empty();
      var edit = user.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(user.links["self"].uri, user.logingid, user.fullname, user.email, user.phone, user.id, edit));
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
	      processFlatsCollection(user);
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = JSON.parse(sessionStorage["uriroom"]);

	$.ajax({
			    	type: 'GET',
			   		url: uri,
			    	headers: {
					"X-Auth-Token":authToken.token
			    	}
			    })

});

 $("#buttonRegresar").click(function(){window.location.replace('listrooms.html')});

   $("#formPrevious").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
     // previousStings();
      $("#buttonVerhabitaciones").blur();
	window.location.replace('listrooms.html');
    });

   $("#formEliminarusuario").submit(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
  EliminarUsuario(function(){
  });
 logout(function(){
  });
      $("#buttonEliminarusuario").blur();
	window.location.replace('login.html');
    });

function processFlatsCollection(user){


	var lastIndex = user["user"].length-1;
	
	console.log(lastIndex);

  $.each(user["flat"], function(i,user){

      user.links=linksToMap(user.links);
      var edit = user.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(user.links["self"].uri, user.logingid, user.fullname, user.email, user.phone, user.id, edit));
      if(i==0)
        $("#buttonUpdate").click(function(){alert("I don't do anything, implement me!")});
     if(i==lastIndex){
      $('#formPrevious').attr('action', user["links"].previous.uri);}
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
    window.location.replace('login.html');
  });
});

function listItemHTML(uri, address, description,lastModifield, creationTimestamp, id, edit){
  var a = '<a class="list-group-item" href="'+ uri +'/'+ id + '">';
  var p = '<p class="list-group-item-text unclickable">' +description+ '</p>';
  var m = '<m class="list-group-item-text unclickable">' +address+ '</m>';
  var l = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ creationTimestamp +'</h6>';;
  var h = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ lastModifield +'</h6>';;
  return a + p + m + l +h + '</a>';
}