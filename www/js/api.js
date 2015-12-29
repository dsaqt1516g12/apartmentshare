var BASE_URI="http://0.0.0.0:8080/apartmentshare"
var BASE_URI_USER="http://0.0.0.0:8080/apartmentshare/users"


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
		//var uri = api.login.uri;
		var uri = BASE_URI;
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

/*
function getUserByID(id){
	loadAPI(function(){
		var api = JSON.parse(sessionStorage.api);
		//TODO: check uri

		var uri = BASE_URI_USER + "/" + id;

		// "http://0.0.0.0:8080/apartmentshare/users/"+id;
		//api.users.uri;//+"/"+loginid;
		$.get(uri,
		{
			//params : ID loginid
			id: loginid

		}).done(function(user){
			console.log(user);

		}).fail(function(jqXHR, textStatus, errorThrown){
				var error = jqXHR.responseJSON;
				alert(error.reason);
		});
	});
}
*/

function users(loginid, password, fullname, email, phone, complete){
	loadAPI(function(){
		var api = JSON.parse(sessionStorage.api);
		var uri = api.registro.uri;
		$.post(uri,
			{
				loginid: loginid,
				password: password,
				fullname: fullname,
				email: email,
				phone: phone

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

function getCurrentUserProfile(complete){
	var authToken = JSON.parse(sessionStorage["auth-token"]);
	var uri = authToken["links"]["user-profile"].uri;
	$.get(uri)
		.done(function(user){
			user.links = linksToMap(user.links);
			complete(user);
		})
		.fail(function(){});
}

function loadStings(uri, complete){
	// var authToken = JSON.parse(sessionStorage["auth-token"]);
	// var uri = authToken["links"]["current-stings"].uri;
	$.get(uri)
		.done(function(stings){
			stings.links = linksToMap(stings.links);
			complete(stings);
		})
		.fail(function(){});
}

function getSting(uri, complete){
	$.get(uri)
		.done(function(sting){
			complete(sting);
		})
		.fail(function(data){
		});
}