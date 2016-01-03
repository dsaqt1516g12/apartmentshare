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

});

$("#formCrearpiso").submit(function(e){
      e.preventDefault();
    //  e.stopImmediatePropagation();
      //creatflat($('#campusid').val(), $('#address').val(), $('#description').val(), $('#numpartner').val(), $('#smoker').val(), $('#pets').val(),$('#girlorboy').val(),$('#sqm').val(),$('#furnished').val(),$('#numrooms').val(),$('#numbathrooms').val(),$('#elevator').val(),$('#plantnum').val(),$('#internet').val(),$('#fianza').val(),$('#estancia').val(), function(){
  	
//  });

  e.preventDefault();
  crearpiso($('#campusid').val(),  $('#address').val(), $('#description').val(), $('#numpartner').val(), $('#smoker').val(), $('#pets').val(),$('#girlorboy').val(), $('#sqm').val(), $('#furnished').val(), $('#numrooms').val(), $('#numbathrooms').val(), $('#elevator').val(), $('#plantnum').val(), $('#internet').val(), $('#fianza').val(), $('#estancia').val(), function(){
  });

      $("#buttonCrearpiso").blur();
	console.log("change");
  	window.location.replace('apartmentshare.html');
    });

