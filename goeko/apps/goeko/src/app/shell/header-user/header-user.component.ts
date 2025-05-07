import { Component, computed, inject } from '@angular/core'
import { SelectI18nComponent } from '@goeko/business-ui'
import { UserService } from '@goeko/store'
import { BadgeModule } from '@goeko/ui'

@Component({
  selector: 'goeko-header-user',
  standalone: true,
  imports: [SelectI18nComponent, BadgeModule],
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent {
  private _userService = inject(UserService)
  userProfile = computed(() =>
    this._userService.userProfile().id ? this._userService.userProfile() : this._userService.auth0UserProfile(),
  )
}
