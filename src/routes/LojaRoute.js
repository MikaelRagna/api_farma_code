const router = require("express").Router();
const controller = require("../controllers/LojaController");

router.post("/cadastrar", controller.cadastrar);
router.get("/all", controller.pegarTodas);

module.exports = router;