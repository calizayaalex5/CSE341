const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "API de Videojuegos",
        description: "API de Videojuegos"
    },
    host: "localhost:3000",
    schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/clientes.js", "./routes/videojuegos.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
