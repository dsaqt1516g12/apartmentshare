$(function(){
var uri = JSON.parse(sessionStorage["uri-rooms2"]);
    getfotos(uri, function(flats){

	for(var it = 0; it< flats.images.length ; it++){
		console.log("imagen "+it+" valor:"+flats.images[it].imageURL); 
     $("#stings-list").append(listItemHTML(flats.images[it].imageURL));
	}; 
   });
});

 $("#buttonRegresar").click(function(){window.location.replace('descriptionroom2.html')});

  $("#formVerfotos").submit(function(){
 	
      $("#buttonVerfotos").blur();
    });

function listItemHTML(imageURL){
var imageURL = '<img  style=width:300px;height:228px; src='+ imageURL +'>';;
//var filename = '<img  style=width:300px;height:228px; src= http://147.83.7.207:88/img/'+ filename +'>';;


  return imageURL;
}


