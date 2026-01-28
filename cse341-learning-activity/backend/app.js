//creacion de API

const express = require("express"); 
// esto es una libreia que me ayuda a escuchar peticiiones HTTP,
// Tambien permite crear rutas
// Es importante agregarlo ya que es una ayuda en mis proyectos
const cors = require("cors");
// el cors permite que haya una comunicacion entre el fronted y el backend sin problemas
// ESTO ES IMPORTANTE SI EL BACKEND Y EL FRONTED ESTAN DIVIDIDOS EN DOS ARCHIVOS
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const professionalRoutes = require('./routes/professional');

const app = express(); //crea el servidor
//Un ejemplo es colo restaurate
// app = restaurante
// rutes = los menus
// request = clientes

const PORT = process.env.PORT || 8080;
//el servidor
app.use(cors())
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/professional', professionalRoutes);

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.groupCollapsed(err);
    } else {
        app.listen(PORT);
        console.log(`Connected to DB and listening on ${PORT}`)
    }
})