import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { Tasks } from '../../tasks';
import { FindTaskIdByNamePipe } from '../../pipes/find-TaskID-By-Name.pipe';

@Component({
    selector:'view-task',
    templateUrl:'./view-task.component.html',
    providers:[TaskService]
})

export class ViewTaskComponent implements OnInit{

    form: FormGroup;
    tasks:Tasks[] = [];
    updTasks:Tasks[] = [];
    upd_id: any;
    upd_task: string;
    upd_priority: number;
    upd_start_date:any;
    upd_end_date:any;
    upd_parentTask:string; 
    parentTaskId :any;

 constructor(private fb: FormBuilder, private taskService:TaskService, private ref: ChangeDetectorRef, private router:Router, public datepipe:DatePipe){
 }


 ngOnInit(): void {
   this.buildForm();
    this.loadTasks();
  }

  buildForm(): void {
    this.form = this.fb.group({
      task: new FormControl(''),
      parentTask: new FormControl(''),
      priorityFrom: new FormControl(''),
      priorityTo: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl('')
    });
    
  }

  loadTasks(): void {
     this.taskService.getTask()
                    .subscribe(tasks => {this.tasks = tasks.data;});
  }

  search(filters: any): void {
    let formValues = filters;
 
    if(filters.start_date){
      console.log("date",filters.start_date);
      let ngbDate = this.form.controls['start_date'].value;
      let myDate = new Date(`${ngbDate.year}/${ngbDate.month}/${ngbDate.day}`);
      let fmtDate = this.datepipe.transform(myDate, 'yyyy-MM-dd');
      formValues['start_date'] = fmtDate;
    } 
    if(filters.end_date){
      let ngbDate = this.form.controls['end_date'].value;
      let myDate = new Date(`${ngbDate.year}/${ngbDate.month}/${ngbDate.day}`);
      let fmtDate = this.datepipe.transform(myDate, 'yyyy-MM-dd');
      formValues['end_date'] = fmtDate;
    }   
    if(filters.parentTask){
      let parent_task = this.form.controls['parentTask'].value;
      this.parentTaskId = new FindTaskIdByNamePipe().transform(parent_task,this.tasks);
      formValues['parentTask'] = this.parentTaskId;
    }  
    if (this.parentTaskId == -1){
      this.tasks = null;
    }
    else{ 
    this.taskService.searchTask(formValues)
    .subscribe(tasks => {this.tasks = tasks.data}); 
    }
  }
  endTask(task): void {

    var end_task = {
        _id:task._id,
        taskStatus:true  
    }
    this.taskService.endTask(end_task)
    .subscribe(newData => {this.tasks = newData.data});
    this.loadTasks();
  }
  delTask(id): void {
        this.taskService.delTask(id)
        .subscribe(newData => {this.tasks = newData.data});
        this.loadTasks();
      }

  editTask(task:any){ 
      this.upd_id = task._id;
      this.upd_task = task.task;
      this.upd_priority = task.priority;
      this.upd_start_date = task.start_date; 
      this.upd_end_date = task.end_date;
      this.upd_parentTask = task.parentTask;
  }

  updTask(updTasks){

    if(updTasks.start_date){
      updTasks.start_date = new Date(`${updTasks.start_date.year}/${updTasks.start_date.month}/${updTasks.start_date.day}`);
      updTasks.start_date = this.datepipe.transform(updTasks.start_date, 'yyyy-MM-dd');
    }

    if(updTasks.end_date){
      updTasks.end_date = new Date(`${updTasks.end_date.year}/${updTasks.end_date.month}/${updTasks.end_date.day}`);
      updTasks.end_date = this.datepipe.transform(updTasks.end_date, 'yyyy-MM-dd');
    }
    var upd_task = {
      _id: this.upd_id,       
      task : updTasks.task,
      priority : updTasks.priority,
      start_date : updTasks.start_date,
      end_date : updTasks.end_date
    }
    
    this.taskService.updTask(upd_task).subscribe(
      newData => {this.tasks = newData.data}
    );
    this.loadTasks();
  }

  reset(){
    this.buildForm();
    this.loadTasks();
  }

}
