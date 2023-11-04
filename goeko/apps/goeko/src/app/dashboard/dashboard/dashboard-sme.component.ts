import { Component, OnInit } from '@angular/core';
import { SmeRequestResponse, SmeService, UserService } from '@goeko/store';

@Component({
	selector: 'goeko-dashboard-sme',
	templateUrl: './dashboard-sme.component.html',
	styleUrls: ['./dashboard-sme.component.scss'],
})
export class DashboardSmeComponent implements OnInit {
	public companyDetail!: any;
	public nameLastProject!: string | undefined;
	constructor(private _userService: UserService, private _smeService: SmeService) {}
	ngOnInit(): void {
		this._userService.companyDetail.subscribe((companyDetail) => {
			if (companyDetail) {
				this.companyDetail = companyDetail;
			}
		});
		this._getLastProjectName();
	}

	private _getLastProjectName() {
		this._smeService.getLastProjectBySmeId(this.companyDetail.id).subscribe((project: SmeRequestResponse) => {
			if (project) {
				this.nameLastProject = project.searchName;
			}
		});
	}
}
