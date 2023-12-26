import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FORM_CATEGORIES_QUESTION } from '@goeko/business-ui';
import { SmeService, SmeAnalysisService, UserService } from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil, last } from 'rxjs';
import {
  formToClassificationsMapper,
  FormValueToSmeAnalysisRequest,
} from '../../sme-form-analysis/sme-analysis.request';

@Component({
  selector: 'goeko-ecosolution-list',
  templateUrl: './ecosolution-list.component.html',
  styleUrls: ['./ecosolution-list.component.scss'],
})
export class EcosolutionListComponent implements OnInit, OnDestroy {
  odsIcons!: Array<{ code: number; active: boolean }>;

  formField = FORM_CATEGORIES_QUESTION;
  toogleOpenDetails = false;
  smeRecomendation!: any;
  selectedRecomendation: any;
  selectedRecomendationIndex: any;
  zoomOutIn = false;
  private _smeId!: string;
  formValue!: any;
  smeDataProfile: any;
  @ViewChild('all') checkedAll!: ElementRef<HTMLInputElement>;
  onDestroy$: Subject<void> = new Subject();

  get allChecked() {
    const allChecked = !this.formField.some((field) => field.checked);
    return allChecked;
  }

  get currentLangCode(): string {
    return this._currentLangCode;
  }

  set currentLangCode(currentLang: string) {
    this._currentLangCode = currentLang;
    this.getResults();
    this.closeDetails();
  }

  private _currentLangCode!: string;

  smeRecomendationBody!: any;
  constructor(
    private _smeService: SmeService,
    private _smeAnalysisService: SmeAnalysisService,
    private _translateServices: TranslateService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._smeId = this._route.snapshot.paramMap.get('id') as string;

    this._smeAnalysisService
      .getCurrentAnalysis()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((analysis) => {
        if (analysis) {
          this.formValue = analysis;
          this.getResults();
        }
      });
    this.currentLangCode = this._translateServices.defaultLang;
    this._changeLangCode();
    this._getOdsIcons();
    this._getSmeCompanyDetail();
  }

  private _getSmeCompanyDetail() {
    this._userService.companyDetail.subscribe((company) => {
      if (company) {
        this.smeDataProfile = company;
      }
    });
  }

  getResults() {
    this._smeService
      .createRecommendations({
        classifications: formToClassificationsMapper(this.formValue),
      })
      .pipe(takeUntil(this.onDestroy$), last())
      .subscribe((recommendations) => {
        this._handleRecommendations(recommendations);
      });
  }
  private saveAnalysis() {
    const smeAnalysisRequest = new FormValueToSmeAnalysisRequest(
      this._smeId,
      this.formValue
    );
    this._smeService
      .saveRecommendations(smeAnalysisRequest)
      .subscribe((recommendations) => {
        this._handleRecommendations(recommendations);
      });
  }
  private _getOdsIcons() {
    const odsIconsCode = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    ];

    this.odsIcons = odsIconsCode.map((code: number) => ({
      code: code,
      active: false,
    }));
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe(
      (res) => (this.currentLangCode = res.lang)
    );
  }

  private _handleRecommendations(recommendations: any) {
    if (recommendations && Array.isArray(recommendations)) {
      const smeRecomendation = this._filterSmeRecomendations(recommendations);
      this.smeRecomendation =
        this._buildCountriesAvailability(smeRecomendation);
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

  handlerOpenDetail(
    selectedRecomendation: any,
    selectedRecomendationIndex: number
  ) {
    this._smeAnalysisService.setDetailEcosolutions(selectedRecomendation);
    this._router.navigate(['details'], { relativeTo: this._route });
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

  filterBySDG(index: number, checked: boolean) {
    this.odsIcons[index].active = !checked;
    this.getResults();
    this._makeFilterBySDG();
  }

  private _makeFilterBySDG() {
    const codeActive = this.odsIcons
      .filter((sdg) => sdg.active)
      .map((sdgActive) => sdgActive.code);
    if (!this.odsIcons.every((codeActive) => !codeActive.active)) {
      this.smeRecomendation = this.smeRecomendation.filter(
        (recomendation: any) =>
          codeActive.some((elemento) =>
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
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
