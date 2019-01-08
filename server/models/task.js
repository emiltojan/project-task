var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
   task : {type: String, required: true, unique: true, dropDups: true}, 
   start_date : {type: String, default: '2019-01-01'}, 
   end_date  : {type: String, default: '2019-01-01'},
   priority : {type: Number, required:true, min: 0, max: 30},
   taskStatus : {type: Boolean, default: false},
   parentTask : {type: mongoose.Schema.ObjectId, ref: 'Task', required: false}
});

var Task = mongoose.model('Task',TaskSchema,'Task');
module.exports = Task;

