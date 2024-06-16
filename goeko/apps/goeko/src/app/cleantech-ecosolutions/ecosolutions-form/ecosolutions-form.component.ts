import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LANGS } from '@goeko/core';
import {
  CleanTechService,
  DataSelect,
  Ecosolution,
  Ecosolutions,
  EcosolutionsService,
  FiledTranslations,
  NewEcosolutionsBody,
  ODS_CODE,
} from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, last, of, switchMap, tap } from 'rxjs';
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services';
import {
  defaultSetCurrency,
  defaultSetDeliverCountries,
  defaultSetPaybackPeriodYears,
  defaultSetProductsCategories,
  defaultSetReductions,
  defaultSetyearGuarantee,
} from './compare-with-select';
import { EcosolutionForm } from './ecosolution-form.model';

@Component({
  selector: 'goeko-ecosolutions-form',
  templateUrl: './ecosolutions-form.component.html',
  styleUrls: ['./ecosolutions-form.component.scss'],
})
export class EcosolutionsFormComponent implements OnInit {
  @ViewChild('inputCertified') inputCertified!: ElementRef<HTMLInputElement>;
  public form!: FormGroup;
  public ods = ODS_CODE;
  public idEcosolution!: string;
  public questionsCategories =
    this._cleantechEcosolutionsService.subCategorySelected;
  public productsCategories!: any[];
  public defaultSetProductsCategories = defaultSetProductsCategories;
  public defaultSetDeliverCountries = defaultSetDeliverCountries;
  public defaultSetPaybackPeriodYears = defaultSetPaybackPeriodYears;
  public defaultSetCurrency = defaultSetCurrency;
  public defaultSetReductions = defaultSetReductions;
  public defaultSetyearGuarantee = defaultSetyearGuarantee;
  public langs = LANGS;
  langSignal = signal(
    this._translateServices.currentLang || this._translateServices.defaultLang,
  );
  public selectedFormLang = signal({ code: this.langSignal(), index: 0 });
  public dataSelect = DataSelect;
  public mainCategory!: string;
  public fileData!: { name: string; url: string };

  private _cleantechId!: string;
  private fileCertificate: any;
  private _fileEcosolution!: File[];
  public urlPicEcosolution?: string[];
  public get isReadOnly(): boolean {
    return this._route.snapshot.queryParamMap.get('isReadOnly') === 'true';
  }
  public get locationsArrays(): FormArray {
    return this.form.get('locations') as FormArray;
  }
  public get nameTranslations(): FormArray {
    return this.form.get('nameTranslations') as FormArray;
  }
  public get selectedNameTranslationsControls() {
    return (
      this.nameTranslations.controls[this.selectedFormLang().index] as FormGroup
    ).controls['translation'];
  }

