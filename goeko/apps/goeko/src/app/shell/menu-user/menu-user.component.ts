import { Component, effect, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@goeko/core'
import { UserService } from '@goeko/store'
import { getMenuByUserType, MenuUser } from './menu-user.contants'

@Component({
  selector: 'goeko-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent {
  private user = this._userService.userProfile
  private userTypes = this._userService.userType
  private userAuth = this._userService.userAuthData
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
    if (route) {
      this._managerNavigate(route)
    }
  }

  goToSubmenu(route: string) {
    this._router.navigate([`platform/${route}`])
  }

  //TODO: change pro property
  private _managerNavigate(route: string) {
    switch (route) {
      case 'profile':
      case 'projects-list':
      case 'dashboard/sme':
      case 'dashboard/cleantech':
      case 'funding':
        this._navigateWithCompanyId(route)
        return

      case 'cleantech-ecosolutions':
        // eslint-disable-next-line no-case-declarations
        this._navigateWithCompanyId(route)
        return

      default:
        this._router.navigate([`platform/${route}`])
        return
    }
  }

  private _navigateWithCompanyId(route: string) {
    const _id = this.user().id || this.userAuth()['externalId']
    this._router.navigate([route, _id], { relativeTo: this._route.parent })
  }

  openSubmenu(index: number) {
    this.selectedOptionMenu.set(index)
  }
  slimMenu() {
    this.selectedOptionMenu.set(null)
  }
}
