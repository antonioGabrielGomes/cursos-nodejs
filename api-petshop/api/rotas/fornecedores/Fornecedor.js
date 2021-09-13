const CampoInvalido = require('../../erro/CampoInvalido')
const DadosNaoFornecido = require('../../erro/DadosNaoFornecidos')
const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {

    constructor({ id, empresa, email, categoria, createdAt,
        updatedAt, versao }) {

        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.versao = versao

    }

    async criar() {
        this.validar()
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
        this.versao = resultado.versao

    }

    async carregar() {
        const resultado = await TabelaFornecedor.buscarPorId(this.id)
        this.empresa = resultado.empresa
        this.email = resultado.email
        this.categoria = resultado.categoria
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
        this.versao = resultado.versao
    }

    async atualizar() {
        await TabelaFornecedor.buscarPorId(this.id)
        const campos = ['empresa', 'email', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }

            if (Object.keys(dadosParaAtualizar).length === 0) {
                throw new DadosNaoFornecido()
            }

        })

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    }

    remover() {
        return TabelaFornecedor.remover(this.id)
    }

    validar() {
        const campos = ['empresa', 'email', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]
            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(`O campo '${campo}' está inválido`)
            }
        })
    }
}

module.exports = Fornecedor