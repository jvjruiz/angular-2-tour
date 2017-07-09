import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component ({
	selector: 'student-details',
	templateUrl: './student-details.component.html',
	styleUrls: ['./student-details.component.css']
})

export class StudentDetailsComponent implements OnInit {
	student: Student;
	
	constructor(
		private studentService: StudentService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params:Params) => this.studentService.getStudent(+params['id']))
			.subscribe(student => this.student = student);
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.studentService.update(this.student)
			.then(()=>this.goBack());
	}
}