const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config(); //carga mis variables en .env

const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = process.env.PORT || 3000;

//conexion a mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));

//middleware
app.use(express.json());

//conexion a rutas
app.use('/', require('./routes'))

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log("Server is running on port " + port);
});