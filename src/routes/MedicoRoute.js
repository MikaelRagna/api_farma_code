const router = require("express").Router();

const controller = require("../controllers/MedicoController");

router.post("/cadastro", controller.cadastro);
router.post("/login", controller.login);
router.get("/todos", controller.getAll);

module.exports = router;