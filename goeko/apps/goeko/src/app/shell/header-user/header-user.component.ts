import { Component, OnInit } from '@angular/core';
import { AuthService } from '@goeko/core';
import { SmeService, UserService } from '@goeko/store';
import { error } from 'console';
import { of, switchMap } from 'rxjs';

@Component({
	selector: 'goeko-header-user',
	templateUrl: './header-user.component.html',
	styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
	public tokenData!: any;
	public toogleSideProfile!: boolean;
	public dataUser!: any;
	public notDataUser!: any;
	constructor(private _userService: UserService) {}

	ngOnInit(): void {
		this._getDataProfile();
	}

	private _getDataProfile(): any {
		this._userService.companyDetail.subscribe((company: any) => {
			if (company) {
				this.dataUser = company;
			}
		});
	}

	toogleProfile(toogle: boolean): void {
		this.toogleSideProfile = toogle;
	}
}
