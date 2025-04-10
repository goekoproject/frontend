import { CommonModule } from '@angular/common'
import { Component, computed, ElementRef, inject, input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import {
  CanComponentDeactivate,
  canDeactivateForm,
  SelectCertificateComponent,
  SelectFormLangComponent,
  SelectLocationsComponent,
  SelectSubcategoryProductComponent,
} from '@goeko/business-ui'
import { LANGS } from '@goeko/core'
import {
  CategoryGrouping,
  DataSelect,
  DocumentEcosolutions,
  Ecosolutions,
  EcosolutionsBody,
  EcosolutionsService,
  LocationsCountry,
  NewEcosolutionsBody,
  ODS_CODE,
  TranslatedProperties,
  UpdatedEcosolutionBody,
} from '@goeko/store'
import {
  BadgeModule,
  ButtonModule,
  FileUploadComponent,
  FormErrorTextComponent,
  GoInputComponent,
  InputFileComponent,
  UiSuperSelectModule,
} from '@goeko/ui'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { Editor, NgxEditorModule, Toolbar, Validators as ValidatorsEditor } from 'ngx-editor'
import { concatMap, forkJoin, from, Observable, of, switchMap, tap } from 'rxjs'
import {
  defaultSetCurrency,
  defaultSetDeliverCountries,
  defaultSetPaybackPeriodYears,
  defaultSetProductsCategories,
  defaultSetReductions,
  defaultSetyearGuarantee,
} from './compare-with-select'
import { EcosolutionForm } from './ecosolution-form.model'
import { EcosolutionsManagmentService, metadataTechnicalSheet } from './ecosolutions-managment.service'
import { EDITOR_TOOLBAR_ECOSOLUTIONS } from './editor-toolbar.constants'
import { EcosolutionsFormEcosolutionTypeComponent } from './ecosolutions-form-ecosolution-type/ecosolutions-form-ecosolution-type.component'
import { EcosolutionsFormBenefisComponent } from './ecosolutions-form-benefis/ecosolutions-form-benefis.component'
import { EcosolutionsFormDetailsComponent } from './ecosolutions-form-details/ecosolutions-form-details.component'

@Component({
  selector: 'goeko-ecosolutions-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorTextComponent,
    FileUploadComponent,
    CommonModule,
    TranslatePipe,
    ButtonModule,
    InputFileComponent,
    UiSuperSelectModule,
    SelectCertificateComponent,
    SelectLocationsComponent,
    BadgeModule,
    NgxEditorModule,
    EcosolutionsFormEcosolutionTypeComponent,
    EcosolutionsFormBenefisComponent,
    EcosolutionsFormDetailsComponent,
  ],
  templateUrl: './ecosolutions-form.component.html',
  styleUrls: ['./ecosolutions-form.component.scss'],
  providers: [EcosolutionsManagmentService],
})
export class EcosolutionsFormComponent implements OnInit, CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean = () => {
    const callback = () =>
      this.idEcosolution
        ? this._ecosolutionsService.updateEcosolution(this.idEcosolution, this.bodyRequestEcosolution)
        : this._ecosolutionsService.createEcosolutions(this.bodyRequestEcosolution)
    return this._submitter() ? of(true) : canDeactivateForm(callback)
  }
  private _ecosolutionsManagmentService = inject(EcosolutionsManagmentService)

  @ViewChild('inputCertified') inputCertified!: ElementRef<HTMLInputElement>
  _submitter = signal(false)
  public defaultSetDeliverCountries = defaultSetDeliverCountries
  public defaultSetPaybackPeriodYears = defaultSetPaybackPeriodYears
  public defaultSetCurrency = defaultSetCurrency
  public defaultSetyearGuarantee = defaultSetyearGuarantee

  groupingForm = input.required<CategoryGrouping[]>()
  categoryCode = input.required<string>()
  public form!: FormGroup
  public ods = ODS_CODE
  public idEcosolution!: string
  public dataSelect = DataSelect

  private _cleantechId!: string
  private _fileEcosolution!: File[]
  public urlPicEcosolution?: string[]
  public firstLoad = false
  public get isReadOnly(): boolean {
    return this._route.snapshot.queryParamMap.get('isReadOnly') === 'true'
  }
  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray
  }
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
  get sustainableDevelopmentGoals(): FormArray {
    return this.form.get('sustainableDevelopmentGoals') as FormArray
  }
  public get bodyRequestEcosolution(): any {
    return this.idEcosolution
      ? new UpdatedEcosolutionBody(this._cleantechId, this.categoryCode(), this.form.value)
      : new NewEcosolutionsBody(this._cleantechId, this.categoryCode(), this.form.value)
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

  ngOnInit(): void {
    this._getParamsUrl()
    this._buildFrom()

    if (this.idEcosolution) {
      this.getEcosolution()
    }
  }

  private _getParamsUrl() {
    this._cleantechId = this._route.snapshot.parent?.paramMap.get('id') as string
    this.idEcosolution = this._route.snapshot.paramMap.get('id') as string
  }

  private _buildFrom() {
    this._initForm()
    this._seTranslatedProperties()
    this._changehaveTechnicalSheet()
    this._changeCertificate()
    this._changeGuarantee()
    console.log(this.form)
  }

  private _seTranslatedProperties(codeLang = 'fr') {
    this._addNameTranslations(codeLang)
    this._addDescriptionTranslations(codeLang)
    this._detailDescriptionTranslations(codeLang)
    this._priceDescriptionTranslations(codeLang)
  }

  private _initForm() {
    this.form = this._fb.group({
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

  private _addNameTranslations(codeLang: string): void {
    const nameTranslations = this.form.get('nameTranslations') as FormArray
    nameTranslations.push(this._getFormGroupFieldTranslations(codeLang))
  }
  private _addDescriptionTranslations(codeLang: string): void {
    const descriptionTranslations = this.form.get('descriptionTranslations') as FormArray
    descriptionTranslations.push(this._getFormGroupFieldTranslations(codeLang))
  }

  private _detailDescriptionTranslations(codeLang: string): void {
    const detailedDescriptionTranslations = this.form.get('detailedDescriptionTranslations') as FormArray
    detailedDescriptionTranslations.push(this._getFormGroupEditor(codeLang))
  }

  private _priceDescriptionTranslations(codeLang: string): void {
    const priceDescriptionTranslations = this.form.get('priceDescriptionTranslations') as FormArray
    priceDescriptionTranslations.push(this._getFormGroupFieldTranslations(codeLang))
  }

  private _getFormGroupFieldTranslations(code: string) {
    return this._fb.group({
      label: new FormControl(''),
      lang: new FormControl(code),
    })
  }
  private _getFormGroupEditor(code: string) {
    return this._fb.group({
      label: new FormControl(''),
      lang: new FormControl(code),
    })
  }

  addCertificates(file: File | null) {
    this.certificates.push(this._fb.control(file))
  }
  removeAddcertificates(index: number) {
    this.certificates.removeAt(index)
  }
  getEcosolution() {
    this._ecosolutionsService.getEcosolutionById(this.idEcosolution).subscribe((ecosolution: Ecosolutions) => {
      this.urlPicEcosolution = ecosolution?.pictures?.map((picture) => picture.url)
      this._patchDataToForm(ecosolution)
    })
  }

  private _patchDataToForm(ecosolution: any): void {
    const formValue = new EcosolutionForm(ecosolution)
    this._buildFormArrays(formValue)

    this.form.reset(formValue)
    this._setLocaltion(ecosolution.locations)
    this._addCertifiedValidators(formValue.certificates)

    this.form.markAsPristine()
    this.form.markAsUntouched()
  }

  private _buildFormArrays(formValue: EcosolutionForm): void {
    this._patchFormArray(this.nameTranslations, formValue.nameTranslations)
    this._patchFormArray(this.descriptionTranslations, formValue.descriptionTranslations)
    this._patchFormArray(this.detailedDescriptionTranslations, formValue.detailedDescriptionTranslations)
    this._patchFormArray(this.priceDescriptionTranslations, formValue.priceDescriptionTranslations)
  }
  private _allFormArrayAsDirty() {
    this._markAllAsDirtyFormArray(this.nameTranslations)
    this._markAllAsDirtyFormArray(this.descriptionTranslations)
    this._markAllAsDirtyFormArray(this.detailedDescriptionTranslations)
    this._markAllAsDirtyFormArray(this.priceDescriptionTranslations)
  }
  private _addCertifiedValidators(certificates: DocumentEcosolutions[]) {
    certificates?.forEach((certificate) => {
      this.certificates.push(
        this._fb.control({
          documentType: certificate?.documentType?.code,
          name: certificate.name,
          id: certificate.id,
          url: certificate.url,
        }),
      )
    })
  }

  private _setLocaltion(locations: Array<LocationsCountry>) {
    if (locations) {
      this.locationsArrays.clear()
      locations.forEach((location: LocationsCountry) => {
        this._addLocations(location)
      })
    }
  }

  private _addLocations(location: LocationsCountry) {
    this.locationsArrays.push(this._createLocations(location), { emitEvent: false })
  }
  private _createLocations(location: LocationsCountry): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(location.country.code),
        regions: new FormControl(location.country.regions),
      }),
    })
  }

  private _patchFormArray(formArray: FormArray, values: any[]): void {
    formArray.clear()
    values.forEach(() => {
      formArray.push(this._getFormGroupFieldTranslations('fr'))
    })
    formArray.reset(values)
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

  private _changehaveTechnicalSheet() {
    this.form.get('haveTechnicalSheet')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form.get('technicalSheet')?.setValidators(Validators.required)
      } else {
        this.addDocumentForRemove([this.form.get('technicalSheet')?.value?.id])
        this.form.get('technicalSheet')?.clearValidators()
        this.form.get('technicalSheet')?.reset()
      }
      this.form.get('technicalSheet')?.updateValueAndValidity()
    })
  }

  private _changeCertificate() {
    this.form.get('certified')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form.get('certificates')?.setValidators(Validators.required)
      } else {
        const idsForRemove = this.form.get('certificates')?.value.map((certificate: DocumentEcosolutions) => certificate.id)
        this.addDocumentForRemove(idsForRemove)

        this.form.get('certificates')?.clearValidators()
        this.form.get('certificates')?.reset()
      }
      this.form.get('certificates')?.updateValueAndValidity()
    })
  }

  private _changeGuarantee() {
    this.form.get('guarantee')?.valueChanges.subscribe((value) => {
      if (value) {
        this.form.get('yearGuarantee')?.setValidators(Validators.required)
        this.form.get('yearGuarantee')?.markAsDirty()
      } else {
        this.form.get('yearGuarantee')?.clearValidators()
        this.form.get('yearGuarantee')?.reset()
      }
      this.form.get('yearGuarantee')?.updateValueAndValidity()
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
      () => this._ecosolutionsService.updateEcosolution(this.idEcosolution, this.bodyRequestEcosolution),
      () => this._uploadDocuments(this.idEcosolution),
      () => this._removeDocument(),
      () => this._uploadPicture(this.idEcosolution),
    ]
  }
  private _uploadPicture(ecosolutionId: string) {
    if (this._fileEcosolution?.length > 0 && ecosolutionId) {
      const createOrUpdatePicture = this.idEcosolution
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

  addDocumentForRemove(id: string | string[]) {
    if (!id || id.length === 0) {
      return
    }
    this._documentForRemove.push(...(Array.isArray(id) ? id : [id]))
  }
  private _removeDocument() {
    if (this._documentForRemove.length > 0) {
      return this._ecosolutionsManagmentService.removeDocument(this.idEcosolution, this._documentForRemove)
    }
    return of(null)
  }
  goToListEcosolution() {
    this._router.navigate(['../cleantech-ecosolutions', this._cleantechId], {
      relativeTo: this._route.parent?.parent,
    })
  }
}
