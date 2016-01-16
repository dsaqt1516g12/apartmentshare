$( "#form-signin" ).submit(function( event ) {
  event.preventDefault(); 
  createuser($('#loginid').val(), $('#password').val(), $('#fullname').val(), $('#email').val(), $('#phone').val(), function(){
  	console.log("change");
  	window.location.replace('index.html');
  });
});

