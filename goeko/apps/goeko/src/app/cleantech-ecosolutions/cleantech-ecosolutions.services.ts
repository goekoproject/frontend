import { Injectable, Injector, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  CATEGORY_SECTION,
  mergeCategoriesSectionWithClassificationCategory,
} from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryService,
  ManageCategory,
  NULL_CLASSIFICATION_CATEGORY,
  NULL_MANAGE_CATEGORY,
} from '@goeko/store';
import { map, tap } from 'rxjs';

@Injectable()
export class CleantechEcosolutionsService {
  private injector = inject(Injector);

  subCategorySelected = signal<ManageCategory>(NULL_MANAGE_CATEGORY);

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
        this._getSubcategorySelected(this.categorySelected().id);
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
  private _getSubcategorySelected(id: string) {
    this.classificationCategoryService
      .getClassificationById(id)
      .subscribe((subcategorySelected) => {
        if (subcategorySelected) {
          this.subCategorySelected.set(subcategorySelected);
        }
      });
  }
}
