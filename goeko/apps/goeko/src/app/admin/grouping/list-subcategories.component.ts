import { CommonModule } from '@angular/common'
import { Component, computed, ElementRef, inject, input, model, OnInit, output, viewChildren } from '@angular/core'
import { ProductsManagementComponent } from '@goeko/business-ui'
import { CODE_LANG } from '@goeko/core'
import { ClassificationCategoryService, ManageCategory, ManageProduct, ManageSubcategory, Product, SubcategoryResponse } from '@goeko/store'
import { ButtonModule, DIALOG_DATA, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { forkJoin, of, switchMap } from 'rxjs'
import { AdminCategoriesService } from './admin-categories/admin-categories.services'
import { LabelByCategoryPipe } from './admin-categories/label-by-category.pipe'
import { DataSubcategory, DialogAddSubcategoryComponent } from './dialog-add-subcategory.component'
interface DataDialog {
  subcategories: SubcategoryResponse[]
  categoryId: string
  mode: 'isolation' | 'grouping'
}
@Component({
  selector: 'goeko-list-subcategories',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, LabelByCategoryPipe],
  templateUrl: './list-subcategories.component.html',
  styleUrl: './list-subcategories.component.scss',
  providers: [AdminCategoriesService, ClassificationCategoryService],
})
export class ListSubcategoriesComponent implements OnInit {
  JSON = JSON
  private _sideDialogService = inject(SideDialogService)
  private _adminCategoriesService = inject(AdminCategoriesService)
  private _classificationsService = inject(ClassificationCategoryService)

  private _data = inject<DataDialog>(DIALOG_DATA, {
    optional: true,
  })
  subcategoryElement = viewChildren<ElementRef>('subcategoryElement')
  subcategories = model<SubcategoryResponse[] | undefined>(this._data?.subcategories)
  selectedLangSubcategory = input<string>(CODE_LANG.EN)

  categoryLegacyId = input<string>()
  onSubcategorySelected = output<any>()
  onChangedSubcategory = output<any>()

  isIsolation = computed(() => this._data?.mode === 'isolation')
  get subcategorySelected() {
    return this.subcategoryElement()
      .filter((subcategory) => subcategory.nativeElement.checked)
      .map((c) => JSON.parse(c.nativeElement.value))
  }

  private _openDialgoAddSubcategory = (data?: DataSubcategory) => {
    return this._sideDialogService.openDialog<DialogAddSubcategoryComponent>(DialogAddSubcategoryComponent, data)
  }

  ngOnInit(): void {
    if (this._data?.categoryId) {
      this._adminCategoriesService.getSubcategoriesByCategoryId(this._data.categoryId).subscribe((res) => {
        this.subcategories.set(res)
      })
    }
  }

  editSubcategory(subcategory: SubcategoryResponse) {
    const { label, question } = subcategory

    this._openDialgoAddSubcategory({ label: label, question: question }).subscribe((res) => {
      const updateSubcategory = {
        ...res,
        enabled: subcategory.enabled,
      }
      this._adminCategoriesService.updateSubcategory(subcategory.id, updateSubcategory).subscribe((res) => {
        if (res) {
        }
      })
    })
  }

  openDialogAddProducts = (subcategory: SubcategoryResponse, product?: Product) => {
    this._openDialogAddProducts(subcategory, product)
  }
  private _openDialogAddProducts = (subcategory: SubcategoryResponse, product?: Product) => {
    return this._sideDialogService
      .openDialog<ProductsManagementComponent>(ProductsManagementComponent, {
        productSelected: product,
        subcategoryCode: subcategory.code,
        subcategoryId: subcategory.id,
      })

      .subscribe((product: Product[]) => {
        if (product) {
          console.log('New product add', product)
          const subcategoriesProducts = this._addProductsToSubcategory(subcategory, product)
          this.onSubcategorySelected.emit({ subcategories: subcategoriesProducts, deselect: true })
        }
      })
  }

  private _addProductsToSubcategory = (subcategory: SubcategoryResponse, products: Product[]) => {
    return this.subcategorySelected.map((subcategory) => {
      if (subcategory.id === subcategory.id) {
        return { ...subcategory, products: products }
      }
      return subcategory
    })
  }

  selectedElement = () => {
    this.onSubcategorySelected.emit({ subcategories: this.subcategorySelected })
  }
  clipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Texto copiado al portapapeles')
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles:', err)
      })
  }

  addProductsMasive(subcategory: SubcategoryResponse) {
    this._classificationsService
      .getClassificationById(this.categoryLegacyId() as string)
      .pipe(
        switchMap((res: ManageCategory) => {
          const subcategories = res.subcategories.find((legacy) => legacy.code === subcategory.code) as ManageSubcategory

          const newProducts = this._transformSubcategoriesProducts(subcategory.id, subcategories.products as ManageProduct[])
          return of(newProducts)
        }),
        switchMap((products) => {
          const createProductObservables$ = products.map((product) => {
            return this._adminCategoriesService.createProduct(product)
          })
          return forkJoin(createProductObservables$)
        }),
      )
      .subscribe((res: any[]) => {
        console.log('res', res)
      })
  }
  close() {
    this._sideDialogService.closeDialog(this.subcategorySelected)
  }

  private _transformSubcategoriesProducts = (subcategoryId: string, legacyProduct: ManageProduct[]) => {
    return legacyProduct.map((product) => ({
      subcategoryId: subcategoryId,
      code: product.code,
      label: product.label,
    }))
  }
}
