// aqui escribiremos el codigo para manejar las solicitudes de la API

'use strick';

var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks'); //importamos el modelo de datos

//funcion para listar todas las tareas
exports.list_all_tasks = async function(req, res) {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
};

//funcion para crear una nueva tarea
exports.create_a_task = async function(req, res) {
    try {
        const newTask = new Task(req.body);
        const task = await newTask.save();
        res.status(200).json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

//funcion para leer una tarea por su ID
exports.read_a_task = async function(req, res) {
    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

//funcion para actualizar una tarea por su ID
exports.update_a_task = async function(req, res) {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.taskId },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};


//funcion para eliminar una tarea por su ID
exports.delete_a_task = async function(req, res) {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task successfully deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};

//aqui definimos las funciones para manejar las solicitudes de la API
//cada funcion interactua con la base de datos usando el modelo de datos
//y envia una respuesta al cliente en formato JSON