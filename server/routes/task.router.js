var express = require('express');
var router = express.Router();

var Task = require('../models/task');

//Find all Task
router.get('/tasks', function(req,res,next){
    Task.find(function(err,tasks){
        if(err){
            res.status(400).json({success:false, message: 'Error processing request' + err});
        }
        res.status(201).json({success:true, data:tasks});    
    });
});

//Create a Task
router.post('/tasks', function(req,res,next){
    var task = new Task(req.body);
    Task.save(function(err){
        if(err){
            res.status(400).json({success:false, message:'Error processing request' + err});
        }
        res.status(201).json({success:true, message:'Task created successfully'});
    });
});

module.exports = router;
