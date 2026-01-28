const mongoose = require("mongoose");

const clientesSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true }
});

module.exports = mongoose.model("Clientes", clientesSchema);
