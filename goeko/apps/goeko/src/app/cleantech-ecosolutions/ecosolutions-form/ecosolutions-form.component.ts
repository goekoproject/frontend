import { CommonModule } from '@angular/common'
import { Component, effect, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CanComponentDeactivate, canDeactivateForm, SdgIconsComponent, SelectLocationsComponent } from '@goeko/business-ui'
import { CategoryGrouping, Ecosolutions, EcosolutionsService, NewEcosolutionsBody, UpdatedEcosolutionBody } from '@goeko/store'
import { BadgeModule, ButtonModule, FormErrorTextComponent, InputFileComponent, UiSuperSelectModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { NgxEditorModule } from 'ngx-editor'
import { concatMap, forkJoin, from, Observable, of, switchMap, tap } from 'rxjs'
import { defaultSetCurrency } from './compare-with-select'
import { EcosolutionsFormBenefisComponent } from './ecosolutions-form-benefis/ecosolutions-form-benefis.component'
import { EcosolutionsFormCountryAvailableComponent } from './ecosolutions-form-country-available/ecosolutions-form-country-available.component'
import { EcosolutionsFormDetailsComponent } from './ecosolutions-form-details/ecosolutions-form-details.component'
import { EcosolutionsFormDocumentsComponent } from './ecosolutions-form-documents/ecosolutions-form-documents.component'
import { EcosolutionsFormEcosolutionTypeComponent } from './ecosolutions-form-ecosolution-type/ecosolutions-form-ecosolution-type.component'
import { EcosolutionsFormPaybackComponent } from './ecosolutions-form-payback/ecosolutions-form-payback.component'
import { EcosolutionsFormWarrantyComponent } from './ecosolutions-form-warranty/ecosolutions-form-warranty.component'
import { EcosolutionsManagmentService, metadataTechnicalSheet } from './ecosolutions-managment.service'

@Component({
  selector: 'goeko-ecosolutions-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorTextComponent,
    CommonModule,
    TranslatePipe,
    ButtonModule,
    InputFileComponent,
    UiSuperSelectModule,
    SelectLocationsComponent,
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
  ],
  templateUrl: './ecosolutions-form.component.html',
  styleUrls: ['./ecosolutions-form.component.scss'],
  providers: [EcosolutionsManagmentService],
})
export class EcosolutionsFormComponent implements OnInit, CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean = () => {
    const callback = () =>
      this.id()
        ? this._ecosolutionsService.updateEcosolution(this.id(), this.bodyRequestEcosolution)
        : this._ecosolutionsService.createEcosolutions(this.bodyRequestEcosolution)
    return this._submitter() ? of(true) : canDeactivateForm(callback)
  }
  private _ecosolutionsManagmentService = inject(EcosolutionsManagmentService)

  @ViewChild('inputCertified') inputCertified!: ElementRef<HTMLInputElement>
  _submitter = signal(false)
  public defaultSetCurrency = defaultSetCurrency

  public groupingForm = input.required<CategoryGrouping[]>()
  public categoryCode = input.required<string>()
  public cleantechId = input.required<string>()
  public id = input.required<string>()

  public ecosolutionData = signal<Ecosolutions | undefined>(undefined)

  public form!: FormGroup

  private _fileEcosolution!: File[]
  public urlPicEcosolution?: string[]

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

  public get certificates(): FormArray {
    return this.form.get('certificates') as FormArray
  }

  public get bodyRequestEcosolution(): any {
    return this.id()
      ? new UpdatedEcosolutionBody(this.cleantechId(), this.categoryCode(), this.form.value)
      : new NewEcosolutionsBody(this.cleantechId(), this.categoryCode(), this.form.value)
  }

  private get canUploadCertificates() {
    return (
      this.form.get('certificates')?.dirty &&
      this.form.get('certificates')?.valid &&
      this.form.value.certified &&
      this.certificates.value.length > 0
    )
  }
  private get canUploadTechnicalSheet(): boolean | undefined {
    return this.form.get('haveTechnicalSheet')?.dirty && this.form.get('haveTechnicalSheet')?.valid && !!this.form.value?.technicalSheet
  }

  private _documentForRemove = new Array<string>()
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ecosolutionsService: EcosolutionsService,
    private _fb: FormBuilder,
  ) {}

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
      subCategory: ['', Validators.required],
      products: ['', Validators.required],
      reductionPercentage: [],
      operationalCostReductionPercentage: [],
      sustainableDevelopmentGoals: [],
      price: [0],
      currency: ['EUR'],
      unit: [],
      priceDescription: [''],
      priceDescriptionTranslations: new FormArray([]),
      deliverCountries: [],
      paybackPeriodYears: [''],
      marketReady: [false],
      guarantee: [false],
      yearGuarantee: [],
      approved: [false],
      locations: this._fb.array([], Validators.required),
      haveTechnicalSheet: [false],
      technicalSheet: [],
      certified: [false],
      certificates: this._fb.array([]),
    })
  }

  getEcosolution() {
    this._ecosolutionsService.getEcosolutionById(this.id()).subscribe((ecosolution: Ecosolutions) => {
      this.urlPicEcosolution = ecosolution?.pictures?.map((picture) => picture.url)
      this._patchDataToForm(ecosolution)
    })
  }

  private _patchDataToForm(ecosolution: Ecosolutions): void {
    // const formValue = new EcosolutionForm(ecosolution)
    this.ecosolutionData.set(ecosolution)

    // this.form.reset(formValue)

    this.form.markAsPristine()
    this.form.markAsUntouched()
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
        this._markAllAsDirtyFormArray(control) // Llamado recursivo
      } else {
        control.markAsDirty()
        control.updateValueAndValidity() // Opcional
      }
    })
  }

  saveEcosolution() {
    if (this.form.invalid) {
      this._checkIsFormValid()
      return
    }
    this._createEcosolution()
  }

  private _createEcosolution() {
    this._ecosolutionsService
      .createEcosolutions(this.bodyRequestEcosolution)
      .pipe(
        switchMap((ecosolution) => {
          const uploadPicture$ = this._uploadPicture(ecosolution.id)
          const uploadCertificate$ = this._uploadDocuments(ecosolution.id)
          return forkJoin([uploadPicture$, uploadCertificate$])
        }),
        tap(() => this._submitter.set(true)),
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

  editEcosolution() {
    if (this.form.invalid) {
      this._checkIsFormValid()
      return
    }
    from(this._stepForUpdateEcosolution())
      .pipe(
        concatMap((step) => step()),
        tap(() => this._submitter.set(true)),
      )
      .subscribe({
        next: () => {
          this.goToListEcosolution()
        },
        error: (error) => {
          console.error('Error al editar Ecosolution', error)
        },
      })
  }
  private _checkIsFormValid() {
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    this.form.get('subCategory')?.markAsDirty()
    this._allFormArrayAsDirty()
    this.form.updateValueAndValidity()
  }
  private _stepForUpdateEcosolution() {
    return [
      () => this._ecosolutionsService.updateEcosolution(this.id(), this.bodyRequestEcosolution),
      () => this._uploadDocuments(this.id()),
      () => this._removeDocument(),
      () => this._uploadPicture(this.id()),
    ]
  }
  private _uploadPicture(ecosolutionId: string) {
    if (this._fileEcosolution?.length > 0 && ecosolutionId) {
      const createOrUpdatePicture = this.id()
        ? this._ecosolutionsService.updatePicture(ecosolutionId, this._fileEcosolution)
        : this._ecosolutionsService.uploadPicture(ecosolutionId, this._fileEcosolution)
      return createOrUpdatePicture
    }
    return of(null)
  }

  uploadImgEcosolutions(file: any) {
    this._fileEcosolution = file
  }

  private _uploadDocuments(ecosolutionId: string) {
    return forkJoin({
      certificate: this._uploadDocumentsCertificates(ecosolutionId),
      technicalSheet: this._uploadDocumentsTechnicalSheet(ecosolutionId) ?? of(null),
    })
  }
  private _uploadDocumentsCertificates(ecosolutionId: string) {
    if (this.canUploadCertificates) {
      return this._ecosolutionsManagmentService.uploadDocumentationCertificate(ecosolutionId, this.form.value.certificates)
    }
    return of(null)
  }
  private _uploadDocumentsTechnicalSheet(ecosolutionId: string) {
    if (this.canUploadTechnicalSheet) {
      const metadata = { ...metadataTechnicalSheet, file: this.form.value.technicalSheet }
      return this._ecosolutionsManagmentService.uplloadTechicalSheet(ecosolutionId, metadata)
    }
    return of(null)
  }

  private _removeDocument() {
    if (this._documentForRemove.length > 0) {
      return this._ecosolutionsManagmentService.removeDocument(this.id(), this._documentForRemove)
    }
    return of(null)
  }
  goToListEcosolution() {
    this._router.navigate(['../cleantech-ecosolutions', this.cleantechId()], {
      relativeTo: this._route.parent?.parent,
    })
  }
}
