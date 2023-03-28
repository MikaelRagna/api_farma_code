const router = require("express").Router();
const controller = require("../controllers/DistanciaController");

router.post("/distancia", controller.calcularDistancia);

module.exports = router;