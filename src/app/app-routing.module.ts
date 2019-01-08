import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewTaskComponent} from './components/view-task/view-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

const routes: Routes = [
    {path:'', redirectTo:'/view-task', pathMatch:'full'}, 
    {path:'view-task',component:ViewTaskComponent},
    {path:'add-task',component:AddTaskComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
