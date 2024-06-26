import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  computed,
  effect,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ClassificationCategory,
  ClassificationSubcategory,
  DataSelect,
  ProjectService,
  SmeRequestResponse,
  SmeService
} from '@goeko/store';
import { AutoUnsubscribe } from '@goeko/ui';
import { Subject } from 'rxjs';
import { compareWithProducts } from '../sme-analysis..util';
import { SmeAnalysisService } from '../sme-analysis.service';
import { transformArrayToObj } from '../sme-form-analysis/sme-analysis.request';
const defaultSetSuperSelect = (o1: any, o2: any) => {
  if (o1 && o2 && typeof o2 !== 'object') {
    return o1.id.toString() === o2;
  }

  if (o1 && o2 && typeof o2 === 'object') {
    return o1.id.toString() === o2.id.toString();
  }

  return null;
};

@AutoUnsubscribe()
@Component({
  selector: 'goeko-sme-form-base',
  template: `<div>goeko-sme-form-base</div>`,
})
export class SmeFormBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChangeLastRecomendation: EventEmitter<boolean> =
    new EventEmitter<any>();
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  public compareWithProducts = compareWithProducts;

  public dateLastRecomendation!: string;
  public dataSelect = DataSelect as any;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public form!: FormGroup;
  private _dataCategories!:SelectionModel<ClassificationCategory>;

  get dataCategorySelected(): ClassificationCategory {
    return this._dataCategories?.selected[0];
  }
  private get _smeId(): string {
    return this._route.snapshot.paramMap.get('id') || this._route.snapshot.queryParamMap.get('smeId') ||'';
  }

  private get _queryParamsSelected(): {[key: string]: string} {
    return this._route.snapshot.queryParams;
  }
  //Signal
  categories = this._smeAnalysisService.categories;
  categorySelected = this._smeAnalysisService.categorySelected;
  currentAnalytics = this._smeAnalysisService.currentAnalytics;
  dataAllCategory = this._smeAnalysisService.dataAllCategory;
  slideSelected = computed(() =>
    this.categories().findIndex(
      (category: ClassificationCategory) =>
        category.code === this.categorySelected().code
    )
  );

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _smeService: SmeService,
    private _route: ActivatedRoute,
    private _smeAnalysisService: SmeAnalysisService,
    private _projectService: ProjectService,
    private _cdf: ChangeDetectorRef
  ) {
    effect(() => {
      if(this.dataAllCategory().length > 0) {
        this._loadDataCategories();
      }
    });
  }

  ngOnInit(): void {
    this._smeAnalysisService.getAllDataCategories();
  }

  ngAfterViewInit(): void {
    this.categorySelected.set(this.categories()[0]);
  }

  ngOnDestroy(): void {
    this._smeAnalysisService.dataAllCategory.set([]);
  }
  private _loadDataCategories(): void {
    this._dataCategories = new SelectionModel(false, this.dataAllCategory());
    this.dataAllCategory().forEach((category) => this._createFormGroup(category));
    this._dataCategories.select(this.dataAllCategory()[0]);
    this._setLastAnalysis();
  }

  private _createFormGroup(
    selectedCategory: ClassificationCategory
  ) {
    const dataCategorySelected = selectedCategory
    const controlNameCatgory  = selectedCategory.code;

    const formGroup = this.form.get(controlNameCatgory) as FormGroup;
    dataCategorySelected?.subcategories?.forEach(
      (subcategory: ClassificationSubcategory) => {
        if (this.form.get(controlNameCatgory)?.get(subcategory.code)) {
          return;
        }

        const _valueControl = this.currentAnalytics()&& this.currentAnalytics()[controlNameCatgory] ?  
        this.currentAnalytics()[controlNameCatgory][subcategory.code] : '';
        formGroup.addControl(subcategory.code, this._fb.control(_valueControl));
        this._cdf.markForCheck();

      }
    );
    this.form.addControl(controlNameCatgory, formGroup);
    this._cdf.markForCheck();
  }

  selectCategory(categorySelected: ClassificationCategory): void {
    this._selectedCategory(categorySelected);
  }

  selectCategoryByCarousel(categorySelected: ClassificationCategory) {
    this._selectedCategory(categorySelected);
  }

  private _selectedCategory(categorySelected: ClassificationCategory) {
    this.categorySelected.set(categorySelected);
    const dataCategorySelected = this.dataAllCategory().find((category) => category.code === categorySelected.code) as ClassificationCategory;
    this._dataCategories.select(dataCategorySelected);
  }
  private _setLastAnalysis() {
    if (this._queryParamsSelected) {
      this._getRequiestSelected();
    }
  }
  private _getLastAnalysis() {
    this._projectService
      .getLastProjectBySmeId(this._smeId)
      .subscribe((requestClassifications) => {
        if (requestClassifications) {
          this.dateLastRecomendation = requestClassifications.date;
          this._fillForm(requestClassifications);
        }
      });
  }

  private _getRequiestSelected() {
    const {projectId } =  this._queryParamsSelected;
    this._projectService
      .getProjectId({
        smeId: this._smeId,
        projectId: projectId,
      })
      .subscribe((requestClassifications) => {
        if (requestClassifications) {
          this.dateLastRecomendation = requestClassifications.date;
          this._fillForm(requestClassifications);
        }
      });
  }

  private _fillForm(requestClassifications: SmeRequestResponse) {
    const classifications = transformArrayToObj(
      requestClassifications.classifications
    );

    this._createFormForEdit(classifications);
    this.form.patchValue(classifications);
    this.form.controls['searchName'].patchValue(requestClassifications.name);
    this._cdf.markForCheck();
  }

  private _createFormForEdit(classifications: any) {
    Object.keys(classifications).forEach((controlName) => {
      Object.keys(classifications[controlName]).forEach(
        (controlNameSubcategory) => {
          (this.form.get(controlName) as FormGroup).addControl(
            controlNameSubcategory,
            this._fb.control('')
          );
        }
      );
    });
  }

  gotToSummary() {
    this.currentAnalytics.set(this.form.value);
    this._router.navigate([`summary`], {
      relativeTo: this._route.parent,
      queryParams: {
        smeId : this._smeId
      },
      queryParamsHandling: 'merge'

    });
  }
}
