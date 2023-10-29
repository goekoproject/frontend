import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from '@goeko/ui';
import { TranslateModule } from '@ngx-translate/core';
import { SmeService, UserService } from '@goeko/store';

@Component({
	imports: [TranslateModule, CommonModule, ButtonModule],
	selector: 'goeko-side-profile',
	templateUrl: './side-profile.component.html',
	styleUrls: ['./side-profile.component.scss'],
	encapsulation: ViewEncapsulation.None,
	standalone: true,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {
		class: 'side-profile',
		'[class.profile-hide]': '!toogleSideProfile',
		'[class.profile-visibility]': 'visibility',
	},
})
export class SideProfileComponent implements OnDestroy, OnInit {
	@Input()
	public get toogleSideProfile(): boolean {
		return this._toogleSideProfile;
	}
	public set toogleSideProfile(value: boolean) {
		this._toogleSideProfile = value;
	}
	private _toogleSideProfile!: boolean;

	@Input() dataProfile!: any;
	@Input() visibility!: boolean;

	@Input()
	get missingDataProfile(): boolean {
		return this._missingDataProfile;
	}
	set missingDataProfile(missingDataProfile: boolean) {
		this._missingDataProfile = missingDataProfile;
		this.toogleSideProfile = this._missingDataProfile;
	}

	@Output() dataProfileChanged = new EventEmitter();

	_missingDataProfile = false;
	private _smeID!: string;

	constructor(private _router: Router, private _userService: UserService) {}

	ngOnInit(): void {
		this._userService.companyDetail.subscribe((company: any) => (this._smeID = company?.id));
	}
	ngOnDestroy(): void {
		this.toogleSideProfile = false;
	}
	goToProfile() {
		this.toogleSideProfile = false;
		const id = this._smeID ? this._smeID : this.dataProfile.externalId;
		this._router.navigate(['profile', id]);
	}

	hideProfile() {
		if (!this.visibility) {
			this.dataProfileChanged.emit(false);
		}
	}
}
