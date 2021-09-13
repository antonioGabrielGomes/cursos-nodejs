const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor



roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()

    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
    res.status(200).send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()

        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
        res.status(201).send(
            serializador.serializar(fornecedor)
        )
    } catch (error) {
        next(error)
    }
})

roteador.get('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()

        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
       
        res.status(200).send(
            serializador.serializar(fornecedor, ['email', 'createdAt', 'updatedAt', 'versao'])
        )
    } catch (error) {
        next(error)
    }
})

roteador.put('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        //const dados = Object.assign({}, dadosRecebidos, { id: id })
        const dados = { ...dadosRecebidos, id }
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204).end()

    } catch (error) {
        next(error)
    }
})

roteador.delete('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = roteador;