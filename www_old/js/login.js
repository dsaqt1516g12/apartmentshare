$( "#navbar" ).submit(function( event ) {
  console.log("button click");
  event.preventDefault();
  login($("#inputLoginid").val(), $("#inputPassword").val(), function(){
  	console.log("change:  "+$("#inputLoginid").val());
  	//getUserByID($("#inputLoginid").val(), function(){
  		console.log("finished");
  	});
  	window.location.replace('indexusuario.html');
  });
