import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'pTaskStatus'})
export class TaskStatusPipe implements PipeTransform {
    transform(value) {
        return value ? 'Completed' : 'Pending';
    }
}