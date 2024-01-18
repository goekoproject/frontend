import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  effect,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryProduct,
  ClassificationSubcategory,
  DataSelect,
  SmeService,
} from '@goeko/store';
import { transformArrayToObj } from './sme-analysis.request';
import { Subject } from 'rxjs';
import { AutoUnsubscribe } from '@goeko/ui';
import { SmeAnalysisService } from '../sme-analysis.service';
const compareWithClassificationCategory = (
  c1: ClassificationCategory,
  c2: ClassificationCategory
) => c1.code === c2.code;
@AutoUnsubscribe()
@Component({
  selector: 'goeko-sme-form-analysis',
  templateUrl: './sme-form-analysis.component.html',
  styleUrls: ['./sme-form-analysis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmeFormAnalysisComponent implements OnInit, AfterViewInit {
  compareWithProdcuts = (
    product: ClassificationCategoryProduct,
    productCodeSelected: string
  ) => {
    return product.code === productCodeSelected;
  };
  formField = FORM_CATEGORIES_QUESTION;
  form!: FormGroup;
  dateLastRecomendation!: string;
  public dataSelect = DataSelect as any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private _smeId!: string;

  //Signal
  categories = this._smeAnalysisService.categories;
  categorySelected = this._smeAnalysisService.categorySelected;
  dataCategorySelected = this._smeAnalysisService.dataCategorySelected;
  currentAnalytics = this._smeAnalysisService.currentAnalytics;
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
    this._initForm();
  }

  ngAfterViewInit(): void {
    this.categorySelected.set(this.categories()[0]);
  }
  private _initForm() {
    this.form = this._fb.group({
      co2Emission: this._fb.group({}),
      waste: this._fb.group({}),
      waterConsumption: this._fb.group({}),
      hazardousProduct: this._fb.group({}),
    });
  }
  selectCategory(categorySelected: ClassificationCategory): void {
    this.categorySelected.set(categorySelected);
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

  private _setLastAnalysis() {
    if (this._smeId) {
      this._getLastAnalysis();
    }
  }

  private _getLastAnalysis() {
    this._smeService
      .getLastRecommendationById(this._smeId)
      .subscribe((requestClassifications) => {
        if (requestClassifications) {
          this.dateLastRecomendation = requestClassifications.date;
          const classifications = transformArrayToObj(
            requestClassifications.classifications
          );

          this._createFormForEdit(classifications);
          this.form.patchValue(classifications);
          this._cdf.markForCheck();
        }
      });
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
      this._router.navigate([`summary`], {
        relativeTo: this._route,
        queryParamsHandling: 'preserve',
      });
    }
  }
  getResults() {
    this.currentAnalytics.set(this.form.value);
    this._smeId = this._overrideSmeId();
    this._router.navigate(['sme-analysis/results', this._smeId]);
  }

  /**
   * Set smeId again if we are create new analysis and the sme is in queryParams
   * @returns smeID
   */
  private _overrideSmeId(): string {
    if (!this._smeId) {
      const idByNewAnalysis = this._route.snapshot.queryParamMap.get(
        'smeId'
      ) as string;
      return idByNewAnalysis;
    }
    return this._smeId;
  }
}
