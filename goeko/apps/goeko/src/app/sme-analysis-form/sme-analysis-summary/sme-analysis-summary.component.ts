import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CanAnalysisDeactivate, FORM_CATEGORIES_QUESTION, MessageService, Product, ProductsManagementComponent } from '@goeko/business-ui'
import {
  ClassificationCategory,
  ClassificationCategoryProduct,
  ClassificationSubcategory,
  DataSelect,
  ProjectService,
  SmeAnalysisStoreService,
  SmeService,
} from '@goeko/store'
import { AutoUnsubscribe, MESSAGE_TYPE, SideDialogService } from '@goeko/ui'
import { Observable, Subject, distinctUntilChanged, of, takeUntil } from 'rxjs'
import { SmeAnalysisService } from '../sme-analysis.service'
import { FormValueToSmeAnalysisRequest, FormValueToSmeProjectRequest } from '../sme-form-analysis/sme-analysis.request'

@AutoUnsubscribe()
@Component({
  selector: 'goeko-sme-analysis-summary',
  templateUrl: './sme-analysis-summary.component.html',
  styleUrls: ['./sme-analysis-summary.component.scss'],
  providers: [MessageService],
})
export class SmeAnalysisSummaryComponent implements OnInit, CanAnalysisDeactivate {
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    const canDeactivate = this.canDeactivate()
    if (!canDeactivate) {
      event.preventDefault()
    }
  }
  @Output() editForm: EventEmitter<number> = new EventEmitter()
  public dataSelect = DataSelect
  formField = FORM_CATEGORIES_QUESTION
  formValue!: any
  public savedAnalysis = false
  private _smeId!: string
  public toogleSaveName = false
  private destroy$ = new Subject<void>()

  currentAnalytics = this._smeAnalysisService.currentAnalytics
  categories = this._smeAnalysisService.categories
  dataCategorySelected = this._smeAnalysisService.dataCategorySelected

  allCategories = this._smeAnalysisService.dataAllCategory
  public get isProject() {
    return this._router.url.includes('projects')
  }

  private get _dialogInfoMessage() {
    return this._messageService.infoMessage(MESSAGE_TYPE.WARNING, {
      title: 'DIALOG.saveMessageGeneric',
      buttonPrimary: 'save',
      buttonSecondary: 'notSave',
    })
  }

  private get _resultPath(): string {
    return 'results'
  }

  private get projectId(): string {
    return this._route.snapshot.queryParamMap.get('projectId') as string
  }
  constructor(
    private _smeServices: SmeService,
    private _projectService: ProjectService,
    private _smeAnalysisStore: SmeAnalysisStoreService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _smeAnalysisService: SmeAnalysisService,
    private _sideDialogService: SideDialogService,
    private _messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this._smeAnalysisService.getAllDataCategories()
    this._smeId = this._getSmeId()
    this._smeAnalysisStore
      .getCurrentAnalysis()
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.formValue = res
        }
      })
  }

  canDeactivate = (): boolean | Promise<boolean> | Observable<boolean> => {
    return this.savedAnalysis
  }

  saveAnalysis = (): Observable<boolean> => {
    this.saveAnalysisOrProject()
    return of(true)
  }

  private _getSmeId(): string {
    const idByNewAnalysis = this._route?.parent?.snapshot.params['id'] as string
    const idByLastRecommended = this._route.snapshot.queryParamMap.get('smeId') as string
    return idByNewAnalysis || idByLastRecommended
  }

  onSearchNameChange(event: CustomEvent) {
    const value = event.detail
    this.formValue = {
      ...this.formValue,
      searchName: value,
    }
  }
  editCategory(categoryCode: string, subcategoryCode: string) {
    if (!categoryCode || !subcategoryCode) {
      return
    }
    const dialogResponse = this._openDialogAddProducts({
      categoryCode,
      subcategoryCode,
    })
    dialogResponse.subscribe((productsSelected: Product[]) => {
      this._updateProductOfSubcategory(productsSelected, {
        categoryCode,
        subcategoryCode,
      })
    })
  }

  private _openDialogAddProducts = ({ categoryCode = '', subcategoryCode = '' }) => {
    return this._sideDialogService.openDialog<ProductsManagementComponent>(ProductsManagementComponent, {
      productSelected: this.currentAnalytics()[categoryCode][subcategoryCode],
      subcategoryCode: subcategoryCode,
    })
  }

  private _updateProductOfSubcategory(productsSelected: Product[], { categoryCode = '', subcategoryCode = '' }) {
    const codeProductSelected = productsSelected.map((product: Product) => product.id)
    const categoryForUpdate = this.allCategories().find((c: ClassificationCategory) => c.code === categoryCode)
    const productBySubcategory = categoryForUpdate?.subcategories?.find(
      (subc: ClassificationSubcategory) => subc.code === subcategoryCode,
    )?.products
    const productSelectedOfSubcategory = productBySubcategory?.filter((product: ClassificationCategoryProduct) =>
      codeProductSelected.includes(product.code),
    )
    this.currentAnalytics()[categoryCode][subcategoryCode] = productSelectedOfSubcategory
  }

  changeSearchName(searchName: string): void {
    this.currentAnalytics.update((value) => ({ ...value, searchName: searchName }))
  }

  goToSearchEcosolutions() {
    if (!this.savedAnalysis) {
      this._dialogInfoMessage.afterClosed().subscribe((saveAnalysis) => {
        if (saveAnalysis) {
          this.saveAnalysisOrProject(this._resultPath)
          this.savedAnalysis = true
        } else {
          this._goToSearchEcosolutions()
        }
      })
    } else {
      this._goToSearchEcosolutions()
    }
  }

  private _goToSearchEcosolutions() {
    this._router.navigate([`../${this._resultPath}`, this._smeId], { relativeTo: this._route })
    this.savedAnalysis = true
  }

  saveAnalysisOrProject(route?: string, isDashboard?: boolean) {
    this.savedAnalysis = true
    if (this.isProject) {
      this._updateOfCreateProject(route, isDashboard)
    } else {
      this._saveAnalysis(route, isDashboard)
    }
  }

  private _updateOfCreateProject(route?: string, isDashboard?: boolean) {
    if (this.projectId) {
      this._updateProject(route, isDashboard)
    } else {
      this._saveProject(route, isDashboard)
    }
  }
  private _saveProject(route?: string, isDashboard?: boolean) {
    const smeAnalysisRequest = new FormValueToSmeProjectRequest(this.currentAnalytics(), this._smeId)
    this._projectService
      .saveProject(smeAnalysisRequest)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.savedAnalysis = true
        if (isDashboard) this._goToDashboard()
        if (route) this._goToResult(route)
      })
  }

  private _updateProject(route?: string, isDashboard?: boolean) {
    const smeAnalysisRequest = new FormValueToSmeProjectRequest(this.currentAnalytics())
    this._projectService
      .updateProject(this.projectId, smeAnalysisRequest)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.savedAnalysis = true
        if (isDashboard) this._goToDashboard()
        if (route) this._goToResult(route)
      })
  }
  private _saveAnalysis(route?: string, isDashboard?: boolean) {
    const smeAnalysisRequest = new FormValueToSmeAnalysisRequest(this._smeId, this.currentAnalytics())
    this._smeServices
      .saveRecommendations(smeAnalysisRequest)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.savedAnalysis = true
        if (isDashboard) this._goToDashboard()
        if (route) this._goToResult(route)
      })
  }

  cancel() {
    this._dialogInfoMessage.afterClosed().subscribe((saveAnalysis) => {
      if (saveAnalysis) {
        this.saveAnalysisOrProject(undefined, true)
      } else {
        this._goToDashboard()
        this.savedAnalysis = true
      }
    })
  }

  private _goToDashboard() {
    this._router.navigate(['../dashboard/sme'], { relativeTo: this._route.parent?.parent })
  }

  private _goToResult(route?: string) {
    if (!route) {
      return
    }
    this._router.navigate([route, this._smeId], { relativeTo: this._route.parent })
  }
  getEnableNotificationEmail(onNewEcosolution: boolean) {
    this.currentAnalytics.update((value) => ({
      ...value,
      notification: {
        onNewEcosolution: onNewEcosolution,
      },
    }))
  }
}
