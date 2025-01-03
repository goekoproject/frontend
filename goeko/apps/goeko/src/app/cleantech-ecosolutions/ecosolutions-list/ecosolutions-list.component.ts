import { Component, input, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from '@goeko/business-ui'
import { CategoryGrouping, EcosolutionsService } from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services'
import { CardEcosolutions } from './card-ecosolutions.model'

@Component({
  selector: 'goeko-ecosolutions-list',
  templateUrl: './ecosolutions-list.component.html',
  styleUrls: ['./ecosolutions-list.component.scss'],
  providers: [MessageService],
})
export class EcosolutionsListComponent implements OnInit {
  groupingForm = input.required<CategoryGrouping[]>()
  public categorySelected = signal<CategoryGrouping | undefined>(undefined)
  public isSubscribed = !!this._cleantechEcosolutionsService.isSubscribed
  public ecosolutions!: CardEcosolutions[]
  public cleanTechId!: string

  constructor(
    private _ecosolutionsService: EcosolutionsService,
    private _route: ActivatedRoute,
    private _roter: Router,
    private translateService: TranslateService,
    private _cleantechEcosolutionsService: CleantechEcosolutionsService,
    private _messageService: MessageService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.cleanTechId = this._route.snapshot.paramMap.get('id') as string
    this.categorySelected.set(this.groupingForm()[0])

    this.getAllEcosolutionsByCleanTech()
  }

  getAllEcosolutionsByCleanTech() {
    this._ecosolutionsService.getEcosolutionsByCleantechId(this.cleanTechId).subscribe((ecosolutions: any) => {
      this.ecosolutions = ecosolutions?.map((ecosolution: any) => new CardEcosolutions(ecosolution, this.translateService))
    })
  }

  viewEcosolution(ecosolution: CardEcosolutions) {
    this._goToEcosolutionForm(
      'detail',
      { id: ecosolution.id, categoryId: this.categorySelected()?.id },
      {
        mainCategory: ecosolution.mainCategory,
        isReadOnly: true,
      },
    )
  }
  editEcosolution(ecosolution: CardEcosolutions) {
    this._goToEcosolutionForm(
      'edit',
      { id: ecosolution.id, categoryId: this.categorySelected()?.id },
      {
        mainCategory: ecosolution.mainCategory,
      },
    )
  }

  deleteEcosolution(ecosolution: CardEcosolutions) {
    this._messageService
      .deleteMessage(ecosolution.solutionName)
      .afterClosed()
      .subscribe((isDelete) => {
        if (isDelete) {
          this._ecosolutionsService.deleteEcosolution(ecosolution.id).subscribe(() => {
            this.getAllEcosolutionsByCleanTech()
          })
        }
      })
  }

  private _goToEcosolutionForm(path: string, params: { id: string; categoryId?: string }, arg?: any) {
    const { id, categoryId } = params
    this._roter.navigate([`./${path}`, id, categoryId], {
      queryParams: arg,
      relativeTo: this._route,
    })
  }

  selectedTab(category: CategoryGrouping) {
    this.categorySelected.set(category)
  }
}
