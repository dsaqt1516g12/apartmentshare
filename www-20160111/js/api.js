var BASE_URI="http://127.0.0.1:8080/apartmentshare"

function linksToMap(links){
	var map = {};
	$.each(links, function(i, link){
		$.each(link.rels, function(j, rel){
			map[rel] = link;
		});
	});

	return map;
}

function loadAPI(complete){
	$.get(BASE_URI)
		.done(function(data){
			var api = linksToMap(data.links);
			sessionStorage["api"] = JSON.stringify(api);
			complete();
		})
		.fail(function(data){
		});
}

function login(loginid, password, complete){
	loadAPI(function(){
		var api = JSON.parse(sessionStorage.api);
		var uri = api.login.uri;
		$.post(uri,
			{
				login: loginid,
				password: password
			}).done(function(authToken){
				authToken.links = linksToMap(authToken.links);
				sessionStorage["auth-token"] = JSON.stringify(authToken);
				complete();
			}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
			}
		);
	});
}

function logout(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["logout"].uri;
	console.log(authToken.token);
	$.ajax({
    	type: 'DELETE',
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
    }).done(function(data) { 
    	sessionStorage.removeItem("api");
    	sessionStorage.removeItem("auth-token");
    	complete();
  	}).fail(function(){});
}

function EliminarUsuario(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["user-profile"].uri;
	console.log(authToken.token);
	$.ajax({
    	type: 'DELETE',
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
    }).done(function(data) { 
    	sessionStorage.removeItem("api");
    	sessionStorage.removeItem("auth-token");
    	complete();
  	}).fail(function(){});
}


function EliminarPiso(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	//var uri = authToken["links"]["logout"].uri;
	var uri = JSON.parse(sessionStorage["uri-flat"]);
	console.log(authToken.token);
		console.log(uri);
	$.ajax({
    	type: 'DELETE',
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
    }).done(function(data) { 
	window.location.replace('apartmentshare.html');
    	complete();
  	}).fail(function(){});
}

function EliminarHabitacion(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	//var uri = authToken["links"]["logout"].uri;
	//var uri = JSON.parse(sessionStorage["uri-flat"]);
	var uri = JSON.parse(sessionStorage["uriroom"]);
	console.log(authToken.token);
		console.log(uri);
	$.ajax({
    	type: 'DELETE',
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
    }).done(function(data) { 
    //	sessionStorage.removeItem("api");
    	//sessionStorage.removeItem("auth-token");
    	complete();
  	}).fail(function(){});
}


function getCurrentUserProfile(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["user-profile"].uri;
	$.get(uri)
	$.ajax({
	    	type: 'GET',
	   		url: uri,
	    	headers: {
			"X-Auth-Token":authToken.token
	    	}
	    }).done(function(user){
			user.links = linksToMap(user.links);
			complete(user);
		})
		.fail(function(){});
}



function loadFlats(uri, complete){

	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["current-flat"].uri;
	console.log(authToken.token);
	$.ajax({
		    	type: 'GET',
		   		url: uri,
		    	headers: {
				"X-Auth-Token":authToken.token
		    	}
		    }).done(function(flats){
			flats.links = linksToMap(flats.links);
			complete(flats);
		})
		.fail(function(){});

}
function loadRooms( complete){
	$.ajax({
		    	type: 'GET',
		   		url: 'http://localhost:8080/apartmentshare/rooms',
		    	
		    }).done(function(rooms){
			rooms.links = linksToMap(rooms.links);
			complete(rooms);
		})
		.fail(function(){});

}
function getRooms(uri, complete){

	sessionStorage["uri-rooms2"] = JSON.stringify(uri);

	$.get(uri)
	$.ajax({
		    	type: 'GET',
		   		url: uri,
		    	
		    }).done(function(rooms){
			rooms.links = linksToMap(rooms.links);
			complete(rooms);
		})
		.fail(function(){});

}
function loadRoomsList(uri,complete){

	var authToken = JSON.parse(sessionStorage["auth-token"]);
	$.get(uri)
	$.ajax({
		    	type: 'GET',
		   		url: uri,
				headers: {
				"X-Auth-Token":authToken.token
		    	}
		    	
		    }).done(function(rooms){
			rooms.links = linksToMap(rooms.links);
			complete(rooms);
		})
		.fail(function(){});

}

function getFlat(uri, complete){
	$.get(uri)
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	console.log(authToken.token);
	$.ajax({
		    	type: 'GET',
		   		url: uri,
		    	headers: {
				"X-Auth-Token":authToken.token
		    	}
		    }).done(function(flat){
			flat.links = linksToMap(flat.links);
			complete(flat);
		})
		.fail(function(data){
		});
}

function getRoom(uri, complete){
	$.get(uri)
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	console.log(authToken.token);
	$.ajax({
		    	type: 'GET',
		   		url: uri,
		    	headers: {
				"X-Auth-Token":authToken.token
		    	}
		    }).done(function(room){
			room.links = linksToMap(room.links);
			complete(room);
		})
		.fail(function(data){
		});
}
function createuser(loginid, password, fullname, email, phone, complete){
	loadAPI(function(){
		var api = JSON.parse(sessionStorage.api);
		var uri = "http://0.0.0.0:8080/apartmentshare/users";
		//var uri = api.createuser.uri;
		$.post(uri,
			{
				loginid: loginid,
				password: password,
				fullname: fullname,
				email: email,
				phone: phone

			}).done(function(authToken){
				authToken.links = linksToMap(authToken.links);
				sessionStorage["create-user"] = JSON.stringify(authToken);
				complete();
			}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
			}
		);
	});
}

