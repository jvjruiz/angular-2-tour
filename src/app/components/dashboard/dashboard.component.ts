import { Component, OnInit } from '@angular/core';

import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
	selector: 'my-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	students: Student[] = [];

	constructor(private studentService: StudentService) { }

	ngOnInit(): void { 
		this.studentService.getStudents()
			.then(students => this.students = students.slice(1,5));
	}
	
}