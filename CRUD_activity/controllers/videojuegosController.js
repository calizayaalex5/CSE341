const Videojuegos = require("../models/videojuegos");

//Obetener videojuegos
const getAll = async (req, res) => {
    try {
        const videojuegos = await Videojuegos.find();
        res.status(200).json(videojuegos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//obtener videojuego por ID
const getVideojuegoById = async (req, res) => {
    try {
        const videojuegos = await Videojuegos.findById(req.params.id);
        if (!videojuegos) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.status(200).json(videojuegos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Crear un nuevo item
const createGame = async (req, res) => {
    try {
        const nuevoJuego = await Videojuegos.create(req.body);
        const savedItem = await nuevoJuego.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: "Error de validacion" + error.message });
    }
};

//Editar juego
const editGame = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedGame = await Videojuegos.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedGame) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete juego
const deleteGame = async (req, res) => {
    try {
        const videojuegos = await Videojuegos.findByIdAndDelete(req.params.id);
        if (!videojuegos) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.status(200).json({ message: "Juego eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAll,
    getVideojuegoById,
    createGame,
    editGame,
    deleteGame
};