import { Component, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@goeko/core'
import { UserService } from '@goeko/store'
import { MENU_USER, MenuUser } from './menu-user.contants'

@Component({
  selector: 'goeko-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
  private user = this._userService.userProfile

  private userAuth = this._userService.userAuthData
  public menuOptions!: MenuUser[]
  public selectedOptionMenu = signal<number | null>(null)
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    public _route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.menuOptions = MENU_USER
  }

  logout() {
    this._router.navigate(['/login'])
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

  private _managerNavigate(route: string) {
    switch (route) {
      case 'profile':
      case 'sme-analysis/list':
        // eslint-disable-next-line no-case-declarations
        this._navigateWithCompanyId(route)
        return

      case 'cleantech-ecosolutions':
        // eslint-disable-next-line no-case-declarations
        this._navigateWithCompanyId(route)
        return

      case 'sme-analysis/new':
        // eslint-disable-next-line no-case-declarations
        this._navigateWithCompanyIdInQueryParams(route, {
          smeId: this.user().id,
        })
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
  private _navigateWithCompanyIdInQueryParams(route: string, queryParams: any) {
    this._router.navigate([route], {
      queryParams: queryParams,
    })
  }

  openSubmenu(index: number) {
    this.selectedOptionMenu.set(index)
  }
  slimMenu() {
    this.selectedOptionMenu.set(null)
  }
}
