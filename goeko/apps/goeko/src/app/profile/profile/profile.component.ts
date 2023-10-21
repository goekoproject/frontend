import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { SmeService } from '@goeko/store';

@Component({
	selector: 'goeko-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
	form!: FormGroup;
	dataProfile: any;
	savedProfile!: boolean;
	constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _smeServices: SmeService) {}

	ngOnInit(): void {
		const externalId = this._route.snapshot.params['externalId'];
		console.log(externalId);
		this._createFormGroup(externalId);
		this._getDataprofile();
	}

	private _createFormGroup(externalId: string) {
		this.form = this._fb.group({
			name: [''],
			country: [''],
			email: [''],
			website: [''],
			externalId: [externalId],
		});
	}

	private _getDataprofile() {
		this._smeServices.smeCompanyDetail.subscribe((companyDetail) => {
			if (companyDetail) {
				this.form.patchValue(companyDetail);
				this.dataProfile = companyDetail;
			}
		});
	}

	saveProfile() {
		this._smeServices.saveDataProfile(this.form.value).subscribe((res) => {
			if (res) {
				this._smeServices.setSmeCompanyDetail(res);
				this.savedProfile = true;
			}
		});
	}
}
