var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
   task : {type: String, required: true, unique: true, dropDups: true}, 
   start_date : {type: Date, default: Date.now}, 
   end_date  : {type: Date, default: Date.now},
   priority : {type: Number, required:true, min: 0, max: 30},
   taskStatus : {type: Boolean, default: false},
   parentTask : {type: mongoose.Schema.ObjectId, ref: 'Task', required: false}
});

var Task = mongoose.model('Task',TaskSchema);
module.exports = Task;

