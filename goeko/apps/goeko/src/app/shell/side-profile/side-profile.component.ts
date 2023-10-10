import { Component, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'goeko-side-profile',
	templateUrl: './side-profile.component.html',
	styleUrls: ['./side-profile.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'side-profile',
		'[class.profile-hide]': '!toogleSideProfile',
	},
})
export class SideProfileComponent implements OnDestroy {
	@Input() toogleSideProfile!: boolean;
	@Input() dataProfile!: any;

	@Input()
	get notDataUser(): boolean {
		return this._notDataUser;
	}
	set notDataUser(notDataUser: boolean) {
		this._notDataUser = notDataUser;
		this.toogleSideProfile = this._notDataUser;
	}

	_notDataUser = false;
	constructor(private _router: Router) {}

	goToProfile() {
		this.toogleSideProfile = false;
		this._router.navigate(['profile', this.dataProfile.sub]);
	}

	ngOnDestroy(): void {
		this.toogleSideProfile = false;
	}
}
