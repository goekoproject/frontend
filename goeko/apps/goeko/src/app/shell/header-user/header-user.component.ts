import { Component, OnInit } from '@angular/core';
import { AuthService } from '@goeko/core';
import { SmeService } from '@goeko/store';
import { error } from 'console';

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
		this.tokenData = this._authservice.getUserInfoToken();
		this._getSmeData();
	}

	private _getSmeData() {
		if (!this.tokenData?.externalId) {
			return;
		}
		this._smeServices.getByIdExternal(this.tokenData?.externalId).subscribe(
			(data) => {
				console.log(data);
				if (data) {
					this.dataUser = {
						...this.tokenData,
						data,
					};
				}
			},
			(error) => {
				if (error.status === 404) {
					this.notDataUser = false;
				}
			}
		);
	}
}
