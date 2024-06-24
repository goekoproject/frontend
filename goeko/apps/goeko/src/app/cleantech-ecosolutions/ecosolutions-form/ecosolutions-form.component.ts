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
import {
  CleanTechService,
  DataSelect,
  Ecosolutions,
  EcosolutionsService,
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
  langSignal = signal(
    this._translateServices.currentLang || this._translateServices.defaultLang,
  );
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
      solutionDescription: ['', Validators.required],
      detailedDescription: ['', Validators.required],
      subCategory: ['', Validators.required],
      products: ['', Validators.required],
      reductionPercentage: [],
      operationalCostReductionPercentage: [],
      sustainableDevelopmentGoals: [],
      price: [0],
      currency: ['EUR'],
      unit: [],
      priceDescription: [''],
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
  getEcosolution() {
    this._ecosolutionsService
      .getEcosolutionById(this.idEcosolution)
      .subscribe((ecosolution: Ecosolutions) => {
        this._getCertificateEcosolution();
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
          const uploadPicture$ = this._uploadPicture(ecosolution);
          const uploadCertificate$ = this._uploadCertificate(ecosolution);
          return forkJoin([uploadPicture$, uploadCertificate$]);
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

  editEcosolution() {
    this._ecosolutionsService
      .updateEcosolution(this.idEcosolution, this.bodyRequestEcosolution)
      .pipe(
        switchMap((ecosolution) => {
          const uploadPicture$ = this._uploadPicture(ecosolution);
          const uploadCertificate$ = this._uploadCertificate(ecosolution);
          return forkJoin([uploadPicture$, uploadCertificate$]);
        }),
        tap(() => this.goToListEcosolution()),
      )
      .subscribe({
        next: (result) => {
          console.log('Ecosolution update ok', result);
        },
        error: (error) => {
          console.error('Fail update ecosolution', error);
        },
      });
  }

  private _uploadPicture(ecosolution: any) {
    if (this._fileEcosolution && ecosolution) {
      const createOrUpdatePicture = this.idEcosolution
        ? this._ecosolutionsService.updatePicture(
            ecosolution?.id,
            this._fileEcosolution,
          )
        : this._ecosolutionsService.uploadPicture(
            ecosolution?.id,
            this._fileEcosolution,
          );
      return createOrUpdatePicture;
    }
    return of(null);
  }

  fileChange(file: any) {
    this.fileCertificate = file.target.files[0];
  }

  uploadImgEcosolutions(file: any) {
    this._fileEcosolution = file;
  }

  private _getCertificateEcosolution() {
    this._ecosolutionsService
      .getEcosolutionsDocumentationById(this.idEcosolution)
      .pipe(last())
      .subscribe((res: any) => {
        if (res) {
          this.fileData = res[res?.length - 1];
        }
      });
  }

  private _uploadCertificate(ecosolution: any) {
    if (
      (!this.form.value.certified && !this.form.controls['certified']?.dirty) ||
      !this.inputCertified.nativeElement.value
    ) {
      return of(null);
    }
    return this._ecosolutionsService.uploadDocumentation(ecosolution.id, [
      this.fileCertificate,
    ]);
  }
  goToListEcosolution() {
    this._router.navigate(['../cleantech-ecosolutions', this._cleantechId], {
      relativeTo: this._route.parent?.parent,
    });
  }
}
