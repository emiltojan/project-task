var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../models/task');

//Find all Task
router.get('/tasks', function(req,res,next){ 
    if(Object.keys(req.query).length === 0){
            
         Task.find(function(err,tasks){
            if(err){
                res.status(400).json({success:false, message: 'Error processing request' + err});
            }
            res.status(201).json({success:true, data:tasks});   
        });
    }
    else{
  
        var srch_task = {
            task:req.query.task,
            parentTask:req.query.parentTask,
            priorityTo:req.query.priorityTo,
            priorityFrom:req.query.priorityFrom,
            start_date:req.query.start_date,
            end_date:req.query.end_date
        }
        if(srch_task.start_date){
            srch_start_date = srch_task.start_date;     
        } 
        else {
            srch_start_date = '1990-01-01';
        }

        if(srch_task.end_date){
            srch_end_date = srch_task.end_date;     
        } 
        else {
            srch_end_date = '2099-12-31';
        }
        if(srch_task.priorityFrom){
            srch_priorityFrom = srch_task.priorityFrom;     
        } 
        else {
            srch_priorityFrom = 0;
        }

        if(srch_task.priorityTo){
            srch_priorityTo = srch_task.priorityTo;     
        } 
        else {
            srch_priorityTo = 30;
        }
        if(srch_task.task){
            srch_tsk = srch_task.task;     
        } 
        else {
            srch_tsk = ".*";
        }
        if(srch_task.parentTask){
            srch_parentTsk = new mongoose.Types.ObjectId(srch_task.parentTask);
            Task.find({"task":{$regex:srch_tsk},"parentTask":srch_parentTsk,"start_date":{$gte:srch_start_date},"end_date":{$lte:srch_end_date},"priority":{$gte:srch_priorityFrom,$lte:srch_priorityTo}},function(err,tasks){
                if(err){
                    res.status(400).json({success:false, message: 'Error processing request' + err});
                }
                res.status(201).json({success:true, data:tasks});   
            });    
        } 
        else {
            Task.find({"task":{$regex:srch_tsk},"start_date":{$gte:srch_start_date},"end_date":{$lte:srch_end_date},"priority":{$gte:srch_priorityFrom,$lte:srch_priorityTo}},function(err,tasks){
                if(err){
                    res.status(400).json({success:false, message: 'Error processing request' + err});
                }
                res.status(201).json({success:true, data:tasks});   
            });
        }

    }   

});

//Create a Task
router.post('/tasks', function(req,res,next){
       var task = new Task(req.body);
    task.save(function(err){
        if(err){
            res.status(400).json({success:false, message:'Error processing request' + err});
        }
        res.status(201).json({success:true, message:'Task created successfully'});
    });
});

//Update a Task
router.put('/tasks/:id', function(req, res){
    let task = req.body;
    let id = req.params.id;

    Task.findByIdAndUpdate(id, {$set: task}, {}, function(err, task){
        if(!!err){
            console.error(err);
            res.json({success: false, message: err.message});
        } else {
            res.json({success: true, data: task});
        }
    })
    
});
//Delete a task
router.delete('/tasks/:id', function(req, res){
    let id = req.params.id;

    Task.remove({_id: id}, function(err,task){
        if(!!err){
            console.error(err);
            res.json({success: false, message: err.message});
        } else {
            res.json({success: true, data: task });
        }
    })
    
});

module.exports = router;
