import { Component } from '@angular/core';

import { StudentService } from './services/student.service'

@Component ({
	selector: 'my-app',
	template: `
		<h1>{{title}}</h1>
		<nav>
			<a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
			<a routerLink="/students" routerLinkActive="active">Students</a>		
		</nav>
		<router-outlet></router-outlet>
		`,
	providers: [StudentService],
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	title = 'Tour of Students';
}