import { Component, OnInit } from '@angular/core';
import { UserService } from '@goeko/store';

@Component({
	selector: 'goeko-dashboard-sme',
	templateUrl: './dashboard-sme.component.html',
	styleUrls: ['./dashboard-sme.component.scss'],
})
export class DashboardSmeComponent implements OnInit {
	public companyDetail!: any;
	constructor(private _userService: UserService) {}
	ngOnInit(): void {
		this._userService.companyDetail.subscribe((companyDetail) => {
			if (companyDetail) {
				this.companyDetail = companyDetail;
			}
		});
	}
}
