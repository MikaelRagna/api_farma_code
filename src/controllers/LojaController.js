const LojaModel = require("../models/Loja");

module.exports = class LojaController
{
    static async cadastrar(req, res)
    
    {
        let { latitude, longitude, endereco, estoque } = req.body;

        if(!latitude)
        {
            return res.status(400).json({erro: true, msg: "Todos os campos precisam ser preenchidos"});
        }

        if(!longitude)
        {
            return res.status(400).json({erro: true, msg: "Todos os campos precisam ser preenchidos"});
        }

        if(!endereco)
        {
            return res.status(400).json({erro: true, msg: "Todos os campos precisam ser preenchidos"});
        }

        if(!estoque)
        {
            return res.status(400).json({erro: true, msg: "Todos os campos precisam ser preenchidos"});
        }

        const result = await LojaModel.findOne({endereco : endereco});

        if(result)
        {
            return res.status(400).json({erro: true, msg: "Uma loja com esse endereço já foi cadastrada"});
        }

        const novaLoja = new LojaModel({
            latitude, longitude, endereco, estoque
        });

        try
        {
            const newLoja = await novaLoja.save();
            return res.status(201).json({criado : true, resultado: newLoja});
        }
        catch(erro)
        {
            return res.status(400).json({erro: true, msg: erro.msg});
        }


    }

        static async pegarTodas(req, res)
        {
            let saida = await LojaModel.find();
            if(!saida || saida.length <= 0)
            {
                return res.status(400).json({erro: true, msg: "Culpa do Babner"});
            }

            return res.status(200).json({
                resultado: saida
            })
        }

}