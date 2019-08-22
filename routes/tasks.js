const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Todo = require('../models/Todo');

//Insert data in DB
router.post('/', async (req, res) => {
    
    let { todoid, name, isfinished } = req.body;
    try {
      let newTask = await Task.create({
        todoid,
        name,
        isfinished,
       
      }, {
          fields: ["todoid", "name", "isfinished"]
        }
      );
      if (newTask) {
        res.json({
          result: "OK",
          data: newTask
        });
      } else {
        res.json({
          result: "failed",
          data: {},
          message: "Insert a new Task failed"
        });
      }
    } catch (error) {
      res.json({
        result: 'failed',
        data: {},
        message: `Insert a new Task  failed error: ${error}`
      });
  
    }
  
  
  });

  //Update data in DB

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { todoid, name, isfinished} = req.body;
    try {
      let tasks = await Task.findAll({
        attributes: ['id', 'todoid', 'name', 'isfinished'],
        where: { id }
      });
      if (tasks.length > 0) {
        tasks.forEach(async (task) => {
          await task.update({
            todoid: todoid ? todoid : task.todoid,
            name: name ? name : task.name,
            isfinished:isfinished ? isfinished:task.isfinished
          });
        });
        res.json({
          result: "OK",
          data: tasks,
          message: "update a Task successfully"
  
        });
      } else {
        res.json({
          result: "failed",
          data: {},
          message: "Cannot find Task to update Error:" + { $error }
        });
      }
    } catch (error) {
  
    }
  });

  //Delete data in DB

  router.delete('/:id', async (req, res) => {

    const { id } = req.params;
    try {
   
      let numberOfDeletedRows = await Task.destroy({ where: { id } });
  
      res.json({
        result: "OK",
        message: "Deleted succesfully",
        count: numberOfDeletedRows
      });
  
    } catch (error) {
  
      res.json({
        result: "Failed",
        data: {},
        message: 'Delete a Task failed Error: ' + { $error }
      });
  
    }
  
  });


//Query all tasks from DB

router.get('/', async (req, res) => {

    try {
      const tasks = await Task.findAll({ attributes: ['id', 'todoid', 'name', 'isfinished'],
       order:[['name','ASC']] });
      res.json({
        result: "OK",
        data: tasks,
        length:tasks.length,
        message: "Query list of Task succesfully"
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
  
      const tasks = await Task.findAll({ 
        attributes: ['id', 'todoid', 'name', 'isfinished'], 
        where:{id}, 
     
      });
  
      if(tasks.length > 0){
        res.json({
          result:"OK",
          data:tasks[0],
          message:"Query of Task by id succesfully"
  
        });
      }else{
        res.json({
          result:"failed",
          data:{},
          message:"Cannot find the Task"
  
      });
    }
    
    } catch (error) {
      
    }
  
  
  });

  //Query by todoid
  

  router.get('/todoid/:todoid', async(req,res)=>{
    const { todoid } = req.params;
    try {
  
      const tasks = await Task.findAll({ 
        attributes: ['id', 'todoid', 'name', 'isfinished'], 
        where:{todoid}, 
     
      });
  
      if(tasks.length > 0){
        res.json({
          result:"OK",
          data:tasks,
          message:"Query of Task by id succesfully"
  
        });
      }else{
        res.json({
          result:"failed",
          data:{},
          message:"Cannot find the Task"
  
      });
    }
    
    } catch (error) {
      
    }
  
  
  });



  module.exports = router;