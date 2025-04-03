import { Injectable, Injector, Signal, effect, inject, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { CATEGORY_SECTION, mergeCategoriesSectionWithClassificationCategory } from '@goeko/business-ui'
import { REMOTE_CONFIG_PARAMS, RemoteConfigService } from '@goeko/core'
import {
  ClassificationCategory,
  ClassificationCategoryService,
  EcosolutionsService,
  NULL_CLASSIFICATION_CATEGORY,
  PaymentSystemService,
} from '@goeko/store'
import { map, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { EcosolutionInfo } from './ecosolutions-list/ecosolution-info.model'

@Injectable({ providedIn: 'root' })
export class CleantechEcosolutionsService {
  private injector = inject(Injector)
  private _ecosolutionsService = inject(EcosolutionsService)

  subCategorySelected = signal<ClassificationCategory>({
    id: '',
    code: '',
    label: '',
  })

  categories = toSignal(this._getAllCategories$(), {
    initialValue: CATEGORY_SECTION as any[],
    injector: this.injector,
  })

  categorySelected = signal<ClassificationCategory>(NULL_CLASSIFICATION_CATEGORY)

  public get isSupcriptionNeed(): Signal<boolean> {
    console.log(this._remoteConfigService.getValue(REMOTE_CONFIG_PARAMS.SUSBCRIPTION_NEED).asBoolean())
    return signal(this._remoteConfigService.getValue(REMOTE_CONFIG_PARAMS.SUSBCRIPTION_NEED).asBoolean())
  }
  get isSubscribed() {
    if (!environment.production) {
      return true
    }
    if (!this.isSupcriptionNeed()) {
      return true
    }
    return this._paymentsService.isSubscription
  }

  constructor(
    private classificationCategoryService: ClassificationCategoryService,
    private _paymentsService: PaymentSystemService,
    private _remoteConfigService: RemoteConfigService,
  ) {
    effect(() => {
      if (this.categorySelected().code !== '') {
        this.getSubcategorySelected(this.categorySelected().code)
      }
    })
  }

  getAllEcosolutionsByCleanTech(id: string) {
    return this._ecosolutionsService
      .getEcosolutionsByCleantechId(id)
      .pipe(map((solutions) => solutions?.map((ecosolution) => new EcosolutionInfo(ecosolution))))
  }
  private _getAllCategories$() {
    return this.classificationCategoryService.getClassificationsCategory().pipe(
      map((classificationCategory) => mergeCategoriesSectionWithClassificationCategory(classificationCategory)),
      tap((categories) => this.categorySelected.set(categories[0])),
    )
  }
  public getSubcategorySelected(code: string) {
    this.classificationCategoryService.getClassificationForCategoryTranslated(code).subscribe((subcategorySelected) => {
      if (subcategorySelected) {
        this.subCategorySelected.set(subcategorySelected)
      }
    })
  }
}
