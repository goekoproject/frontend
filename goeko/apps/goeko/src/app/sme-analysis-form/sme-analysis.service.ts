import { Injectable, Injector, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  CATEGORY_SECTION,
  CategorySection,
  FORM_CATEGORIES_QUESTION,
  mergeCategoriesSectionWithClassificationCategory,
} from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryService,
  ClassificationSubcategory,
  NULL_CLASSIFICATION_CATEGORY,
} from '@goeko/store';
import { Observable, forkJoin, map } from 'rxjs';

export interface CurrecurrentAnalytics {
  co2Emission: { [key: string]: any };
  waste: { [key: string]: any };
  waterConsumption: { [key: string]: any };
  hazardousProduct: { [key: string]: any };
}

const mapToCategoriesSectionForOrderBy = (
  classificationCategory: ClassificationCategory
) => {
  const subcategoriesSections = FORM_CATEGORIES_QUESTION.find(
    (category) => category.code === classificationCategory.code
  )?.fields;
  const getOrderSubcategory = (subcategory: ClassificationSubcategory) =>
    subcategoriesSections?.find(
      (subcategorySection) =>
        subcategorySection.controlName === subcategory.code
    )?.order;
  return {
    ...classificationCategory,
    subcategories: classificationCategory.subcategories
      ?.map((subcategory) => ({
        ...subcategory,
        order: getOrderSubcategory(subcategory),
      }))
      .sort((a: any, b: any) => a.order - b.order),
  };
};

export const compareWithClassificationCategory = (
  c1: ClassificationCategory,
  c2: ClassificationCategory
) => c1.code === c2.code;
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

  dataAllCategory = signal<Array<ClassificationCategory>>([]);
  currentAnalytics = signal({} as any);

  constructor(
    private classificationCategoryService: ClassificationCategoryService
  ) {
   
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

  private _getClassificationForCategory$(codeCategory: string): Observable<ClassificationCategory> {
        return  this.classificationCategoryService
        .getClassificationForCategoryTranslated(codeCategory)
        .pipe(
          map((classificationCategory) =>
            mapToCategoriesSectionForOrderBy(classificationCategory)
          )
        )
  }
  private _getClassificationForCategoryTranslated() {
   this._getClassificationForCategory$(this.categorySelected().code)
      .subscribe((dataCategory) => {
        if (dataCategory) {
/*           this.dataCategorySelected.set(dataCategory);
 */          
        }
      });
  }



  getAllDataCategories() {
    const allCategories$ = this.categories().map((category:CategorySection) => this._getClassificationForCategory$(category.code)) ;
    forkJoin(allCategories$).subscribe((dataCategories) => this.dataAllCategory.set(dataCategories as ClassificationCategory[]));
  }
}
