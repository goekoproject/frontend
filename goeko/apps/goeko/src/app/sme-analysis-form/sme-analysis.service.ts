import { Injectable, Injector, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  CATEGORY_SECTION,
  mergeCategoriesSectionWithClassificationCategory,
} from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryService,
  NULL_CLASSIFICATION_CATEGORY,
} from '@goeko/store';
import { map, tap } from 'rxjs';

export interface CurrecurrentAnalytics {
  co2Emission: { [key: string]: any };
  waste: { [key: string]: any };
  waterConsumption: { [key: string]: any };
  hazardousProduct: { [key: string]: any };
}
const CURRECURRENT = {
  co2Emission: {},
  waste: {},
  waterConsumption: {},
  hazardousProduct: {},
};
@Injectable()
export class SmeAnalysisService {
  private injector = inject(Injector);

  categories = toSignal(this._getAllCategories$(), {
    initialValue: CATEGORY_SECTION as any,
    injector: this.injector,
  });

  categorySelected = signal<ClassificationCategory>(
    NULL_CLASSIFICATION_CATEGORY
  );
  dataCategorySelected = signal<ClassificationCategory>(
    NULL_CLASSIFICATION_CATEGORY
  );
  subCategorySelectedIndex = signal<string>('');

  currentAnalytics = signal({} as any);

  constructor(
    private classificationCategoryService: ClassificationCategoryService
  ) {
    effect(() => {
      if (this.categorySelected().id !== '') {
        this._getClassificationForCategoryTranslated();
      }
    });
  }

  private _getAllCategories$() {
    return this.classificationCategoryService
      .getClassificationsCategory()
      .pipe(
        map((classificationCategory) =>
          mergeCategoriesSectionWithClassificationCategory(
            classificationCategory
          )
        )
      );
  }

  private _getClassificationForCategoryTranslated() {
    this.classificationCategoryService
      .getClassificationForCategoryTranslated(this.categorySelected().code)
      .subscribe((dataCategory) => {
        if (dataCategory) {
          this.dataCategorySelected.set(dataCategory);
        }
      });
  }

  getAllDataCategories() {
    this.categories()?.forEach((category: ClassificationCategory) => {
      this.categorySelected.set(category);
      this._getClassificationForCategoryTranslated();
    });
  }
}
