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


function listItemHTML(uri, address, description, fullname, email, phone, id, price, lastModified, creationTimestamp  ){


lastModifieldformat = lastModifield;
var lastModifield = new Date( lastModifieldformat );
creationTimestampformat= creationTimestamp;
var creationTimestamp = new Date( creationTimestampformat );

 var a = '<a class="list-group-item" href="'+ uri +'/'+ id + '">';

 var description = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Descripción : '+  description +'</h6>';;
 var address = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Direccíon: '+  address +'</h6>';;

 var fullname = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Nombre complero de Arrendador: '+  fullname +'</h6>';;
	
 var email = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Email: '+  email +'</h6>';;


 var phone = '<h6 class="list-group-item-heading unclickable" align="center">'+ 'Telefono: '+  phone +'</h6>';;

 var price = '<h6 class="list-group-item-heading unclickable" color="red" align="center">'+ 'Precio: '+  price +'</h6>';;

 var lastModifield = '<h6 class="list-group-item-heading unclickable" align="right">'+  lastModifield +'</h6>';;
var creationTimestamp = '<h6 class="list-group-item-heading unclickable" align="right">'+  creationTimestamp +'</h6>';;


  return  a + description + address + fullname + email + phone + price +  creationTimestamp + '</a>' ;
}
