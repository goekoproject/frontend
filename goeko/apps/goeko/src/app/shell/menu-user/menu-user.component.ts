import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@goeko/core';
import { UserService } from '@goeko/store';
import { MENU_USER, MenuUser } from './menu-user.contants';

@Component({
  selector: 'goeko-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
  public menuOptions!: MenuUser[];
  private user = this._userService.userProfile;

  private userAuth = this._userService.userAuthData;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this.menuOptions = MENU_USER;
  }

  logout() {
    this._router.navigate(['/login']);
    this._authService.logout();
  }
  goTo(route: string) {
    switch (route) {
      case 'profile':
      case 'sme-analysis/list':

        // eslint-disable-next-line no-case-declarations
        this._navigateWithCompanyId(route);
        return;

      case 'cleantech-ecosolutions':
        // eslint-disable-next-line no-case-declarations
        this._navigateWithCompanyId(route);
        return;

      case 'sme-analysis/new':
        // eslint-disable-next-line no-case-declarations
        this._navigateWithCompanyIdInQueryParams(route, {
          smeId: this.user().id,
        });
        return;

      default:
        this._router.navigate([route]);
        return;
    }
  }

  private _navigateWithCompanyId(route: string) {
    const _id = this.user().id || this.userAuth()['externalId'];
    this._router.navigate([route, _id]);
  }
  private _navigateWithCompanyIdInQueryParams(route: string, queryParams: any) {
    this._router.navigate([route], {
      queryParams: queryParams,
    });
  }
}
