import { Component, OnInit } from '@angular/core';
import { AuthService } from '@goeko/core';
import { SmeService } from '@goeko/store';

@Component({
	selector: 'goeko-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	public companyDetail!: any;
	constructor(private _authService: AuthService, private _smeServices: SmeService) {}
	ngOnInit(): void {
		this._smeServices.smeCompanyDetail.subscribe((companyDetail) => {
			if (companyDetail) {
				this.companyDetail = companyDetail;
			}
		});
	}
}
