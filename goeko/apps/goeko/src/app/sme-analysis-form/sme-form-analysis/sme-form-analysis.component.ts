import { SelectionModel } from '@angular/cdk/collections'
import { Location } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  effect,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { CanAnalysisDeactivate } from '@goeko/business-ui'
import { ClassificationCategory, ClassificationSubcategory, DataSelect, SmeRequestResponse, SmeService } from '@goeko/store'
import { AutoUnsubscribe } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs'
import { compareWithProducts } from '../sme-analysis..util'
import { SmeAnalysisService } from '../sme-analysis.service'
import { FormValueToSmeAnalysisRequest, transformArrayToObj } from './sme-analysis.request'

@AutoUnsubscribe()
@Component({
  selector: 'goeko-sme-form-analysis',
  templateUrl: './sme-form-analysis.component.html',
  styleUrls: ['./sme-form-analysis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmeFormAnalysisComponent implements OnInit, AfterViewInit, OnDestroy, CanAnalysisDeactivate {
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    const canDeactivate = this.canDeactivate()
    if (!canDeactivate) {
      event.preventDefault()
    }
  }

  compareWithProducts = compareWithProducts
  public form!: FormGroup
  public dateLastRecomendation!: string
  public dataSelect = DataSelect as any
  public destroy$: Subject<boolean> = new Subject<boolean>()
  private goToSummary = false
  private get _smeId(): string {
    return this._route.snapshot.paramMap.get('id') || this._route.snapshot.queryParamMap.get('smeId') || ''
  }

  private get _queryParamsSelected(): { [key: string]: string } {
    return this._route.snapshot.queryParams
  }
  private _dataCategories!: SelectionModel<ClassificationCategory>

  get dataCategorySelected(): ClassificationCategory {
    return this._dataCategories?.selected[0]
  }

  get isDataSetLastAnalysis() {
    const isLast = this._queryParamsSelected['isLast']
    return isLast && JSON.parse(isLast) && (!this.currentAnalytics() || Object.keys(this.currentAnalytics()).length === 0)
  }

  //Signal
  categories = this._smeAnalysisService.categories
  categorySelected = this._smeAnalysisService.categorySelected
  currentAnalytics = this._smeAnalysisService.currentAnalytics
  dataAllCategory = this._smeAnalysisService.dataAllCategory
  slideSelected = computed(() =>
    this.categories().findIndex((category: ClassificationCategory) => category.code === this.categorySelected().code),
  )

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _smeService: SmeService,
    private _route: ActivatedRoute,
    private _smeAnalysisService: SmeAnalysisService,
    private _cdf: ChangeDetectorRef,
    private _location: Location,
    private _translateService: TranslateService,
  ) {
    effect(() => {
      if (this.dataAllCategory().length > 0) {
        this._loadDataCategories()
      }
    })
  }

  ngOnInit(): void {
    this._smeAnalysisService.getAllDataCategories()
    this._initForm()
    this.form.patchValue(this.currentAnalytics(), {
      emitEvent: false,
      onlySelf: false,
    })
    this._changeLang()
  }

  private _changeLang() {
    this._translateService.onLangChange.subscribe(() => {
      this._smeAnalysisService.getAllDataCategories()
    })
  }

  ngAfterViewInit(): void {
    this.categorySelected.set(this.categories()[0])
  }

  ngOnDestroy(): void {
    this._smeAnalysisService.dataAllCategory.set([])
  }
  canDeactivate = (): boolean | Observable<boolean> | Promise<boolean> => {
    return this.goToSummary || (!this.form.dirty && !this.form.touched && this.form.pristine)
  }
  saveAnalysis = (): Observable<boolean> => {
    const smeAnalysisRequest = new FormValueToSmeAnalysisRequest(this._smeId, this.form.value)
    return this._smeService.saveRecommendations(smeAnalysisRequest).pipe(distinctUntilChanged(), takeUntil(this.destroy$))
  }
  private _loadDataCategories(): void {
    this._dataCategories = new SelectionModel(false, this.dataAllCategory())
    this.dataAllCategory().forEach((category) => this._createFormGroup(category))
    this._dataCategories.select(this.dataAllCategory()[0])
    this._setLastAnalysis()
  }

  private _initForm() {
    this.form = this._fb.group({
      co2Emission: this._fb.group({}),
      waste: this._fb.group({}),
      waterConsumption: this._fb.group({}),
      hazardousProduct: this._fb.group({}),
    })
  }
  private _createFormGroup(selectedCategory: ClassificationCategory) {
    const dataCategorySelected = selectedCategory
    const controlNameCatgory = selectedCategory.code

    const formGroup = this.form.get(controlNameCatgory) as FormGroup
    dataCategorySelected?.subcategories?.forEach((subcategory: ClassificationSubcategory) => {
      if (this.form.get(controlNameCatgory)?.get(subcategory.code)) {
        return
      }

      const _valueControl =
        this.currentAnalytics() && this.currentAnalytics()[controlNameCatgory]
          ? this.currentAnalytics()[controlNameCatgory][subcategory.code]
          : ''
      formGroup.addControl(subcategory.code, this._fb.control(_valueControl), { emitEvent: false })
      this._cdf.markForCheck()
    })
    this.form.addControl(controlNameCatgory, formGroup, { emitEvent: false })
    this._cdf.markForCheck()
  }
  selectCategory(categorySelected: ClassificationCategory): void {
    this._selectedCategory(categorySelected)
  }
  selectCategoryByCarousel(categorySelected: ClassificationCategory) {
    this._selectedCategory(categorySelected)
  }

  private _selectedCategory(categorySelected: ClassificationCategory) {
    this.categorySelected.set(categorySelected)
    const dataCategorySelected = this.dataAllCategory().find(
      (category) => category.code === categorySelected.code,
    ) as ClassificationCategory
    this._dataCategories.select(dataCategorySelected)
  }

  private _setLastAnalysis() {
    const { smeId, requestId } = this._queryParamsSelected
    if (this.isDataSetLastAnalysis) {
      this._getLastAnalysis()
    }
    if (smeId && requestId) {
      this._getRequiestSelected(smeId, requestId)
    }
  }

  private _getLastAnalysis() {
    this._smeService.getLastRecommendationById(this._smeId).subscribe((requestClassifications) => {
      if (requestClassifications) {
        this.dateLastRecomendation = requestClassifications.date
        this._fillForm(requestClassifications)
      }
    })
  }

  private _getRequiestSelected(smeId: string, requestId: string) {
    this._smeService.getRequestById({ smeId, requestId }).subscribe((requestClassifications: any) => {
      if (requestClassifications) {
        this.dateLastRecomendation = requestClassifications.date
        this._fillForm(requestClassifications)
      }
    })
  }

  private _fillForm(requestClassifications: SmeRequestResponse) {
    const classifications = transformArrayToObj(requestClassifications.classifications)

    this._createFormForEdit(classifications)
    this.form.patchValue(classifications, { emitEvent: false, onlySelf: true })
    this._cleanUpForm()

    this._cdf.markForCheck()
  }

  private _cleanUpForm() {
    setTimeout(() => {
      this.form.markAsPristine()
      this.form.markAsUntouched()
    }, 1000)
  }
  private _createFormForEdit(classifications: any) {
    Object.keys(classifications).forEach((controlName) => {
      Object.keys(classifications[controlName]).forEach((controlNameSubcategory) => {
        ;(this.form.get(controlName) as FormGroup).addControl(controlNameSubcategory, this._fb.control(''), { emitEvent: false })
      })
    })
  }

  gotToSummary() {
    this.goToSummary = true
    this.currentAnalytics.set(this.form.value)
    this._router.navigate(['summary'], {
      queryParams: {
        smeId: this._smeId,
      },
      relativeTo: this._route.parent,
    })
  }

  goToBack() {
    this._location.back()
  }
}
