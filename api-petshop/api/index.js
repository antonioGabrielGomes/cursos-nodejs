const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config/default.json')
const NaoEncontrado = require('./erro/NaoEncontrado')
const CampoInvalido = require('./erro/CampoInvalido')
const DadosNaoFornecido = require('./erro/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erro/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

app.use(bodyParser.json())
// express.urlencoded

app.use((req, res, next) => {
    let formato = req.header('Accept')

    if (formato === '*/*') {
        formato = 'application/json'
    }

    if (formatosAceitos.indexOf(formato) === -1) {
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formato)
    next()
})

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.use((erro, req, res, next) => {
    let status = 500

    if (erro instanceof NaoEncontrado) status = 404
    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecido) status = 400
    if (erro instanceof ValorNaoSuportado) status = 406

    const serializador = new SerializadorErro(
        res.getHeader('Content-Type')
    )

    res.status(status).send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.api.porta, () => {
    console.log('Server is running on port 3000')
})