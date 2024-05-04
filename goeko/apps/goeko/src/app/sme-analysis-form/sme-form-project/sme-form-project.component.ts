import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, SmeService } from '@goeko/store';
import { SmeAnalysisService } from '../sme-analysis.service';
import { SmeFormBaseComponent } from '../sme-form-base/sme-form-base.component';

@Component({
  selector: 'goeko-sme-form-project',
  templateUrl: './sme-form-project.component.html',
  styleUrls: ['./sme-form-project.component.scss'],
})
export class SmeFormProjectComponent extends SmeFormBaseComponent implements OnInit
{
  public toogleSaveName = true;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private smeService: SmeService,
    private route: ActivatedRoute,
    private smeAnalysisService: SmeAnalysisService,
    private projectService :ProjectService,
    private cdf: ChangeDetectorRef,
    private _location: Location

  ) {
    super(fb, router,smeService, route, smeAnalysisService,projectService,cdf);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._initForm();
    this.onChangeLastRecomendation.subscribe(
      (data) => (this.toogleSaveName = !data)
    );
    this.form.patchValue(this.currentAnalytics());

  }

  private _initForm() {
    this.form = this.fb.group({
      searchName: this.fb.control(''),
      co2Emission: this.fb.group({}),
      waste: this.fb.group({}),
      waterConsumption: this.fb.group({}),
      hazardousProduct: this.fb.group({}),
    });
  }

  goToBack() {
    this._location.back();

  }
}
