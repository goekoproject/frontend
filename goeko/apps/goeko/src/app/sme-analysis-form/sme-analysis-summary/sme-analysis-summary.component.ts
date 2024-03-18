import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  effect
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FORM_CATEGORIES_QUESTION,
  Product,
  ProductsManagementComponent,
} from '@goeko/business-ui';
import {
  ClassificationCategory,
  ClassificationCategoryProduct,
  ClassificationSubcategory,
  DataSelect,
  ProjectService,
  SmeAnalysisStoreService,
  SmeService
} from '@goeko/store';
import { SideDialogService } from '@goeko/ui';
import { SmeAnalysisService } from '../sme-analysis.service';
import {
  FormValueToSmeAnalysisRequest,
  FormValueToSmeProjectRequest,
  formToClassificationsMapper,
} from '../sme-form-analysis/sme-analysis.request';

const compareWithClassificationCategory = (
  c1: ClassificationCategory,
  c2: ClassificationCategory
) => c1.code === c2.code;
@Component({
  selector: 'goeko-sme-analysis-summary',
  templateUrl: './sme-analysis-summary.component.html',
  styleUrls: ['./sme-analysis-summary.component.scss'],
})
export class SmeAnalysisSummaryComponent implements OnInit {
  @Output() editForm: EventEmitter<number> = new EventEmitter();
  public dataSelect = DataSelect;
  formField = FORM_CATEGORIES_QUESTION;
  formValue!: any;
  public saveOK = false;
  private _smeId!: string;
  public toogleSaveName = false;

  currentAnalytics = this._smeAnalysisService.currentAnalytics;
  categories = this._smeAnalysisService.categories;
  dataCategorySelected = this._smeAnalysisService.dataCategorySelected;
  allCategories = new SelectionModel<ClassificationCategory>(
    true,
    [],
    true,
    compareWithClassificationCategory
  );
  public get isProject() {
    return this._route?.parent?.snapshot.queryParams['isProject'] === 'true';
  }

  constructor(
    private _smeServices: SmeService,
    private _projectService: ProjectService,
    private _smeAnalysisStore: SmeAnalysisStoreService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _smeAnalysisService: SmeAnalysisService,
    private _sideDialogService: SideDialogService
  ) {
    effect(() => {
      if (this.dataCategorySelected().code) {
        this.allCategories.select(this.dataCategorySelected());
      }
    });
  }

  ngOnInit(): void {
    this._smeAnalysisService.getAllDataCategories();

    this._smeId = this._getSmeId();
    this._smeAnalysisStore.getCurrentAnalysis().subscribe((res) => {
      if (res) {
        this.formValue = res;
      }
    });
  }

  private _getSmeId(): string {
    const idByNewAnalysis = this._route?.parent?.snapshot.params[
      'id'
    ] as string;
    const idByLastRecommended = this._route.snapshot.queryParamMap.get(
      'smeId'
    ) as string;
    return idByNewAnalysis || idByLastRecommended;
  }

  onSearchNameChange(event: CustomEvent) {
    const value = event.detail;
    this.formValue = {
      ...this.formValue,
      searchName: value,
    };
  }
  editCategory(categoryCode: string, subcategoryCode: string) {
    if (!categoryCode || !subcategoryCode) {
      return;
    }
    const dialogResponse = this._openDialogAddProducts({
      categoryCode,
      subcategoryCode,
    });
    dialogResponse.subscribe((productsSelected: Product[]) => {
      this._updateProductOfSubcategory(productsSelected, {
        categoryCode,
        subcategoryCode,
      });
    });
  }

  private _openDialogAddProducts = ({
    categoryCode = '',
    subcategoryCode = '',
  }) => {
    return this._sideDialogService.openDialog<ProductsManagementComponent>(
      ProductsManagementComponent,
      {
        productSelected: this.currentAnalytics()[categoryCode][subcategoryCode],
        subcategoryCode: subcategoryCode,
      }
    );
  };

  private _updateProductOfSubcategory(
    productsSelected: Product[],
    { categoryCode = '', subcategoryCode = '' }
  ) {
    const codeProductSelected = productsSelected.map(
      (product: Product) => product.id
    );
    const categoryForUpdate = this.allCategories.selected.find(
      (c: ClassificationCategory) => c.code === categoryCode
    );
    const productBySubcategory = categoryForUpdate?.subcategories?.find(
      (subc: ClassificationSubcategory) => subc.code === subcategoryCode
    )?.products;
    const productSelectedOfSubcategory = productBySubcategory?.filter(
      (product: ClassificationCategoryProduct) =>
        codeProductSelected.includes(product.code)
    );
    this.currentAnalytics()[categoryCode][subcategoryCode] =
      productSelectedOfSubcategory;
  }

  changeSearchName(searchName: string): void {
    this.currentAnalytics.update( value => ({...value, searchName: searchName}));
  }
  getResults() {
    this._smeServices
      .createRecommendations({
        classifications: formToClassificationsMapper(this.currentAnalytics()),
      })
      .subscribe((res) => {
        if (res) {
          this._router.navigate(['sme-analysis/results', this._smeId]);
        }
      });
  }
  saveAnalysis() {
    if (this.isProject) {
      this._saveProject();
    } else {
      this._saveAnalysis();
    }
  }
  private _saveProject() {
    const smeAnalysisRequest = new FormValueToSmeProjectRequest(
      this._smeId,
      this.currentAnalytics()
    );
    this._projectService.saveProject(smeAnalysisRequest).subscribe((res) => {
      this.saveOK = true;
      setTimeout(() => {
        this.saveOK = false;
      }, 5000);
    });
  }
  private _saveAnalysis() {
    const smeAnalysisRequest = new FormValueToSmeAnalysisRequest(
      this._smeId,
      this.currentAnalytics()
    );
    this._smeServices
      .saveRecommendations(smeAnalysisRequest)
      .subscribe((res) => {
        this.saveOK = true;
        setTimeout(() => {
          this.saveOK = false;
        }, 5000);
      });
  }

  cancel() {
    this._router.navigate(['dashboard/sme']);
  }
}
