const router = require("express").Router();
const clientesController = require("../controllers/clientesController");

router.get("/", clientesController.getAll);
router.get("/:id", clientesController.getClienteById);
router.post("/", clientesController.createCliente);
router.put("/:id", clientesController.editCliente);
router.delete("/:id", clientesController.deleteCliente);

module.exports = router;
