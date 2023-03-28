const lojaModel = require("../models/Loja")

module.exports = class DistanciaController {
    static async calcularDistancia(req, res) {
        let { localizacao_cliente, lista_remedios } = req.body;
	
	if(!lista_remedios || lista_remedios.length < 0)
	{
	    return res.status(400).json({erro: true, msg: "É necessário passar uma lista de remédios"});
	}
	    

        let lojas = await lojaModel.find();
        if (!lojas) {
            return res.status(400).json({
                error: true,
                msg: "Não foi possível encontrar lojas"
            })
        }
        
        const lojasDisponiveis = lojas => lojas.map(loja => {
            let resultado = checarEstoque(lista_remedios, loja.estoque); 
            let {matches, encontrados} = resultado;
            return {
                ...loja,
                matches: matches,
                encontrados: encontrados
            }
        })

        
        const distancia = (melhoresLojas, localizacao_cliente_func) => melhoresLojas.map(loja => {
            return {
                ...loja,
                dist: distance(Number(loja._doc.latitude), Number(loja._doc.longitude), Number(localizacao_cliente_func.latitude), Number(localizacao_cliente_func.longitude)).toFixed(2)
            }
        })

        let l = lojasDisponiveis(lojas);

        
        let melhoresLojas = l.filter(loja => loja.matches >= lista_remedios.length - 1);

        return res.status(200).json({
            encontrado: true,
            lojas: distancia(melhoresLojas,localizacao_cliente)
        })

        function checarEstoque(lista_med, estoque) {
            let matches = 0;
            let encontrados = []
            for (let i = 0; i < lista_med.length; i++) {
                if (estoque.includes(lista_med[i])) {
                    matches = matches + 1;
                    encontrados.push(lista_med[i])
                }
            }

            return {matches,encontrados};
        }

        function distance(lat1, lon1, lat2, lon2) {
            const R = 6371; // raio da Terra em km
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // distância em km
            return d
        }

        function toRadians(degrees) {
            return (degrees * Math.PI) / 180;
        }

    }
}
