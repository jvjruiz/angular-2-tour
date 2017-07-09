import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Student } from '../models/student';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StudentService {
	private studentsUrl = 'api/students'; //url to web api
	private headers = new Headers({'Content-type': 'application/json'});
	constructor(private http:Http) { }

	getStudents(): Promise<Student[]> {
		return this.http.get(this.studentsUrl)
								.toPromise()
								.then(response => response.json().data as Student[])
								.catch(this.handleError);
	}

	getStudent(id: number): Promise<Student> {
		const url = `${this.studentsUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json().data as Student)
			.catch(this.handleError);
	}

	update(student: Student): Promise<Student> {
		const url = `${this.studentsUrl}/${student.id}`;
		return this.http
								.put(url, JSON.stringify(student), {headers: this.headers})
								.toPromise()
								.then(() => student)
								.catch(this.handleError);
	}

	create(name: string): Promise<Student> {
		return this.http
			.post(this.studentsUrl, JSON.stringify({name:name}), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data as Student)
			.catch(this.handleError)
	}

	delete(id:number):Promise<void> {
		const url = `${this.studentsUrl}/${id}`;
		return this.http.delete(url, {headers:this.headers})
				.toPromise()
				.then(() => null)
				.catch(this.handleError)
	}
	
	private handleError(error:any):Promise<any> {
		console.error('An error has occured', error); //for demo purposes only
		return Promise.reject(error.message || error);
	}
}