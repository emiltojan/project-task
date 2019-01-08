import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../tasks';
import { TaskService } from '../../services/task.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  providers:[TaskService]
})
export class AddTaskComponent implements OnInit {

  task: Tasks = new Tasks();
  starting_date:any = {};
  ending_date:any = {};

  parents:{_id:string, task:string}[];

  search:any;
  formatter:any;
  selectedParent:{_id:string, task:string} = null;
  constructor(private taskService: TaskService, private router: Router, public datepipe: DatePipe) { }

  ngOnInit() {
    this.ngBootstrapTypeahead();
    
    // find all the parent ids and tasks
    this.findAllTasks();
    
  }
  
  ngBootstrapTypeahead(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
      : this.parents.filter(parent => parent.task.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
    
    this.formatter = (x: {task: string}) => {
      return x.task;
    };  
    
  }
  
  findAllTasks(){
    this.taskService.getTask()
    .subscribe((res: any)=>{
      if(res.success == true){
        this.parents = res.data;
      } else {
        // console.log("error in finding all tasks");
      }
    })
  }

  addTask(){

    this.task.end_date = new Date(`${this.ending_date.year}/${this.ending_date.month}/${this.ending_date.day}`);
    this.task.start_date = new Date(`${this.starting_date.year}/${this.starting_date.month}/${this.starting_date.day}`);
 
    this.task.start_date = this.datepipe.transform(this.task.start_date, 'yyyy-MM-dd');
    this.task.end_date = this.datepipe.transform(this.task.end_date, 'yyyy-MM-dd');


    if(!!this.selectedParent){
      this.task.parentTask = this.selectedParent._id;
    }

    this.taskService.createTask(this.task)
    .subscribe((res: any)=>{
      if(res.success == true){
        this.router.navigate(['/', 'view-task']);
      } else {
        alert('Invalid Task');
      }
    })
  
  }   
}
