$( "#form-signin" ).submit(function( event ) {
  event.preventDefault(); 

  
	if (document.getElementById("email").value.indexOf('@') == -1) 
	{
        $('<div class="alert alert-success"> <strong>Error!</strong> Escriba un campo de emáil válido (¿Olvidó escribir "@"?)</div>').appendTo($("#result"));
		 
	}


	else if (document.getElementById("email").value.indexOf('.') == -1) 
	{
		$('<div class="alert alert-success"> <strong>Error!</strong> Escriba un campo de emáil válido (¿Olvidó escribir el punto?)</div>').appendTo($("#result"));
		
	}
	else if (isNaN($('#phone').val())){
        $('<div class="alert alert-danger"> <strong>Error!</strong> El campo de teléfono sólo acepta caracteres numéricos</div>').appendTo($("#result"));
    }
	else{

  createuser($('#loginid').val(), $('#password').val(), $('#fullname').val(), $('#email').val(), $('#phone').val(), function(){
  	console.log("change");
  	window.location.replace('index.html');


	  });
	}
});

