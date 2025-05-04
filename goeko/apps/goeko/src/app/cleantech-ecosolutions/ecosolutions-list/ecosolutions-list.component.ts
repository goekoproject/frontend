import { CommonModule } from '@angular/common'
import { Component, inject, input, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { EcosolutionCategorySelectorComponent, MessageService } from '@goeko/business-ui'
import { EcosolutionInfoComponent } from '@goeko/business-ui/components/ecosolution-info/ecosolution-info.component'
import { CategoryGrouping } from '@goeko/store'
import { ButtonModule, DialogMessageModule, DialogService } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { CleantechEcosolutionsService } from '../cleantech-ecosolutions.services'
import { EcosolutionInfo } from './ecosolution-info.model'

@Component({
  selector: 'goeko-ecosolutions-list',
  standalone: true,
  imports: [CommonModule, EcosolutionInfoComponent, TranslatePipe, ButtonModule, DialogMessageModule],
  templateUrl: './ecosolutions-list.component.html',
  styleUrls: ['./ecosolutions-list.component.scss'],
  providers: [MessageService],
})
export class EcosolutionsListComponent {
  private _cleantechEcosolutionsService = inject(CleantechEcosolutionsService)
  private _dialogService = inject(DialogService)

  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  public ecosolutionsInfo = input.required<EcosolutionInfo[]>()
  public id = input.required<string>()
  public categorySelected = signal<CategoryGrouping | undefined>(undefined)
  public isSubscribed = !!this._cleantechEcosolutionsService.isSubscribed

  createEcosolution() {
    this._dialogService
      .open(EcosolutionCategorySelectorComponent)
      .afterClosed()
      .subscribe((category) => {
        if (category) {
          console.log(category)
        }
      })
  }
  viewEcosolution(ecosolution: EcosolutionInfo) {
    this._goToEcosolutionForm(
      'detail',
      { id: ecosolution.id, categoryCode: this.categorySelected()?.id },
      {
        mainCategory: ecosolution.category,
        isReadOnly: true,
      },
    )
  }
  editEcosolution(ecosolution: EcosolutionInfo) {
    this._goToEcosolutionForm('edit', { id: ecosolution.id, categoryCode: ecosolution.category[0].categoryCode })
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
  private _goToEcosolutionForm(path: string, params: { id: string; categoryCode?: string }, arg?: any) {
    const { id, categoryCode } = params
    this._router.navigate([`./${path}`, id, categoryCode], {
      queryParams: { ...arg, cleantechId: this.id() },
      relativeTo: this._route.parent,
    })
  }

  selectedTab(category: CategoryGrouping) {
    this.categorySelected.set(category)
  }
}
