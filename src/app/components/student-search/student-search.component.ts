import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

//observable calss extensions
import 'rxjs/add/observable/of';

//obserable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { StudentSearchService } from '../../services/student-search-service';
import { Student } from '../../models/student';

@Component({
	selector:'student-search',
	templateUrl: './student-search.component.html',
	styleUrls: ['./student-search.component.css'],
	providers: [StudentSearchService]
})

export class StudentSearchComponent implements OnInit {
	students: Observable<Student[]>;
	private searchTerms = new Subject<string>();

	constructor(
		private studentSearchService: StudentSearchService,
		private router: Router ) {}

	//push a search term into the obserable steam
	search(term: string): void {
		console.log(term)
		this.searchTerms.next(term)
	}

	ngOnInit(): void {
		this.students = this.searchTerms
			.debounceTime(300) //wait 300 ms after each keystroke before considering term
			.distinctUntilChanged() //ignore if next search term is the same as before
			.switchMap(term => term //switch to new obserable each time the term changes
				//return the http search observable
				? this.studentSearchService.search(term)
				//or the obserbable of empty heroes if there was no search term
				: Observable.of<Student[]>([]))
			.catch(error => {
				console.log(error)
				return Observable.of<Student[]>([]);
			})
	}

	gotoDetail(student: Student): void {
		let link = ['/detail', student.id];
		this.router.navigate(link);
	}
}

