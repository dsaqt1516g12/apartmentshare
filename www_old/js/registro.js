var API_BASE_URL = "http://localhost:8080/apartmentshare/users";


$("#registrar").click(function(e){
    
    e.preventDefault();
    $("#result_registro").text('');
    
    var Game ;
          
    
        Game = {
            "loginid" : $('#loginid').val(),
            "password" : $('#password').val(),
            "fullname" : $('#fullname').val(),
            "email" : $('#email').val(),
            "phone" : $('#phone').val()           
                    
        }
        console.log (Game);
        Crearegistro(Game);
    
});



function Crearegistro(Game) {
    var url = API_BASE_URL;
    var data = JSON.stringify(Game);
    
    $("#result_registro").text('');

    $.ajax({
        
        url : url,
        contentType: 'x-www-form-urlencoded',
        type : 'POST',
        crossDomain : true,
        dataType : 'json',
        data : data,
        statusCode: {
            400: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Bad Request </div>').appendTo($("#result_registro"));},
            409: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Conflict </div>').appendTo($("#result_registro"));}
        }
        
    }).done(function(data, status, jqxhr) {
    console.log(data);
        $('<div class="alert alert-success"> <strong>Ok!</strong> Usuario Creado</div>').appendTo($("#result_registro"));  
        $("#loginid").val("");
        $("#password").val("");  
        $("#fullname").val("");
        $("#email").val("");
        $("#phone").val("");            
          
    }).fail(function() {
        $('<div class="alert alert-danger"> <strong>Error!</strong> Crear Juego</div>').appendTo($("#result_registro"));
    });

}