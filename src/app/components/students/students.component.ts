import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'my-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})

export class StudentsComponent implements OnInit {

  students: Student[];
  selectedStudent: Student;

  constructor(
    private router: Router,
    private studentService: StudentService
    ) { }

  getStudents(): void {
    this.studentService.getStudents().then(students => this.students = students);
  }

  ngOnInit(): void {
    this.getStudents();
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedStudent.id])
  }

  add(name:string):void {
    name = name.trim();
    if(!name) { return; }
    this.studentService.create(name)
        .then(student => {
          this.students.push(student);
          this.selectedStudent = null;
        })
  }

  delete(student: Student): void {
    this.studentService
      .delete(student.id)
      .then(() => {
        this.students = this.students.filter(s => s !== student);
        if(this.selectedStudent === student) { this.selectedStudent = null; }
      })
  }
}