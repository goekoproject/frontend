import { CommonModule } from '@angular/common'
import { Component, inject, input, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from '@goeko/business-ui'
import { EcosolutionInfoComponent } from '@goeko/business-ui/components/ecosolution-info/ecosolution-info.component'
import { CategoryGrouping } from '@goeko/store'
import { ButtonModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services'
import { EcosolutionInfo } from './ecosolution-info.model'

@Component({
  selector: 'goeko-ecosolutions-list',
  standalone: true,
  imports: [CommonModule, EcosolutionInfoComponent, TranslatePipe, ButtonModule],
  templateUrl: './ecosolutions-list.component.html',
  styleUrls: ['./ecosolutions-list.component.scss'],
  providers: [MessageService],
})
export class EcosolutionsListComponent {
  private _cleantechEcosolutionsService = inject(CleantechEcosolutionsService)
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  public ecosolutionsInfo = input.required<EcosolutionInfo[]>()

  public categorySelected = signal<CategoryGrouping | undefined>(undefined)
  public isSubscribed = !!this._cleantechEcosolutionsService.isSubscribed

  viewEcosolution(ecosolution: EcosolutionInfo) {
    this._goToEcosolutionForm(
      'detail',
      { id: ecosolution.id, categoryId: this.categorySelected()?.id },
      {
        mainCategory: ecosolution.category,
        isReadOnly: true,
      },
    )
  }
  editEcosolution(ecosolution: EcosolutionInfo) {
    this._goToEcosolutionForm(
      'edit',
      { id: ecosolution.id, categoryId: this.categorySelected()?.id },
      {
        mainCategory: ecosolution.category,
      },
    )
  }

  /*   deleteEcosolution(ecosolution: CardEcosolutions) {
    this._messageService
      .deleteMessage(ecosolution.solutionName)
      .afterClosed()
      .subscribe((isDelete) => {
        if (isDelete) {
          this._ecosolutionsService.deleteEcosolution(ecosolution.id).subscribe(() => {})
        }
      })
  }
 */
  private _goToEcosolutionForm(path: string, params: { id: string; categoryId?: string }, arg?: any) {
    const { id, categoryId } = params
    this._router.navigate([`./${path}`, id, categoryId], {
      queryParams: arg,
      relativeTo: this._route,
    })
  }

  selectedTab(category: CategoryGrouping) {
    this.categorySelected.set(category)
  }
}
