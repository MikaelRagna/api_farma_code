const RemedioModel = require('../models/Remedio')

module.exports = class RemedioController
{

    static async cadastro(req,res){
      let {nome,preco,urlImage} = req.body
      let remedio = new RemedioModel({
        nome,
        preco,
        urlImage
      })

      let new_remedio = await remedio.save()
      res.json({menssage:"Remedio cadastrado",produto:new_remedio})
    }
    static async getAll(req,res){
      
      let listaRemedios = await RemedioModel.find()
      res.json({produto:listaRemedios})
    }
    

   

}
