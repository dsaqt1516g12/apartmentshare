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
    	//sessionStorage.removeItem("api");
    //	sessionStorage.removeItem("auth-token");
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
	$.get(uri)
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

	//var authToken = JSON.parse(sessionStorage["auth-token"]);
	//var uri = authToken["links"]["current-room-list"].uri;
	$.ajax({
		    	type: 'GET',
		   		url: 'http://localhost:8080/apartmentshare/rooms',
		    	
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
	//var uri = JSON.parse(sessionStorage["uri-flat"]);

	var uri = authToken["links"]["create-flat"].uri;
	console.log(uri);
	$.post(uri,

{
	campusid:campusid,
	address:address,
	description:description,
	numpartner:numpartner,
	smoker:smoker,
	pets:pets,
	girlorboy: girlorboy,
	sqm: sqm,
	furnished: furnished,
	numrooms: numrooms,
	numbathrooms: numbathrooms,
	elevator: elevator,
	plantnum: plantnum,
	internet: internet,
	fianza: fianza,
	estancia: estancia,
    	headers: {
        	"X-Auth-Token":authToken.token
    	}
	
    }).done(function(authToken) { 
		authToken.links = linksToMap(authToken.links);
			sessionStorage["create-flat"] = JSON.stringify(authToken);
	console.log(authToken);
    	complete();
  	}).fail(function(jqXHR, textStatus, errorThrown){	
			var error = jqXHR.responseJSON;
				alert(error.reason);

});
}

function crearhabitacion(campusid, address , description, numpartner, smoker, pets, girlorboy, sqm, furnished, numrooms, numbathrooms, elevator, plantnum, internet, fianza, estancia, complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	campusid= '7998490EA1D011E5ABF5002318A56C8C';
	console.log(authToken.token);
	//var uri = JSON.parse(sessionStorage["uri-flat"]);

	var uri = JSON.parse(sessionStorage["uri-flat"]);
	console.log(uri);

	var uri = uri +'/room';
	console.log(uri);
	$.post(uri,

{
	campusid:campusid,
	address:address,
	description:description,
	numpartner:numpartner,
	smoker:smoker,
	pets:pets,
	girlorboy: girlorboy,
	sqm: sqm,
	furnished: furnished,
	numrooms: numrooms,
	numbathrooms: numbathrooms,
	elevator: elevator,
	plantnum: plantnum,
	internet: internet,
	fianza: fianza,
	estancia: estancia,
	
   		url: uri,
    	headers: {
        	"X-Auth-Token":authToken.userid
    	}
	
    }).done(function(data) { 
	console.log(data);
    	complete();
  	}).fail(function(){});
}




