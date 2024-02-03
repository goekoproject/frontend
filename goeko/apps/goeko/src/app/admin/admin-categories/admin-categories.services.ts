import {
  Injectable,
  Injector,
  effect,
  inject,
  signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  CATEGORY_SECTION,
  FORM_CATEGORIES_QUESTION,
  mergeCategoriesSectionWithClassificationCategory
} from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryService,
  ManageCategory,
  ManageSubcategory,
  NULL_CLASSIFICATION_CATEGORY,
  NULL_MANAGE_CATEGORY,
} from '@goeko/store';
import { map, tap } from 'rxjs';

export function equalPrimitives(a: any, b: any) {
  return a.id === b.id;
}

const mapToCategoriesSectionForOrderBy = (
  classificationCategory: ManageCategory
) => {
  const subcategoriesSections = FORM_CATEGORIES_QUESTION.find(
    (category) => category.code === classificationCategory.code
  )?.fields;
  const getOrderSubcategory = (subcategory: ManageSubcategory) =>
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
      .pipe(map((category) => mapToCategoriesSectionForOrderBy(category)))
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
