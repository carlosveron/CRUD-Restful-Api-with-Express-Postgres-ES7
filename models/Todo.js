const Sequelize = require('sequelize');
const sequelize = require('../database/database').sequelize;
const Op = require('../database/database').Op;
const Task = require('../models/Task');




const Todo = sequelize.define('todo',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true

    },
    name:{
        type: Sequelize.TEXT,

    },
    priority:{
        type: Sequelize.INTEGER,
    },
    description:{
        type: Sequelize.TEXT,
    },
    duedate:{
        type: Sequelize.DATE,
    }
},{
    timestamps:false,


});

Todo.hasMany(Task, {foreignKey: 'todoid', sourceKey: 'id'});
Task.belongsTo(Todo,{foreignKey: 'todoid', targetKey: 'id'});
module.exports = Todo;