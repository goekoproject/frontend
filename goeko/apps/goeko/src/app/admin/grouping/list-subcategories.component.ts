import { CommonModule } from '@angular/common'
import { Component, computed, ElementRef, inject, input, model, OnInit, output, viewChildren } from '@angular/core'
import { ProductsManagementComponent } from '@goeko/business-ui'
import { CODE_LANG } from '@goeko/core'
import { Product, SubcategoryResponse } from '@goeko/store'
import { ButtonModule, DIALOG_DATA, SideDialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { forkJoin } from 'rxjs'
import { AdminCategoriesService } from './admin-categories/admin-categories.services'
import { LabelByCategoryPipe } from './admin-categories/label-by-category.pipe'
import { getProductBySubcategoryId } from './admin-categories/new-product'
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
  providers: [AdminCategoriesService],
})
export class ListSubcategoriesComponent implements OnInit {
  JSON = JSON
  private _sideDialogService = inject(SideDialogService)
  private _adminCategoriesService = inject(AdminCategoriesService)
  private _data = inject<DataDialog>(DIALOG_DATA, {
    optional: true,
  })
  subcategoryElement = viewChildren<ElementRef>('subcategoryElement')
  subcategories = model<SubcategoryResponse[] | undefined>(this._data?.subcategories)
  selectedLangSubcategory = input<string>(CODE_LANG.EN)

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
        mode: 'add',
      })
      .subscribe((product) => {
        if (product) {
          console.log('New product add', product)
        }
      })
  }

  selectedElement = () => {
    const dataForGrouping = this.subcategorySelected.map((subcategory, index: number) => {
      return {
        code: subcategory.categoryCode,
        subcategories: [
          {
            code: subcategory.code,
            order: index,
          },
        ],
        order: index,
      }
    })
    this.onSubcategorySelected.emit(dataForGrouping)
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
    const createProductObservables$ = getProductBySubcategoryId(subcategory.id).map((product) =>
      this._adminCategoriesService.createProduct(product),
    )

    forkJoin(createProductObservables$).subscribe((res) => {
      console.log('res', res)
    })
  }
  close() {
    this._sideDialogService.closeDialog(this.subcategorySelected)
  }
}
