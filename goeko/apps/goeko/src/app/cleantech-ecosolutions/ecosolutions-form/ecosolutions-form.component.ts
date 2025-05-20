import { CommonModule } from '@angular/common'
import { Component, computed, effect, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CanComponentDeactivate, canDeactivateForm, SdgIconsComponent } from '@goeko/business-ui'
import { CategoryGrouping, Ecosolutions, NewEcosolutionsBody, UpdatedEcosolutionBody } from '@goeko/store'
import { BadgeModule, ButtonModule, FormErrorTextComponent, LoadingProcessComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { NgxEditorModule } from 'ngx-editor'
import { delay, Observable, of, tap } from 'rxjs'
import { EcosolutionsFormBenefisComponent } from './ecosolutions-form-benefis/ecosolutions-form-benefis.component'
import { EcosolutionsFormCountryAvailableComponent } from './ecosolutions-form-country-available/ecosolutions-form-country-available.component'
import { EcosolutionsFormDetailsComponent } from './ecosolutions-form-details/ecosolutions-form-details.component'
import { EcosolutionsFormDocumentsComponent } from './ecosolutions-form-documents/ecosolutions-form-documents.component'
import { EcosolutionsFormEcosolutionTypeComponent } from './ecosolutions-form-ecosolution-type/ecosolutions-form-ecosolution-type.component'
import { EcosolutionsFormImageComponent } from './ecosolutions-form-image/ecosolutions-form-image.component'
import { EcosolutionsFormPaybackComponent } from './ecosolutions-form-payback/ecosolutions-form-payback.component'
import { EcosolutionsFormWarrantyComponent } from './ecosolutions-form-warranty/ecosolutions-form-warranty.component'
import { DocumentMetadata } from './ecosolutions-managment-documents.service'
import { EcosolutionsManagmentService } from './ecosolutions-managment.service'

const TIME_DELAY = 1000
@Component({
  selector: 'goeko-ecosolutions-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorTextComponent,
    CommonModule,
    TranslatePipe,
    ButtonModule,
    UiSuperSelectModule,
    BadgeModule,
    NgxEditorModule,
    EcosolutionsFormEcosolutionTypeComponent,
    EcosolutionsFormBenefisComponent,
    EcosolutionsFormDetailsComponent,
    SdgIconsComponent,
    EcosolutionsFormWarrantyComponent,
    EcosolutionsFormDocumentsComponent,
    EcosolutionsFormCountryAvailableComponent,
    EcosolutionsFormPaybackComponent,
    EcosolutionsFormImageComponent,
    LoadingProcessComponent,
  ],
  templateUrl: './ecosolutions-form.component.html',
  styleUrls: ['./ecosolutions-form.component.scss'],
  providers: [EcosolutionsManagmentService],
})
export class EcosolutionsFormComponent implements OnInit, CanComponentDeactivate {
  private _router = inject(Router)
  private _route = inject(ActivatedRoute)
  private _fb = inject(FormBuilder)
  private _ecosolutionsManagmentService = inject(EcosolutionsManagmentService)

  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean = () => {
    const callback = () => (this.id() ? this.editEcosolution() : this.saveEcosolution())
    return this.submitter() ? of(true) : canDeactivateForm(callback)
  }

  @ViewChild('inputCertified') inputCertified!: ElementRef<HTMLInputElement>
  public submitter = signal(false)

  public groupingForm = input.required<CategoryGrouping[]>()
  public categoryCode = input.required<string>()
  public cleantechId = input.required<string>()
  public id = input.required<string>()
  public ecosolutionData = signal<Ecosolutions | undefined>(undefined)
  public form!: FormGroup
  private _documentForRemove = signal<string[] | string>([])

  public ecosolutionsName = computed(() => this.ecosolutionData()?.nameTranslations.at(0)?.label)
  public ecosolutionsCategoryLabel = computed(() => this.groupingForm().find((g) => g.code === this.categoryCode())?.label || '')
  public questionsCategories = computed(
    () => this.groupingForm()?.find((category) => category.code === this.categoryCode())?.subcategories || [],
  )
  public get nameTranslations(): FormArray {
    return this.form.get('nameTranslations') as FormArray
  }
  public get descriptionTranslations(): FormArray {
    return this.form.get('descriptionTranslations') as FormArray
  }
  public get detailedDescriptionTranslations(): FormArray {
    return this.form.get('detailedDescriptionTranslations') as FormArray
  }
  public get priceDescriptionTranslations(): FormArray {
    return this.form.get('priceDescriptionTranslations') as FormArray
  }
  public get certificates(): DocumentMetadata[] {
    return this.form.get('certificates')?.value
  }
  public get technicalSheet(): File | undefined {
    return this.form.get('technicalSheet')?.value
  }

  public get haveTechnicalSheet(): FormArray {
    return this.form.get('haveTechnicalSheet') as FormArray
  }
  public get projectFile(): File | undefined {
    return this.form.get('projectFile')?.value
  }
  public get images(): File[] | undefined {
    return this.canUpdateImages ? (this.form.get('images')?.value as File[]) : undefined
  }

  public get bodyRequestEcosolution(): any {
    return this.id()
      ? new UpdatedEcosolutionBody(this.cleantechId(), this.form.value)
      : new NewEcosolutionsBody(this.cleantechId(), this.form.value)
  }

