import { Component, computed, ElementRef, inject, input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CanComponentDeactivate, canDeactivateForm } from '@goeko/business-ui'
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
import { TranslateService } from '@ngx-translate/core'
import { Editor, Toolbar } from 'ngx-editor'
import { forkJoin, Observable, of, switchMap, tap } from 'rxjs'
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

@Component({
  selector: 'goeko-ecosolutions-form',
  templateUrl: './ecosolutions-form.component.html',
  styleUrls: ['./ecosolutions-form.component.scss'],
  providers: [EcosolutionsManagmentService],
})
export class EcosolutionsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean = () => {
    const callback = () =>
      this.idEcosolution
        ? this._ecosolutionsService.updateEcosolution(this.idEcosolution, this.bodyRequestEcosolution)
        : this._ecosolutionsService.createEcosolutions(this.bodyRequestEcosolution)
    return this._submitter() ? of(true) : canDeactivateForm(callback)
  }
  private _ecosolutionsManagmentService = inject(EcosolutionsManagmentService)

  @ViewChild('inputCertified') inputCertified!: ElementRef<HTMLInputElement>
  private _submitter = signal(false)
  public defaultSetProductsCategories = defaultSetProductsCategories
  public defaultSetDeliverCountries = defaultSetDeliverCountries
  public defaultSetPaybackPeriodYears = defaultSetPaybackPeriodYears
  public defaultSetCurrency = defaultSetCurrency
  public defaultSetReductions = defaultSetReductions
  public defaultSetyearGuarantee = defaultSetyearGuarantee

  groupingForm = input<CategoryGrouping[]>()
  categoryId = input<string>()
  public form!: FormGroup
  public ods = ODS_CODE
  public idEcosolution!: string
  public questionsCategories = computed(() => this.groupingForm()?.find((category) => category.id === this.categoryId())?.subcategories)
  public editor!: Editor
  public html = ''
  public toolbar: Toolbar = EDITOR_TOOLBAR_ECOSOLUTIONS

  public langs = LANGS
  langSignal = signal(this._translateServices.currentLang || this._translateServices.defaultLang)
  public selectedFormLang = signal({ code: this.langSignal(), index: 0 })
  public dataSelect = DataSelect
  public mainCategory!: string

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

  public get selectedNameTranslationsControls() {
    return (this.nameTranslations.controls[this.selectedFormLang().index] as FormGroup).controls['translation']
  }

  public get certificates(): FormArray {
    return this.form.get('certificates') as FormArray
  }

  public get bodyRequestEcosolution(): EcosolutionsBody {
    return this.idEcosolution
      ? new UpdatedEcosolutionBody(this._cleantechId, this.mainCategory, this.form.value)
      : new NewEcosolutionsBody(this._cleantechId, this.mainCategory, this.form.value)
  }

  private _isIncludeTranslation = (codeLang: string, translations?: TranslatedProperties[]) => {
    return translations?.map((value) => value.lang).includes(codeLang)
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

  public certificateForRemove = signal<string[]>([])

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ecosolutionsService: EcosolutionsService,
    private _fb: FormBuilder,
    private _translateServices: TranslateService,
  ) {}

  ngOnInit(): void {
    this._getParamsUrl()
    this.editor = new Editor()
    this._buildFrom()
    if (this.idEcosolution) {
      this.getEcosolution()
    }
  }

  ngOnDestroy(): void {
    this.editor?.destroy()
  }

  private _getParamsUrl() {
    this._cleantechId = this._route.snapshot.parent?.paramMap.get('id') as string
    this.mainCategory = this._route.snapshot.queryParamMap.get('mainCategory') as string
    this.idEcosolution = this._route.snapshot.paramMap.get('id') as string
  }

  private _buildFrom() {
    this._initForm()
    this._seTranslatedProperties()
  }

  private _seTranslatedProperties(codeLang: string = this.selectedFormLang().code) {
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

  get sustainableDevelopmentGoals(): FormArray {
    return this.form.get('sustainableDevelopmentGoals') as FormArray
  }

  private _addNameTranslations(codeLang: string): void {
    const nameTranslations = this.form.get('nameTranslations') as FormArray
    if (!this._isIncludeTranslation(codeLang, nameTranslations.value)) {
      nameTranslations.push(this._getFormGroupFieldTranslations(codeLang))
    }
  }
  private _addDescriptionTranslations(codeLang: string): void {
    const descriptionTranslations = this.form.get('descriptionTranslations') as FormArray
    if (!this._isIncludeTranslation(codeLang, descriptionTranslations.value)) {
      descriptionTranslations.push(this._getFormGroupFieldTranslations(codeLang))
    }
  }

  private _detailDescriptionTranslations(codeLang: string): void {
    const detailedDescriptionTranslations = this.form.get('detailedDescriptionTranslations') as FormArray
    if (!this._isIncludeTranslation(codeLang, detailedDescriptionTranslations.value)) {
      detailedDescriptionTranslations.push(this._getFormGroupFieldTranslations(codeLang))
    }
  }

  private _priceDescriptionTranslations(codeLang: string): void {
    const priceDescriptionTranslations = this.form.get('priceDescriptionTranslations') as FormArray
    if (!this._isIncludeTranslation(codeLang, priceDescriptionTranslations.value)) {
      priceDescriptionTranslations.push(this._getFormGroupFieldTranslations(codeLang))
    }
  }

  private _getFormGroupFieldTranslations(code?: string) {
    if (this.selectedFormLang().code === code) {
      return this._fb.group({
        label: new FormControl('', Validators.required),
        lang: new FormControl(code),
      })
    }
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
  private _addCertifiedValidators(certificates: DocumentEcosolutions[]) {
    certificates?.forEach((certificate) => {
      this.certificates.push(
        this._fb.control({ documentType: certificate?.documentType?.code, name: certificate.name, id: certificate.id }),
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
      formArray.push(this._getFormGroupFieldTranslations())
    })
    formArray.reset(values)
  }

  saveEcosolution() {
    if (this.form.valid) {
      this._createEcosolution()
    }
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
        tap(() => this.goToListEcosolution()),
      )
      .subscribe({
        next: (result) => {
          console.log('Ecosolution creado con éxito', result)
        },
        error: (error) => {
          console.error('Error al crear Ecosolution ', error)
        },
      })
  }

  editEcosolution() {
    forkJoin([
      this._ecosolutionsService.getEcosolutionById(this.idEcosolution),
      this._uploadPicture(this.idEcosolution),
      this._uploadDocuments(this.idEcosolution),
      this._removeDocument(),
    ])
      .pipe(
        tap(() => this._submitter.set(true)),
        tap(() => this.goToListEcosolution()),
      )
      .subscribe({
        next: (result) => {
          console.log('Ecosolution update ok', result)
        },
        error: (error) => {
          console.error('Fail update ecosolution', error)
        },
      })
  }

  private _uploadPicture(ecosolutionId: string) {
    if (this._fileEcosolution && ecosolutionId) {
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
    return forkJoin([this._uploadDocumentsCertificates(ecosolutionId), this._uploadDocumentsTechnicalSheet(ecosolutionId)])
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

  addCertificateForRemove(id: string) {
    this.certificateForRemove.set([...this.certificateForRemove(), id])
  }
  private _removeDocument() {
    if (this.certificateForRemove().length > 0) {
      return this._ecosolutionsManagmentService.removeDocument(this.idEcosolution, this.certificateForRemove())
    }
    return of(null)
  }
  goToListEcosolution() {
    this._router.navigate(['../cleantech-ecosolutions', this._cleantechId], {
      relativeTo: this._route.parent?.parent,
    })
  }

  selectedFormLangChange($event: any) {
    this._clearValidationTranslatedProperties()
    this.selectedFormLang.set($event)
    this._seTranslatedProperties($event.code)
  }
  private _clearValidationTranslatedProperties() {
    this.removeNameTranslationsValidators(this.nameTranslations)
    this.removeNameTranslationsValidators(this.descriptionTranslations)
    this.removeNameTranslationsValidators(this.detailedDescriptionTranslations)
    this.removeNameTranslationsValidators(this.priceDescriptionTranslations)
  }
  private removeNameTranslationsValidators(formArray: FormArray): void {
    formArray.controls.forEach((control) => {
      control?.get('label')?.clearValidators()
      control?.get('label')?.updateValueAndValidity()
    })
  }
}
