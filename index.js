const express = require('express');
const cors = require('cors');
const app = express();
//Rotas 
const medicoRoute = require("./src/routes/MedicoRoute");
const receitaRoute = require("./src/routes/ReceitaRoute");
const remedioRoute = require("./src/routes/RemediosRoute");
const lojaRoute = require("./src/routes/LojaRoute");
const distanciaRoute = require("./src/routes/DistanciaRoute");

//Config Express
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors());
    next();
})


app.use("/medico", medicoRoute);
app.use("/receita",receitaRoute);
app.use("/produto",remedioRoute);
app.use("/loja", lojaRoute);
app.use("/calcular", distanciaRoute);

app.listen(process.env.PORT || 3000)