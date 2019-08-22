const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'db_todo', //dbname
    'postgres', //username
    'admin', //password

    {
        dialect: 'postgres',
        host:'localhost',
        
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000,
        }
    }
);

const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
}