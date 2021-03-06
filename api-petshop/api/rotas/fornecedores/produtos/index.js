const roteador = require('express').Router({ mergeParams: true })
const Tabela = require('./TabelaProduto')
const Produto = require('./Produto')

roteador.get('/', async (requisicao, respota) => {
    const produtos = await Tabela.listar(requisicao.params.idFornecedor)

    respota.send(
        JSON.stringify(produtos)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const idFornecedor = requisicao.params.idFornecedor
        const corpo = requisicao.body
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
        const produto = new Produto(dados)
        await produto.criar()
        resposta.status(201)
        resposta.send(produto)
    } catch (error) {
        proximo(error)
    }
})

roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        fornecedor: requisicao.params.idFornecedor
    }
    const produto = new Produto(dados)
    await produto.apagar()
    resposta.status(204)
    resposta.end()
})

module.exports = roteador