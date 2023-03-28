const mongoose = require("../db/config");

const Remedio = mongoose.model(
    "Remedio",
    new mongoose.Schema({
        nome: String,
        preco: String,
        urlImage: String,
    }, 
    {timestamps: true})
)

module.exports = Remedio;