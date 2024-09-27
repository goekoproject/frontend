import { CommonModule } from '@angular/common'
import { Component, computed, effect, ElementRef, inject, model, output, signal, viewChildren } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SdgIconsComponent } from '@goeko/business-ui'
import { Category, ProjectService } from '@goeko/store'
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

  public filters = computed(() => {
    return {
      categories: this._filterCategories(),
      sdg: this._filterSdg(),
    }
  })
  public classificationsFilters = toSignal(inject(ProjectService).getGroupingFormCategories())

  private _categoriesCheckbox = viewChildren<ElementRef<HTMLInputElement>>('categories')
  private _filterCategories = signal<Category[] | null>(null)
  private _filterSdg = signal<string[] | null>(null)
  private get _checkedCategories() {
    return this._categoriesCheckbox()
      .filter((checkbox) => checkbox.nativeElement.checked)
      .map((checkbox) => {
        return JSON.parse(checkbox.nativeElement.value) as unknown as Category
      })
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

  applyFiltersSDG(sdgValue: string[]) {
    this._filterSdg.set(sdgValue)
    this.onApplyFilters.emit(this.filters())
  }
  closeFilter = () => {
    this.filtersVisible.set(false)
  }
}
