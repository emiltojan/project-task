import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findTaskIdByName'
})
export class FindTaskIdByNamePipe implements PipeTransform {

  transform(parent_task: any, tasks?: any): any {
    let foundTask = tasks.filter(task=>task.task == parent_task)[0];
    return !!foundTask ? foundTask._id : -1 ;
  }

}