import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, computed, effect } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassificationCategory, ClassificationCategoryProduct, ClassificationSubcategory, DataSelect, SmeRequestResponse, SmeService } from '@goeko/store';
import { AutoUnsubscribe } from '@goeko/ui';
import { Subject } from 'rxjs';
import { SmeAnalysisService } from '../sme-analysis.service';
import {
  transformArrayToObj
} from '../sme-form-analysis/sme-analysis.request';
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
export class SmeFormBaseComponent implements OnInit, AfterViewInit{
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChangeLastRecomendation: EventEmitter<boolean> =
    new EventEmitter<any>();
  public defaultSetSuperSelect = defaultSetSuperSelect as (
    o1: any,
    o2: any
  ) => boolean;
  public compareWithProdcuts = (
    product: ClassificationCategoryProduct,
    productCodeSelected: string
  ) => {
    return product.code === productCodeSelected;
  };
  public dateLastRecomendation!: string;
  public dataSelect = DataSelect as any;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public form!: FormGroup;
  public resultPath = 'sme-analysis/results';

  categories = this._smeAnalysisService.categories;
  categorySelected = this._smeAnalysisService.categorySelected;
  dataCategorySelected = this._smeAnalysisService.dataCategorySelected;
  currentAnalytics = this._smeAnalysisService.currentAnalytics;
  slideSelected = computed(() =>
  this.categories().findIndex(
    (category: ClassificationCategory) =>
      category.code === this.categorySelected().code
  ));

  private _smeId!: string;
  private _queryParamsSelected!:{[key: string]: string}


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _smeService: SmeService,
    private _route: ActivatedRoute,
    private _smeAnalysisService: SmeAnalysisService,
    private _cdf: ChangeDetectorRef
  ) {
    effect(() => {
      if (this.dataCategorySelected()?.code === this.categorySelected().code) {
        this._createFormGroup();
        this._setLastAnalysis();
      }
    });
  }

  ngOnInit(): void {
    this._smeId = this._route.snapshot.paramMap.get('id') as string;
    this._queryParamsSelected = this._route.snapshot.queryParams;
  }

  ngAfterViewInit(): void {
    this.categorySelected.set(this.categories()[0]);
  }

  private _createFormGroup(
    controlNameCatgory = this.categorySelected().code,
    dataCategorySelected = this.dataCategorySelected()
  ) {
    const formGroup = this.form.get(controlNameCatgory) as FormGroup;
    dataCategorySelected?.subcategories?.forEach(
      (subcategory: ClassificationSubcategory) => {
        if (this.form.get(controlNameCatgory)?.get(subcategory.code)) {
          return;
        }

        formGroup.addControl(subcategory.code, this._fb.control(''));
        this._cdf.markForCheck();
      }
    );
    this.form.addControl(controlNameCatgory, formGroup);
    this._cdf.markForCheck();
  }

  selectCategory(categorySelected: ClassificationCategory): void {
    this.categorySelected.set(categorySelected);
  }

  selectCategoryByCarousel(index: number) {
    this.categorySelected.set(this.categories()[index]);
  }

  private _setLastAnalysis() {
    if (this._smeId) {
      this._getLastAnalysis();
    }
    if(this._queryParamsSelected) {
      this._getRequiestSelected();
    }
  }
  private _getLastAnalysis() {
    this._smeService
      .getLastRecommendationById(this._smeId)
      .subscribe((requestClassifications) => {
        if (requestClassifications) {
          this.dateLastRecomendation = requestClassifications.date;
          this._fillForm(requestClassifications);
        }
      });
  }

  private _getRequiestSelected() {
    this._smeService
      .getRequestById({smeId: this._queryParamsSelected['smeId'], requestId: this._queryParamsSelected['requestId']})
      .subscribe((requestClassifications) => {
        if (requestClassifications) {
          this.dateLastRecomendation = requestClassifications.date;
          this._fillForm(requestClassifications);
        }
      });
  }

  
  private _fillForm(requestClassifications : SmeRequestResponse) {
    const classifications = transformArrayToObj(
      requestClassifications.classifications
    );

    this._createFormForEdit(classifications);
    this.form.patchValue(classifications);
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
    if (this._smeId) {
      this._router.navigate([`../${this._smeId}/summary`], {
        relativeTo: this._route,
      });
    } else {
      this._router.navigate([`/sme-analysis/summary`], {
        queryParamsHandling: 'preserve',
      });
    }
  }
  getResults() {
    this.currentAnalytics.set(this.form.value);
    this._smeId = this._smeId || this._queryParamsSelected['smeId'];
    this._router.navigate([this.resultPath, this._smeId]);
  }

}
