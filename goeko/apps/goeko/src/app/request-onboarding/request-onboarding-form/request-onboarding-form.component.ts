import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SelectLocationsComponent } from '@goeko/business-ui'
import { mapperLocations } from '@goeko/core'
import { CategoryGrouping, SolutionRequestCreate, SubcategoryGrouping } from '@goeko/store'
import { BadgeModule, ButtonModule, GoInputComponent, UiSuperSelectModule } from '@goeko/ui'
import { RequestOnboardingFacadeService } from '../request-onboarding.service'

@Component({
  selector: 'goeko-request-onboarding-form',
  templateUrl: './request-onboarding-form.component.html',
  styleUrls: ['./request-onboarding-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoInputComponent, UiSuperSelectModule, BadgeModule, SelectLocationsComponent, ButtonModule],
})
export class RequestOnboardingFormComponent implements OnInit {
  private _fb = inject(FormBuilder)
  private _requestOnboardingFacadeService = inject(RequestOnboardingFacadeService)
  public id = input.required<string>()
  public groupingForm = input.required<CategoryGrouping[]>()
  public subcategoriesSelected = signal<SubcategoryGrouping[] | undefined>([])

  public form!: FormGroup

  get locations(): FormArray {
    return this.form.get('locations') as FormArray
  }
  ngOnInit(): void {
    this.initForm()
    this._onSelectCategory()
  }

  private initForm(): void {
    this.form = this._fb.group({
      solutionName: ['My colleague solution', Validators.required],
      companyName: ['My colleague solution', Validators.required],
      mainCategory: ['co2Emission', Validators.required],
      subCategory: ['', Validators.required],
      locations: this._fb.array([]),
      website: ['www.cleantech-to-colleague.com', Validators.required],
      contactPerson: ['John colleague', Validators.required],
      contactEmail: ['some-colleague@mail.com', [Validators.required, Validators.email]],
      contactPhone: ['0000000', Validators.required],
      notes: ['Some notes colleague'],
    })
  }

  private _onSelectCategory(): void {
    this.form.get('mainCategory')?.valueChanges.subscribe((value) => {
      const subcategories = this.groupingForm().find((item) => item.code === value)?.subcategories
      this.subcategoriesSelected.set(subcategories ?? [])
    })
  }

  onSubmit(): void {
    const classifications = this.form.value.subCategory.map((item: string) => {
      return {
        mainCategory: this.form.value.mainCategory,
        subCategory: item,
      }
    })
    if (this.form.valid) {
      const request: SolutionRequestCreate = {
        solutionName: this.form.value.solutionName,
        companyName: this.form.value.companyName,
        classifications: classifications,
        locations: mapperLocations(this.form.value.locations),
        website: this.form.value.website,
        contactPerson: this.form.value.contactPerson,
        contactEmail: this.form.value.contactEmail,
        contactPhone: this.form.value.contactPhone,
        notes: this.form.value.notes,
      }
      this._requestOnboardingFacadeService.createRequest(this.id(), request).subscribe((res) => {
        console.log(res)
      })
    } else {
      this.markFormGroupTouched(this.form)
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched()
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control)
      }
    })
  }
}
