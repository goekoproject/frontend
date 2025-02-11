import { CommonModule } from '@angular/common'
import { Component, computed, ElementRef, inject, model, OnInit, output, signal, viewChildren } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { SdgIconsComponent } from '@goeko/business-ui'
import { Category, ClassificationDocumentType, ClassificationsDocumentsService, SDGLabel } from '@goeko/store'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ProjectManagmentService } from './project-managment.service'

export interface Filters {
  categories: Category[]
}
@Component({
  selector: 'goeko-project-ecosolutions-filters',
  standalone: true,
  imports: [CommonModule, SdgIconsComponent, TranslateModule],
  templateUrl: './project-ecosolutions-filters.component.html',
  styleUrl: './project-ecosolutions-filters.component.scss',
  providers: [ClassificationsDocumentsService, ProjectManagmentService],
})
export class ProjectEcosolutionsFiltersComponent implements OnInit {
  private _projectManagmenetService = inject(ProjectManagmentService)
  filtersVisible = model<boolean>(true)
  protected classificationsFilters = toSignal(this._projectManagmenetService.getGroupingFormCategories(), { initialValue: [] })
  public documentTypes = toSignal(this._projectManagmenetService.getDocumentTypeEcosolutionServices(), { initialValue: [] })

  private _translateService = inject(TranslateService)
  private _categoriesCheckbox = viewChildren<ElementRef<HTMLInputElement>>('categories')
  private _documentTypesCheckbox = viewChildren<ElementRef<HTMLInputElement>>('documentTypes')
  //Filters
  public filterCategories = signal<Category[] | null>(null)
  public filterCertificate = output<string[] | undefined>()
  public checkFavourite = signal<boolean>(false)
  public filterSdg = signal<SDGLabel[]>([])

  private _documentTypesForCode = computed(() => this.documentTypes()?.map((d) => d.code))
  private get _checkedCategories() {
    return this._categoriesCheckbox()
      .filter((checkbox) => checkbox.nativeElement.checked)
      .map((checkbox) => {
        return JSON.parse(checkbox.nativeElement.value) as unknown as Category
      })
  }
  private get _checkedDocumentTypes() {
    return this._documentTypesCheckbox()
      .filter((checkbox) => checkbox.nativeElement.checked)
      .map((checkbox) => JSON.parse(checkbox.nativeElement.value) as unknown as ClassificationDocumentType)
  }

  ngOnInit(): void {
    this._translateService.onLangChange.subscribe((res) => {
      this._projectManagmenetService.getGroupingFormCategories().subscribe((categories) => {
        this.classificationsFilters = signal(categories)
      })
    })
  }
  applyFiltersForCategories() {
    this.filterCategories.set(this._checkedCategories)
  }

  applyAllCategories() {
    this.filterCategories.set(null)
  }
  applyFavourites() {
    this.checkFavourite.update((value) => !value)
  }

  applyCertificate() {
    this.filterCertificate.emit(
      this._checkedDocumentTypes && this._checkedDocumentTypes.length > 0 ? this._checkedDocumentTypes?.map((d) => d.code) : undefined,
    )
  }
  applyAllCertificate(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked

    this.filterCertificate.emit(isChecked ? this._documentTypesForCode() : undefined)
  }
  closeFilter = () => {
    this.filtersVisible.set(false)
  }
}
