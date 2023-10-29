import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { SS_USERTYPE, UserContextService } from '@goeko/core';
import { SmeService, UserService } from '@goeko/store';
import { combineLatest } from 'rxjs';

@Component({
	selector: 'goeko-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	form!: FormGroup;
	dataProfile: any;
	savedProfileOK!: boolean;
	_userType!: string;
	_externalId!: string;
	constructor(
		private _fb: FormBuilder,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _smeServices: SmeService,
		private _userContextService: UserContextService
	) {}

	ngOnInit(): void {
		const externalId = this._route.snapshot.params['externalId'];
		this._getUserContext();
		this._createFormGroup();
		this._getDataprofile();
	}

	private _getUserContext() {
		combineLatest({
			userType: this._userContextService.userType,
			externalId: this._userContextService.externalId,
		}).subscribe((res: { userType: string; externalId: string }) => {
			if (res) {
				this._userType = res.userType;
				this._externalId = res.externalId;
				this._userService.getUserProfile(res.userType, res.externalId);
			}
		});
	}

	private _createFormGroup() {
		this.form = this._fb.group({
			name: [''],
			country: [''],
			email: [''],
			website: [''],
			externalId: [this._externalId],
		});
	}

	private _getDataprofile() {
		this._userService.companyDetail.subscribe((companyDetail) => {
			if (companyDetail) {
				this.form.patchValue(companyDetail);
				this.dataProfile = companyDetail;
			}
		});
	}

	saveProfile() {
		this._userService.createDataProfile(this._userType, this.form.value).subscribe((dataProfile) => {
			if (dataProfile) {
				this._changeDataProfile(dataProfile);
			}
		});
	}

	updateProfile() {
		this._userService
			.udpateDataProfile(this._userType, this.dataProfile?.id, this.form.value)
			.subscribe((dataProfile: any) => {
				this._changeDataProfile(dataProfile);
			});
	}

	private _changeDataProfile(dataProfile: any) {
		this.savedProfileOK = true;
		this._userService.companyDetail = dataProfile;
		setTimeout(() => {
			this.savedProfileOK = false;
		}, 3000);
	}
}
