const express = require('express');
const { buscarEnderecoPorCep } = require('./viacepService'); 
// Aqui vêm os imports do arquivo JSON e outras funções do grupo...

const app = express();
app.use(express.json());


// Aqui que começa a rota de POST 
app.post('/colaboradores', async (req, res) => {
    try {
        const { nome, cargo, cpf, email, cep, numero } = req.body;

        // ... (Aqui quem está responsável pelas validações de CPF, E-mail, campos vazios precisa adicionar) ...

      
        if (!cep || !numero) {
            return res.status(400).json({ erro: "CEP e número são obrigatórios." });
        }

        
        const enderecoCompleto = await buscarEnderecoPorCep(cep, numero);
       

        
        const novoColaborador = {
            id: Date.now().toString(), 
            nome,
            cargo,
            cpf,
            email,
            endereco: enderecoCompleto, 
            status: "Ativo"
        };

      
        return res.status(201).json({
            mensagem: "Colaborador cadastrado com sucesso!",
            colaborador: novoColaborador
        });

    } catch (error) {
      
        return res.status(400).json({ erro: error.message });
    }
});