import { Component, computed, inject } from '@angular/core'
import { UserService } from '@goeko/store'

@Component({
  selector: 'goeko-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent {
  private _userService = inject(UserService)
  userProfile = computed(() => (this._userService.userProfile().id ? this._userService.userProfile() : this._userService.userAuthData()))
}
