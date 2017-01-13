var app = angular.module("myApp", []);

app.controller("myController", function($scope, $http) {
  // Trae de la URL los objetos
  // response.data contiene los datos que se crearon
  //  Cochinada ambas llamadas son equivalentes
  //  var xxxx = this; (xxxx -> le ponen self)
  // $scope.loquesea = 1
  // xxxx.loquesea = 1

// xxxx.actualizar = function() .....

  $scope.actualizar = function() {
    $scope.registro = false;
// Metodo importante para saber si se guardar si se actualiza o lo que sea .... esto se ve en swagger
    $http({
      method: 'GET',
      url: 'http://localhost:8080/v1/user'  // La URL muy importante ! un put a /user no sirve es /user/id
    }).then(function successCallback(response) { // Callback, cuando este listo yo lo llamo
      $scope.usuarios = response.data; // El response.data contiene todo lo que tiene la tabla en forma de array
    }, function errorCallback(response) {
      console.log("eeeerroooorr!!!");
    });
  }


  // Funcionde borrar
  $scope.borrar = function(usuario) {
    console.log("Quiero borrar al usuario " + usuario.Username);

    $http({
      method: 'DELETE', // Ojo el metodo es delete
      url: 'http://localhost:8080/v1/user/' + usuario.Id // La url aqui se construye
    }).then(function successCallback(response) {
      $scope.actualizar();

    }, function errorCallback(response) {
      console.log("eeeerroooorr!!!");
    });
  }

  $scope.ver = function(usuario) {

    $scope.registro = true; // Esto es para el ng-show
    $scope.usuario = usuario;
    $scope.accion = "Actualizar"; // Esto es para el texto del boton


  }

  $scope.actualizarUsuario = function() {

    console.log($scope.usuario);

    if($scope.accion == "Actualizar"){
      $http({
        method: 'PUT',
        url: 'http://localhost:8080/v1/user/' + $scope.usuario.Id,
        data: $scope.usuario // Ojo esta es la informacion que se envia para actualizar
      }).then(function successCallback(response) {
        $scope.actualizar();

      }, function errorCallback(response) {
        console.log("eeeerroooorr!!!"); // Si la URL esta mal, pues hay un error
      });

    }

    if($scope.accion == "Guardar"){

       $http({
         method: 'POST', // Ojo el metodo, ver swagger
         url: 'http://localhost:8080/v1/user',
         data: $scope.usuario
       }).then(function successCallback(response) {
          $scope.actualizar(); // Una vez guarde, debe traer nuevamente todos los registros de la base de datos
       }, function errorCallback(response) {
         console.log("eeeerroooorr!!!");
       });
    }


  }

  $scope.ocultar = function() {
    $scope.registro = false; // Permite ocultar el formulario
  }

  $scope.crear = function(usuario) {
    $scope.registro = true; // Permite mostrar el formulario
    $scope.accion = "Guardar";
    $scope.usuario = { // Hace un reset del usuario actual, para poder crear un usuario vacio
      "Password": "defecto",
      "Profile": {
        "Address": "",
        "Age": 28,
        "Email": "",
        "Gender": "Male"
      },
      "Username": ""
    }
  };


});
