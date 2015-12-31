$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   var currentFlatsUri = authToken["links"]["current-flat"].uri;

	$.ajax({
			    	type: 'GET',
			   		url: 'http://localhost:8080/apartmentshare/flat',
			    	headers: {
					"X-Auth-Token":authToken.token
			    	}
			    })

   loadFlats(currentFlatsUri, function(flats){
      $("#stings-list").empty();
      processFlatsCollection(flats);
   });
});

function previousStings(){
  loadFlats($('#formPrevious').attr('action'), function(flats){
    processFlatsCollection(flats);
  });
}

function processFlatsCollection(flats){

 	var lastIndex = flats["flats"].length-1;
	
	console.log(lastIndex);
  $.each(flats["flats"], function(i,flats){

      flats.links=linksToMap(flats.links);
      var edit = flats.userid ==JSON.parse(sessionStorage["auth-token"]).userid;
      $("#stings-list").append(listItemHTML(flats.links["self"].uri, flats.address, flats.description, flats.lastModified, flats.creationTimestamp, edit));
      if(i==0)
        $("#buttonUpdate").click(function(){alert("I don't do anything, implement me!")});
     if(i==lastIndex){
      $('#formPrevious').attr('action', flats["links"].previous.uri);}
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

function listItemHTML(uri, address, description,lastModifield, creationTimestamp, edit){
  var a = '<a class="list-group-item" href="'+ uri +'">';
  var p = '<p class="list-group-item-text unclickable">' +description+ '</p>';
  var m = '<m class="list-group-item-text unclickable">' +address+ '</m>';
  var l = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ creationTimestamp +'</h6>';;
  var h = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ lastModifield +'</h6>';;
  return a + p + m + l +h + '</a>';
}
