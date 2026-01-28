// en esta ruta definiremos los endpoints para manejar las tareas

// tendremos '/staks' para obtener todas las tareas, aqui usara metodos GET y POST
// tendremos '/tasks/taskId' para obtener, actualizar o eliminar una tarea por su ID, aqui usara metodos GET, PUT, DELETE

//" /task "
//GET: Obtener todas las tareas
//POST: Crear una nueva tarea

//" /task/:taskId "
//GET: Obtener una tarea por ID
//PUT: Atualizar una tarea por ID
//DELETEL Eliminar una tarea por ID

'use strict'  //modo estricto de JavaScript, esto sirve para evitar errores comunes

module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    // Rutas para manejar las tareas
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};

//aqui definimos las rutas para nuestra API de lista de tareas
//usamos el archivo controlador para manejar las solicitudes a cada ruta

