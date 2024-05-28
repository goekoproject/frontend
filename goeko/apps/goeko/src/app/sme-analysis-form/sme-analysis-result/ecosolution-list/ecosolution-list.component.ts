import { Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui';
import {
  ODS_CODE,
  SmeAnalysisStoreService,
  SmeService,
  UserService,
} from '@goeko/store';
import { AutoUnsubscribe } from '@goeko/ui';
import { TranslateService } from '@ngx-translate/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { SmeAnalysisService } from '../../sme-analysis.service';
import { formToClassificationsMapper } from '../../sme-form-analysis/sme-analysis.request';

@AutoUnsubscribe()
@Component({
  selector: 'goeko-ecosolution-list',
  templateUrl: './ecosolution-list.component.html',
  styleUrls: ['./ecosolution-list.component.scss'],
})
export class EcosolutionListComponent implements OnInit {
  @ViewChild('all') checkedAll!: ElementRef<HTMLInputElement>;

  odsIcons!: Array<{ code: number; active: boolean }>;

  formField = FORM_CATEGORIES_QUESTION;
  toogleOpenDetails = false;
  smeRecomendation!: any;
  selectedRecomendation: any;
  selectedRecomendationIndex: any;
  zoomOutIn = false;
  private _smeId!: string;
  formValue!: any;
  smeDataProfile = this._userService.userProfile();
  private _codeActive = signal<Array<number>>([])
  private destroy$ = new Subject<void>();

  get allChecked() {
    const allChecked = !this.formField.some((field) => field.checked);
    return allChecked;
  }

  get currentLangCode(): string {
    return this._currentLangCode;
  }

  set currentLangCode(currentLang: string) {
    this._currentLangCode = currentLang;
    this.closeDetails();
  }

  private _currentLangCode!: string;
  currentAnalytics = this._smeAnalysisService.currentAnalytics;

  smeRecomendationBody!: any;
  constructor(
    private _smeService: SmeService,
    private _smeAnalysisStore: SmeAnalysisStoreService,
    private _translateServices: TranslateService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router,
    private _smeAnalysisService: SmeAnalysisService
  ) {}

  ngOnInit(): void {
    this._smeId = this._route.snapshot.paramMap.get('id') as string;

    this.getResults();
    this.currentLangCode = this._translateServices.defaultLang;
    this._changeLangCode();
    this._getOdsIcons();
  }

  getResults() {
    this._smeService
      .ecosolutionSearch({
        classifications: formToClassificationsMapper(this.currentAnalytics()),
      })
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((recommendations) => {
        this._handleRecommendations(recommendations);
      });
  }
  private _getOdsIcons() {
    const odsIconsCode = ODS_CODE;

    this.odsIcons = odsIconsCode.map((code: number) => ({
      code: code,
      active: false,
    }));
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((res) => {
      (this.currentLangCode = res.lang), this.getResults();
    });
  }

  private _handleRecommendations(recommendations: any) {
    if (recommendations && Array.isArray(recommendations)) {
      const smeRecomendation = this._filterSmeRecomendations(recommendations);
      this.smeRecomendation = this._buildCountriesAvailability(smeRecomendation);
      this._makeFilterBySDG();
    }
  }

  private _buildCountriesAvailability(solutions: any) {
    return solutions.map((res: any) => ({
      ...res,
      companyDetail: {
        ...res?.companyDetail,
        countriesAvailability: res?.companyDetail.countries
          .map((countries: string) => this.getCountriesAvailability(countries))
          .toString(),
      },
    }));
  }

  getCountriesAvailability(countries: any) {
    const lang = this.currentLangCode === 'gb' ? 'en' : this.currentLangCode;
    const regionNames = new Intl.DisplayNames([lang], { type: 'region' });
    return ` ${regionNames.of(countries)}`;
  }

  handlerOpenDetail(selectedRecomendation: any) {
    this._smeAnalysisStore.setDetailEcosolutions(selectedRecomendation);
    this._router.navigate(['details', 'id'], { relativeTo: this._route });
    /* 	this.selectedRecomendation = selectedRecomendation;
		if (!this.toogleOpenDetails) {
			this.toogleOpenDetails = true;
		}

		this.selectedRecomendationIndex = selectedRecomendationIndex; */
  }

  onCheckboxStateChange(checked: any, index: number) {
    const selectedSection = this.formField[index];
    if (selectedSection) {
      selectedSection.checked = !selectedSection.checked;
      this.getResults();
    }
  }

  private _filterSmeRecomendations(smeRecomendation: any) {
    if (this.checkedAll?.nativeElement?.checked) {
      return smeRecomendation;
    }
    let newSmeRecomendation = new Array<any>();

    const fieldChecked = this.formField.filter((field) => field.checked);
    fieldChecked.forEach((el: any) => {
      const newArray = smeRecomendation.filter(
        (recomendation: any) =>
          recomendation.classification.mainCategory.toUpperCase() ===
          el.controlName.toUpperCase()
      );
      newSmeRecomendation = [...newSmeRecomendation, ...newArray];
    });
    return newSmeRecomendation;
  }

  filterBySDG(code: Array<number>) {
    this._codeActive.set(code);
    this.getResults();
    this._makeFilterBySDG();
  }

  private _makeFilterBySDG() {
    if( this._codeActive().length > 0) {
      this.smeRecomendation = this.smeRecomendation.filter(
        (recomendation: any) =>
          this._codeActive().some((elemento) =>
            recomendation.sustainableDevelopmentGoals.includes(elemento)
          )
      );
   
    }

  }

  contieneArray(arrPrincipal: any, arrBuscado: any) {
    // Iterar a través de los elementos del array principal
    for (let i = 0; i <= arrPrincipal.length - arrBuscado.length; i++) {
      let coincide = true;

      // Comprobar si el subarray coincide en esta posición
      for (let j = 0; j < arrBuscado.length; j++) {
        if (arrPrincipal[i + j] !== arrBuscado[j]) {
          coincide = false;
          return;
        }
      }

      // Si el subarray coincide, retornar true
      if (coincide) {
        return true;
      }
    }

    // Si no se encuentra el subarray, retornar false
    return false;
  }
  closeDetails() {
    this.toogleOpenDetails = false;
    this.zoomOutIn = false;
  }

  getAll(checked: boolean) {
    this.formField = this.formField.map((field) => ({
      ...field,
      checked: checked,
    }));
    this.getResults();
  }
}
