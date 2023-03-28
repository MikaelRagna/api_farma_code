const mongoose = require("../db/config");

const Receita = mongoose.model(
    "Receita",
    new mongoose.Schema({
        hash: String,
        nome_paciente: String,
        lista_de_medicamentos: Array,
        lista_de_indicacoes: Array,
        validade: String,
        autor: String,
    }, 
    {timestamps: true})
)

module.exports = Receita;