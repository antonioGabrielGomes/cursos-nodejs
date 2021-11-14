const Tabela = require('./TabelaProduto')

class Produto {
    constructor ({ id, titulo, preco, estoque, fornecedor, createdAt, updatedAt, versao }){

        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.createdAt = createdAt 
        this.updatedAt = updatedAt
        this.versao = versao

    }

    validar () {
        if (typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error("O campo titulo está inválido")
        }
        if (typeof this.preco !== 'number' || this.preco === 0) {
            throw new Error('O campo preco está inválido')
        }
    }

    async criar () {
        this.validar()
        const resultado = Tabela.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })

        this.id = resultado.id
        this.createdAt = resultado.createdAt
        this.updatedAt = resultado.updatedAt
        this.versao = resultado.versao
    }

    apagar () {
        return Tabela.remover(this.id, this.fornecedor);
    }

}

module.exports = Produto