  public get bodyRequestEcosolution(): NewEcosolutionsBody {
    return new NewEcosolutionsBody(
      this._cleantechId,
      this.mainCategory,
      this.form.value,
    );
  }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ecosolutionsService: EcosolutionsService,
    private _cleanTeachService: CleanTechService,
    private _fb: FormBuilder,
    private _translateServices: TranslateService,
    private _cleantechEcosolutionsService: CleantechEcosolutionsService,
  ) {}

  ngOnInit(): void {
    this._getParamsUrl();
    this._initForm();
    this._addNameTranslations();
    console.log(this.form);
    this._changeLangCode();
    this._changeValueSubCategory();
    if (this.idEcosolution) {
      this.getEcosolution();
    }
  }

  private _getParamsUrl() {
    this._cleantechId = this._route.snapshot.parent?.paramMap.get(
      'id',
    ) as string;
    this.mainCategory = this._route.snapshot.queryParamMap.get(
      'mainCategory',
    ) as string;
    this.idEcosolution = this._route.snapshot.paramMap.get('id') as string;
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe((current) => {
      this._cleantechEcosolutionsService.getSubcategorySelected(
        this.mainCategory,
      );
      this.langSignal.set(current.lang);
    });
  }

  private _initForm() {
    this.form = this._fb.group({
      solutionName: ['', Validators.required],
      nameTranslations: new FormArray([]),
      solutionDescription: ['', Validators.required],
      descriptionTranslations: new FormArray([]),
      detailedDescription: ['', Validators.required],
      detailedDescriptionTranslations: new FormArray([]),
      subCategory: ['', Validators.required],
      products: ['', Validators.required],
      reductionPercentage: [],
      operationalCostReductionPercentage: [],
      sustainableDevelopmentGoals: [],
      price: [0],
      currency: ['EUR'],
      unit: [],
      priceDescription: [''],
      priceDescriptionTranslations: new FormArray([]),
      deliverCountries: [],
      paybackPeriodYears: [''],
      marketReady: [false],
      guarantee: [false],
      yearGuarantee: [],
      certified: [false],
      approved: [false],
      locations: new FormArray([], Validators.required),
    });
  }

  get sustainableDevelopmentGoals(): FormArray {
    return this.form.get('sustainableDevelopmentGoals') as FormArray;
  }

  private _changeValueSubCategory() {
    this.form.get('subCategory')?.valueChanges.subscribe((subCategory) => {
      if (subCategory) {
        this.productsCategories =
          DataSelect[subCategory.controlName as keyof typeof DataSelect];
      }
    });
  }

  private _addNameTranslations(): void {
    const nameTranslations = this.form.get('nameTranslations') as FormArray;
    this.langs.forEach((lang) => {
      nameTranslations.push(
        new FormControl<FiledTranslations>(
          { label: '', lang: lang.code } as FiledTranslations,
          Validators.required,
        ),
      );
    });
  }
  getEcosolution() {
    this._ecosolutionsService
      .getEcosolutionById(this.idEcosolution)
      .subscribe((ecosolution: Ecosolutions) => {
        this._getDocumentsCleantech();
        this.urlPicEcosolution = ecosolution?.pictures?.map(
          (picture) => picture.url,
        );
        this._patchDataToForm(ecosolution);
      });
  }

  private _patchDataToForm(ecosolution: any): void {
    const formValue = new EcosolutionForm(ecosolution);
    this.form.patchValue(formValue);
    this._patchValueLocationsFormControl(formValue);
  }

  editEcosolution() {
    forkJoin({
      ecosolution: this._ecosolutionsService.updateEcosolution(
        this.idEcosolution,
        this.bodyRequestEcosolution,
      ),
    }).subscribe((res: any) => {
      if (res) {
        this.goToListEcosolution();
        this._uploadImg(res.ecosolution);
        this._uploadCertificate(res.ecosolution);
        const formValue = new EcosolutionForm(res.ecosolution);
        this.form.patchValue(formValue);
        this._patchValueLocationsFormControl(formValue);
      }
    });
  }

  private _patchValueLocationsFormControl(formValue: EcosolutionForm) {
    formValue.locations?.forEach(() => {
      this._addLocations();
    });
    this.form.get('locations')?.patchValue(formValue.locations);
  }

  private _createLocations(): FormGroup {
    return new FormGroup({
      country: new FormGroup({
        code: new FormControl(),
        regions: new FormControl(),
      }),
    });
  }

  private _addLocations() {
    this.locationsArrays.push(this._createLocations());
  }

  saveEcosolution() {
    if (this.form.valid) {
      this._createEcosolution();
    }
  }
  private _createEcosolution() {
    this._ecosolutionsService
      .createEcosolutions(this.bodyRequestEcosolution)
      .pipe(
        switchMap((ecosolution) => {
          const uploadImage$ = this._uploadImg(ecosolution);
          const uploadCertificate$ = this._uploadCertificate(ecosolution);
          return forkJoin([uploadImage$, uploadCertificate$]);
        }),
        tap(() => this.goToListEcosolution()),
      )
      .subscribe({
        next: (result) => {
          console.log('Ecosolution creado con éxito', result);
        },
        error: (error) => {
          console.error('Error al crear Ecosolution ', error);
        },
      });
  }

  private _uploadImg(ecosolution: any) {
    if (this._fileEcosolution && ecosolution) {
      return this._ecosolutionsService.uploadImage(
        ecosolution?.id,
        this._fileEcosolution,
      );
    }
    return of(null);
  }

  fileChange(file: any) {
    this.fileCertificate = file.target.files[0];
  }

  uploadImgEcosolutions(file: any) {
    this._fileEcosolution = file;
  }

  private _getDocumentsCleantech() {
    this._cleanTeachService
      .getDocuments(this.idEcosolution)
      .pipe(last())
      .subscribe((res) => {
        if (res) {
          this.fileData = res[res?.length - 1];
        }
      });
  }

  private _uploadCertificate(ecosolution: Ecosolution) {
    if (
      (!this.form.value.certified && !this.form.controls['certified']?.dirty) ||
      !this.inputCertified.nativeElement.value
    ) {
      return of(null);
    }
    return this._cleanTeachService.uploadDocument(
      ecosolution.id,
      this.fileCertificate,
    );
  }
  goToListEcosolution() {
    this._router.navigate(['../cleantech-ecosolutions', this._cleantechId], {
      relativeTo: this._route.parent?.parent,
    });
  }

  selectedFormLangChange($event: any) {
    this.selectedFormLang.set($event);
  }
}
