const router = require("express").Router();

const RemedioController = require("../controllers/RemedioController")

router.post("/cadastro", RemedioController.cadastro);
router.get("/todos", RemedioController.getAll);


module.exports = router;