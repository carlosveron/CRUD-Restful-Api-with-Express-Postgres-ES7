const Sequelize = require('sequelize');
const sequelize = require('../database/database').sequelize;
const Op = require('../database/database').Op;

const Task = sequelize.define('tasks',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true

    },
    todoid:{
        type: Sequelize.INTEGER
    },
    name:{
        type: Sequelize.TEXT,

    },
   
    isfinished:{
        type: Sequelize.BOOLEAN
    }
},{
    timestamps:false,


});
module.exports = Task;

