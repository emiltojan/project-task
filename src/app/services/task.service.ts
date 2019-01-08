import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable()

export class TaskService{
    constructor(private http:Http){}

    getTask(){
        return this.http.get('/api/tasks')
            .pipe(map(res=>res.json()));
    }

    createTask(task){
                return this.http.post('/api/tasks',task)
                    .pipe(map(res=>res.json()));
            }
    endTask(end_task){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
         return this.http.put('/api/tasks/'+ end_task._id, JSON.stringify(end_task),{headers:headers})
        .pipe(map(res=>res.json()));
    }
    delTask(_id){
         return this.http.delete('/api/tasks/'+ _id )
        .pipe(map(res=>res.json()));
    }
    updTask(upd_task){
           var headers = new Headers();
           headers.append('Content-Type','application/json');
           return this.http.put('/api/tasks/' + upd_task._id,JSON.stringify(upd_task),{headers:headers}) 
           .pipe(map(res=>res.json()));    
    }
    
    searchTask(task){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get('/api/tasks',{headers:headers,params:task})
            .pipe(map(res=>res.json()));
    }
  
}

