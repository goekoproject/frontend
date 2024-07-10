import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ECOSOLUTIONS_CONFIGURATION, EcosolutionsTaggingService, TAGGING, UserService } from '@goeko/store'
import { CardProductComponent } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'goeko-favorite',
  standalone: true,
  imports: [CommonModule, CardProductComponent, TranslateModule],
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

  public TAGGING = TAGGING

  ecosolutionFavorites$ = this._ecosolutionTaggingService.getEcosolutionFavourites(this._userProfile().id)
}
