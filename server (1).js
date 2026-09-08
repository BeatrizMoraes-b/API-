const http = require('http');
const controller = require('./src/controllers/colaboradoresController');

const server = http.createServer((req, res) => {
    console.log("passou aqui - no create Server")
    const { url, method } = req;
    if (url === '/colaboradores' && method === 'GET') {
        controller.getColaboradores(req, res);
    }
    else if (url === '/colaboradores' && method === 'POST') {
        controller.postColaborador(req, res);
    }
    else if (url.startsWith('/colaboradores/') && method === 'GET') {
        controller.getColaboradorByCpf(req, res);
    }
    else if (url.startsWith('/colaboradores/') && method === 'DELETE') {
        controller.deleteColaborador(req, res);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: "Rota não encontrada" }));
    }
});
server.listen(3000, () => console.log("Gestão de Colaboradores Server ON na porta 3000"));