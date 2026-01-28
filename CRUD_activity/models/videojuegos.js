const mongoose = require("mongoose");

const videojuegosSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    published_date: { type: Date, default: Date.now },
    price: { type: Number, required: true, min: 0 },
    publisher: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    description: { type: String, required: true }
});

module.exports = mongoose.model("Videojuegos", videojuegosSchema);