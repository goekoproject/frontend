import { Component, OnInit } from '@angular/core';
import { AuthService } from '@goeko/core';

@Component({
	selector: 'goeko-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	constructor(private _authService: AuthService) {}
	ngOnInit(): void {
		const y = this._authService.getUserInfoToken();
		console.log(y);
	}
}
