import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FindTaskByIdPipe } from './pipes/find-Task-By-Id.pipe';
import { FindTaskIdByNamePipe } from './pipes/find-TaskID-By-Name.pipe';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { AppComponent } from './app.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';



@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    AddTaskComponent,
    FindTaskByIdPipe,
    TaskStatusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
