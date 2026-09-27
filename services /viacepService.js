
async function buscarEnderecoPorCep(cep, numero) {

    const cepLimpo = cep.replace(/\D/g, '');


    if (cepLimpo.length !== 8) {
        throw new Error("O CEP deve conter exatamente 8 números.");
    }

    try {

        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

      
        if (data.erro) {
            throw new Error("CEP não encontrado na base dos Correios.");
        }


        return {
            cep: data.cep,
            logradouro: data.logradouro,
            numero: numero,
            bairro: data.bairro,
            cidade: data.localidade, 
            estado: data.uf
        };

    } catch (error) {
       
        throw new Error(error.message || "Erro ao consultar o serviço de CEP.");
    }
}

module.exports = { buscarEnderecoPorCep };