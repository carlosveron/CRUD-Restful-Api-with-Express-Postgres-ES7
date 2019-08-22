const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Todo = require('../models/Todo');



//Insert data in DB
router.post('/', async (req, res, next) => {
  let { name, priority, description, duedate } = req.body;
  try {
    let newTodo = await Todo.create({
      name,
      priority,
      description,
      duedate
    }, {
        fields: ["name", "priority", "description", "duedate"]
      }
    );
    if (newTodo) {
      res.json({
        result: "OK",
        data: newTodo
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        message: "Insert a new Todo failed"
      });
    }
  } catch (error) {
    res.json({
      data: 'failed',
      data: {},
      message: `Insert a new Todo  failed error: ${error}`
    });

  }


});
//update data in DB
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, priority, description, duedate } = req.body;
  try {
    let todos = await Todo.findAll({
      attributes: ['id', 'name', 'priority', 'description', 'duedate'],
      where: { id }
    });
    if (todos.length > 0) {
      todos.forEach(async (todo) => {
        await todo.update({
          name: name ? name : todo.name,
          priority: priority ? priority : todo.priority,
          description: description ? description : todo.description,
          duedate: duedate ? duedate : todo.duedate,
        });
      });
      res.json({
        result: "OK",
        data: todos,
        message: "update a Todo successfully"

      });
    } else {
      res.json({
        result: "failed",
        data: {},
        message: "Cannot find Todo to update Error:" + { $error }
      });
    }
  } catch (error) {

  }
});

//Delete data in DB
router.delete('/:id', async (req, res) => {

  const { id } = req.params;
  try {
    await Task.destroy({
      where: { todoid: id }
    });
    let numberOfDeletedRows = await Todo.destroy({ where: { id } });

    res.json({
      result: "OK",
      message: "Deleted succesfully",
      count: numberOfDeletedRows
    });

  } catch (error) {

    res.json({
      result: "Failed",
      data: {},
      message: 'Delete a Todo failed Error: ' + { $error }
    });

  }

});


//Query all data from DB
router.get('/', async (req, res) => {

  try {
    const todos = await Todo.findAll({ attributes: ['id', 'name', 'priority', 'description', 'duedate'] });
    res.json({
      result: "OK",
      data: todos,
      length:todos.length,
      message: "Query list of Todos succesfully"
    });
  }

  catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: "Cannot Query Error: "+{$error}
        
    });
  }
});

//Get by Id

router.get('/:id', async(req,res)=>{
  const { id } = req.params;
  try {

    const todos = await Todo.findAll({ 
      attributes: ['id', 'name', 'priority', 'description', 'duedate'], 
      where:{id}, 
      include:{
        model:Task,
        as:'tasks',
        require:false
      }
    });

    if(todos.length > 0){
      res.json({
        result:"OK",
        data:todos[0],
        message:"Query of Todo by id succesfully"

      });
    }else{
      res.json({
        result:"failed",
        data:{},
        message:"Cannot find the Todo"

    });
  }
  
  } catch (error) {
    
  }


});

module.exports = router;