const moment = require('moment')
const axios = require('axios')
const conexao = require('../infraestrutura/database/conexao')
const respositorio = require("../repositorios/atendimento")
 

class Atendimento {

    constructor() {
        this.dataValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteValido = (tamanho) => tamanho >= 5
        this.valida = (parametros) => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            },
        ]

    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: { data, dataCriacao }, // validando data de entrada
            cliente: { tamanho: atendimento.cliente.length } // validando tamanho do nome do cliente
        }

        const errors = this.valida(parametros)
        const existemErros = errors.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(errors))
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return respositorio.adiciona(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId
                    return { ...atendimento, id }
                })
        }

    }

    lista(res) {
        return respositorio.lista()
    }

    buscarAtendimento(id) {
        return respositorio.buscarAtendimento(id)
            .then(async (resultados) => {
                const atendimento = resultados[0]
                const cpf = atendimento.cliente

                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data

                return atendimento
            })
            .catch(() => {
                return new Promise((resolve, reject) => reject("Nenhum atendimento cadastrado"))
            })

    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        return respositorio.altera(valores, id)
    }

    delete(id, res) {
        return respositorio.delete(id)
    }
}

module.exports = new Atendimento