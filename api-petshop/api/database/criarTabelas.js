const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor')

ModeloTabela.sync()
    .then(()=>console.log('Tabela fornecedores criada'))
    .catch(console.log)