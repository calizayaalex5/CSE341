// aqui crearemos los protocolos de nuestro servidor, primer paso
// de cada proyecto backend o fullstack que hagamos

//se crean las carpetas y archivos necesarios
//luego se inicializa npm con "npm init -y" en la terminal
//se instalan las dependencias con "npm i express"
//se instalan las devDependencies con "npm i -D nodemon"


// var express = require('express'); //importamos express
// var app = express(),
//     port = process.env.PORT || 3000; //definimos el puerto

// app.listen(port); //indicamos a la app que escuche el puerto

// console.log('Todo list RESTful API server started on: ' + port);

'use strict';
//aqui iniciamos el servidor express
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //importamos el modelo de datos
    bodyParser = require('body-parser');

//conexion a la base de datos MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


//middleware para parsear las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//importamos y registramos las rutas
var routes = require('./api/routes/todoListRoute'); //importamos las rutas
routes(app); //registramos las rutas con la app

app.listen(port); //indicamos a la app que escuche el puerto

console.log('Todo list RESTful API server started on: ' + port);

//aqui tenemos el codigo para iniciar nuestro servidor express
//tambien establecemos la conexion a la base de datos MongoDB
//y registramos las rutas de nuestra API
//finalmente indicamos a la app que escuche en el puerto definido
