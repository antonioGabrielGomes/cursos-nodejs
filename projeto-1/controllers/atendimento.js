const Atendimento = require('../models/atendimentos')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(resultados => {
                res.json(resultados)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscarAtendimento(id)
            .then(resultados => {
                res.json(resultados)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
            .then((atendimentoCadastrado) => {
                res.status(201).json(atendimentoCadastrado)
            })
            .catch((erros) => {
                res.status(400).json(erros)
            })

    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores)
            .then(() => {
                res.json({ ...valores, id })
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.delete(id)
            .then(resultados => {
                res.json(resultados)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })


}