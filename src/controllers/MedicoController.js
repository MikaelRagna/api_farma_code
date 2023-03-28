const Medico = require("../models/Medico");

module.exports = class MedicoController
{

    //rota de cadastro
    static async cadastro(req, res)
    {
        let {nome, email, senha, token} = req.body;

        const result = await Medico.findOne({email: email});

        if(result){
            res.json({erro:true, msg: "Um usuário com esse e-mail já existe"});
            return;
        } else if(!nome || !email || !senha || !token)
        {
            res.json({erro:true, msg: "Todos os campos precisam ser preenchidos"});
            return;
        }
        
        const medicoCadastro = new Medico({
            nome,
            email,
            senha,
            token
        });

        try{
            const new_medico = await medicoCadastro.save(); // salvando o cadastro no banco
            res.json({medico: new_medico})
        }catch(err)
        {
            res.status(500).json({message: "Erro ao cadastrar médico"});
            console.log(err);
        }
    }
    // rota de login -> faz o login e recebe um objeto de informações
    static async login(req, res)
    {
        let {input_email,pass} = req.body;
        if(!input_email || !pass)
        {
            return res.json({erro: true, message: "Os campos de e-mail e/ou senha precisam ser preenchidos"});
        } else{
            const result = await Medico.findOne({email: input_email}).exec();
            if(result && pass == result.senha)
            {
                return res.json({
                    nome: result.nome,
                    email: result.email,
                    id: result._id
                })
            } else{
                return res.json({erro: true, message: "Email ou senha inválida :("});
                
            }
        }
    }
    // rota para pegar todos os médicos (opcional)
    static async getAll(req, res)
    {
        let medicos = await Medico.find();
        res.json(medicos);
        return;
    }
}