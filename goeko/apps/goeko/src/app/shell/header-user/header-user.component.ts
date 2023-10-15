import { Component, OnInit } from '@angular/core';
import { AuthService } from '@goeko/core';
import { SmeService } from '@goeko/store';
import { error } from 'console';
import { of, switchMap } from 'rxjs';

@Component({
	selector: 'goeko-header-user',
	templateUrl: './header-user.component.html',
	styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
	public tokenData!: any;
	public toogleSideProfile = true;
	public dataUser!: any;
	public notDataUser!: any;
	constructor(private _authservice: AuthService, private _smeServices: SmeService) {}

	ngOnInit(): void {
		this._getSmeData();
		this._getDataProfile();
	}

	private _getDataProfile(): any {
		this._smeServices.smeCompanyDetail.subscribe((company: any) => {
			if (company) {
				this._smeServices.getByIdExternal(company.externalId).subscribe(
					(data: any) =>
						(this.dataUser = {
							...this.tokenData,
							data,
						})
				);
			}
		});
	}

	private _getSmeData() {
		this._authservice.authData
			.pipe(
				switchMap((authData) => {
					if (authData) {
						this.tokenData = authData;
						return this._smeServices.getByIdExternal(authData.externalId);
					}
					return of(null);
				})
			)
			.subscribe((data) => {
				if (data) {
					this.dataUser = {
						...this.tokenData,
						data,
					};
				}
			});
	}
}
