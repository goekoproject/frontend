import { CommonModule } from '@angular/common'
import { Component, ElementRef, inject, input, OnInit, output, signal, viewChildren } from '@angular/core'
import { ProductsManagementComponent } from '@goeko/business-ui'
import { CODE_LANG, LANGS } from '@goeko/core'
import { Category, Label, NewSubcategory, Product, SubcategoryResponse } from '@goeko/store'
import { ButtonModule, RadioModule, SideDialogService, ToggleSwitchComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { forkJoin } from 'rxjs'
import { AdminCategoriesService } from './admin-categories/admin-categories.services'
import { LabelByCategoryPipe } from './admin-categories/label-by-category.pipe'
import { getProductBySubcategoryId } from './admin-categories/new-product'
import { DataSubcategory, DialogAddSubcategoryComponent } from './dialog-add-subcategory.component'
import { DialogManagmentCategoryComponent } from './dialog-managment-category.component'

interface AllDataCategories {
  subcategories: SubcategoryResponse[]
  id: string
  code: string
  label: Label
  open: boolean
}
interface ClassificationGrouping {
  code: string
  subcategories: Array<{ code: string; order: number }>
}
@Component({
  selector: 'goeko-add-category-subcategory-group',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    ToggleSwitchComponent,
    LabelByCategoryPipe,
    DialogManagmentCategoryComponent,
    RadioModule,
  ],
  providers: [AdminCategoriesService],
  templateUrl: './add-category-subcategory-group.component.html',
  styleUrl: './add-category-subcategory-group.component.scss',
})
export class AddCategorySubcategoryGroupComponent implements OnInit {
  private _adminCategoriesService = inject(AdminCategoriesService)
  private _sideDialogService = inject(SideDialogService)
  JSON = JSON
  public langs = signal(LANGS)
  subcategoryElement = viewChildren<ElementRef>('subcategoryElement')
  beforeNext = output<any>()
  categories = signal<AllDataCategories[]>([])
  categoryCode = input<string>()
  subcategoryCode = input<string>()
  selectedLangSubcategory = signal<string>(CODE_LANG.EN)

  get subcategorySelected() {
    return this.subcategoryElement()
      .filter((subcategory) => subcategory.nativeElement.checked)
      .map((c) => JSON.parse(c.nativeElement.value))
  }

  private _openDialogCategory = (category?: Category) => {
    return this._sideDialogService.openDialog<DialogManagmentCategoryComponent>(DialogManagmentCategoryComponent, {
      category,
    })
  }

  private _openDialgoAddSubcategory = (data?: DataSubcategory) => {
    return this._sideDialogService.openDialog<DialogAddSubcategoryComponent>(DialogAddSubcategoryComponent, data)
  }

  private _categoryToAllDataCategories = (category: Category, subcategories: SubcategoryResponse[] = []): AllDataCategories => {
    return {
      id: category.id,
      code: category.code,
      label: category.label,
      open: false,
      subcategories: subcategories,
    }
  }

  ngOnInit(): void {
    this._adminCategoriesService.getAllCategories().subscribe((categories) => {
      categories.forEach((category) => {
        this._addCategory(category)
      })
      this._navigateToCategoryByCode()
    })
  }

  private _navigateToCategoryByCode() {
    if (this.categoryCode() && this.subcategoryCode() && this.categories()) {
      const AllDataCategories = this.categories().find((category) => category.code === this.categoryCode()) as AllDataCategories
      this._fetchData(AllDataCategories)
    }
  }
  private _addCategory = (category: Category) => {
    const newCategory = this._categoryToAllDataCategories(category)
    this.categories.set([...this.categories(), newCategory])
  }

  private _addSubcategory = (subcategory: SubcategoryResponse) => {
    this.categories.update((categories) => {
      return categories.map((category) => {
        if (category.id === subcategory.categoryId) {
          return { ...category, subcategories: [...category.subcategories, subcategory] }
        }
        return category
      })
    })
  }

  private _addAllSubcategory = (categoryId: string, subcategory: SubcategoryResponse[]) => {
    this.categories.update((categories) => {
      return categories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, subcategories: subcategory }
        }
        return category
      })
    })
  }

  private _toogleDetailCategory = (category: AllDataCategories) => {
    this.categories.update((categories: any[]) => {
      return categories.map((c) => {
        if (c.id === category.id) {
          return { ...c, open: true }
        }
        return c
      })
    })
  }

  createNewCategory = () => {
    this._openDialogCategory().subscribe((res: Category) => {
      if (res) {
        this._addCategory(res)
      }
    })
  }

  viewSubcategory = (toogleViewSubcategory: boolean, category: AllDataCategories) => {
    if (toogleViewSubcategory) {
      this._fetchData(category)
    }
  }

  private _fetchData = (category: AllDataCategories) => {
    this._adminCategoriesService.getSubcategoryByCategoryId(category.id).subscribe((res) => {
      this._toogleDetailCategory(category)
      this._addAllSubcategory(category.id, res)
    })
  }

  addNewSubcategoryToCategory = (category: AllDataCategories) => {
    this._openDialgoAddSubcategory().subscribe((res) => {
      console.log('res', res)
      const newSubcategory: NewSubcategory = {
        categoryId: category.id,
        ...res,
      }
      this._adminCategoriesService.createSubcategory(newSubcategory).subscribe((subcategory) => {
        this._addSubcategory(subcategory)
        this._toogleDetailCategory(category)
      })
    })
  }
  editSubcategory(category: AllDataCategories, subcategory: SubcategoryResponse) {
    const { label, question } = subcategory

    this._openDialgoAddSubcategory({ label: label, question: question }).subscribe((res) => {
      const updateSubcategory = {
        ...res,
        enabled: subcategory.enabled,
      }
      this._adminCategoriesService.updateSubcategory(subcategory.id, updateSubcategory).subscribe((res) => {
        if (res) {
          this._fetchData(category)
        }
      })
    })
  }

  /** @Missing */
  deleteCategory(category: AllDataCategories) {
    this._adminCategoriesService.deleteCategory(category.id).subscribe((res) => {})
  }

  openDialogAddProducts = (category: AllDataCategories, subcategory: SubcategoryResponse, product?: Product) => {
    this._openDialogAddProducts(category, subcategory, product)
  }
  private _openDialogAddProducts = (category: AllDataCategories, subcategory: SubcategoryResponse, product?: Product) => {
    return this._sideDialogService
      .openDialog<ProductsManagementComponent>(ProductsManagementComponent, {
        productSelected: product,
        subcategoryCode: subcategory.code,
        subcategoryId: subcategory.id,
      })
      .subscribe((product) => {
        if (product) {
          this._fetchData(category)
        }
      })
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
  selectedElement = () => {
    const dataForGrouping: ClassificationGrouping[] = this.subcategorySelected.map((subcategory, index: number) => {
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
    this.beforeNext.emit(dataForGrouping)
  }

  addProductsMasive(subcategory: SubcategoryResponse) {
    const createProductObservables$ = getProductBySubcategoryId(subcategory.id).map((product) =>
      this._adminCategoriesService.createProduct(product),
    )

    forkJoin(createProductObservables$).subscribe((res) => {
      console.log('res', res)
    })
  }
}
