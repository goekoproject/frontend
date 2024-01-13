import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationSubcategory,
  DataSelect,
  SmeAnalysisStoreService,
  SmeService,
} from '@goeko/store';
import { transformArrayToObj } from './sme-analysis.request';
import { Subject, takeUntil } from 'rxjs';
import { AutoUnsubscribe } from '@goeko/ui';
import { SmeAnalysisService } from '../sme-analysis.service';

@AutoUnsubscribe()
@Component({
  selector: 'goeko-sme-form-analysis',
  templateUrl: './sme-form-analysis.component.html',
  styleUrls: ['./sme-form-analysis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmeFormAnalysisComponent implements OnInit {
  formField = FORM_CATEGORIES_QUESTION;
  form!: FormGroup;
  dateLastRecomendation!: string;
  public dataSelect = DataSelect as any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private _smeId!: string;
  private _selectedCategory!: string;

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
    private _cdf: ChangeDetectorRef,
    private _smeAnalysisStore: SmeAnalysisStoreService
  ) {
    effect(() => {
      if (this.dataCategorySelected()?.code === this.categorySelected().code) {
        this._createFormGroup();
      }
    });
  }

  ngOnInit(): void {
    this.categorySelected.set(this.categories()[0]);
    this._smeId = this._route.snapshot.paramMap.get('id') as string;
    this._route.queryParams.subscribe(
      (queryParams: any) => (this._selectedCategory = queryParams.categoryId)
    );
    this.form = this._fb.group({});
    this._setLastAnalysis();
    this._selectCatagory();
  }

  private _selectCatagory() {
    if (!this._selectedCategory) {
      return;
    }
    this._smeAnalysisStore
      .getCurrentAnalysis()
      .subscribe((analysis) => this.form.patchValue(analysis));

    const indexCarousel = this.formField.findIndex(
      (formField) => formField.id === this._selectedCategory
    );
  }

  private _createFormGroup() {
    this._preserveData();
    const controlNameCatgory = this.categorySelected().code;
    // if it exists, not create a new group
    if (!controlNameCatgory || this.form.controls[controlNameCatgory]) {
      this._cdf.markForCheck();
      return;
    }
    const formGroup = this._fb.group({});
    this.dataCategorySelected()?.subcategories?.forEach(
      (subcategory: ClassificationSubcategory) => {
        formGroup.addControl(subcategory.code, this._fb.control(''));
      }
    );
    this.form.addControl(controlNameCatgory, formGroup);
    this._cdf.markForCheck();
  }
  private _preserveData() {
    this._smeAnalysisStore
      .getCurrentAnalysis()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.form.patchValue(res);
        }
      });
  }

  selectCategory(categorySelected: ClassificationCategory): void {
    this.categorySelected.set(categorySelected);
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
          this.form.patchValue(classifications);
          this.form.markAllAsTouched();
        }
      });
  }
  gotToSummary() {
    this.currentAnalytics.set(this.form.value);
    /*     this._smeAnalysisStore.setCurrentAnalysis(this.form.value);
     */ setTimeout(() => {
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
    });
  }
  getResults() {
    this._smeAnalysisStore.setCurrentAnalysis(this.form.value);
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
