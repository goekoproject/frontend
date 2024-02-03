import { Injectable, Injector, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  CATEGORY_SECTION,
  mergeCategoriesSectionWithClassificationCategory,
} from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryService,
  NULL_CLASSIFICATION_CATEGORY
} from '@goeko/store';
import { map, tap } from 'rxjs';

@Injectable()
export class CleantechEcosolutionsService {
  private injector = inject(Injector);

  subCategorySelected = signal<ClassificationCategory>({id: '',
  code: '',
  label:''
});

  categories = toSignal(this._getAllCategories$(), {
    initialValue: CATEGORY_SECTION as any[],
    injector: this.injector,
  });

  categorySelected = signal<ClassificationCategory>(
    NULL_CLASSIFICATION_CATEGORY
  );
  constructor(
    private classificationCategoryService: ClassificationCategoryService
  ) {
    effect(() => {
      if (this.categorySelected().id !== '') {
        this.getSubcategorySelected(this.categorySelected().code);
      }
    });
  }
  private _getAllCategories$() {
    return this.classificationCategoryService.getClassificationsCategory().pipe(
      map((classificationCategory) =>
        mergeCategoriesSectionWithClassificationCategory(classificationCategory)
      ),
      tap((categories) => this.categorySelected.set(categories[0]))
    );
  }
  public getSubcategorySelected(code: string) {
    this.classificationCategoryService
      .getClassificationForCategoryTranslated(code)
      .subscribe((subcategorySelected) => {
        if (subcategorySelected) {
          this.subCategorySelected.set(subcategorySelected);
        }
      });
  }
}
