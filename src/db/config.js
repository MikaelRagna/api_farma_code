const mongoose = require("mongoose");
let connectionUrl = "mongodb+srv://Ragnaruzprevitera:9Z34bIYqdIXWb0cM@cluster0.81ve8si.mongodb.net/?retryWrites=true&w=majority";

async function main()
{
    await mongoose.connect(connectionUrl);
    console.log("Conectado, otário");
}

main().catch(err => console.log(err));

module.exports = mongoose;
