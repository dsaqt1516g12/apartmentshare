$(function(){
   getCurrentUserProfile(function(user){
      $("#aProfile").text(user.fullname + ' ');
      $("#aProfile").append('<span class="caret"></span>');
   });

   var authToken = JSON.parse(sessionStorage["auth-token"]);
   //var currentFlatsUri = authToken["links"]["current-flat"].uri;

  $.ajax({
            type: 'GET',
            url: 'http://147.83.7.207:8888/apartmentshare',
            headers: {
          "X-Auth-Token":authToken.token
            }
          })
});

$(function(){
var uri = JSON.parse(sessionStorage["uri-flat"]);
//var authToken = JSON.parse(sessionStorage["auth-token"]);
    getfotosflat(uri, function(flats){

	for(var it = 0; it< flats.images.length ; it++){
		console.log("imagen "+it+" valor:"+flats.images[it].imageURL); 
     $("#stings-list").append(listItemHTML(flats.images[it].imageURL));
	}; 
   });
});
 $("#buttonRegresar").click(function(){window.location.replace('descriptionflat.html')});

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

function listItemHTML(imageURL){
var imageURL = '<img  style=width:300px;height:228px; src='+ imageURL +'>';;
//var filename = '<img  style=width:300px;height:228px; src= http://147.83.7.207:88/img/'+ filename +'>';;


  return imageURL;
}

