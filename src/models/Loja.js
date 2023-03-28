const mongoose = require("../db/config");

const Loja = new mongoose.model("Loja", new mongoose.Schema({
    latitude: {
        type: String,
        unique: true
    },
    longitude: {
        type: String,
        unique: true
    },
    endereco: {
        type: String,
        unique: true
    },
    estoque: {
        type: Array
    }
}));

module.exports = Loja;