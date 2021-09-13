const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

conexao.connect(erro => {
    if (erro) {
        console.log(erro)
    } else {
        Tabelas.init(conexao)
        const app = customExpress()
        app.listen(3000, () => console.log('Listening on port 3000'))
    }
})
