'use strict';

//mongoosee se usara para interactuar con la base de datos MongoDB

//en este archivo definiremos el esquema del modelo de datos
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: { //crea el dato nombre
        type: String,
        required: 'Kindly enter the name of the task'
    },
    Created_date: { //aqui se guardara la fecha de creacion
        type: Date,
        default: Date.now
    },
    status: {
        type: [{ //aqui se define el estado de la tarea
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending'] //el estado por defecto es pendiente
    }
})

module.exports = mongoose.model('Tasks', TaskSchema);

//aqui podemos ver como se definio el modelo de datos para las tareas
//cada tarea tiene un nombre, una fecha de creacion y un estado
//el modelo se exporta para ser usado en otras partes de la aplicacion

//este es un ejemplo de como definiar el modelo de nuestra API
//usando mongoose para interactuar con MongoDB
