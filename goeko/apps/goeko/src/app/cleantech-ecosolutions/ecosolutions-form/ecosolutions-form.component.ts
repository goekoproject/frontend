import { Component, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CleanTechService,
  DataSelect,
  EcosolutionsService,
  NewEcosolutionsBody,
  ODS_CODE,
} from '@goeko/store';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, last, of } from 'rxjs';
import {
  defaultSetCurrency,
  defaultSetDeliverCountries,
  defaultSetPaybackPeriodYears,
  defaultSetProductsCategories,
  defaultSetReductions,
  defaultSetyearGuarantee,
} from './compare-with-select';
import { EcosolutionForm } from './ecosolution-form.model';
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services';

@Component({
  selector: 'goeko-ecosolutions-form',
  templateUrl: './ecosolutions-form.component.html',
  styleUrls: ['./ecosolutions-form.component.scss'],
})
export class EcosolutionsFormComponent implements OnInit {
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
  langSignal = signal(this._translateServices.currentLang ||  this._translateServices.defaultLang);
  public dataSelect = DataSelect;
  public mainCategory!: string;
  public fileData!: { name: string; url: string };
  public get isReadOnly(): boolean {
    return this._route.snapshot.queryParamMap.get('isReadOnly') === 'true';
  }
  private _cleantechId!: string;
  private fileCertificate: any;
  private _fileEcosolution = File;
  public urlImgEcosolution!: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ecosolutionsService: EcosolutionsService,
    private _cleanTeachService: CleanTechService,
    private _fb: FormBuilder,
    private _translateServices: TranslateService,
    private _cleantechEcosolutionsService: CleantechEcosolutionsService
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
      'id'
    ) as string;
    this.mainCategory = this._route.snapshot.queryParamMap.get(
      'mainCategory'
    ) as string;
    this.idEcosolution = this._route.snapshot.paramMap.get('id') as string;
  }
  private _changeLangCode() {
    this._translateServices.onLangChange.subscribe(
      (current) => {
        this._cleantechEcosolutionsService.getSubcategorySelected(this.mainCategory);
        this.langSignal.set(current.lang)
        }
    );
  }

  private _initForm() {
    this.form = this._fb.group({
      solutionName: ['', Validators.required],
      solutionDescription: [''],
      detailedDescription: [''],
      subCategory: ['', Validators.required],
      products: ['', Validators.required],
      reductionPercentage: [],
      operationalCostReductionPercentage: [],
      sustainableDevelopmentGoals: new FormArray([]),
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
    });
    this.initCheckboxControlSustainableDevelopmentGoals();
  }

  initCheckboxControlSustainableDevelopmentGoals(): void {
    const odsControls = this.ods.map((ods) =>
      this._fb.group({ checked: false, value: ods })
    );
    this.form.setControl(
      'sustainableDevelopmentGoals',
      this._fb.array(odsControls)
    );
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
      .subscribe((res: any) => {
        this._getDocumentsCleantech();
        this.urlImgEcosolution = res?.pictures[0]?.url;
        const formValue = new EcosolutionForm(res);
        this.form.patchValue(formValue);
      });
  }
  editEcosolution() {
    const body = new NewEcosolutionsBody(
      this._cleantechId,
      this.mainCategory,
      this.form.value
    );
    forkJoin({
      fileCertificate: this._uploadCertificate(),
      ecosolution: this._ecosolutionsService.updateEcosolution(
        this.idEcosolution,
        body
      ),
    }).subscribe((res: any) => {
      if (res) {
        this._uploadCertificate();
        this.goToListEcosolution();
        this._uploadImg(res.ecosolution);

        const formValue = new EcosolutionForm(res.ecosolution);
        this.form.patchValue(formValue);
      }
    });
  }

  saveEcosolution() {
    if (this.form.valid) {
      this._createEcosolution();
    }
  }
  private _createEcosolution() {
    const body = new NewEcosolutionsBody(
      this._cleantechId,
      this.mainCategory,
      this.form.value
    );
    forkJoin({
      fileCertificate: this._uploadCertificate(),
      ecosolution: this._ecosolutionsService.createEcosolutions(body),
    }).subscribe((res) => {
      this._uploadCertificate();
      this.goToListEcosolution();
      this._uploadImg(res.ecosolution);
    });
  }

  private _uploadImg(ecosolution : any) {
    if(this._fileEcosolution && ecosolution) {
      this._ecosolutionsService.uploadImage(ecosolution?.id, this._fileEcosolution).subscribe();

    }
  }

  fileChange(file: any) {
    this.fileCertificate = file.target.files[0];
  }

  uploadImgEcosolutions(file: any) {
    this._fileEcosolution = file.target.files[0];
    this._buildImgEcosolution(file.target.files[0]);
  }
  
  private _buildImgEcosolution(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlImgEcosolution = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(file);
  }

  private _uploadCertificate() {
    if (!this.form.value.certified && !this.form.controls['certified']?.dirty) {
      return of(null);
    }
    return this._cleanTeachService.uploadDocument(
      this.idEcosolution,
      this.fileCertificate
    );
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
  goToListEcosolution() {
    this._router.navigate(['cleantech-ecosolutions', this._cleantechId]);
  }
}
