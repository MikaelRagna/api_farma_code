const mongoose = require("../db/config");

const Medico = mongoose.model("Medico", new mongoose.Schema({
    nome: String,
    email: {
        type:String,
        unique:true
    },
    senha: String,
    token:{
        type:String,
        unique:true
    }
}, {timestamps: true}));


module.exports = Medico;