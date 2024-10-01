import { CommonModule } from '@angular/common'
import { Component, computed, effect, ElementRef, inject, model, output, signal, viewChildren } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SdgIconsComponent } from '@goeko/business-ui'
import { Category, ProjectService, SDGLabel } from '@goeko/store'
import { TranslateModule } from '@ngx-translate/core'

export interface Filters {
  categories: Category[]
}
@Component({
  selector: 'goeko-project-ecosolutions-filters',
  standalone: true,
  imports: [CommonModule, SdgIconsComponent, TranslateModule],
  templateUrl: './project-ecosolutions-filters.component.html',
  styleUrl: './project-ecosolutions-filters.component.scss',
})
export class ProjectEcosolutionsFiltersComponent {
  filtersVisible = model<boolean>(true)
  onApplyFilters = output<any>()
  public classificationsFilters = toSignal(inject(ProjectService).getGroupingFormCategories())

  public filters = computed(() => {
    return {
      categories: this._filterCategories(),
      sdg: this.filterSdg(),
    }
  })

  private _categoriesCheckbox = viewChildren<ElementRef<HTMLInputElement>>('categories')
  private _filterCategories = signal<Category[] | null>(null)
  public filterSdg = signal<SDGLabel[]>([])
  private get _checkedCategories() {
    return this._categoriesCheckbox()
      .filter((checkbox) => checkbox.nativeElement.checked)
      .map((checkbox) => {
        return JSON.parse(checkbox.nativeElement.value) as unknown as Category
      })
  }
  private get _inputElementCategories() {
    return this._categoriesCheckbox().map((checkbox) => {
      return checkbox.nativeElement
    }) as HTMLInputElement[]
  }
  constructor() {
    effect(() => {})
  }

  applyFiltersForCategories() {
    this._filterCategories.set(this._checkedCategories)
    this.onApplyFilters.emit(this.filters())
  }
  applyAllCategories() {
    this._filterCategories.set(null)
  }

  closeFilter = () => {
    this.filtersVisible.set(false)
  }

  removeFilterCategory(code: string) {
    const categoryInput = this._inputElementCategories.find((input) => (JSON.parse(input.value) as unknown as Category).code === code)
    if (categoryInput) {
      categoryInput.checked = false
    }
    this.applyFiltersForCategories()
  }
  removeFilerSdg(code: number) {
    this.filterSdg.update((sdg) => (sdg ?? []).filter((sdg) => sdg.code !== code))
    this.onApplyFilters.emit(this.filters())
  }
}
