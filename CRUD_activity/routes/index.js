const router = require("express").Router();

router.use("/clientes", require("./clientes"));
router.use("/videojuegos", require("./videojuegos"));

module.exports = router;