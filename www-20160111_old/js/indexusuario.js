$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   //var currentFlatsUri = authToken["links"]["current-flat"].uri;

	$.ajax({
			    	type: 'GET',
			   		url: 'http://localhost:8080/apartmentshare',
			    	headers: {
					"X-Auth-Token":authToken.token
			    	}
			    })
});

$("#aCloseSession").click(function(e){
  e.preventDefault();
  logout(function(){
    window.location.replace('index.html');
  });
});

function listItemHTML(uri, address, description,lastModifield, creationTimestamp, id, edit){
  
  var a = '<a class="list-group-item" href="'+ uri +'/'+ id +'">';
  var p = '<p class="list-group-item-text unclickable">' +description+ '</p>';
  var m = '<m class="list-group-item-text unclickable">' +address+ '</m>';
  var l = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ creationTimestamp +'</h6>';;
  var h = (edit) ? '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +' <span class="glyphicon glyphicon-pencil clickable"></span></h6>' : '<h6 class="list-group-item-heading unclickable" align="right">'+ lastModifield +'</h6>';;
  return a + p + m + l +h + '</a>';
}