function crearpiso(campusid, address , description, numpartner, smoker, pets, girlorboy, sqm, furnished, numrooms, numbathrooms, elevator, plantnum, internet, fianza, estancia, complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	campusid= '7998490EA1D011E5ABF5002318A56C8C';
	console.log(authToken.token);
	var nuevopiso = new Object();
	nuevopiso.campusid= campusid;
	nuevopiso.address= address;
	nuevopiso.description= description;
	nuevopiso.numpartner= numpartner;
	nuevopiso.smoker= smoker;
	nuevopiso.pets= pets;
	nuevopiso.girlorboy= girlorboy;
	nuevopiso.sqm= sqm;
	nuevopiso.furnished= furnished;
	nuevopiso.numrooms= numrooms;
	nuevopiso.numbathrooms= numbathrooms;
	nuevopiso.elevator= elevator;
	nuevopiso.plantnum= plantnum;
	nuevopiso.internet= internet;
	nuevopiso.fianza= fianza;
	nuevopiso.estancia= estancia;
	console.log(nuevopiso);

	var uri = authToken["links"]["create-flat"].uri;
	console.log(uri);

	$.ajax({
	type: 'POST',
	url: uri,
	crossDomain : true,
	dataType : 'json',
	data: nuevopiso,
        contentType: "application/x-www-form-urlencoded", 
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
	
    }).done(function(flat) { 
		flat.links = linksToMap(flat.links);
		console.log(flat);
    	complete();
  	}).fail(function(jqXHR, textStatus, errorThrown){	
			var error = jqXHR.responseJSON;
				alert(error.reason);

	});
}


function putpiso(campusid, address , description, numpartner, smoker, pets, girlorboy, sqm, furnished, numrooms, numbathrooms, elevator, plantnum, internet, fianza, estancia, complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	campusid= '7998490EA1D011E5ABF5002318A56C8C';
	console.log(authToken.token);
	var id = JSON.parse(sessionStorage["idflat"]);
	var uri = JSON.parse(sessionStorage["uri-flat"]);
	var userid= authToken.userid;
	console.log(uri);

	var flatjson= "application/vnd.dsa.apartmentshare.flat+json";
	
	var data ={"id":id,"userid":userid,"campusid":campusid,"address":address,"description":description,"numpartner":numpartner,"smoker":smoker,
	"pets":pets,"girlorboy":girlorboy,"sqm":sqm,"furnished":furnished,"numrooms":numrooms,"numbathrooms":numbathrooms,"elevator":elevator,
	"plantnum":plantnum,"internet":internet,"estancia":estancia}
	$.ajax({
	type: 'PUT',
	url: uri,
	crossDomain : true,
        dataType : 'raw',
	contentType:"application/raw", 
	data : JSON.stringify(data),
    	headers: {
        	"X-Auth-Token":authToken.token,
		"Content-Type":flatjson
    	}
	
    }).done(function(flat) { 
		flat.links = linksToMap(flat.links);
		console.log(flat);
    	complete();
  	}).fail(function(){});
}

function putUsuario(loginid, fullname, email, phone, complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["user-profile"].uri;
	var id= authToken.userid;
	var usuariojson= "application/vnd.dsa.apartmentshare.user+json";

	var data = {"id":id,"loginid":loginid,"fullname":fullname,"email":email,"phone":phone}

		$.ajax({
			type: 'PUT',
			url: uri,
			crossDomain : true,
			dataType : 'raw',
			contentType:"application/raw",  
			data : JSON.stringify(data),
 
		    	headers: {
				"X-Auth-Token":authToken.token,
				"Content-Type":usuariojson
			
		    	}
	    }).done(function(user){
			user.links = linksToMap(user.links);
			complete(user);
		})
		.fail(function(){});
}


function crearhabitacion(description, girlorboy , sqm, furnished, status, price, complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	campusid= '7998490EA1D011E5ABF5002318A56C8C';
	console.log(authToken.token);
	var uri = JSON.parse(sessionStorage["uri-flat"]);
	console.log(uri);

	var uri = uri +'/room';
	console.log(uri);

	var nuevahabitacion = new Object();
	nuevahabitacion.description= description;
	nuevahabitacion.girlorboy= girlorboy;
	nuevahabitacion.sqm= sqm;
	nuevahabitacion.furnished= furnished;
	nuevahabitacion.status= status;
	nuevahabitacion.price= price;
	console.log(nuevahabitacion);


	$.ajax({
	type: 'POST',
	url: uri,
	crossDomain : true,
	data: nuevahabitacion,
	dataType : 'json',
        contentType: "application/x-www-form-urlencoded", 
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
	
    }).done(function(data) { 
	console.log(data);
    	complete();
  	}).fail(function(){});
}

function puthabitacion(description, girlorboy , sqm, furnished, status, price, complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	console.log(authToken.token);
	var uri = JSON.parse(sessionStorage["uriroom"]);
	console.log(uri);

	var userid= authToken.userid;

	//var uri = uri +'/room';
	console.log(uri);
	var roomjson= "application/vnd.dsa.apartmentshare.room+json";
	var id = JSON.parse(sessionStorage["idroom"]);
	var flatid = JSON.parse(sessionStorage["idroom-flat"]);

	var data= {"id":id,"userid":userid,"flatid":flatid,"description":description,"girlorboy":girlorboy,"sqm":sqm,"furnished":furnished,"status":status,"price":price}

	$.ajax({
	type: 'PUT',
	url: uri,
	crossDomain : true,
	data : JSON.stringify(data),
 	dataType : 'raw',
	contentType:"application/raw", 
    	headers: {
        	"X-Auth-Token":authToken.token,
		"Content-Type":roomjson
    	}
	
    }).done(function(data) { 
	console.log(data);
    	complete();
  	}).fail(function(){});
}




