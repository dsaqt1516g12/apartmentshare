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

function getSting(uri, complete){
	$.get(uri)
		.done(function(flat){
			complete(flat);
		})
		.fail(function(data){
		});
}
