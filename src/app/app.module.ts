import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { StudentsComponent } from './components/students/students.component'
import { StudentDetailsComponent } from './components/student-details/student-details.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentSearchComponent } from './components/student-search/student-search.component';

import { StudentService } from './services/student.service';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports:  [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent,
    StudentSearchComponent
  ],
  providers: [StudentService],
  bootstrap:  [ AppComponent ]
})
export class AppModule { }
