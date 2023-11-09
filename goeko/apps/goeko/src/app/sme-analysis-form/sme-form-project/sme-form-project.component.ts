import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmeAnalysisService, SmeService, UserService } from '@goeko/store';
import { SmeFormBaseComponent } from '../sme-form-base/sme-form-base.component';

@Component({
	selector: 'goeko-sme-form-project',
	templateUrl: './sme-form-project.component.html',
	styleUrls: ['./sme-form-project.component.scss'],
})
export class SmeFormProjectComponent extends SmeFormBaseComponent implements OnInit {
	public toogleSaveName = true;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private userService: UserService,
		private smeService: SmeService,
		private route: ActivatedRoute,
		private smeAnalysisService: SmeAnalysisService
	) {
		super(fb, router, userService, route, smeAnalysisService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.form.addControl('searchName', this.fb.control('', Validators.required));
		this.onChangeLastRecomendation.subscribe((data) => (this.toogleSaveName = !data));
		this._setLastAnalysis(this._getCurrentAnalysis);
	}

	private _getCurrentAnalysis = () => this.smeAnalysisService.getCurrentAnalysis();
	private _getLastProject = () => this.smeService.getLastProjectBySmeId(this.smeId);
}
