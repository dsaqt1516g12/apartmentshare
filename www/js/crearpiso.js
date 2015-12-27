var API_BASE_URL = "http://0.0.0.0:8080/apartmentshare";



$("#crearpiso").click(function(e){

    e.preventDefault();
    $("#result").text('');

    var Piso ;
    if($('#address').val() == "" || $('#metros').val()=="" || $('#fianza').val()=="" ) {
        console.log ("HALLO");
        $('<div class="alert alert-info">Es obligatorio rellenar todos los campos</div>').appendTo($("#result"));
    }

    else{

            Piso = {
            "creationdate" : $('#fecha').val(),
            "address" : $('#address').val(),
            "personas" : $('#personas').val(),
            "fumadores" : $('#fumadores').val(),
            "mascotas" : $('#mascotas').val(),
            "amueblado" : $('#amueblado').val(),
            "bano" : $('#bano').val(),
            "sexo" : $('#sexo').val(),
            "metros" : $('#metros').val(),
            "ascensor" : $('#ascensor').val(),
            "internet" : $('#internet').val(),
            "estancia" : $('#estancia').val(),
            "fianza" : $('#fianza').val(),
            "foto" : $('#foto').val(),
            "description" : $('#descripcion').val()
        }
        console.log (Piso);
        createPile(Piso);
    }
});

function createFile(Piso) {
    var url = API_BASE_URL;
    var data = JSON.stringify(Piso);

    $("#result").text('');

    $.ajax({

        url : url,
        contentType: 'application/json',
        type : 'POST',
        crossDomain : true,
        dataType : 'json',
        data : data,
        statusCode: {
            400: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Bad Request </div>').appendTo($("#result"));},
            409: function() {$('<div class="alert alert-danger"> <strong>Error!</strong> Conflict </div>').appendTo($("#result"));}
        }

    }).done(function(data, status, jqxhr) {
        console.log(data);
        $('<div class="alert alert-success"> <strong>Ok!</strong> Piso/Vivienda creado/a</div>').appendTo($("#result"));
        $("#creationdate").val("");
        $("#address").val("");
        $("#personas").val("");
        $("#fumadores").val("");
        $("#mascotas").val("");
        $("#amueblado").val("");
        $("#bano").val("");
        $("#sexo").val("");
        $("#metros").val("");
        $("#ascensor").val("");
        $("#internet").val("");
        $("#estancia").val("");
        $("#fianza").val("");
        $("#foto").val("");
        $("#description").val("");

    }).fail(function() {
        $('<div class="alert alert-danger"> <strong>Error!</strong> Al crear Piso/Vivienda</div>').appendTo($("#result"));
    });

}

