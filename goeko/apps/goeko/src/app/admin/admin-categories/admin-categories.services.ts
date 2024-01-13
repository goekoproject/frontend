import {
  Injectable,
  Injector,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  CATEGORY_SECTION,
  CategorySection,
  mergeCategoriesSectionWithClassificationCategory,
} from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryService,
  ManageCategory,
  NULL_CLASSIFICATION_CATEGORY,
  NULL_MANAGE_CATEGORY,
} from '@goeko/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

export function equalPrimitives(a: any, b: any) {
  return a.id === b.id;
}
@Injectable()
export class AdminCategoriesService {
  private injector = inject(Injector);

  categories = toSignal(this._getAllCategories$(), {
    initialValue: CATEGORY_SECTION as any[],
    injector: this.injector,
  });

  categorySelected = signal<ClassificationCategory>(
    NULL_CLASSIFICATION_CATEGORY
  );
  subCategorySelected = signal<ManageCategory>(NULL_MANAGE_CATEGORY);
  subCategorySelectedIndex = signal<string>('');

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

  updateSubcategorySelected(subcategorySelected: ManageCategory) {
    this.classificationCategoryService
      .updateClassificationCategory(
        this.categorySelected().id,
        subcategorySelected
      )
      .subscribe((res) => console.log(res));
  }
}
