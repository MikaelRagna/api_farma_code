const receitaModel = require("../models/Receita");
const MedicoModel = require("../models/Medico");
const bcrypt = require("bcrypt");

module.exports = class ReceitaController
{

    //rota de cadastro --> retorna uma receita
    static async cadastro(req, res){
        let {nome_paciente,lista_de_medicamentos,validade,email} = req.body;
      
        const medico = await MedicoModel.findOne({email}).select('-senha')
        let bstring ="";
        //Pro frontend
        bstring  += medico.token;
        bstring  += nome_paciente.replaceAll(" ", "").toLowerCase();
        bstring += Date.now().toString();

        //Pro backend
        let secret = await bcrypt.hash(bstring, 10);
        let regex = /[./]/ig
        const receita = new receitaModel({
            hash:secret.replaceAll(regex, ""),
            nome_paciente,
            lista_de_medicamentos,
            validade,
            autor:medico._id
        });

        const receita_client = {
            hash:bstring,
            nome_paciente,
            lista_de_medicamentos,
            validade,
            autor:medico._id
        }


        await receita.save(); //salvado receita
        res.json({resultado: receita_client, error: false, secret: secret})}
    
    //rota para pegar todas as receitas --> retorna todas as receitas de um médico 996 q
    static async get_receita(req,res){
        let id = req.params.id
        const medico = await MedicoModel.findOne({_id:id}).select('-senha')
        let receitas = await receitaModel.find({autor:medico._id})
        res.json({receitas})
    }
    static async get_receita_hash(req,res){
        let hash = req.params.hash
        const receita = await receitaModel.findOne({hash:hash})
        res.json({receita})      
    }

    static async delete_receita(req, res)
    {
        let receita_id = req.params.id;
        const receita = await receitaModel.findOneAndRemove({_id: receita_id})
        return res.json({receita})
        

    }
        

}
