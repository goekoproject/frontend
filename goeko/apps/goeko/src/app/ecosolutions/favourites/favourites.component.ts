import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { ECOSOLUTIONS_CONFIGURATION, EcosolutionsTaggingService, TAGGING, UserService } from '@goeko/store'
import { CardProductComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'goeko-favorite',
  standalone: true,
  imports: [CommonModule, CardProductComponent, TranslateModule, RouterModule],
  providers: [
    EcosolutionsTaggingService,
    {
      provide: ECOSOLUTIONS_CONFIGURATION,
      useValue: {
        endpoint: environment.baseUrl,
      },
    },
  ],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  private _ecosolutionTaggingService = inject(EcosolutionsTaggingService)
  private _userProfile = inject(UserService).userProfile
  private _router = inject(Router)
  public TAGGING = TAGGING

  ecosolutionFavorites$ = this._ecosolutionTaggingService.getEcosolutionFavourites(this._userProfile().id)

  removeFavorite(ecosolutionId: string) {
    this._ecosolutionTaggingService
      .removeFavorite(this._userProfile().id, ecosolutionId)
      .subscribe(() => (this.ecosolutionFavorites$ = this._ecosolutionTaggingService.getEcosolutionFavourites(this._userProfile().id)))
  }

  showMore(ecosolutionId: string) {
    this._router.navigate([`platform/sme-analysis/results/${this._userProfile().id}/details`, ecosolutionId])
  }
}
