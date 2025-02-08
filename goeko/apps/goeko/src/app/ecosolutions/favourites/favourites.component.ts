import { CommonModule } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { ClassificationsLabelPipe, EcosolutionsTaggingService, TAGGING, TaggingResponse } from '@goeko/store'
import { CardProductComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-favorite',
  standalone: true,
  imports: [CommonModule, RouterModule, CardProductComponent, TranslateModule, RouterModule, ClassificationsLabelPipe],
  providers: [EcosolutionsTaggingService],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  private _ecosolutionTaggingService = inject(EcosolutionsTaggingService)
  public _router = inject(Router)

  ecosolutionFavorites = input.required<TaggingResponse[]>()
  id = input.required<string>()
  //const
  public TAGGING = TAGGING

  removeFavorite(ecosolutionId: string) {
    this._ecosolutionTaggingService.removeFavorite(this.id(), ecosolutionId).subscribe(() => {
      this._router.navigate([], {
        queryParams: { hash: window.crypto.randomUUID() },
      })
    })
  }

  showMore(ecosolutionId: string) {
    this._router.navigate([`ecosolutions-detail/${this.id()}/${ecosolutionId}`])
  }
}
