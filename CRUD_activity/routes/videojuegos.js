const router = require("express").Router();
const videojuegosController = require("../controllers/videojuegosController");

router.get("/", videojuegosController.getAll);
router.get("/:id", videojuegosController.getVideojuegoById);
router.post("/", videojuegosController.createGame);
router.put("/:id", videojuegosController.editGame);
router.delete("/:id", videojuegosController.deleteGame);

module.exports = router;