  private get canUploadCertificates() {
    return (
      this.form.get('certificates')?.dirty &&
      this.form.get('certificates')?.valid &&
      this.form.value.certified &&
      this.certificates.length > 0
    )
  }
  private get canUploadTechnicalSheet(): boolean | undefined {
    return this.form.get('haveTechnicalSheet')?.dirty && this.form.get('haveTechnicalSheet')?.valid
  }
  private get canUploadProjectFile(): boolean | undefined {
    return this.form.get('haveProjectFile')?.dirty && this.form.get('haveProjectFile')?.valid
  }
  private get canUpdateImages(): boolean | undefined {
    return !this.form.get('images')?.pristine && this.form.get('images')?.valid
  }
  effectLoadDataEcosolution = effect(() => {
    if (this.id()) {
      this.getEcosolution()
    }
  })
  ngOnInit(): void {
    this._initForm()
  }

  private _initForm() {
    this.form = this._fb.group({
      classifications: new FormArray([]),
      solutionName: ['deprecated'],
      nameTranslations: new FormArray([]),
      solutionDescription: ['deprecated'],
      descriptionTranslations: new FormArray([]),
      detailedDescription: ['deprecated'],
      detailedDescriptionTranslations: new FormArray([]),
      reductionPercentage: [],
      operationalCostReductionPercentage: [],
      improvementOtherCategory: this._fb.group({
        category: [''],
        reductionPercentage: [],
      }),
      sustainableDevelopmentGoals: [[]],
      images: this._fb.array([]),
      price: [0],
      currency: ['EUR'],
      unit: [],
      priceDescription: [null],
      priceDescriptionTranslations: new FormArray([]),
      deliverCountries: [],
      paybackPeriodYears: [null],
      marketReady: [false],
      guarantee: [false],
      yearGuarantee: [],
      approved: [false],
      locations: this._fb.array([], Validators.required),
      haveTechnicalSheet: [false],
      technicalSheet: [],
      certified: [false],
      haveProjectFile: [false],
      projectFile: [],
      certificates: this._fb.array([]),
    })
  }

  public documentForRemove(id: string | string[]) {
    this._documentForRemove.set(id)
  }
  getEcosolution() {
    this._ecosolutionsManagmentService.getEcosolutionById(this.id()).subscribe((ecosolution: Ecosolutions) => {
      this.ecosolutionData.set(ecosolution)
      this._patchSdg()
      this.form.markAsPristine()
      this.form.markAsUntouched()
    })
  }

  private _patchSdg() {
    this.form.get('sustainableDevelopmentGoals')?.setValue(this.ecosolutionData()?.sustainableDevelopmentGoals)
  }

  private _allFormArrayAsDirty() {
    this._markAllAsDirtyFormArray(this.nameTranslations)
    this._markAllAsDirtyFormArray(this.descriptionTranslations)
    this._markAllAsDirtyFormArray(this.detailedDescriptionTranslations)
    this._markAllAsDirtyFormArray(this.priceDescriptionTranslations)
  }

  private _markAllAsDirtyFormArray(form: FormGroup | FormArray): void {
    Object.values(form.controls).forEach((control) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this._markAllAsDirtyFormArray(control)
      } else {
        control.markAsDirty()
        control.updateValueAndValidity()
      }
    })
  }

  public saveEcosolution() {
    if (this.form.invalid) {
      this._checkIsFormValid()
      return of(false)
    }
    this._createEcosolution()
    return of(true)
  }

  private _createEcosolution() {
    this._ecosolutionsManagmentService
      .createEcosolutionWithUploads({
        body: new NewEcosolutionsBody(this.cleantechId(), this.form.value),
        ecosolutionsImg: this.images,
        certificates: this.certificates,
        technicalSheet: this.technicalSheet,
        projectFile: this.projectFile,
      })
      .pipe(
        tap(() => this.submitter.set(true)),
        delay(TIME_DELAY),
      )
      .subscribe({
        next: (result) => {
          this.goToListEcosolution()
          console.log('Ecosolution creado con éxito', result)
        },
        error: (error) => {
          console.error('Error al crear Ecosolution ', error)
        },
      })
  }

  public editEcosolution() {
    if (this.form.invalid) {
      this._checkIsFormValid()
      return of(false)
    }
    this._ecosolutionsManagmentService
      .updateEcosolution(this.id(), {
        body: new UpdatedEcosolutionBody(this.cleantechId(), this.form.value),
        ecosolutionsImg: this.images,
        certificates: this.canUploadCertificates ? this.certificates : undefined,
        technicalSheet: this.canUploadTechnicalSheet ? this.technicalSheet : undefined,
        projectFile: this.canUploadProjectFile ? this.projectFile : undefined,
        documentForRemove: this._documentForRemove() as string[],
      })
      .pipe(
        tap(() => this.submitter.set(true)),
        delay(TIME_DELAY),
      )
      .subscribe({
        next: () => {
          this.goToListEcosolution()
        },
        error: (error) => {
          console.error('Error al editar Ecosolution', error)
        },
      })
    return of(true)
  }
  private _checkIsFormValid() {
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    this.form.get('subCategory')?.markAsDirty()
    this._allFormArrayAsDirty()
    this.form.updateValueAndValidity()
  }

  goToListEcosolution() {
    this._router.navigate(['../cleantech-ecosolutions', this.cleantechId()], {
      relativeTo: this._route.parent,
    })
  }
}
