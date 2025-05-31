import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { mapperLocations } from '@goeko/core'
import { CategoryGrouping, ClassificationCreateRequest, SolutionRequestCreate, SubcategoryGrouping } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { RequestOnboardingFacadeService } from '../request-onboarding.service'

@Component({
  selector: 'goeko-request-onboarding-form',
  templateUrl: './request-onboarding-form.component.html',
  styleUrls: ['./request-onboarding-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoInputComponent,
    UiSuperSelectModule,
    TranslatePipe,
    BadgeModule,
    SelectLocationsComponent,
    ButtonModule,
  ],
})
export class RequestOnboardingFormComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _cf = inject(ChangeDetectorRef)
  private _requestOnboardingFacadeService = inject(RequestOnboardingFacadeService)
  public id = input.required<string>()
  public groupingForm = input.required<CategoryGrouping[]>()
  public subcategoriesSelected = signal<SubcategoryGrouping[] | undefined>([])

  public form!: FormGroup

  get locations(): FormArray {
    return this.form.get('locations') as FormArray
  }

  get classifications(): ClassificationCreateRequest[] {
    return this.form.value.subCategory.map((item: string) => {
      return {
        mainCategory: this.form.value.mainCategory,
        subCategory: item,
      }
    })
  }

  getSubcategories(category: string): SubcategoryGrouping[] {
    return this.groupingForm().find((item) => item.code === category)?.subcategories ?? []
  }

  ngOnInit(): void {
    this.initForm()
    this._onSelectCategory()
    this._cf.markForCheck()
    if (this.form.value.mainCategory) {
      this.subcategoriesSelected.set(this.getSubcategories(this.form.value.mainCategory))
    }
  }

  private initForm(): void {
    this.form = this._fb.group({
      solutionName: ['', Validators.required],
      companyName: ['', Validators.required],
      mainCategory: ['co2Emission', Validators.required],
      subCategory: ['', Validators.required],
      locations: this._fb.array([]),
      website: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
      notes: [''],
    })
  }

  private _onSelectCategory(): void {
    this.form.get('mainCategory')?.valueChanges.subscribe((value) => {
      this.subcategoriesSelected.set(this.getSubcategories(value))
      this._cf.markForCheck()
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const request: SolutionRequestCreate = {
        solutionName: this.form.value.solutionName,
        companyName: this.form.value.companyName,
        classifications: this.classifications,
        locations: mapperLocations(this.form.value.locations),
        website: this.form.value.website,
        contactPerson: this.form.value.contactPerson,
        contactEmail: this.form.value.contactEmail,
        contactPhone: this.form.value.contactPhone,
        notes: this.form.value.notes,
      }
      this._requestOnboardingFacadeService.createRequest(this.id(), request).subscribe((res) => {
        if (res) {
          this._router.navigate(['../'], { relativeTo: this._route })
        }
      })
    }
  }

  goBack(): void {
    this._router.navigate(['../'], { relativeTo: this._route })
  }
}
