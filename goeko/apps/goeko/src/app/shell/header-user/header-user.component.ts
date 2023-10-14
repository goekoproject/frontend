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
