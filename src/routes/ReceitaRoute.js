const router = require("express").Router();

const receitaController = require("../controllers/ReceitaController");

router.post("/cadastro", receitaController.cadastro);
router.get("/all/:id", receitaController.get_receita);
router.delete("/deletar/:id", receitaController.delete_receita);
router.get("/get/:hash", receitaController.get_receita_hash)

module.exports = router;