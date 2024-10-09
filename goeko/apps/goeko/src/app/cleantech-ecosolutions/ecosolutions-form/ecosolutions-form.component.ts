import { Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { LANGS } from '@goeko/core'
import {
  DataSelect,
  Ecosolutions,
  EcosolutionsBody,
  EcosolutionsService,
  NewEcosolutionsBody,
  ODS_CODE,
  TranslatedProperties,
  UpdatedEcosolutionBody,
} from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'
import { Editor, Toolbar } from 'ngx-editor'
import { forkJoin, last, of, switchMap, tap } from 'rxjs'
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services'
import {
  defaultSetCurrency,
  defaultSetDeliverCountries,
  defaultSetPaybackPeriodYears,
  defaultSetProductsCategories,
  defaultSetReductions,
  defaultSetyearGuarantee,
} from './compare-with-select'
import { EcosolutionForm } from './ecosolution-form.model'
import { EDITOR_TOOLBAR_ECOSOLUTIONS } from './editor-toolbar.constants'

@Component({
  selector: 'goeko-ecosolutions-form',
  templateUrl: './ecosolutions-form.component.html',
  styleUrls: ['./ecosolutions-form.component.scss'],
})
export class EcosolutionsFormComponent implements OnInit, OnDestroy {
  @ViewChild('inputCertified') inputCertified!: ElementRef<HTMLInputElement>
  public defaultSetProductsCategories = defaultSetProductsCategories
  public defaultSetDeliverCountries = defaultSetDeliverCountries
  public defaultSetPaybackPeriodYears = defaultSetPaybackPeriodYears
  public defaultSetCurrency = defaultSetCurrency
  public defaultSetReductions = defaultSetReductions
  public defaultSetyearGuarantee = defaultSetyearGuarantee
  public form!: FormGroup
  public ods = ODS_CODE
  public idEcosolution!: string
  public questionsCategories = this._cleantechEcosolutionsService.subCategorySelected
  public productsCategories!: any[]
  public editor!: Editor
  public html = ''
  public toolbar: Toolbar = EDITOR_TOOLBAR_ECOSOLUTIONS

  public langs = LANGS
  langSignal = signal(this._translateServices.currentLang || this._translateServices.defaultLang)
  public selectedFormLang = signal({ code: this.langSignal(), index: 0 })
  public dataSelect = DataSelect
  public mainCategory!: string
  public fileData!: { name: string; url: string }

  private _cleantechId!: string
  private fileCertificate: any
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

  public get bodyRequestEcosolution(): EcosolutionsBody {
    return this.idEcosolution
      ? new UpdatedEcosolutionBody(this._cleantechId, this.mainCategory, this.form.value)
      : new NewEcosolutionsBody(this._cleantechId, this.mainCategory, this.form.value)
  }

  private _isIncludeTranslation = (codeLang: string, translations?: TranslatedProperties[]) => {
    return translations?.map((value) => value.lang).includes(codeLang)
  }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ecosolutionsService: EcosolutionsService,
    private _fb: FormBuilder,
    private _translateServices: TranslateService,
    private _cleantechEcosolutionsService: CleantechEcosolutionsService,
  ) {}

  ngOnInit(): void {
    this._getParamsUrl()
    this.editor = new Editor()
    this._buildFrom()
    this._changeLangCode()
    this._changeValueSubCategory()
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
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((current) => {
      this._cleantechEcosolutionsService.getSubcategorySelected(this.mainCategory)
      this.langSignal.set(current.lang)
    })
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
      certified: [false],
      approved: [false],
      locations: this._fb.array([], Validators.required),
    })
  }

  get sustainableDevelopmentGoals(): FormArray {
    return this.form.get('sustainableDevelopmentGoals') as FormArray
  }

  private _changeValueSubCategory() {
    this.form.get('subCategory')?.valueChanges.subscribe((subCategory) => {
      if (subCategory) {
        this.productsCategories = DataSelect[subCategory.controlName as keyof typeof DataSelect]
      }
    })
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
  getEcosolution() {
    this._ecosolutionsService.getEcosolutionById(this.idEcosolution).subscribe((ecosolution: Ecosolutions) => {
      this._getCertificateEcosolution()
      this.urlPicEcosolution = ecosolution?.pictures?.map((picture) => picture.url)
      this._patchDataToForm(ecosolution)
    })
  }

  private _patchDataToForm(ecosolution: any): void {
    const formValue = new EcosolutionForm(ecosolution)
    this.form.patchValue(formValue)
    this._patchFormArray(this.nameTranslations, formValue.nameTranslations)
    this._patchFormArray(this.descriptionTranslations, formValue.descriptionTranslations)
    this._patchFormArray(this.detailedDescriptionTranslations, formValue.detailedDescriptionTranslations)
    this._patchFormArray(this.priceDescriptionTranslations, formValue.priceDescriptionTranslations)
  }

  private _patchValueLocationsFormControl(formValue: EcosolutionForm) {
    this.locationsArrays.clear()
    formValue.locations?.forEach(() => {
      this._addLocations()
    })
    this.form.get('locations')?.patchValue(formValue.locations)
    this.firstLoad = true
  }

  private _createLocations(): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(),
        regions: new FormControl(),
      }),
    })
  }
  private _addLocations() {
    this.locationsArrays.push(this._createLocations())
  }

  private _patchFormArray(formArray: FormArray, values: any[]): void {
    formArray.clear()
    values.forEach(() => {
      formArray.push(this._getFormGroupFieldTranslations())
    })
    formArray.patchValue(values)
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
          const uploadPicture$ = this._uploadPicture(ecosolution)
          const uploadCertificate$ = this._uploadCertificate(ecosolution)
          return forkJoin([uploadPicture$, uploadCertificate$])
        }),
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
    this._ecosolutionsService
      .updateEcosolution(this.idEcosolution, this.bodyRequestEcosolution)
      .pipe(
        switchMap((ecosolution) => {
          const uploadPicture$ = this._uploadPicture(ecosolution)
          const uploadCertificate$ = this._uploadCertificate(ecosolution)
          return forkJoin([uploadPicture$, uploadCertificate$])
        }),
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

  private _uploadPicture(ecosolution: any) {
    if (this._fileEcosolution && ecosolution) {
      const createOrUpdatePicture = this.idEcosolution
        ? this._ecosolutionsService.updatePicture(ecosolution?.id, this._fileEcosolution)
        : this._ecosolutionsService.uploadPicture(ecosolution?.id, this._fileEcosolution)
      return createOrUpdatePicture
    }
    return of(null)
  }

  fileChange(file: any) {
    this.fileCertificate = file.target.files[0]
  }

  uploadImgEcosolutions(file: any) {
    this._fileEcosolution = file
  }

  private _getCertificateEcosolution() {
    this._ecosolutionsService
      .getEcosolutionsDocumentationById(this.idEcosolution)
      .pipe(last())
      .subscribe((res: any) => {
        if (res) {
          this.fileData = res[res?.length - 1]
        }
      })
  }

  private _uploadCertificate(ecosolution: any) {
    if ((!this.form.value.certified && !this.form.controls['certified']?.dirty) || !this.inputCertified.nativeElement.value) {
      return of(null)
    }
    return this._ecosolutionsService.uploadDocumentation(ecosolution.id, [this.fileCertificate])
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
