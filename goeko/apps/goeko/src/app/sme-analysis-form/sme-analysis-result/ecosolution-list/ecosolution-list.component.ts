import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui'
import {
  ECOSOLUTIONS_CONFIGURATION,
  EcosolutionResult,
  EcosolutionsTaggingService,
  ODS_CODE,
  SmeAnalysisStoreService,
  SmeService,
  SmeUser,
  TAGGING,
  UserService,
} from '@goeko/store'
import { AutoUnsubscribe } from '@goeko/ui'
import { TranslateService } from '@ngx-translate/core'
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { SmeAnalysisService } from '../../sme-analysis.service'
import { CriteriaEcosolutionSearch } from './criteria-ecosolution-search.model'

@AutoUnsubscribe()
@Component({
  selector: 'goeko-ecosolution-list',
  templateUrl: './ecosolution-list.component.html',
  styleUrls: ['./ecosolution-list.component.scss'],
  providers: [
    EcosolutionsTaggingService,
    {
      provide: ECOSOLUTIONS_CONFIGURATION,
      useValue: {
        endpoint: environment.baseUrl,
      },
    },
  ],
})
export class EcosolutionListComponent implements OnInit {
  @ViewChild('all') checkedAll!: ElementRef<HTMLInputElement>

  odsIcons!: Array<{ code: number; active: boolean }>

  formField = FORM_CATEGORIES_QUESTION
  toogleOpenDetails = false
  ecosolutions = signal<Array<EcosolutionResult>>([])
  selectedRecomendation: any
  selectedRecomendationIndex: any
  zoomOutIn = false
  private _smeId!: string
  formValue!: any
  smeDataProfile = this._userService.userProfile()
  private _codesActive = signal<Array<number>>([])
  private destroy$ = new Subject<void>()
  public TAGGING = TAGGING
  get allChecked() {
    const allChecked = !this.formField.some((field) => field.checked)
    return allChecked
  }

  get currentLangCode(): string {
    return this._currentLangCode
  }

  set currentLangCode(currentLang: string) {
    this._currentLangCode = currentLang
    this.closeDetails()
  }

  private _currentLangCode!: string
  currentAnalytics = this._smeAnalysisService.currentAnalytics

  smeRecomendationBody!: any
  constructor(
    private _smeService: SmeService,
    private _smeAnalysisStore: SmeAnalysisStoreService,
    private _translateServices: TranslateService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router,
    private _smeAnalysisService: SmeAnalysisService,
    private _taggingService: EcosolutionsTaggingService,
  ) {}

  ngOnInit(): void {
    this._smeId = this._route.snapshot.paramMap.get('id') as string
    this.getResults()
    this.currentLangCode = this._translateServices.defaultLang
    this._changeLangCode()
    this._getOdsIcons()
  }

  getResults() {
    this._smeService
      .ecosolutionSearch(new CriteriaEcosolutionSearch(this.currentAnalytics(), this._userService.userProfile() as SmeUser))
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((ecosolutions) => {
        if (ecosolutions && ecosolutions.length > 0) {
          this._handleRecommendations(ecosolutions)
        }
      })
  }
  private _getOdsIcons() {
    const odsIconsCode = ODS_CODE

    this.odsIcons = odsIconsCode.map((code: number) => ({
      code: code,
      active: false,
    }))
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((res) => {
      ;(this.currentLangCode = res.lang), this.getResults()
    })
  }

  private _handleRecommendations(recommendations: EcosolutionResult[]) {
    if (recommendations && Array.isArray(recommendations)) {
      const smeRecomendation = this._filterSmeRecomendations(recommendations)
      this.ecosolutions.set(this._buildCountriesAvailability(smeRecomendation))
      this._makeFilterBySDG()
    }
  }

  private _buildCountriesAvailability(solutions: EcosolutionResult[]) {
    return solutions.map((res: any) => ({
      ...res,
      companyDetail: {
        ...res?.companyDetail,
        countriesAvailability: res?.companyDetail.countries.map((countries: string) => this.getCountriesAvailability(countries)).toString(),
      },
    }))
  }

  getCountriesAvailability(countries: any) {
    const lang = this.currentLangCode === 'gb' ? 'en' : this.currentLangCode
    const regionNames = new Intl.DisplayNames([lang], { type: 'region' })
    return ` ${regionNames.of(countries)}`
  }

  goToViewDetailEcosolution(ecosolution: EcosolutionResult) {
    this._smeAnalysisStore.setDetailEcosolutions(ecosolution)
    this._router.navigate(['details', ecosolution.id], {
      relativeTo: this._route,
    })
  }

  changeFavorite(ecosolution: EcosolutionResult) {
    if (ecosolution.favourite) {
      this._taggingService.removeFavorite(this._smeId, ecosolution.id).subscribe(() => this.getResults())
      return
    }
    this._taggingService.addFavorite(this._smeId, ecosolution.id).subscribe(() => this.getResults())
  }

  onCheckboxStateChange(checked: any, index: number) {
    const selectedSection = this.formField[index]
    if (selectedSection) {
      selectedSection.checked = !selectedSection.checked
      this.getResults()
    }
  }

  private _filterSmeRecomendations(smeRecomendation: EcosolutionResult[]) {
    if (this.checkedAll?.nativeElement?.checked) {
      return smeRecomendation
    }
    let newSmeRecomendation = new Array<any>()

    const fieldChecked = this.formField.filter((field) => field.checked)
    fieldChecked.forEach((el: any) => {
      const newArray = smeRecomendation.filter(
        (recomendation: EcosolutionResult) => recomendation.classification.mainCategory.toUpperCase() === el.controlName.toUpperCase(),
      )
      newSmeRecomendation = [...newSmeRecomendation, ...newArray]
    })
    return newSmeRecomendation
  }

  filterBySDG(codes: Array<number>) {
    this._codesActive.set(codes)
    this.getResults()
    this._makeFilterBySDG()
  }

  private _makeFilterBySDG() {
    if (this._codesActive().length > 0) {
      this.ecosolutions.update((ecosolutions) =>
        ecosolutions.filter((ecosolution) =>
          this._codesActive().some((elemento) => ecosolution.sustainableDevelopmentGoals.includes(elemento)),
        ),
      )
    }
  }

  closeDetails() {
    this.toogleOpenDetails = false
    this.zoomOutIn = false
  }

  getAll(checked: boolean) {
    this.formField = this.formField.map((field) => ({
      ...field,
      checked: checked,
    }))
    this.getResults()
  }
}
