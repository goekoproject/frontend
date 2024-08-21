import { Location } from '@angular/common'
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectService, SmeService } from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { SmeAnalysisService } from '../sme-analysis.service'
import { SmeFormBaseComponent } from '../sme-form-base/sme-form-base.component'

@Component({
  selector: 'goeko-sme-form-project',
  templateUrl: './sme-form-project.component.html',
  styleUrls: ['./sme-form-project.component.scss'],
})
export class SmeFormProjectComponent extends SmeFormBaseComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    const canDeactivate = this.canDeactivate()
    if (!canDeactivate) {
      event.preventDefault()
    }
  }
  public toogleSaveName = true
  canDeactivate = (): boolean | Observable<boolean> | Promise<boolean> => {
    return this.goToSummary || (!this.form.dirty && !this.form.touched && this.form.pristine)
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private smeService: SmeService,
    private route: ActivatedRoute,
    private smeAnalysisService: SmeAnalysisService,
    private projectService: ProjectService,
    private cdf: ChangeDetectorRef,
    private _location: Location,
    private translateService: TranslateService,
  ) {
    super(fb, router, smeService, route, smeAnalysisService, projectService, cdf, translateService)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    this._initForm()
    this.onChangeLastRecomendation.subscribe((data) => (this.toogleSaveName = !data))
  }

  private _initForm() {
    this.form = this.fb.group({
      searchName: this.fb.control(''),
      co2Emission: this.fb.group({}),
      waste: this.fb.group({}),
      waterConsumption: this.fb.group({}),
      hazardousProduct: this.fb.group({}),
      notification: this.fb.group({
        onNewEcosolution: this.fb.control(false),
      }),
    })
  }

  goToBack() {
    this._location.back()
  }
}
