const Sequelize = require('sequelize')
const config = require('../config/default.json')

const instancia = new Sequelize(
    config.mysql.database,
    config.mysql.usuario,
    config.mysql.senha,
    {
        host: config.mysql.host,
        dialect: 'mysql',
    }
)


module.exports = instancia