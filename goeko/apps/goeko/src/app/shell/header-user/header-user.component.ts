import { Component, computed, inject } from '@angular/core'
import { UserService } from '@goeko/store'

@Component({
  selector: 'goeko-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent {
  userProfile = computed(() =>
    inject(UserService).userProfile().id ? inject(UserService).userProfile() : inject(UserService).userAuthData(),
  )
}
