import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CategoryModule,
  Product,
  ProductsManagementComponent,
} from '@goeko/business-ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  ClassificationCategory,
  ManageCategory,
  ManageProduct,
  ManageSubcategory,
  ProductSelectToManageProduct,
  Translations,
} from '@goeko/store';
import {
  BadgeModule,
  ButtonModule,
  DialogService,
  GoInputModule,
  SideDialogModule,
} from '@goeko/ui';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminCategoriesService } from './admin-categories.services';
import {
  AdminCategoriesDynamicForm,
  mergeProducts,
} from './admin-categories.dynamic-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/**
 * merge the categories section and the categories get backend for we have data like icons and preloading data
 * @param categorySection  the category section
 * @param classificationCategory backend categories
 * @returns
 */

@Component({
  selector: 'goeko-admin',
  standalone: true,
  imports: [
    CommonModule,
    CategoryModule,
    TranslateModule,
    GoInputModule,
    ReactiveFormsModule,
    ButtonModule,
    BadgeModule,
    ProductsManagementComponent,
  ],
  providers: [AdminCategoriesService],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategoriesComponent {
  @ViewChildren('detailCategory')
  detailCategory!: QueryList<ElementRef<HTMLDetailsElement>>;
  //Signal
  categories = this._adminCategories.categories;
  categorySelected = this._adminCategories.categorySelected;
  subCategorySelected = this._adminCategories.subCategorySelected;
  subCategorySelectedIndex = this._adminCategories.subCategorySelectedIndex;

  public form!: FormGroup;

  closeDetailByIndex = (index: number) => {
    const elementDetail = this.detailCategory.get(index)?.nativeElement;
    if (elementDetail) {
      elementDetail.open = false;
    }
  };

  private productControl = (subcategoryCode: string): FormGroup =>
    this.form.get(subcategoryCode)?.get('products') as FormGroup;

  getControlForSubCategory(subcategory: string) {
    return this.form?.get(subcategory);
  }

  getLabelForLangProducts(code: string) {
    return this.productControl(code)?.value?.map((product: ManageProduct) => ({
      ...product,
      lableForLang: product?.label?.translations.find(
        (translation: Translations) => translation.lang === this.currentLang()
      ),
    }));
  }

  getTranslations(
    subcategory: string,
    typeQuestion: 'label' | 'question'
  ): FormArray {
    return this.getControlForSubCategory(subcategory)
      ?.get(typeQuestion)
      ?.get('translations') as FormArray;
  }

  public currentLang = toSignal(
    this._translations.onLangChange.pipe(map((data) => data.lang)),
    {
      initialValue: this._translations.defaultLang,
      manualCleanup: true,
    }
  );

  constructor(
    private _adminCategories: AdminCategoriesService,
    private _fb: FormBuilder,
    private _translations: TranslateService,
    private _dialogService: DialogService,
    private _cdf: ChangeDetectorRef
  ) {
    effect(() => {
      this._createFormGroup();
    });
  }

  selectCategory(categorySelected: ClassificationCategory): void {
    this.categorySelected.set(categorySelected);
  }
  selectSubcategory(id: string | undefined): void {
    if (id) {
      this.subCategorySelectedIndex.set(id);
      this._createFormGroup();
    }
  }

  closeDetailCategory(index: number): void {
    this.closeDetailByIndex(index);
  }
  saveSubcategory() {
    const updateCategory: ManageCategory = {
      ...this.subCategorySelected(),
      id: undefined,
      subcategories: Object.values(this.form.value).map((subcategory: any) => ({
        ...subcategory,
        lang: undefined,
      })),
    };
    this._adminCategories.updateSubcategorySelected(updateCategory);
  }
  private _createFormGroup() {
    this.form = this._fb.group({});
    this.subCategorySelected()?.subcategories.forEach(
      (group: ManageSubcategory) => {
        if (group) {
          const formGroup = this._fb.group({});
          this._buildFormFormsubcategorySelected(group, formGroup);
          this.form.addControl(group.code, formGroup);
        }
      }
    );
  }
  private _buildFormFormsubcategorySelected(
    group: ManageSubcategory,
    formGroup: FormGroup
  ) {
    AdminCategoriesDynamicForm.buildForm({ fb: this._fb, group, formGroup });
  }

  addProducts(subcategoryCode: string) {
    const dialogResponse = this._openDialogAddProducts(subcategoryCode);

    dialogResponse.subscribe((productsSelected: Product[]) => {
      this.productControl(subcategoryCode)?.patchValue(
        productsSelected?.map((product) => ({
          ...new ProductSelectToManageProduct(
            product.id,
            this._getTranslations(product.keyLang)
          ),
        }))
      );
      this.form.markAllAsTouched();
      this.form.markAsDirty();
    });
  }
  private _getTranslations(label: string) {
    const translations = new Array<Translations>();
    this._translations.getLangs().forEach((lang) => {
      this._translations.getTranslation(lang).subscribe((translation: any) => {
        const array = label.split('.');
        const labelTranslate = translation[array[0]][array[1]][array[2]];
        translations.push({
          label: labelTranslate,
          lang: lang,
        });
        this._cdf.markForCheck();
      });
    });
    return translations;
  }
  private _openDialogAddProducts = (subcategoryCode: string) => {
    return this._dialogService.openDialog<ProductsManagementComponent>(
      ProductsManagementComponent,
      {
        productSelected: this.productControl(subcategoryCode)?.value,
        subcategoryCode: subcategoryCode,
      }
    );
  };
}
