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
import {
  ClassificationCategory,
  ClassificationCategoryProduct,
  ClassificationSubcategory,
  DataSelect,
  SmeRequestResponse,
  SmeService,
} from '@goeko/store';
import { AutoUnsubscribe } from '@goeko/ui';
import { Subject } from 'rxjs';
import { SmeAnalysisService } from '../sme-analysis.service';
import { transformArrayToObj } from './sme-analysis.request';

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
  public form!: FormGroup;
  public dateLastRecomendation!: string;
  public dataSelect = DataSelect as any;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  
  private _smeId!: string;
  private _queryParamsSelected!:{[key: string]: string}
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
    this._queryParamsSelected = this._route.snapshot.queryParams;
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
  selectCategoryByCarousel(index: number) {
    console.log(index);
    this.categorySelected.set(this.categories()[index]);
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
    this._router.navigate(['sme-analysis/results', this._smeId]);
  }


}
