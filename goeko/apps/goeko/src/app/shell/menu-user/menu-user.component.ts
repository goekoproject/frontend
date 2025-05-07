import { CommonModule } from '@angular/common'
import { Component, effect, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService, OrderByPipe } from '@goeko/core'
import { ShowForRolesDirective, UserService } from '@goeko/store'
import { TranslatePipe } from '@ngx-translate/core'
import { getMenuByUserType, MenuUser } from './menu-user.contants'

@Component({
  selector: 'goeko-menu-user',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterLink, RouterLinkActive, OrderByPipe, ShowForRolesDirective],
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent {
  private user = this._userService.userProfile
  private userTypes = this._userService.userType
  private userAuth = this._userService.auth0UserProfile
  public menuOptions!: MenuUser[]
  public selectedOptionMenu = signal<number | null>(null)
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    public _route: ActivatedRoute,
  ) {
    effect(() => {
      if (this.userTypes()) {
        this.menuOptions = getMenuByUserType(this.userTypes())
      }
    })
  }

  logout() {
    this._authService.logout()
  }
  goTo(route: string) {
    const _id = this.user().id || this.userAuth()['externalId']
    this._router.navigate([route, _id], { relativeTo: this._route })
  }

  goToSubmenu(route: string) {
    this._router.navigate([route])
  }

  openSubmenu(index: number) {
    this.selectedOptionMenu.set(index)
  }
  slimMenu() {
    this.selectedOptionMenu.set(null)
  }
}
